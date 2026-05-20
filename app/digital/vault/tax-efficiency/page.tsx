"use client";
import React, { useState } from 'react';

export default function TaxEfficiencyMatrix() {
  const [revenue, setRevenue] = useState<number>(1500000);
  const [expenses, setExpenses] = useState<number>(300000);

  const calculateAudit = () => {
    const netProfit = Math.max(0, revenue - expenses);
    const indTax = netProfit > 1817000 ? 644489 + (netProfit - 1817000) * 0.45 : netProfit * 0.35; // Simplified bracket for demo
    const corpBurden = (netProfit * 0.27) + ((netProfit * 0.73) * 0.20);
    return { netProfit, indTax, corpBurden };
  };

  const results = calculateAudit();

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans p-8">
      {/* 1. Governance Header */}
      <header className="max-w-5xl mx-auto border-b border-[#94A3B8]/20 pb-8 mb-12">
        <h1 className="text-3xl font-serif text-[#FFFFFF] uppercase tracking-wide">Tax Efficiency Matrix</h1>
        <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mt-2">STRUCTURAL AUDIT // CORPORATE VS. INDIVIDUAL</p>
      </header>

      <main className="max-w-5xl mx-auto space-y-12">
        {/* 2. Comparative Telemetry */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111C3A] p-6 border border-[#94A3B8]/20">
            <span className="text-[9px] uppercase tracking-widest text-[#94A3B8]">Net Profit</span>
            <p className="text-2xl font-bold">R {results.netProfit.toLocaleString()}</p>
          </div>
          <div className="bg-[#1C2541] p-6 border border-[#EF4444]/30">
            <span className="text-[9px] uppercase tracking-widest text-[#EF4444]">Sole Proprietor Drag</span>
            <p className="text-2xl font-bold text-[#FFFFFF]">R {results.indTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
          </div>
          <div className="bg-[#1C2541] p-6 border border-[#10B981]/30">
            <span className="text-[9px] uppercase tracking-widest text-[#10B981]">Corporate Efficiency</span>
            <p className="text-2xl font-bold text-[#FFFFFF]">R {results.corpBurden.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
          </div>
        </section>

        {/* 3. Export & Compliance Bridge */}
        <section className="bg-[#111C3A] p-8 border border-[#F5D36B]/20 rounded-lg text-center">
            <h2 className="text-lg font-serif mb-4">Ready to Finalize?</h2>
            <p className="text-sm text-[#94A3B8] mb-8 max-w-lg mx-auto">
                This is your live structural audit. Export this data as a formal Governance Audit PDF for your tax practitioner to review against your current IRP6 submissions.
            </p>
            <button onClick={() => window.print()} className="bg-[#E2E8F0] text-[#0A1128] px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-white transition">
                Export Audit PDF
            </button>
        </section>
      </main>
    </div>
  );
}
