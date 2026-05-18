import React from 'react';

export default function Home() {
  // Exact metallic gradients matching the uploaded logo
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

  // Classic bold serif to match the logo's typography
  const pureFontStyle = {
    fontFamily: "'Cinzel', Georgia, Garamond, serif",
  };

  return (
    {/* Deepest Charcoal/Black Background for high-contrast luxury */}
    <div className="min-h-screen bg-[#050505] text-[#D0D0D0] font-sans selection:bg-[#B8860B]/30 selection:text-white pb-24">
      
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center border-b border-[#D4AF37]/20">
        <a href="/" className="flex items-center gap-4 hover:opacity-80 transition justify-center sm:justify-start">
          {/* Frosted Glass Logo Panel */}
          <div className="bg-white/5 p-2 sm:p-2.5 border border-white/10 shadow-lg backdrop-blur-md flex items-center justify-center shrink-0 rounded">
            <img 
              src="/pailogo2.png" 
              alt="Pure Approach Investments Logo" 
              className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,215,0,0.15)]"
            />
          </div>
          <span className="text-sm sm:text-base font-bold tracking-[0.25em] uppercase whitespace-nowrap" style={{...silverGradientStyle, ...pureFontStyle}}>
            Pure Approach Investments
          </span>
        </a>
        <nav className="flex space-x-8 text-xs tracking-widest text-[#A0A0A0] justify-center sm:justify-end font-mono uppercase">
          <a href="#divisions" className="hover:text-[#FFD700] transition duration-300">Divisions</a>
          <a href="#framework" className="hover:text-[#FFD700] transition duration-300">Framework</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center sm:text-left">
        <h1 className="text-4xl md:text-6xl font-black tracking-wide leading-tight uppercase filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]" style={{...goldGradientStyle, ...pureFontStyle}}>
          Orchestrating High-Growth Capital & Scalable Digital Architecture.
        </h1>
        <p className="mt-8 text-base md:text-xl text-[#A0A0A0] leading-relaxed max-w-3xl font-light">
          Pure Approach Investments is a private holding entity dedicated to systematic wealth accumulation. We deploy capital across a concentrated portfolio of high-performing equity strategies, automated digital assets, and high-margin commerce brands.
        </p>
      </main>

      {/* Portfolio Ecosystem - 4 Divisions */}
      <section id="divisions" className="max-w-6xl mx-auto px-6 py-20 border-t border-[#D4AF37]/10">
        <h2 className="text-sm font-bold tracking-[0.4em] uppercase mb-12" style={{...silverGradientStyle, ...pureFontStyle}}>
          Portfolio Ecosystem
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 01: Pi-Metrix Equities */}
          <a href="/capital" className="group block p-6 rounded-lg bg-white/5 border border-white/10 transition duration-500 hover:border-[#D4AF37]/50 hover:bg-white/10 shadow-2xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="h-14 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-black/40 border border-[#D4AF37]/20 px-2 py-1">
                <img src="/pmelogo.png" alt="Pi-Metrix Equities" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold tracking-wider mb-3" style={{...goldGradientStyle, ...pureFontStyle}}>Pi-Metrix Equities</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed font-light">
                Operating as a pure proprietary desk deploying corporate capital through a systematic, metric-driven framework optimized for infinite compounding.
              </p>
            </div>
            <div className="mt-8 text-[10px] tracking-widest font-mono text-[#708090] group-hover:text-[#D4AF37] transition">ENGAGE DESK →</div>
          </a>

          {/* Card 02: Pure Apex Pulse */}
          <a href="/digital" className="group block p-6 rounded-lg bg-white/5 border border-white/10 transition duration-500 hover:border-[#D4AF37]/50 hover:bg-white/10 shadow-2xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="h-14 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-black/40 border border-[#D4AF37]/20 px-2 py-1">
                <img src="/apexlogo.png" alt="Pure Apex Pulse" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold tracking-wider mb-3" style={{...goldGradientStyle, ...pureFontStyle}}>Pure Apex Pulse</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed font-light">
                Focused on the strategic acquisition, optimization, and scaling of high-margin web properties, custom software utilities, and content engines.
              </p>
            </div>
            <div className="mt-8 text-[10px] tracking-widest font-mono text-[#708090] group-hover:text-[#D4AF37] transition">MONITOR PULSE →</div>
          </a>

          {/* Card 03: Enterprise Commerce */}
          <a href="/commerce" className="group block p-6 rounded-lg bg-white/5 border border-white/10 transition duration-500 hover:border-[#D4AF37]/50 hover:bg-white/10 shadow-2xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="h-14 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-black/40 border border-[#D4AF37]/20 px-2 py-1">
                <img src="/primerologo2.png" alt="Primero Collection" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold tracking-wider mb-3" style={{...goldGradientStyle, ...pureFontStyle}}>Enterprise Commerce</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed font-light">
                Sourcing and building high-end physical products and bespoke luxury collections backed by streamlined global distribution logistics.
              </p>
            </div>
            <div className="mt-8 text-[10px] tracking-widest font-mono text-[#708090] group-hover:text-[#D4AF37] transition">EXPLORE PRIMERO →</div>
          </a>

          {/* Card 04: Frosted Nostalgia */}
          <a href="/frosted" className="group block p-6 rounded-lg bg-white/5 border border-white/10 transition duration-500 hover:border-[#D4AF37]/50 hover:bg-white/10 shadow-2xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="h-14 w-full mb-6 flex items-center justify-start overflow-hidden rounded bg-black/40 border border-[#D4AF37]/20 px-2 py-1">
                <img src="/frostedlogo.png" alt="Frosted Nostalgia" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold tracking-wider mb-3" style={{...goldGradientStyle, ...pureFontStyle}}>Frosted Nostalgia</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed font-light">
                An artisanal custom cake studio designing luxury bespoke confectionery art, signature recipes, and handcrafted milestone cakes since 2014.
              </p>
            </div>
            <div className="mt-8 text-[10px] tracking-widest font-mono text-[#708090] group-hover:text-[#D4AF37] transition">VIEW ARTISTRY →</div>
          </a>

        </div>
      </section>

      {/* The Framework */}
      <section id="framework" className="max-w-5xl mx-auto px-6 py-20 border-t border-[#D4AF37]/10">
        <div className="max-w-3xl">
          <h2 className="text-sm font-bold tracking-[0.4em] uppercase mb-8" style={{...silverGradientStyle, ...pureFontStyle}}>
            The Pure Framework
          </h2>
          <h3 className="text-2xl md:text-4xl font-bold leading-snug" style={{...goldGradientStyle, ...pureFontStyle}}>
            Built on absolute structural discipline.
          </h3>
          <p className="mt-6 text-base md:text-lg text-[#A0A0A0] leading-relaxed font-light">
            We believe that sustainable wealth accumulation is built on transparency, structural stability, and real, asset-backed value. Every operational division operates under an uncompromised risk framework:
          </p>
          <ul className="mt-10 space-y-6 text-base text-[#A0A0A0] font-light">
            <li className="flex items-start p-4 rounded bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[#D4AF37] mr-4 font-mono font-bold">[01]</span>
              <span><strong className="text-[#E0E0E0] font-medium" style={pureFontStyle}>Zero Debt Leverage:</strong> Funded entirely by organic equity capital to eliminate systemic risk.</span>
            </li>
            <li className="flex items-start p-4 rounded bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[#D4AF37] mr-4 font-mono font-bold">[02]</span>
              <span><strong className="text-[#E0E0E0] font-medium" style={pureFontStyle}>Asset-Backed Focus:</strong> Prioritizing enterprises exchanging clear, tangible utility for revenue.</span>
            </li>
            <li className="flex items-start p-4 rounded bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[#D4AF37] mr-4 font-mono font-bold">[03]</span>
              <span><strong className="text-[#E0E0E0] font-medium" style={pureFontStyle}>Ethical Frameworks:</strong> Completely aligned with clean risk-sharing principles, fully independent of conventional speculative architectures.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 mt-12 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-[#708090] font-mono space-y-4 md:space-y-0 uppercase">
        <div>
          © 2026 Pure Approach Investments (Pty) Ltd.
        </div>
        <div className="flex space-x-6">
          <a href="/privacy" className="hover:text-[#D4AF37] transition">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
