"use client";

import React, { useState, useRef } from "react";

interface RealizedTaxEvent {
  id: string;
  asset: string;
  buyDate: Date | string;
  sellDate: Date;
  qtySold: number;
  unitSellPrice: number;
  holdingDays: number | string;
  category: "Capital" | "Revenue" | "Missing Data";
  realizedPnL: number;
}

export default function EEDataAnalyzer() {
  const [analyzedData, setAnalyzedData] = useState([] as RealizedTaxEvent[]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null as HTMLInputElement | null);

  const [currency, setCurrency] = useState("ZAR");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = analyzedData.filter((trade) => {
    let isValid = true;
    if (startDate) {
      const start = new Date(startDate + "T00:00:00");
      isValid = isValid && trade.sellDate >= start;
    }
    if (endDate) {
      const end = new Date(endDate + "T23:59:59");
      isValid = isValid && trade.sellDate <= end;
    }
    return isValid;
  });

  const revenueLoss = filteredData.reduce((sum, t) => t.category === "Revenue" && t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0);
  const capitalLoss = filteredData.reduce((sum, t) => t.category === "Capital" && t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0);
  const revenueProfit = filteredData.reduce((sum, t) => t.category === "Revenue" && t.realizedPnL > 0 ? sum + t.realizedPnL : sum, 0);
  const netPnL = (filteredData.reduce((sum, t) => t.realizedPnL > 0 ? sum + t.realizedPnL : sum, 0)) - Math.abs(filteredData.reduce((sum, t) => t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0));

  const formatCurrency = (amount: number, showPlus = false) => {
    const sym = currency === "USD" ? "$" : "R";
    const isNeg = amount < 0;
    const absVal = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${isNeg ? '-' : ''}${showPlus && amount > 0 ? '+' : ''}${sym}${absVal}`;
  };

  const parseRegionalNumber = (numStr: string) => {
    if (!numStr) return 0;
    let s = numStr.trim().replace(/\s/g, "");
    s = s.replace(",", "."); // Force dot for decimal
    return parseFloat(s) || 0;
  };

  const processCSV = (text: string) => {
    const lines = text.split(/\r?\n/);
    const dataLines = lines.slice(1).filter((l) => l.trim() !== "");
    dataLines.reverse(); 

    const allEvents: any[] = [];

    for (const line of dataLines) {
      const parts = line.split(";");
      if (parts.length < 3) continue;

      const date = new Date(parts[0].replace(/\//g, "-"));
      const comment = parts[1].replace(/^"|"$/g, "").trim();
      const amount = parseRegionalNumber(parts[2]);

      if (isNaN(date.getTime())) continue;

      if (comment.startsWith("Bought ") || comment.startsWith("Sold ")) {
        const action = comment.startsWith("Bought ") ? "Buy" : "Sell";
        const partsInfo = comment.replace(/^(Bought|Sold) /, "").split(" @ ");
        if (partsInfo.length >= 2) {
          const info = partsInfo[0].split(" ");
          const qty = parseFloat(info.pop()?.replace(",", ".") || "0");
          const asset = info.join(" ");
          allEvents.push({ date, action, asset, qty, amount });
        }
      }
    }

    const lots = new Map<string, any[]>();
    const realizedTrades: RealizedTaxEvent[] = [];

    for (const e of allEvents.sort((a,b) => a.date - b.date)) {
      if (!lots.has(e.asset)) lots.set(e.asset, []);
      const assetLots = lots.get(e.asset)!;

      if (e.action === "Buy") {
        assetLots.push({ date: e.date, qty: e.qty, unitCost: Math.abs(e.amount) / e.qty, remainingQty: e.qty });
      } else if (e.action === "Sell") {
        let toSell = e.qty;
        const unitPrice = Math.abs(e.amount) / e.qty;
        for (const lot of assetLots) {
          if (toSell <= 0) break;
          const take = Math.min(toSell, lot.remainingQty);
          lot.remainingQty -= take;
          toSell -= take;
          const days = Math.ceil(Math.abs(e.date - lot.date) / (1000*60*60*24));
          realizedTrades.push({
            id: Math.random().toString(), asset: e.asset, buyDate: lot.date, sellDate: e.date, qtySold: take,
            unitSellPrice: unitPrice, holdingDays: days, category: days >= 1095 ? "Capital" : "Revenue",
            realizedPnL: (take * unitPrice) - (take * lot.unitCost)
          });
        }
        if (toSell > 0) {
            realizedTrades.push({
                id: Math.random().toString(), asset: e.asset + " (Missing Data)", buyDate: "Unknown", sellDate: e.date, qtySold: toSell,
                unitSellPrice: unitPrice, holdingDays: "N/A", category: "Missing Data", realizedPnL: (toSell * unitPrice)
            });
        }
      }
    }
    setAnalyzedData(realizedTrades.sort((a, b) => b.sellDate.getTime() - a.sellDate.getTime()));
    setIsAnalyzing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
        try { processCSV(evt.target?.result as string); }
        catch (err) { alert("Format error"); setIsAnalyzing(false); }
    };
    reader.readAsText(file);
  };

  const saveManualData = (id: string, date: string, cost: string) => {
    const parsedDate = new Date(date);
    const costVal = parseFloat(cost);
    setAnalyzedData(prev => prev.map(t => t.id === id ? {
        ...t, asset: t.asset.replace(" (Missing Data)", ""), buyDate: parsedDate,
        realizedPnL: (t.qtySold * t.unitSellPrice) - (t.qtySold * costVal), category: Math.ceil(Math.abs(t.sellDate - parsedDate)/(1000*60*60*24)) >= 1095 ? "Capital" : "Revenue"
    } : t));
    setEditingTradeId(null);
  };

  const [editingTradeId, setEditingTradeId] = useState(null as string | null);
  const [mDate, setMDate] = useState("");
  const [mCost, setMCost] = useState("");

  return (
    <div className="p-10 bg-[#0a1128] text-[#e0e1dd] min-h-screen">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">FIFO ANALYZER</h1>
        <button onClick={() => fileInputRef.current?.click()} className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2">
            {isAnalyzing ? "..." : "UPLOAD CSV"}
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
      </div>

      {analyzedData.length > 0 && (
        <div className="space-y-6">
            <div className="flex gap-4 p-4 bg-[#14213d]">
                <select onChange={(e) => setCurrency(e.target.value)} className="bg-black p-2"><option>ZAR</option><option>USD</option></select>
                <input type="date" onChange={(e) => setStartDate(e.target.value)} className="bg-black p-2"/>
                <input type="date" onChange={(e) => setEndDate(e.target.value)} className="bg-black p-2"/>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-[#081b2e] border-sky-900 border text-center"><p className="text-xs text-sky-400">REV LOSS</p><p className="text-xl text-red-400">{formatCurrency(revenueLoss)}</p></div>
                <div className="p-4 bg-[#120f1a] border-purple-900 border text-center"><p className="text-xs text-purple-400">CAP LOSS</p><p className="text-xl text-red-400">{formatCurrency(capitalLoss)}</p></div>
                <div className="p-4 bg-[#0a1128] border-gray-600 border text-center"><p className="text-xs">REV PROFIT</p><p className="text-xl text-green-400">{formatCurrency(revenueProfit)}</p></div>
                <div className="p-4 bg-[#14213d] border-blue-900 border text-center"><p className="text-xs text-blue-400">NET P/L</p><p className="text-xl text-blue-400">{formatCurrency(netPnL)}</p></div>
            </div>

            <table className="w-full text-left">
                <thead><tr className="border-b border-gray-700"><th className="p-4">ASSET</th><th className="p-4">P/L</th><th className="p-4">ACTION</th></tr></thead>
                <tbody>
                    {filteredData.map(t => (
                        <tr key={t.id} className="border-b border-gray-800">
                            <td className="p-4">{t.asset}</td>
                            <td className="p-4">{formatCurrency(t.realizedPnL)}</td>
                            <td className="p-4">
                                {t.category === "Missing Data" && editingTradeId !== t.id && <button onClick={() => setEditingTradeId(t.id)} className="text-yellow-500">ADD</button>}
                                {editingTradeId === t.id && (
                                    <div className="flex gap-2">
                                        <input type="date" onChange={(e) => setMDate(e.target.value)} className="text-black"/>
                                        <input type="number" placeholder="Cost" onChange={(e) => setMCost(e.target.value)} className="text-black"/>
                                        <button onClick={() => saveManualData(t.id, mDate, mCost)} className="text-green-500">SAVE</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}
