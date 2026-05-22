"use client";
import React from 'react';

// All nodes moved to a "RESTRICTED" status
const UTILITY_NODES = [
  { id: "synthesis-engine", title: "Synthesis Engine", status: "MAINTENANCE" },
  { id: "exit-optimizer", title: "Exit & Drag Optimizer", status: "MAINTENANCE" },
  { id: "burn-survival", title: "Burn Survival Matrix", status: "MAINTENANCE" },
  { id: "compound-yield", title: "Compound Yield Simulator", status: "MAINTENANCE" },
  { id: "ad-arbitrage", title: "Ad Arbitrage Matrix", status: "MAINTENANCE" },
  { id: "saas-churn", title: "SaaS Churn & LTV Engine", status: "MAINTENANCE" },
  { id: "swing-demo", title: "Swing Telemetry Demo", status: "MAINTENANCE" },
  { id: "tax-estimator", title: "Tax Drag Estimator", status: "MAINTENANCE" },
  { id: "purification-matrix", title: "Purification Matrix", status: "MAINTENANCE" }
];

export default function PublicUtilitiesHub() {
  return (
    <div className="min-h-screen bg-[#020503] text-[#F5D36B] font-mono p-12">
      <header className="mb-16 border-l-4 border-red-600 pl-6">
        <h1 className="text-4xl font-bold text-white uppercase tracking-[0.2em]">Utilities Hub: LOCKED</h1>
        <p className="text-red-500 text-xs mt-3 uppercase tracking-widest">System offline for diagnostic audit.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {UTILITY_NODES.map((node) => (
          <div key={node.id} className="p-6 bg-[#060D0A] border border-red-900/30 opacity-60">
            <h3 className="text-lg text-white mb-4">{node.title}</h3>
            <button 
              disabled 
              className="w-full py-2 bg-red-950 text-red-500 text-[10px] uppercase font-bold cursor-not-allowed"
            >
              Access Restricted
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
