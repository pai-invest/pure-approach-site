"use client";
import React, { useState } from 'react';
import Papa from 'papaparse';

interface Trade {
  id: string;
  ticker: string;
  entryDate: string;
  entryPrice: number;
  investedUSD: number;
  target9: number;
  target12: number;
  stopLoss5: number;
  exitDate?: string;
  exitPrice?: number;
  grossProfitUSD?: number;
  zarProfit?: number;
  tax?: number;
  actualProfitZAR?: number;
  runningProfit?: number;
  usdZarRate: number;
  status: 'ACTIVE' | '9%_CLEARED' | '12%_CLEARED' | 'STOPPED_OUT' | 'CLOSED';
}

export default function GlobalSwingMatrix() {
  // Barbell Strategy State
  const [capital, setCapital] = useState<number>(100000);
  
  // Manual Trade Entry State
  const [ticker, setTicker] = useState<string>("SPY");
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [exchangeRate, setExchangeRate] = useState<number>(18.50);
  
  // Master Ledger
  const [ledger, setLedger] = useState<Trade[]>([]);

  // Telemetry Calculations
  const coreAllocation = capital * 0.80;
  const swingAllocation = capital * 0.20;
  const shares = entryPrice > 0 ? Math.floor(swingAllocation / entryPrice) : 0;
  const actualInvested = shares * entryPrice;

  const logTrade = () => {
    if (!ticker || entryPrice <= 0 || actualInvested <= 0) return;
    const newTrade: Trade = {
      id: `TRD-${Date.now().toString().slice(-4)}`,
      ticker: ticker,
      entryDate: new Date().toISOString().split('T')[0],
      entryPrice: entryPrice,
      investedUSD: actualInvested,
      target9: entryPrice * 1.09,
      target12: entryPrice * 1.12,
      stopLoss5: entryPrice * 0.95,
      usdZarRate: exchangeRate,
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
        skipEmptyLines: true,
        complete: (results) => {
          const formatted = results.data.map((row: any, index: number) => ({
            id: `CSV-${index}`,
            ticker: row['Ticker'],
            entryDate: row['Entry Date'],
            entryPrice: Number(row['Entry price']),
            investedUSD: Number(row['Invested (USD)']),
            target9: Number(row['Sell (+9%)']),
            target12: Number(row['Entry price']) * 1.12, // Extrapolated for active tracking
            stopLoss5: Number(row['StpLos (-5%)']),
            exitDate: row['Exit date'],
            exitPrice: Number(row['Exit price']),
            grossProfitUSD: Number(row['Gross profit']),
            zarProfit: Number(row['ZAR profit ']),
            tax: Number(row['Tax']),
            actualProfitZAR: Number(row['Actual Profit ']),
            runningProfit: Number(row['Running Profit']),
            usdZarRate: Number(row['USD/ZAR rate ']),
            status: row['Exit date'] ? 'CLOSED' : 'ACTIVE'
          })).filter(t => t.ticker); // Filter out empty spreadsheet rows
          setLedger(formatted);
        }
      });
    }
  };

  const handleExport = () => window.print();

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-[#1C2541] print:bg-white print:text-black">
      
      {/* Header */}
      <header className="max-w-[1400px] mx-auto px-8 py-8 flex justify-between items-end border-b border-[#94A3B8]/20 print:hidden">
        <div>
          <h1 className="text-2xl font-serif text-[#FFFFFF] tracking-wide uppercase">Global Swing Matrix</h1>
          <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mt-1">Unified Execution & Tax Ledger</p>
        </div>
        <div className="flex gap-4">
          <label className="bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] px-6 py-2 uppercase text-xs font-bold tracking-widest cursor-pointer hover:bg-[#10B981] hover:text-[#0A1128] transition">
            Import CSV File
            <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv" />
          </label>
          <button onClick={handleExport} className="bg-[#E2E8F0] text-[#0A1128] px-6 py-2 font-bold uppercase tracking-widest text-xs hover:bg-[#FFFFFF] transition">
            Export Report PDF
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-8 space-y-8">
        
        {/* Top Section: Inputs & Barbell Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:hidden">
          <section className="lg:col-span-4 bg-[#111C3A] p-6 rounded border border-[#94A3B8]/20">
            <h3 className="text-[10px] font-mono mb-6 text-[#FFFFFF] tracking-widest uppercase border-b border-[#94A3B8]/20 pb-4">New Trade Setup</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Capital Base</label>
                <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className="w-full p-2 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] text-sm outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">USD/ZAR Rate</label>
                <input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))} className="w-full p-2 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] text-sm outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Ticker</label>
                <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} className="w-full p-2 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] text-sm uppercase outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Entry Price</label>
                <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} className="w-full p-2 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] text-sm outline-none" />
              </div>
            </div>
            <button onClick={logTrade} className="w-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#10B981] hover:text-[#0A1128] transition">
              Commit to Ledger
            </button>
          </section>

          <section className="lg:col-span-8 grid grid-cols-2 gap-6">
             <div className="p-6 border border-[#94A3B8]/20 bg-[#111C3A] rounded flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-widest text-[#94A3B8]">Core Defensive (80%)</span>
                <p className="text-3xl text-[#FFFFFF] font-serif mt-2">{coreAllocation.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
             </div>
             <div className="p-6 border border-[#10B981]/30 bg-[#1C2541] rounded flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-widest text-[#10B981]">Active Swing (20%)</span>
                <p className="text-3xl text-[#FFFFFF] font-serif mt-2">{swingAllocation.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                <p className="text-[10px] font-mono text-[#94A3B8] mt-2 uppercase">Max Unit Sizing: {shares} Shares</p>
             </div>
          </section>
        </div>

        {/* The Unified Ledger (Horizontal Scroll for heavy data) */}
        <section className="bg-[#111C3A] border border-[#94A3B8]/20 rounded overflow-x-auto print:border-black print:bg-white">
          <table className="w-full text-left text-xs font-mono whitespace-nowrap">
            <thead className="text-[9px] text-[#94A3B8] uppercase tracking-widest bg-[#1C2541] print:bg-gray-100 print:text-black border-b border-[#94A3B8]/20">
              <tr>
                <th className="px-4 py-3 font-normal">Ticker</th>
                <th className="px-4 py-3 font-normal">Entry Date</th>
                <th className="px-4 py-3 font-normal">Invested ($)</th>
                <th className="px-4 py-3 font-normal text-yellow-500">Entry</th>
                <th className="px-4 py-3 font-normal text-[#10B981]">9% Target</th>
                <th className="px-4 py-3 font-normal text-[#10B981]">12% Target</th>
                <th className="px-4 py-3 font-normal text-red-500">-5% Stop</th>
                <th className="px-4 py-3 font-normal border-l border-[#94A3B8]/20">Exit Price</th>
                <th className="px-4 py-3 font-normal text-red-400">Tax (45%)</th>
                <th className="px-4 py-3 font-normal text-[#10B981]">Actual (ZAR)</th>
                <th className="px-4 py-3 font-normal">Running Total</th>
                <th className="px-4 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#94A3B8]/10 text-[#E2E8F0] print:text-black">
              {ledger.map((trade) => (
                <tr key={trade.id} className="hover:bg-[#1C2541]/50 transition">
                  <td className="px-4 py-4 font-bold text-white">{trade.ticker}</td>
                  <td className="px-4 py-4 text-[#94A3B8]">{trade.entryDate}</td>
                  <td className="px-4 py-4">{trade.investedUSD?.toFixed(2)}</td>
                  <td className="px-4 py-4 text-yellow-500/80">{trade.entryPrice?.toFixed(2)}</td>
                  <td className="px-4 py-4 text-[#10B981]/80">{trade.target9?.toFixed(2)}</td>
                  <td className="px-4 py-4 text-[#10B981]/80">{trade.target12?.toFixed(2)}</td>
                  <td className="px-4 py-4 text-red-500/80">{trade.stopLoss5?.toFixed(2)}</td>
                  <td className="px-4 py-4 border-l border-[#94A3B8]/20">{trade.exitPrice ? trade.exitPrice.toFixed(2) : '---'}</td>
                  <td className="px-4 py-4 text-red-400">{trade.tax ? trade.tax.toFixed(2) : '---'}</td>
                  <td className="px-4 py-4 text-[#10B981] font-bold">{trade.actualProfitZAR ? trade.actualProfitZAR.toFixed(2) : '---'}</td>
                  <td className="px-4 py-4">{trade.runningProfit ? trade.runningProfit.toLocaleString() : '---'}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-[8px] uppercase tracking-widest border ${
                      trade.status === 'ACTIVE' ? 'border-[#94A3B8] text-[#94A3B8]' : 
                      trade.status === 'CLOSED' ? 'border-blue-500 text-blue-500' : 'border-[#10B981] text-[#10B981]'
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
              {ledger.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-6 py-12 text-center text-[#94A3B8] italic text-xs">
                    SYSTEM IDLE: Import SARS.csv or commit a new trade to populate the unified matrix.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
