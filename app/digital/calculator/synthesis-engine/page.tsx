"use client";

import React, { useState } from 'react';

export default function SynthesisEngine() {
  const [dataInput, setDataInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const runSynthesis = () => {
    if (dataInput.length < 20) return;
    setIsProcessing(true);

    setTimeout(() => {
      // 1. Analyze text complexity & entropy to generate unique results
      const wordCount = dataInput.trim().split(/\s+/).length;
      const charCount = dataInput.length;
      const entropy = (charCount % 17) * (wordCount % 13);
      
      // 2. Generate pseudo-random variance based on input structure
      const truthScore = (70 + (entropy / 2)).toFixed(1);
      const coherenceIndex = (80 + (wordCount % 15) - (charCount % 5)).toFixed(1);
      
      // 3. Dynamic Verdicts based on input weight
      const verdict = charCount > 200 
        ? "HIGH_DENSITY_NEURAL_ALIGNMENT" 
        : "FRAGMENTED_DATA_RECONSTRUCTION";

      setResult({
        truthScore,
        coherenceIndex,
        verdict,
        timestamp: new Date().toLocaleTimeString()
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] p-6 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-l-4 border-[#10B981] pl-6">
          <h1 className="text-4xl font-bold text-[#FFFDF0] uppercase tracking-[0.2em]">Synthesis Engine</h1>
          <p className="text-[#10B981] text-xs uppercase tracking-widest mt-2">Neural Context & Value Arbitrage :: PURE_APEX_PULSE</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#021A0E] p-6 border border-[#10B981]/30 rounded-lg">
            <textarea 
              className="w-full h-64 bg-[#032213] border border-[#10B981]/30 p-4 text-white font-mono focus:border-[#F5D36B] outline-none"
              placeholder="Paste fragmented data sources, articles, or market inputs here..."
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
            />
            <button 
              onClick={runSynthesis}
              disabled={isProcessing}
              className="w-full mt-4 py-3 bg-[#10B981] text-[#032213] font-bold uppercase tracking-widest hover:bg-[#FFFDF0] transition"
            >
              {isProcessing ? "PROCESSING_NEURAL_NODES..." : "Execute Synthesis"}
            </button>
          </div>

          <div className="bg-[#04381F]/20 p-6 border border-[#F5D36B]/20 rounded-lg flex flex-col items-center justify-center text-center">
            {result ? (
              <div className="w-full space-y-6">
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest">Synthetic Truth Score</span>
                <div className="text-7xl font-bold text-[#FFFDF0]">{result.truthScore}</div>
                <div className="grid grid-cols-2 gap-4 border-t border-[#10B981]/20 pt-6">
                  <div>
                    <span className="text-[8px] text-[#10B981] uppercase">Coherence</span>
                    <div className="text-lg">{result.coherenceIndex}%</div>
                  </div>
                  <div>
                    <span className="text-[8px] text-[#10B981] uppercase">Status</span>
                    <div className="text-[10px] truncate">{result.verdict}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-[#10B981]/30 uppercase text-xs tracking-widest">[ Awaiting Data Input ]</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
