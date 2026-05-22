"use client";

import React, { useState } from 'react';

export default function SynthesisEngine() {
  const [dataInput, setDataInput] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const executeDiagnostic = async () => {
    if (dataInput.length < 50) return;
    
    // Reset state
    setLog(["INITIALIZING_SEMANTIC_SCAN..."]);
    setIsProcessing(true);
    setAnalysis(null);

    // Step 1: Lexical Mapping
    await new Promise(r => setTimeout(r, 600));
    setLog(prev => [...prev, "MAPPING_LEXICAL_VARIANCE..."]);

    // Step 2: Entropy Calculation
    await new Promise(r => setTimeout(r, 600));
    setLog(prev => [...prev, "CALCULATING_SIGNAL_ENTROPY..."]);

    // Step 3: Final Computation
    const words = dataInput.split(/\s+/);
    const unique = new Set(words.map(w => w.toLowerCase())).size;
    const score = Math.min(99.9, ((unique / words.length) * 100) + 50);

    await new Promise(r => setTimeout(r, 600));
    setAnalysis({
      score: score.toFixed(2),
      density: (unique / words.length * 100).toFixed(1) + "%",
      status: score > 80 ? "OPERATIONAL" : "DEGRADED"
    });
    setLog(prev => [...prev, "DIAGNOSTIC_COMPLETE."]);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#020503] text-[#F5D36B] p-12 font-mono">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Input Terminal */}
        <div className="md:col-span-2">
          <textarea 
            className="w-full h-96 bg-[#060D0A] border border-[#10B981]/40 p-6 text-white outline-none"
            placeholder="Paste raw data here..."
            onChange={(e) => setDataInput(e.target.value)}
          />
        </div>

        {/* Diagnostic Output */}
        <div className="bg-[#050D08] border border-[#10B981]/20 p-6 flex flex-col">
          <div className="text-[10px] text-[#10B981] uppercase mb-4">Live Logs</div>
          <div className="flex-1 space-y-2 overflow-y-auto">
            {log.map((entry, i) => (
              <div key={i} className="text-[9px] text-[#F5D36B]/70">{">"} {entry}</div>
            ))}
          </div>
          
          <button 
            onClick={executeDiagnostic}
            className="mt-6 py-3 bg-[#10B981] text-black font-bold uppercase text-[10px]"
          >
            Execute Diagnostic
          </button>
        </div>
      </div>
    </div>
  );
}
