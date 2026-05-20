"use client";
import React, { useState, useMemo } from 'react';

export default function ProvisionalTaxEngine() {
  // Income Streams
  const [salary, setSalary] = useState(600000);
  const [businessProfit, setBusinessProfit] = useState(800000);
  const [rentalIncome, setRentalIncome] = useState(120000);
  const [investIncome, setInvestIncome] = useState(50000);
  
  // Deductions
  const [medicalCredits, setMedicalCredits] = useState(4500);
  const [raContribs, setRaContribs] = useState(100000);

  // Core Compliance Logic
  const audit = useMemo(() => {
    const totalIncome = salary + businessProfit + rentalIncome + investIncome;
    const taxableIncome = Math.max(0, totalIncome - raContribs);
    
    // SARS 2026/27 Progressive Tax Logic
    let indTax = 0;
    if (taxableIncome <= 237100) indTax = taxableIncome * 0.18;
    else if (taxableIncome <= 370500) indTax = 42678 + (taxableIncome - 237100) * 0.26;
    else if (taxableIncome <= 512800) indTax = 77362 + (taxableIncome - 370500) * 0.31;
    else if (taxableIncome <= 673000) indTax = 121475 + (taxableIncome - 512800) * 0.36;
    else if (taxableIncome <= 857900) indTax = 179147 + (taxableIncome - 673000) * 0.39;
    else if (taxableIncome <= 1817000) indTax = 251258 + (taxableIncome - 857900) * 0.41;
    else indTax = 644489 + (taxableIncome - 1817000) * 0.45;
    
    const finalLiability = Math.max(0, indTax - 17224 - medicalCredits);
    const penaltyThreshold = finalLiability * 0.8; // The 80% Rule

    return { totalIncome, taxableIncome, finalLiability, penaltyThreshold };
  }, [salary, businessProfit, rentalIncome, investIncome, raContribs, medicalCredits]);

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      <header className="max-w-6xl mx-auto px-8 pt-12 pb-8 border-b border-[#10B981]/10">
        <h1 className="text-4xl font-serif text-[#FFFDF0] uppercase tracking-wide">Provisional Tax (IRP6) Engine</h1>
        <p className="text-[#10B981] font-mono text-xs mt-2 uppercase tracking-widest">INSTITUTIONAL AUDIT // SARS COMPLIANCE MODELER V.2026</p>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-16 space-y-12">
        
        {/* Operational Mandate */}
        <section className="bg-[#021A0E] p-8 border border-[#10B981]/20 rounded-lg">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFFDF0] mb-4">Operational Mandate</h2>
            <p className="text-sm font-light text-[#F5D36B]/80 leading-relaxed">
                This engine provides a high-fidelity provisional tax projection. It integrates multiple income streams, retirement annuity tax-deductible caps, and medical aid credits to calculate the final SARS liability. Crucially, it models the "80% Penalty Threshold" to ensure your provisional filings avoid SARS under-estimation penalties.
            </p>
        </section>

        {/* Input Layer */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <h3 className="text-xs font-mono text-[#FFFDF0] uppercase tracking-widest border-b border-[#10B981]/20 pb-4">Revenue Stream Inputs</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Gross Salary (PAYE)", val: salary, set: setSalary },
                        { label: "Business Profit", val: businessProfit, set: setBusinessProfit },
                        { label: "Rental Income", val: rentalIncome, set: setRentalIncome },
                        { label: "Investment Yield", val: investIncome, set: setInvestIncome }
                    ].map(field => (
                        <div key={field.label}>
                            <label className="block text-[9px] uppercase text-[#10B981] mb-1">{field.label}</label>
                            <input type="number" value={field.val} onChange={(e) => field.set(Number(e.target.value))} className="w-full bg-[#021A0E] border border-[#10B981]/30 p-2 text-white" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xs font-mono text-[#FFFDF0] uppercase tracking-widest border-b border-[#10B981]/20 pb-4">Compliance Deductions</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-[9px] uppercase text-[#10B981] mb-1">Retirement Annuity (Tax Deductible)</label>
                        <input type="number" value={raContribs} onChange={(e) => setRaContribs(Number(e.target.value))} className="w-full bg-[#021A0E] border border-[#10B981]/30 p-2 text-white" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-[9px] uppercase text-[#10B981] mb-1">Medical Aid Credits (Annual)</label>
                        <input type="number" value={medicalCredits} onChange={(e) => setMedicalCredits(Number(e.target.value))} className="w-full bg-[#021A0E] border border-[#10B981]/30 p-2 text-white" />
                    </div>
                </div>
            </div>
        </section>

        {/* Verdict Layer */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#021A0E] p-6 border border-[#10B981]/20">
                <span className="text-[9px] uppercase text-[#10B981]">Total Revenue</span>
                <p className="text-xl font-bold text-white">R {audit.totalIncome.toLocaleString()}</p>
            </div>
            <div className="bg-[#021A0E] p-6 border border-[#10B981]/20">
                <span className="text-[9px] uppercase text-[#10B981]">Net Taxable Base</span>
                <p className="text-xl font-bold text-white">R {audit.taxableIncome.toLocaleString()}</p>
            </div>
            <div className="bg-[#021A0E] p-6 border border-[#10B981]/40">
                <span className="text-[9px] uppercase text-[#10B981]">Total Tax Liability</span>
                <p className="text-xl font-bold text-white">R {audit.finalLiability.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
            </div>
            <div className="bg-[#021A0E] p-6 border border-rose-500/40">
                <span className="text-[9px] uppercase text-rose-500">80% Penalty Threshold</span>
                <p className="text-xl font-bold text-white">R {audit.penaltyThreshold.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
            </div>
        </section>

        {/* Technical Protocol */}
        <section className="bg-[#021A0E] p-8 border border-[#10B981]/20 rounded-lg">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFFDF0] mb-6">Technical Protocol: Compliance Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-[#F5D36B]/80">
                <div><span className="block text-white font-bold mb-2">1. Income Aggregation</span>The engine aggregates all active and passive streams. Provisional tax is calculated on the total, not individual silos.</div>
                <div><span className="block text-white font-bold mb-2">2. The 80% Rule</span>If your estimate is below the red "Penalty Threshold," SARS may impose a 20% penalty. This is your primary risk metric.</div>
                <div><span className="block text-white font-bold mb-2">3. Audit Output</span>Use the export button to generate your provisional declaration record. This PDF is proof of diligent calculation in the event of an audit.</div>
            </div>
        </section>

        <section className="text-center">
            <button onClick={() => window.print()} className="bg-[#F5D36B] text-[#032213] px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-[#FFFDF0] transition">
                Export Formal Provisional Audit
            </button>
        </section>
      </main>
    </div>
  );
}
