"use client";

import React, { useState } from 'react';

export default function SynthesisEngine() {
  const [dataInput, setDataInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const runSynthesis = () => {
    setIsProcessing(true);
    // Simulation: In production, this would hit your proprietary AI/NLP API
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] p-6 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-l-4 border-[#10B981] pl-6">
          <h1 className="text-4xl font-bold text-[#FFFDF0] uppercase tracking-[0.2em]">Synthesis Engine</h1>
          <p className="text-[#10B981] text-xs uppercase tracking-widest mt-2">Neural Context & Value Arbitrage :: PURE_APEX_PULSE</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Node */}
          <div className="bg-[#021A0E] p-6 border border-[#10B981]/30 rounded-lg">
            <label className="text-[10px] text-[#F5D36B] mb-2 block uppercase">Raw Input Feed (URLs/Text Blocks)</label>
            <textarea 
              className="w-full h-64 bg-[#032213] border border-[#10B981]/30 p-4 text-white font-mono focus:border-[#F5D36B] outline-none"
              placeholder="Paste fragmented data sources, articles, or market inputs here..."
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
            />
            <button 
              onClick={runSynthesis}
              className="w-full mt-4 py-3 bg-[#10B981] text-[#032213] font-bold uppercase tracking-widest hover:bg-[#FFFDF0] transition"
            >
              {isProcessing ? "PROCESSING_NEURAL_NODES..." : "Execute Synthesis"}
            </button>
          </div>

          {/* Result Node */}
          <div className="bg-[#04381F]/20 p-6 border border-[#F5D36B]/20 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest mb-4">Synthetic Truth Score</span>
            <div className="text-7xl font-bold text-[#FFFDF0]">84.2</div>
            <p className="mt-6 text-[#10B981] text-xs max-w-sm uppercase font-mono italic">
              "The synthesis indicates high-probability alignment across all provided data nodes."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
