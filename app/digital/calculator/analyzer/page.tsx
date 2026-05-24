"use client";

import React, { useState, useRef, useEffect } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSelling, setIsSelling] = useState<string | null>(null);
  const [sellDate, setSellDate] = useState(new Date().toISOString().split('T')[0]);
  const [sellQty, setSellQty] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [sellFee, setSellFee] = useState<number>(0);

  const [currency, setCurrency] = useState("ZAR");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [editingTradeId, setEditingTradeId] = useState<string | null>(null);

  // Manual Edit States
  const [manualAsset, setManualAsset] = useState("");
  const [manualDate, setManualDate] = useState<string>("");
  const [manualSellDate, setManualSellDate] = useState<string>("");
  const [manualAmountInvested, setManualAmountInvested] = useState<number | "">("");
  const [manualQty, setManualQty] = useState<number | "">("");
  const [manualAmountSold, setManualAmountSold] = useState<number | "">("");
  const [manualFee, setManualFee] = useState<number | "">("");

  const filteredData = analyzedData.filter((trade) => {
    let isValid = true;
    if (startDate) {
      const start = new Date(startDate + "T00:00:00");
      isValid = isValid && (trade.sellDate instanceof Date ? trade.sellDate >= start : true);
    }
    if (endDate) {
      const end = new Date(endDate + "T23:59:59");
      isValid = isValid && (trade.sellDate instanceof Date ? trade.sellDate <= end : true);
    }
    return isValid;
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
    const lines = text.split("\n");
    const dataLines = lines.slice(1).filter(l => l.trim() !== "");
    
    const allEvents: { date: Date; action: string; asset: string; qty: number; amount: number; fee: number }[] = [];
    let currentEvent: any = null;
    const feeKeywords = ["commission", "clearing", "vat", "fee", "tax", "sec", "finra"];

    for (const line of dataLines) {
      const delimiter = line.includes(";") ? ";" : ",";
      const parts = line.split(delimiter);
      if (parts.length < 3) continue;

      const dateStr = parts[0].trim();
      if (!dateStr || dateStr.length < 8) continue;
      
      let comment = parts[1].replace(/^"|"$/g, "").trim(); 
      let amountStr = parts[2].trim().replace(",", "."); 
      const amount = parseFloat(amountStr) || 0;
      const date = new Date(dateStr.replace(/\//g, "-"));
      
      if (isNaN(date.getTime())) continue;

      const commentLower = comment.toLowerCase();
      const isBuy = comment.startsWith("Bought ");
      const isSell = comment.startsWith("Sold ");
      const isFee = feeKeywords.some(keyword => commentLower.includes(keyword));

      if (isBuy || isSell) {
        const action = isBuy ? "Buy" : "Sell";
        const withoutAction = comment.replace(/^(Bought|Sold) /, "").trim();
        const atParts = withoutAction.split(" @ ");
        
        if (atParts.length >= 2) {
          const leftSide = atParts[0].trim().split(" ");
          const qtyStr = leftSide.pop() || "0";
          const qty = parseFloat(qtyStr.replace(",", "."));
          const assetName = leftSide.join(" ").trim();

          if (qty > 0 && assetName) {
            currentEvent = { date, action, asset: assetName, qty, amount, fee: 0 };
            allEvents.push(currentEvent);
          }
        }
      } else if (isFee && currentEvent) {
        currentEvent.fee += Math.abs(amount);
      } else {
        allEvents.push({ date, action: "Other", asset: comment, qty: 0, amount, fee: 0 });
        currentEvent = null;
      }
    }

    allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

    const lots = new Map<string, BuyLot[]>();
    const realizedTrades: RealizedTaxEvent[] = [];

    for (const event of allEvents) {
      if (event.action === "Buy") {
        if (!lots.has(event.asset)) lots.set(event.asset, []);
        lots.get(event.asset)!.push({
          date: event.date,
          qty: event.qty,
          unitCost: Math.abs(event.amount) / event.qty,
          remainingQty: event.qty,
          totalFee: event.fee
        });
      } 
      else if (event.action === "Sell") {
        if (!lots.has(event.asset)) lots.set(event.asset, []);
        const assetLots = lots.get(event.asset)!;
        let remainingToSell = event.qty;
        const unitSellPrice = Math.abs(event.amount) / event.qty;

        for (const lot of assetLots) {
          if (remainingToSell <= 0.000001) break; 
          const qtyToTake = Math.min(remainingToSell, lot.remainingQty);
          
          lot.remainingQty -= qtyToTake;
          remainingToSell -= qtyToTake;

          const holdingDays = Math.ceil(Math.abs(event.date.getTime() - lot.date.getTime()) / (1000 * 60 * 60 * 24));
          const category = holdingDays >= 1095 ? "Capital" : "Revenue";
          const proportionalFee = (lot.totalFee * (qtyToTake / lot.qty)) + (event.fee * (qtyToTake / event.qty));
          const realizedPnL = (qtyToTake * unitSellPrice) - (qtyToTake * lot.unitCost) - proportionalFee;

          realizedTrades.push({
            id: `${event.asset}-${event.date.getTime()}-${Math.random()}`,
            asset: event.asset,
            buyDate: lot.date,
            sellDate: event.date,
            qtySold: qtyToTake,
            unitSellPrice,
            holdingDays,
            category,
            realizedPnL,
            fee: proportionalFee
          });
        }

        if (remainingToSell > 0.000001) {
            realizedTrades.push({
              id: `GHOST-${event.asset}-${event.date.getTime()}-${Math.random()}`,
              asset: `${event.asset} (Missing Buy Data)`,
              buyDate: "Unknown", 
              sellDate: event.date,
              qtySold: remainingToSell,
              unitSellPrice,
              holdingDays: "N/A",
              category: "Missing Data",
              realizedPnL: (remainingToSell * unitSellPrice),
              fee: 0
            });
          }
      } else {
        realizedTrades.push({
          id: `${event.date.getTime()}-${Math.random()}`,
          asset: event.asset,
          buyDate: event.date,
          sellDate: event.date,
          qtySold: 0,
          unitSellPrice: 0,
          holdingDays: "N/A",
          category: "Other",
          realizedPnL: 0,
          fee: 0
        });
      }
    }

    // Portfolio extraction
    const currentPortfolio: PortfolioItem[] = [];
    lots.forEach((assetLots, asset) => {
        let totalQty = 0;
        let totalCost = 0;
        assetLots.forEach(l => {
            if (l.remainingQty > 0) {
                totalQty += l.remainingQty;
                totalCost += (l.remainingQty * l.unitCost);
            }
        });
        if (totalQty > 0) {
            currentPortfolio.push({ asset, qty: totalQty, avgCost: totalCost / totalQty });
        }
    });

    setPortfolio(currentPortfolio);
    setAnalyzedData(realizedTrades.sort((a, b) => b.sellDate.getTime() - a.sellDate.getTime()));
    setIsAnalyzing(false);
  };

  const startEditing = (trade: RealizedTaxEvent) => {
    setEditingTradeId(trade.id);
    setManualAsset(trade.asset);
    setManualDate(trade.buyDate instanceof Date ? trade.buyDate.toISOString().split('T')[0] : "");
    setManualSellDate(trade.sellDate.toISOString().split('T')[0]);
    setManualAmountInvested("");
    setManualQty(trade.qtySold);
    setManualAmountSold("");
    setManualFee(0);
  };

  const saveManualData = (tradeId: string) => {
    if (!manualDate || !manualSellDate || manualAmountInvested === "" || manualAmountSold === "" || manualQty === "" || manualFee === "") {
        alert("Please provide the Buy Date, Sell Date, Qty, Amount Invested, Amount Sold, and Fee.");
        return;
    }

    const parsedBuyDate = new Date(manualDate);
    const parsedSellDate = new Date(manualSellDate);
    const qty = Number(manualQty);
    const amountInvested = Number(manualAmountInvested);
    const amountSold = Number(manualAmountSold);
    const fee = Number(manualFee);

    setAnalyzedData(prevData => prevData.map(trade => {
      if (trade.id === tradeId) {
        const holdingDays = Math.ceil(Math.abs(parsedSellDate.getTime() - parsedBuyDate.getTime()) / (1000 * 60 * 60 * 24));
        const category = holdingDays >= 1095 ? "Capital" : "Revenue";
        
        return {
          ...trade,
          asset: manualAsset,
          buyDate: parsedBuyDate,
          sellDate: parsedSellDate,
          qtySold: qty,
          unitSellPrice: amountSold / qty,
          holdingDays,
          category,
          realizedPnL: (amountSold - amountInvested) - fee,
          fee: fee
        };
      }
      return trade;
    }));

    setEditingTradeId(null);
  };

  const exportReport = () => {
    const headers = ["Asset", "Buy Date", "Sell Date", "Qty", "Category", "PnL", "Fee"];
    const rows = filteredData.map(t => [
      `"${t.asset}"`, 
      t.buyDate instanceof Date ? t.buyDate.toLocaleDateString() : t.buyDate, 
      t.sellDate.toLocaleDateString(), 
      t.qtySold.toFixed(4), 
      t.category, 
      t.realizedPnL.toFixed(2),
      t.fee.toFixed(2)
    ].join(","));
    
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Tax_Report_${currency}.csv`;
    a.click();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
        <div className="flex justify-between items-center mb-8 border-b border-[#c0c0c0]/30 pb-4">
            <h1 className="text-3xl font-bold text-[#c0c0c0] uppercase tracking-widest">FIFO TAX ANALYZER</h1>
            <div className="flex gap-4">
                <button onClick={exportReport} className="bg-sky-900 text-white px-5 py-2 font-bold hover:bg-sky-800 transition rounded-sm">EXPORT CSV</button>
                <button onClick={() => fileInputRef.current?.click()} className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2 font-bold hover:bg-white transition rounded-sm">UPLOAD CSV</button>
                <input type="file" ref={fileInputRef} onChange={(e) => { const file = e.target.files?.[0]; if(file) { setIsAnalyzing(true); const reader = new FileReader(); reader.onload = (evt) => processCSV(evt.target?.result as string); reader.readAsText(file); } }} className="hidden" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#081b2e] border border-sky-800 p-6 text-center shadow-lg"><h3 className="text-xs uppercase text-sky-400">Revenue Losses</h3><p className="text-3xl text-red-400">{formatCurrency(revenueLoss)}</p></div>
            <div className="bg-[#120f1a] border border-purple-900 p-6 text-center shadow-lg"><h3 className="text-xs uppercase text-purple-400">Net Capital P/L</h3><p className="text-3xl text-green-400">{formatCurrency(netCapitalPnL)}</p></div>
            <div className="bg-[#0a1128] border border-[#c0c0c0]/30 p-6 text-center shadow-lg"><h3 className="text-xs uppercase text-[#c0c0c0]">Revenue Profits</h3><p className="text-3xl text-green-400">{formatCurrency(revenueProfit)}</p></div>
            <div className="bg-[#14213d] border border-blue-500/30 p-6 text-center shadow-lg"><h3 className="text-xs uppercase text-blue-400">Trading Net P/L</h3><p className="text-3xl text-green-400">{formatCurrency(netPnL)}</p></div>
        </div>

        <div className="overflow-x-auto bg-[#14213d] border border-[#c0c0c0]/20 mb-12 shadow-lg">
            <table className="w-full text-left">
                <thead><tr className="bg-[#0a1128] text-[#c0c0c0] uppercase text-xs"><th className="p-4">Asset</th><th className="p-4">Buy Date</th><th className="p-4">Sell Date</th><th className="p-4">Qty</th><th className="p-4">Category</th><th className="p-4 text-right">Realized P/L</th><th className="p-4 text-center">Action</th></tr></thead>
                <tbody>
                    {filteredData.map((t) => (
                        editingTradeId === t.id ? (
                            <tr key={`edit-${t.id}`} className="bg-yellow-900/10 border-b border-yellow-500/30">
                                <td className="p-4"><input type="text" onChange={e => setManualAsset(e.target.value)} defaultValue={t.asset} className="bg-black p-1 w-full" /></td>
                                <td className="p-4"><input type="date" onChange={e => setManualDate(e.target.value)} className="bg-black p-1 w-full" /></td>
                                <td className="p-4"><input type="date" onChange={e => setManualSellDate(e.target.value)} className="bg-black p-1 w-full" /></td>
                                <td className="p-4"><input type="number" onChange={e => setManualQty(Number(e.target.value))} className="bg-black p-1 w-16" /></td>
                                <td className="p-4">—</td>
                                <td className="p-4"><input type="number" onChange={e => setManualAmountInvested(Number(e.target.value))} placeholder="Amount" className="bg-black p-1 w-20" /></td>
                                <td className="p-4 text-center"><button onClick={() => saveManualData(t.id)} className="bg-yellow-500 text-black px-3 py-1 font-bold">SAVE</button></td>
                            </tr>
                        ) : (
                        <tr key={t.id} className="border-b border-[#c0c0c0]/5 text-sm hover:bg-[#1f2f54]/40">
                            <td className="p-4">{t.asset}</td>
                            <td className="p-4 text-[#8d99ae]">{t.buyDate.toString()}</td>
                            <td className="p-4 text-[#8d99ae]">{t.sellDate instanceof Date ? t.sellDate.toLocaleDateString() : "—"}</td>
                            <td className="p-4">{t.qtySold.toFixed(4)}</td>
                            <td className="p-4"><span className={`px-2 py-1 text-xs uppercase font-bold rounded ${t.category === 'Capital' ? 'bg-purple-900' : 'bg-sky-900'}`}>{t.category}</span></td>
                            <td className="p-4 text-right font-mono">{t.category !== "Other" ? formatCurrency(t.realizedPnL) : "—"}</td>
                            <td className="p-4 text-center">
                                {t.category === "Missing Data" && <button onClick={() => startEditing(t)} className="text-yellow-400 text-xs border border-yellow-400 px-2 py-1 rounded">ADD DATA</button>}
                            </td>
                        </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <h2 className="text-xl font-bold text-[#c0c0c0] uppercase mb-4 tracking-wide">Open Portfolio</h2>
            <table className="w-full text-left bg-[#14213d] border border-[#c0c0c0]/20 shadow-lg">
                <thead><tr className="bg-[#0a1128] text-[#c0c0c0] uppercase text-xs"><th className="p-4">Asset</th><th className="p-4 text-right">Qty</th><th className="p-4 text-center">Action</th></tr></thead>
                <tbody>
                    {portfolio.map((item, idx) => (
                        <tr key={idx} className="border-b border-[#c0c0c0]/5">
                            <td className="p-4">{item.asset}</td>
                            <td className="p-4 text-right font-mono">{item.qty.toFixed(4)}</td>
                            <td className="p-4 text-center">
                                <button onClick={() => setIsSelling(item.asset)} className="bg-sky-900 px-3 py-1 text-xs rounded hover:bg-sky-700">SELL</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {isSelling && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-[#14213d] p-8 border border-sky-500 rounded shadow-2xl w-96">
                    <h3 className="text-white font-bold mb-4 uppercase">Record Sale: {isSelling}</h3>
                    <label className="text-xs text-[#c0c0c0] block mb-1">Sale Date</label>
                    <input type="date" className="block w-full mb-4 bg-[#0a1128] p-2 border border-sky-900" onChange={e => setSellDate(e.target.value)} />
                    <input type="number" placeholder="Quantity Sold" className="block w-full mb-2 bg-[#0a1128] p-2 border border-sky-900" onChange={e => setSellQty(Number(e.target.value))} />
                    <input type="number" placeholder="Total Sale Amount" className="block w-full mb-2 bg-[#0a1128] p-2 border border-sky-900" onChange={e => setSellPrice(Number(e.target.value))} />
                    <input type="number" placeholder="Total Fees" className="block w-full mb-4 bg-[#0a1128] p-2 border border-sky-900" onChange={e => setSellFee(Number(e.target.value))} />
                    <div className="flex gap-2">
                        <button onClick={() => { setIsSelling(null); }} className="bg-sky-600 flex-1 py-2 font-bold uppercase text-sm">Confirm Sale</button>
                        <button onClick={() => setIsSelling(null)} className="bg-gray-600 flex-1 py-2 font-bold uppercase text-sm">Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
