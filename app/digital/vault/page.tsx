"use client";
import React, { useState } from 'react';

export default function PremiumVault() {
  const [revenue, setRevenue] = useState<number>(1800000);
  const [expenses, setExpenses] = useState<number>(400000);
  const [extraction, setExtraction] = useState<number>(600000);

  const calculateEfficiency = () => {
    const netProfit = Math.max(0, revenue - expenses);

    // SARS Progressive Tax Calculation
    let indTax = 0;
    if (netProfit <= 237100) indTax = netProfit * 0.18;
    else if (netProfit <= 370500) indTax = 42678 + (netProfit - 237100) * 0.26;
    else if (netProfit <= 512800) indTax = 77362 + (netProfit - 370500) * 0.31;
    else if (netProfit <= 673000) indTax = 121475 + (netProfit - 512800) * 0.36;
    else if (netProfit <= 857900) indTax = 179147 + (netProfit - 673000) * 0.39;
    else if (netProfit <= 1817000) indTax = 251258 + (netProfit - 857900) * 0.41;
    else indTax = 644489 + (netProfit - 1817000) * 0.45;
    indTax = Math.max(0, indTax - 17224);

    const corpTax = netProfit * 0.27;
    const maxAvailablePostTax = Math.max(0, netProfit - corpTax);
    const actualGrossDividend = Math.min(extraction / 0.8, maxAvailablePostTax);
    const dividendTax = actualGrossDividend * 0.20;
    const totalCorpBurden = corpTax + dividendTax;

    return { netProfit, indTax, corpTax, dividendTax, totalCorpBurden, gain: Math.max(0, indTax - totalCorpBurden) };
  };

  const results = calculateEfficiency();

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F]">
      {/* Executive Header */}
      <header className="max-w-7xl mx-auto px-8 py-10 flex justify-between items-center border-b border-[#10B981]/20">
        <div className="flex items-center gap-4">
          <img src="/apexlogo.png" className="h-16" />
          <div>
            <h1 className="text-xl font-serif text-[#FFFDF0]">TAX EFFICIENCY MATRIX</h1>
            <p className="text-[10px] font-mono tracking-widest text-[#10B981]">GOVERNANCE // 2026_VERSION</p>
          </div>
        </div>
        <button className="bg-[#10B981] text-[#032213] px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#FFFDF0]">Export Executive PDF</button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-12 gap-12">
        {/* Input & Strategic Analysis */}
        <div className="col-span-4 space-y-8">
           <div className="bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20">
             <h3 className="text-xs font-mono mb-6 text-[#10B981]">OPERATIONAL INPUTS</h3>
             {['Revenue', 'Expenses', 'Extraction'].map((field) => (
                <div key={field} className="mb-6">
                  <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#10B981]/60">{field} (ZAR)</label>
                  <input type="number" value={field === 'Revenue' ? revenue : field === 'Expenses' ? expenses : extraction} onChange={(e) => field === 'Revenue' ? setRevenue(Number(e.target.value)) : field === 'Expenses' ? setExpenses(Number(e.target.value)) : setExtraction(Number(e.target.value))} className="w-full p-3 bg-[#032213] border border-[#10B981]/30 text-[#FFFDF0] font-serif" />
                </div>
             ))}
           </div>
           
           {/* Governance Insights */}
           <div className="p-6 bg-[#021A0E] border border-[#F5D36B]/20 rounded-xl">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#F5D36B] mb-4">Structural Analysis</h3>
             <p className="text-xs text-[#F5D36B]/70 leading-relaxed font-light italic">
                {results.gain > 50000 ? "Your current profit threshold qualifies for significant corporate tax arbitrage." : "Your current extraction levels indicate sub-optimal tax drag. Consider increasing corporate retention."}
             </p>
           </div>
        </div>

        {/* Dashboard Visualization */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-8 mb-12">
             <div className="p-8 border border-[#10B981]/30 bg-[#032213]">
                <span className="text-[10px] uppercase text-[#10B981]">Total Efficiency Gain</span>
                <p className="text-4xl text-[#FFFDF0] font-serif mt-2">R {results.gain.toLocaleString()}</p>
             </div>
             <div className="p-8 border border-[#F5D36B]/30 bg-[#032213]">
                <span className="text-[10px] uppercase text-[#F5D36B]">Effective Tax Rate (Corp)</span>
                <p className="text-4xl text-[#FFFDF0] font-serif mt-2">{( (results.totalCorpBurden/results.netProfit)*100 ).toFixed(1)}%</p>
             </div>
          </div>
          
          <div className="h-64 w-full bg-[#021A0E] border border-[#10B981]/20 p-8 flex items-end gap-4">
             {/*  */}
             <div className="flex-1 bg-[#EF4444]/20 h-[80%] border-t border-[#EF4444]"></div>
             <div className="flex-1 bg-[#10B981]/20 h-[40%] border-t border-[#10B981]"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
