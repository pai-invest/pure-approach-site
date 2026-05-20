"use client";
import React, { useState } from 'react';

export default function PremiumVault() {
  const [revenue, setRevenue] = useState<number>(1800000);
  const [expenses, setExpenses] = useState<number>(400000);
  const [extraction, setExtraction] = useState<number>(600000);

  const calculateEfficiency = () => {
    const netProfit = Math.max(0, revenue - expenses);
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
    const actualGrossDividend = Math.min(extraction / 0.8, maxAvailablePostTax);
    const dividendTax = actualGrossDividend * 0.20;
    const totalCorpBurden = corpTax + dividendTax;

    return { netProfit, indTax, corpTax, dividendTax, totalCorpBurden, gain: Math.max(0, indTax - totalCorpBurden) };
  };

  const results = calculateEfficiency();

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F]">
      <div className="bg-[#EF4444]/10 border-b border-[#EF4444]/20 py-2 text-center">
        <p className="text-[10px] uppercase tracking-widest text-[#EF4444] font-bold">JURISDICTION RESTRICTED: SOUTH AFRICA (SARS) PROTOCOLS ONLY</p>
      </div>

      <header className="max-w-7xl mx-auto px-8 py-10 flex justify-between items-center border-b border-[#10B981]/20">
        <div className="flex items-center gap-4">
          <img src="/apexlogo.png" className="h-16" />
          <div>
            <h1 className="text-xl font-serif text-[#FFFDF0]">TAX EFFICIENCY MATRIX</h1>
            <p className="text-[10px] font-mono tracking-widest text-[#10B981]">GOVERNANCE // 2026_VERSION</p>
          </div>
        </div>
        <button className="bg-[#10B981] text-[#032213] px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#FFFDF0]">Export Executive PDF</button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-12 gap-12">
        {/* Mandate & Purpose */}
        <div className="col-span-12 bg-[#021A0E] border border-[#F5D36B]/20 p-8 rounded-xl mb-6">
           <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#F5D36B] mb-4">Operational Mandate</h2>
           <p className="text-sm font-light text-[#F5D36B]/80 leading-relaxed max-w-4xl">
             This Tax Efficiency Matrix is a proprietary financial diagnostic tool. Its purpose is to model how much cash you could retain by using a more efficient corporate business structure compared to personal tax filing. <strong>Users are interacting with a mathematical simulation</strong>—it is not an automated tax filer, nor does it provide legal or tax advice. 
           </p>
        </div>

        {/* Inputs */}
        <div className="col-span-4 space-y-8">
           <div className="bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20">
             <h3 className="text-xs font-mono mb-6 text-[#10B981]">OPERATIONAL INPUTS</h3>
             {['Revenue', 'Expenses', 'Extraction'].map((field) => (
                <div key={field} className="mb-6">
                  <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#10B981]/60">{field} (ZAR)</label>
                  <input type="number" value={field === 'Revenue' ? revenue : field === 'Expenses' ? expenses : extraction} onChange={(e) => field === 'Revenue' ? setRevenue(Number(e.target.value)) : field === 'Expenses' ? setExpenses(Number(e.target.value)) : setExtraction(Number(e.target.value))} className="w-full p-3 bg-[#032213] border border-[#10B981]/30 text-[#FFFDF0] font-serif text-lg rounded" />
                </div>
             ))}
           </div>
        </div>

        {/* Dashboard */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-8 mb-12">
             <div className="p-8 border border-[#10B981]/30 bg-[#032213]">
                <span className="text-[10px] uppercase text-[#10B981]">Total Tax Efficiency Gain</span>
                <p className="text-4xl text-[#FFFDF0] font-serif mt-2">R {results.gain.toLocaleString()}</p>
             </div>
             <div className="p-8 border border-[#F5D36B]/30 bg-[#032213]">
                <span className="text-[10px] uppercase text-[#F5D36B]">Effective Tax Rate (Corp)</span>
                <p className="text-4xl text-[#FFFDF0] font-serif mt-2">{( (results.totalCorpBurden/results.netProfit)*100 ).toFixed(1)}%</p>
             </div>
          </div>
          <div className="h-64 w-full bg-[#021A0E] border border-[#10B981]/20 p-8 flex items-end gap-4">
             <div className="flex-1 bg-[#EF4444]/20 h-[80%] border-t border-[#EF4444]"></div>
             <div className="flex-1 bg-[#10B981]/20 h-[40%] border-t border-[#10B981]"></div>
          </div>
        </div>

        {/* How-To Protocol */}
        <div className="col-span-12 mt-12 bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/20">
          <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#10B981] mb-6">Technical Protocol: How to use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-light text-[#F5D36B]/80 leading-relaxed">
            <div><span className="block text-[#FFFDF0] font-bold mb-2">1. Data Entry</span>Input total revenue and business-related deductions (e.g., insurance, rent, depreciation, equipment).</div>
            <div><span className="block text-[#FFFDF0] font-bold mb-2">2. Extraction</span>Enter the net cash required for your personal lifestyle. This models your dividend requirements.</div>
            <div><span className="block text-[#FFFDF0] font-bold mb-2">3. Diagnosis</span>Compare personal tax burden vs corporate tax. The 'Efficiency Gain' is your net liquidity retained.</div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-[#10B981]/10 py-8 px-6 text-[9px] font-mono text-[#10B981]/40 text-center uppercase leading-loose">
        <p>OPERATIONAL MANDATE: PROPRIETARY FINANCIAL DIAGNOSTIC TOOL. THIS SYSTEM IS A MATHEMATICAL SIMULATION AND DOES NOT CONSTITUTE PROFESSIONAL ADVICE. © 2026 PURE APPROACH INVESTMENTS (PTY) LTD.</p>
      </footer>
    </div>
  );
}
