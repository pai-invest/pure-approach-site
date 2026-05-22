"use client";
import React from 'react';

const UTILITY_NODES = [
  // --- PRO-EDITION: MONSTER TOOLS ---
  {
    id: "synthesis-engine",
    title: "Synthesis Engine",
    tag: "PRO // NEURAL",
    objective: "Synthesize disparate data into a single truth score.",
    usage: "Paste market news or raw data. The engine identifies signal vs noise.",
    link: "/digital/calculator/synthesis-engine",
    isPro: true
  },
  {
    id: "exit-optimizer",
    title: "Exit & Drag Optimizer",
    tag: "PRO // ANALYTICS",
    objective: "Find your mathematically perfect exit window.",
    usage: "Input your capital and fees. The engine calculates the precise month to maximize net liquidity.",
    link: "/digital/calculator/exit-optimizer",
    isPro: true
  },
  {
    id: "burn-survival",
    title: "Burn Survival Matrix",
    tag: "PRO // TELEMETRY",
    description: "Automated daily runway monitor.",
    objective: "Extend business survival by identifying critical pivots.",
    usage: "Adjust revenue/expense toggles until 'Days to Bankruptcy' shifts to infinity.",
    link: "/digital/calculator/burn-survival",
    isPro: true
  },
  // --- PUBLIC UTILITIES ---
  {
    id: "compound-yield",
    title: "Compound Yield Simulator",
    tag: "PUBLIC // FINANCE",
    objective: "Model long-term wealth trajectories.",
    usage: "Adjust capital drag and yield rates to see how fees erode your compounding power.",
    link: "/digital/calculator/compound-yield"
  },
  {
    id: "ad-arbitrage",
    title: "Ad Arbitrage Matrix",
    tag: "PUBLIC // MEDIA",
    objective: "Isolate profit from programmatic ad spend.",
    usage: "Cross-reference your CPC and RPM to determine your exact net-margin per 1,000 visitors.",
    link: "/digital/calculator/ad-arbitrage"
  },
  {
    id: "saas-churn",
    title: "SaaS Churn & LTV Engine",
    tag: "PUBLIC // VALUATION",
    objective: "Calculate true customer lifetime value.",
    usage: "Input churn rate and acquisition costs to see how much one customer is actually worth to you.",
    link: "/digital/calculator/saas-churn"
  },
  {
    id: "swing-demo",
    title: "Swing Telemetry Demo",
    tag: "PUBLIC // TRADING",
    objective: "Isolate precise swing trade exits.",
    usage: "Enter your entry price; the node calculates the 9% and 12% resistance exit targets.",
    link: "/digital/calculator/swing"
  },
  {
    id: "tax-estimator",
    title: "Tax Drag Estimator",
    tag: "PUBLIC // GOVERNANCE",
    objective: "Estimate the tax impact on your returns.",
    usage: "Compare your gross returns against local tax brackets to find your real yield.",
    link: "/digital/calculator/tax"
  },
  {
    id: "purification-matrix",
    title: "Purification Matrix",
    tag: "PUBLIC // COMPLIANCE",
    objective: "Filter non-compliant capital fractions.",
    usage: "Isolate your disqualified yield for philanthropic redistribution to maintain ledger purity.",
    link: "/digital/calculator/purification"
  }
];

export default function PublicUtilitiesHub() {
  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans pb-24">
      {/* ... Header remains the same ... */}
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UTILITY_NODES.map((node) => (
            <div key={node.id} className={`p-8 rounded-lg border flex flex-col justify-between ${node.isPro ? "bg-[#021A0E] border-[#F5D36B]/40" : "bg-[#111C3A] border-[#94A3B8]/20"}`}>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#10B981] mb-4 block">{node.tag}</span>
                <h3 className="text-xl font-serif text-white mb-2">{node.title}</h3>
                <p className="text-[11px] text-[#F5D36B] font-bold uppercase tracking-wider mb-2">Objective: {node.objective}</p>
                <p className="text-xs text-[#94A3B8] italic mb-6">Usage: {node.usage}</p>
              </div>
              <a href={node.link} className={`block w-full text-center py-3 text-[10px] font-mono font-bold uppercase tracking-widest ${node.isPro ? "bg-[#F5D36B] text-[#032213]" : "bg-[#E2E8F0] text-[#0A1128]"}`}>
                {node.isPro ? "INITIALIZE PRO" : "Launch Utility"}
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
