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

function EEDataAnalyzer() {
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
      let cleanAmount = amountStr.replace(/"/g, "").trim().replace(/\s/g, ""); 
      if (cleanAmount.includes(',') && !cleanAmount.includes('.')) {
        cleanAmount = cleanAmount.replace(/,/g, '.'); 
      } else {
        cleanAmount = cleanAmount.replace(/,/g, ''); 
      }
      
      const amount = parseFloat(cleanAmount) || 0;
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
          if (qty > 0 && assetName) allEvents.push({ date, action, asset: assetName, qty, amount });
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
          if ((type === "Consolidation" || type === "Subdivision") && assetName) allEvents.push({ date, action: "CA", asset: assetName, qty, amount: 0 });
        }
      }
    }

    if (allEvents.length === 0) {
      alert("No trading data found. Check your file format.");
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
        assetLots.push({ date: event.date, qty: event.qty, unitCost: Math.abs(event.amount) / event.qty, remainingQty: event.qty });
      } else if (event.action === "CA") {
        let totalRemaining = 0;
        for (const lot of assetLots) totalRemaining += lot.remainingQty;
        if (totalRemaining > 0) {
          const newTotal = totalRemaining + event.qty; 
          const ratio = newTotal / totalRemaining;
          for (const lot of assetLots) { lot.remainingQty *= ratio; lot.unitCost /= ratio; }
        }
      } else if (event.action === "Sell") {
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
          realizedTrades.push({ id: `${event.asset}-${event.date.getTime()}-${Math.random()}`, asset: event.asset, buyDate: lot.date, sellDate: event.date, qtySold: qtyToTake, unitSellPrice, holdingDays, category, realizedPnL });
        }
        if (remainingToSell > 0.000001) {
          realizedTrades.push({ id: `GHOST-${event.asset}-${event.date.getTime()}-${Math.random()}`, asset: `${event.asset} (Missing Buy Data)`, buyDate: "Unknown", sellDate: event.date, qtySold: remainingToSell, unitSellPrice, holdingDays: "N/A", category: "Missing Data", realizedPnL: (remainingToSell * unitSellPrice) - 0 });
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
        catch (error) { alert("Parser error."); setIsAnalyzing(false); }
    };
    reader.readAsText(file);
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
    if (!manualDate || manualUnitCost === "") return;
    const parsedDate = new Date(manualDate);
    const unitCost = Number(manualUnitCost);
    setAnalyzedData((prevData) => prevData.map((trade) => {
      if (trade.id === tradeId) {
        const holdingDays = Math.ceil(Math.abs(trade.sellDate.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24));
        const category = holdingDays >= 1095 ? "Capital" : "Revenue";
        return { ...trade, asset: trade.asset.replace(" (Missing Buy Data)", ""), buyDate: parsedDate, holdingDays, category, realizedPnL: (trade.qtySold * trade.unitSellPrice) - (trade.qtySold * unitCost) };
      }
      return trade;
    }));
    setEditingTradeId(null);
  };

  const exportReport = () => {
    const headers = ["Asset", "Buy Date", "Sell Date", "Qty", "Category", "PnL"];
    const rows = filteredData.map(t => [`"${t.asset}"`, t.buyDate, t.sellDate.toLocaleDateString(), t.qtySold, t.category, t.realizedPnL].join(","));
    const blob = new Blob([ [headers.join(","), ...rows].join("\n") ], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
      <div className="mb-8 border-b border-[#c0c0c0]/30 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#c0c0c0] tracking-wide uppercase">FIFO TAX ANALYZER</h1>
        </div>
        <button onClick={() => fileInputRef.current?.click()} className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2 font-bold hover:bg-white">
          {isAnalyzing ? "ANALYZING..." : "UPLOAD CSV"}
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="absolute opacity-0 w-0 h-0" />
      </div>

      {analyzedData.length > 0 && (
        <div>
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-[#081b2e] p-6 text-center border border-sky-800">
                <h3 className="text-sky-400 text-xs">REVENUE LOSSES</h3>
                <p className="text-2xl text-red-400">{formatCurrency(revenueLoss)}</p>
              </div>
              <div className="bg-[#120f1a] p-6 text-center border border-purple-900">
                <h3 className="text-purple-400 text-xs">CAPITAL LOSSES</h3>
                <p className="text-2xl text-red-400">{formatCurrency(capitalLoss)}</p>
              </div>
              <div className="bg-[#0a1128] p-6 text-center border border-[#c0c0c0]/30">
                <h3 className="text-[#c0c0c0] text-xs">REVENUE PROFITS</h3>
                <p className="text-2xl text-green-400">{formatCurrency(revenueProfit)}</p>
              </div>
              <div className="bg-[#14213d] p-6 text-center border border-blue-500/30">
                <h3 className="text-blue-400 text-xs">NET P/L</h3>
                <p className="text-2xl text-blue-400">{formatCurrency(netPnL)}</p>
              </div>
            </div>
            <table className="w-full text-left bg-[#14213d]">
              <thead>
                <tr className="border-b border-[#c0c0c0]/20">
                  <th className="p-4 text-xs">ASSET</th>
                  <th className="p-4 text-xs">BUY DATE</th>
                  <th className="p-4 text-xs">SELL DATE</th>
                  <th className="p-4 text-xs">P/L</th>
                  <th className="p-4 text-xs">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(trade => (
                  <tr key={trade.id} className="border-b border-[#c0c0c0]/5">
                    <td className="p-4">{trade.asset}</td>
                    <td className="p-4">{trade.buyDate instanceof Date ? trade.buyDate.toLocaleDateString() : trade.buyDate}</td>
                    <td className="p-4">{trade.sellDate.toLocaleDateString()}</td>
                    <td className="p-4">{formatCurrency(trade.realizedPnL)}</td>
                    <td className="p-4">
                      {trade.category === "Missing Data" && <button onClick={() => startEditing(trade)} className="text-yellow-400">ADD DATA</button>}
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

export default EEDataAnalyzer;
