import React from 'react';

export default function FrostedDivision() {
  return (
    <div className="min-h-screen bg-[#070D14] text-slate-200 font-sans selection:bg-slate-800 selection:text-cyan-300">
      
      {/* Header Area with Large Logo Featured First (Unified Alignment) */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-cyan-500/10 gap-6">
        
        {/* Borderless Frosted Nostalgia Logo Element */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/frostedlogo.jpg" 
            alt="Frosted Nostalgia Logo" 
            className="h-28 sm:h-32 w-auto object-contain"
          />
        </div>

        {/* Dynamic sub-navigation row */}
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/preview" className="text-xs font-bold tracking-[0.2em] text-cyan-500 hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded border border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
            <span className="text-slate-300 font-bold font-mono">RETRO // LIQUID_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.4em] text-cyan-500/70 uppercase font-mono">
            Heritage Assets // Division 04
          </span>
          
          {/* Icy Platinum/Silver Gradient Title */}
          <h1 className="mt-4 text-4xl md:text-6xl tracking-[0.15em] font-serif font-light uppercase py-2
            bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_50%,#38BDF8_75%,#0369A1_100%)] 
            bg-clip-text text-transparent filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            FROSTED NOSTALGIA
          </h1>
          
          <p className="mt-6 text-base text-slate-400 leading-relaxed max-w-2xl font-light">
            Capturing the financial value of cultural memory. We identify, acquire, and optimize premium nostalgic properties, physical concept experiences, and high-margin retro consumer brands positioned to benefit from demographic asset shifts.
          </p>
        </div>

        {/* Curation Infrastructure Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Operational Module 01 */}
          <div className="p-6 rounded-lg bg-slate-900/20 backdrop-blur-md border border-cyan-500/10 hover:border-cyan-400/30 transition duration-500 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif tracking-wide text-slate-100">Premium Concept Formats</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-slate-950 text-cyan-400 border border-cyan-900/50 rounded">
                STAGE_ALPHA
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400 font-light leading-relaxed">
              Developing asset designs that transform high-demand retro consumer preferences into physical, high-grossing footprints combining unmatched modern margins with structural memory design.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/60 grid grid-cols-2 gap-4 text-xs font-mono text-cyan-600">
              <div>VELOCITY: <span className="text-slate-300 font-bold">SCALABLE</span></div>
              <div>MARKET: <span className="text-slate-300 font-bold">CONSUMER</span></div>
            </div>
          </div>

          {/* Operational Module 02 */}
          <div className="p-6 rounded-lg bg-slate-900/20 backdrop-blur-md border border-cyan-500/10 hover:border-cyan-400/30 transition duration-500 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif tracking-wide text-slate-100">Legacy Physical Sourcing</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-slate-950 text-slate-400 border border-slate-800/60 rounded">
                SYS_ANALYSIS
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400 font-light leading-relaxed">
              Securing historical trademark properties and boutique physical products that command extreme price elasticity and premium consumer brand loyalty across digital networks.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/60 grid grid-cols-2 gap-4 text-xs font-mono text-cyan-600">
              <div>LEVERAGE: <span className="text-slate-300 font-bold">0.00% CASH</span></div>
              <div>AUDIT: <span className="text-slate-300 font-bold">COMPLIANT</span></div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-cyan-500/10 text-xs text-slate-600 font-mono text-center">
        NODE_STATUS: SECURE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. FROSTED NOSTALGIA DIVISION.
      </footer>
    </div>
  );
}
