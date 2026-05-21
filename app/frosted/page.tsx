import React from 'react';

export default function FrostedDivision() {
  // Bulletproof styles that bypass Tailwind parsing limitations for specialized styles
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
      
      {/* Header Area with Central Logo */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#FFD700]/20 gap-6">
        
        {/* Seamless Logo Integration */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/frostedlogo.png" 
            alt="Frosted Nostalgia Logo" 
            className="h-28 sm:h-32 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          />
        </div>

        {/* Standalone Navigation Row */}
        <div className="w-full flex justify-between items-center mt-4 text-sm font-mono">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-[#FFD700] hover:text-white transition">
            ← BACK TO MAIN
          </a>
          <div className="text-xs tracking-widest flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded border border-[#FFD700]/20">
            <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_10px_#FFD700]"></span>
            <span className="text-[#FFD700] font-bold">ARTISAN BAKERY // EST. 2014</span>
          </div>
        </div>
      </header>

      {/* Brand Hero & Story Introduction */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-4xl">
          <span className="text-xs font-bold tracking-[0.4em] text-[#B8860B] uppercase font-mono block mb-2">
            Bespoke Confectionery Art
          </span>
          
          {/* Custom 3D Shiny 24ct Gold Embossed Title */}
          <h1 className="mt-4 flex flex-col md:flex-row items-baseline gap-2 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
            <span className="text-5xl md:text-7xl font-light tracking-tight" style={goldGradientStyle}>
              FROSTED
            </span>
            <span className="text-4xl md:text-5xl font-black tracking-widest uppercase py-2" style={goldGradientStyle}>
              NOSTALGIA
            </span>
          </h1>

          {/* New Heartfelt Story Block */}
          <div className="mt-10 border-l-2 border-[#FFD700]/30 pl-6 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-[#FFD700] mb-4">
              Our Story: Handcrafted From the Heart
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[#FFD700]/90 font-light">
              Established in 2014, Frosted Nostalgia began in the warmth of a home kitchen with a simple, uncompromising passion: turning fond memories and classic flavors into breathtaking custom cakes. For over a decade, we have dedicated ourselves to baking memories from scratch, hand-crafting beautiful culinary centerpieces for life’s most precious celebrations.
            </p>
          </div>
          
          {/* Main Statement (Large Scaled 24ct Gold Gradient) */}
          <p className="mt-10 text-2xl md:text-3xl leading-relaxed max-w-3xl font-medium filter drop-shadow-[0_4px_5px_rgba(0,0,0,0.6)]" style={goldGradientStyle}>
            Specializing in luxury custom milestone cakes, artisanal signature desserts, and tailored confectionery designs. Baked in small batches with premium ingredients, flawless artistic detail, and the timeless nostalgia of home.
          </p>
        </div>

        {/* Operational Modules Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Creation Pillar 01 */}
          <div className="group p-8 rounded-lg bg-neutral-950 border border-[#FFD700]/20 hover:border-[#FFD700]/50 transition duration-500 shadow-[0_0_15px_rgba(255,215,0,0.02)]">
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="text-2xl font-bold tracking-wide" style={goldGradientStyle}>
                Bespoke Celebrations
              </h3>
              <span className="text-[10px] font-mono text-[#B8860B] tracking-widest">CUSTOM_DESIGN</span>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-[#FFD700]/80 font-normal">
              Designing luxury custom wedding, birthday, and anniversary cakes tailored precisely to your unique visual theme and chosen flavor profiles. Every single sugar flower, tier decoration, and finish is sculpted purely by hand.
            </p>
            <div className="mt-8 pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-mono text-[#B8860B]">
              <div>BATCH CAPACITY: <span className="text-[#FFD700] font-bold">LIMITED</span></div>
              <div>DESIGN: <span className="text-[#FFD700] font-bold">100% TAILORED</span></div>
            </div>
          </div>

          {/* Creation Pillar 02 */}
          <div className="group p-8 rounded-lg bg-neutral-950 border border-[#FFD700]/20 hover:border-[#FFD700]/50 transition duration-500 shadow-[0_0_15px_rgba(255,215,0,0.02)]">
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="text-2xl font-bold tracking-wide" style={goldGradientStyle}>
                Artisanal Integrity
              </h3>
              <span className="text-[10px] font-mono text-[#B8860B] tracking-widest">PURE_INGREDIENTS</span>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-[#FFD700]/80 font-normal">
              We stand firmly behind the art of real baking. We completely reject artificial premixes and commercial extenders, relying entirely on real butter, premium extracts, and time-honored techniques to guarantee an exquisite taste profile.
            </p>
            <div className="mt-8 pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-mono text-[#B8860B]">
              <div>PROCESS: <span className="text-[#FFD700] font-bold">FROM SCRATCH</span></div>
              <div>QUALITY: <span className="text-[#FFD700] font-bold">PREMIUM ONLY</span></div>
            </div>
          </div>

        </div>
      </main>

      {/* Standalone Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-neutral-900 text-xs text-center font-mono" style={goldGradientStyle}>
        © 2026 FROSTED NOSTALGIA. HANDCRAFTED WITH LOVE SINCE 2014. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
