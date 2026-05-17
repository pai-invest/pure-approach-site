import React from 'react';

export default function FrostedDivision() {
  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans selection:bg-amber-950 selection:text-amber-200">
      
      {/* Header Area (Unified Sizing & Alignment) */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-amber-500/10 gap-6">
        
        {/* Seamless Logo Integration */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/frostedlogo.jpg" 
            alt="Frosted Nostalgia Logo" 
            className="h-28 sm:h-32 w-auto object-contain"
          />
        </div>

        {/* Dynamic sub-navigation row */}
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-amber-500 hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]"></span>
            <span className="text-neutral-400 font-bold font-mono">RETRO // MERCHANDISE_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.4em] text-amber-600 uppercase font-mono">
            Heritage Assets // Division 04
          </span>
          
          {/* Custom 3D Shiny Gold Embossed Header Layout */}
          <h1 className="mt-4 flex flex-col md:flex-row items-baseline gap-2">
            <span className="text-5xl md:text-7xl font-light tracking-tight font-serif
              bg-[linear-gradient(135deg,#FFF7AD_0%,#FDAE38_25%,#B87C14_45%,#FFF7AD_55%,#F0A928_70%,#784A00_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.1)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
              FROSTED
            </span>
            <span className="text-4xl md:text-5xl font-black tracking-widest uppercase py-2
              bg-[linear-gradient(135deg,#FFF7AD_0%,#FDAE38_25%,#B87C14_45%,#FFF7AD_55%,#F0A928_70%,#784A00_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.1)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
              NOSTALGIA
            </span>
          </h1>
          
          {/* Bright Shiny Gold Summary Paragraph */}
          <p className="mt-6 text-base leading-relaxed max-w-2xl font-light
              bg-[linear-gradient(135deg,#FFFDF0_0%,#F5D061_35%,#C59B27_60%,#E6BA45_80%,#A17714_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_4px_5px_rgba(0,0,0,0.6)]">
            Capitalizing on high-margin cultural resurgence, premium retro-modern brand physical spaces, and curated legacy consumer products. Built on absolute financial structural stability, optimized operational procurement, and unmatched demographic brand equity.
          </p>
        </div>

        {/* Operational Modules Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Module 01 */}
          <div className="group p-6 rounded-lg bg-neutral-950 border border-amber-500/10 hover:border-amber-500/30 transition duration-500 shadow-xl">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold tracking-wide
                bg-[linear-gradient(135deg,#FFF7AD_0%,#FDAE38_25%,#B87C14_45%,#FFF7AD_55%,#F0A928_70%,#784A00_100%)] 
                bg-clip-text text-transparent">
                Premium Concept Formats
              </h3>
              <span className="text-[10px] font-mono text-amber-600">STAGE_ALPHA</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400 font-light">
              Developing physical asset designs that transform high-demand retro consumer preferences into high-grossing commercial footprints combining modern operating systems with legacy aesthetics.
            </p>
            <div className="mt-6 pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-mono text-amber-700">
              <div>VELOCITY: <span className="text-neutral-300 font-bold">SCALABLE</span></div>
              <div>MARKET: <span className="text-neutral-300 font-bold">CONSUMER</span></div>
            </div>
          </div>

          {/* Module 02 */}
          <div className="group p-6 rounded-lg bg-neutral-950 border border-amber-500/10 hover:border-amber-500/30 transition duration-500 shadow-xl">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold tracking-wide
                bg-[linear-gradient(135deg,#FFF7AD_0%,#FDAE38_25%,#B87C14_45%,#FFF7AD_55%,#F0A928_70%,#784A00_100%)] 
                bg-clip-text text-transparent">
                Legacy Product Sourcing
              </h3>
              <span className="text-[10px] font-mono text-amber-600">SYS_ANALYSIS</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400 font-light">
              Securing historical trademark spaces and custom consumer goods that command exceptional price elasticity and consistent organic loyalty across multi-channel distribution networks.
            </p>
            <div className="mt-6 pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-mono text-amber-700">
              <div>LEVERAGE: <span className="text-neutral-300 font-bold">0.00% DEBT</span></div>
              <div>AUDIT: <span className="text-neutral-300 font-bold">COMPLIANT</span></div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-neutral-900 text-xs text-center font-mono
          bg-[linear-gradient(135deg,#FFF7AD_0%,#FDAE38_50%,#B87C14_100%)] 
          bg-clip-text text-transparent">
        © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
