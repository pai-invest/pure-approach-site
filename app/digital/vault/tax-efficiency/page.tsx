"use client";
import React, { useState, useEffect } from 'react';

export default function TaxEfficiencyMatrix() {
  const [revenue, setRevenue] = useState<number>(1500000);
  const [expenses, setExpenses] = useState<number>(300000);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const calculateAudit = () => {
    const netProfit = Math.max(0, revenue - expenses);
    
    // SARS Progressive Tax Calculation (2026/27)
    let indTax = 0;
    if (netProfit <= 237100) indTax = netProfit * 0.18;
    else if (netProfit <= 370500) indTax = 42678 + (netProfit - 237100) * 0.26;
    else if (netProfit <= 512800) indTax = 77362 + (netProfit - 370500) * 0.31;
    else if (netProfit <= 673000) indTax = 121475 + (netProfit - 512800) * 0.36;
    else if (netProfit <= 857900) indTax = 179147 + (netProfit - 673000) * 0.39;
    else if (netProfit <= 1817000) indTax = 251258 + (netProfit - 857900) * 0.41;
    else indTax = 644489 + (netProfit - 1817000) * 0.45;
    
    const solePropTax = Math.max(0, indTax - 17224);
    const corpTax = netProfit * 0.27;
    const dwt = (netProfit - corpTax) * 0.20;
    
    return { netProfit, solePropTax, corpBurden: corpTax + dwt, efficiencyDelta: solePropTax - (corpTax + dwt) };
  };

  const results = calculateAudit();

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-b border-[#10B981]/10">
        <h1 className="text-3xl font-serif text-[#FFFDF0] uppercase tracking-wide">Tax Efficiency Matrix [PRO]</h1>
        <p className="text-[#10B981] font-mono text-xs mt-2 uppercase tracking-widest">ENTERPRISE GOVERNANCE // AUDIT ENGINE V.2026</p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <section className="bg-[#021A0E] p-8 border border-[#10B981]/20 rounded-lg">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFFDF0] mb-4">Operational Mandate: System Purpose</h2>
            <p className="text-sm font-light text-[#F5D36B]/80 leading-relaxed">
                The Matrix is designed for high-net-worth directors to identify the precise point of structural tax friction. By comparing personal progressive liabilities against corporate extraction, this tool dictates when to trigger a business restructuring or initiate dividend purification protocols.
            </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 bg-[#021A0E] p-6 border border-[#10B981]/20 rounded">
            <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#10B981]">Gross Revenue</label>
            <input type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full bg-transparent border-b border-[#10B981]/30 focus:border-[#F5D36B] outline-none py-2 text-xl text-[#FFFDF0]" />
            <label className="block text-[9px] uppercase tracking-widest mt-6 mb-2 text-[#10B981]">Expenses</label>
            <input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} className="w-full bg-transparent border-b border-[#10B981]/30 focus:border-[#F5D36B] outline-none py-2 text-xl text-[#FFFDF0]" />
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#021A0E] p-6 border border-[#10B981]/20">
              <span className="text-[9px] uppercase tracking-widest text-[#10B981]">Net Taxable Profit</span>
              <p className="text-2xl font-bold mt-2 text-[#FFFDF0]">R {results.netProfit.toLocaleString()}</p>
            </div>
            <div className="bg-[#021A0E] p-6 border border-[#EF4444]/30">
              <span className="text-[9px] uppercase tracking-widest text-[#EF4444]">Sole Proprietor Drag</span>
              <p className="text-2xl font-bold mt-2 text-[#FFFDF0]">R {results.solePropTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div className="bg-[#021A0E] p-6 border border-[#10B981]/30">
              <span className="text-[9px] uppercase tracking-widest text-[#10B981]">Efficiency Delta</span>
              <p className={`text-2xl font-bold mt-2 ${results.efficiencyDelta > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>R {results.efficiencyDelta.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#021A0E] p-8 border border-[#10B981]/20 rounded-lg">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFFDF0] mb-6">Technical Protocol: How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-light text-[#F5D36B]/80 leading-relaxed">
                <div><span className="block text-[#FFFDF0] font-bold mb-2">1. Input Baseline Data</span>Enter your annual Gross Revenue and Expenses. The Matrix instantly calculates your Net Taxable Profit.</div>
                <div><span className="block text-[#FFFDF0] font-bold mb-2">2. Analyze the Delta</span>The "Efficiency Delta" represents the annual capital you currently forfeit to inefficient tax structures. Positive values denote direct savings potential.</div>
                <div><span className="block text-[#FFFDF0] font-bold mb-2">3. Execute Audit</span>Generate your formal Audit PDF to formalize the transition strategy with your accountant.</div>
            </div>
        </section>

        <section className="p-8 border border-[#F5D36B]/20 rounded-lg text-center">
            <h2 className="text-lg font-serif mb-4 text-[#F5D36B]">Execute Governance Audit</h2>
            <button onClick={() => isClient && window.print()} className="bg-[#F5D36B] text-[#032213] px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-[#FFFDF0] transition">
                Export Formal Audit PDF
            </button>
        </section>
      </main>
    </div>
  );
}
