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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        processCSV(text);
      } catch (error) {
        setIsAnalyzing(false);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
        <h1 className="text-3xl font-bold text-[#c0c0c0] mb-8 uppercase tracking-widest">FIFO TAX ANALYZER</h1>
        
        <div className="flex gap-4 mb-8">
            <button onClick={() => fileInputRef.current?.click()} className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2 font-bold">UPLOAD CSV</button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#081b2e] border border-sky-800 p-6 text-center">
                <h3 className="text-xs uppercase text-sky-400">Revenue Losses</h3>
                <p className="text-3xl text-red-400">{formatCurrency(revenueLoss)}</p>
            </div>
            <div className="bg-[#120f1a] border border-purple-900 p-6 text-center">
                <h3 className="text-xs uppercase text-purple-400">Net Capital P/L</h3>
                <p className="text-3xl text-green-400">{formatCurrency(netCapitalPnL)}</p>
            </div>
             <div className="bg-[#0a1128] border border-[#c0c0c0]/30 p-6 text-center">
                <h3 className="text-xs uppercase text-[#c0c0c0]">Revenue Profits</h3>
                <p className="text-3xl text-green-400">{formatCurrency(revenueProfit)}</p>
            </div>
            <div className="bg-[#14213d] border border-blue-500/30 p-6 text-center">
                <h3 className="text-xs uppercase text-blue-400">Trading Net P/L</h3>
                <p className="text-3xl text-green-400">{formatCurrency(netPnL)}</p>
            </div>
        </div>

        <div className="overflow-x-auto bg-[#14213d] border border-[#c0c0c0]/20 mb-12">
            <table className="w-full text-left">
                <thead><tr className="bg-[#0a1128] text-[#c0c0c0] uppercase text-xs"><th className="p-4">Asset</th><th className="p-4">Buy Date</th><th className="p-4">Sell Date</th><th className="p-4">PnL</th></tr></thead>
                <tbody>
                    {filteredData.map((t, i) => (
                        <tr key={i} className="border-b border-[#c0c0c0]/5 text-sm">
                            <td className="p-4">{t.asset}</td>
                            <td className="p-4">{t.buyDate.toString()}</td>
                            <td className="p-4">{t.sellDate.toLocaleDateString()}</td>
                            <td className="p-4 font-mono">{t.category !== "Other" ? formatCurrency(t.realizedPnL) : "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <h2 className="text-xl font-bold text-[#c0c0c0] uppercase mb-4">Open Portfolio</h2>
            <table className="w-full text-left bg-[#14213d] border border-[#c0c0c0]/20">
                <thead><tr className="bg-[#0a1128] text-[#c0c0c0] uppercase text-xs"><th className="p-4">Asset</th><th className="p-4 text-right">Qty</th><th className="p-4 text-center">Action</th></tr></thead>
                <tbody>
                    {portfolio.map((item, idx) => (
                        <tr key={idx} className="border-b border-[#c0c0c0]/5">
                            <td className="p-4">{item.asset}</td>
                            <td className="p-4 text-right">{item.qty.toFixed(4)}</td>
                            <td className="p-4 text-center">
                                <button onClick={() => setIsSelling(item.asset)} className="bg-sky-900 px-3 py-1 text-xs rounded">SELL</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {isSelling && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-[#14213d] p-6 border border-sky-500 rounded-sm">
                    <h3 className="text-white mb-4">Record Sale for {isSelling}</h3>
                    <input type="date" className="block w-full mb-2 bg-[#0a1128] p-2" onChange={e => setSellDate(e.target.value)} />
                    <input type="number" placeholder="Qty" className="block w-full mb-2 bg-[#0a1128] p-2" onChange={e => setSellQty(Number(e.target.value))} />
                    <input type="number" placeholder="Total Sale Price" className="block w-full mb-2 bg-[#0a1128] p-2" onChange={e => setSellPrice(Number(e.target.value))} />
                    <input type="number" placeholder="Fees" className="block w-full mb-2 bg-[#0a1128] p-2" onChange={e => setSellFee(Number(e.target.value))} />
                    <div className="flex gap-2">
                        <button onClick={() => { /* Add logic to push to realizedTrades */ setIsSelling(null); }} className="bg-sky-600 px-4 py-2">CONFIRM SALE</button>
                        <button onClick={() => setIsSelling(null)} className="bg-gray-600 px-4 py-2">CANCEL</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
