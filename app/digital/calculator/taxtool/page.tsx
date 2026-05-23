"use client";

import React, { useState, useMemo } from 'react';

// Institutional Fiscal Brackets
const BRACKETS = [
  { limit: 500000, rate: 0.18 },
  { limit: 1000000, rate: 0.25 },
  { limit: 2000000, rate: 0.30 },
  { limit: Infinity, rate: 0.40 },
];

export default function TaxTool() {
  const [gross, setGross] = useState<number>(0);

  const analysis = useMemo(() => {
    if (gross <= 0) return { tax: "0.00", net: "0.00", rate: "0.00" };
    
    let remaining = gross;
    let totalTax = 0;
    let prev = 0;

    for (const b of BRACKETS) {
      if (remaining > b.limit) {
        totalTax += (b.limit - prev) * b.rate;
        remaining -= (b.limit - prev);
        prev = b.limit;
      } else {
        totalTax += remaining * b.rate;
        break;
      }
    }
    
    return {
      tax: totalTax.toFixed(2),
      net: (gross - totalTax).toFixed(2),
      rate: ((totalTax / gross) * 100).toFixed(2)
    };
  }, [gross]);

  return (
    <div className="min-h-screen bg-[#020503] text-[#F5D36B] p-12 font-mono border-t border-[#10B981]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-l-4 border-[#10B981] pl-6">
          <h1 className="text-4xl font-serif text-white uppercase tracking-[0.2em]">TaxTool</h1>
          <p className="text-[#10B981] text-[10px] uppercase tracking-[0.3em] mt-2">Fiscal Friction Diagnostic</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Input Node */}
          <div className="bg-[#060D0A] border border-[#10B981]/40 p-8">
            <label className="block text-[10px] uppercase text-[#10B981] mb-4">Gross Annual Income</label>
            <input 
              type="number"
              className="w-full bg-transparent border-b border-[#F5D36B]/20 text-white p-2 outline-none text-2xl focus:border-[#F5D36B] transition"
              placeholder="0.00"
              onChange={(e) => setGross(Number(e.target.value))}
            />
          </div>

          {/* Diagnostic Output Node */}
          <div className="bg-[#050D08] border border-[#10B981]/20 p-8 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase text-[#10B981]">Tax Drag</span>
                <div className="text-5xl font-bold text-white">R{analysis.tax}</div>
              </div>
              <div className="grid grid-cols-2 gap-8 border-t border-[#10B981]/20 pt-6">
                <div>
                  <span className="text-[8px] uppercase text-[#F5D36B]/60">Net Yield</span>
                  <div className="text-xl text-white">R{analysis.net}</div>
                </div>
                <div>
                  <span className="text-[8px] uppercase text-[#F5D36B]/60">Effective Rate</span>
                  <div className="text-xl text-white">{analysis.rate}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
