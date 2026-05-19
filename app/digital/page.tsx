"use client";
import React from 'react';

export default function DigitalDivision() {
  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      
      {/* Header Area */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#10B981]/10 gap-6">
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/apexlogo.png" 
            alt="Pure Apex Pulse Logo" 
            className="h-28 sm:h-32 w-auto object-contain"
          />
        </div>
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/preview" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#04381F]/50 px-3 py-1.5 rounded border border-[#10B981]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[#F5D36B] font-bold font-mono">PULSE // SECURE_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.4em] text-[#10B981] uppercase font-mono">
            System Registry // Division 02
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl tracking-[0.15em] font-serif font-light uppercase py-2
            bg-[linear-gradient(135deg,#FFFDF0_0%,#F5D36B_25%,#D4AF37_50%,#B38F24_75%,#543D04_100%)] 
            bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            PURE APEX PULSE
          </h1>
          <p className="mt-6 text-base text-[#F5D36B]/80 leading-relaxed max-w-2xl font-light">
            The high-performance digital asset pipeline of Pure Approach Investments. We build, optimize, and scale algorithmic web architectures, custom micro-utilities, and automated data networks engineered for compound equity growth with zero capital drag.
          </p>
        </div>

        {/* --- SYSTEM DIRECTORY (NEW NAVIGATION HUB) --- */}
        <div className="mt-20 border-t border-[#10B981]/20 pt-16">
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase font-mono mb-8 text-[#10B981]">
            Active Deployment Nodes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Link to The Vault */}
            <div className="p-8 rounded-xl bg-[#021A0E] border border-[#10B981]/20 hover:border-[#F5D36B]/50 transition duration-500 shadow-2xl flex flex-col relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F5D36B] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-3 text-[#10B981]">SECURE PORTAL</span>
              <h3 className="text-2xl font-serif tracking-wide text-[#FFFDF0] mb-3">The Apex Vault</h3>
              <p className="text-sm text-[#F5D36B]/70 font-light leading-relaxed flex-1 mb-8">
                Access proprietary, cloud-hosted tracking architectures and mechanical financial frameworks utilized internally by our corporate desk.
              </p>
              <a href="/digital/vault" className="inline-flex items-center justify-between px-6 py-3 bg-[#032213] border border-[#10B981]/30 hover:border-[#F5D36B] text-[#F5D36B] hover:text-[#FFFDF0] text-xs font-mono font-bold tracking-widest transition-all duration-300">
                ENTER VAULT <span className="text-[#10B981] text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Link to Free Calculator */}
            <div className="p-8 rounded-xl bg-[#021A0E] border border-[#10B981]/20 hover:border-[#10B981]/60 transition duration-500 shadow-2xl flex flex-col relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981] opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-3 text-[#10B981]">PUBLIC MICRO-UTILITY</span>
              <h3 className="text-2xl font-serif tracking-wide text-[#FFFDF0] mb-3">Arbitrage ROI Calculator</h3>
              <p className="text-sm text-[#F5D36B]/70 font-light leading-relaxed flex-1 mb-8">
                Determine the exact mathematical threshold where independent professionals bleed capital to personal income tax frameworks.
              </p>
              <a href="/digital/calculator" className="inline-flex items-center justify-between px-6 py-3 bg-[#032213] border border-[#10B981]/30 hover:border-[#10B981] text-[#F5D36B] hover:text-[#FFFDF0] text-xs font-mono font-bold tracking-widest transition-all duration-300">
                INITIALIZE TOOL <span className="text-[#10B981] text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

          </div>
        </div>

        {/* Protocol Control Room */}
        <div className="mt-24 border-t border-[#10B981]/20 pt-16">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase font-mono mb-8 text-[#F5D36B]">
            System Telemetry Protocols
          </h2>
          <div className="space-y-4 text-xs font-mono text-[#F5D36B]/80">
            <div className="bg-[#021A0E] p-4 rounded border border-[#10B981]/20 flex items-start gap-3">
              <span className="text-[#10B981] font-bold">[PROT_01]</span>
              <div>
                <span className="text-[#F5D36B] block font-serif text-sm tracking-wide mb-1 font-bold">AUTOMATED VELOCITY CONTROL</span>
                <p className="font-sans font-light text-[#F5D36B]/70 text-sm leading-relaxed">
                  All web platforms operate under automated edge deployment lines, matching traffic spikes globally without manual infrastructure intervention or database overhead scaling limits.
                </p>
              </div>
            </div>
            <div className="bg-[#021A0E] p-4 rounded border border-[#10B981]/20 flex items-start gap-3">
              <span className="text-[#10B981] font-bold">[PROT_02]</span>
              <div>
                <span className="text-[#F5D36B] block font-serif text-sm tracking-wide mb-1 font-bold">CAPITAL ALLOCATION EFFICIENCY</span>
                <p className="font-sans font-light text-[#F5D36B]/70 text-sm leading-relaxed">
                  Operating expenditures are computationally locked at minimum baselines to capture the highest possible net yield per single digital node.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-[#10B981]/10 text-xs text-[#10B981]/50 font-mono text-center">
        SYS_STATUS: SECURE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. APEX DIGITAL ASSETS DIVISION.
      </footer>
    </div>
  );
}
