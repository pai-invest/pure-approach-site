"use client";
import React, { useState } from 'react';

export default function PublicSwingCalculator() {
  const [investment, setInvestment] = useState<number>(20000);
  const [ticker, setTicker] = useState<string>("SPY");
  const [entryPrice, setEntryPrice] = useState<number>(500);

  // Core Algorithmic Logic (Simplified for Public Use)
  const shares = entryPrice > 0 ? Math.floor(investment / entryPrice) : 0;
  const actualInvested = shares * entryPrice;
  
  const target9 = entryPrice * 1.09;
  const target12 = entryPrice * 1.12;
  
  const yield9 = actualInvested * 0.09;
  const yield12 = actualInvested * 0.12;

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-[#1C2541] flex flex-col">
      
      {/* Navigation & Status Header */}
      <header className="max-w-4xl mx-auto w-full px-6 pt-12 pb-8 border-b border-[#94A3B8]/20">
        <div className="flex justify-between items-center mb-12">
          <a href="/digital" className="text-xs font-bold tracking-[0.2em] text-[#94A3B8] hover:text-[#FFFFFF] transition font-mono uppercase">
            ← Return to Pulse Terminal
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#1C2541]/50 px-3 py-1.5 rounded border border-[#94A3B8]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></span>
            <span className="text-[#E2E8F0] font-bold">PUBLIC_NODE</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-serif text-[#FFFFFF] uppercase tracking-[0.1em]">Swing Telemetry Demo</h1>
          <p className="text-[#94A3B8] font-mono text-xs mt-3 tracking-widest uppercase">
            BASE CAPITAL EXTRAPOLATION // 9% & 12% TARGETS
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 py-12 flex-1">
        
        {/* Operational Mandate */}
        <section className="bg-[#111C3A] p-6 border border-[#E2E8F0]/10 rounded-xl mb-12">
          <p className="text-sm font-light text-[#94A3B8] leading-relaxed">
            This public utility mathematically isolates the exact exit points for the **9% Global Swing** and **12% Profit Swing** frameworks. Input your allocated capital to map out automated execution targets and strip emotional bias from your trading exits.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Inputs */}
          <section className="bg-[#111C3A] p-8 rounded border border-[#94A3B8]/20 shadow-xl">
            <h3 className="text-xs font-mono mb-6 text-[#FFFFFF] tracking-widest uppercase border-b border-[#94A3B8]/20 pb-4">Trade Parameters</h3>
            
            <div className="mb-5">
              <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Capital Allocated to Swing</label>
              <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] font-serif focus:border-[#E2E8F0] outline-none transition" />
            </div>
            <div className="mb-5">
              <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Asset Ticker</label>
              <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] font-serif uppercase focus:border-[#E2E8F0] outline-none transition" />
            </div>
            <div className="mb-5">
              <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Entry Price</label>
              <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] font-serif focus:border-[#E2E8F0] outline-none transition" />
            </div>
          </section>

          {/* Telemetry Dashboard */}
          <section className="space-y-6">
            
            <div className="bg-[#1C2541] border border-[#94A3B8]/20 rounded p-6 flex justify-between items-center">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#94A3B8]">Position Sizing</span>
                <p className="text-xl text-[#FFFFFF] font-serif mt-1">{shares} Units</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest text-[#94A3B8]">Actual Capital Deployed</span>
                <p className="text-xl text-[#FFFFFF] font-serif mt-1">{actualInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="bg-[#111C3A] border border-[#94A3B8]/20 rounded p-6">
              <div className="border-b border-[#94A3B8]/10 pb-6 mb-6">
                <h4 className="text-sm font-serif text-[#E2E8F0] mb-1">9% Global Swing Target</h4>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-[10px] font-mono text-[#94A3B8] uppercase">Primary Liquidity Exit</p>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#FFFFFF]">{target9.toFixed(2)}</p>
                    <p className="text-[10px] text-[#10B981] font-mono mt-1">+ {yield9.toLocaleString(undefined, { minimumFractionDigits: 2 })} Yield</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-serif text-[#E2E8F0] mb-1">12% Profit Swing Target</h4>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-[10px] font-mono text-[#94A3B8] uppercase">Secondary Momentum Exit</p>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#FFFFFF]">{target12.toFixed(2)}</p>
                    <p className="text-[10px] text-[#10B981] font-mono mt-1">+ {yield12.toLocaleString(undefined, { minimumFractionDigits: 2 })} Yield</p>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>

        {/* Upsell to Premium Vault */}
        <div className="mt-16 bg-[#111C3A] border border-[#F5D36B]/30 rounded-xl p-8 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F5D36B] to-[#B38F24]"></div>
          <h2 className="text-lg font-serif text-[#FFFFFF] tracking-wide mb-2">Upgrade to the Full Global Swing Matrix</h2>
          <p className="text-xs text-[#94A3B8] font-mono tracking-widest uppercase mb-6">Barbell Strategy Engine // Persistent Trade Ledger</p>
          <p className="text-sm font-light text-[#E2E8F0] max-w-2xl mx-auto mb-8">
            Stop tracking trades on scattered spreadsheets. The full Matrix automatically splits your capital into an 80% defensive core, limits position sizing, and logs every active swing into a permanent state-managed ledger. 
          </p>
          <a href="/digital/vault" className="inline-block bg-[#F5D36B] text-[#0A1128] px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#FFFFFF] transition shadow-[0_0_15px_rgba(245,211,107,0.15)]">
            Access The Vault
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full px-6 py-8 border-t border-[#94A3B8]/10 text-[9px] font-mono text-[#94A3B8]/40 text-center uppercase tracking-widest">
        PUBLIC UTILITY // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD.
      </footer>
    </div>
  );
}
