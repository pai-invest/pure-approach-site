"use client";
import React, { useState } from 'react';

interface PurificationRecord {
  id: string;
  date: string;
  assetTicker: string;
  grossDividend: number;
  cleansedAmount: number;
  liabilityAmount: number;
  status: 'PENDING' | 'CLEANSED';
}

export default function PurificationLedger() {
  const [ticker, setTicker] = useState<string>("AAPL");
  const [dividend, setDividend] = useState<number>(10000);
  const [ratio, setRatio] = useState<number>(4.5);
  const [records, setRecords] = useState<PurificationRecord[]>([
    { id: "PF-001", date: "2026-05-15", assetTicker: "JSE:AGL", grossDividend: 5000, cleansedAmount: 4775, liabilityAmount: 225, status: 'CLEANSED' }
  ]);

  const commitRecord = () => {
    const liability = dividend * (ratio / 100);
    const cleansed = dividend - liability;
    const newRecord: PurificationRecord = {
      id: `PF-00${records.length + 2}`,
      date: new Date().toISOString().split('T')[0],
      assetTicker: ticker,
      grossDividend: dividend,
      cleansedAmount: cleansed,
      liabilityAmount: liability,
      status: 'PENDING'
    };
    setRecords([newRecord, ...records]);
  };

  const markCleansed = (id: string) => {
    setRecords(records.map(r => r.id === id ? { ...r, status: 'CLEANSED' } : r));
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans">
      <header className="max-w-7xl mx-auto px-8 py-10 border-b border-[#94A3B8]/20">
        <h1 className="text-2xl font-serif text-[#FFFFFF] uppercase tracking-wide">Purification Ledger</h1>
        <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mt-1">Philanthropic Distribution // Compliance Audit</p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        {/* Entry Module */}
        <section className="bg-[#111C3A] p-8 rounded border border-[#94A3B8]/20 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="text-[9px] uppercase tracking-widest text-[#94A3B8] mb-2 block">Ticker</label>
            <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-white font-mono" />
          </div>
          <div>
            <label className="text-[9px] uppercase tracking-widest text-[#94A3B8] mb-2 block">Gross Dividend</label>
            <input type="number" value={dividend} onChange={(e) => setDividend(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-white font-mono" />
          </div>
          <div>
            <label className="text-[9px] uppercase tracking-widest text-[#94A3B8] mb-2 block">Ratio (%)</label>
            <input type="number" value={ratio} onChange={(e) => setRatio(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-white font-mono" />
          </div>
          <button onClick={commitRecord} className="bg-[#E2E8F0] text-[#0A1128] py-3 font-bold uppercase text-xs tracking-widest hover:bg-white transition">
            Commit to Ledger
          </button>
        </section>

        {/* The Ledger */}
        <section className="bg-[#111C3A] border border-[#94A3B8]/20 rounded-xl overflow-hidden">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-[#1C2541] text-[9px] text-[#94A3B8] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Ticker</th>
                <th className="px-6 py-4">Gross</th>
                <th className="px-6 py-4 text-[#10B981]">Cleansed</th>
                <th className="px-6 py-4 text-[#F5D36B]">Liability</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#94A3B8]/10">
              {records.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4 text-[#94A3B8]">{r.date}</td>
                  <td className="px-6 py-4 font-bold">{r.assetTicker}</td>
                  <td className="px-6 py-4">{r.grossDividend.toLocaleString()}</td>
                  <td className="px-6 py-4 text-[#10B981]">{r.cleansedAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-[#F5D36B]">{r.liabilityAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    {r.status === 'PENDING' ? (
                      <button onClick={() => markCleansed(r.id)} className="text-[9px] uppercase border border-[#F5D36B] text-[#F5D36B] px-3 py-1 hover:bg-[#F5D36B] hover:text-[#032213]">Mark Cleansed</button>
                    ) : (
                      <span className="text-[9px] uppercase text-[#10B981]">✓ Cleansed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
