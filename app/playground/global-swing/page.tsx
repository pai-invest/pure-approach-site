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

setLedger(prevLedger => {
const maxRunning = prevLedger.reduce((max, t) => Math.max(max, t.runningProfit || 0), 0);

return prevLedger.map(trade => {
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
status: "CLOSED"
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
<header className="max-w-[1400px] mx-auto px-8 py-8 flex justify-between items-end border-b border-[#94A3B8]/20 print
