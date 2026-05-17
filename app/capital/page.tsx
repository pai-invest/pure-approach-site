import React from 'react';

export default function PiMetrixEquities() {
  // Ultra-stable inline styles to ensure rich metallic gradients map perfectly across all mobile devices
  const goldGradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #FFFDF0 0%, #FFD700 25%, #B8860B 45%, #FFFDF0 55%, #DAA520 70%, #8B6508 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const highContrastGold = {
    color: '#FFD700'
  };

  return (
    <div className="min-h-screen bg-[#1c0202] text-neutral-300 font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* Institutional Top Navigation */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#FFD700]/10 gap-6">
        {/* Seamless Branded Image Node Wrapper */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/pmelogo.png" 
            alt="Pi-Metrix Equities Logo" 
            className="h-28 sm:h-32 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.15)]"
          />
        </div>

        <div className="w-full flex justify-between items-center mt-4">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-[#FFD700] hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-black px-3 py-1.5 rounded border border-[#FFD700]/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            <span className="text-neutral-400 font-bold">PROP_DESK // LIVE_NODE</span>
          </div>
        </div>
      </header>

      {/* Main Framework Content */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        
        {/* Manifest Header */}
        <div className="max-w-4xl">
          <span className="text-xs font-bold tracking-[0.4em] text-[#B8860B] uppercase font-mono block mb-2">
            Global Treasury Management // Division 01
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]" style={goldGradientStyle}>
            Pi-Metrix Equities
          </h1>
          <p className="mt-4 text-sm md:text-base font-mono tracking-widest uppercase border-b border-[#FFD700]/10 pb-6" style={highContrastGold}>
            Capital Allocation. Quantitative Discipline. Infinite Compounding.
          </p>
          
          <div className="mt-12 space-y-6 text-lg md:text-xl leading-relaxed text-neutral-200 font-light">
            <p>
              <strong className="font-semibold" style={highContrastGold}>Pi-Metrix Equities (PME)</strong> functions as the proprietary trading and global treasury management division of Pure Approach Investments (Pty) Ltd. Engineered to navigate highly liquid global public markets, PME deploys corporate capital through a systematic, metric-driven framework designed to extract alpha from structural market momentum while prioritizing absolute capital preservation.
            </p>
            <p>
              As a pure proprietary desk, we do not manage external client capital. Instead, we trade exclusively on our own balance sheet, allowing us to execute high-conviction strategies with clinical efficiency, agility, and absolute operational independence.
            </p>
          </div>
        </div>

        {/* Philosophy Vector Section */}
        <section className="mt-24 pt-12 border-t border-[#FFD700]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#B8860B] uppercase font-mono">
                The Core Philosophy
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mt-2" style={goldGradientStyle}>
                Mathematical Precision
              </h3>
              <p className="mt-4 text-sm md:text-base text-neutral-400 leading-relaxed">
                The name Pi-Metrix is derived from the mathematical constant <span className="font-serif italic text-[#FFD700] text-lg font-bold">π</span>—an infinite, unwavering, and foundational sequence. This architecture dictates our entire approach to the markets.
              </p>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div className="p-8 rounded-lg bg-black/40 border border-[#FFD700]/10 shadow-xl">
                <h4 className="text-lg font-bold" style={highContrastGold}>Infinite Compounding</h4>
                <p className="mt-3 text-sm md:text-base text-neutral-300 leading-relaxed font-light">
                  We view capital allocation not as a series of speculative bets, but as an endless compounding engine. Profits are systematically recycled, scaled, and insulated to build long-term corporate wealth.
                </p>
              </div>

              <div className="p-8 rounded-lg bg-black/40 border border-[#FFD700]/10 shadow-xl">
                <h4 className="text-lg font-bold" style={highContrastGold}>Metric-Driven Execution</h4>
                <p className="mt-3 text-sm md:text-base text-neutral-300 leading-relaxed font-light">
                  Human emotion is entirely eliminated from our trading desks. Every entry, position adjustment, and exit is governed by strict, pre-defined quantitative metrics. If an asset does not fit the exact parameters of our risk models, we do not engage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Execution Grid */}
        <section className="mt-24 pt-12 border-t border-[#FFD700]/10">
          <h2 className="text-xs font-bold tracking-[0.3em] text-[#B8860B] uppercase font-mono mb-10">
            Strategy & Execution Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-lg bg-black/50 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition duration-300 shadow-md">
              <div className="text-xs font-mono text-[#B8860B] mb-4">[STRAT_01]</div>
              <h3 className="text-base font-bold mb-2" style={highContrastGold}>High-Conviction Global Equities</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                We focus deeply on market-leading single stocks, primarily targeting the global semiconductor sector and cutting-edge technology ecosystems. We target industries with high pricing power and structural tailwinds.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-black/50 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition duration-300 shadow-md">
              <div className="text-xs font-mono text-[#B8860B] mb-4">[STRAT_02]</div>
              <h3 className="text-base font-bold mb-2" style={highContrastGold}>The Barbell Risk Framework</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                Our capital deployment relies heavily on an asymmetric risk model. We structurally cap our maximum downside through automated trailing risk parameters while leaving our upside open to capture significant, volatile market expansions.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-black/50 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition duration-300 shadow-md">
              <div className="text-xs font-mono text-[#B8860B] mb-4">[STRAT_03]</div>
              <h3 className="text-base font-bold mb-2" style={highContrastGold}>&quot;Ghost Ship&quot; Infrastructure</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                Utilizing state-of-the-art institutional brokerage architecture and real-time cloud accounting integration, our trading desk runs as a streamlined, low-friction digital engine. Every transaction is mapped seamlessly to ensure institutional-grade compliance and structural precision.
              </p>
            </div>

          </div>
        </section>

        {/* Corporate Mandate Quote */}
        <section className="mt-24 p-8 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center max-w-3xl mx-auto shadow-2xl backdrop-blur-sm">
          <p className="text-lg md:text-xl italic text-neutral-100 font-light leading-relaxed">
            &quot;Pi-Metrix Equities operates at the intersection of mathematical consistency and aggressive market execution. We do not chase market noise; we trade the metrics.&quot;
          </p>
          <div className="mt-4 text-[10px] font-mono tracking-widest text-[#B8860B] uppercase">
            — The Corporate Mandate
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-[#FFD700]/10 text-xs text-center font-mono" style={goldGradientStyle}>
        © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. PI-METRIX EQUITIES DIVISION. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
