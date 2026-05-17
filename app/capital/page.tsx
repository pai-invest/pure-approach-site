import React from 'react';

export default function CapitalDivision() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-200 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* Header Area with the New Logo as the First Element (Matches Pulse Page) */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-slate-800/30 gap-6">
        
        {/* Seamless Strategic Capital Logo Integration */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/pmelogo.png" 
            alt="Strategic Capital Logo" 
            className="h-28 sm:h-32 w-auto object-contain"
          />
        </div>

        {/* Dynamic sub-navigation row */}
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/preview" className="text-xs font-bold tracking-[0.2em] text-slate-400 hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-slate-900/40 px-3 py-1.5 rounded border border-slate-800/30">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse shadow-[0_0_10px_#94a3b8]"></span>
            <span className="text-slate-300 font-bold font-mono">CAPITAL // ALLOCATION_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.4em] text-slate-500 uppercase font-mono">
            Risk Registry // Division 01
          </span>
          
          {/* Polished Platinum/Silver Gradient Title */}
          <h1 className="mt-4 text-4xl md:text-6xl tracking-[0.15em] font-serif font-light uppercase py-2
            bg-[linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_25%,#94A3B8_50%,#64748B_75%,#1E293B_100%)] 
            bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            STRATEGIC CAPITAL
          </h1>
          
          <p className="mt-6 text-base text-slate-400 leading-relaxed max-w-2xl font-light">
            The core allocation matrix of Pure Approach Investments. We manage a rules-based, global equity framework engineered to systematically extract market premiums while maintaining an absolute defensive baseline against systemic asset drawdowns.
          </p>
        </div>

        {/* Barbell Allocation Framework */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Defensive Pillar */}
          <div className="p-6 rounded-lg bg-[#0C0F17] border border-slate-800/40 hover:border-slate-700/50 transition duration-500 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif tracking-wide text-slate-100">Capital Preservation Engine</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-slate-950 text-slate-400 border border-slate-800/60 rounded">
                BASE_STABLE
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400 font-light leading-relaxed">
              Securing the foundational base layer through highly liquid, non-speculative capital positions. This half of the barbell is purely defensive, mathematically insulated to handle high macro volatility with zero operational friction.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/40 grid grid-cols-2 gap-4 text-xs font-mono text-slate-500">
              <div>ALLOCATION: <span className="text-slate-300 font-bold">50% LIQUIDITY</span></div>
              <div>STRATEGY: <span className="text-slate-300 font-bold">ZERO LEVERAGE</span></div>
            </div>
          </div>

          {/* Aggressive Growth Pillar */}
          <div className="p-6 rounded-lg bg-[#0C0F17] border border-slate-800/40 hover:border-slate-700/50 transition duration-500 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif tracking-wide text-slate-100">Alpha Capture Tranches</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-slate-900/80 text-slate-300 border border-slate-700/30 rounded">
                GROWTH_ACTIVE
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400 font-light leading-relaxed">
              Deploying active trading blocks across high-growth domestic and international equity environments. We focus strictly on concentrated, high-conviction positions positioned for clear structural price swings.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800/40 grid grid-cols-2 gap-4 text-xs font-mono text-slate-500">
              <div>TARGETS: <span className="text-slate-300 font-bold">JSE / US MARKETS</span></div>
              <div>EXECUTION: <span className="text-slate-300 font-bold">TRANCHE ACTIONS</span></div>
            </div>
          </div>

        </div>

        {/* Execution Rules */}
        <div className="mt-24 max-w-3xl border-t border-slate-800/30 pt-16">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase font-mono mb-8 text-slate-400">
            Mandated Risk Rules
          </h2>
          <div className="space-y-4 text-xs font-mono text-slate-400">
            <div className="bg-[#0C0F17] p-4 rounded border border-slate-800/40 flex items-start gap-3">
              <span className="text-slate-500 font-bold">[RULE_01]</span>
              <div>
                <span className="text-slate-200 block font-serif text-sm tracking-wide mb-1 font-bold">THE MOMENTUM CEILING</span>
                <p className="font-sans font-light text-slate-400 text-sm leading-relaxed">
                  Positions are strictly monitored and balanced utilizing specific profit recovery triggers, guaranteeing that paper gains are consistently transformed into cold realized equity capital.
                </p>
              </div>
            </div>
            <div className="bg-[#0C0F17] p-4 rounded border border-slate-800/40 flex items-start gap-3">
              <span className="text-slate-500 font-bold">[RULE_02]</span>
              <div>
                <span className="text-slate-200 block font-serif text-sm tracking-wide mb-1 font-bold">ETHICAL COUNTER-RISK</span>
                <p className="font-sans font-light text-slate-400 text-sm leading-relaxed">
                  All deployment tranches follow zero-debt mechanics. By staying completely cash-backed, the fund remains immune to systemic margin calls or sudden counterparty liquidations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-800/30 text-xs text-slate-600 font-mono text-center">
        NODE_STATUS: ONLINE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. STRATEGIC CAPITAL DIVISION.
      </footer>
    </div>
  );
}
