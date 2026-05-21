import React from 'react';

export default function CommerceDivision() {
  return (
    <div className="min-h-screen bg-[#0A1224] text-slate-300 font-sans selection:bg-slate-800 selection:text-white">
      
      {/* Header Area with Large Primero Logo as the First Element */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center border-b border-slate-800/40 gap-8">
        
        {/* Seamless Primero Logo Integration - Now with a Silver Glow */}
        <div className="flex items-center justify-center shrink-0 w-full">
          <img 
            src="/primerologo2.png" 
            alt="Primero Collection Logo" 
            className="h-56 sm:h-72 md:h-80 w-auto object-contain filter drop-shadow-[0_0_30px_rgba(203,213,225,0.3)]"
          />
        </div>

        {/* Dynamic sub-navigation row */}
        <div className="w-full flex justify-between items-center mt-6">
          <a href="/preview" className="text-xs font-bold tracking-[0.2em] text-slate-400 hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-slate-900/40 px-3 py-1.5 rounded border border-slate-800/30">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse shadow-[0_0_10px_#94a3b8]"></span>
            <span className="text-slate-300 font-bold font-mono">COMMERCE // DISTRIBUTION_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.4em] text-slate-500 uppercase font-mono">
            Flagship Brand // Division 03
          </span>
          
          {/* Custom 3D Silver Embossed Header Layout */}
          <h1 className="mt-4 flex flex-col md:flex-row items-baseline gap-2">
            <span className="text-5xl md:text-7xl font-light tracking-tight [font-family:'PrimeroSerif',serif] bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
              PRIMERO
            </span>
            <span className="text-4xl md:text-5xl font-black tracking-widest uppercase py-2 bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
              COLLECTION
            </span>
          </h1>
          
          {/* Bright Shiny Silver Summary Paragraph */}
          <p className="mt-6 text-base leading-relaxed max-w-2xl font-light bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
            Bespoke leather goods and essential travel accessories engineered for the modern professional. Built on a foundation of refined minimalism, uncompromising material sourcing, and streamlined global distribution logistics.
          </p>
        </div>

        {/* Brand Curation / Lookbook */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Collection Bundle 01 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] w-full bg-[#0E1A30] border border-slate-800/50 rounded-lg flex items-center justify-center p-8 transition group-hover:border-slate-700 shadow-lg">
              <span className="text-xs tracking-widest text-slate-500 font-mono">[IMAGE VAULT]</span>
            </div>
            <div className="mt-6 flex justify-between items-baseline">
              <h3 className="text-lg font-bold tracking-wide bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                The Voyager Bundle
              </h3>
              <span className="text-xs font-mono text-slate-500">CURATED EDITION</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed font-light bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
              A seamless integration of premium travel accessories, crafted from hand-selected full-grain leather designed to age beautifully through global transit.
            </p>
          </div>

          {/* Collection Bundle 02 */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] w-full bg-[#0E1A30] border border-slate-800/50 rounded-lg flex items-center justify-center p-8 transition group-hover:border-slate-700 shadow-lg">
              <span className="text-xs tracking-widest text-slate-500 font-mono">[IMAGE VAULT:]</span>
            </div>
            <div className="mt-6 flex justify-between items-baseline">
              <h3 className="text-lg font-bold tracking-wide bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                The Desk & Transit Set
              </h3>
              <span className="text-xs font-mono text-slate-500">DAILY UTILITY</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed font-light bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
              Sleek, minimalist small leather goods balancing professional aesthetic demands with high-durability daily protection.
            </p>
          </div>
        </div>

        {/* Operational Excellence */}
        <div className="mt-32 max-w-3xl border-t border-slate-800/40 pt-16">
          <h2 className="text-xs font-bold tracking-widest uppercase font-mono mb-8 bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
            Supply Chain & Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-bold mb-2 tracking-wide bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                Premium Procurement
              </h4>
              <p className="leading-relaxed font-light bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                We circumvent traditional wholesale inflation by establishing direct sourcing lines with premium ethical tanneries and artisan manufacturers.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2 tracking-wide bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                Kitted Logistics
              </h4>
              <p className="leading-relaxed font-light bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
                By utilizing optimized bundling models and automated delivery pipelines, we ensure premium customer unboxing experiences while maintaining superior operating margins.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-800/40 text-xs text-center bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_45%,#FFFFFF_55%,#CBD5E1_70%,#475569_100%)] bg-clip-text text-transparent filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.15)] drop-shadow-[0_4px_5px_rgba(0,0,0,0.9)]">
        © 2026 Pure Approach Investments (Pty) Ltd. Primero Collection Division.
      </footer>
    </div>
  );
}
