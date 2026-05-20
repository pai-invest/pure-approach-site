"use client";
import React from 'react';

export default function PublicUtilitiesHub() {
  const publicTools = [
    {
      id: "swing-demo",
      title: "Swing Telemetry Demo",
      tag: "PUBLIC // TRADING",
      description: "Mathematically isolate your 9% and 12% global swing exit targets.",
      link: "/digital/calculator/swing"
    },
    {
      id: "tax-estimator",
      title: "Tax Drag Estimator",
      tag: "PUBLIC // GOVERNANCE",
      description: "Estimate baseline progressive tax versus corporate dividend friction.",
      link: "/digital/calculator/tax"
    },
    {
      id: "purification-matrix",
      title: "Purification Matrix",
      tag: "PUBLIC // COMPLIANCE",
      description: "Isolate non-compliant dividend fractions for philanthropic redistribution.",
      link: "/digital/calculator/purification"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-[#1C2541]">
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-b border-[#94A3B8]/20">
        <div className="flex justify-between items-center mb-12">
          <a href="/digital" className="text-xs font-bold tracking-[0.2em] text-[#94A3B8] hover:text-[#FFFFFF] transition font-mono uppercase">
            ← Return to Pulse Terminal
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#1C2541]/50 px-3 py-1.5 rounded border border-[#94A3B8]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></span>
            <span className="text-[#E2E8F0] font-bold">OPEN_ACCESS</span>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-serif text-[#FFFFFF] uppercase tracking-[0.1em]">Public Utilities</h1>
          <p className="text-[#94A3B8] font-mono text-xs mt-3 tracking-widest uppercase">
            UNRESTRICTED DIAGNOSTIC NODES // PURE APPROACH INVESTMENTS
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publicTools.map((tool) => (
            <div key={tool.id} className="p-8 rounded-lg bg-[#111C3A] border border-[#94A3B8]/20 hover:border-[#E2E8F0]/40 transition duration-500 shadow-xl flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-[#0A1128] text-[#94A3B8] border border-[#94A3B8]/30 rounded mb-4 inline-block">
                  {tool.tag}
                </span>
                <h3 className="text-2xl font-serif tracking-wide text-[#FFFFFF] mb-3">
                  {tool.title}
                </h3>
                <p className="text-sm text-[#94A3B8] font-light leading-relaxed mb-8">
                  {tool.description}
                </p>
              </div>
              <div className="pt-6 border-t border-[#94A3B8]/10">
                <a href={tool.link} className="block w-full text-center px-4 py-3 bg-[#E2E8F0] text-[#0A1128] text-xs uppercase tracking-widest font-mono font-bold hover:bg-[#FFFFFF] transition">
                  Launch Utility
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
