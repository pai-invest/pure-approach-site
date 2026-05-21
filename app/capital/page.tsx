import React from 'react';

export default function PiMetrixEquities() {
  // Metallic Gold Gradient for High-End Typography
  const goldGradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #FFFDF0 0%, #FFD700 25%, #B8860B 45%, #FFFDF0 55%, #DAA520 70%, #8B6508 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const champagneText = {
    color: '#F4E0A1'
  };

  return (
    <div className="min-h-screen bg-[#280101] text-[#F4E0A1] font-sans selection:bg-red-950 selection:text-[#FFD700] pb-24">
      
      {/* Institutional Top Navigation */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center border-b border-[#D4AF37]/20 gap-8">
        
        {/* Centerpiece Logo */}
        <div className="flex items-center justify-center shrink-0 w-full">
          <img 
            src="/pmelogo.png" 
            alt="Pi-Metrix Equities Logo" 
            className="h-56 sm:h-72 md:h-80 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          />
        </div>

        <div className="w-full flex justify-between items-center mt-6">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded border border-[#D4AF37]/30">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
            <span className="text-neutral-300 font-bold uppercase">Desk Status // Active</span>
          </div>
        </div>
      </header>

      {/* Main Framework Content */}
      <main className="max-w-6xl mx-auto px-6 pt-16">
        
        {/* Manifest Header */}
        <div className="max-w-4xl">
          <span className="text-xs font-bold tracking-[0.5em] text-[#D4AF37] uppercase font-mono block mb-3">
            Treasury Management // Division 01
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight uppercase filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]" style={goldGradientStyle}>
            Pi-Metrix Equities
          </h1>
          <p className="mt-6 text-sm md:text-base font-mono tracking-[0.2em] uppercase border-b border-[#D4AF37]/20 pb-8 italic" style={champagneText}>
            Capital Allocation. Quantitative Discipline. Infinite Compounding.
          </p>
        </div>

        {/* The Live Interactive Slide Deck Node */}
        <section className="mt-16 w-full group">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase font-mono">
              Strategic Portfolio Deck // institutional
            </h2>
            <span className="text-[10px] font-mono text-red-400">ENCRYPTED_FRAME</span>
          </div>
          
          {/* Cinema-Style Iframe Container */}
          <div className="w-full aspect-[16/9] rounded-sm border-2 border-[#D4AF37]/30 overflow-hidden bg-black shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-[#D4AF37]/60">
            <iframe 
              src="/pme-deck.html" 
              className="w-full h-full border-0" 
              allowFullScreen
              title="Pi-Metrix Equities Strategic Presentation"
            />
          </div>
          
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-[10px] font-mono tracking-widest text-[#D4AF37]/60 uppercase">
              Interact directly with the window above to navigate strategic slides
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
          </div>
        </section>

        {/* Detailed Narrative Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8 text-lg leading-relaxed font-light">
            <p>
              <strong className="font-bold text-[#FFD700]">Pi-Metrix Equities (PME)</strong> functions as the proprietary trading and global treasury management division of Pure Approach Investments. 
            </p>
            <p>
              Engineered to navigate highly liquid global public markets, PME deploys corporate capital through a systematic, metric-driven framework designed to extract alpha from structural market momentum while prioritizing absolute capital preservation.
            </p>
          </div>
          
          <div className="p-8 rounded bg-black/20 border border-[#D4AF37]/10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 italic" style={goldGradientStyle}>Mathematical Precision</h3>
            <p className="text-sm md:text-base text-neutral-300 font-light">
              The name Pi-Metrix is derived from the mathematical constant <span className="text-[#FFD700] font-serif text-xl">π</span>—an infinite, unwavering, and foundational sequence. This architecture dictates our entire approach: infinite compounding, unwavering risk parameters, and the stability of mathematical consistency.
            </p>
          </div>
        </div>

        {/* Strategy Pillars */}
        <section className="mt-24 pt-12 border-t border-[#D4AF37]/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">01 // Compounding</h4>
            <p className="text-sm font-light text-neutral-400">Profits are systematically recycled and scaled to build long-term corporate wealth.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">02 // Quantitative</h4>
            <p className="text-sm font-light text-neutral-400">Human emotion is eliminated. Every adjustment is governed by pre-defined metrics.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">03 // Barbell Risk</h4>
            <p className="text-sm font-light text-neutral-400">Downside is capped through automated risk parameters while upside remains open.</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-16 mt-24 border-t border-[#D4AF37]/10 text-[10px] text-center font-mono tracking-[0.3em] text-[#D4AF37]/40 uppercase">
        © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. PI-METRIX EQUITIES DIVISION.
      </footer>
    </div>
  );
}
