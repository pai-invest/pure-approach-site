"use client";
import React, { useState } from 'react';

export default function TaxEfficiencyMatrix() {
  // Financial State
  const [revenue, setRevenue] = useState<number>(1500000);
  const [expenses, setExpenses] = useState<number>(300000);

  // Structural Audit Logic
  const calculateAudit = () => {
    const netProfit = Math.max(0, revenue - expenses);
    
    // Simplified Individual Progressive Tax Estimate (SARS 2026/27 Framework)
    let indTax = 0;
    if (netProfit <= 237100) indTax = netProfit * 0.18;
    else if (netProfit <= 370500) indTax = 42678 + (netProfit - 237100) * 0.26;
    else if (netProfit <= 512800) indTax = 77362 + (netProfit - 370500) * 0.31;
    else if (netProfit <= 673000) indTax = 121475 + (netProfit - 512800) * 0.36;
    else if (netProfit <= 857900) indTax = 179147 + (netProfit - 673000) * 0.39;
    else if (netProfit <= 1817000) indTax = 251258 + (netProfit - 857900) * 0.41;
    else indTax = 644489 + (netProfit - 1817000) * 0.45;
    
    const estimatedSolePropTax = Math.max(0, indTax - 17224);

    // Corporate Flat Tax + Assumed Dividend Withholding Tax (DWT)
    const corpTax = netProfit * 0.27;
    const retainedAfterCorpTax = netProfit - corpTax;
    const dwt = retainedAfterCorpTax * 0.20;
    const estimatedCorpBurden = corpTax + dwt;

    return { netProfit, estimatedSolePropTax, estimatedCorpBurden };
  };

  const results = calculateAudit();

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans p-8">
      
      {/* Governance Header */}
      <header className="max-w-5xl mx-auto border-b border-[#94A3B8]/20 pb-8 mb-12">
        <h1 className="text-3xl font-serif text-[#FFFFFF] uppercase tracking-wide">Tax Efficiency Matrix</h1>
        <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mt-2">STRUCTURAL AUDIT // CORPORATE VS. INDIVIDUAL</p>
      </header>

      <main className="max-w-5xl mx-auto space-y-12">
        
        {/* Input & Comparative Telemetry */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 bg-[#111C3A] p-6 border border-[#94A3B8]/20 rounded">
            <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Gross Revenue</label>
            <input type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full bg-transparent border-b border-[#94A3B8]/30 focus:border-[#E2E8F0] outline-none py-2 text-xl" />
            
            <label className="block text-[9px] uppercase tracking-widest mt-6 mb-2 text-[#94A3B8]">Expenses</label>
            <input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} className="w-full bg-transparent border-b border-[#94A3B8]/30 focus:border-[#E2E8F0] outline-none py-2 text-xl" />
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111C3A] p-6 border border-[#94A3B8]/20">
              <span className="text-[9px] uppercase tracking-widest text-[#94A3B8]">Net Taxable Profit</span>
              <p className="text-2xl font-bold mt-2">R {results.netProfit.toLocaleString()}</p>
            </div>
            <div className="bg-[#1C2541] p-6 border border-[#EF4444]/30">
              <span className="text-[9px] uppercase tracking-widest text-[#EF4444]">Sole Proprietor Drag</span>
              <p className="text-2xl font-bold text-[#FFFFFF] mt-2">R {results.estimatedSolePropTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div className="bg-[#1C2541] p-6 border border-[#10B981]/30">
              <span className="text-[9px] uppercase tracking-widest text-[#10B981]">Corporate Efficiency</span>
              <p className="text-2xl font-bold text-[#FFFFFF] mt-2">R {results.estimatedCorpBurden.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
          </div>
        </section>

        {/* Export & Compliance Bridge */}
        <section className="bg-[#111C3A] p-8 border border-[#F5D36B]/20 rounded-lg text-center">
            <h2 className="text-lg font-serif mb-4 text-[#F5D36B]">Finalize Governance Audit</h2>
            <p className="text-sm text-[#94A3B8] mb-8 max-w-lg mx-auto">
                This is your live structural audit. Export this data as a formal Governance Audit PDF for review against your current IRP6 tax submissions.
            </p>
            <button onClick={() => window.print()} className="bg-[#E2E8F0] text-[#0A1128] px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-white transition">
                Export Audit PDF
            </button>
        </section>
      </main>
    </div>
  );
}
