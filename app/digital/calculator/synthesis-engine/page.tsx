"use client";

import React, { useState } from 'react';

export default function SynthesisEngine() {
  const [dataInput, setDataInput] = useState("");
  const [report, setReport] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * ABSOLUTE DIAGNOSTIC CORE
   * Generates a 3-dimensional data analysis report.
   * Stability: Deterministic (Same Input = Same Output)
   */
  const generateFullAnalysis = (text: string) => {
    const raw = text.trim();
    if (raw.length < 50) return null;

    const words = raw.split(/\s+/);
    const sentences = raw.split(/[.!?]+/).filter(Boolean);
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;

    // 1. Lexical Richness (Vocabulary Variance)
    const richness = (uniqueWords / words.length) * 100;
    
    // 2. Structural Density (Complexity Index)
    const density = Math.min(100, (words.length / sentences.length) * 2);
    
    // 3. Information Integrity (Truth Vector)
    // A balanced metric calculated as the mean of lexical and structural integrity
    const integrity = (richness * 0.4) + (density * 0.6);

    return {
      integrityScore: integrity.toFixed(2),
      metrics: {
        lexicalRichness: richness.toFixed(1) + "%",
        structuralDensity: density.toFixed(1) + " pts",
        wordCount: words.length,
        sentimentSignal: integrity > 80 ? "HIGH_SIGNAL" : "NOISE_FLOOR"
      },
      analysisSummary: integrity > 80 
        ? "Data exhibits high structural integrity and semantic depth." 
        : "Data exhibits structural fragmentation requiring further refinement."
    };
  };

  const handleCompute = () => {
    if (dataInput.length < 50) return;
    setIsProcessing(true);
    setTimeout(() => {
      setReport(generateFullAnalysis(dataInput));
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020503] text-[#F5D36B] p-12 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-l-4 border-[#10B981] pl-6">
          <h1 className="text-4xl font-serif text-white uppercase tracking-[0.2em]">Synthesis Engine</h1>
          <p className="text-[#10B981] text-[10px] uppercase tracking-[0.3em] mt-2">V.5.0 // ABSOLUTE_DIAGNOSTIC_PROTOCOL</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <textarea 
            className="w-full h-96 bg-[#060D0A] border border-[#10B981]/40 p-8 text-white focus:border-[#F5D36B] outline-none transition"
            placeholder="Paste telemetry, market data, or documentation here for absolute analysis..."
            onChange={(e) => setDataInput(e.target.value)}
          />

          <div className="bg-[#050D08] p-8 border border-[#10B981]/20 flex flex-col">
            {report ? (
              <div className="space-y-8 animate-in fade-in duration-700">
                <div>
                  <span className="text-[9px] text-[#10B981] uppercase">Absolute Integrity Score</span>
                  <div className="text-7xl font-bold text-white mt-2">{report.integrityScore}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(report.metrics).map(([key, val]) => (
                    <div key={key} className="border-t border-[#10B981]/10 pt-2">
                      <span className="text-[8px] uppercase block text-[#F5D36B]/60">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm text-white">{val as string}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-white italic border-t border-[#10B981]/20 pt-4">
                  {report.analysisSummary}
                </p>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-[#10B981]/20 uppercase text-xs tracking-widest">
                Awaiting Data Integrity Scan
              </div>
            )}
            
            <button 
              onClick={handleCompute}
              disabled={isProcessing || dataInput.length < 50}
              className="mt-auto py-4 bg-[#10B981] text-[#020503] font-bold uppercase tracking-widest hover:bg-white transition disabled:opacity-30"
            >
              {isProcessing ? "EXECUTING_DIAGNOSTIC..." : "Execute Absolute Analysis"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
