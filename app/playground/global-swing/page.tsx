"use client";
import React, { useState } from 'react';
import Papa from 'papaparse';

interface Trade {
  ticker: string;
  entryDate: string;
  entryPrice: number;
  target9: number;
  target12: number;
  status: 'ACTIVE' | '9%_CLEARED' | '12%_CLEARED';
}

export default function GlobalSwingMatrix() {
  const [ticker, setTicker] = useState("SPY");
  const [entryPrice, setEntryPrice] = useState(500);
  const [ledger, setLedger] = useState<Trade[]>([]);

  const logTrade = () => {
    const newTrade: Trade = {
      ticker,
      entryDate: new Date().toISOString().split('T')[0],
      entryPrice,
      target9: entryPrice * 1.09,
      target12: entryPrice * 1.12,
      status: 'ACTIVE'
    };
    setLedger([newTrade, ...ledger]);
  };

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
            target9: row['Sell (+9%)'],
            target12: row['Sell (+12%)'], // Ensure your CSV headers match
            status: 'ACTIVE'
          })).filter(t => t.ticker);
          setLedger(formatted);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] p-8 font-sans">
      <header className="mb-10 border-b border-[#10B981]/30 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-white uppercase tracking-widest">Global Swing Matrix</h1>
          <p className="text-[10px] font-mono text-[#94A3B8] uppercase">Execution Telemetry // Barbell Strategy Core</p>
        </div>
        <label className="bg-[#10B981]/10 border border-[#10B981] text-[#10B981] px-4 py-2 cursor-pointer hover:bg-[#10B981] hover:text-[#0A1128] transition uppercase text-[10px] font-bold">
          Import Historic Trades
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv" />
        </label>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Active Trade Ledger */}
        <main className="col-span-12 bg-[#111C3A] border border-[#94A3B8]/20 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs uppercase tracking-widest">
            <thead className="bg-[#1C2541] text-[#94A3B8]">
              <tr>
                <th className="px-6 py-4">Ticker</th>
                <th className="px-6 py-4">Entry</th>
                <th className="px-6 py-4 text-[#10B981]">9% Target</th>
                <th className="px-6 py-4 text-[#10B981]">12% Target</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#94A3B8]/10">
              {ledger.map((trade, i) => (
                <tr key={i} className="hover:bg-[#1C2541]/50">
                  <td className="px-6 py-4 text-white font-bold">{trade.ticker}</td>
                  <td className="px-6 py-4">{trade.entryPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">{trade.target9.toFixed(2)}</td>
                  <td className="px-6 py-4">{trade.target12.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select 
                      className="bg-transparent border border-[#10B981]/30 p-1 text-[#10B981]"
                      value={trade.status}
                      onChange={(e) => {
                        const updated = [...ledger];
                        updated[i].status = e.target.value as Trade['status'];
                        setLedger(updated);
                      }}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="9%_CLEARED">9% CLEARED</option>
                      <option value="12%_CLEARED">12% CLEARED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
