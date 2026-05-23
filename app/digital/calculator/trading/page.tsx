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

export default function TradingPage() {
  // Initial state mimicking your March and April rows
  const [rows, setRows] = useState<LedgerRow[]>([
    { id: 1, month: "March", jseZar: 27347.83, usd: -210.03, exchangeRate: 16.47 },
    { id: 2, month: "April", jseZar: 1191.86, usd: -13566.55, exchangeRate: 16.47 },
  ]);

  // Tax calculation variables (Pink Block)
  const [donations, setDonations] = useState<number>(27800.00);
  const [taxRate, setTaxRate] = useState<number>(0.27); // Set to 27% for corporate Pty Ltd structure

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
  // Column V: Total USD
  const totalUsd = rows.reduce((acc, row) => acc + row.usd, 0);
  
  // Column U: Total US/ZAR
  const totalUsZar = rows.reduce((acc, row) => acc + (row.usd * row.exchangeRate), 0);
  
  // Column T: Total JSE ZAR
  const totalJse = rows.reduce((acc, row) => acc + row.jseZar, 0);

  // Purple Block: Net ZAR (JSE + US/ZAR)
  const netZar = totalJse + totalUsZar;

  // Pink Block: Tax Logic 
  // Calculates tax only on net profits (if > 0). Protects against taxing active trading losses.
  const totalProfit = netZar > 0 ? netZar : 0; 
  const totalTax = totalProfit * taxRate;
  const taxOwed = totalTax - donations;

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[#0a1128] text-[#e0e1dd] min-h-screen font-sans">
      <div className="mb-8 border-b border-[#c0c0c0] pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#c0c0c0] tracking-wide">TRADING LEDGER</h1>
          <p className="text-[#8d99ae] text-sm mt-1">Live Tax & Offset Calculation</p>
        </div>
        <button 
          onClick={addRow}
          className="bg-[#c0c0c0] text-[#0a1128] px-4 py-2 font-bold hover:bg-white transition shadow-[0_0_10px_rgba(192,192,192,0.2)]"
        >
          + ADD MONTH
        </button>
      </div>

      {/* Main Ledger Table */}
      <div className="overflow-x-auto mb-10 bg-[#14213d] p-1 shadow-lg border border-[#c0c0c0]/30 rounded-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[#c0c0c0] border-b border-[#c0c0c0]/30 bg-[#0a1128]">
              <th className="p-3 text-sm uppercase tracking-wider font-semibold">Month</th>
              <th className="p-3
