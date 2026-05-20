"use client";
import React, { useState } from 'react';

export default function FreeTaxEstimator() {
  const [revenue, setRevenue] = useState<number>(1500000);
  const [expenses, setExpenses] = useState<number>(300000);

  const calculateEstimates = () => {
    const netProfit = Math.max(0, revenue - expenses);
    
    // Individual Progressive Tax Estimate
    let indTax = 0;
    if (netProfit <= 237100) indTax = netProfit * 0.18;
    else if (netProfit <= 370500) indTax = 42678 + (netProfit - 237100) * 0.26;
    else if (netProfit <= 512800) indTax = 77362 + (netProfit - 370500) * 0.31;
    else if (netProfit <= 673000) indTax = 121475 + (netProfit - 512800) * 0.36;
    else if (netProfit <= 857900) indTax = 179147 + (netProfit - 673000) * 0.39;
    else if (netProfit <= 1817000) indTax = 251258 + (netProfit - 857900) * 0.41;
    else indTax = 644489 + (netProfit - 1817000) * 0.45;
    const estimatedSolePropTax = Math.max(0, indTax - 17224);

    // Corporate Flat Tax + Assumed 100% Extraction DWT
    const corpTax = netProfit * 0.27;
    const retainedAfterCorpTax = netProfit - corpTax;
    const dwt = retainedAfterCorpTax * 0.20;
    const estimatedCorpBurden = corpTax + dwt;

    return { netProfit, estimatedSolePropTax, estimatedCorpBurden };
  };

  const results = calculateEstimates();

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-[#1C2541] flex flex-col">
      
      {/* 1. Compliance Disclaimer Banner */}
      <div className="bg-[#EF4444]/10 border-b border-[#EF4444]/20 py-2 text-center">
        <p className="text-[10px] uppercase tracking-widest text-[#EF4444] font-bold">
          PUBLIC SIMULATION MODE // ENTERPRISE DATA AUDIT REQUIRED
        </p>
      </div>

      {/* Navigation & Status Header */}
      <header className="max-w-4xl mx-auto w-full px-6 pt-12 pb-8 border-b border-[#94A3B8]/20">
        <div className="flex justify-between items-center mb-12">
          <a href="/digital/calculator" className="text-xs font-bold tracking-[0.2em] text-[#94A3B8] hover:text-[#FFFFFF] transition font-mono uppercase">
            ← Return to Public Utilities
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#1C2541]/50 px-3 py-1.5 rounded border border-[#94A3B8]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></span>
            <span className="text-[#E2E8F0] font-bold">PUBLIC_NODE</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-serif text-[#FFFFFF] uppercase tracking-[0.1em]">Tax Drag Estimator</h1>
          <p className="text-[#94A3B8] font-mono text-xs mt-3 tracking-widest uppercase">
            BASELINE PROGRESSIVE VS. CORPORATE FRICTION
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 py-12 flex-1">
        
        <section className="bg-[#111C3A] p-6 border border-[#E2E8F0]/10 rounded-xl mb-12">
          <p className="text-sm font-light text-[#94A3B8] leading-relaxed">
            This utility provides a rapid estimate of your tax burden. It compares the SARS progressive bracket system (Individual) against a standard 27% corporate tax rate combined with a 20% dividend extraction drag.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-[#111C3A] p-8 rounded border border-[#94A3B8]/20 shadow-xl">
            <h3 className="text-xs font-mono mb-6 text-[#FFFFFF] tracking-widest uppercase border-b border-[#94A3B8]/20 pb-4">Financial Baseline</h3>
            
            <div className="mb-5">
              <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Gross Annual Revenue (ZAR)</label>
              <input type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] font-serif focus:border-[#E2E8F0] outline-none transition" />
            </div>
            <div className="mb-5">
              <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Annual Operating Expenses (ZAR)</label>
              <input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] font-serif focus:border-[#E2E8F0] outline-none transition" />
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#94A3B8]/10">
                <span className="block text-[9px] uppercase tracking-widest mb-1 text-[#94A3B8]">Net Taxable Base</span>
                <span className="text-xl font-serif text-[#FFFFFF]">R {results.netProfit.toLocaleString()}</span>
            </div>
          </section>

          <section className="space-y-6">
            <div className="bg-[#111C3A] border border-[#94A3B8]/20 rounded p-6">
              <h4 className="text-sm font-serif text-[#E2E8F0] mb-1">Individual Tax Burden</h4>
              <p className="text-[10px] font-mono text-[#94A3B8] uppercase mb-4">SARS Progressive Scale</p>
              <p className="text-3xl font-bold text-[#EF4444]">- R {results.estimatedSolePropTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>

            <div className="bg-[#1C2541] border border-[#94A3B8]/20 rounded p-6">
              <h4 className="text-sm font-serif text-[#E2E8F0] mb-1">Corporate Entity Burden</h4>
              <p className="text-[10px] font-mono text-[#94A3B8] uppercase mb-4">27% CIT + 20% Full Dividend Extraction</p>
              <p className="text-3xl font-bold text-[#EF4444]">- R {results.estimatedCorpBurden.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </section>
        </div>

        {/* 2. Conversion Bridge */}
        <div className="mt-16 bg-[#021A0E] border border-[#F5D36B]/30 rounded-xl p-10 text-center shadow-2xl">
          <h2 className="text-xl font-serif text-[#FFFDF0] mb-4">GENERATE OFFICIAL GOVERNANCE AUDIT</h2>
          <p className="text-sm text-[#F5D36B]/70 max-w-lg mx-auto mb-8 leading-relaxed">
            This public tool uses generalized tax brackets. To model targeted lifestyle extractions, calculate true corporate friction, and generate a print-ready Governance Audit PDF, bridge to the Secure Vault.
          </p>
          <a href="/digital/vault" className="inline-block bg-[#F5D36B] text-[#032213] px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#FFFFFF] transition">
            Unlock Full Architecture
          </a>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full px-6 py-8 border-t border-[#94A3B8]/10 text-[9px] font-mono text-[#94A3B8]/40 text-center uppercase tracking-widest">
        PUBLIC UTILITY // ESTIMATIONS DO NOT CONSTITUTE TAX ADVICE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD.
      </footer>
    </div>
  );
}
