"use client";

import React, { useState, useMemo } from 'react';

export default function BurnSurvivalMatrix() {
  const [cashOnHand, setCashOnHand] = useState(50000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(15000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(18000);

  const telemetry = useMemo(() => {
    const burnRate = monthlyExpenses - monthlyRevenue;
    const runway = burnRate > 0 ? cashOnHand / burnRate : Infinity;
    
    // Survival Math: What % revenue increase or expense cut is needed to hit break-even?
    const breakEven = monthlyRevenue >= monthlyExpenses;
    const neededRevenueIncrease = !breakEven ? ((monthlyExpenses - monthlyRevenue) / monthlyRevenue) * 100 : 0;
    const neededExpenseCut = !breakEven ? ((monthlyExpenses - monthlyRevenue) / monthlyExpenses) * 100 : 0;

    return { burnRate, runway, breakEven, neededRevenueIncrease, neededExpenseCut };
  }, [cashOnHand, monthlyRevenue, monthlyExpenses]);

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] p-6 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto bg-[#021A0E] border border-[#10B981]/30 p-8 rounded-lg shadow-2xl">
        <h1 className="text-2xl font-bold text-[#FFFDF0] mb-8 uppercase tracking-[0.2em] border-b border-[#10B981]/20 pb-4">
          Burn Survival & Runway Matrix
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="text-[9px] text-[#10B981] uppercase">Current Cash Liquidity ($)</label>
              <input type="number" value={cashOnHand} onChange={e => setCashOnHand(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white" />
            </div>
            <div>
              <label className="text-[9px] text-[#10B981] uppercase">Monthly Revenue ($)</label>
              <input type="number" value={monthlyRevenue} onChange={e => setMonthlyRevenue(Number(e.target.value))} className="w-full bg-[#032213] border border-[#10B981]/30 p-3 text-white" />
            </div>
            <div>
              <label className="text-[9px] text-red-400 uppercase">Monthly Burn/Expenses ($)</label>
              <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="w-full bg-[#032213] border border-red-500/30 p-3 text-white" />
            </div>
          </div>

          {/* Telemetry Dashboard */}
          <div className="bg-[#04381F]/20 p-8 border border-[#F5D36B]/20 rounded flex flex-col justify-center items-center text-center">
            <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-[0.2em]">Days to Bankruptcy</span>
            <div className={`text-6xl font-bold my-4 ${telemetry.runway < 6 ? 'text-red-500' : 'text-[#FFFDF0]'}`}>
              {telemetry.runway === Infinity ? "∞" : Math.floor(telemetry.runway * 30)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-8 border-t border-[#10B981]/20 pt-6">
              <div>
                <span className="text-[9px] text-[#10B981] uppercase">Revenue Boost Needed</span>
                <div className="text-xl">{telemetry.neededRevenueIncrease.toFixed(1)}%</div>
              </div>
              <div>
                <span className="text-[9px] text-[#10B981] uppercase">Required OpEx Cut</span>
                <div className="text-xl">{telemetry.neededExpenseCut.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* The "Pro" Hook */}
        <div className="mt-8 p-4 border border-[#F5D36B]/20 bg-[#F5D36B]/5 text-[10px] text-center text-[#F5D36B]/70 uppercase tracking-widest">
          Daily telemetry suggests your node is currently operating at {telemetry.breakEven ? 'PROFIT' : 'DEFICIT'}. 
          {!telemetry.breakEven && " Unlock advanced predictive modeling in the Vault to automate capital reallocation."}
        </div>
      </div>
    </div>
  );
}
