import React from 'react';

export default function FrostedDivision() {
  return (
    <div className="min-h-screen bg-black text-[#FFD700] font-['Cinzel_Decorative','Dancing_Script',cursive,serif] selection:bg-amber-950 selection:text-amber-200">
      
      {/* Header Area (Unified Sizing & Alignment) */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#FFD700]/20 gap-6">
        
        {/* Seamless Logo Integration */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/frostedlogo.jpg" 
            alt="Frosted Nostalgia Logo" 
            className="h-28 sm:h-32 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          />
        </div>

        {/* Dynamic sub-navigation row */}
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-[#FFD700] hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded border border-[#FFD700]/20">
            <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_10px_#FFD700]"></span>
            <span className="text-[#FFD700] font-bold font-mono">RETRO // MERCHANDISE_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero & Introduction */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-4xl">
          <span className="text-xs font-bold tracking-[0.4em] text-[#B8860B] uppercase font-mono block mb-2">
            Heritage Assets // Division 04
          </span>
          
          {/* Custom 3D Shiny 24ct Gold Embossed Header Layout */}
          <h1 className="mt-4 flex flex-col md:flex-row items-baseline gap-2">
            <span className="text-5xl md:text-7xl font-light tracking-tight
              bg-[linear-gradient(135deg,#FFFDF0_0%,#FFD700_25%,#B8860B_45%,#FFFDF0_55%,#DAA520_70%,#8B6508_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.2)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
              FROSTED
            </span>
            <span className="text-4xl md:text-5xl font-black tracking-widest uppercase py-2
              bg-[linear-gradient(135deg,#FFFDF0_0%,#FFD700_25%,#B8860B_45%,#FFFDF0_55%,#DAA520_70%,#8B6508_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_2px_1px_rgba(255,255,255,0.2)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
              NOSTALGIA
            </span>
          </h1>

          {/* New Division Introduction Block */}
          <div className="mt-10 border-l-2 border-[#FFD700]/30 pl-6 max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold tracking-wide text-[#FFD700] mb-3">
              Introduction: The Treasury of Time
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#FFD700]/90 font-light">
              Welcome to the specialized curation vector of Pure Approach Investments. Division 04 stands as our deliberate celebration of heritage, engineered to bridge generational sentiments with high-yielding commercial viability. We treat history not merely as a memory, but as a premium asset class.
            </p>
          </div>
          
          {/* Main Summary Paragraph (Scaled up to text-xl) */}
          <p className="mt-8 text-xl md:text-2xl leading-relaxed max-w-3xl font-medium
              bg-[linear-gradient(135deg,#FFFDF0_0%,#FFD700_35%,#DAA520_60%,#FFD700_80%,#8B6508_100%)] 
              bg-clip-text text-transparent 
              filter drop-shadow-[0_4px_5px_rgba(0,0,0,0.6)]">
            Capitalizing on high-margin cultural resurgence, premium retro-modern brand physical spaces, and curated legacy consumer products. Built on absolute financial structural stability, optimized operational procurement, and unmatched demographic brand equity.
          </p>
        </div>

        {/* Operational Modules Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Module 01 */}
          <div className="group p-8 rounded-lg bg-neutral-950 border border-[#FFD700]/20 hover:border-
