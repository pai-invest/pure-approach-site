"use client";

import React, { useState, useMemo } from 'react';

export default function ExitOptimizer() {
  // --- Enhanced Variables ---
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [monthlyGrowth, setMonthlyGrowth] = useState(2.5);
  const [annualFees, setAnnualFees] = useState(2.0); 
  const [taxRate, setTaxRate] = useState(25);
  const [targetExitValue, setTargetExitValue] = useState(250000);
  const [inflationRate, setInflationRate] = useState(3.0); // NEW: Inflation variable

  const optimization = useMemo(() => {
    let months = 0;
    let balance = initialInvestment;
    const monthlyReturn = monthlyGrowth / 100;
    const monthlyFee = (annualFees / 100) / 12;
    const monthlyInflation = (inflationRate / 100) / 12;

    // Run projection
    while (balance < targetExitValue && months < 240) {
      // Balance grows, minus fee, minus inflationary purchasing power erosion
      balance = balance * (1 + monthlyReturn - monthlyFee - monthlyInflation);
      months++;
    }

    const netExit = balance * (1 - (taxRate / 100));
    return { months, balance, netExit };
  }, [initialInvestment, monthlyGrowth, annualFees, taxRate, targetExitValue, inflationRate]);

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] p-6 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto border border-[#10B981]/30 p-8 rounded-lg bg-[#021A0E] shadow-2xl">
        <h1 className="text-3xl font-bold text-[#FFFDF0] mb-8 border-b border-[#10B981]/20 pb-4 uppercase tracking-[0.2em]">
          Equity Exit & Drag Optimizer <span className="text-[12px] text-[#10B981]">PRO_EDITION</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Inputs Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] text-[#10B981] uppercase tracking-widest">Initial Capital ($)</label>
                <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white" />
              </div>
              <div>
                <label className="text-[9px] text-[#10B981] uppercase tracking-widest">Monthly Growth (%)</label>
                <input type="number" step="0.1" value={monthlyGrowth} onChange={e => setMonthlyGrowth(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] text-[#10B981] uppercase tracking-widest">Platform Fees (%)</label>
                <input type="number" step="0.1" value={annualFees} onChange={e => setAnnualFees(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white" />
              </div>
              <div>
                <label className="text-[9px] text-[#10B981] uppercase tracking-widest">Capital Gains Tax (%)</label>
                <input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white" />
              </div>
            </div>

            <div>
              <label className="text-[9px] text-red-400 uppercase tracking-widest">Inflationary Erosion (%)</label>
              <input type="number" step="0.1" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} className="w-full bg-[#032213] border border-red-500/30 p-3 text-white" />
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-[#04381F]/20 p-8 rounded border border-[#F5D36B]/20 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-[0.2em] mb-4">Optimal Exit Window</span>
            <div className="text-6xl font-bold text-[#FFFDF0] mb-2">{optimization.months}</div>
            <span className="text-sm text-[#10B981] font-bold mb-6 uppercase tracking-widest">Months to Target</span>
            
            <div className="w-full border-t border-[#F5D36B]/20 pt-6">
              <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest">Net Liquidity Post-Tax</span>
              <div className="text-2xl text-[#FFFDF0] mt-1">${optimization.netExit.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
