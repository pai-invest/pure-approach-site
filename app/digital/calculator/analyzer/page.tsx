"use client";

import React, { useState, useRef } from "react";

interface BuyLot {
  date: Date;
  qty: number;
  unitCost: number;
  remainingQty: number;
}

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
  const [analyzedData, setAnalyzedData] = useState<RealizedTaxEvent[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Segment / Time Filter State
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Derived Filtered Data
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

  // Dynamic Macro Summaries (Based strictly on Filtered Data)
  const revenueLoss = filteredData.reduce((sum, t) => t.category === "Revenue" && t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0);
  const capitalLoss = filteredData.reduce((sum, t) => t.category === "Capital" && t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0);
  const revenueProfit = filteredData.reduce((sum, t) => t.category === "Revenue" && t.realizedPnL > 0 ? sum + t.realizedPnL : sum, 0);
  
  // Explicit Net P/L Calculation (Total Profit - Total Loss)
  const totalProfit = filteredData.reduce((sum, t) => t.realizedPnL > 0 ? sum + t.realizedPnL : sum, 0);
  const totalLoss = Math.abs(filteredData.reduce((sum, t) => t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0));
  const netPnL = totalProfit - totalLoss;

  const parseNumber = (val: string) => {
    // Handles replacing decimal comma with dot for accurate math
    return parseFloat(val.replace(/\s/g, "").replace(",", ".")) || 0;
  };

  const processCSV = (text: string) => {
    const lines = text.split(/\r?\n/);
    const dataLines = lines.slice(1).filter(l => l.trim() !== "");
    dataLines.reverse(); 

    const allEvents: { date: Date; action: string; asset: string; qty: number; amount: number }[] = [];

    for (const line of dataLines) {
      // Auto-detect if file uses semicolon or comma
      const delimiter = line.includes(";") ? ";" : ",";
      const parts = line.split(delimiter);
      if (parts.length < 3) continue;

      const dateStr = parts[0].trim();
      let comment = parts[1].replace(/^"|"$/g, "").trim(); 
      const amountStr = parts[2].trim();

      const amount = parseNumber(amountStr);
      const date = new Date(dateStr.replace(/\//g, "-"));

      const isBuy = comment.startsWith("Bought ");
      const isSell = comment.startsWith("Sold ");
      const isCA = comment.startsWith("Corporate Action ");

      if (isBuy || isSell) {
        const action = isBuy ? "Buy" : "Sell";
        const withoutAction = comment.replace(/^(Bought|Sold) /, "").trim();
        const atParts = withoutAction.split(" @ ");
        
        if (atParts.length >= 2) {
          const leftSide = atParts[0].trim().split(" ");
          const qtyStr = leftSide.pop() || "0";
          const qty = parseNumber(qtyStr);
          const assetName = leftSide.join(" ").trim();

          if (qty > 0 && assetName) {
            allEvents.push({ date, action, asset: assetName, qty, amount });
          }
        }
      } else if (isCA) {
        const withoutCA = comment.replace(/^Corporate Action /, "").trim();
        const atParts = withoutCA.split(" @ ");
        
        if (atParts.length >= 2) {
          const leftSide = atParts[0].trim().split(" ");
          const qtyStr = leftSide.pop() || "0";
          const qty = parseNumber(qtyStr);
          const type = leftSide.shift(); 
          const assetName = leftSide.join(" ").trim(); 

          if ((type === "Consolidation" || type === "Subdivision") && assetName) {
            allEvents.push({ date, action: "CA", asset: assetName, qty, amount: 0 });
          }
        }
      }
    }

    allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

    const lots = new Map<string, BuyLot[]>();
    const realizedTrades: RealizedTaxEvent[] = [];

    for (const event of allEvents) {
      if (!lots.has(event.asset)) lots.set(event.asset, []);
      const assetLots = lots.get(event.asset)!;

      if (event.action === "Buy") {
        assetLots.push({
          date: event.date,
          qty: event.qty,
          unitCost: Math.abs(event.amount) / event.qty,
          remainingQty: event.qty,
        });
      } 
      else if (event.action === "CA") {
        let totalRemaining = 0;
        for (const lot of assetLots) totalRemaining += lot.remainingQty;
        if (totalRemaining > 0) {
          const newTotal = totalRemaining + event.qty; 
          const ratio = newTotal / totalRemaining;
          for (const lot of assetLots) {
            lot.remainingQty *= ratio;
            lot.unitCost /= ratio; 
          }
        }
      }
      else if (event.action === "Sell") {
        let remainingToSell = event.qty;
        const unitSellPrice = Math.abs(event.amount) / event.qty;

        for (const lot of assetLots) {
          if (remainingToSell <= 0.000001) break; 
          if (lot.remainingQty <= 0.000001) continue;

          const qtyToTake = Math.min(remainingToSell, lot.remainingQty);
          lot.remainingQty -= qtyToTake;
          remainingToSell -= qtyToTake;

          const holdingDays = Math.ceil(Math.abs(event.date.getTime() - lot.date.getTime()) / (1000 * 60 * 60 * 24));
          const category = holdingDays >= 1095 ? "Capital" : "Revenue";
          const realizedPnL = (qtyToTake * unitSellPrice) - (qtyToTake * lot.unitCost);

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

  const [editingTradeId, setEditingTradeId] = useState<string | null>(null);
  const [manualDate, setManualDate] = useState<string>("");
  const [manualUnitCost, setManualUnitCost] = useState<number | "">("");

  const saveManualData = (tradeId: string) => {
    if (!manualDate || manualUnitCost === "") return;
    const parsedDate = new Date(manualDate);
    const unitCost = Number(manualUnitCost);

    setAnalyzedData(prevData => prevData.map(trade => {
      if (trade.id === tradeId) {
        // FIXED ARITHMETIC: Added .getTime()
        const holdingDays = Math.ceil(Math.abs(trade.sellDate.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24));
        const category = holdingDays >= 1095 ? "Capital" : "Revenue";
        return {
          ...trade,
          asset: trade.asset.replace(" (Missing Buy Data)", ""),
          buyDate: parsedDate,
          holdingDays,
          category,
          realizedPnL: (trade.qtySold * trade.unitSellPrice) - (trade.qtySold * unitCost)
        };
      }
      return trade;
    }));
    setEditingTradeId(null);
  };

  return (
    <>
      <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
        <div className="mb-8 border-b border-[#c0c0c0]/30 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#c0c0c0] tracking-wide uppercase">FIFO TAX ANALYZER</h1>
          </div>
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2 font-bold"
          >
            {isAnalyzing ? "ANALYZING..." : "UPLOAD EE CSV"}
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
        </div>

        {analyzedData.length > 0 && (
          <>
            <div className="mb-6 p-4 bg-[#14213d] flex gap-4">
               <input type="date" onChange={(e) => setStartDate(e.target.value)} className="bg-black p-2 border border-gray-600"/>
               <input type="date" onChange={(e) => setEndDate(e.target.value)} className="bg-black p-2 border border-gray-600"/>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-[#081b2e] p-6 text-center border border-sky-800"><h3 className="text-sky-400 text-xs">REV LOSS</h3><p className="text-xl text-red-400">{revenueLoss.toFixed(2)}</p></div>
              <div className="bg-[#120f1a] p-6 text-center border border-purple-900"><h3 className="text-purple-400 text-xs">CAP LOSS</h3><p className="text-xl text-red-400">{capitalLoss.toFixed(2)}</p></div>
              <div className="bg-[#0a1128] p-6 text-center border border-gray-600"><h3 className="text-gray-400 text-xs">REV PROFIT</h3><p className="text-xl text-green-400">{revenueProfit.toFixed(2)}</p></div>
              <div className="bg-[#14213d] p-6 text-center border border-blue-900"><h3 className="text-blue-400 text-xs">NET P/L</h3><p className="text-xl text-blue-400">{netPnL.toFixed(2)}</p></div>
            </div>

            <table className="w-full text-left bg-[#14213d] border border-gray-700">
              <thead><tr className="border-b border-gray-700"><th className="p-4">ASSET</th><th className="p-4">P/L</th><th className="p-4">ACTION</th></tr></thead>
              <tbody>
                {filteredData.map(trade => (
                  <tr key={trade.id} className="border-b border-gray-800">
                    <td className="p-4">{trade.asset}</td>
                    <td className="p-4">{trade.realizedPnL.toFixed(2)}</td>
                    <td className="p-4">
                      {trade.category === "Missing Data" && editingTradeId !== trade.id && (
                        <button onClick={() => setEditingTradeId(trade.id)} className="text-yellow-500 underline">ADD DATA</button>
                      )}
                      {editingTradeId === trade.id && (
                        <div className="flex gap-2">
                          <input type="date" onChange={e => setManualDate(e.target.value)} className="text-black p-1"/>
                          <input type="number" placeholder="Cost" onChange={e => setManualUnitCost(parseFloat(e.target.value))} className="text-black p-1"/>
                          <button onClick={() => saveManualData(trade.id)} className="text-green-500 font-bold">SAVE</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}
