"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";

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
  status: "ACTIVE" | "9%_CLEARED" | "12%_CLEARED" | "STOPPED_OUT" | "CLOSED";
}

export default function GlobalSwingMatrix() {
  const [amountInvested, setAmountInvested] = useState<number>(400);
  const [ticker, setTicker] = useState<string>("SPY");
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [exchangeRate, setExchangeRate] = useState<number>(18.50);
  const [ledger, setLedger] = useState<Trade[]>([]);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (data.rates?.ZAR) {
          setExchangeRate(data.rates.ZAR);
        }
      })
      .catch((err) => console.error("Rate fetch failed", err));
  }, []);

  const logTrade = () => {
    if (!ticker || entryPrice <= 0 || amountInvested <= 0) return;
    const newTrade: Trade = {
      id: `TRD-${Date.now().toString().slice(-4)}`,
      ticker: ticker,
      entryDate: new Date().toISOString().split("T")[0],
      entryPrice: entryPrice,
      investedUSD: amountInvested,
      target9: entryPrice * 1.09,
      target12: entryPrice * 1.12,
      stopLoss5: entryPrice * 0.95,
      usdZarRate: exchangeRate,
      status: "ACTIVE",
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
          const formatted = results.data
            .map((row: any, index: number) => ({
              id: `CSV-${index}`,
              ticker: row["Ticker"],
              entryDate: row["Entry Date"],
              entryPrice: Number(row["Entry price"]),
              investedUSD: Number(row["Invested (USD)"]),
              target9: Number(row["Sell (+9%)"]),
              target12: Number(row["Entry price"]) * 1.12,
              stopLoss5: Number(row["StpLos (-5%)"]),
              exitDate: row["Exit date"],
              exitPrice: Number(row["Exit price"]),
              grossProfitUSD: Number(row["Gross profit"]),
              zarProfit: Number(row["ZAR profit "]),
              tax: Number(row["Tax"]),
              actualProfitZAR: Number(row["Actual Profit "]),
              runningProfit: Number(row["Running Profit"]),
              usdZarRate: Number(row["USD/ZAR rate "]),
              status: (row["Exit date"] ? "CLOSED" : "ACTIVE") as Trade["status"],
            }))
            .filter((t: any) => t.ticker) as Trade[];
          setLedger(formatted);
        },
      });
    }
  };

  const handleExport = () => window.print();

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-[#1C2541] print:bg-white print:text-black">
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
        <div className="mb-8 print:hidden">
          <section className="bg-[#111C3A] p-6 rounded border border-[#94A3B8]/20 max-w-5xl mx-auto">
            <div className="flex justify-between items-center border-b border-[#94A3B8]/20 pb-4 mb-6">
              <h3 className="text-[10px] font-mono text-[#FFFFFF] tracking-widest uppercase">New Trade Setup</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0
