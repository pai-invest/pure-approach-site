"use client";

import React, { useState, useMemo } from 'react';

export default function ExitOptimizer() {
  // --- Enhanced Financial Model Variables ---
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [monthlyGrowth, setMonthlyGrowth] = useState(2.5);
  const [annualFees, setAnnualFees] = useState(2.0); 
  const [taxRate, setTaxRate] = useState(25);
  const [targetExitValue, setTargetExitValue] = useState(250000);
  const [inflationRate, setInflationRate] = useState(3.0);

  // --- Core Analytical Engine ---
  const optimization = useMemo(() => {
    let months = 0;
    let balance = initialInvestment;
    const monthlyReturn = monthlyGrowth / 100;
    const monthlyFee = (annualFees / 100) / 12;
    const monthlyInflation = (inflationRate / 100) / 12;

    // Simulation loop to find exit window
    while (balance < targetExitValue && months < 240) {
      balance = balance * (1 + monthlyReturn - monthlyFee - monthlyInflation);
      months++;
    }

    const netExit = balance * (1 - (taxRate / 100));
    return { months, balance, netExit };
  }, [initialInvestment, monthlyGrowth, annualFees, taxRate, targetExitValue, inflationRate]);

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0] pb-24">
      
      {/* Terminal Header */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-b border-[#10B981]/10">
        <a href="/digital/calculator" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono uppercase">
          ← Back to Utility Hub
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Data Input Matrix */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-3xl font-serif uppercase tracking-wider text-[#FFFDF0]">Exit & Drag Optimizer</h1>
            <p className="mt-4 text-sm text-[#F5D36B]/70 font-light">Precision modeling for institutional-grade asset exit windows.</p>
          </div>

          <div className="space-y-6 bg-[#021A0E] p-8 rounded-lg border border-[#10B981]/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-mono text-[#10B981] uppercase tracking-widest block mb-2">Initial Capital ($)</label>
                <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white font-mono" />
              </div>
              <div>
                <label className="text-[9px] font-mono text-[#10B981] uppercase tracking-widest block mb-2">Monthly Growth (%)</label>
                <input type="number" step="0.1" value={monthlyGrowth} onChange={e => setMonthlyGrowth(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white font-mono" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-mono text-[#10B981] uppercase tracking-widest block mb-2">Platform Fees (%)</label>
                <input type="number" step="0.1" value={annualFees} onChange={e => setAnnualFees(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white font-mono" />
              </div>
              <div>
                <label className="text-[9px] font-mono text-[#10B981] uppercase tracking-widest block mb-2">Tax Rate (%)</label>
                <input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white font-mono" />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-mono text-red-400 uppercase tracking-widest block mb-2">Inflationary Decay (%)</label>
              <input type="number" step="0.1" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} className="w-full bg-[#032213] border border-red-500/30 p-3 text-white font-mono" />
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Output */}
        <div className="lg:col-span-7">
          <div className="sticky top-12 bg-[#021A0E] p-8 md:p-12 rounded-lg border border-[#F5D36B]/20 shadow-[0_0_30px_rgba(245,211,107,0.05)]">
            <h2 className="text-[10px] font-mono text-[#F5D36B]/60 uppercase tracking-widest mb-8 border-b border-[#F5D36B]/10 pb-4">Projected Telemetry</h2>
            
            <div className="flex flex-col items-center py-8">
              <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-[0.2em] mb-4">Optimal Exit Window</span>
              <div className="text-7xl font-bold text-[#FFFDF0] mb-2">{optimization.months}</div>
              <span className="text-xs text-[#10B981] font-bold uppercase tracking-widest">Months to Target</span>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-[#10B981]/10 pt-8 mt-8">
              <div>
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest block">Gross Valuation</span>
                <div className="text-xl font-mono text-[#F5D36B] mt-2">${optimization.balance.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
              </div>
              <div>
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest block">Net Liquidity (Post-Tax)</span>
                <div className="text-xl font-mono text-[#10B981] mt-2">${optimization.netExit.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
