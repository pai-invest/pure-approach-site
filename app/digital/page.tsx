import React from 'react';

export default function DigitalDivision() {
  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      
      {/* Header Area */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center border-b border-[#10B981]/10 gap-8">
        
        {/* Official Apex Pulse Logo filling the entire previous footprint seamlessly - Now a focal centerpiece */}
        <div className="flex items-center justify-center shrink-0 w-full">
          <img 
            src="/apexlogo.png" 
            alt="Pure Apex Pulse Logo" 
            className="h-56 sm:h-72 md:h-80 w-auto object-contain"
          />
        </div>

        {/* Dynamic sub-navigation row */}
        <div className="w-full flex justify-between items-center mt-6">
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
          
          {/* Classy 24K Liquid Gold Serif Typography */}
          <h1 className="mt-4 text-4xl md:text-6xl tracking-[0.15em] font-serif font-light uppercase py-2
            bg-[linear-gradient(135deg,#FFFDF0_0%,#F5D36B_25%,#D4AF37_50%,#B38F24_75%,#543D04_100%)] 
            bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            PURE APEX PULSE
          </h1>
          
          {/* Unified Premium Gold Text Content */}
          <p className="mt-6 text-base text-[#F5D36B]/80 leading-relaxed max-w-2xl font-light">
            The high-performance digital asset pipeline of Pure Approach Investments. We build, optimize, and scale algorithmic web architectures, custom micro-utilities, and automated data networks engineered for compound equity growth with zero capital drag.
          </p>
        </div>

        {/* Tech Matrix / Operational Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Asset Framework 01 */}
          <div className="p-6 rounded-lg bg-[#021A0E] border border-[#10B981]/20 hover:border-[#F5D36B]/40 transition duration-500 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-serif tracking-wide text-[#F5D36B]">Programmatic Media Pipelines</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-[#032213] text-[#10B981] border border-[#10B981]/30 rounded">
                  SYS_ACTIVE
                </span>
              </div>
              <p className="mt-3 text-sm text-[#F5D36B]/70 font-light leading-relaxed">
                Deploying light, edge-optimized content networks designed for mathematical keyword capture. These assets convert global search volume into persistent, high-margin transactional flow.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#10B981]/10 grid grid-cols-2 gap-4 text-xs font-mono text-[#10B981]">
              <div>CAPACITY: <span className="text-[#FFFDF0] font-bold">MAX_EFFICIENCY</span></div>
              <div>MONETIZATION: <span className="text-[#FFFDF0] font-bold">PROGRAMMATIC</span></div>
            </div>
          </div>

          {/* Asset Framework 02 */}
          <div className="p-6 rounded-lg bg-[#021A0E] border border-[#10B981]/20 hover:border-[#F5D36B]/40 transition duration-500 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-serif tracking-wide text-[#F5D36B]">Custom Software Utilities</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-[#04381F] text-[#F5D36B] border border-[#F5D36B]/20 rounded">
                  NODE_SCALING
                </span>
              </div>
              <p className="mt-3 text-sm text-[#F5D36B]/70 font-light leading-relaxed">
                Engineering proprietary serverless micro-SaaS and transactional web interfaces that eliminate workflow inefficiencies and yield automated recurring margins.
              </p>
            </div>
            
            <div>
              <div className="mt-6 pt-4 border-t border-[#10B981]/10 grid grid-cols-2 gap-4 text-xs font-mono text-[#10B981]">
                <div>INFRASTRUCTURE: <span className="text-[#FFFDF0] font-bold">DECOUPLED</span></div>
                <div>DEBT LEVERAGE: <span className="text-[#FFFDF0] font-bold">0.00%</span></div>
              </div>
              
              {/* --- NEW ASSET REGISTRY LINKS ADDED HERE --- */}
              <div className="mt-6 flex gap-4">
                <a href="/digital/calculator" className="flex-1 text-center px-4 py-2 border border-[#10B981]/30 hover:border-[#10B981] text-[#10B981] text-[10px] uppercase tracking-widest font-mono transition">
                  Public Calculator
                </a>
                <a href="/digital/vault" className="flex-1 flex items-center justify-center px-4 py-2 bg-[#F5D36B] text-[#032213] text-[10px] uppercase tracking-widest font-mono font-bold hover:bg-[#FFFDF0] transition shadow-[0_0_15px_rgba(245,211,107,0.15)]">
                  Access Vault
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Protocol Control Room */}
        <div className="mt-24 max-w-3xl border-t border-[#10B981]/20 pt-16">
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
