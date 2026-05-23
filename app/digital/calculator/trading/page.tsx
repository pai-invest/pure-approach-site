"use client";

import React, { useState } from "react";

// TypeScript interface for the ledger rows
interface LedgerRow {
  id: number;
  month: string;
  jseZar: number;
  usd: number;
  exchangeRate: number;
}

export default function TradingCalculatorPage() {
  // Initial state tracking March and April
  const [rows, setRows] = useState<LedgerRow[]>([
    { id: 1, month: "March", jseZar: 27347.83, usd: -210.03, exchangeRate: 16.47 },
    { id: 2, month: "April", jseZar: 1191.86, usd: -13566.55, exchangeRate: 16.47 },
  ]);

  // Tax calculation variables (Light Blue / Pink Section)
  const [taxRate, setTaxRate] = useState<number>(0.27); // 27% Corporate Rate
  const [donations, setDonations] = useState<number>(27800.00);
  const [medicalOffset, setMedicalOffset] = useState<number>(0);
  const [raOffset, setRaOffset] = useState<number>(0);

  // Handlers for input changes with strict typing
  const handleRowChange = (id: number, field: keyof LedgerRow, value: string) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          [field]: field === "month" ? value : parseFloat(value) || 0
        };
      }
      return row;
    }));
  };

  const addRow = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    setRows([...rows, { id: newId, month: "New Month", jseZar: 0, usd: 0, exchangeRate: 18.80 }]);
  };

  // --- Calculations ---
  // Core Totals
  const totalUsd = rows.reduce((acc, row) => acc + row.usd, 0);
  const totalUsZar = rows.reduce((acc, row) => acc + (row.usd * row.exchangeRate), 0);
  const totalJse = rows.reduce((acc, row) => acc + row.jseZar, 0);
  const netZar = totalJse + totalUsZar;

  // Month-over-Month Automations
  const getRowNet = (index: number) => {
    if (index < 0 || index >= rows.length) return 0;
    const row = rows[index];
    return row.jseZar + (row.usd * row.exchangeRate);
  };
  
  const thisMonthProfit = getRowNet(rows.length - 1);
  const lastMonthProfit = getRowNet(rows.length - 2);

  // Tax Logic (Mimicking your spreadsheet's direct offset logic)
  const totalTaxableProfit = netZar > 0 ? netZar : 0; 
  const grossTax = totalTaxableProfit * taxRate;
  const totalOffsets = donations + medicalOffset + raOffset;
  const taxOwed = grossTax - totalOffsets;

  return (
    <>
      <div className="p-6 md:p-10 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
        <div className="mb-8 border-b border-[#c0c0c0]/30 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#c0c0c0] tracking-wide">MASTER TRADING LEDGER</h1>
            <p className="text-[#8d99ae] text-sm mt-1">Full Performance & Tax Calculation Engine</p>
          </div>
          <button 
            onClick={addRow}
            className="bg-[#c0c0c0] text-[#0a1128] px-5 py-2 font-bold hover:bg-white transition shadow-[0_0_15px_rgba(192,192,192,0.15)] rounded-sm"
          >
            + ADD MONTH
          </button>
        </div>

        {/* Main Ledger Table */}
        <div className="overflow-x-auto mb-10 bg-[#14213d] p-1 shadow-lg border border-[#c0c0c0]/20 rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#c0c0c0] border-b border-[#c0c0c0]/20 bg-[#0a1128]">
                <th className="p-4 text-xs uppercase tracking-widest font-semibold">Month</th>
                <th className="p-4 text-xs uppercase tracking-widest font-semibold">Column T: JSE (ZAR)</th>
                <th className="p-4 text-xs uppercase tracking-widest font-semibold text-blue-400">Column V: USD P/L</th>
                <th className="p-4 text-xs uppercase tracking-widest font-semibold">Exch. Rate</th>
                <th className="p-4 text-xs uppercase tracking-widest font-semibold">Column U: US/ZAR</th>
                <th className="p-4 text-xs uppercase tracking-widest font-semibold text-purple-400">Net Month (ZAR)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const usZar = row.usd * row.exchangeRate;
                const netMonth = row.jseZar + usZar;
                return (
                  <tr key={row.id} className="border-b border-[#c0c0c0]/5 hover:bg-[#1f2f54]/40 transition">
                    <td className="p-4">
                      <input 
                        type="text" 
                        value={row.month} 
                        onChange={(e) => handleRowChange(row.id, "month", e.target.value)}
                        className="bg-transparent border-b border-[#8d99ae]/50 text-[#e0e1dd] w-24 focus:outline-none focus:border-[#c0c0c0] py-1"
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="number" 
                        value={row.jseZar} 
                        onChange={(e) => handleRowChange(row.id, "jseZar", e.target.value)}
                        className="bg-[#0a1128] border border-[#c0c0c0]/20 p-2 w-full max-w-[140px] focus:outline-none focus:border-[#c0c0c0]/60 rounded-sm"
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="number" 
                        value={row.usd} 
                        onChange={(e) => handleRowChange(row.id, "usd", e.target.value)}
                        className="bg-[#0a1128] border border-blue-500/30 p-2 w-full max-w-[140px] focus:outline-none focus:border-blue-400 text-blue-300 rounded-sm"
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="number" 
                        step="0.01"
                        value={row.exchangeRate} 
                        onChange={(e) => handleRowChange(row.id, "exchangeRate", e.target.value)}
                        className="bg-[#0a1128] border border-[#c0c0c0]/20 p-2 w-24 focus:outline-none focus:border-[#c0c0c0]/60 rounded-sm"
                      />
                    </td>
                    <td className={`p-4 font-mono text-sm ${usZar < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      R {usZar.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className={`p-4 font-mono font-bold text-sm ${netMonth < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      R {netMonth.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Blocks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Light Blue Block: Full Tax Calculation */}
          <div className="bg-[#081b2e] border border-sky-800 p-6 shadow-[0_4px_20px_rgba(14,165,233,0.08)] rounded-sm flex flex-col">
            <h3 className="text-sky-400 font-bold mb-4 border-b border-sky-900/60 pb-2 uppercase tracking-widest text-sm flex justify-between">
              <span>Tax Calculations</span>
              <span className="text-sky-700 font-normal">Light Blue Sec.</span>
            </h3>
            
            <div className="space-y-4 text-sm font-mono text-sky-100 flex-grow">
              
              {/* Profit Tracking */}
              <div className="bg-sky-950/40 p-3 rounded-sm border border-sky-900/30 space-y-2">
                <div className="flex justify-between items-center text-sky-300">
                  <span>Total Net Profit:</span>
                  <span className="font-bold">R {totalTaxableProfit.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-sky-500/80 text-xs">
                  <span>Last Month Profit:</span>
                  <span>R {lastMonthProfit.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-sky-400/90 text-xs">
                  <span>This Month Profit:</span>
                  <span>R {thisMonthProfit.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Tax Rate & Base */}
              <div className="flex justify-between items-center pt-2">
                <span>Tax Rate (%):</span>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    step="0.01"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="bg-[#0a1128] border border-sky-800/80 p-1.5 w-20 text-right focus:outline-none focus:border-sky-400 text-sky-100 rounded-sm"
                  />
                </div>
              </div>
              <div className="flex justify-between font-bold text-sky-300">
                <span>Gross Tax:</span>
                <span>R {grossTax.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
              </div>

              {/* Editable Offsets */}
              <div className="pt-3 border-t border-sky-900/50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sky-200/70">Donations:</span>
                  <input 
                    type="number" 
                    value={donations}
                    onChange={(e) => setDonations(parseFloat(e.target.value) || 0)}
                    className="bg-[#0a1128] border border-sky-800/80 p-1.5 w-28 text-right focus:outline-none focus:border-sky-400 text-sky-100 rounded-sm"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sky-200/70">Medical Aid:</span>
                  <input 
                    type="number" 
                    value={medicalOffset}
                    onChange={(e) => setMedicalOffset(parseFloat(e.target.value) || 0)}
                    className="bg-[#0a1128] border border-sky-800/80 p-1.5 w-28 text-right focus:outline-none focus:border-sky-400 text-sky-100 rounded-sm"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sky-200/70">Retirement (RA):</span>
                  <input 
                    type="number" 
                    value={raOffset}
                    onChange={(e) => setRaOffset(parseFloat(e.target.value) || 0)}
                    className="bg-[#0a1128] border border-sky-800/80 p-1.5 w-28 text-right focus:outline-none focus:border-sky-400 text-sky-100 rounded-sm"
                  />
                </div>
              </div>
              
              {/* Final Output */}
              <div className="flex justify-between font-bold text-lg text-white pt-4 border-t border-sky-700/80 mt-4 bg-sky-900/20 -mx-6 px-6 pb-2">
                <span className="pt-2">Tax Owed:</span>
                <span className={`pt-2 ${taxOwed <= 0 ? "text-green-400" : "text-red-400"}`}>
                  R {taxOwed.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Blue Block: USD Summary */}
          <div className="bg-[#0d162b] border border-blue-900/80 p-6 shadow-[0_4px_20px_rgba(59,130,246,0.06)] flex flex-col justify-center rounded-sm">
            <h3 className="text-blue-400 font-bold mb-6 border-b border-blue-900/50 pb-2 uppercase tracking-widest text-sm text-center">US Market (Blue Block)</h3>
            <div className="text-center space-y-6">
              <div>
                <p className="text-[#8d99ae] text-xs uppercase tracking-widest mb-2">Total USD P/L</p>
                <p className={`text-4xl font-mono font-bold ${totalUsd < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  $ {totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="pt-6 border-t border-blue-900/30">
                <p className="text-[#8d99ae] text-xs uppercase tracking-widest mb-2">ZAR Conversion</p>
                <p className={`text-2xl font-mono ${totalUsZar < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  R {totalUsZar.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Purple Block: Net Combined ZAR */}
          <div className="bg-[#120f1a] border border-purple-900/80 p-6 shadow-[0_4px_20px_rgba(168,85,247,0.06)] flex flex-col justify-center rounded-sm">
            <h3 className="text-purple-400 font-bold mb-6 border-b border-purple-900/50 pb-2 uppercase tracking-widest text-sm text-center">Total Performance (Purple)</h3>
            <div className="text-center space-y-5">
              <div className="flex justify-between text-sm text-[#8d99ae] font-mono px-2 bg-purple-950/20 p-2 rounded-sm border border-purple-900/20">
                <span>Total JSE:</span>
                <span className="text-[#e0e1dd]">R {totalJse.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-[#8d99ae] font-mono px-2 bg-purple-950/20 p-2 rounded-sm border border-purple-900/20">
                <span>Total US/ZAR:</span>
                <span className="text-[#e0e1dd]">R {totalUsZar.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-6 border-t border-purple-900/40">
                <p className="text-[#c0c0c0] text-xs uppercase tracking-widest mb-3 font-semibold">Net ZAR Portfolio</p>
                <p className={`text-4xl lg:text-5xl font-mono font-bold ${netZar < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  R {netZar.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
