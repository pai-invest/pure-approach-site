"use client";

import React, { useState, useRef } from "react";

// Types for the FIFO accounting engine
interface BuyLot {
  date: Date;
  qty: number;
  unitCost: number;
  remainingQty: number;
}

interface RealizedTaxEvent {
  id: string;
  asset: string;
  buyDate: Date;
  sellDate: Date;
  qtySold: number;
  holdingDays: number;
  category: "Capital" | "Revenue";
  realizedPnL: number;
}

// Grouped view for the UI table
interface GroupedAssetRecord {
  asset: string;
  category: "Capital" | "Revenue";
  totalPnL: number;
  totalQtySold: number;
  earliestBuy: Date;
  latestSell: Date;
}

export default function EEDataAnalyzer() {
  const [analyzedData, setAnalyzedData] = useState<GroupedAssetRecord[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Summary state
  const [revenueLoss, setRevenueLoss] = useState(0);
  const [capitalLoss, setCapitalLoss] = useState(0);
  const [revenueProfit, setRevenueProfit] = useState(0);

  const processCSV = (text: string) => {
    const lines = text.split("\n");
    // Broker CSVs are newest to oldest. Reverse them to process chronologically
    const dataLines = lines.slice(1).filter(l => l.trim() !== "");
    dataLines.reverse(); 

    const allEvents: { date: Date; action: string; asset: string; qty: number; amount: number }[] = [];

    // 1. Extract and clean raw events (Robustly handling commas and string splits)
    for (const line of dataLines) {
      // Regex to split CSV keeping quoted strings intact
      const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
      if (!matches || matches.length < 3) continue;

      const dateStr = matches[0].replace(/^,/, "").trim();
      let comment = matches[1].replace(/^,/, "").trim().replace(/^"|"$/g, ""); // Strip quotes
      const amountStr = matches[2].replace(/^,/, "").trim();

      // Crucial Fix: Strip commas before parsing floats to prevent 1,000 becoming 1
      const amount = parseFloat(amountStr.replace(/,/g, "")) || 0;
      const date = new Date(dateStr);

      const isBuy = comment.startsWith("Bought ");
      const isSell = comment.startsWith("Sold ");

      if (isBuy || isSell) {
        const action = isBuy ? "Buy" : "Sell";
        const withoutAction = comment.replace(/^(Bought|Sold) /, "").trim();
        const atParts = withoutAction.split(" @ ");
        
        if (atParts.length >= 2) {
          const leftSide = atParts[0].trim().split(" ");
          // Extract the quantity (the last string before the @)
          const qtyStr = leftSide.pop() || "0";
          const qty = parseFloat(qtyStr.replace(/,/g, ""));
          const assetName = leftSide.join(" ").trim();

          if (qty > 0 && assetName) {
            allEvents.push({ date, action, asset: assetName, qty, amount });
          }
        }
      }
    }

    // Stable sort by Date (Preserves exact intraday order because we pre-reversed)
    allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

    const lots = new Map<string, BuyLot[]>();
    const realizedTrades: RealizedTaxEvent[] = [];

    // 2. Exact Fractional FIFO Accounting Engine
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
      } else if (event.action === "Sell") {
        let remainingToSell = event.qty;
        // Total credit received per unit for this sell block
        const unitSellPrice = Math.abs(event.amount) / event.qty;

        for (const lot of assetLots) {
          // Floating point buffer to prevent microscopic fractional remainders 
          if (remainingToSell <= 0.000001) break; 
          if (lot.remainingQty <= 0.000001) continue;

          // Slice exact quantity needed from this specific historical lot
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
            holdingDays,
            category,
            realizedPnL,
          });
        }
      }
    }

    // 3. Aggregate fractional results for the UI
    let revLoss = 0, capLoss = 0, revProf = 0;
    const grouped = new Map<string, GroupedAssetRecord>();

    for (const trade of realizedTrades) {
      if (trade.category === "Revenue" && trade.realizedPnL < 0) revLoss += trade.realizedPnL;
      if (trade.category === "Capital" && trade.realizedPnL < 0) capLoss += trade.realizedPnL;
      if (trade.category === "Revenue" && trade.realizedPnL > 0) revProf += trade.realizedPnL;

      const key = `${trade.asset}-${trade.category}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          asset: trade.asset,
          category: trade.category,
          totalPnL: 0,
          totalQtySold: 0,
          earliestBuy: trade.buyDate,
          latestSell: trade.sellDate,
        });
      }

      const g = grouped.get(key)!;
      g.totalPnL += trade.realizedPnL;
      g.totalQtySold += trade.qtySold;
      if (trade.buyDate < g.earliestBuy) g.earliestBuy = trade.buyDate;
      if (trade.sellDate > g.latestSell) g.latestSell = trade.sellDate;
    }

    setRevenueLoss(revLoss);
    setCapitalLoss(capLoss);
    setRevenueProfit(revProf);
    
    // Convert map to array and sort by worst losses first
    const finalData = Array.from(grouped.values()).sort((a, b) => a.totalPnL - b.totalPnL);
    setAnalyzedData(finalData);
    setIsAnalyzing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      processCSV(text);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
        <div className="mb-8 border-b border-[#c0c0c0]/30 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#c0c0c0] tracking-wide uppercase">FIFO TAX ANALYZER</h1>
            <p className="text-[#8d99ae] text-sm mt-1">Strict Parcel Tracing (Capital vs Revenue)</p>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2 font-bold hover:bg-white transition shadow-[0_0_15px_rgba(192,192,192,0.15)] rounded-sm"
          >
            {isAnalyzing ? "ANALYZING..." : "UPLOAD EE CSV"}
          </button>
          <input 
            type="file" 
            accept=".csv" 
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#081b2e] border border-sky-800 p-6 shadow-lg rounded-sm text-center flex flex-col justify-center">
                <h3 className="text-sky-400 font-bold mb-2 uppercase tracking-widest text-xs">Valid Revenue Shield</h3>
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
            </div>

            <div className="overflow-x-auto bg-[#14213d] p-1 shadow-lg border border-[#c0c0c0]/20 rounded-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#c0c0c0] border-b border-[#c0c0c0]/20 bg-[#0a1128]">
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Asset / Ticker</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Earliest Parcel</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Latest Exit</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Qty Sold</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">SARS Category</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold text-right">Realized P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {analyzedData.map((trade, idx) => (
                    <tr key={idx} className="border-b border-[#c0c0c0]/5 hover:bg-[#1f2f54]/40 transition">
                      <td className="p-4 font-semibold text-[#e0e1dd]">{trade.asset}</td>
                      <td className="p-4 text-sm text-[#8d99ae]">{trade.earliestBuy.toLocaleDateString()}</td>
                      <td className="p-4 text-sm text-[#8d99ae]">{trade.latestSell.toLocaleDateString()}</td>
                      <td className="p-4 text-sm font-mono text-[#e0e1dd]">{trade.totalQtySold.toFixed(4)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded-sm uppercase tracking-wider ${
                          trade.category === "Capital" 
                            ? "bg-purple-900/40 text-purple-300 border border-purple-800" 
                            : "bg-sky-900/40 text-sky-300 border border-sky-800"
                        }`}>
                          {trade.category}
                        </span>
                      </td>
                      <td className={`p-4 font-mono font-bold text-sm text-right ${trade.totalPnL < 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {trade.totalPnL < 0 ? "" : "+"}{trade.totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
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
