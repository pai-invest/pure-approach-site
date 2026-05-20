"use client";
import React, { useState } from 'react';

export default function PremiumVault() {
  const [revenue, setRevenue] = useState<number | ''>(1800000);
  const [expenses, setExpenses] = useState<number | ''>(400000);
  const [extraction, setExtraction] = useState<number | ''>(600000);

  const calculateEfficiency = () => {
    const rev = Number(revenue) || 0;
    const exp = Number(expenses) || 0;
    const targetNetCash = Number(extraction) || 0; 
    const netProfit = Math.max(0, rev - exp);

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
    const requiredGrossDividend = targetNetCash / 0.8;
    const actualGrossDividend = Math.min(requiredGrossDividend, maxAvailablePostTax);
    const dividendTax = actualGrossDividend * 0.20;
    const totalCorpBurden = corpTax + dividendTax;

    return { 
      netProfit, indTax, corpTax, dividendTax, totalCorpBurden, 
      gain: Math.max(0, indTax - totalCorpBurden),
      efficiencyRatio: indTax > 0 ? ((indTax - totalCorpBurden) / indTax) * 100 : 0
    };
  };

  const results = calculateEfficiency();

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      <header className="max-w-6xl mx-auto px-6 py-12 border-b border-[#10B981]/10 flex justify-between items-center">
        <img src="/apexlogo.png" className="h-20 w-auto" />
        <div className="text-xs tracking-widest font-mono border border-[#F5D36B]/30 px-3 py-1.5">VAULT // SECURE_NODE</div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Input Console */}
        <div className="lg:col-span-4 bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-[#10B981] mb-6">Execution Parameters</h2>
          {['Revenue', 'Expenses', 'Extraction'].map((field) => (
            <div key={field} className="mb-6">
              <label className="block text-[10px] font-mono uppercase tracking-widest mb-2 text-[#10B981]/60">{field} (ZAR)</label>
              <input type="number" value={field === 'Revenue' ? revenue : field === 'Expenses' ? expenses : extraction} onChange={(e) => field === 'Revenue' ? setRevenue(Number(e.target.value)) : field === 'Expenses' ? setExpenses(Number(e.target.value)) : setExtraction(Number(e.target.value))} className="w-full p-4 bg-[#032213] border border-[#10B981]/30 text-[#FFFDF0] font-serif text-lg rounded" />
            </div>
          ))}
        </div>

        {/* Executive Dashboard */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#032213] p-6 border border-[#F5D36B]/30 rounded-lg text-center">
              <span className="block text-[9px] font-mono uppercase text-[#F5D36B]/60 mb-2">Efficiency Gain</span>
              <span className="text-2xl text-[#10B981] font-serif">R {results.gain.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="bg-[#032213] p-6 border border-[#10B981]/30 rounded-lg text-center">
              <span className="block text-[9px] font-mono uppercase text-[#F5D36B]/60 mb-2">Efficiency Ratio</span>
              <span className="text-2xl text-[#FFFDF0] font-serif">{results.efficiencyRatio.toFixed(1)}%</span>
            </div>
            <div className="bg-[#032213] p-6 border border-[#10B981]/30 rounded-lg text-center">
              <span className="block text-[9px] font-mono uppercase text-[#F5D36B]/60 mb-2">Structure Health</span>
              <span className="text-2xl text-[#F5D36B] font-serif">{results.efficiencyRatio > 15 ? 'OPTIMIZED' : 'SUB-OPTIMAL'}</span>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#10B981] mb-8">Structural Comparative Analysis</h3>
            <div className="space-y-6">
              {[ {label: 'Individual Tax Burden', val: results.indTax, color: 'bg-red-500'}, {label: 'Corporate Tax Burden', val: results.totalCorpBurden, color: 'bg-emerald-500'} ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] font-mono text-[#F5D36B]/60 mb-2"><span>{item.label}</span><span>R {item.val.toLocaleString(undefined, {maximumFractionDigits: 0})}</span></div>
                  <div className="w-full h-2 bg-[#032213] rounded-full overflow-hidden"><div className={`${item.color} h-full`} style={{width: `${Math.min(100, (item.val/results.indTax)*100)}%`}}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
