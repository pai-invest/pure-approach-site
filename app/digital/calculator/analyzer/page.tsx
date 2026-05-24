"use client";

import React, { useState, useRef } from "react";

// ... (Interfaces remain identical)
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

  // ... (Calculation functions remain identical)
  const [currency, setCurrency] = useState("ZAR");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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
  const capitalProfit = filteredData.reduce((sum, t) => t.category === "Capital" && t.realizedPnL > 0 ? sum + t.realizedPnL : sum, 0);
  
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

    // Extract current portfolio
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

  // ... (JSX continues)
  return (
    <>
      {/* ... (Previous header and Summary cards) */}
      <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
        {/* ... (Summary Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* ... Summary Cards ... */}
        </div>

        {/* Realized Tax Table */}
        <div className="overflow-x-auto bg-[#14213d] p-1 shadow-lg border border-[#c0c0c0]/20 rounded-sm mb-12">
           {/* ... table ... */}
        </div>

        {/* NEW: Open Portfolio View */}
        <div className="mt-12">
            <h2 className="text-xl font-bold text-[#c0c0c0] uppercase tracking-wide mb-4">Open Portfolio (Unsold Positions)</h2>
            <div className="overflow-x-auto bg-[#14213d] p-1 shadow-lg border border-[#c0c0c0]/20 rounded-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[#c0c0c0] border-b border-[#c0c0c0]/20 bg-[#0a1128]">
                            <th className="p-4 text-xs uppercase tracking-widest font-semibold">Asset</th>
                            <th className="p-4 text-xs uppercase tracking-widest font-semibold text-right">Quantity Held</th>
                            <th className="p-4 text-xs uppercase tracking-widest font-semibold text-right">Avg Unit Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map((item, idx) => (
                            <tr key={idx} className="border-b border-[#c0c0c0]/5">
                                <td className="p-4 text-[#e0e1dd]">{item.asset}</td>
                                <td className="p-4 text-right font-mono">{item.qty.toFixed(4)}</td>
                                <td className="p-4 text-right font-mono">{formatCurrency(item.avgCost)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </>
  );
}
