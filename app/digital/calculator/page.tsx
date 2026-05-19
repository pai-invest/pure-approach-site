"use client";
import React, { useState } from 'react';

export default function PublicUtilitiesHub() {
  // State for the free micro-utility calculator
  const [monthlyIncome, setMonthlyIncome] = useState<number | ''>('');
  
  // High-impact marketing heuristic logic
  const annualIncome = Number(monthlyIncome) * 12;
  const personalTax = annualIncome * 0.45;
  const corporateTax = annualIncome * 0.27;
  const lostCapital = personalTax - corporateTax;

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      
      {/* Header Area */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#10B981]/10 gap-6">
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/apexlogo.png" 
            alt="Pure Apex Pulse Logo" 
            className="h-24 sm:h-28 w-auto object-contain opacity-90 hover:opacity-100 transition"
          />
        </div>
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/digital" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono">
            ← RETURN TO APEX PULSE
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#04381F]/50 px-3 py-1.5 rounded border border-[#10B981]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[#F5D36B] font-bold font-mono">PUBLIC_UTILITIES // ACTIVE</span>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-[0.4em] text-[#10B981] uppercase font-mono block mb-4">
            System Registry // Public Node
          </span>
          <h1 className="text-3xl md:text-5xl tracking-[0.15em] font-serif font-light uppercase py-2 text-[#FFFDF0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Open-Source Utilities
          </h1>
          <p className="mt-4 text-sm text-[#F5D36B]/80 leading-relaxed max-w-2xl font-light">
            A repository of free, high-velocity mathematical frameworks designed to immediately diagnose capital inefficiencies and structural tax drag for independent professionals.
          </p>
        </div>

        {/* Utilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* CALCULATOR 01: Corporate Arbitrage */}
          <div className="bg-[#021A0E] rounded-xl border border-[#10B981]/20 shadow-2xl overflow-hidden group hover:border-[#10B981]/40 transition duration-500 flex flex-col h-full">
            <div className="p-8 border-b border-[#10B981]/10 bg-[#032213]/50">
              <span className="text-[10px] font-mono tracking-widest uppercase mb-2 block text-[#10B981]">TOOL_01</span>
              <h2 className="text-2xl font-serif tracking-wide text-[#FFFDF0] mb-3">
                Corporate Transition Arbitrage
              </h2>
              <p className="text-xs font-light text-[#F5D36B]/70 leading-relaxed">
                Determine the exact mathematical threshold where independent consultants and professionals bleed capital to personal income tax frameworks versus corporate holding structures.
              </p>
            </div>
            
            <div className="p-8 flex-1 flex flex-col justify-center">
              <label className="block text-xs font-mono font-bold uppercase tracking-widest mb-3 text-[#10B981]">
                Estimated Monthly Revenue (ZAR)
              </label>
              <input 
                type="number" 
                placeholder="e.g. 150000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full p-4 mb-6 border border-[#10B981]/30 rounded bg-[#032213] focus:outline-none focus:border-[#F5D36B] text-xl font-serif text-center text-[#FFFDF0] placeholder-[#10B981]/30 transition-colors"
              />

              <div className={`transition-all duration-500 overflow-hidden ${typeof monthlyIncome === 'number' && monthlyIncome > 0 ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
                <div className="p-6 bg-[#032213] border border-[#10B981]/40 rounded text-center">
                  <span className="block text-[10px] font-mono tracking-widest uppercase mb-2 text-[#F5D36B]/70">Estimated Annual Capital Lost</span>
                  <span className="block text-3xl font-serif tracking-wide mb-4 text-[#FFFDF0] drop-shadow-[0_0_8px_rgba(255,253,240,0.3)]">
                    R {lostCapital.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  
                  {/* Call to action connecting the free tool to the paid vault */}
                  <div className="mt-6 pt-6 border-t border-[#10B981]/10">
                    <p className="text-[10px] font-mono text-[#10B981]/80 mb-4 leading-relaxed uppercase">
                      Stop paying maximum marginal rates. Model your exact extraction strategy and eliminate capital bleed.
                    </p>
                    <a href="/digital/vault" className="inline-block px-6 py-2 border border-[#F5D36B] text-[#F5D36B] hover:bg-[#F5D36B] hover:text-[#032213] text-[10px] font-bold font-mono tracking-widest transition-all duration-300">
                      ACCESS PREMIUM ARBITRAGE MATRIX
                    </a>
                  </div>
                </div>
              </div>
              
              <p className="mt-8 text-[9px] font-mono leading-relaxed text-[#10B981]/40 text-center uppercase">
                *Calculation compares standard 45% maximum marginal individual tax against a 27% corporate tax rate over 12 months. Purely informational heuristic.
              </p>
            </div>
          </div>

          {/* Placeholder for Future Calculator 02 */}
          <div className="bg-[#021A0E] rounded-xl border border-[#10B981]/10 border-dashed shadow-inner h-full min-h-[400px] flex flex-col items-center justify-center opacity-50 relative">
             <div className="text-center px-6">
                <span className="block text-3xl mb-4 text-[#10B981]">◬</span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#F5D36B]/50 block mb-2">SYSTEM ALLOCATING</span>
                <p className="text-xs font-serif tracking-wide text-[#FFFDF0]/50">
                  New mathematical frameworks currently undergoing internal desk testing. 
                </p>
             </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-[#10B981]/10 text-xs text-[#10B981]/50 font-mono text-center uppercase">
        SYS_STATUS: SECURE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. APEX DIGITAL ASSETS DIVISION.
      </footer>
    </div>
  );
}
