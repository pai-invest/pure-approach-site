"use client";
import React, { useState } from 'react';

// Ledger Data Structure
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
  // Calculator State
  const [capital, setCapital] = useState<number>(100000);
  const [ticker, setTicker] = useState<string>("SPY");
  const [entryPrice, setEntryPrice] = useState<number>(500);

  // Ledger State (Pre-populated with a structural example)
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

  // Algorithmic Calculations
  const coreAllocation = capital * 0.80;
  const swingAllocation = capital * 0.20;
  const shares = entryPrice > 0 ? Math.floor(swingAllocation / entryPrice) : 0;
  const actualInvested = shares * entryPrice;
  const globalSwing9 = entryPrice * 1.09;
  const profitSwing12 = entryPrice * 1.12;
  const yield9 = actualInvested * 0.09;
  const yield12 = actualInvested * 0.12;

  // Ledger Action: Log New Trade
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

  // Ledger Action: Update Status
  const updateStatus = (id: string, newStatus: Trade['status']) => {
    setLedger(ledger.map(trade => trade.id === id ? { ...trade, status: newStatus } : trade));
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-[#1C2541]">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-8 py-10 flex justify-between items-center border-b border-[#94A3B8]/20">
        <div>
          <h1 className="text-2xl font-serif text-[#FFFFFF] tracking-wide uppercase">Global Swing Matrix</h1>
          <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mt-1">Capital Allocation & Execution Ledger</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></span>
          <span className="text-xs font-mono tracking-widest text-[#94A3B8]">SYS_ONLINE</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        
        {/* TOP SECTION: Calculator & Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Inputs */}
          <section className="md:col-span-4 bg-[#111C3A] p-8 rounded border border-[#94A3B8]/20 shadow-xl">
            <h3 className="text-xs font-mono mb-6 text-[#FFFFFF] tracking-widest uppercase border-b border-[#94A3B8]/20 pb-4">Trade Parameters</h3>
            
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

            <button onClick={logTrade} className="w-full bg-[#E2E8F0] text-[#0A1128] py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#FFFFFF] transition">
              Commit to Ledger
            </button>
          </section>

          {/* Telemetry Dashboard */}
          <section className="md:col-span-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
               <div className="p-6 border border-[#94A3B8]/20 bg-[#111C3A] rounded">
                  <span className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Core Defensive Allocation (80%)</span>
                  <p className="text-3xl text-[#FFFFFF] font-serif mt-2">{coreAllocation.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
               </div>
               <div className="p-6 border border-[#E2E8F0]/30 bg-[#1C2541] rounded">
                  <span className="text-[10px] uppercase tracking-widest text-[#E2E8F0]">Active Swing Capital (20%)</span>
                  <p className="text-3xl text-[#FFFFFF] font-serif mt-2">{swingAllocation.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  <p className="text-[10px] font-mono text-[#94A3B8] mt-2 uppercase">Sizing: {shares} Units @ {entryPrice}</p>
               </div>
            </div>

            <div className="bg-[#111C3A] border border-[#94A3B8]/20 rounded p-8 flex gap-12">
                <div className="flex-1 border-r border-[#94A3B8]/10 pr-8">
                    <h4 className="text-sm font-serif text-[#E2E8F0] mb-1">9% Global Swing</h4>
                    <p className="text-[9px] font-mono text-[#94A3B8] uppercase mb-4">Primary Liquidity Target</p>
                    <p className="text-2xl font-bold text-[#FFFFFF]">{globalSwing9.toFixed(2)}</p>
                    <p className="text-[10px] text-[#10B981] font-mono mt-1">+ {yield9.toLocaleString(undefined, { minimumFractionDigits: 2 })} Yield</p>
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-serif text-[#E2E8F0] mb-1">12% Profit Swing</h4>
                    <p className="text-[9px] font-mono text-[#94A3B8] uppercase mb-4">Secondary Momentum Target</p>
                    <p className="text-2xl font-bold text-[#FFFFFF]">{profitSwing12.toFixed(2)}</p>
                    <p className="text-[10px] text-[#10B981] font-mono mt-1">+ {yield12.toLocaleString(undefined, { minimumFractionDigits: 2 })} Yield</p>
                </div>
            </div>
          </section>
        </div>

        {/* BOTTOM SECTION: The Ledger */}
        <section className="bg-[#111C3A] border border-[#94A3B8]/20 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#94A3B8]/20 bg-[#0A1128] flex justify-between items-center">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[#FFFFFF]">Active Trade Ledger</h3>
            <span className="text-[10px] font-mono text-[#94A3B8]">RECORD_COUNT: {ledger.length}</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono">
              <thead className="text-[9px] text-[#94A3B8] uppercase tracking-widest bg-[#1C2541]">
                <tr>
                  <th className="px-6 py-4 font-normal">Date</th>
                  <th className="px-6 py-4 font-normal">Ticker</th>
                  <th className="px-6 py-4 font-normal">Entry</th>
                  <th className="px-6 py-4 font-normal">Capital</th>
                  <th className="px-6 py-4 font-normal text-[#10B981]">9% Target</th>
                  <th className="px-6 py-4 font-normal text-[#10B981]">12% Target</th>
                  <th className="px-6 py-4 font-normal text-right">Status Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#94A3B8]/10 text-[#E2E8F0]">
                {ledger.map((trade) => (
                  <tr key={trade.id} className="hover:bg-[#1C2541]/50 transition">
                    <td className="px-6 py-4 text-[#94A3B8]">{trade.date}</td>
                    <td className="px-6 py-4 font-bold text-[#FFFFFF]">{trade.ticker}</td>
                    <td className="px-6 py-4">{trade.entryPrice.toFixed(2)}</td>
                    <td className="px-6 py-4">{trade.capitalAllocated.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4">{trade.target9.toFixed(2)}</td>
                    <td className="px-6 py-4">{trade.target12.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={trade.status}
                        onChange={(e) => updateStatus(trade.id, e.target.value as Trade['status'])}
                        className={`bg-[#0A1128] border text-[9px] uppercase tracking-widest px-3 py-1.5 outline-none ${
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

      </main>
    </div>
  );
}
