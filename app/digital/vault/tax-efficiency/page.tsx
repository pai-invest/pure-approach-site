"use client";
import React, { useState, useMemo } from 'react';

export default function TaxStrategistPro() {
  // --- INPUTS ---
  const [salary, setSalary] = useState(600000);
  const [businessProfit, setBusinessProfit] = useState(800000);
  const [capGains, setCapGains] = useState(100000); // Net capital gain
  const [raContribs, setRaContribs] = useState(100000); // Pension
  const [medicalCredits, setMedicalCredits] = useState(4500);

  // --- ADVISORY ENGINE LOGIC ---
  const audit = useMemo(() => {
    const totalIncome = salary + businessProfit;
    const taxableIncome = Math.max(0, totalIncome - raContribs);
    
    // CGT Calculation: 40% inclusion rate
    const taxableCGT = Math.max(0, capGains - 40000) * 0.4;
    const finalTaxable = taxableIncome + taxableCGT;

    // SARS 2026/27 Progressive Tax Logic
    let indTax = 0;
    if (finalTaxable <= 237100) indTax = finalTaxable * 0.18;
    else if (finalTaxable <= 370500) indTax = 42678 + (finalTaxable - 237100) * 0.26;
    else if (finalTaxable <= 512800) indTax = 77362 + (finalTaxable - 370500) * 0.31;
    else if (finalTaxable <= 673000) indTax = 121475 + (finalTaxable - 512800) * 0.36;
    else if (finalTaxable <= 857900) indTax = 179147 + (finalTaxable - 673000) * 0.39;
    else if (finalTaxable <= 1817000) indTax = 251258 + (finalTaxable - 857900) * 0.41;
    else indTax = 644489 + (finalTaxable - 1817000) * 0.45;
    
    const finalLiability = Math.max(0, indTax - 17224 - medicalCredits); // 17224 Primary Rebate
    const provisionalThreshold = finalLiability * 0.8;

    // Advisory Logic
    const insights = [];
    if (raContribs < (totalIncome * 0.275)) insights.push("RA contribution optimization: You are currently below the 27.5% threshold. Increasing contributions could yield immediate tax arbitrage.");
    if (capGains > 40000) insights.push("Capital Gains Alert: Your net gain exceeds the annual R40k exclusion. Ensure accurate declaration to avoid SARS verification requests.");
    if (finalLiability > (salary * 0.35)) insights.push("High Tax Drag: Your effective tax rate is high. Consider restructuring profit streams into a corporate entity.");

    return { totalIncome, taxableIncome, finalLiability, provisionalThreshold, insights };
  }, [salary, businessProfit, capGains, raContribs, medicalCredits]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-8 print:bg-white print:text-black">
      <header className="max-w-6xl mx-auto border-b border-slate-700 pb-8 mb-12 print:border-black">
        <h1 className="text-4xl font-serif text-white uppercase tracking-wide print:text-black">Tax Strategist Pro</h1>
        <p className="text-emerald-400 font-mono text-xs mt-2 uppercase tracking-widest print:text-gray-600">INSTITUTIONAL ADVISORY ENGINE // SARS COMPLIANCE & STRATEGY V.2026</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        
        <section className="bg-slate-900 p-8 border border-slate-700 rounded-lg print:border-black">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4 print:text-black">Operational Mandate</h2>
            <p className="text-sm font-light text-slate-400 leading-relaxed print:text-black">
                This engine functions as a preliminary tax advisor. It integrates multiple income streams, retirement annuity (RA) caps, Capital Gains Tax (CGT) inclusion rates, and medical credits to simulate your final SARS liability. Use this to determine your IRP6 provisional tax liability and preemptively model your tax drag before the SARS filing season.
            </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-xs font-mono text-white uppercase tracking-widest border-b border-slate-700 pb-4 mb-6">Income Streams & Deductions</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Salary (PAYE)", val: salary, set: setSalary },
                        { label: "Business Profit", val: businessProfit, set: setBusinessProfit },
                        { label: "Capital Gains", val: capGains, set: setCapGains },
                        { label: "RA Contributions", val: raContribs, set: setRaContribs }
                    ].map(field => (
                        <div key={field.label}>
                            <label className="block text-[9px] uppercase text-slate-500 mb-1">{field.label}</label>
                            <input type="number" value={field.val} onChange={(e) => field.set(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-2 text-white outline-none focus:border-white" />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xs font-mono text-white uppercase tracking-widest border-b border-slate-700 pb-4 mb-6">Strategic Advisor Insights</h3>
                <div className="bg-emerald-950/20 border border-emerald-900/50 p-6 rounded text-sm text-emerald-100 space-y-4">
                    {audit.insights.map((insight, i) => (
                        <p key={i} className="flex gap-2"><span>•</span> {insight}</p>
                    ))}
                </div>
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 border border-slate-700">
                <span className="text-[9px] uppercase text-slate-400">Total Projected Liability</span>
                <p className="text-2xl font-bold text-white mt-1">R {audit.finalLiability.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
            </div>
            <div className="bg-slate-900 p-6 border border-emerald-800">
                <span className="text-[9px] uppercase text-emerald-500">Provisional Safety Zone</span>
                <p className="text-2xl font-bold text-white mt-1">R {audit.provisionalThreshold.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
            </div>
             <div className="bg-slate-900 p-6 border border-rose-800">
                <span className="text-[9px] uppercase text-rose-500">Under-Estimation Risk</span>
                <p className="text-xl font-bold text-white mt-1">
                    {audit.finalLiability > 50000 ? "HIGH" : "LOW"}
                </p>
            </div>
        </section>

        <section className="bg-slate-900 p-8 border border-slate-700 rounded-lg">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-6">Technical Protocol: Compliance Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-400">
                <div><span className="block text-white font-bold mb-2">1. The 80% Rule</span>Your "Provisional Safety Zone" is 80% of your total liability. If you declare less than this, SARS will automatically trigger a 20% penalty.</div>
                <div><span className="block text-white font-bold mb-2">2. Tax Arbitrage</span>The advisor insights analyze your deductions. Always target the 27.5% RA contribution cap to move your taxable income lower.</div>
                <div><span className="block text-white font-bold mb-2">3. Audit Preparation</span>The "Formal Provisional Audit" PDF is your defense document. It proves you used a calculated model rather than a "thumb-suck" estimate.</div>
            </div>
        </section>

        <section className="text-center print:hidden">
            <button onClick={() => window.print()} className="bg-white text-black px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition">
                Generate Formal Provisional Audit (PDF)
            </button>
        </section>
      </main>
    </div>
  );
}
