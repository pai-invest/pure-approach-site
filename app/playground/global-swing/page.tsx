"use client";
import React, { useState } from 'react';
import Papa from 'papaparse';

interface Trade {
  ticker: string;
  entryDate: string;
  entryPrice: number;
  investedUSD: number;
  actualProfit: number;
  tax: number;
}

export default function TaxStrategistPro() {
  const [ledger, setLedger] = useState<Trade[]>([]);
  
  // Audit Calculations
  const totalProfit = ledger.reduce((acc, curr) => acc + curr.actualProfit, 0);
  const totalTax = ledger.reduce((acc, curr) => acc + curr.tax, 0);
  const runningEquity = totalProfit; // Simplified for the current ledger state

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const formatted = results.data.map((row: any) => ({
            ticker: row.Ticker,
            entryDate: row['Entry Date'],
            entryPrice: row['Entry price'],
            investedUSD: row['Invested (USD)'],
            actualProfit: row['Actual Profit '],
            tax: row['Tax']
          })).filter(t => t.ticker);
          setLedger(formatted);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#01150b] text-[#F5D36B] p-12 font-sans">
      <header className="mb-12 border-b border-[#10B981] pb-6">
        <h1 className="text-3xl font-serif uppercase tracking-widest text-[#FFFFFF]">Tax Strategist Pro</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#10B981]">Institutional Audit & Ledger Management</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Audit Summary */}
        <aside className="col-span-3 space-y-6">
          <div className="bg-[#032213] p-6 border border-[#10B981]/30">
            <h2 className="text-[10px] uppercase tracking-widest text-[#94A3B8] mb-4">Tax Audit Summary</h2>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] uppercase text-[#10B981]">Total Realized Profit (ZAR)</p>
                <p className="text-xl font-bold">{totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-[#EF4444]">Total Tax Liability (45%)</p>
                <p className="text-xl font-bold">{totalTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
          
          <label className="block bg-[#10B981] text-[#01150b] text-center py-3 font-bold uppercase cursor-pointer hover:bg-[#059669] transition">
            Import Historic CSV
            <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv" />
          </label>
        </aside>

        {/* Right: Ledger Grid */}
        <main className="col-span-9 bg-[#032213] border border-[#10B981]/30 overflow-hidden">
          <table className="w-full text-left text-xs uppercase tracking-widest">
            <thead className="bg-[#06331d] text-[#10B981]">
              <tr>
                <th className="px-6 py-4">Ticker</th>
                <th className="px-6 py-4">Entry Date</th>
                <th className="px-6 py-4">Invested (USD)</th>
                <th className="px-6 py-4 text-right">Actual Profit (ZAR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#10B981]/20">
              {ledger.map((trade, i) => (
                <tr key={i} className="hover:bg-[#06331d]/50">
                  <td className="px-6 py-4">{trade.ticker}</td>
                  <td className="px-6 py-4">{trade.entryDate}</td>
                  <td className="px-6 py-4">{trade.investedUSD}</td>
                  <td className="px-6 py-4 text-right">{trade.actualProfit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
