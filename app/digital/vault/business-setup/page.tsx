"use client";
import React, { useState } from 'react';

const setupSteps = [
  { id: 1, title: "Formalization & CIPC", desc: "Register entity via BizPortal and draft custom MOI." },
  { id: 2, title: "Fiscal Infrastructure", desc: "SARS tax registration and eFiling profile setup." },
  { id: 3, title: "Banking & Xero", desc: "Corporate FICA-compliant account and cloud accounting integration." },
  { id: 4, title: "POPIA & Governance", desc: "Drafting operational agreements and privacy policies." },
  { id: 5, title: "Capital Allocation", desc: "Implementing the Barbell strategy for business cash flow." }
];

export default function BusinessSetupVault() {
  const [completed, setCompleted] = useState<number[]>([]);
  const toggleStep = (id: number) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans p-8">
      <header className="max-w-4xl mx-auto border-b border-[#10B981]/20 pb-8 mb-12">
        <h1 className="text-3xl font-serif text-[#FFFDF0] uppercase tracking-widest">Business Launch Blueprint</h1>
        <p className="text-[#10B981] font-mono text-xs mt-2">SOUTH AFRICA // INCORPORATION PROTOCOL // 2026</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {setupSteps.map(step => (
            <div key={step.id} onClick={() => toggleStep(step.id)} className={`p-6 border rounded cursor-pointer transition ${completed.includes(step.id) ? 'bg-[#04381F] border-[#10B981]' : 'bg-[#021A0E] border-[#10B981]/20'}`}>
              <h3 className="font-serif text-[#FFFDF0]">{step.id}. {step.title}</h3>
              <p className="text-xs font-light text-[#F5D36B]/70 mt-1">{step.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-[#021A0E] p-6 border border-[#F5D36B]/20 rounded h-fit">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Implementation Status</h2>
          <div className="w-full bg-[#032213] h-2 mb-4"><div className="bg-[#10B981] h-2" style={{ width: `${(completed.length / setupSteps.length) * 100}%` }}></div></div>
          <p className="text-[10px] text-[#F5D36B]/60 font-mono">{completed.length} / {setupSteps.length} PROTOCOLS INITIALIZED</p>
        </section>
      </main>

      <section className="max-w-4xl mx-auto mt-16 p-8 border border-[#10B981]/20 bg-[#021A0E] rounded">
        <h2 className="text-xl font-serif text-[#FFFDF0] mb-6">Execution Protocol</h2>
        <div className="space-y-6 text-sm text-[#F5D36B]/80 font-light leading-relaxed">
          <p><strong>1. Preparation:</strong> Secure certified ID copies and utility bills. These are mandatory for FICA compliance across all portals.</p>
          <p><strong>2. CIPC/SARS:</strong> Execute registration via <a href="https://www.bizportal.gov.za/" className="text-[#10B981] underline">BizPortal</a>. The integrated flow handles entity registration and tax numbering concurrently.</p>
          <p><strong>3. Governance:</strong> Use Xero to map banking APIs immediately. This establishes an automated, audit-ready ledger from Day 1.</p>
          <p><strong>4. The Barbell Strategy:</strong> Maintain 80% of retained business earnings in high-yield liquidity, deploying the remaining 20% into active growth/inventory. This limits capital drag while ensuring constant pivot potential.</p>
        </div>
      </section>
    </div>
  );
}
