import React from 'react';

export default function CapitalDivision() {
  return (
    <div className="min-h-screen bg-[#060604] text-white font-sans selection:bg-neutral-800 selection:text-white">
      {/* Navigation */}
      <header className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center border-b border-neutral-900/50">
        <a href="/" className="text-xs font-bold tracking-widest text-neutral-400 hover:text-white transition">
          ← PURE APPROACH INVESTMENTS
        </a>
        <div className="text-xs tracking-widest text-neutral-500 font-mono">DIVISION // 01</div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          Strategic Capital Allocation
        </h1>
        <p className="mt-6 text-base text-neutral-400 leading-relaxed max-w-2xl">
          The Capital division manages the foundational treasury of Pure Approach Investments. Our mandate is absolute capital preservation paired with asymmetric upside capture, executed through a strict mathematical framework.
        </p>

        {/* Framework Details */}
        <div className="mt-16 space-y-12">
          <div className="border-l-2 border-neutral-800 pl-6">
            <h3 className="text-lg font-bold text-neutral-200">The Barbell Strategy</h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
              We divide our capital into two distinct exposures, completely avoiding the uncompensated risks of the middle market. The extreme majority is held in low-risk, highly liquid reserves, while the remaining allocation captures high-conviction momentum trends in global equity markets.
            </p>
          </div>

          <div className="border-l-2 border-neutral-800 pl-6">
            <h3 className="text-lg font-bold text-neutral-200">Systematic Risk Parameters</h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
              Every position is quantitative and rules-based. We deploy rigorous portfolio rebalancing mechanisms and predefined capital exit targets to eliminate human bias and emotional decision-making from the trading floor.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-neutral-900/50 text-xs text-neutral-600">
        © 2026 Pure Approach Investments (Pty) Ltd. Asset Management Division.
      </footer>
    </div>
  );
}
