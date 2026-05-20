"use client";
import React, { useState } from 'react';

export default function PremiumVault() {
  const [revenue, setRevenue] = useState<number>(1800000);
  const [expenses, setExpenses] = useState<number>(400000);
  const [extraction, setExtraction] = useState<number>(600000);

  const calculate = () => {
    const netProfit = Math.max(0, revenue - expenses);
    let indTax = 0;
    if (netProfit <= 237100) indTax = netProfit * 0.18;
    else if (netProfit <= 370500) indTax = 42678 + (netProfit - 237100) * 0.26;
    else if (netProfit <= 512800) indTax = 77362 + (netProfit - 370500) * 0.31;
    else if (netProfit <= 673000) indTax = 121475 + (netProfit - 512800) * 0.36;
    else if (netProfit <= 857900) indTax = 179147 + (netProfit - 673000) * 0.39;
    else if (netProfit <= 1817000) indTax = 251258 + (netProfit - 857900) * 0.41;
    else indTax = 644489 + (netProfit - 1817000) * 0.45;
    const solePropTax = Math.max(0, indTax - 17224);

    const corpTax = netProfit * 0.27;
    const grossDiv = extraction / 0.8;
    const dwt = grossDiv * 0.20;
    const totalCorpBurden = corpTax + dwt;
    return { solePropTax, corpTax, dwt, totalCorpBurden, diff: solePropTax - totalCorpBurden, netProfit };
  };

  const res = calculate();
  const handleExport = () => window.print();

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] p-8 font-sans print:bg-white print:text-black">
      {/* Jurisdiction Warning */}
      <div className="bg-[#EF4444]/10 border-b border-[#EF4444]/20 py-2 text-center print:hidden">
        <p className="text-[10px] uppercase tracking-widest text-[#EF4444] font-bold">JURISDICTION RESTRICTED: SOUTH AFRICA (SARS) PROTOCOLS ONLY</p>
      </div>

      <header className="max-w-6xl mx-auto flex justify-between items-center pb-8 border-b border-[#10B981]/20 print:hidden">
        <div>
          <h1 className="text-2xl font-serif text-[#FFFDF0]">APEX GOVERNANCE AUDIT</h1>
          <p className="text-xs font-mono text-[#10B981]">TAX EFFICIENCY MATRIX // 2026</p>
        </div>
        <button onClick={handleExport} className="bg-[#10B981] text-[#032213] px-6 py-2 font-bold uppercase tracking-widest text-xs hover:bg-[#FFFDF0]">Generate PDF Audit</button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
        {/* Mandate & Inputs */}
        <section className="md:col-span-4 space-y-8">
            <div className="bg-[#021A0E] p-8 border border-[#10B981]/20 rounded-xl print:hidden">
                <h3 className="text-xs font-mono mb-6 text-[#10B981]">OPERATIONAL INPUTS</h3>
                {['Revenue', 'Expenses', 'Extraction'].map((field) => (
                    <div key={field} className="mb-4">
                    <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#10B981]/60">{field} (ZAR)</label>
                    <input type="number" value={field === 'Revenue' ? revenue : field === 'Expenses' ? expenses : extraction} onChange={(e) => field === 'Revenue' ? setRevenue(Number(e.target.value)) : field === 'Expenses' ? setExpenses(Number(e.target.value)) : setExtraction(Number(e.target.value))} className="w-full p-3 bg-[#032213] border border-[#10B981]/30 text-[#FFFDF0] font-serif rounded" />
                    </div>
                ))}
            </div>
        </section>

        {/* Comparative Audit */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="p-8 border border-[#10B981]/30 bg-[#021A0E] rounded-xl print:border-black">
                <h2 className="text-sm font-bold uppercase mb-6 text-[#10B981]">Sole Proprietor Path</h2>
                <div className="space-y-4 font-mono text-sm">
                    <div className="flex justify-between"><span>Gross Profit</span><span>R {res.netProfit.toLocaleString()}</span></div>
                    <div className="flex justify-between text-[#EF4444]"><span>SARS Tax</span><span>- R {res.solePropTax.toLocaleString()}</span></div>
                    <div className="pt-4 border-t border-[#10B981]/20 flex justify-between font-bold text-lg text-[#FFFDF0]"><span>Net Retained</span><span>R {(res.netProfit - res.solePropTax).toLocaleString()}</span></div>
                </div>
            </section>
            <section className="p-8 border border-[#F5D36B]/30 bg-[#021A0E] rounded-xl print:border-black">
                <h2 className="text-sm font-bold uppercase mb-6 text-[#F5D36B]">Corporate Entity Path</h2>
                <div className="space-y-4 font-mono text-sm">
                    <div className="flex justify-between"><span>Corp Tax (27%)</span><span>- R {res.corpTax.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Dividend Tax (20%)</span><span>- R {res.dwt.toLocaleString()}</span></div>
                    <div className="pt-4 border-t border-[#F5D36B]/20 flex justify-between font-bold text-lg text-[#FFFDF0]"><span>Net Retained</span><span>R {(res.netProfit - res.totalCorpBurden).toLocaleString()}</span></div>
                </div>
            </section>
        </div>

        {/* Strategic Protocol & Verdict */}
        <section className="md:col-span-12 bg-[#021A0E] p-8 border border-[#10B981]/20 rounded-xl print:border-black">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#10B981] mb-6">Strategic Verdict</h2>
            <p className="text-sm font-light italic text-[#F5D36B]/90 mb-8">{res.diff > 0 ? "Strategic Recommendation: The corporate structure is superior. Formalize your incorporation to capture the R " + res.diff.toLocaleString() + " efficiency gain." : "Strategic Recommendation: Your current extraction is triggering excessive tax drag. Suggest optimizing by reducing dividend dependency."}</p>
            
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#10B981] mb-6 border-t border-[#10B981]/20 pt-6">Technical Protocol: How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-light text-[#F5D36B]/80 leading-relaxed">
                <div><span className="block text-[#FFFDF0] font-bold mb-2">1. Data Entry</span>Input total revenue and business-related deductions (insurance, rent, depreciation, equipment).</div>
                <div><span className="block text-[#FFFDF0] font-bold mb-2">2. Extraction</span>Enter the net cash required for your personal lifestyle to model dividend requirements.</div>
                <div><span className="block text-[#FFFDF0] font-bold mb-2">3. Diagnosis</span>Compare the two paths. The 'Efficiency Gain' is your net liquidity retained by selecting the optimal structure.</div>
            </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 text-[9px] font-mono text-[#10B981]/40 text-center uppercase leading-loose border-t border-[#10B981]/10 pt-8">
        <p>OPERATIONAL MANDATE: PROPRIETARY FINANCIAL DIAGNOSTIC TOOL. THIS SYSTEM IS A MATHEMATICAL SIMULATION AND DOES NOT CONSTITUTE PROFESSIONAL ADVICE. © 2026 PURE APPROACH INVESTMENTS (PTY) LTD.</p>
      </footer>
    </div>
  );
}
