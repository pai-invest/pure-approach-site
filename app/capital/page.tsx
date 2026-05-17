import React from 'react';

export default function PiMetrixEquities() {
  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans selection:bg-neutral-800 selection:text-white">
      
      {/* Institutional Top Navigation */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-neutral-900 gap-6">
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/pmelogo.png" 
            alt="Pi-Metrix Equities Logo" 
            className="h-28 sm:h-32 w-auto object-contain"
          />
        </div>

        <div className="w-full flex justify-between items-center mt-4">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-neutral-400 hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-neutral-400 font-bold">PROP_DESK // LIVE_NODE</span>
          </div>
        </div>
      </header>

      {/* Main Framework Content */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        
        {/* Manifest Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.4em] text-neutral-500 uppercase font-mono block mb-2">
            Global Treasury Management // Division 01
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            Pi-Metrix Equities
          </h1>
          <p className="mt-4 text-sm font-mono tracking-widest text-emerald-400 uppercase">
            Capital Allocation. Quantitative Discipline. Infinite Compounding.
          </p>
          
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-neutral-400 font-light">
            Pi-Metrix Equities (PME) functions as the proprietary trading and global treasury management division of Pure Approach Investments (Pty) Ltd. Engineered to navigate highly liquid global public markets, PME deploys corporate capital through a systematic, metric-driven framework designed to extract alpha from structural market momentum while prioritizing absolute capital preservation.
          </p>
          
          <p className="mt-4 text-lg md:text-xl leading-relaxed text-neutral-400 font-light">
            As a pure proprietary desk, we do not manage external client capital. Instead, we trade exclusively on our own balance sheet, allowing us to execute high-conviction strategies with clinical efficiency, agility, and absolute operational independence.
          </p>
        </div>

        {/* Philosophy Vector Section */}
        <section className="mt-20 pt-12 border-t border-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase font-mono">
                The Core Philosophy
              </h2>
              <h3 className="text-2xl font-bold text-white mt-2">
                Mathematical Precision
              </h3>
              <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                The name Pi-Metrix is derived from the mathematical constant <span className="font-serif italic text-white text-base">π</span>—an infinite, unwavering, and foundational sequence. This architecture dictates our entire approach to the bourses.
              </p>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div className="p-6 rounded bg-neutral-950/50 border border-neutral-900">
                <h4 className="text-base font-bold text-neutral-200">Infinite Compounding</h4>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  We view capital allocation not as a series of speculative bets, but as an endless compounding engine. Profits are systematically recycled, scaled, and insulated to build long-term corporate wealth.
                </p>
              </div>

              <div className="p-6 rounded bg-neutral-950/50 border border-neutral-900">
                <h4 className="text-base font-bold text-neutral-200">Metric-Driven Execution</h4>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  Human emotion is entirely eliminated from our trading desks. Every entry, position adjustment, and exit is governed by strict, pre-defined quantitative metrics. If an asset does not fit the exact parameters of our risk models, we do not engage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Execution Grid */}
        <section className="mt-20 pt-12 border-t border-neutral-900">
          <h2 className="text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase font-mono mb-10">
            Strategy & Execution Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded bg-neutral-950 border border-neutral-900">
              <div className="text-xs font-mono text-neutral-600 mb-4">[STRAT_01]</div>
              <h3 className="text-base font-bold text-white">High-Conviction Global Equities</h3>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                We focus deeply on market-leading single stocks, primarily targeting the global semiconductor sector and cutting-edge technology ecosystems. We target industries with high pricing power and structural tailwinds.
              </p>
            </div>

            <div className="p-6 rounded bg-neutral-950 border border-neutral-900">
              <div className="text-xs font-mono text-neutral-600 mb-4">[STRAT_02]</div>
              <h3 className="text-base font-bold text-white">The Barbell Risk Framework</h3>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                Our capital deployment relies heavily on an asymmetric risk model. We structurally cap our maximum downside through automated trailing risk parameters while leaving our upside open to capture significant, volatile market expansions.
              </p>
            </div>

            <div className="p-6 rounded bg-neutral-950 border border-neutral-900">
              <div className="text-xs font-mono text-neutral-600 mb-4">[STRAT_03]</div>
              <h3 className="text-base font-bold text-white">"Ghost Ship" Infrastructure</h3>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                Utilizing state-of-the-art institutional brokerage architecture and real-time cloud accounting integration, our trading desk runs as a streamlined, low-friction digital engine ensuring institutional-grade compliance and structural precision.
              </p>
            </div>

          </div>
        </section>

        {/* Corporate Mandate Quote */}
        <section className="mt-20 p-8 rounded border border-neutral-900 bg-neutral-950/30 text-center max-w-3xl mx-auto">
          <p className="text-base md:text-lg italic text-neutral-200 font-light">
            "Pi-Metrix Equities operates at the intersection of mathematical consistency and aggressive market execution. We do not chase market noise; we trade the metrics."
          </p>
          <div className="mt-4 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            — The Corporate Mandate
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-neutral-900 text-xs text-center font-mono text-neutral-600">
        © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. PI-METRIX EQUITIES DIVISION. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
