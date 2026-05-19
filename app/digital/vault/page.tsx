"use client";
import React, { useState } from 'react';

export default function PremiumVault() {
  // Application State
  const [revenue, setRevenue] = useState<number | ''>('');
  const [expenses, setExpenses] = useState<number | ''>('');
  const [extraction, setExtraction] = useState<number | ''>('');

  // The Execution Engine (SARS Brackets & Corporate Logic)
  const calculateArbitrage = () => {
    const rev = Number(revenue) || 0;
    const exp = Number(expenses) || 0;
    const ext = Number(extraction) || 0;
    
    const netProfit = Math.max(0, rev - exp);

    // Timeline A: Individual Progressive Tax (2025/2026 Brackets)
    let indTax = 0;
    if (netProfit <= 237100) {
      indTax = netProfit * 0.18;
    } else if (netProfit <= 370500) {
      indTax = 42678 + (netProfit - 237100) * 0.26;
    } else if (netProfit <= 512800) {
      indTax = 77362 + (netProfit - 370500) * 0.31;
    } else if (netProfit <= 673000) {
      indTax = 121475 + (netProfit - 512800) * 0.36;
    } else if (netProfit <= 857900) {
      indTax = 179147 + (netProfit - 673000) * 0.39;
    } else if (netProfit <= 1817000) {
      indTax = 251258 + (netProfit - 857900) * 0.41;
    } else {
      indTax = 644489 + (netProfit - 1817000) * 0.45;
    }
    
    // Deduct Primary Rebate
    indTax = Math.max(0, indTax - 17224);

    // Timeline B: Corporate Structure
    const corpTax = netProfit * 0.27;
    
    // Cap extraction at maximum available after-tax profit to prevent negative retained earnings
    const maxExtractable = Math.max(0, netProfit - corpTax);
    const actualExtraction = Math.min(ext, maxExtractable);
    
    const dividendTax = actualExtraction * 0.20;
    const totalCorpBurden = corpTax + dividendTax;

    // The Arbitrage
    const arbitrage = indTax - totalCorpBurden;

    return {
      netProfit,
      indTax,
      corpTax,
      dividendTax,
      totalCorpBurden,
      arbitrage
    };
  };

  const results = calculateArbitrage();
  const isActive = Number(revenue) > 0;

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      
      {/* Header Area */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#10B981]/10 gap-6">
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/apexlogo.png" 
            alt="Pure Apex Pulse Logo" 
            className="h-20 sm:h-24 w-auto object-contain opacity-90"
          />
        </div>
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/digital" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono">
            ← RETURN TO DIRECTORY
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#F5D36B]/10 px-3 py-1.5 rounded border border-[#F5D36B]/30">
            <span className="w-2 h-2 rounded-full bg-[#F5D36B] shadow-[0_0_10px_#F5D36B]"></span>
            <span className="text-[#F5D36B] font-bold font-mono">VAULT // SECURE_ACCESS_GRANTED</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Input Console */}
        <div className="lg:col-span-5">
          <div className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#10B981] uppercase font-mono block mb-3">
              Application 01
            </span>
            <h1 className="text-3xl tracking-wide font-serif uppercase text-[#FFFDF0]">
              Arbitrage Matrix
            </h1>
            <p className="mt-3 text-sm text-[#F5D36B]/70 font-light leading-relaxed">
              Input top-line figures to calculate structural tax drag and corporate arbitrage yielding.
            </p>
          </div>

          <div className="bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest mb-2 text-[#10B981]">
                  Gross Annual Revenue (ZAR)
                </label>
                <input 
                  type="number" 
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full p-4 border border-[#10B981]/30 rounded bg-[#032213] focus:outline-none focus:border-[#F5D36B] text-lg font-serif text-[#FFFDF0] transition-colors"
                  placeholder="e.g. 1800000"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest mb-2 text-[#10B981]">
                  Annual Deductible Expenses
                </label>
                <input 
                  type="number" 
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="w-full p-4 border border-[#10B981]/30 rounded bg-[#032213] focus:outline-none focus:border-[#F5D36B] text-lg font-serif text-[#FFFDF0] transition-colors"
                  placeholder="e.g. 400000"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest mb-2 text-[#10B981]">
                  Target Cash Extraction (Dividends)
                </label>
                <input 
                  type="number" 
                  value={extraction}
                  onChange={(e) => setExtraction(Number(e.target.value))}
                  className="w-full p-4 border border-[#10B981]/30 rounded bg-[#032213] focus:outline-none focus:border-[#F5D36B] text-lg font-serif text-[#FFFDF0] transition-colors"
                  placeholder="e.g. 600000"
                />
                <p className="mt-2 text-[9px] font-mono text-[#10B981]/60 uppercase">
                  *Personal capital required outside the corporate structure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Dashboard */}
        <div className="lg:col-span-7">
          <div className={`h-full flex flex-col justify-center transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
            
            {/* The Arbitrage Result */}
            <div className="bg-[#032213] p-8 rounded-xl border border-[#F5D36B]/40 shadow-[0_0_30px_rgba(245,211,107,0.05)] text-center mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F5D36B] to-[#D4AF37]"></div>
              <span className="block text-[10px] font-mono tracking-widest uppercase mb-3 text-[#F5D36B]/80">Net Capital Retained (The Arbitrage)</span>
              <span className={`block text-5xl font-serif tracking-wide mb-2 ${results.arbitrage > 0 ? 'text-[#10B981] drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'text-[#EF4444]'}`}>
                R {Math.max(0, results.arbitrage).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <p className="text-[10px] font-mono text-[#F5D36B]/60 uppercase tracking-wider">
                Total Tax Saved by Utilizing Corporate Structure
              </p>
            </div>

            {/* Side by Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Timeline A */}
              <div className="bg-[#021A0E] p-6 rounded-lg border border-[#10B981]/10">
                <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#10B981] mb-6 pb-3 border-b border-[#10B981]/10">
                  Timeline A: Individual
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-light text-[#F5D36B]/70">Net Taxable Profit</span>
                    <span className="font-serif text-[#FFFDF0]">R {results.netProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-light text-[#EF4444]/80">Progressive SARS Tax</span>
                    <span className="font-serif text-[#EF4444]">R {results.indTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#10B981]/10 flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest text-[#F5D36B]/50">TOTAL LIABILITY</span>
                    <span className="font-serif font-bold text-[#EF4444] text-lg">R {results.indTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Timeline B */}
              <div className="bg-[#021A0E] p-6 rounded-lg border border-[#F5D36B]/20">
                <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#F5D36B] mb-6 pb-3 border-b border-[#10B981]/10">
                  Timeline B: Corporate
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-light text-[#F5D36B]/70">Flat Corporate Tax (27%)</span>
                    <span className="font-serif text-[#FFFDF0]">R {results.corpTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-light text-[#F5D36B]/70">Div. Withholding (20%)</span>
                    <span className="font-serif text-[#FFFDF0]">R {results.dividendTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#10B981]/10 flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest text-[#F5D36B]/50">TOTAL LIABILITY</span>
                    <span className="font-serif font-bold text-[#FFFDF0] text-lg">R {results.totalCorpBurden.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
