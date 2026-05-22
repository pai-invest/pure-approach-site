"use client";

import React, { useState, useMemo } from 'react';

export default function ExitOptimizer() {
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [monthlyGrowth, setMonthlyGrowth] = useState(2.5);
  const [annualFees, setAnnualFees] = useState(2.0); // Management/Platform fees
  const [taxRate, setTaxRate] = useState(25); // Capital gains tax
  const [targetExitValue, setTargetExitValue] = useState(250000);

  const optimization = useMemo(() => {
    let months = 0;
    let balance = initialInvestment;
    const monthlyReturn = monthlyGrowth / 100;
    const monthlyFee = (annualFees / 100) / 12;

    while (balance < targetExitValue && months < 120) {
      balance = balance * (1 + monthlyReturn - monthlyFee);
      months++;
    }

    const netExit = balance * (1 - (taxRate / 100));
    return { months, balance, netExit };
  }, [initialInvestment, monthlyGrowth, annualFees, taxRate, targetExitValue]);

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] p-6 font-mono">
      <div className="max-w-4xl mx-auto border border-[#10B981]/30 p-8 rounded-lg bg-[#021A0E]">
        <h1 className="text-2xl font-bold text-[#FFFDF0] mb-6 border-b border-[#10B981]/20 pb-4">
          EQUITY EXIT & DRAG OPTIMIZER
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-[#10B981]">INITIAL CAPITAL ($)</label>
              <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-2 text-white" />
            </div>
            <div>
              <label className="text-[10px] text-[#10B981]">MONTHLY COMPOUND GROWTH (%)</label>
              <input type="number" step="0.1" value={monthlyGrowth} onChange={e => setMonthlyGrowth(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-2 text-white" />
            </div>
            <div>
              <label className="text-[10px] text-[#10B981]">TARGET EXIT VALUE ($)</label>
              <input type="number" value={targetExitValue} onChange={e => setTargetExitValue(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-2 text-white" />
            </div>
          </div>

          <div className="bg-[#04381F]/20 p-6 rounded border border-[#F5D36B]/20 flex flex-col justify-center">
            <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest">Optimal Time to Exit</span>
            <div className="text-5xl font-bold text-[#FFFDF0] my-4">{optimization.months} <span className="text-xl">MONTHS</span></div>
            <div className="text-sm text-[#10B981]">Net Liquidity: ${optimization.netExit.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
