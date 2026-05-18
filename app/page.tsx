import React from 'react';

export default function Home() {
  // Brand color variables extracted directly from the uploaded logo
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
    {/* Crisp Light Background with Slate Text */}
    <div className="min-h-screen font-sans selection:bg-[#426F64]/20 selection:text-[#203340]" style={{ backgroundColor: brandColors.background, color: brandColors.slate, ...corporateFont }}>
      
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center border-b border-[#B9BBB7]/40">
        <a href="/" className="flex items-center gap-4 hover:opacity-80 transition justify-center sm:justify-start">
          <div className="bg-white p-2 sm:p-2.5 border border-[#B9BBB7]/50 shadow-sm flex items-center justify-center shrink-0 rounded">
            <img 
              src="/pailogo2.png" 
              alt="Pure Approach Investments Logo" 
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>
          <span className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: brandColors.slate }}>
            Pure Approach Investments
          </span>
        </a>
        <nav className="flex space-x-8 text-xs tracking-widest justify-center sm:justify-end font-semibold uppercase" style={{ color: '#6A7C87' }}>
          <a href="#divisions" className="hover:text-[#426F64] transition duration-300">Divisions</a>
          <a href="#framework" className="hover:text-[#426F64] transition duration-300">Framework</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center sm:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight filter drop-shadow-sm" style={{ color: brandColors.slate }}>
          Orchestrating High-Growth Capital & Scalable Digital Architecture.
        </h1>
        <p className="mt-8 text-base md:text-xl leading-relaxed max-w-3xl font-medium" style={{ color: '#5A6C77' }}>
          Pure Approach Investments is a private holding entity dedicated to systematic wealth accumulation. We deploy capital across a concentrated portfolio of high-performing equity strategies, automated digital assets, and high-margin commerce brands.
        </p>
      </main>

      {/* Portfolio Ecosystem Grid */}
      <section id="divisions" className="max-w-6xl mx-auto px-6 py-20 border-t border-[#B9BBB7]/40">
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-12" style={{ color: brandColors.teal }}>
          Portfolio Ecosystem
        </h2>
        
        {/* Responsive Grid for 4 Balanced Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 01: Pi-Metrix Equities */}
          <a href="/capital" className="group block p-8 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="h-14 w-full mb-6 flex items-center justify-start overflow-hidden bg-[#F5F6F3] rounded border border-[#B9BBB7]/30 px-3 py-2">
                <img src="/pmelogo.png" alt="Pi-Metrix Equities Logo" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold tracking-wide mb-3 transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>
                Pi-Metrix Equities
              </h3>
              <p className="text-sm leading-relaxed font-medium" style={{ color: '#6A7C87' }}>
                Operating as a pure proprietary desk deploying corporate capital through a systematic, metric-driven framework optimized for infinite compounding.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>
              Engage Desk →
            </div>
          </a>

          {/* Card 02: Pure Apex Pulse */}
          <a href="/digital" className="group block p-8 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="h-14 w-full mb-6 flex items-center justify-start overflow-hidden bg-[#F5F6F3] rounded border border-[#B9BBB7]/30 px-3 py-2">
                <img src="/apexlogo.png" alt="Pure Apex Pulse Logo" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold tracking-wide mb-3 transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>
                Pure Apex Pulse
              </h3>
              <p className="text-sm leading-relaxed font-medium" style={{ color: '#6A7C87' }}>
                Focused on the strategic acquisition, optimization, and scaling of high-margin web properties and custom software utilities.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>
              Monitor Pulse →
            </div>
          </a>

          {/* Card 03: Enterprise Commerce */}
          <a href="/commerce" className="group block p-8 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="h-14 w-full mb-6 flex items-center justify-start overflow-hidden bg-[#F5F6F3] rounded border border-[#B9BBB7]/30 px-3 py-2">
                <img src="/primerologo2.png" alt="Primero Collection Logo" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold tracking-wide mb-3 transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>
                Enterprise Commerce
              </h3>
              <p className="text-sm leading-relaxed font-medium" style={{ color: '#6A7C87' }}>
                Sourcing and building high-end physical products and bespoke luxury collections backed by streamlined global distribution logistics.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>
              Explore Primero →
            </div>
          </a>

          {/* Card 04: Frosted Nostalgia */}
          <a href="/frosted" className="group block p-8 rounded-xl bg-white border border-[#B9BBB7]/40 transition duration-500 hover:border-[#426F64] hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="h-14 w-full mb-6 flex items-center justify-start overflow-hidden bg-[#F5F6F3] rounded border border-[#B9BBB7]/30 px-3 py-2">
                <img src="/frostedlogo.png" alt="Frosted Nostalgia Logo" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold tracking-wide mb-3 transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.slate }}>
                Frosted Nostalgia
              </h3>
              <p className="text-sm leading-relaxed font-medium" style={{ color: '#6A7C87' }}>
                An artisanal, home-based custom cake studio designing luxury bespoke confectionery art, signature recipes, and handcrafted milestone cakes.
              </p>
            </div>
            <div className="mt-8 text-xs font-bold tracking-widest uppercase transition duration-300 group-hover:text-[#426F64]" style={{ color: brandColors.silver }}>
              View Artistry →
            </div>
          </a>

        </div>
      </section>

      {/* The Framework */}
      <section id="framework" className="max-w-5xl mx-auto px-6 py-20 border-t border-[#B9BBB7]/40">
        <div className="max-w-3xl">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-8" style={{ color: brandColors.teal }}>
            The Pure Framework
          </h2>
          <h3 className="text-2xl md:text-4xl font-extrabold leading-snug" style={{ color: brandColors.slate }}>
            Built on absolute structural discipline.
          </h3>
          <p className="mt-6 text-base md:text-lg leading-relaxed font-medium" style={{ color: '#5A6C77' }}>
            We believe that sustainable wealth accumulation is built on transparency, structural stability, and real, asset-backed value. Every operational division operates under an uncompromised risk framework:
          </p>
          <ul className="mt-10 space-y-6 text-base font-medium">
            <li className="flex items-start p-5 rounded-lg bg-white border border-[#B9BBB7]/40 shadow-sm">
              <span className="text-lg font-bold mr-4" style={{ color: brandColors.teal }}>01</span>
              <span style={{ color: '#5A6C77' }}><strong style={{ color: brandColors.slate }}>Zero Debt Leverage:</strong> Funded entirely by organic equity capital to eliminate systemic risk.</span>
            </li>
            <li className="flex items-start p-5 rounded-lg bg-white border border-[#B9BBB7]/40 shadow-sm">
              <span className="text-lg font-bold mr-4" style={{ color: brandColors.teal }}>02</span>
              <span style={{ color: '#5A6C77' }}><strong style={{ color: brandColors.slate }}>Asset-Backed Focus:</strong> Prioritizing enterprises exchanging clear, tangible utility for revenue.</span>
            </li>
            <li className="flex items-start p-5 rounded-lg bg-white border border-[#B9BBB7]/40 shadow-sm">
              <span className="text-lg font-bold mr-4" style={{ color: brandColors.teal }}>03</span>
              <span style={{ color: '#5A6C77' }}><strong style={{ color: brandColors.slate }}>Ethical Frameworks:</strong> Completely aligned with clean risk-sharing principles, fully independent of conventional speculative architectures.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 mt-12 border-t border-[#B9BBB7]/40 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest font-bold uppercase" style={{ color: brandColors.silver }}>
        <div>
          © 2026 Pure Approach Investments (Pty) Ltd.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-[#426F64] transition">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
