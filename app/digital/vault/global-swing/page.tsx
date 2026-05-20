"use client";
import React, { useState } from 'react';

interface Trade {
  id: string;
  date: string;
  ticker: string;
  entryPrice: number;
  capitalAllocated: number;
  target9: number;
  target12: number;
  status: 'ACTIVE' | '9%_CLEARED' | '12%_CLEARED';
}

export default function GlobalSwingMatrix() {
  const [capital, setCapital] = useState<number>(100000);
  const [ticker, setTicker] = useState<string>("SPY");
  const [entryPrice, setEntryPrice] = useState<number>(500);

  const [ledger, setLedger] = useState<Trade[]>([
    {
      id: "TRD-001",
      date: "2026-05-18",
      ticker: "QQQ",
      entryPrice: 450.00,
      capitalAllocated: 20000,
      target9: 490.50,
      target12: 504.00,
      status: 'ACTIVE'
    }
  ]);

  const coreAllocation = capital * 0.80;
  const swingAllocation = capital * 0.20;
  const shares = entryPrice > 0 ? Math.floor(swingAllocation / entryPrice) : 0;
  const actualInvested = shares * entryPrice;
  const globalSwing9 = entryPrice * 1.09;
  const profitSwing12 = entryPrice * 1.12;
  const yield9 = actualInvested * 0.09;
  const yield12 = actualInvested * 0.12;

  const logTrade = () => {
    if (!ticker || entryPrice <= 0 || actualInvested <= 0) return;
    const newTrade: Trade = {
      id: `TRD-00${ledger.length + 2}`,
      date: new Date().toISOString().split('T')[0],
      ticker: ticker,
      entryPrice: entryPrice,
      capitalAllocated: actualInvested,
      target9: globalSwing9,
      target12: profitSwing12,
      status: 'ACTIVE'
    };
    setLedger([newTrade, ...ledger]);
  };

  const updateStatus = (id: string, newStatus: Trade['status']) => {
    setLedger(ledger.map(trade => trade.id === id ? { ...trade, status: newStatus } : trade));
  };

  const handleExport = () => window.print();

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-[#1C2541] print:bg-white print:text-black">
      
      {/* Risk Disclaimer Banner */}
      <div className="bg-[#EF4444]/10 border-b border-[#EF4444]/20 py-2 text-center print:hidden">
        <p className="text-[10px] uppercase tracking-widest text-[#EF4444] font-bold">CAPITAL RISK PROTOCOL: MARKET VOLATILITY ACTIVE // EXECUTE AT DISCRETION</p>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-8 py-10 flex justify-between items-center border-b border-[#94A3B8]/20 print:hidden">
        <div>
          <h1 className="text-2xl font-serif text-[#FFFFFF] tracking-wide uppercase">Global Swing Matrix</h1>
          <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mt-1">Capital Allocation & Execution Ledger // 2026</p>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={handleExport} className="bg-[#E2E8F0] text-[#0A1128] px-6 py-2 font-bold uppercase tracking-widest text-xs hover:bg-[#FFFFFF] transition">
            Export Ledger PDF
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></span>
            <span className="text-xs font-mono tracking-widest text-[#94A3B8]">SYS_ONLINE</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        
        {/* 1. OPERATIONAL MANDATE (PURPOSE) */}
        <section className="bg-[#111C3A] p-8 border border-[#E2E8F0]/20 rounded-xl print:hidden">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#E2E8F0] mb-2">Operational Mandate: System Purpose</h2>
            <p className="text-sm font-light text-[#94A3B8] leading-relaxed">
                This matrix is a proprietary algorithmic tracking system designed to enforce the **Barbell Strategy** for capital allocation. It mathematically isolates your 80% defensive core from your 20% active swing capital, while establishing automated, emotionless execution telemetry for the **9% Global Swing** and **12% Profit Swing** market frameworks.
            </p>
        </section>

        {/* 2. CALCULATOR & TELEMETRY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <section className="md:col-span-4 bg-[#111C3A] p-8 rounded border border-[#94A3B8]/20 print:hidden">
            <h3 className="text-xs font-mono mb-6 text-[#FFFFFF] tracking-widest uppercase border-b border-[#94A3B8]/20 pb-4">Operational Inputs</h3>
            
            <div className="mb-5">
              <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Total Capital Base</label>
              <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] font-serif focus:border-[#E2E8F0] outline-none transition" />
            </div>
            <div className="mb-5">
              <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Asset Ticker</label>
              <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] font-serif uppercase focus:border-[#E2E8F0] outline-none transition" />
            </div>
            <div className="mb-8">
              <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Entry Price</label>
              <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] font-serif focus:border-[#E2E8F0] outline-none transition" />
            </div>

            <button onClick={logTrade} className="w-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#10B981] hover:text-[#0A1128] transition">
              Commit to Ledger
            </button>
          </section>

          <section className="md:col-span-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
               <div className="p-6 border border-[#94A3B8]/20 bg-[#111C3A] rounded print:border-black">
                  <span className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Core Defensive Allocation (80%)</span>
                  <p className="text-3xl text-[#FFFFFF] font-serif mt-2 print:text-black">{coreAllocation.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
               </div>
               <div className="p-6 border border-[#E2E8F0]/30 bg-[#1C2541] rounded print:border-black print:bg-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#E2E8F0] print:text-black">Active Swing Capital (20%)</span>
                  <p className="text-3xl text-[#FFFFFF] font-serif mt-2 print:text-black">{swingAllocation.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  <p className="text-[10px] font-mono text-[#94A3B8] mt-2 uppercase print:text-gray-600">Sizing: {shares} Units @ {entryPrice}</p>
               </div>
            </div>

            <div className="bg-[#111C3A] border border-[#94A3B8]/20 rounded p-8 flex gap-12 print:border-black print:bg-white">
                <div className="flex-1 border-r border-[#94A3B8]/10 pr-8">
                    <h4 className="text-sm font-serif text-[#E2E8F0] mb-1 print:text-black">9% Global Swing</h4>
                    <p className="text-[9px] font-mono text-[#94A3B8] uppercase mb-4 print:text-gray-600">Primary Liquidity Target</p>
                    <p className="text-2xl font-bold text-[#FFFFFF] print:text-black">{globalSwing9.toFixed(2)}</p>
                    <p className="text-[10px] text-[#10B981] font-mono mt-1">+ {yield9.toLocaleString(undefined, { minimumFractionDigits: 2 })} Yield</p>
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-serif text-[#E2E8F0] mb-1 print:text-black">12% Profit Swing</h4>
                    <p className="text-[9px] font-mono text-[#94A3B8] uppercase mb-4 print:text-gray-600">Secondary Momentum Target</p>
                    <p className="text-2xl font-bold text-[#FFFFFF] print:text-black">{profitSwing12.toFixed(2)}</p>
                    <p className="text-[10px] text-[#10B981] font-mono mt-1">+ {yield12.toLocaleString(undefined, { minimumFractionDigits: 2 })} Yield</p>
                </div>
            </div>
          </section>
        </div>

        {/* 3. THE LEDGER */}
        <section className="bg-[#111C3A] border border-[#94A3B8]/20 rounded-xl overflow-hidden print:border-black print:bg-white">
          <div className="p-6 border-b border-[#94A3B8]/20 bg-[#0A1128] flex justify-between items-center print:bg-white">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[#FFFFFF] print:text-black">Active Trade Ledger</h3>
            <span className="text-[10px] font-mono text-[#94A3B8] print:text-gray-600">RECORD_COUNT: {ledger.length}</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono">
              <thead className="text-[9px] text-[#94A3B8] uppercase tracking-widest bg-[#1C2541] print:bg-gray-100 print:text-black">
                <tr>
                  <th className="px-6 py-4 font-normal">Date</th>
                  <th className="px-6 py-4 font-normal">Ticker</th>
                  <th className="px-6 py-4 font-normal">Entry</th>
                  <th className="px-6 py-4 font-normal">Capital</th>
                  <th className="px-6 py-4 font-normal text-[#10B981] print:text-black">9% Target</th>
                  <th className="px-6 py-4 font-normal text-[#10B981] print:text-black">12% Target</th>
                  <th className="px-6 py-4 font-normal text-right">Status Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#94A3B8]/10 text-[#E2E8F0] print:text-black print:divide-gray-300">
                {ledger.map((trade) => (
                  <tr key={trade.id} className="hover:bg-[#1C2541]/50 transition print:bg-white">
                    <td className="px-6 py-4 text-[#94A3B8] print:text-gray-600">{trade.date}</td>
                    <td className="px-6 py-4 font-bold text-[#FFFFFF] print:text-black">{trade.ticker}</td>
                    <td className="px-6 py-4">{trade.entryPrice.toFixed(2)}</td>
                    <td className="px-6 py-4">{trade.capitalAllocated.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4">{trade.target9.toFixed(2)}</td>
                    <td className="px-6 py-4">{trade.target12.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={trade.status}
                        onChange={(e) => updateStatus(trade.id, e.target.value as Trade['status'])}
                        className={`bg-[#0A1128] border text-[9px] uppercase tracking-widest px-3 py-1.5 outline-none print:border-none print:text-black ${
                          trade.status === 'ACTIVE' ? 'border-[#94A3B8]/30 text-[#94A3B8]' : 'border-[#10B981]/50 text-[#10B981]'
                        }`}
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="9%_CLEARED">9% CLEARED</option>
                        <option value="12%_CLEARED">12% CLEARED</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {ledger.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#94A3B8] italic text-xs">
                      No active entries in the ledger. Commit a trade to begin tracking.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. TECHNICAL PROTOCOL (HOW TO USE) */}
        <section className="bg-[#111C3A] p-8 border border-[#94A3B8]/20 rounded-xl print:border-black print:bg-white">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#E2E8F0] mb-6 border-b border-[#94A3B8]/20 pb-6 print:text-black">Technical Protocol: Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-light text-[#94A3B8] leading-relaxed mb-4">
                <div><span className="block text-[#FFFFFF] font-bold mb-2 print:text-black">1. Capital Baseline Definition</span>Input your total investable capital base. The engine will automatically strip away 80% to protect your core, leaving exactly 20% for the aggressive swing allocation.</div>
                <div><span className="block text-[#FFFFFF] font-bold mb-2 print:text-black">2. Execution Telemetry</span>Identify your target ticker and entry price. The engine calculates the maximum safe unit size and locks in your 9% and 12% exit zones to remove subjective emotional bias.</div>
                <div><span className="block text-[#FFFFFF] font-bold mb-2 print:text-black">3. Ledger Commit & Lifecycle</span>Click "Commit to Ledger" to formalize the position. Track market resistance (e.g., using the Proven Ceiling Method) and update the ledger status once your 9% or 12% thresholds clear.</div>
            </div>
        </section>

      </main>

      {/* 5. DISCLAIMERS & FOOTER */}
      <footer className="max-w-7xl mx-auto mt-12 text-[9px] font-mono text-[#94A3B8]/40 text-center uppercase leading-loose border-t border-[#94A3B8]/10 pt-8 pb-12 print:text-black">
        <p>OPERATIONAL MANDATE: PROPRIETARY FINANCIAL DIAGNOSTIC TOOL. THIS SYSTEM IS A MATHEMATICAL SIMULATION AND DOES NOT CONSTITUTE PROFESSIONAL FINANCIAL, TAX, OR INVESTMENT ADVICE. MARKET TRADING INVOLVES SIGNIFICANT RISK OF CAPITAL LOSS. ALL ALLOCATIONS ARE EXECUTED AT YOUR OWN DISCRETION.</p>
        <p className="mt-2">© 2026 PURE APPROACH INVESTMENTS (PTY) LTD.</p>
      </footer>
    </div>
  );
}
