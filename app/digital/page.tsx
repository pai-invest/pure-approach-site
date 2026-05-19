"use client";
import React, { useState } from 'react';

export default function PureApexPulse() {
  // Brand color palette
  const brandColors = {
    background: '#F5F6F3',
    slate: '#203340',
    teal: '#426F64',
    silver: '#B9BBB7',
    gold: '#C5A059' // Accent color for premium vault
  };

  const timesNewRomanFont = {
    fontFamily: "'Times New Roman', Times, serif",
  };

  // State for the free micro-utility calculator
  const [monthlyIncome, setMonthlyIncome] = useState<number | ''>('');
  
  // Rough calculation logic (Assuming 45% max marginal vs 27% corporate rate)
  const annualIncome = Number(monthlyIncome) * 12;
  const personalTax = annualIncome * 0.45;
  const corporateTax = annualIncome * 0.27;
  const lostCapital = personalTax - corporateTax;

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: brandColors.background, color: brandColors.slate, ...timesNewRomanFont }}>
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center justify-center border-b border-[#B9BBB7]/40">
        <a href="/" className="flex flex-col items-center gap-4 hover:opacity-80 transition text-center mb-6">
          <img src="/apexlogo.png" alt="Pure Apex Pulse Logo" className="h-24 w-auto object-contain" />
        </a>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-widest uppercase text-center" style={{ color: brandColors.slate }}>
          Pure Apex Pulse
        </h1>
        <p className="text-xs tracking-[0.3em] font-bold uppercase mt-2" style={{ color: brandColors.teal }}>
          Digital Leverage & Programmatic Assets
        </p>
        <nav className="flex space-x-6 text-xs tracking-widest justify-center font-bold uppercase mt-8" style={{ color: '#6A7C87' }}>
          <a href="/" className="hover:text-[#426F64] transition duration-300">← RETURN TO GROUP HUB</a>
        </nav>
      </header>

      {/* The Vault: Premium Asset Showcase */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-sm font-bold tracking-[0.4em] uppercase mb-4" style={{ color: brandColors.gold }}>The Apex Vault</h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-wide uppercase" style={{ color: brandColors.slate }}>
            Engineered Systems for Capital Efficiency
          </h3>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: '#5A6C77' }}>
            Bypass the technical debt of retail software. Pure Apex Pulse licenses the exact, mechanical tracking architectures and proprietary frameworks utilized internally by our corporate desk.
          </p>
        </div>

        {/* Global Swing Matrix Product Card */}
        <div className="bg-white border-2 border-[#B9BBB7]/30 rounded-xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2 block" style={{ color: brandColors.teal }}>OFFLINE TREASURY DASHBOARD</span>
            <h4 className="text-2xl font-bold tracking-wide uppercase mb-4" style={{ color: brandColors.slate }}>
              The Global Swing Matrix
            </h4>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#5A6C77' }}>
              Institutional-grade structural discipline for the independent investor. A mechanical tracking architecture engineered to track up to 29 distinct US equity entry tranches, calculate precise percentage-based profit exits, and enforce uncompromised risk management across dual-currency portfolios.
            </p>
            <ul className="space-y-2 text-sm mb-8" style={{ color: brandColors.slate }}>
              <li className="flex items-center gap-2">
                <span style={{ color: brandColors.teal }}>✓</span> Automated +9% Exit & Stop-Loss Target Generation
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: brandColors.teal }}>✓</span> Multi-Tranche US Equity Ledger
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: brandColors.teal }}>✓</span> Automated Local Tax Provisioning
              </li>
            </ul>
            <div className="flex items-center gap-6">
              <span className="text-3xl font-bold" style={{ color: brandColors.slate }}>$49.00</span>
              <button className="px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:opacity-90 shadow-md" style={{ backgroundColor: brandColors.slate, color: '#FFFFFF' }}>
                PURCHASE BLUEPRINT
              </button>
            </div>
            <p className="mt-4 text-xs italic" style={{ color: brandColors.silver }}>
              *Secure delivery via automated digital transfer. Requires Microsoft Excel or Google Sheets.
            </p>
          </div>
          
          {/* Visual Placeholder for the Spreadsheet Cover */}
          <div className="w-full md:w-1/3 aspect-square bg-[#F5F6F3] border border-[#B9BBB7]/40 rounded-lg flex items-center justify-center shadow-inner relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-[#426F64]"></div>
             <div className="text-center px-4">
                <span className="block text-4xl mb-2" style={{ color: brandColors.slate }}>📊</span>
                <span className="text-xs font-bold tracking-widest uppercase text-[#5A6C77]">MATRIX.XLSX</span>
             </div>
          </div>
        </div>
      </section>

      {/* Free Lead Magnet: Micro-Utility Calculator */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-[#B9BBB7]/40">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-[0.4em] uppercase mb-4" style={{ color: brandColors.teal }}>Free Micro-Utility</h2>
          <h3 className="text-2xl font-bold tracking-wide uppercase" style={{ color: brandColors.slate }}>
            Corporate Transition ROI Calculator
          </h3>
          <p className="mt-4 text-base" style={{ color: '#5A6C77' }}>
            Determine the exact point at which independent practitioners bleed capital to personal income tax frameworks versus corporate holding structures.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-[#B9BBB7]/30 shadow-sm max-w-xl mx-auto">
          <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: brandColors.slate }}>
            Estimated Monthly Revenue (ZAR)
          </label>
          <input 
            type="number" 
            placeholder="e.g. 150000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full p-4 mb-6 border border-[#B9BBB7]/50 rounded bg-[#F5F6F3] focus:outline-none focus:border-[#426F64] text-lg font-bold text-center"
            style={{ color: brandColors.slate, ...timesNewRomanFont }}
          />

          {/* The fix: explicitly check that it is a number before comparing to 0 */}
          {typeof monthlyIncome === 'number' && monthlyIncome > 0 && (
            <div className="p-6 bg-[#203340] rounded-lg text-white text-center transition-all duration-500">
              <span className="block text-xs font-bold tracking-widest uppercase mb-2 text-[#B9BBB7]">Estimated Annual Capital Lost</span>
              <span className="block text-4xl font-bold tracking-wide mb-4 text-[#426F64]">
                R {lostCapital.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <p className="text-xs leading-relaxed italic text-[#B9BBB7]">
                *Calculation compares standard 45% maximum marginal individual tax against a 27% corporate tax rate over 12 months. Purely informational; consult a tax professional.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
