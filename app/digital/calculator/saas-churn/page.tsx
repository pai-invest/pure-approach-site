"use client";

import React, { useState } from 'react';

export default function SaaSChurnEngine() {
  const [mrr, setMrr] = useState<number>(5000);
  const [cac, setCac] = useState<number>(200);
  const [churnRate, setChurnRate] = useState<number>(5); // Monthly %

  // Math: 
  // LTV = ARPU / Churn Rate
  // Payback Period = CAC / (MRR / CustomerCount)
  const calculateMetrics = () => {
    const ltv = (mrr / 100) / (churnRate / 100); // Simplified ARPU approximation
    const customerCount = mrr / 50; // Assuming $50/mo average price
    const paybackMonths = cac / (mrr / customerCount);
    
    return { ltv, paybackMonths };
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0] pb-24">
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-b border-[#10B981]/10">
        <a href="/digital/calculator" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono uppercase">
          ← Back to Utility Hub
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-3xl font-serif uppercase tracking-wider text-[#FFFDF0]">SaaS Churn & LTV Engine</h1>
            <p className="mt-4 text-sm text-[#F5D36B]/70 font-light">Model valuation and retention efficiency.</p>
          </div>

          <div className="space-y-6 bg-[#021A0E] p-6 rounded-lg border border-[#10B981]/20">
            <div>
              <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Monthly Recurring Rev (MRR) - $</label>
              <input type="number" value={mrr} onChange={(e) => setMrr(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono focus:border-[#10B981]" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Cust. Acquisition Cost (CAC) - $</label>
              <input type="number" value={cac} onChange={(e) => setCac(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono focus:border-[#10B981]" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-red-400 uppercase block mb-2">Monthly Churn Rate (%)</label>
              <input type="number" step="0.1" value={churnRate} onChange={(e) => setChurnRate(Number(e.target.value))} className="w-full bg-[#032213] border border-red-500/30 rounded px-4 py-3 text-[#FFFDF0] font-mono focus:border-red-500" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="sticky top-12 bg-[#021A0E] p-8 md:p-12 rounded-lg border border-[#F5D36B]/20">
            <h2 className="text-xs font-mono text-[#F5D36B]/60 uppercase tracking-widest mb-8">Valuation Telemetry</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest block">Lifetime Value (LTV)</span>
                <div className="text-4xl font-serif text-[#FFFDF0] mt-2">${metrics.ltv.toFixed(0)}</div>
              </div>
              <div>
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest block">Payback (Months)</span>
                <div className="text-4xl font-serif text-[#10B981] mt-2">{metrics.paybackMonths.toFixed(1)}</div>
              </div>
            </div>
            <div className="mt-12 bg-[#032213] p-6 rounded border border-[#10B981]/10">
              <p className="text-[11px] font-mono text-[#10B981]/80 uppercase leading-relaxed">
                Analysis: {metrics.ltv / cac > 3 ? "SYSTEM STATUS: HEALTHY (LTV:CAC > 3x)" : "SYSTEM STATUS: OPTIMIZATION REQUIRED (LTV:CAC < 3x)"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
