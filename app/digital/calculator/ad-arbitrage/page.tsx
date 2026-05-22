"use client";

import React, { useState } from 'react';

export default function AdArbitrageMatrix() {
  const [cpc, setCpc] = useState<number>(0.25); // Cost Per Click
  const [rpm, setRpm] = useState<number>(15.00); // Revenue Per 1,000 Visitors
  const [ctr, setCtr] = useState<number>(2.0); // Click-Through Rate
  const [pagesPerSession, setPagesPerSession] = useState<number>(1.5);

  // Logic: 
  // 1,000 visitors at CTR 2% = 20 clicks. 
  // Cost = 20 * CPC.
  // Revenue = RPM * PagesPerSession.
  const calculateMargin = () => {
    const visitors = 1000;
    const clicks = visitors * (ctr / 100);
    const totalCost = clicks * cpc;
    const totalRevenue = (visitors / 1000) * rpm * pagesPerSession;
    const profit = totalRevenue - totalCost;
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

    return { totalCost, totalRevenue, profit, roi };
  };

  const stats = calculateMargin();

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0] pb-24">
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-b border-[#10B981]/10">
        <a href="/digital/calculator" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono uppercase">
          ← Back to Utility Hub
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-3xl font-serif uppercase tracking-wider text-[#FFFDF0]">Ad Arbitrage Matrix</h1>
            <p className="mt-4 text-sm text-[#F5D36B]/70 font-light">Determine net-yield margins for programmatic pipelines.</p>
          </div>

          <div className="space-y-6 bg-[#021A0E] p-6 rounded-lg border border-[#10B981]/20">
            <div>
              <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Cost Per Click (CPC) - $</label>
              <input type="number" step="0.01" value={cpc} onChange={(e) => setCpc(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono focus:border-[#10B981]" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Rev Per Mille (RPM) - $</label>
              <input type="number" step="0.10" value={rpm} onChange={(e) => setRpm(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono focus:border-[#10B981]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">CTR (%)</label>
                <input type="number" step="0.1" value={ctr} onChange={(e) => setCtr(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono" />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[#10B981] uppercase block mb-2">Avg Page/Session</label>
                <input type="number" step="0.1" value={pagesPerSession} onChange={(e) => setPagesPerSession(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 rounded px-4 py-3 text-[#FFFDF0] font-mono" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="sticky top-12 bg-[#021A0E] p-8 md:p-12 rounded-lg border border-[#F5D36B]/20">
            <h2 className="text-xs font-mono text-[#F5D36B]/60 uppercase tracking-widest mb-8">Pipeline Performance</h2>
            <div className={`text-5xl md:text-6xl font-serif ${stats.profit >= 0 ? 'text-[#10B981]' : 'text-red-500'} mb-12`}>
              {stats.profit >= 0 ? '+' : ''}{stats.profit.toFixed(2)} <span className="text-2xl text-[#F5D36B]/50">/ 1k visitors</span>
            </div>
            <div className="grid grid-cols-2 gap-8 border-t border-[#10B981]/10 pt-8">
              <div>
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest block">ROI %</span>
                <div className="text-2xl font-mono text-[#FFFDF0] mt-2">{stats.roi.toFixed(1)}%</div>
              </div>
              <div>
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest block">Total Cost</span>
                <div className="text-2xl font-mono text-[#FFFDF0] mt-2">${stats.totalCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
