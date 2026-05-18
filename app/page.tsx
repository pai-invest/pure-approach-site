import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060604] text-white font-sans selection:bg-neutral-800 selection:text-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center border-b border-neutral-900/50">
        <a href="/" className="flex items-center gap-4 hover:opacity-90 transition justify-center sm:justify-start">
          <div className="bg-[#f4f6f2] p-2 sm:p-2.5 border border-neutral-200 shadow-md flex items-center justify-center shrink-0">
            {/* Main Header Logo Scaled Up slightly to balance the new grid */}
            <img 
              src="/pailogo2.png" 
              alt="Pure Approach Investments Logo" 
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-neutral-100 uppercase whitespace-nowrap">
            Pure Approach Investments
          </span>
        </a>
        <nav className="flex space-x-6 text-xs tracking-wider text-neutral-400 justify-center sm:justify-end">
          <a href="#divisions" className="hover:text-white transition">DIVISIONS</a>
          <a href="#framework" className="hover:text-white transition">FRAMEWORK</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
          Orchestrating High-Growth Capital & Scalable Digital Architecture.
        </h1>
        <p className="mt-6 text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl">
          Pure Approach Investments is a private holding entity dedicated to systematic wealth accumulation. We deploy capital across a concentrated portfolio of high-performing equity strategies, automated digital assets, and high-margin commerce brands.
        </p>
      </main>

      {/* Portfolio Ecosystem */}
      <section id="divisions" className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-900/50">
        <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase mb-12">
          Portfolio Ecosystem
        </h2>
        
        {/* Responsive Grid for 4 Balanced Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Card 01: Pi-Metrix Equities */}
          <a href="/capital" className="group block p-6 rounded-lg bg-neutral-950 border border-neutral-900/60 transition duration-300 hover:border-neutral-700 hover:bg-neutral-900/40 flex flex-col justify-between">
            <div>
              {/* Scaled to h-20 to match Legacy */}
              <div className="h-20 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-[#060604] border border-neutral-900/30 px-3 py-2">
                <img 
                  src="/pmelogo.png" 
                  alt="Pi-Metrix Equities Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-neutral-100 group-hover:text-white">Pi-Metrix Equities</h3>
                <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400 transition">→</span>
              </div>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                Operating as a pure proprietary desk deploying corporate capital through a systematic, metric-driven framework optimized for infinite compounding and capital preservation.
              </p>
            </div>
            <div className="mt-8 text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition">ENGAGE DESK</div>
          </a>
          
          {/* Card 02: Pure Apex Pulse - Digital Assets */}
          <a href="/digital" className="group block p-6 rounded-lg bg-neutral-950 border border-neutral-900/60 transition duration-300 hover:border-neutral-700 hover:bg-neutral-900/40 flex flex-col justify-between">
            <div>
              {/* Scaled to h-20 to match Legacy */}
              <div className="h-20 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-[#060604] border border-neutral-900/30 px-3 py-2">
                <img 
                  src="/apexlogo.png" 
                  alt="Pure Apex Pulse Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-neutral-100 group-hover:text-white">Pure Apex Pulse</h3>
                <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400 transition">→</span>
              </div>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                Focused on the optimization, acquisition, and scaling of high-margin web properties, custom software utilities, and programmatic content engines.
              </p>
            </div>
            <div className="mt-8 text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition">MONITOR PULSE</div>
          </a>

          {/* Card 03: Enterprise Commerce (Primero Collection) */}
          <a href="/commerce" className="group block p-6 rounded-lg bg-neutral-950 border border-neutral-900/60 transition duration-300 hover:border-neutral-700 hover:bg-neutral-900/40 flex flex-col justify-between">
            <div>
              {/* Scaled to h-20 to match Legacy */}
              <div className="h-20 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-[#060604] border border-neutral-900/30 px-3 py-2">
                <img 
                  src="/primerologo2.png" 
                  alt="Primero Collection Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-neutral-100 group-hover:text-white">Enterprise Commerce</h3>
                <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400 transition">→</span>
              </div>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                Sourcing and building high-end physical products and bespoke luxury collections backed by streamlined global distribution logistics.
              </p>
            </div>
            <div className="mt-8 text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition">EXPLORE PRIMERO</div>
          </a>

          {/* Card 04: Frosted Nostalgia */}
          <a href="/frosted" className="group block p-6 rounded-lg bg-neutral-950 border border-neutral-900/60 transition duration-300 hover:border-amber-500/30 hover:bg-amber-950/5 flex flex-col justify-between">
            <div>
              {/* Scaled to h-20 to match Legacy */}
              <div className="h-20 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-black border border-neutral-900/40 px-3 py-2">
                <img 
                  src="/frostedlogo.jpg" 
                  alt="Frosted Nostalgia Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-neutral-100 group-hover:text-amber-400 transition">Frosted Nostalgia</h3>
                <span className="text-xs font-mono text-neutral-600 group-hover:text-amber-400 transition">→</span>
              </div>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                An artisanal, home-based custom cake studio designing luxury bespoke confectionery art, signature recipes, and handcrafted milestone cakes since 2014.
              </p>
            </div>
            <div className="mt-8 text-xs font-mono text-neutral-500 group-hover:text-amber-400 transition">VIEW ARTISTRY</div>
          </a>

        </div>

        {/* The 5th Division: Full-Width Foundation Capstone */}
        <a href="/legacy" className="group block w-full p-8 md:p-10 rounded-lg bg-gradient-to-br from-[#050f0a] to-neutral-950 border border-[#D4AF37]/30 transition duration-500 hover:border-[#D4AF37]/60 shadow-lg hover:shadow-blue-900/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-6">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-4">
              {/* Legacy Logo Container (Already h-20) */}
              <div className="h-20 w-auto flex items-center justify-center overflow-hidden rounded bg-white/5 border border-[#3B82F6]/30 px-3 py-2">
                <img 
                  src="/legacylogo.png" 
                  alt="Pure Legacy Foundation Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#D4AF37] transition font-serif">Pure Legacy Foundation</h3>
                <span className="text-xs font-mono tracking-widest text-[#60A5FA] mt-1 block">SOCIAL RESPONSIBILITY DIVISION</span>
              </div>
            </div>
            <p className="mt-4 text-sm md:text-base text-blue-50/70 leading-relaxed max-w-3xl">
              Transforming corporate success into sustainable, real-world impact. We approach philanthropy with the same strategic precision that drives our investment operations, bypassing institutional layers to direct capital toward critical community needs and restoration.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 text-sm font-mono text-[#D4AF37] group-hover:text-yellow-200 transition">
            <span>VIEW IMPACT</span>
            <span className="text-lg">→</span>
          </div>
        </a>

      </section>

      {/* The Framework */}
      <section id="framework" className="max-w-5xl mx-auto px-6 py-16 border-t border-neutral-900/50">
        <div className="max-w-3xl">
          <h2 className="text-xs font-bold tracking-wildest text-neutral-500 uppercase mb-6">
            The Pure Framework
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-100 leading-snug">
            Built on absolute structural discipline.
          </h3>
          <p className="mt-4 text-sm md:text-base text-neutral-400 leading-relaxed">
            We believe that sustainable wealth accumulation is built on transparency, structural stability, and real, asset-backed value. Every operational division operates under an uncompromised risk framework:
          </p>
          <ul className="mt-8 space-y-4 text-sm text-neutral-400">
            <li className="flex items-start">
              <span className="text-neutral-500 mr-3 font-mono">[01]</span>
              <span><strong className="text-neutral-200">Zero Debt Leverage:</strong> Funded entirely by organic equity capital to eliminate systemic risk.</span>
            </li>
            <li className="flex items-start">
              <span className="text-neutral-500 mr-3 font-mono">[02]</span>
              <span><strong className="text-neutral-200">Asset-Backed Focus:</strong> Prioritizing enterprises exchanging clear, tangible utility for revenue.</span>
            </li>
            <li className="flex items-start">
              <span className="text-neutral-500 mr-3 font-mono">[03]</span>
              <span><strong className="text-neutral-200">Ethical Frameworks:</strong> Completely aligned with clean risk-sharing principles, fully independent of conventional speculative architectures.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 mt-12 border-t border-neutral-900/50 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 space-y-4 md:space-y-0">
        <div>
          © 2026 Pure Approach Investments (Pty) Ltd. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="/privacy" className="hover:text-neutral-400 transition">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
