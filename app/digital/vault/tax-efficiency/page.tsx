"use client";
import React, { useState, useEffect } from 'react';

export default function TaxEfficiencyMatrixPro() {
  const [revenue, setRevenue] = useState(1500000);
  const [expenses, setExpenses] = useState(300000);
  const [salaryRatio, setSalaryRatio] = useState(40); // User-selected split
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const calculateAudit = () => {
    const netProfit = Math.max(0, revenue - expenses);
    const complianceCost = 30000; // Estimated annual Pty Ltd accounting/audit fee

    // 1. Sole Proprietor Tax (Progressive)
    const calculateIndTax = (income: number) => {
        let tax = 0;
        if (income <= 237100) tax = income * 0.18;
        else if (income <= 370500) tax = 42678 + (income - 237100) * 0.26;
        else if (income <= 512800) tax = 77362 + (income - 370500) * 0.31;
        else if (income <= 673000) tax = 121475 + (income - 512800) * 0.36;
        else if (income <= 857900) tax = 179147 + (income - 673000) * 0.39;
        else if (income <= 1817000) tax = 251258 + (income - 857900) * 0.41;
        else tax = 644489 + (income - 1817000) * 0.45;
        return Math.max(0, tax - 17224);
    };

    const solePropTax = calculateIndTax(netProfit);
    const solePropTakeHome = netProfit - solePropTax;

    // 2. Pty Ltd Optimization
    const salary = netProfit * (salaryRatio / 100);
    const dividends = netProfit - salary;
    
    const PAYE = calculateIndTax(salary);
    const corpTax = (netProfit - salary) * 0.27;
    const DWT = (dividends - corpTax) * 0.20;
    
    const ptyLtdTotalTax = PAYE + corpTax + DWT + complianceCost;
    const ptyLtdTakeHome = netProfit - ptyLtdTotalTax;

    return { 
      netProfit, 
      solePropTakeHome, 
      ptyLtdTakeHome, 
      efficiencyDelta: ptyLtdTakeHome - solePropTakeHome,
      strategy: ptyLtdTakeHome > solePropTakeHome ? "PTY LTD OPTIMIZED" : "SOLE PROPRIETOR OPTIMIZED"
    };
  };

  const results = calculateAudit();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-8 print:bg-white print:text-black">
      <header className="max-w-5xl mx-auto border-b border-slate-700 pb-8 mb-12">
        <h1 className="text-4xl font-serif text-white uppercase tracking-wide print:text-black">Structural Strategy Engine</h1>
        <p className="text-slate-400 font-mono text-xs mt-2 uppercase tracking-widest">Enterprise Governance // Tax Efficiency Matrix [PRO]</p>
      </header>

      <main className="max-w-5xl mx-auto space-y-12">
        {/* Purpose & Mandate */}
        <section className="bg-slate-900 p-8 border border-slate-800 rounded-lg">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">Operational Mandate</h2>
            <p className="text-sm font-light text-slate-400 leading-relaxed">
                This engine calculates the breakeven point between Sole Proprietorship and Private Company structures. It accounts for corporate compliance costs, dividend withholding tax (DWT), and individual PAYE progressive rates to identify the optimal after-tax wealth strategy.
            </p>
        </section>

        {/* Engine Inputs */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 bg-slate-900 p-6 border border-slate-800 rounded">
            <label className="block text-[9px] uppercase tracking-widest mb-2 text-slate-400">Annual Revenue</label>
            <input type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full bg-transparent border-b border-slate-600 focus:border-white outline-none py-2 text-xl text-white" />
            
            <label className="block text-[9px] uppercase tracking-widest mt-6 mb-2 text-slate-400">Annual Expenses</label>
            <input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} className="w-full bg-transparent border-b border-slate-600 focus:border-white outline-none py-2 text-xl text-white" />
            
            <label className="block text-[9px] uppercase tracking-widest mt-6 mb-2 text-slate-400">Salary Extraction %: {salaryRatio}%</label>
            <input type="range" min="10" max="90" value={salaryRatio} onChange={(e) => setSalaryRatio(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
          </div>

          {/* Verdict Panel */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 border border-slate-800">
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Strategy Verdict</span>
              <p className={`text-xl font-bold mt-2 ${results.efficiencyDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{results.strategy}</p>
            </div>
            <div className="bg-slate-900 p-6 border border-slate-800">
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Sole Prop Net</span>
              <p className="text-2xl font-bold mt-2 text-white">R {results.solePropTakeHome.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div className="bg-slate-900 p-6 border border-slate-800">
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Pty Ltd Net</span>
              <p className="text-2xl font-bold mt-2 text-white">R {results.ptyLtdTakeHome.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
          </div>
        </section>

        {/* Technical Protocol */}
        <section className="bg-slate-900 p-8 border border-slate-800 rounded-lg">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-6">Technical Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-light text-slate-400 leading-relaxed">
                <div><span className="block text-white font-bold mb-2">1. The Compliance Offset</span>The calculation automatically subtracts R30,000 annually. This represents the hidden cost of running a company (accounting, CIPC, audit).</div>
                <div><span className="block text-white font-bold mb-2">2. Salary/Dividend Split</span>Use the slider to find the point where your PAYE tax (on salary) is lower than the combined corporate tax and DWT burden.</div>
                <div><span className="block text-white font-bold mb-2">3. Audit Output</span>The "Efficiency Delta" shows your exact annual savings. If negative, your revenue is too low to justify the compliance cost.</div>
            </div>
        </section>

        <section className="text-center print:hidden">
            <button onClick={() => isClient && window.print()} className="bg-white text-black px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition">
                Export Audit PDF
            </button>
        </section>
      </main>
    </div>
  );
}
