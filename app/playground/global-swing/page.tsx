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
  const [sellInputs, setSellInputs] = useState<Record<string, string>>({});

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

  const handleSell = (id: string, exitPriceVal: number) => {
    if (!exitPriceVal || exitPriceVal <= 0) return;

    setLedger((prevLedger) => {
      const maxRunning = prevLedger.reduce((max, t) => Math.max(max, t.runningProfit || 0), 0);

      return prevLedger.map((trade) => {
        if (trade.id === id) {
          const grossProfitUSD = (exitPriceVal / trade.entryPrice * trade.investedUSD) - trade.investedUSD;
          const zarProfit = grossProfitUSD * trade.usdZarRate;
          const actualProfitZAR = zarProfit;
          const newRunning = maxRunning + actualProfitZAR;

          return {
            ...trade,
            exitDate: new Date().toISOString().split("T")[0],
            exitPrice: exitPriceVal,
            grossProfitUSD,
            zarProfit,
            actualProfitZAR,
            runningProfit: newRunning,
            status: "CLOSED",
          };
        }
        return trade;
      });
    });

    const newInputs = { ...sellInputs };
    delete newInputs[id];
    setSellInputs(newInputs);
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
          <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mt-1">Unified Execution Ledger</p>
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
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></span>
                <span className="text-[9px] text-[#10B981] font-mono tracking-widest uppercase">Live ZAR Feed Active</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Invested (USD)</label>
                <input type="number" value={amountInvested} onChange={(e) => setAmountInvested(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] text-sm outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Ticker</label>
                <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] text-sm uppercase outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#94A3B8]">Entry Price</label>
                <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] text-sm outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-2 text-[#10B981]">USD/ZAR Rate</label>
                <input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))} className="w-full p-3 bg-[#0A1128] border border-[#10B981]/50 text-[#10B981] font-bold text-sm outline-none" />
              </div>
            </div>
            <button onClick={logTrade} className="w-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#10B981] hover:text-[#0A1128] transition">
              Commit to Ledger
            </button>
          </section>
        </div>
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
                  <td className="px-4 py-4 border-l border-[#94A3B8]/20">
                    {trade.status === "CLOSED" ? (
                      trade.exitPrice?.toFixed(2)
                    ) : (
                      <div className="flex items-center gap-2 print:hidden">
                        <input
                          type="number"
                          value={sellInputs[trade.id] || ""}
                          onChange={(e) => setSellInputs({ ...sellInputs, [trade.id]: e.target.value })}
                          className="w-16 bg-[#0A1128] border border-[#94A3B8]/30 text-[#FFFFFF] p-1 text-[10px] outline-none focus:border-[#10B981]"
                          placeholder="Price"
                        />
                        <button
                          onClick={() => handleSell(trade.id, Number(sellInputs[trade.id]))}
                          className="bg-[#10B981]/20 text-[#10B981] px-2 py-1 text-[9px] uppercase font-bold hover:bg-[#10B981] hover:text-[#0A1128] transition"
                        >
                          Sell
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-[#10B981] font-bold">{trade.actualProfitZAR ? trade.actualProfitZAR.toFixed(2) : "---"}</td>
                  <td className="px-4 py-4">{trade.runningProfit ? trade.runningProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "---"}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-[8px] uppercase tracking-widest border ${
                      trade.status === "ACTIVE" ? "border-[#94A3B8] text-[#94A3B8]" : 
                      trade.status === "CLOSED" ? "border-blue-500 text-blue-500" : "border-[#10B981] text-[#10B981]"
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
              {ledger.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-6 py-12 text-center text-[#94A3B8] italic text-xs">
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
