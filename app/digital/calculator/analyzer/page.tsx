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

  const processCSV = (text: string) => {
    const lines = text.split("\n");
    const dataLines = lines.slice(1).filter(l => l.trim() !== "");
    dataLines.reverse(); 

    const allEvents: { date: Date; action: string; asset: string; qty: number; amount: number }[] = [];

    for (const line of dataLines) {
      const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
      if (!matches || matches.length < 3) continue;

      const dateStr = matches[0].replace(/^,/, "").trim();
      let comment = matches[1].replace(/^,/, "").trim().replace(/^"|"$/g, ""); 
      const amountStr = matches[2].replace(/^,/, "").trim();

      const amount = parseFloat(amountStr.replace(/,/g, "")) || 0;
      const date = new Date(dateStr);

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
          const qty = parseFloat(qtyStr.replace(/,/g, ""));
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
          const qty = parseFloat(qtyStr.replace(/,/g, ""));
          
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
          
          if (newTotal > 0) {
            const ratio = newTotal / totalRemaining;
            for (const lot of assetLots) {
              lot.remainingQty *= ratio;
              lot.unitCost /= ratio; 
            }
          } else {
            for (const lot of assetLots) lot.remainingQty = 0;
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

          const chunkCost = qtyToTake * lot.unitCost;
          const chunkProceeds = qtyToTake * unitSellPrice;
          const realizedPnL = chunkProceeds - chunkCost;

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
            realizedPnL: (remainingToSell * unitSellPrice) - 0, 
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
        console.error("Parse Error:", error);
        alert("The parser failed on a specific CSV row. Check the browser console (F12) for the exact error.");
        setIsAnalyzing(false);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const [editingTradeId, setEditingTradeId] = useState<string | null>(null);
  const [manualDate, setManualDate] = useState<string>("");
  const [manualUnitCost, setManualUnitCost] = useState<number | "">("");

  const startEditing = (trade: RealizedTaxEvent) => {
    setEditingTradeId(trade.id);
    setManualDate("");
    setManualUnitCost("");
  };

  const saveManualData = (tradeId: string) => {
    if (!manualDate || manualUnitCost === "") {
      alert("Please provide both the original buy date and the average buy price per share.");
      return;
    }

    const parsedDate = new Date(manualDate);
    const unitCost = Number(manualUnitCost);

    setAnalyzedData(prevData => prevData.map(trade => {
      if (trade.id === tradeId) {
        const holdingDays = Math.ceil(Math.abs(trade.sellDate.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24));
        const category = holdingDays >= 1095 ? "Capital" : "Revenue";
        
        const costBasis = trade.qtySold * unitCost;
        const proceeds = trade.qtySold * trade.unitSellPrice;
        const newRealizedPnL = proceeds - costBasis;

        return {
          ...trade,
          asset: trade.asset.replace(" (Missing Buy Data)", ""),
          buyDate: parsedDate,
          holdingDays,
          category,
          realizedPnL: newRealizedPnL
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
            <p className="text-[#8d99ae] text-sm mt-1">Strict Parcel Tracing (Splits & Capital vs Revenue)</p>
          </div>
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2 font-bold hover:bg-white transition shadow-[0_0_15px_rgba(192,192,192,0.15)] rounded-sm"
          >
            {isAnalyzing ? "ANALYZING..." : "UPLOAD EE CSV"}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </div>

        {analyzedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#c0c0c0]/30 rounded-sm bg-[#14213d]">
            <p className="text-[#8d99ae] mb-4">Export your Account History from EasyEquities as a CSV</p>
            <p className="text-[#c0c0c0] font-mono text-sm">Upload to run fractional FIFO parcel tracing.</p>
          </div>
        ) : (
          <>
            {/* Dynamic Date Segment Filter */}
            <div className="mb-6 p-4 bg-[#14213d] border border-[#c0c0c0]/20 rounded-sm flex flex-wrap gap-4 items-end shadow-md">
              <div className="flex flex-col">
                <label className="text-[#8d99ae] text-xs uppercase tracking-widest mb-1 font-semibold">Segment Start</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  className="bg-[#0a1128] border border-[#c0c0c0]/30 p-2 rounded-sm text-[#e0e1dd] text-sm focus:outline-none focus:border-sky-500 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#8d99ae] text-xs uppercase tracking-widest mb-1 font-semibold">Segment End</label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  className="bg-[#0a1128] border border-[#c0c0c0]/30 p-2 rounded-sm text-[#e0e1dd] text-sm focus:outline-none focus:border-sky-500 transition"
                />
              </div>
              <button 
                onClick={() => { setStartDate(""); setEndDate(""); }}
                className="bg-[#c0c0c0]/10 text-[#c0c0c0] px-4 py-2 text-sm font-bold hover:bg-[#c0c0c0]/20 transition rounded-sm border border-[#c0c0c0]/20"
              >
                CLEAR FILTER
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#081b2e] border border-sky-800 p-6 shadow-lg rounded-sm text-center flex flex-col justify-center">
                <h3 className="text-sky-400 font-bold mb-2 uppercase tracking-widest text-xs">Revenue Losses</h3>
                <p className="text-3xl font-mono text-red-400">
                  {revenueLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[#8d99ae] text-xs mt-2">Deductible against short-term trades</p>
              </div>
              <div className="bg-[#120f1a] border border-purple-900 p-6 shadow-lg rounded-sm text-center flex flex-col justify-center">
                <h3 className="text-purple-400 font-bold mb-2 uppercase tracking-widest text-xs">Locked Capital Losses</h3>
                <p className="text-3xl font-mono text-red-400">
                  {capitalLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[#8d99ae] text-xs mt-2">Ring-fenced for &gt;36 month holdings</p>
              </div>
              <div className="bg-[#0a1128] border border-[#c0c0c0]/30 p-6 shadow-lg rounded-sm text-center flex flex-col justify-center">
                <h3 className="text-[#c0c0c0] font-bold mb-2 uppercase tracking-widest text-xs">Revenue Profits</h3>
                <p className="text-3xl font-mono text-green-400">
                  +{revenueProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[#8d99ae] text-xs mt-2">Taxable at flat 27% corporate rate</p>
              </div>
              <div className="bg-[#14213d] border border-blue-500/30 p-6 shadow-lg rounded-sm text-center flex flex-col justify-center">
                <h3 className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-xs">Total Net P/L</h3>
                <p className={`text-3xl font-mono ${netPnL < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {netPnL < 0 ? "" : "+"}{netPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[#8d99ae] text-xs mt-2">Overall realized performance</p>
              </div>
            </div>

            <div className="overflow-x-auto bg-[#14213d] p-1 shadow-lg border border-[#c0c0c0]/20 rounded-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#c0c0c0] border-b border-[#c0c0c0]/20 bg-[#0a1128]">
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Asset / Ticker</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Buy Date</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Sell Date</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Qty Matched</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">SARS Category</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold text-right">Realized P/L</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((trade) => (
                    editingTradeId === trade.id ? (
                      <tr key={`edit-${trade.id}`} className="border-b border-yellow-500/30 bg-yellow-900/10 transition">
                        <td className="p-4 font-semibold text-yellow-400">
                          {trade.asset.replace(" (Missing Buy Data)", "")}
                        </td>
                        <td className="p-4">
                          <input 
                            type="date" 
                            value={manualDate} 
                            onChange={e => setManualDate(e.target.value)} 
                            className="bg-[#0a1128] border border-yellow-500/50 p-1.5 rounded-sm text-[#e0e1dd] text-sm focus:outline-none focus:border-yellow-400 w-full max-w-[140px]" 
                          />
                        </td>
                        <td className="p-4 text-sm text-[#8d99ae]">{trade.sellDate.toLocaleDateString()}</td>
                        <td className="p-4 text-sm font-mono text-[#e0e1dd]">{trade.qtySold.toFixed(4)}</td>
                        <td className="p-4">
                          <input 
                            type="number" 
                            placeholder="Avg Price/Share" 
                            value={manualUnitCost} 
                            onChange={e => setManualUnitCost(e.target.value ? parseFloat(e.target.value) : "")} 
                            className="bg-[#0a1128] border border-yellow-500/50 p-1.5 rounded-sm text-[#e0e1dd] text-sm focus:outline-none focus:border-yellow-400 w-full max-w-[130px]" 
                          />
                        </td>
                        <td className="p-4 text-xs text-yellow-400/70 text-right uppercase mt-1 block">Awaiting P/L</td>
                        <td className="p-4 text-center whitespace-nowrap">
                          <button onClick={() => saveManualData(trade.id)} className="bg-yellow-500 text-[#0a1128] px-3 py-1.5 font-bold text-xs rounded-sm hover:bg-yellow-400 transition mr-2">SAVE</button>
                          <button onClick={() => setEditingTradeId(null)} className="text-[#8d99ae] hover:text-white text-xs font-semibold">CANCEL</button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={trade.id} className="border-b border-[#c0c0c0]/5 hover:bg-[#1f2f54]/40 transition">
                        <td className={`p-4 font-semibold ${trade.category === 'Missing Data' ? 'text-yellow-400' : 'text-[#e0e1dd]'}`}>
                          {trade.asset}
                        </td>
                        <td className="p-4 text-sm text-[#8d99ae]">
                          {trade.buyDate instanceof Date ? trade.buyDate.toLocaleDateString() : trade.buyDate}
                        </td>
                        <td className="p-4 text-sm text-[#8d99ae]">{trade.sellDate.toLocaleDateString()}</td>
                        <td className="p-4 text-sm font-mono text-[#e0e1dd]">{trade.qtySold.toFixed(4)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs font-bold rounded-sm uppercase tracking-wider ${
                            trade.category === "Capital" ? "bg-purple-900/40 text-purple-300 border border-purple-800" : 
                            trade.category === "Revenue" ? "bg-sky-900/40 text-sky-300 border border-sky-800" :
                            "bg-yellow-900/40 text-yellow-300 border border-yellow-800"
                          }`}>
                            {trade.category}
                          </span>
                        </td>
                        <td className={`p-4 font-mono font-bold text-sm text-right ${trade.category === 'Missing Data' ? 'text-[#8d99ae]' : trade.realizedPnL < 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {trade.category === 'Missing Data' ? "—" : `${trade.realizedPnL < 0 ? "" : "+"}${trade.realizedPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        </td>
                        <td className="p-4 text-center">
                          {trade.category === "Missing Data" && (
                            <button onClick={() => startEditing(trade)} className="text-yellow-400 border border-yellow-500/50 px-2 py-1 text-xs font-bold rounded-sm hover:bg-yellow-500/20 transition">+ ADD DATA</button>
                          )}
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
