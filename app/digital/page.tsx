"use client";
import React, { useState } from 'react';

export default function DigitalDivision() {
  // State for the free micro-utility calculator
  const [monthlyIncome, setMonthlyIncome] = useState<number | ''>('');
  
  // Rough calculation logic (Assuming 45% max marginal vs 27% corporate rate)
  const annualIncome = Number(monthlyIncome) * 12;
  const personalTax = annualIncome * 0.45;
  const corporateTax = annualIncome * 0.27;
  const lostCapital = personalTax - corporateTax;

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      
      {/* Header Area */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#10B981]/10 gap-6">
        
        {/* Official Apex Pulse Logo */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/apexlogo.png" 
            alt="Pure Apex Pulse Logo" 
            className="h-28 sm:h-32 w-auto object-contain"
          />
        </div>

        {/* Dynamic sub-navigation row */}
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/preview" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#04381F]/50 px-3 py-1.5 rounded border border-[#10B981]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[#F5D36B] font-bold font-mono">PULSE // SECURE_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.4em] text-[#10B981] uppercase font-mono">
            System Registry // Division 02
          </span>
          
          {/* Classy 24K Liquid Gold Serif Typography */}
          <h1 className="mt-4 text-4xl md:text-6xl tracking-[0.15em] font-serif font-light uppercase py-2
            bg-[linear-gradient(135deg,#FFFDF0_0%,#F5D36B_25%,#D4AF37_50%,#B38F24_75%,#543D04_100%)] 
            bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            PURE APEX PULSE
          </h1>
          
          {/* Unified Premium Gold Text Content */}
          <p className="mt-6 text-base text-[#F5D36B]/80 leading-relaxed max-w-2xl font-light">
            The high-performance digital asset pipeline of Pure Approach Investments. We build, optimize, and scale algorithmic web architectures, custom micro-utilities, and automated data networks engineered for compound equity growth with zero capital drag.
          </p>
        </div>

        {/* Tech Matrix / Operational Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Asset Framework 01 */}
          <div className="p-6 rounded-lg bg-[#021A0E] border border-[#10B981]/20 hover:border-[#F5D36B]/40 transition duration-500 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif tracking-wide text-[#F5D36B]">Programmatic Media Pipelines</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-[#032213] text-[#10B981] border border-[#10B981]/30 rounded">
                SYS_ACTIVE
              </span>
            </div>
            <p className="mt-3 text-sm text-[#F5D36B]/70 font-light leading-relaxed">
              Deploying light, edge-optimized content networks designed for mathematical keyword capture. These assets convert global search volume into persistent, high-margin transactional flow.
            </p>
            <div className="mt-6 pt-4 border-t border-[#10B981]/10 grid grid-cols-2 gap-4 text-xs font-mono text-[#10B981]">
              <div>CAPACITY: <span className="text-[#FFFDF0] font-bold">MAX_EFFICIENCY</span></div>
              <div>MONETIZATION: <span className="text-[#FFFDF0] font-bold">PROGRAMMATIC</span></div>
            </div>
          </div>

          {/* Asset Framework 02 */}
          <div className="p-6 rounded-lg bg-[#021A0E] border border-[#10B981]/20 hover:border-[#F5D36B]/40 transition duration-500 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif tracking-wide text-[#F5D36B]">Custom Software Utilities</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-[#04381F] text-[#F5D36B] border border-[#F5D36B]/20 rounded">
                NODE_SCALING
              </span>
            </div>
            <p className="mt-3 text-sm text-[#F5D36B]/70 font-light leading-relaxed">
              Engineering proprietary serverless micro-SaaS and transactional web interfaces that eliminate workflow inefficiencies and yield automated recurring margins.
            </p>
            <div className="mt-6 pt-4 border-t border-[#10B981]/10 grid grid-cols-2 gap-4 text-xs font-mono text-[#10B981]">
              <div>INFRASTRUCTURE: <span className="text-[#FFFDF0] font-bold">DECOUPLED</span></div>
              <div>DEBT LEVERAGE: <span className="text-[#FFFDF0] font-bold">0.00%</span></div>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION: THE APEX VAULT --- */}
        <div className="mt-24 border-t border-[#10B981]/20 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase font-mono mb-4 text-[#10B981]">The Apex Vault</h2>
            <h3 className="text-3xl font-serif tracking-wide uppercase text-[#F5D36B]">
              Engineered Systems for Capital Efficiency
            </h3>
            <p className="mt-4 text-sm font-light text-[#F5D36B]/70 max-w-2xl mx-auto leading-relaxed">
              Bypass the technical debt of retail software. Pure Apex Pulse licenses the exact, mechanical tracking architectures and proprietary frameworks utilized internally by our corporate desk.
            </p>
          </div>

          <div className="bg-[#021A0E] border border-[#10B981]/20 rounded-xl p-8 shadow-2xl flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group hover:border-[#F5D36B]/40 transition duration-500">
            <div className="flex-1 z-10">
              <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block text-[#10B981]">OFFLINE TREASURY DASHBOARD</span>
              <h4 className="text-2xl font-serif tracking-wide uppercase mb-4 text-[#FFFDF0] drop-shadow-md">
                The Global Swing Matrix
              </h4>
              <p className="text-sm font-light leading-relaxed mb-6 text-[#F5D36B]/80">
                Institutional-grade structural discipline for the independent investor. A mechanical tracking architecture engineered to track up to 29 distinct US equity entry tranches, calculate precise percentage-based profit exits, and enforce uncompromised risk management across dual-currency portfolios.
              </p>
              <ul className="space-y-3 text-xs font-mono text-[#F5D36B]/90 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-[#10B981] text-lg">▹</span> Automated +9% Exit & Stop-Loss Target Generation
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#10B981] text-lg">▹</span> Multi-Tranche US Equity Ledger
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#10B981] text-lg">▹</span> Automated Local Tax Provisioning
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <span className="text-2xl font-serif text-[#FFFDF0]">$49.00</span>
                <button className="px-6 py-3 text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 bg-[#F5D36B] text-[#032213] hover:bg-[#FFFDF0] shadow-[0_0_15px_rgba(245,211,107,0.2)] rounded-sm">
                  PURCHASE BLUEPRINT
                </button>
              </div>
              <p className="mt-6 text-[10px] font-mono text-[#10B981]/60 leading-relaxed">
                *SECURE DELIVERY VIA AUTOMATED DIGITAL TRANSFER. REQUIRES MICROSOFT EXCEL OR GOOGLE SHEETS.
              </p>
            </div>
            
            {/* Visual Placeholder for Spreadsheet */}
            <div className="w-full md:w-1/3 aspect-square bg-[#032213] border border-[#10B981]/30 rounded flex items-center justify-center shadow-inner relative z-10 group-hover:border-[#10B981]/60 transition duration-500">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981]"></div>
               <div className="text-center px-4">
                  <span className="block text-4xl mb-3 opacity-80">📊</span>
                  <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-[#10B981]">MATRIX.XLSX</span>
               </div>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION: FREE MICRO-UTILITY --- */}
        <div className="mt-24 border-t border-[#10B981]/20 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase font-mono mb-4 text-[#10B981]">Free Micro-Utility</h2>
            <h3 className="text-2xl font-serif tracking-wide uppercase text-[#F5D36B]">
              Corporate Transition ROI Calculator
            </h3>
            <p className="mt-4 text-sm font-light text-[#F5D36B]/70 max-w-2xl mx-auto">
              Determine the exact point at which independent practitioners bleed capital to personal income tax frameworks versus corporate holding structures.
            </p>
          </div>

          <div className="bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20 shadow-2xl max-w-lg mx-auto">
            <label className="block text-xs font-mono font-bold uppercase tracking-widest mb-3 text-[#10B981]">
              Estimated Monthly Revenue (ZAR)
            </label>
            <input 
              type="number" 
              placeholder="e.g. 150000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full p-4 mb-6 border border-[#10B981]/30 rounded bg-[#032213] focus:outline-none focus:border-[#F5D36B] text-xl font-serif text-center text-[#FFFDF0] placeholder-[#10B981]/30 transition-colors"
            />

            {typeof monthlyIncome === 'number' && monthlyIncome > 0 && (
              <div className="p-6 bg-[#032213] border border-[#10B981]/40 rounded text-center transition-all duration-500">
                <span className="block text-[10px] font-mono tracking-widest uppercase mb-2 text-[#F5D36B]/70">Estimated Annual Capital Lost</span>
                <span className="block text-3xl font-serif tracking-wide mb-3 text-[#FFFDF0] drop-shadow-[0_0_8px_rgba(255,253,240,0.3)]">
                  R {lostCapital.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                <p className="text-[10px] font-mono leading-relaxed text-[#10B981]/60">
                  *CALCULATION COMPARES STANDARD 45% MAXIMUM MARGINAL INDIVIDUAL TAX AGAINST A 27% CORPORATE TAX RATE OVER 12 MONTHS. PURELY INFORMATIONAL.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Protocol Control Room */}
        <div className="mt-24 border-t border-[#10B981]/20 pt-16">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase font-mono mb-8 text-[#F5D36B]">
            System Telemetry Protocols
          </h2>
          <div className="space-y-4 text-xs font-mono text-[#F5D36B]/80">
            <div className="bg-[#021A0E] p-4 rounded border border-[#10B981]/20 flex items-start gap-3">
              <span className="text-[#10B981] font-bold">[PROT_01]</span>
              <div>
                <span className="text-[#F5D36B] block font-serif text-sm tracking-wide mb-1 font-bold">AUTOMATED VELOCITY CONTROL</span>
                <p className="font-sans font-light text-[#F5D36B]/70 text-sm leading-relaxed">
                  All web platforms operate under automated edge deployment lines, matching traffic spikes globally without manual infrastructure intervention or database overhead scaling limits.
                </p>
              </div>
            </div>
            <div className="bg-[#021A0E] p-4 rounded border border-[#10B981]/20 flex items-start gap-3">
              <span className="text-[#10B981] font-bold">[PROT_02]</span>
              <div>
                <span className="text-[#F5D36B] block font-serif text-sm tracking-wide mb-1 font-bold">CAPITAL ALLOCATION EFFICIENCY</span>
                <p className="font-sans font-light text-[#F5D36B]/70 text-sm leading-relaxed">
                  Operating expenditures are computationally locked at minimum baselines to capture the highest possible net yield per single digital node.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-[#10B981]/10 text-xs text-[#10B981]/50 font-mono text-center">
        SYS_STATUS: SECURE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. APEX DIGITAL ASSETS DIVISION.
      </footer>
    </div>
  );
}
