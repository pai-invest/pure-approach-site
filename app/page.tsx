import React from 'react';

export default function Home() {
  // Brand color palette mapped directly from the corporate mark
  const brandColors = {
    background: '#F5F6F3',
    slate: '#203340',
    teal: '#426F64',
    silver: '#B9BBB7'
  };

  const corporateFont = {
    fontFamily: "'Montserrat', 'Inter', 'Helvetica Neue', sans-serif",
  };

  return (
    <div className="min-h-screen selection:bg-[#426F64]/20 selection:text-[#203340] pb-24" style={{ backgroundColor: brandColors.background, color: brandColors.slate, ...corporateFont }}>
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center border-b border-[#B9BBB7]/40">
        <a href="/" className="flex items-center gap-4 hover:opacity-80 transition justify-center sm:justify-start">
          <div className="bg-white p-2.5 border border-[#B9BBB7]/50 shadow-sm flex items-center justify-center shrink-0 rounded">
            <img 
              src="/pailogo2.png" 
              alt="Pure Approach Investments Logo" 
              className="h-16 sm:h-20 w-auto object-contain object-center"
            />
          </div>
          <span className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: brandColors.slate }}>
            Pure Approach Investments
          </span>
        </a>
        <nav className="flex space-x-8 text-xs tracking-widest justify-center sm:justify-end font-bold uppercase" style={{ color: '#6A7C87' }}>
          <a href="#divisions" className="hover:text-[#426F64] transition duration-300">DIVISIONS</a>
          <a href="#framework" className="hover:text-[#426F64] transition duration-300">FRAMEWORK</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center sm:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight uppercase" style={{ color: brandColors.slate }}>
          Orchestrating High-Growth Capital & Scalable Digital Architecture.
        </h1>
        <p className="mt-6 text-base md:text-lg leading-relaxed max-w-3xl font-medium" style={{ color: '#5A6C77' }}>
          Pure Approach Investments is a private holding entity dedicated to systematic wealth accumulation. We deploy capital across a concentrated portfolio of high-performing equity strategies, automated digital assets, artisanal ventures, and targeted social impact frameworks.
        </p>
      </main>

      {/* Portfolio Ecosystem */}
      <section id="divisions" className="max-w-7xl mx-auto px-6 py-16 border-t border-[#B9BBB7]/40">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-12" style={{ color: brandColors.teal }}>
          Portfolio Ecosystem
        </h2>
        
        {/* Grid for Cards 01 - 04 with Full-Bleed Logo Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          
          {/* Card 01: Pi-Metrix Equities */}
          <a href="/capital" className="group block p-6 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="h-24 w-full mb-6 flex items-center justify-center overflow-hidden bg-white rounded-lg border border-[#B9BBB7]/30 p-0 shadow-sm">
                <img 
                  src="/pmelogo.png" 
                  alt="Pi-Metrix Equities Logo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-bold tracking-wide transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>Pi-Metrix Equities</h3>
                <span className="text-xs font-mono text-neutral-400 group-hover:text-[#426F64] transition">→</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed font-medium" style={{ color: '#6A7C87' }}>
                Operating as a pure proprietary desk deploying corporate capital through a systematic, metric-driven framework optimized for infinite compounding and capital preservation.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>ENGAGE DESK</div>
          </a>
          
          {/* Card 02: Pure Apex Pulse */}
          <a href="/digital" className="group block p-6 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="h-24 w-full mb-6 flex items-center justify-center overflow-hidden bg-white rounded-lg border border-[#B9BBB7]/30 p-0 shadow-sm">
                <img 
                  src="/apexlogo.png" 
                  alt="Pure Apex Pulse Logo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-bold tracking-wide transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>Pure Apex Pulse</h3>
                <span className="text-xs font-mono text-neutral-400 group-hover:text-[#426F64] transition">→</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed font-medium" style={{ color: '#6A7C87' }}>
                Focused on the optimization, acquisition, and scaling of high-margin web properties, custom software utilities, and programmatic content engines.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>MONITOR PULSE</div>
          </a>

          {/* Card 03: Enterprise Commerce */}
          <a href="/commerce" className="group block p-6 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="h-24 w-full mb-6 flex items-center justify-center overflow-hidden bg-white rounded-lg border border-[#B9BBB7]/30 p-0 shadow-sm">
                <img 
                  src="/primerologo2.png" 
                  alt="Primero Collection Logo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-bold tracking-wide transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>Enterprise Commerce</h3>
                <span className="text-xs font-mono text-neutral-400 group-hover:text-[#426F64] transition">→</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed font-medium" style={{ color: '#6A7C87' }}>
                Sourcing and building high-end physical products and bespoke luxury collections backed by streamlined global distribution logistics.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>EXPLORE PRIMERO</div>
          </a>

          {/* Card 04: Frosted Nostalgia */}
          <a href="/frosted" className="group block p-6 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="h-24 w-full mb-6 flex items-center justify-center overflow-hidden bg-white rounded-lg border border-[#B9BBB7]/30 p-0 shadow-sm">
                <img 
                  src="/frostedlogo.jpg" 
                  alt="Frosted Nostalgia Logo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-bold tracking-wide transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>Frosted Nostalgia</h3>
                <span className="text-xs font-mono text-neutral-400 group-hover:text-[#426F64] transition">→</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed font-medium" style={{ color: '#6A7C87' }}>
                An artisanal, home-based custom cake studio designing luxury bespoke confectionery art, signature recipes, and handcrafted milestone cakes since 2014.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>VIEW ARTISTRY</div>
          </a>

        </div>

        {/* Card 05: Full-Width Foundation Capstone with Full-Bleed Logo Box */}
        <a href="/legacy" className="group block w-full p-8 md:p-10 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-6">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
              <div className="h-24 w-full md:w-48 flex items-center justify-center overflow-hidden bg-white rounded-lg border border-[#B9BBB7]/30 p-0 shadow-sm shrink-0">
                <img 
                  src="/legacylogo.png" 
                  alt="Pure Legacy Foundation Logo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-wide transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>Pure Legacy Foundation</h3>
                <span className="text-xs font-mono tracking-widest mt-1.5 block font-bold uppercase" style={{ color: brandColors.teal }}>SOCIAL RESPONSIBILITY DIVISION</span>
              </div>
            </div>
            <p className="mt-4 text-sm md:text-base leading-relaxed max-w-3xl font-medium" style={{ color: '#5A6C77' }}>
              Transforming corporate success into sustainable, real-world impact. We approach philanthropy with the same strategic precision that drives our investment operations, bypassing institutional layers to direct capital toward critical community needs and restoration.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>
            <span>VIEW IMPACT</span>
            <span className="text-lg">→</span>
          </div>
        </a>

      </section>

      {/* The Framework */}
      <section id="framework" className="max-w-5xl mx-auto px-6 py-16 border-t border-[#B9BBB7]/40">
        <div className="max-w-3xl">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-6" style={{ color: brandColors.teal }}>
            The Pure Framework
          </h2>
          <h3 className="text-xl md:text-2xl font-extrabold leading-snug" style={{ color: brandColors.slate }}>
            Built on absolute structural discipline.
          </h3>
          <p className="mt-4 text-sm md:text-base leading-relaxed font-medium" style={{ color: '#5A6C77' }}>
            We believe that sustainable wealth accumulation is built on transparency, structural stability, and real, asset-backed value. Every operational division operates under an uncompromised risk framework:
          </p>
          <ul className="mt-8 space-y-4 text-sm font-medium">
            <li className="flex items-start p-4 rounded-xl bg-white border border-[#B9BBB7]/40 shadow-sm">
              <span className="mr-3 font-bold" style={{ color: brandColors.teal }}>[01]</span>
              <span style={{ color: '#5A6C77' }}><strong style={{ color: brandColors.slate }}>Zero Debt Leverage:</strong> Funded entirely by organic equity capital to eliminate systemic risk.</span>
            </li>
            <li className="flex items-start p-4 rounded-xl bg-white border border-[#B9BBB7]/40 shadow-sm">
              <span className="mr-3 font-bold" style={{ color: brandColors.teal }}>[02]</span>
              <span style={{ color: '#5A6C77' }}><strong style={{ color: brandColors.slate }}>Asset-Backed Focus:</strong> Prioritizing enterprises exchanging clear, tangible utility for revenue.</span>
            </li>
            <li className="flex items-start p-4 rounded-xl bg-white border border-[#B9BBB7]/40 shadow-sm">
              <span className="mr-3 font-bold" style={{ color: brandColors.teal }}>[03]</span>
              <span style={{ color: '#5A6C77' }}><strong style={{ color: brandColors.slate }}>Ethical Frameworks:</strong> Completely aligned with clean risk-sharing principles, fully independent of conventional speculative architectures.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 mt-12 border-t border-[#B9BBB7]/40 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase" style={{ color: brandColors.silver }}>
        <div>
          © 2026 Pure Approach Investments (Pty) Ltd. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-[#426F64] transition">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
