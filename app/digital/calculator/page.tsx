"use client";
import React from 'react';

export default function PublicUtilitiesHub() {
  const publicTools = [
    // --- MONSTER TOOLS (PRO-EDITION) ---
    {
      id: "exit-optimizer",
      title: "Exit & Drag Optimizer",
      tag: "PRO_EDITION // ANALYTICS",
      description: "Model optimal exit windows by calculating compound growth vs tax friction and inflationary decay.",
      link: "/digital/calculator/exit-optimizer",
      isPro: true
    },
    {
      id: "burn-survival",
      title: "Burn Survival Matrix",
      tag: "PRO_EDITION // TELEMETRY",
      description: "Automated daily runway monitor: identify days to bankruptcy and exact revenue adjustments needed.",
      link: "/digital/calculator/burn-survival",
      isPro: true
    },
    // --- NEW PUBLIC ADDITIONS ---
    {
      id: "compound-yield",
      title: "Compound Yield Simulator",
      tag: "PUBLIC // FINANCE",
      description: "Model infinite compounding trajectories, factoring in automated reinvestment and capital drag.",
      link: "/digital/calculator/compound-yield"
    },
    {
      id: "ad-arbitrage",
      title: "Ad Arbitrage Matrix",
      tag: "PUBLIC // MEDIA",
      description: "Determine exact net-yield margins for programmatic media pipelines by cross-referencing CPC vs RPM.",
      link: "/digital/calculator/ad-arbitrage"
    },
    {
      id: "saas-churn",
      title: "SaaS Churn & LTV Engine",
      tag: "PUBLIC // VALUATION",
      description: "Model long-term valuation by extracting the true Lifetime Value from churn and acquisition costs.",
      link: "/digital/calculator/saas-churn"
    },
    // --- LEGACY UTILITIES ---
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
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0] pb-24">
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-b border-[#10B981]/20">
        <div className="flex justify-between items-center mb-12">
          <a href="/digital" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono uppercase">
            ← Return to Pulse Terminal
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#04381F]/50 px-3 py-1.5 rounded border border-[#10B981]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></span>
            <span className="text-[#F5D36B] font-bold">PUBLIC_CALC // ONLINE</span>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-serif text-[#FFFFFF] uppercase tracking-[0.1em]">Public Utilities</h1>
          <p className="text-[#10B981] font-mono text-xs mt-3 tracking-widest uppercase">
            UNRESTRICTED DIAGNOSTIC NODES // PURE APPROACH INVESTMENTS
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicTools.map((tool) => (
            <div 
              key={tool.id} 
              className={`p-8 rounded-lg border transition duration-500 shadow-xl flex flex-col justify-between 
                ${tool.isPro 
                  ? "bg-[#021A0E] border-[#F5D36B]/40 hover:border-[#F5D36B]" 
                  : "bg-[#111C3A] border-[#94A3B8]/20 hover:border-[#E2E8F0]/40"}`}
            >
              <div>
                <span className={`px-2 py-0.5 text-[10px] font-mono tracking-wider rounded mb-4 inline-block 
                  ${tool.isPro ? "bg-[#F5D36B]/10 text-[#F5D36B]" : "bg-[#0A1128] text-[#94A3B8] border border-[#94A3B8]/30"}`}>
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
                <a 
                  href={tool.link} 
                  className={`block w-full text-center px-4 py-3 text-xs uppercase tracking-widest font-mono font-bold transition
                    ${tool.isPro 
                      ? "bg-[#F5D36B] text-[#032213] hover:bg-[#FFFFFF]" 
                      : "bg-[#E2E8F0] text-[#0A1128] hover:bg-[#FFFFFF]"}`}
                >
                  {tool.isPro ? "INITIALIZE PRO" : "Launch Utility"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
