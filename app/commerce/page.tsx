import React from 'react';

export default function CommerceDivision() {
  return (
    <div className="min-h-screen bg-[#0A1224] text-slate-300 font-sans selection:bg-slate-800 selection:text-white">
      {/* Navigation */}
      <header className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center border-b border-slate-800/40">
        <a href="/preview" className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition">
          ← PURE APPROACH TERMINAL
        </a>
        <div className="text-xs tracking-widest text-slate-500 font-mono">DIVISION // 03</div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase font-mono">
            Flagship Brand
          </span>
          
          {/* PRIMERO COLLECTION TITLE: 
              - Custom, sleek serif font for "PRIMERO" inspired by your logo
              - Multi-layered metallic gradient for maximum shine and embossed effect
              - Pair with complementing silver text shadow.
          */}
          <h1 className="mt-4 flex flex-col md:flex-row items-baseline gap-2">
            <span className="text-5xl md:text-7xl font-light tracking-tight [font-family:'PrimeroSerif',serif]
              bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
              PRIMERO
            </span>
            <span className="text-4xl md:text-5xl font-black tracking-widest uppercase py-2
              bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
              COLLECTION
            </span>
          </h1>
          
          {/* BRIGHT SHINY SILVER FOR ALL PARAGRAPHS */}
          <p className="mt-6 text-base leading-relaxed max-w-2xl
              bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
            Bespoke leather goods and essential travel accessories engineered for the modern professional. Built on a foundation of refined minimalism, uncompromising material sourcing, and streamlined global distribution logistics.
          </p>
        </div>

        {/* Brand Curation / Lookbook */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Collection Bundle 01 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] w-full bg-[#0E1A30] border border-slate-800/50 rounded-lg flex items-center justify-center p-8 transition group-hover:border-slate-700 shadow-lg">
              <span className="text-xs tracking-widest text-slate-500 font-mono">[ IMAGE VAULT: LEATHER TRAVEL ASSETS ]</span>
            </div>
            <div className="mt-6 flex justify-between items-baseline">
              <h3 className="text-lg font-bold tracking-wide
                bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
                bg-clip-text text-transparent 
                filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                The Voyager Bundle
              </h3>
              <span className="text-xs font-mono text-slate-500">CURATED EDITION</span>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed
                bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
                bg-clip-text text-transparent 
                filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
              A seamless integration of premium travel accessories, crafted from hand-selected full-grain leather designed to age beautifully through global transit.
            </p>
          </div>

          {/* Collection Bundle 02 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] w-full bg-[#0E1A30] border border-slate-800/50 rounded-lg flex items-center justify-center p-8 transition group-hover:border-slate-700 shadow-lg">
              <span className="text-xs tracking-widest text-slate-500 font-mono">[ IMAGE VAULT: ESSENTIAL ACCESSORIES ]</span>
            </div>
            <div className="mt-6 flex justify-between items-baseline">
              <h3 className="text-lg font-bold tracking-wide
                bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
                bg-clip-text text-transparent 
                filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                The Desk & Transit Set
              </h3>
              <span className="text-xs font-mono text-slate-500">DAILY UTILITY</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed
                bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
                bg-clip-text text-transparent 
                filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
              Sleek, minimalist small leather goods balancing professional aesthetic demands with high-durability daily protection.
            </p>
          </div>
        </div>

        {/* Operational Excellence */}
        <div className="mt-32 max-w-3xl border-t border-slate-800/40 pt-16">
          <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono mb-8
              bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
            Supply Chain & Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-400">
            <div>
              <h4 className="font-bold mb-2 tracking-wide
                bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
                bg-clip-text text-transparent 
                filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                Premium Procurement
              </h4>
              <p className="leading-relaxed
                bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
                bg-clip-text text-transparent 
                filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                We circumvent traditional wholesale inflation by establishing direct sourcing lines with premium ethical tanneries and artisan manufacturers.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2 tracking-wide
                bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
                bg-clip-text text-transparent 
                filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                Kitted Logistics
              </h4>
              <p className="leading-relaxed
                bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
                bg-clip-text text-transparent 
                filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                By utilizing optimized bundling models and automated delivery pipelines, we ensure premium customer unboxing experiences while maintaining superior operating margins.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-800/40 text-xs text-slate-500
          bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] 
          bg-clip-text text-transparent 
          filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
        © 2026 Pure Approach Investments (Pty) Ltd. Primero Collection Division.
      </footer>
    </div>
  );
}
