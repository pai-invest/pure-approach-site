import React from 'react';

export default function PureApexPulse() {
  // Ultra-stable inline styles to ensure specialized metallic gradients map perfectly across all devices
  const goldGradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #FFFDF0 0%, #FFD700 25%, #B8860B 45%, #FFFDF0 55%, #DAA520 70%, #8B6508 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const silverGradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 25%, #A0A0A0 50%, #D0D0D0 75%, #F0F0F0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const pureApexFontStyle = {
    fontFamily: "'Cinzel', Georgia, Garamond, serif",
    fontWeight: 700,
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-neutral-800 font-sans selection:bg-neutral-800 selection:text-white pb-24">
      
      {/* Light Gray Header with Centered Logo */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center border-b border-neutral-300 gap-8">
        {/* Centered Logo Frame on a Frosted Panel */}
        <div className="bg-white/40 border border-white/60 p-6 rounded-lg backdrop-blur-sm shadow-inner flex items-center justify-center shrink-0">
          <img 
            src="/apexlogo.png" 
            alt="Pure Apex Pulse Logo" 
            className="h-32 sm:h-40 w-auto object-contain"
          />
        </div>

        {/* Unified Navigation Row */}
        <div className="w-full flex justify-between items-center mt-6">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-neutral-600 hover:text-neutral-900 transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded border border-neutral-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]"></span>
            <span className="text-neutral-500 font-bold uppercase">Digital Operations // HUB</span>
          </div>
        </div>
      </header>

      {/* Main Framework Content with Gold and Silver Blended Theme */}
      <main className="max-w-5xl mx-auto px-6 pt-20">
        
        {/* Manifest Header: Gold-on-Gray with Silver Subtext */}
        <div className="max-w-4xl">
          <span className="text-xs font-bold tracking-[0.4em] text-neutral-500 uppercase font-mono block mb-2">
            Digital Asset Management // Division 02
          </span>
          {/* Main Title: 24ct Gold Gradient */}
          <h1 className="text-4xl md:text-6xl uppercase tracking-wider filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)] mb-4" style={{...goldGradientStyle, ...pureApexFontStyle}}>
            Pure Apex Pulse
          </h1>
          {/* Company Name: Polished Silver Gradient */}
          <p className="text-sm md:text-base font-mono tracking-widest uppercase border-b border-neutral-300 pb-8 font-medium" style={silverGradientStyle}>
            Pure Approach Investments (Pty) Ltd.
          </p>
          
          {/* Division Introduction */}
          <div className="mt-12 space-y-6 text-xl md:text-2xl leading-relaxed text-neutral-700 font-light">
            <p>
              Welcome to the specialized digital acquisition vector of Pure Approach Investments. Division 02 functions as our deliberate engine for technological scaling, designed to bridge modern programmatic assets with stable, institutional-grade commercial viability.
            </p>
          </div>
          
          {/* Main Statement (Large Scaled Silver Gradient) */}
          <p className="mt-10 text-2xl md:text-3xl leading-relaxed max-w-3xl font-medium filter drop-shadow-[0_4px_5px_rgba(0,0,0,0.1)]" style={silverGradientStyle}>
            Focused on the strategic acquisition, optimization, and scaling of high-performing web properties, custom software utilities, and high-margin programmatic content engines.
          </p>
        </div>

        {/* Operational Modules Grid (Silver-Gray Boxes with Gold Details) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Module 01: Portfolio Strategy */}
          <div className="group p-8 rounded-lg bg-white border border-neutral-200/60 shadow-lg flex flex-col justify-between hover:border-neutral-300 transition duration-500">
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide" style={pureApexFontStyle}>
                  Web Property Portfolio
                </h3>
                <span className="text-[10px] font-mono text-neutral-400">STAGE_ACQUISITION</span>
              </div>
              <p className="text-lg leading-relaxed text-neutral-700 font-normal">
                Executing a disciplined acquisition framework for high-demand digital storefronts and programmatic assets that command significant demographic brand equity and multi-channel revenue distribution.
              </p>
            </div>
            {/* Expanded details below */}
            <div className="mt-8 pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4 text-xs font-mono text-neutral-500">
              <div>VELOCITY: <span className="text-neutral-900 font-bold">SCALABLE</span></div>
              <div>MARKET: <span className="text-neutral-900 font-bold">CONSUMER</span></div>
            </div>
          </div>

          {/* Module 02: Software Optimization */}
          <div className="group p-8 rounded-lg bg-white border border-neutral-200/60 shadow-lg flex flex-col justify-between hover:border-neutral-300 transition duration-500">
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide" style={pureApexFontStyle}>
                  Software Utility Nodes
                </h3>
                <span className="text-[10px] font-mono text-neutral-400">SYS_OPTIMIZATION</span>
              </div>
              <p className="text-lg leading-relaxed text-neutral-700 font-normal">
                Sourcing and optimizing custom software utilities and API-driven services that solve critical functional needs with minimal operating friction and maximum structural pricing elasticity.
              </p>
            </div>
            {/* Expanded details below */}
            <div className="mt-8 pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4 text-xs font-mono text-neutral-500">
              <div>VELOCITY: <span className="text-neutral-900 font-bold">AUTOMATED</span></div>
              <div>MARKET: <span className="text-neutral-900 font-bold">B2B/ENTERPRISE</span></div>
            </div>
          </div>

        </div>
      </main>

      {/* Silver Footer on Light Gray Canvas */}
      <footer className="max-w-6xl mx-auto px-6 py-16 mt-24 border-t border-neutral-300 text-[10px] text-center font-mono tracking-[0.3em] font-medium uppercase" style={silverGradientStyle}>
        © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. PURE APEX PULSE DIVISION.
      </footer>
    </div>
  );
}
