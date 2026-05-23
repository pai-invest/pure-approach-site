"use client";

import React, { useState, useRef } from "react";

// Types for our parsed data
interface ParsedTrade {
  asset: string;
  firstBuyDate: Date | null;
  lastSellDate: Date | null;
  netPosition: number; // Sum of buys (debits) and sells (credits)
  status: "Open" | "Closed" | "Partial";
  category: "Capital" | "Revenue" | "Unknown";
  holdingPeriodDays: number;
}

export default function EEDataAnalyzer() {
  const [analyzedData, setAnalyzedData] = useState<ParsedTrade[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Summary state
  const [revenueLoss, setRevenueLoss] = useState(0);
  const [capitalLoss, setCapitalLoss] = useState(0);
  const [revenueProfit, setRevenueProfit] = useState(0);

  // The custom CSV parser to handle EasyEquities formatting
  const processCSV = (text: string) => {
    const lines = text.split("\n");
    const assetMap = new Map<string, any>();

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle quotes in CSV (e.g. "Bought IREN Ltd 3.53 @ 5,617.00")
      const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
      if (!matches || matches.length < 3) continue;

      const dateStr = matches[0].replace(/^,/, "").trim();
      let comment = matches[1].replace(/^,/, "").trim();
      const amountStr = matches[2].replace(/^,/, "").trim();

      comment = comment.replace(/^"|"$/g, ""); // Remove wrapping quotes
      const amount = parseFloat(amountStr) || 0;
      const date = new Date(dateStr);

      let action = "Other";
      let assetName = "";

      // Extract Asset Name from Comment string
      if (comment.startsWith("Bought ")) {
        action = "Buy";
        const parts = comment.replace("Bought ", "").split(" ");
        const atIndex = parts.indexOf("@");
        if (atIndex > 1) assetName = parts.slice(0, atIndex - 1).join(" ");
      } else if (comment.startsWith("Sold ")) {
        action = "Sell";
        const parts = comment.replace("Sold ", "").split(" ");
        const atIndex = parts.indexOf("@");
        if (atIndex > 1) assetName = parts.slice(0, atIndex - 1).join(" ");
      }

      if (assetName) {
        if (!assetMap.has(assetName)) {
          assetMap.set(assetName, {
            asset: assetName,
            buys: [],
            sells: [],
            net: 0,
          });
        }
        const record = assetMap.get(assetName);
        record.net += amount;
        if (action === "Buy") record.buys.push(date);
        if (action === "Sell") record.sells.push(date);
      }
    }

    // Process the mapped assets into final classified trades
    const results: ParsedTrade[] = [];
    let revLoss = 0, capLoss = 0, revProf = 0;

    assetMap.forEach((data) => {
      // Sort dates
      data.buys.sort((a: any, b: any) => a - b);
      data.sells.sort((a: any, b: any) => a - b);

      const firstBuy = data.buys.length > 0 ? data.buys[0] : null;
      const lastSell = data.sells.length > 0 ? data.sells[data.sells.length - 1] : null;
      
      let holdingDays = 0;
      let category: "Capital" | "Revenue" | "Unknown" = "Unknown";

      if (firstBuy && lastSell) {
        const diffTime = Math.abs(lastSell.getTime() - firstBuy.getTime());
        holdingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Section 9C 36-Month Rule (Approx 1095 days)
        category = holdingDays >= 1095 ? "Capital" : "Revenue";
      } else if (firstBuy && !lastSell) {
        // Still holding
        const diffTime = Math.abs(new Date().getTime() - firstBuy.getTime());
        holdingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        category = holdingDays >= 1095 ? "Capital" : "Revenue";
      }

      if (data.sells.length > 0) {
        if (category === "Revenue" && data.net < 0) revLoss += data.net;
        if (category === "Capital" && data.net < 0) capLoss += data.net;
        if (category === "Revenue" && data.net > 0) revProf += data.net;
      }

      results.push({
        asset: data.asset,
        firstBuyDate: firstBuy,
        lastSellDate: lastSell,
        netPosition: data.net,
        status: data.sells.length > 0 ? (data.buys.length > data.sells.length ? "Partial" : "Closed") : "Open",
        category,
        holdingPeriodDays: holdingDays,
      });
    });

    setRevenueLoss(revLoss);
    setCapitalLoss(capLoss);
    setRevenueProfit(revProf);
    setAnalyzedData(results.filter(r => r.status !== "Open").sort((a, b) => a.netPosition - b.netPosition));
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
  };

  return (
    <>
      <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
        <div className="mb-8 border-b border-[#c0c0c0]/30 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#c0c0c0] tracking-wide uppercase">Section 9C Analyzer</h1>
            <p className="text-[#8d99ae] text-sm mt-1">Automatic Capital vs. Revenue Classification</p>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2 font-bold hover:bg-white transition shadow-[0_0_15px_rgba(192,192,192,0.15)] rounded-sm"
          >
            {isAnalyzing ? "ANALYZING..." : "UPLOAD CSV"}
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
            <p className="text-[#c0c0c0] font-mono text-sm">Upload the file to map your holding periods automatically.</p>
          </div>
        ) : (
          <>
            {/* Macro Summary Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#081b2e] border border-sky-800 p-6 shadow-lg rounded-sm text-center">
                <h3 className="text-sky-400 font-bold mb-2 uppercase tracking-widest text-xs">Valid Revenue Shield</h3>
                <p className="text-3xl font-mono text-red-400">
                  {revenueLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[#8d99ae] text-xs mt-2">Usable against active trading profits</p>
              </div>
              <div className="bg-[#120f1a] border border-purple-900 p-6 shadow-lg rounded-sm text-center">
                <h3 className="text-purple-400 font-bold mb-2 uppercase tracking-widest text-xs">Locked Capital Losses</h3>
                <p className="text-3xl font-mono text-red-400">
                  {capitalLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[#8d99ae] text-xs mt-2">Ring-fenced to offset future CGT only</p>
              </div>
              <div className="bg-[#0a1128] border border-[#c0c0c0]/30 p-6 shadow-lg rounded-sm text-center">
                <h3 className="text-[#c0c0c0] font-bold mb-2 uppercase tracking-widest text-xs">Revenue Profits</h3>
                <p className="text-3xl font-mono text-green-400">
                  +{revenueProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[#8d99ae] text-xs mt-2">Taxable at flat 27% (Pty Ltd)</p>
              </div>
            </div>

            {/* Detailed Diagnostics Table */}
            <div className="overflow-x-auto bg-[#14213d] p-1 shadow-lg border border-[#c0c0c0]/20 rounded-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#c0c0c0] border-b border-[#c0c0c0]/20 bg-[#0a1128]">
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Asset / Ticker</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">First Bought</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Last Sold</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">Held (Days)</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold">SARS Category</th>
                    <th className="p-4 text-xs uppercase tracking-widest font-semibold text-right">Net P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {analyzedData.map((trade, idx) => (
                    <tr key={idx} className="border-b border-[#c0c0c0]/5 hover:bg-[#1f2f54]/40 transition">
                      <td className="p-4 font-semibold text-[#e0e1dd]">{trade.asset}</td>
                      <td className="p-4 text-sm text-[#8d99ae]">{trade.firstBuyDate?.toLocaleDateString() || "N/A"}</td>
                      <td className="p-4 text-sm text-[#8d99ae]">{trade.lastSellDate?.toLocaleDateString() || "N/A"}</td>
                      <td className="p-4 text-sm font-mono text-[#e0e1dd]">{trade.holdingPeriodDays}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded-sm uppercase tracking-wider ${
                          trade.category === "Capital" 
                            ? "bg-purple-900/40 text-purple-300 border border-purple-800" 
                            : "bg-sky-900/40 text-sky-300 border border-sky-800"
                        }`}>
                          {trade.category}
                        </span>
                      </td>
                      <td className={`p-4 font-mono font-bold text-sm text-right ${trade.netPosition < 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {trade.netPosition < 0 ? "" : "+"}{trade.netPosition.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
