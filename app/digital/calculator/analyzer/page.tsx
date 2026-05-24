"use client";

import React, { useState, useRef } from "react";

interface BuyLot {
  date: Date;
  qty: number;
  unitCost: number;
  remainingQty: number;
  totalFee: number;
}

interface RealizedTaxEvent {
  id: string;
  asset: string;
  buyDate: Date | string;
  sellDate: Date;
  qtySold: number;
  unitSellPrice: number;
  holdingDays: number | string;
  category: "Capital" | "Revenue" | "Missing Data" | "Other";
  realizedPnL: number;
  fee: number;
}

interface PortfolioItem {
  asset: string;
  qty: number;
  avgCost: number;
}

export default function EEDataAnalyzer() {
  const [analyzedData, setAnalyzedData] = useState<RealizedTaxEvent[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currency, setCurrency] = useState("ZAR");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [editingTradeId, setEditingTradeId] = useState<string | null>(null);
  const [isSelling, setIsSelling] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual Edit States
  const [manualAsset, setManualAsset] = useState("");
  const [manualDate, setManualDate] = useState("");
  const [manualSellDate, setManualSellDate] = useState("");
  const [manualQty, setManualQty] = useState<number>(0);
  const [manualInvested, setManualInvested] = useState<number>(0);
  const [manualSold, setManualSold] = useState<number>(0);
  const [manualFee, setManualFee] = useState<number>(0);

  const filteredData = analyzedData.filter((t) => {
    if (startDate && t.sellDate instanceof Date && t.sellDate < new Date(startDate)) return false;
    if (endDate && t.sellDate instanceof Date && t.sellDate > new Date(endDate)) return false;
    return true;
  });

  const revenueLoss = filteredData.reduce((sum, t) => t.category === "Revenue" && t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0);
  const revenueProfit = filteredData.reduce((sum, t) => t.category === "Revenue" && t.realizedPnL > 0 ? sum + t.realizedPnL : sum, 0);
  const capitalProfit = filteredData.reduce((sum, t) => t.category === "Capital" && t.realizedPnL > 0 ? sum + t.realizedPnL : sum, 0);
  const capitalLoss = filteredData.reduce((sum, t) => t.category === "Capital" && t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0);
  
  const netPnL = revenueProfit - Math.abs(revenueLoss);
  const netCapitalPnL = capitalProfit - Math.abs(capitalLoss);

  const formatCurrency = (amount: number) => {
    const sym = currency === "USD" ? "$" : "R";
    const absVal = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${amount < 0 ? '-' : ''}${sym}${absVal}`;
  };

  const processCSV = (text: string) => {
    setIsAnalyzing(true);
    const lines = text.split("\n");
    const dataLines = lines.slice(1).filter(l => l.trim() !== "");
    const allEvents: any[] = [];
    let currentEvent: any = null;
    const feeKeywords = ["commission", "clearing", "vat", "fee", "tax", "sec", "finra"];

    for (const line of dataLines) {
      const delimiter = line.includes(";") ? ";" : ",";
      const parts = line.split(delimiter);
      if (parts.length < 3) continue;

      const dateStr = parts[0].trim();
      let comment = parts[1].replace(/^"|"$/g, "").trim(); 
      let amountStr = parts[2].trim().replace(",", "."); 
      const amount = parseFloat(amountStr) || 0;
      const date = new Date(dateStr.replace(/\//g, "-"));

      // FIX: Capture invalid dates as "Missing Data" instead of skipping
      if (isNaN(date.getTime()) || !dateStr) {
         allEvents.push({ date: new Date(), action: "Invalid", asset: comment, qty: 0, amount, fee: 0, isInvalid: true });
         continue;
      }

      const commentLower = comment.toLowerCase();
      if (comment.startsWith("Bought ") || comment.startsWith("Sold ")) {
        const action = comment.startsWith("Bought ") ? "Buy" : "Sell";
        const partsInfo = comment.replace(/^(Bought|Sold) /, "").split(" @ ");
        const assetName = partsInfo[0].split(" ").slice(0, -1).join(" ");
        const qty = parseFloat(partsInfo[0].split(" ").pop()?.replace(",", ".") || "0");
        currentEvent = { date, action, asset: assetName, qty, amount, fee: 0 };
        allEvents.push(currentEvent);
      } else if (feeKeywords.some(k => commentLower.includes(k)) && currentEvent) {
        currentEvent.fee += Math.abs(amount);
      } else {
        allEvents.push({ date, action: "Other", asset: comment, qty: 0, amount, fee: 0 });
        currentEvent = null;
      }
    }

    allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

    const lots = new Map<string, BuyLot[]>();
    const realized: RealizedTaxEvent[] = [];

    for (const e of allEvents) {
      if (e.isInvalid) {
        realized.push({ id: Math.random().toString(), asset: e.asset, buyDate: "INVALID DATE", sellDate: e.date, qtySold: 0, unitSellPrice: 0, holdingDays: 0, category: "Missing Data", realizedPnL: 0, fee: 0 });
      } else if (e.action === "Buy") {
        if (!lots.has(e.asset)) lots.set(e.asset, []);
        lots.get(e.asset)!.push({ date: e.date, qty: e.qty, unitCost: Math.abs(e.amount)/e.qty, remainingQty: e.qty, totalFee: e.fee });
      } else if (e.action === "Sell") {
        if (!lots.has(e.asset)) lots.set(e.asset, []);
        let remaining = e.qty;
        for (const lot of lots.get(e.asset)!) {
          if (remaining <= 0.000001) break;
          const take = Math.min(remaining, lot.remainingQty);
          lot.remainingQty -= take;
          remaining -= take;
          const fee = (lot.totalFee * (take/lot.qty)) + (e.fee * (take/e.qty));
          realized.push({
            id: Math.random().toString(), asset: e.asset, buyDate: lot.date, sellDate: e.date,
            qtySold: take, unitSellPrice: Math.abs(e.amount)/e.qty, holdingDays: 0, category: "Revenue",
            realizedPnL: (take * (Math.abs(e.amount)/e.qty)) - (take * lot.unitCost) - fee, fee
          });
        }
      } else {
        realized.push({ id: Math.random().toString(), asset: e.asset, buyDate: e.date, sellDate: e.date, qtySold: 0, unitSellPrice: 0, holdingDays: 0, category: "Other", realizedPnL: 0, fee: 0 });
      }
    }

    const port: PortfolioItem[] = [];
    lots.forEach((l, asset) => {
        const q = l.reduce((sum, item) => sum + item.remainingQty, 0);
        if (q > 0) port.push({ asset, qty: q, avgCost: 0 });
    });
    setPortfolio(port);
    setAnalyzedData(realized.sort((a, b) => b.sellDate.getTime() - a.sellDate.getTime()));
    setIsAnalyzing(false);
  };

  const exportReport = () => {
    const csv = ["Asset,Buy Date,Sell Date,Qty,Category,PnL,Fee", ...filteredData.map(t => `${t.asset},${t.buyDate},${t.sellDate.toISOString().split('T')[0]},${t.qtySold},${t.category},${t.realizedPnL},${t.fee}`)].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = "Report.csv";
    a.click();
  };

  const saveManual = (id: string) => {
    setAnalyzedData(prev => prev.map(t => t.id === id ? {...t, asset: manualAsset, buyDate: manualDate, sellDate: new Date(manualSellDate), qtySold: manualQty, realizedPnL: manualSold - manualInvested - manualFee, fee: manualFee, category: "Revenue"} : t));
    setEditingTradeId(null);
  };

  return (
    <div className="p-8 bg-[#0a1128] text-[#e0e1dd] min-h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold uppercase">FIFO TAX ANALYZER</h1>
        <div className="flex gap-2">
          <button onClick={() => setAnalyzedData(prev => [{ id: Math.random().toString(), asset: "New Trade", buyDate: new Date(), sellDate: new Date(), qtySold: 0, unitSellPrice: 0, holdingDays: 0, category: "Missing Data", realizedPnL: 0, fee: 0 }, ...prev])} className="bg-blue-600 px-4 py-2 text-sm font-bold">+ ADD TRADE</button>
          <button onClick={exportReport} className="bg-sky-900 px-4 py-2 text-sm font-bold">EXPORT CSV</button>
          <button onClick={() => fileInputRef.current?.click()} className="bg-[#c0c0c0] text-black px-4 py-2 text-sm font-bold">UPLOAD CSV</button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if(f){ const r=new FileReader(); r.onload=(e)=>processCSV(e.target?.result as string); r.readAsText(f); } }} />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <select onChange={(e) => setCurrency(e.target.value)} className="bg-[#0a1128] border border-gray-600 p-2"><option value="ZAR">ZAR</option><option value="USD">USD</option></select>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} className="bg-[#0a1128] border border-gray-600 p-2" />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} className="bg-[#0a1128] border border-gray-600 p-2" />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#081b2e] p-4 text-center border border-sky-900"><p className="text-xs text-sky-400">REV LOSSES</p><p className="text-2xl text-red-400">{formatCurrency(revenueLoss)}</p></div>
        <div className="bg-[#120f1a] p-4 text-center border border-purple-900"><p className="text-xs text-purple-400">NET CAP P/L</p><p className="text-2xl text-green-400">{formatCurrency(netCapitalPnL)}</p></div>
        <div className="bg-[#0a1128] p-4 text-center border border-gray-700"><p className="text-xs text-gray-400">REV PROFITS</p><p className="text-2xl text-green-400">{formatCurrency(revenueProfit)}</p></div>
        <div className="bg-[#14213d] p-4 text-center border border-blue-900"><p className="text-xs text-blue-400">NET P/L</p><p className="text-2xl text-green-400">{formatCurrency(netPnL)}</p></div>
      </div>

      <table className="w-full bg-[#14213d] border border-gray-700 mb-8">
        <thead><tr className="bg-[#0a1128] text-xs text-gray-400 uppercase"><th className="p-4">Asset</th><th className="p-4">Buy Date</th><th className="p-4">Sell Date</th><th className="p-4">PnL</th><th className="p-4 text-center">Action</th></tr></thead>
        <tbody>
          {filteredData.map(t => editingTradeId === t.id ? (
            <tr key={t.id} className="bg-yellow-900/20">
                <td className="p-2"><input className="bg-black w-full" onChange={e=>setManualAsset(e.target.value)} defaultValue={t.asset}/></td>
                <td className="p-2"><input type="date" className="bg-black w-full" onChange={e=>setManualDate(e.target.value)}/></td>
                <td className="p-2"><input type="date" className="bg-black w-full" onChange={e=>setManualSellDate(e.target.value)}/></td>
                <td className="p-2"><input type="number" className="bg-black w-16" placeholder="Inv" onChange={e=>setManualInvested(Number(e.target.value))}/><input type="number" className="bg-black w-16" placeholder="Sold" onChange={e=>setManualSold(Number(e.target.value))}/></td>
                <td className="p-2 text-center"><button className="bg-yellow-500 text-black px-2" onClick={()=>saveManual(t.id)}>SAVE</button></td>
            </tr>
          ) : (
            <tr key={t.id} className="border-b border-gray-800 text-sm">
                <td className="p-4">{t.asset}</td>
                <td className="p-4 text-[#8d99ae]">{t.buyDate instanceof Date ? t.buyDate.toISOString().split('T')[0] : t.buyDate}</td>
                <td className="p-4 text-[#8d99ae]">{t.sellDate.toISOString().split('T')[0]}</td>
                <td className="p-4">{formatCurrency(t.realizedPnL)}</td>
                <td className="p-4 text-center">{t.category === "Missing Data" && <button onClick={() => setEditingTradeId(t.id)} className="text-yellow-400 border px-2">ADD</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-bold uppercase mb-4">Open Portfolio</h2>
      <table className="w-full bg-[#14213d] border border-gray-700">
        <thead><tr className="bg-[#0a1128] text-xs text-gray-400 uppercase"><th className="p-4">Asset</th><th className="p-4">Qty</th><th className="p-4 text-center">Action</th></tr></thead>
        <tbody>
            {portfolio.map((p, i) => (
                <tr key={i} className="border-b border-gray-800">
                    <td className="p-4">{p.asset}</td><td className="p-4 text-right">{p.qty.toFixed(4)}</td>
                    <td className="p-4 text-center"><button onClick={() => setIsSelling(p.asset)} className="bg-sky-900 px-3 py-1 text-xs">SELL</button></td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
