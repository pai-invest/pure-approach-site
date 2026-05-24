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
  
  const totalProfit = filteredData.reduce((sum, t) => t.realizedPnL > 0 ? sum + t.realizedPnL : sum, 0);
  const totalLoss = Math.abs(filteredData.reduce((sum, t) => t.realizedPnL < 0 ? sum + t.realizedPnL : sum, 0));
  const netPnL = totalProfit - totalLoss;

  const formatCurrency = (amount: number, showPlus = false) => {
    const sym = currency === "USD" ? "$" : "R";
    const isNeg = amount < 0;
    const absVal = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (isNeg) return `-${sym}${absVal}`;
    if (showPlus && amount > 0) return `+${sym}${absVal}`;
    return `${sym}${absVal}`;
  };

  const processCSV = (text: string) => {
    const lines = text.split(/\r?\n/);
    const header = lines[0] || "";
    const isSemicolon = header.includes(";");

    const dataLines = lines.slice(1).filter((l) => l.trim() !== "");
    dataLines.reverse(); 

    const allEvents: { date: Date; action: string; asset: string; qty: number; amount: number }[] = [];

    for (const line of dataLines) {
      if (isSemicolon && !line.includes(";")) continue;
      if (!isSemicolon && !line.includes(",")) continue;

      let dateStr = "";
      let comment = "";
      let amountStr = "";

      // Auto-Detects Regional Formatting (Semicolon vs Comma)
      if (isSemicolon) {
        const parts = line.split(';');
        dateStr = parts[0] || "";
        comment = parts[1] || "";
        amountStr = parts[2] || "";
      } else {
        const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
        if (!matches || matches.length < 3) continue;
        dateStr = matches[0].replace(/^,/, "").trim();
        comment = matches[1].replace(/^,/, "").trim();
        amountStr = matches[2].replace(/^,/, "").trim();
      }

      if (!dateStr || !comment) continue;

      comment = comment.replace(/^"|"$/g, "").trim();

      // Safe Number Parsing (Handles both standard US "1,234.56" and EU/ZA "1 234,56")
      let cleanAmount = amountStr.replace(/"/g, "").trim();
      cleanAmount = cleanAmount.replace(/\s/g, ""); 
      if (cleanAmount.includes(',') && !cleanAmount.includes('.')) {
        cleanAmount = cleanAmount.replace(/,/g, '.'); 
      } else {
        cleanAmount = cleanAmount.replace(/,/g, ''); 
      }
      
      const amount = parseFloat(cleanAmount) || 0;
      
      // Safe Date Parsing
      const cleanDateStr = dateStr.replace(/\//g, "-");
      const date = new Date(cleanDateStr);
      if (isNaN(date.getTime())) continue;

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

    if (allEvents.length === 0) {
      alert("No trading data found. Please ensure you are uploading the 'Transaction History' CSV export from EasyEquities.");
      setIsAnalyzing(false);
      return;
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

    if (realizedTrades.length === 0) {
      alert("File successfully read, but no finalized (Sold) trades were found. This ledger only displays closed positions to calculate P/L.");
      setIsAnalyzing(false);
      return;
    }

    setAnalyzedData(realizedTrades.sort((a, b) => b.sellDate.getTime() - a.sellDate.getTime()));
    setIsAnalyzing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls')) {
      alert("Excel format detected. Please open this file in Excel and select 'Save As -> CSV (Comma delimited)' before uploading.");
      return;
    }

    setIsAnalyzing(true);
    
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const text = evt.target?.result as string;
          processCSV(text);
        } catch (error) {
          console.error("Parse Error:", error);
          alert("The parser encountered an error. Please ensure this is a valid EasyEquities CSV.");
          setIsAnalyzing(false);
        }
      };
      reader.readAsText(file);
    }, 50);
  };

  const [editingTradeId, setEditingTradeId] = useState(null as string | null);
  const [manualDate, setManualDate] = useState("");
  const [manualUnitCost, setManualUnitCost] = useState("");

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

    setAnalyzedData((prevData) => prevData.map((trade) => {
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

  const exportReport = () => {
    if (filteredData.length === 0) return;
    
    const headers = ["Asset / Ticker", "Buy Date", "Sell Date", "Qty Matched", "SARS Category", `Realized P/L (${currency})`];
    const rows = filteredData.map((trade) => {
      const buyD = trade.buyDate instanceof Date ? trade.buyDate.toLocaleDateString() : trade.buyDate;
      const sellD = trade.sellDate.toLocaleDateString();
      return [
        `"${trade.asset}"`,
        `"${buyD}"`,
        `"${sellD}"`,
        trade.qtySold.toFixed(4),
        `"${trade.category}"`,
        trade.realizedPnL.toFixed(2)
      ].join(",");
    });
    
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `FIFO_Tax_Report_${currency}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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
          accept=".csv, .txt"
          ref={fileInputRef} 
          onClick={(e) => { (e.target as HTMLInputElement).value = '' }}
          onChange={handleFileUpload} 
          className="absolute opacity-0 w-0 h-0 pointer-events-none" 
        />
      </div>

      {analyzedData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#c0c0c0]/30 rounded-sm bg-[#14213d]">
          <p className="text-[#8d99ae] mb-4">Export your Account History from EasyEquities as a CSV</p>
          <p className="text-[#c0c0c0] font-mono text-sm">
