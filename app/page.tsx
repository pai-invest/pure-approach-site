import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060604] text-white font-sans selection:bg-neutral-800 selection:text-white">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center border-b border-neutral-900/50">
        <a href="/" className="flex items-center gap-4 hover:opacity-90 transition justify-center sm:justify-start">
          <div className="bg-[#f4f6f2] p-2 sm:p-2.5 border border-neutral-200 shadow-md flex items-center justify-center shrink-0">
            <img 
              src="/pailogo2.png" 
              alt="Pure Approach Investments Logo" 
              className="h-12 sm:h-16 w-auto object-contain"
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
      <section id="divisions" className="max-w-5xl mx-auto px-6 py-16 border-t border-neutral-900/50">
        <h2 className="text-xs font-bold tracking-wildest text-neutral-500 uppercase mb-12">
          Portfolio Ecosystem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 01: Strategic Capital */}
          <a href="/capital" className="group block p-6 rounded-lg bg-neutral-950 border border-neutral-900/60 transition duration-300 hover:border-neutral-700 hover:bg-neutral-900/40 flex flex-col justify-between">
            <div>
              <div className="h-12 w-full mb-6 flex items-center text-neutral-600 font-mono text-[10px] tracking-widest uppercase border border-neutral-900/40 bg-neutral-950 rounded px-3">
                <img 
                  src="/pmelogo.png" 
                  alt="Pure Apex Pulse Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-neutral-100 group-hover:text-white">Strategic Capital</h3>
                <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400 transition">→</span>
              </div>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Utilizing a disciplined barbell strategy to protect foundational capital while aggressively capturing upside momentum in high-growth global equity markets.
              </p>
            </div>
            <div className="mt-8 text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition">VIEW FRAMEWORK</div>
          </a>

          {/* Card 02: Pure Apex Pulse - Digital Assets */}
          <a href="/digital" className="group block p-6 rounded-lg bg-neutral-950 border border-neutral-900/60 transition duration-300 hover:border-neutral-700 hover:bg-neutral-900/40 flex flex-col justify-between">
            <div>
              <div className="h-12 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-[#060604] border border-neutral-900/30 px-2 py-1">
                <img 
                  src="/apexlogo.png" 
                  alt="Pure Apex Pulse Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-neutral-100 group-hover:text-white">Pure Apex Pulse - Digital Assets</h3>
                <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400 transition">→</span>
              </div>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Focused on the optimization, acquisition, and scaling of high-margin web properties, custom software utilities, and programmatic content engines.
              </p>
            </div>
            <div className="mt-8 text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition">MONITOR PULSE</div>
          </a>

          {/* Card 03: Enterprise Commerce (Primero Collection) */}
          <a href="/commerce" className="group block p-6 rounded-lg bg-neutral-950 border border-neutral-900/60 transition duration-300 hover:border-neutral-700 hover:bg-neutral-900/40 flex flex-col justify-between">
            <div>
              {/* Live Division Logo: Primero Collection */}
              <div className="h-12 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-[#060604] border border-neutral-900/30 px-2 py-1">
                <img 
                  src="/primerologo2.png" 
                  alt="Primero Collection Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-neutral-100 group-hover:text-white">Enterprise Commerce</h3>
                <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400 transition">→</span>
              </div>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Sourcing and building high-end physical products and bespoke luxury collections backed by streamlined global distribution logistics.
              </p>
            </div>
            <div className="mt-8 text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition">EXPLORE PRIMERO</div>
          </a>

        </div>
      </section>

      {/* The Framework */}
      <section id="framework" className="max-w-5xl mx-auto px-6 py-16 border-t border-neutral-900/50">
        <div className="max-w-3xl">
          <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase mb-6">
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
              <span className="text-neutral-500 mr-3 font-mono">1.</span>
              <span><strong className="text-neutral-200">Zero Debt Leverage:</strong> Funded entirely by organic equity capital to eliminate systemic risk.</span>
            </li>
            <li className="flex items-start">
              <span className="text-neutral-500 mr-3 font-mono">2.</span>
              <span><strong className="text-neutral-200">Asset-Backed Focus:</strong> Prioritizing enterprises exchanging clear, tangible utility for revenue.</span>
            </li>
            <li className="flex items-start">
              <span className="text-neutral-500 mr-3 font-mono">3.</span>
              <span><strong className="text-neutral-200">Ethical Frameworks:</strong> Completely aligned with clean risk-sharing principles, fully independent of conventional speculative architectures.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 mt-12 border-t border-neutral-900/50 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 space-y-4 md:space-y-0">
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
     
