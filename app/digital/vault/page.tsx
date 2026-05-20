"use client";
import React, { useState } from 'react';

export default function PremiumVault() {
  const [revenue, setRevenue] = useState<number>(1800000);
  const [expenses, setExpenses] = useState<number>(400000);
  const [extraction, setExtraction] = useState<number>(600000);

  const calculate = () => {
    const netProfit = Math.max(0, revenue - expenses);
    
    // 1. Sole Proprietor Calculation
    let indTax = 0;
    if (netProfit <= 237100) indTax = netProfit * 0.18;
    else if (netProfit <= 370500) indTax = 42678 + (netProfit - 237100) * 0.26;
    else if (netProfit <= 512800) indTax = 77362 + (netProfit - 370500) * 0.31;
    else if (netProfit <= 673000) indTax = 121475 + (netProfit - 512800) * 0.36;
    else if (netProfit <= 857900) indTax = 179147 + (netProfit - 673000) * 0.39;
    else if (netProfit <= 1817000) indTax = 251258 + (netProfit - 857900) * 0.41;
    else indTax = 644489 + (netProfit - 1817000) * 0.45;
    const solePropTax = Math.max(0, indTax - 17224);

    // 2. Corporate Entity Calculation
    const corpTax = netProfit * 0.27;
    const grossDiv = extraction / 0.8;
    const dwt = grossDiv * 0.20;
    const totalCorpBurden = corpTax + dwt;

    return { solePropTax, corpTax, dwt, totalCorpBurden, diff: solePropTax - totalCorpBurden };
  };

  const results = calculate();

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] p-8">
      <header className="mb-12 border-b border-[#10B981]/20 pb-8">
        <h1 className="text-3xl font-serif text-[#FFFDF0]">ENTITY STRUCTURAL AUDIT</h1>
        <p className="text-xs font-mono text-[#10B981]">SIDE-BY-SIDE TAX IMPACT ANALYSIS</p>
      </header>

      <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* Sole Prop Column */}
        <div className="bg-[#021A0E] p-8 rounded-xl border border-[#EF4444]/30">
          <h2 className="text-lg font-bold text-[#EF4444] mb-6">SOLE PROPRIETOR</h2>
          <div className="space-y-4 text-[#F5D36B]">
            <div className="flex justify-between"><span>Taxable Profit</span><span>R {(revenue - expenses).toLocaleString()}</span></div>
            <div className="flex justify-between border-b border-[#10B981]/20 pb-4"><span>SARS Progressive Tax</span><span className="text-[#FFFDF0]">R {results.solePropTax.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-[#FFFDF0] pt-4"><span>TOTAL TAX BURDEN</span><span>R {results.solePropTax.toLocaleString()}</span></div>
          </div>
        </div>

        {/* Corporate Column */}
        <div className="bg-[#021A0E] p-8 rounded-xl border border-[#10B981]/30">
          <h2 className="text-lg font-bold text-[#10B981] mb-6">CORPORATE ENTITY (PTY)</h2>
          <div className="space-y-4 text-[#F5D36B]">
            <div className="flex justify-between"><span>Corporate Tax (27%)</span><span>R {results.corpTax.toLocaleString()}</span></div>
            <div className="flex justify-between border-b border-[#10B981]/20 pb-4"><span>Dividend Withholding (20%)</span><span>R {results.dwt.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-[#FFFDF0] pt-4"><span>TOTAL TAX BURDEN</span><span>R {results.totalCorpBurden.toLocaleString()}</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 p-8 bg-[#10B981]/10 border border-[#10B981] rounded-xl text-center">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#10B981] mb-2">Structural Efficiency Verdict</h3>
        <p className="text-xl text-[#FFFDF0]">{results.diff > 0 ? `Switching to a Corporate Entity saves you R ${results.diff.toLocaleString()}` : `Sole Proprietor path is currently more efficient by R ${Math.abs(results.diff).toLocaleString()}`}</p>
      </div>
    </div>
  );
}
