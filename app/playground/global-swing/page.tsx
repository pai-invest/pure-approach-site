"use client";
import React, { useState } from 'react';

export default function GlobalSwingMatrix() {
  const [data, setData] = useState({
    ticker: "SPY",
    entryPrice: 500,
    investedUSD: 400,
    usdZarRate: 16.47
  });

  // Derived Telemetry
  const sellTarget9 = data.entryPrice * 1.09;
  const grossProfitUSD = (data.investedUSD * 1.09) - data.investedUSD;
  const zarProfit = grossProfitUSD * data.usdZarRate;
  const tax = zarProfit * 0.45; // Placeholder for automated tax calculation
  const actualProfit = zarProfit - tax;

  return (
    <div className="p-8 bg-[#032213] min-h-screen text-[#F5D36B]">
      <h1 className="text-2xl mb-6">GLOBAL SWING MATRIX // PROTOTYPE</h1>
      
      <div className="grid grid-cols-2 gap-8">
        {/* INPUTS */}
        <section className="p-6 bg-[#06331d] rounded">
          <label>Entry Price</label>
          <input 
            type="number" 
            value={data.entryPrice}
            onChange={(e) => setData({...data, entryPrice: Number(e.target.value)})}
            className="w-full bg-[#032213] p-2 mt-2 mb-4 border border-[#10B981]"
          />
          {/* ... Add other inputs ... */}
        </section>

        {/* OUTPUT TELEMETRY */}
        <section className="p-6 border border-[#10B981]">
          <h2 className="text-[#10B981]">CALCULATED TELEMETRY</h2>
          <div className="mt-4 text-xl">
            <p>9% Target Price: {sellTarget9.toFixed(2)}</p>
            <p>Actual Profit (ZAR): {actualProfit.toFixed(2)}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
