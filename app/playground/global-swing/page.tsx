"use client";
import React, { useState } from 'react';

// Definitions remain unchanged to maintain your data integrity
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
  const [ledger, setLedger] = useState<Trade[]>([]);

  // Telemetry Calculations
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
      id: `TRD-${Date.now().toString().slice(-4)}`,
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
    setLedger(ledger.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans p-8">
      {/* Header & Inputs Area */}
      <header className="mb-12 border-b border-[#94A3B8]/20 pb-8">
        <h1 className="text-2xl font-serif text-white uppercase tracking-widest">Global Swing Matrix</h1>
        <p className="text-[10px] font-mono text-[#94A3B8] uppercase">Institutional Capital Allocation Sandbox</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Input Control */}
        <div className="bg-[#111C3A] p-6 rounded border border-[#94A3B8]/20">
          <h2 className="text-xs font-mono uppercase text-white mb-4">Operational Inputs</h2>
          <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className="w-full p-2 bg-[#0A1128] border border-[#94A3B8]/30 text-white mb-4" placeholder="Total Capital" />
          <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} className="w-full p-2 bg-[#0A1128] border border-[#94A3B8]/30 text-white mb-4" placeholder="Ticker" />
          <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} className="w-full p-2 bg-[#0A1128] border border-[#94A3B8]/30 text-white mb-4" placeholder="Entry Price" />
          <button onClick={logTrade} className="w-full bg-[#10B981]/20 border border-[#10B981] py-2 text-[#10B981] hover:bg-[#10B981] hover:text-white uppercase text-xs font-bold transition">Commit Trade</button>
        </div>

        {/* Telemetry Display */}
        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111C3A] p-6 rounded border border-[#94A3B8]/20">
              <span className="text-[10px] text-[#94A3B8] uppercase">Core Defensive (80%)</span>
              <p className="text-2xl font-serif text-white">{coreAllocation.toLocaleString()}</p>
            </div>
            <div className="bg-[#1C2541] p-6 rounded border border-[#94A3B8]/20">
              <span className="text-[10px] text-[#E2E8F0] uppercase">Active Swing (20%)</span>
              <p className="text-2xl font-serif text-white">{swingAllocation.toLocaleString()}</p>
              <p className="text-[9px] text-[#94A3B8] font-mono">Units: {shares}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add your Ledger table here using the same structure as your existing code */}
    </div>
  );
}
