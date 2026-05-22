import React from 'react';

export default function PublicCalculatorHub() {
  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0] pb-24">
      
      {/* Mini Terminal Header */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#10B981]/10 gap-6">
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/digital" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono">
            ← RETURN TO APEX PULSE
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#04381F]/50 px-3 py-1.5 rounded border border-[#10B981]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[#F5D36B] font-bold">PUBLIC_CALC // ONLINE</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-16">
        {/* Hub Title */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-[0.4em] text-[#10B981] uppercase font-mono block mb-3">
            Open-Source Architecture // Node 01
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-light uppercase py-2 bg-[linear-gradient(135deg,#FFFDF0_0%,#F5D36B_25%,#D4AF37_50%,#B38F24_75%,#543D04_100%)] bg-clip-text text-transparent">
            Public Utility Calculators
          </h1>
          <p className="mt-4 text-sm text-[#F5D36B]/70 font-light leading-relaxed max-w-2xl">
            A suite of free, edge-deployed mathematical models designed for capital allocators and digital asset managers. These systems are un-gated for public utility.
          </p>
        </div>

        {/* Free Tools Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tool 01 */}
          <a href="/digital/calculator/compound-yield" className="group p-6 rounded-lg bg-[#021A0E] border border-[#10B981]/30 hover:border-[#10B981] transition duration-300 flex flex-col justify-between cursor-pointer">
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-lg font-bold font-mono text-[#FFFDF0]">Compound Yield Simulator</h3>
                <span className="text-[10px] text-[#10B981] tracking-widest font-mono uppercase">V.1.0.4</span>
              </div>
              <p className="text-xs text-[#F5D36B]/60 leading-relaxed font-light mb-6">
                Calculate infinite compounding trajectories over varying time horizons, factoring in automated dividend reinvestment and capital drag ratios.
              </p>
            </div>
            <div className="text-xs font-mono text-[#10B981] group-hover:text-[#FFFDF0] transition">
              [ INITIALIZE CALCULATOR ] →
            </div>
          </a>

          {/* Tool 02 */}
          <a href="/digital/calculator/ad-arbitrage" className="group p-6 rounded-lg bg-[#021A0E] border border-[#10B981]/30 hover:border-[#10B981] transition duration-300 flex flex-col justify-between cursor-pointer">
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-lg font-bold font-mono text-[#FFFDF0]">Ad Arbitrage Matrix</h3>
                <span className="text-[10px] text-[#10B981] tracking-widest font-mono uppercase">V.2.1.0</span>
              </div>
              <p className="text-xs text-[#F5D36B]/60 leading-relaxed font-light mb-6">
                Determine exact net-yield margins for programmatic media pipelines by cross-referencing Cost Per Click (CPC) vs. Revenue Per Mille (RPM).
              </p>
            </div>
            <div className="text-xs font-mono text-[#10B981] group-hover:text-[#FFFDF0] transition">
              [ INITIALIZE CALCULATOR ] →
            </div>
          </a>

          {/* Tool 03 */}
          <a href="/digital/calculator/saas-churn" className="group p-6 rounded-lg bg-[#021A0E] border border-[#10B981]/30 hover:border-[#10B981] transition duration-300 flex flex-col justify-between cursor-pointer">
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-lg font-bold font-mono text-[#FFFDF0]">SaaS Churn & LTV Engine</h3>
                <span className="text-[10px] text-[#10B981] tracking-widest font-mono uppercase">V.1.2.2</span>
              </div>
              <p className="text-xs text-[#F5D36B]/60 leading-relaxed font-light mb-6">
                Model long-term valuation of subscription architectures. Input Customer Acquisition Cost (CAC) and monthly churn to extract true Lifetime Value (LTV).
              </p>
            </div>
            <div className="text-xs font-mono text-[#10B981] group-hover:text-[#FFFDF0] transition">
              [ INITIALIZE CALCULATOR ] →
            </div>
          </a>
        </div>

        {/* Vault Upsell Block */}
        <div className="mt-16 p-8 border border-[#F5D36B]/20 bg-[#F5D36B]/5 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37]/5 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="z-10 flex-1">
            <h3 className="text-xl font-serif text-[#F5D36B] mb-2 tracking-wide">Require Institutional Complexity?</h3>
            <p className="text-sm text-[#F5D36B]/70 font-light leading-relaxed">
              The Pure Approach Access Vault contains our proprietary server-side scraping utilities, automated equity screeners, and raw deployment codebases. Encrypted for licensed users only.
            </p>
          </div>
          
          <div className="z-10 shrink-0">
            <a href="/digital/vault" className="flex items-center justify-center px-6 py-3 bg-[#F5D36B] text-[#032213] text-xs uppercase tracking-widest font-mono font-bold hover:bg-[#FFFDF0] transition shadow-[0_0_20px_rgba(245,211,107,0.2)]">
              REQUEST VAULT ACCESS
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
