"use client";
import React, { useState } from 'react';

export default function PremiumVault() {
  const [revenue, setRevenue] = useState<number | ''>('');
  const [expenses, setExpenses] = useState<number | ''>('');
  const [extraction, setExtraction] = useState<number | ''>('');

  const calculateArbitrage = () => {
    const rev = Number(revenue) || 0;
    const exp = Number(expenses) || 0;
    const targetNetCash = Number(extraction) || 0; 
    
    const netProfit = Math.max(0, rev - exp);

    let indTax = 0;
    if (netProfit <= 237100) indTax = netProfit * 0.18;
    else if (netProfit <= 370500) indTax = 42678 + (netProfit - 237100) * 0.26;
    else if (netProfit <= 512800) indTax = 77362 + (netProfit - 370500) * 0.31;
    else if (netProfit <= 673000) indTax = 121475 + (netProfit - 512800) * 0.36;
    else if (netProfit <= 857900) indTax = 179147 + (netProfit - 673000) * 0.39;
    else if (netProfit <= 1817000) indTax = 251258 + (netProfit - 857900) * 0.41;
    else indTax = 644489 + (netProfit - 1817000) * 0.45;
    
    indTax = Math.max(0, indTax - 17224);

    const corpTax = netProfit * 0.27;
    const maxAvailablePostTax = Math.max(0, netProfit - corpTax);
    const requiredGrossDividend = targetNetCash / 0.8;
    const actualGrossDividend = Math.min(requiredGrossDividend, maxAvailablePostTax);
    const dividendTax = actualGrossDividend * 0.20;
    const totalCorpBurden = corpTax + dividendTax;

    return {
      netProfit, indTax, corpTax, dividendTax, totalCorpBurden,
      arbitrage: Math.max(0, indTax - totalCorpBurden)
    };
  };

  const results = calculateArbitrage();
  const isActive = Number(revenue) > 0;

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      <header className="max-w-6xl mx-auto px-6 py-12 border-b border-[#10B981]/10 flex justify-between items-center">
        <img src="/apexlogo.png" className="h-20 w-auto opacity-90" />
        <div className="text-xs tracking-widest font-mono border border-[#F5D36B]/30 px-3 py-1.5 bg-[#F5D36B]/10">VAULT // SECURE_ACCESS_GRANTED</div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <h1 className="text-3xl font-serif uppercase text-[#FFFDF0]">Arbitrage Matrix</h1>
          <div className="bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20">
            {['Revenue', 'Expenses', 'Extraction'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest mb-2 text-[#10B981]">{field} (ZAR)</label>
                <input type="number" onChange={(e) => field === 'Revenue' ? setRevenue(Number(e.target.value)) : field === 'Expenses' ? setExpenses(Number(e.target.value)) : setExtraction(Number(e.target.value))} className="w-full p-4 border border-[#10B981]/30 rounded bg-[#032213] text-lg font-serif text-[#FFFDF0]" />
              </div>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-7 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
          <div className="bg-[#032213] p-8 rounded-xl border border-[#F5D36B]/40 text-center mb-8">
            <span className="block text-[10px] font-mono tracking-widest uppercase mb-3 text-[#F5D36B]/80">NET CAPITAL RETAINED (THE ARBITRAGE)</span>
            <span className="block text-5xl font-serif text-[#10B981]">R {results.arbitrage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#021A0E] p-6 rounded-lg border border-[#10B981]/10">
              <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#10B981] mb-6">Timeline A: Individual</h3>
              <div className="space-y-4 text-sm font-light text-[#F5D36B]/70">
                <div className="flex justify-between"><span>SARS Progressive Tax</span><span className="text-[#EF4444]">R {results.indTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              </div>
            </div>
            <div className="bg-[#021A0E] p-6 rounded-lg border border-[#F5D36B]/20">
              <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#F5D36B] mb-6">Timeline B: Corporate</h3>
              <div className="space-y-4 text-sm font-light text-[#F5D36B]/70">
                <div className="flex justify-between"><span>Corp Tax (27%)</span><span className="text-[#FFFDF0]">R {results.corpTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                <div className="flex justify-between"><span>Dividend Tax (20%)</span><span className="text-[#FFFDF0]">R {results.dividendTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- TECHNICAL PROTOCOL SECTION --- */}
        <div className="lg:col-span-12 mt-12 bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20">
          <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#10B981] mb-6">Technical Protocol: How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-light text-[#F5D36B]/80 leading-relaxed">
            <div>
              <span className="block text-[#FFFDF0] font-bold mb-2">1. Input Configuration</span>
              Input your annual top-line revenue and total business deductions. The system generates your 'Net Taxable Profit' by subtracting operating costs, mirroring a standard P&L structure.
            </div>
            <div>
              <span className="block text-[#FFFDF0] font-bold mb-2">2. Extraction Modeling</span>
              Define your 'Target Cash Extraction'. This models the dividend cycle required to fund your lifestyle, automatically calculating the 20% Dividend Withholding Tax (DWT) via a gross-up mechanism.
            </div>
            <div>
              <span className="block text-[#FFFDF0] font-bold mb-2">3. Arbitrage Diagnosis</span>
              The matrix performs a dual-timeline stress test. Timeline A maps your profit through the SARS progressive bracket system. Timeline B applies the 27% corporate flat rate plus DWT. The resulting Arbitrage is your net retained liquidity.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
