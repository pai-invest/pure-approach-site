 import React from 'react';

export default function FrostedDivision() {
  // Bulletproof styles that bypass Tailwind parsing limitations
  const goldGradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #FFFDF0 0%, #FFD700 25%, #B8860B 45%, #FFFDF0 55%, #DAA520 70%, #8B6508 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const whimsicalFontStyle = {
    fontFamily: "'Cinzel Decorative', 'Dancing Script', Georgia, Garamond, serif",
  };

  return (
    <div className="min-h-screen bg-black text-[#FFD700] selection:bg-amber-950 selection:text-amber-200" style={whimsicalFontStyle}>
      
      {/* Header Area (Unified Sizing & Alignment) */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#FFD700]/20 gap-6">
        
        {/* Seamless Logo Integration */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/frostedlogo.jpg" 
            alt="Frosted Nostalgia Logo" 
            className="h-28 sm:h-32 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          />
        </div>

        {/* Dynamic sub-navigation row */}
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-[#FFD700] hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded border border-[#FFD700]/20">
            <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_10px_#FFD700]"></span>
            <span className="text-[#FFD700] font-bold font-mono">RETRO // MERCHANDISE_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero & Introduction */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-4xl">
          <span className="text-xs font-bold tracking-[0.4em] text-[#B8860B] uppercase font-mono block mb-2">
            Heritage Assets // Division 04
          </span>
          
          {/* Custom 3D Shiny 24ct Gold Embossed Header Layout */}
          <h1 className="mt-4 flex flex-col md:flex-row items-baseline gap-2 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
            <span className="text-5xl md:text-7xl font-light tracking-tight" style={goldGradientStyle}>
              FROSTED
            </span>
            <span className="text-4xl md:text-5xl font-black tracking-widest uppercase py-2" style={goldGradientStyle}>
              NOSTALGIA
            </span>
          </h1>

          {/* New Division Introduction Block */}
          <div className="mt-10 border-l-2 border-[#FFD700]/30 pl-6 max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold tracking-wide text-[#FFD700] mb-3">
              Introduction: The Treasury of Time
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-[#FFD700]/90 font-light">
              Welcome to the specialized curation vector of Pure Approach Investments. Division 04 stands as our deliberate celebration of heritage, engineered to bridge generational sentiments with high-yielding commercial viability. We treat history not merely as a memory, but as a premium asset class.
            </p>
          </div>
          
          {/* Main Summary Paragraph (Scaled up to text-xl / text-2xl) */}
          <p className="mt-8 text-xl md:text-2xl leading-relaxed max-w-3xl font-medium filter drop-shadow-[0_4px_5px_rgba(0,0,0,0.6)]" style={goldGradientStyle}>
            Capitalizing on high-margin cultural resurgence, premium retro-modern brand physical spaces, and curated legacy consumer products. Built on absolute financial structural stability, optimized operational procurement, and unmatched demographic brand equity.
          </p>
        </div>

        {/* Operational Modules Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Module 01 */}
          <div className="group p-8 rounded-lg bg-neutral-950 border border-[#FFD700]/20 hover:border-[#FFD700]/50 transition duration-500 shadow-[0_0_15px_rgba(255,215,0,0.02)]">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-bold tracking-wide" style={goldGradientStyle}>
                Premium Concept Formats
              </h3>
              <span className="text-[10px] font-mono text-[#B8860B]">STAGE_ALPHA</span>
            </div>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[#FFD700]/80 font-normal">
              Developing physical asset designs that transform high-demand retro consumer preferences into high-grossing commercial footprints combining modern operating systems with legacy aesthetics.
            </p>
            <div className="mt-8 pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-mono text-[#B8860B]">
              <div>VELOCITY: <span className="text-[#FFD700] font-bold">SCALABLE</span></div>
              <div>MARKET: <span className="text-[#FFD700] font-bold">CONSUMER</span></div>
            </div>
          </div>

          {/* Module 02 */}
          <div className="group p-8 rounded-lg bg-neutral-950 border border-[#FFD700]/20 hover:border-[#FFD700]/50 transition duration-500 shadow-[0_0_15px_rgba(255,215,0,0.02)]">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-bold tracking-wide" style={goldGradientStyle}>
                Legacy Product Sourcing
              </h3>
              <span className="text-[10px] font-mono text-[#B8860B]">SYS_ANALYSIS</span>
            </div>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[#FFD700]/80 font-normal">
              Securing historical trademark spaces and custom consumer goods that command exceptional price elasticity and consistent organic loyalty across multi-channel distribution networks.
            </p>
            <div className="mt-8 pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-mono text-[#B8860B]">
              <div>LEVERAGE: <span className="text-[#FFD700] font-bold">0.00% DEBT</span></div>
              <div>AUDIT: <span className="text-[#FFD700] font-bold">COMPLIANT</span></div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-neutral-900 text-xs text-center font-mono" style={goldGradientStyle}>
        © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
