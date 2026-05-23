"use client";
import React, { useState, useMemo } from "react";

interface MonthRecord {
id: string;
month: string;
zar: number | "";
usd: number | "";
}

const INITIAL_MONTHS: MonthRecord[] = [
{ id: "01", month: "Mar", zar: 27347.83, usd: -210.03 },
{ id: "02", month: "Apr", zar: 1191.86, usd: -13566.55 },
{ id: "03", month: "May", zar: "", usd: "" },
{ id: "04", month: "Jun", zar: "", usd: "" },
{ id: "05", month: "Jul", zar: "", usd: "" },
{ id: "06", month: "Aug", zar: "", usd: "" },
{ id: "07", month: "Sep", zar: "", usd: "" },
{ id: "08", month: "Oct", zar: "", usd: "" },
{ id: "09", month: "Nov", zar: "", usd: "" },
{ id: "10", month: "Dec", zar: "", usd: "" },
{ id: "11", month: "Jan", zar: "", usd: "" },
{ id: "12", month: "Feb", zar: "", usd: "" },
];

export default function MonthlyPLLedger() {
const [ledger, setLedger] = useState<MonthRecord[]>(INITIAL_MONTHS);
const [exchangeRate, setExchangeRate] = useState<number>(16.47);

const handleInputChange = (id: string, field: "zar" | "usd", value: string) => {
setLedger((prev) =>
prev.map((row) => {
if (row.id === id) {
return { ...row, [field]: value === "" ? "" : Number(value) };
}
return row;
})
);
};

// Calculations
const totals = useMemo(() => {
return ledger.reduce(
(acc, row) => {
const zarVal = Number(row.zar) || 0;
const usdVal = Number(row.usd) || 0;
const usZarVal = usdVal * exchangeRate;

acc.zar += zarVal;
acc.usd += usdVal;
acc.usZar += usZarVal;
return acc;
},
{ zar: 0, usd: 0, usZar: 0 }
);
}, [ledger, exchangeRate]);

const netTotalZar = totals.zar + totals.usZar;

return (
<div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-[#1C2541] p-8">
<header className="max-w-[1000px] mx-auto mb-8 flex justify-between items-end border-b border-[#94A3B8]/20 pb-6">
<div>
<h1 className="text-2xl font-serif text-[#FFFFFF] tracking-wide uppercase">Annual P/L Ledger</h1>
<p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mt-1">March 26 - Feb 27 Consolidated View</p>
</div>
<div className="flex flex-col items-end">
<label className="text-[9px] uppercase tracking-widest mb-1 text-[#10B981]">Baseline USD/ZAR Rate</label>
<input
type="number"
value={exchangeRate}
onChange={(e) => setExchangeRate(Number(e.target.value))}
className="w-24 p-2 bg-[#111C3A] border border-[#10B981]/50 text-[#10B981] font-bold text-sm text-right outline-none"
/>
</div>
</header>

<main className="max-w-[1000px] mx-auto">
<section className="bg-[#111C3A] border border-[#94A3B8]/20 rounded overflow-hidden shadow-lg">
<table className="w-full text-left text-sm font-mono whitespace-nowrap">
<thead className="text-[10px] text-[#94A3B8] uppercase tracking-widest bg-[#1C2541] border-b border-[#94A3B8]/20">
<tr>
<th className="px-4 py-3 font-normal w-1/4">March26-Feb27 P/L</th>
<th className="px-4 py-3 font-normal w-1/4 text-right border-l border-[#94A3B8]/20">ZAR</th>
<th className="px-4 py-3 font-normal w-1/4 text-right border-l border-[#94A3B8]/20">US/ZAR</th>
<th className="px-4 py-3 font-normal w-1/4 text-right border-l border-[#94A3B8]/20 text-[#3B82F6]">USD</th>
</tr>
</thead>
<tbody className="divide-y divide-[#94A3B8]/10 text-[#E2E8F0]">
{ledger.map((row) => {
const calculatedUsZar = row.usd !== "" ? Number(row.usd) * exchangeRate : "";
return (
<tr key={row.id} className="hover:bg-[#1C2541]/50 transition group">
<td className="px-4 py-3 font-bold text-white border-l-4 border-transparent group-hover:border-[#10B981]">{row.month}</td>
<td className="p-0 border-l border-[#94A3B8]/20">
<input
type="number"
value={row.zar}
onChange={(e) => handleInputChange(row.id, "zar", e.target.value)}
className="w-full h-full bg-transparent px-4 py-3 text-right outline-none focus:bg-[#1C2541]"
placeholder="-"
/>
</td>
<td className="px-4 py-3 text-right border-l border-[#94A3B8]/20 text-[#94A3B8]">
{calculatedUsZar !== "" ? Number(calculatedUsZar).toFixed(4) : "-"}
</td>
<td className="p-0 border-l border-[#94A3B8]/20">
<input
type="number"
value={row.usd}
onChange={(e) => handleInputChange(row.id, "usd", e.target.value)}
className="w-full h-full bg-transparent px-4 py-3 text-right text-[#3B82F6] outline-none focus:bg-[#1C2541]"
placeholder="-"
/>
</td>
</tr>
);
})}
</tbody>
<tfoot className="bg-[#1C2541] border-t-2 border-[#94A3B8]/40">
<tr>
<td className="px-4 py-4 font-bold text-[#FFFFFF]">P/L</td>
<td className="px-4 py-4 text-right font-bold text-[#FFFFFF] border-l border-[#94A3B8]/20">{totals.zar.toFixed(2)}</td>
<td className="px-4 py-4 text-right font-bold text-[#FFFFFF] border-l border-[#94A3B8]/20">{totals.usZar.toFixed(4)}</td>
<td className="px-4 py-4 text-right font-bold text-[#3B82F6] border-l border-[#94A3B8]/20">{totals.usd.toFixed(2)}</td>
</tr>
<tr className="border-t border-[#94A3B8]/20 bg-[#0F172A]">
<td className="px-4 py-5 font-bold text-[#A855F7] uppercase tracking-widest text-xs">Total P/L in ZAR</td>
<td className="px-4 py-5 text-right font-bold text-[#A855F7] text-lg border-l border-[#94A3B8]/20 bg-[#1C2541]">
{netTotalZar.toFixed(4)}
</td>
<td colSpan={2} className="bg-[#F59E0B]/10 border-l border-[#94A3B8]/20"></td>
</tr>
</tfoot>
</table>
</section>
</main>
</div>
);
}
