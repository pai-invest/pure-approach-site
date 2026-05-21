"use client";
import { useState } from 'react';

export default function TaxStrategistPro() {
  const [trade, setTrade] = useState({
    invested: 400,
    entryPrice: 167.29,
    exitPrice: 170.68,
    rate: 16.47
  });

  // Core Formulas extracted from your SARS.csv
  const soldUSD = (trade.exitPrice / trade.entryPrice) * trade.invested;
  const grossProfitUSD = soldUSD - trade.invested;
  const zarProfit = grossProfitUSD * trade.rate;
  const tax = zarProfit * 0.45;
  const actualProfit = zarProfit - tax;

  return (
    <div className="p-8 bg-[#01150b] text-[#F5D36B] min-h-screen">
      <h1 className="text-xl uppercase tracking-widest mb-6 border-b border-[#10B981] pb-2">Tax Strategist Engine</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-xs uppercase">Exit Price (USD)</label>
          <input 
            type="number" 
            value={trade.exitPrice}
            onChange={(e) => setTrade({...trade, exitPrice: Number(e.target.value)})}
            className="w-full bg-[#032213] p-2 border border-[#10B981]"
          />
        </div>
        
        <div className="p-4 border border-[#10B981]/50 rounded">
          <p className="text-[#10B981] text-xs uppercase">Actual Profit (ZAR)</p>
          <p className="text-2xl">{actualProfit.toFixed(2)}</p>
          <p className="text-[10px] text-gray-500 mt-2">Tax Owed: {tax.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
