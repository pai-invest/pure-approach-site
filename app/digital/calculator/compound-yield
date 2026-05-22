"use client";

import React, { useState } from 'react';

export default function CompoundYieldSimulator() {
  const [initialCapital, setInitialCapital] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualYield, setAnnualYield] = useState<number>(8);
  const [years, setYears] = useState<number>(10);
  const [capitalDrag, setCapitalDrag] = useState<number>(1.5);

  const calculateYield = () => {
    let currentBalance = initialCapital;
    let totalContributions = initialCapital;
    const monthlyRate = (annualYield / 100) / 12;
    const monthlyDrag = (capitalDrag / 100) / 12;
    const netMonthlyRate = monthlyRate - monthlyDrag;
    const months = years * 12;

    for (let i = 0; i < months; i++) {
      currentBalance += monthlyContribution;
      totalContributions += monthlyContribution;
      currentBalance = currentBalance * (1 + netMonthlyRate);
    }

    return {
      finalBalance: currentBalance,
      totalContributions: totalContributions,
      totalYield: currentBalance - totalContributions
    };
  };

  const results = calculateYield();

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans pb-24 selection:bg-[#04381F] selection:text-[#FFFDF0]">
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-b border-[#10B981]/10">
        <a href="/digital/calculator" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono uppercase">
          ← Back to Utility Hub
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-3xl font-serif uppercase tracking-wider text-[#FFFDF0]">Compound Yield Simulator</h1>
            <p className="mt-4 text-sm text-[#F5D36B]/70 font-light">Model long-term wealth trajectories with precision.</p>
          </div>

          <div className="space-y-6 bg-[#021A0E] p-6 rounded-lg border border-[#10B981]/20">
            <div>
              <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Initial Capital ($)</label>
              <input type="number" value={initialCapital} onChange={(e) => setInitialCapital(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono focus:outline-none focus:border-[#10B981]" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Monthly Contribution ($)</label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono focus:outline-none focus:border-[#10B981]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Annual Yield (%)</label>
                <input type="number" value={annualYield} onChange={(e) => setAnnualYield(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono" />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Time (Years)</label>
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-mono text-red-400 uppercase block mb-2">Capital Drag (%)</label>
              <input type="number" step="0.1" value={capitalDrag} onChange={(e) => setCapitalDrag(Number(e.target.value))} className="w-full bg-[#032213] border border-red-500/30 rounded px-4 py-3 text-[#FFFDF0] font-mono focus:border-red-500" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="sticky top-12 bg-[#021A0E] p-8 md:p-12 rounded-lg border border-[#F5D36B]/20">
            <h2 className="text-xs font-mono text-[#F5D36B]/60 uppercase tracking-widest mb-8">Projected Telemetry</h2>
            <div className="text-5xl md:text-6xl font-serif text-[#FFFDF0] mb-12">{formatCurrency(results.finalBalance)}</div>
            <div className="grid grid-cols-2 gap-8 border-t border-[#10B981]/10 pt-8">
              <div>
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest block">Contributions</span>
                <div className="text-xl font-mono text-[#F5D36B] mt-2">{formatCurrency(results.totalContributions)}</div>
              </div>
              <div>
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest block">Net Yield</span>
                <div className="text-xl font-mono text-[#10B981] mt-2">+{formatCurrency(results.totalYield)}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
