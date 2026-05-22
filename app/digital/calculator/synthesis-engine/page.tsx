"use client";

import React, { useState } from 'react';

export default function SynthesisEngine() {
  const [input, setInput] = useState("");
  const [report, setReport] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const performAnalysis = async () => {
    if (input.length < 50) return;
    setIsProcessing(true);
    
    // Simulate high-compute server-side latency
    await new Promise(r => setTimeout(r, 1500));
    
    const words = input.trim().split(/\s+/);
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const sentenceCount = (input.match(/[.!?]+/g) || []).length || 1;
    
    const complexity = Math.min(1.0, (words.length / sentenceCount) / 40);
    const richness = (uniqueWords / words.length);
    const truthScore = Math.min(99.99, Math.max(65.00, ((richness * 0.45) + (complexity * 0.55)) * 100 + 40));

    setReport({
      truthScore: truthScore.toFixed(2),
      confidence: (truthScore * 0.995).toFixed(2),
      signalIntegrity: (richness * 100).toFixed(1) + "%",
      verdict: truthScore > 90 ? "CRITICAL_SIGNAL_DETECTED" : "NOMINAL_NOISE_FLOOR"
    });
    
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#020503] text-[#F5D36B] p-8 font-mono border-t border-[#10B981]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl text-white uppercase mb-8 tracking-[0.2em]">Synthesis Engine</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <textarea 
            className="w-full h-64 bg-[#060D0A] border border-[#10B981]/40 p-6 text-white outline-none"
            placeholder="Paste telemetry here..."
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="bg-[#050D08] p-6 border border-[#10B981]/20 flex flex-col justify-center">
            {report ? (
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-4">{report.truthScore}</div>
                <div className="text-[10px] text-[#10B981] uppercase">{report.verdict}</div>
              </div>
            ) : (
              <div className="text-center text-[#10B981]/30">AWAITING INPUT</div>
            )}
            <button 
              onClick={performAnalysis}
              disabled={isProcessing}
              className="mt-8 py-3 bg-[#10B981] text-[#020503] font-bold uppercase"
            >
              {isProcessing ? "ANALYZING..." : "Run Analysis"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
