import React, { useState, useEffect } from 'react';
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
  // Manual Trade Entry State
  const [amountInvested, setAmountInvested] = useState<number>(400);
  const [ticker, setTicker] = useState<string>("SPY");
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [exchangeRate, setExchangeRate] = useState<number>(18.50);

  // Master Ledger
  const [ledger, setLedger] = useState<Trade[]>([]);

  // Real-Time USD/ZAR Fetch Engine
  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data.rates?.ZAR) setExchangeRate(data.rates.ZAR);
      })
      .catch(err => console.error("Rate fetch failed", err));
  }, []);
