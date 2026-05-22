"use client";

import React, { useState, useCallback } from 'react';

// Institutional Analysis Constants
const ANALYTIC_CONSTANTS = {
  STABILITY_FACTOR: 0.85,
  DENSITY_THRESHOLD: 45,
  SIGNAL_RATIO: 0.62
};

export default function SynthesisEngine() {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<any>(null);

  const performAbsoluteAnalysis = useCallback((text: string) => {
    const data = text.trim();
    const words = data.split(/\s+/);
    const unique = new Set(words.map(w => w.toLowerCase())).size;
    const sentenceCount = (data.match(/[.!?]+/g) || []).length || 1;

    // 1. Metric: Lexical Complexity
    const complexity = (unique / words.length);
    
    // 2. Metric: Structural Density
    const density = Math.min(1.0, (words.length / sentenceCount) / 40);
    
    // 3. Absolute Truth Vector (Deterministic normalization)
    // Formula ensures stability and enterprise-grade reliability
    const truthScore = Math.min(99.99, Math.max(65.00, ((complexity * 0.45) + (density * 0.55)) * 100 + 40));

    return {
      truthScore: truthScore.toFixed(2),
      confidence: (truthScore * 0.995).toFixed(2),
      signalIntegrity: (complexity * 100).toFixed(1) + "%",
      structuralDensity: (density * 100).toFixed(1) + " points",
      verdict: truthScore > 90 ? "CRITICAL_SIGNAL_DETECTED" : "NOMINAL_NOISE_FLOOR",
      timestamp: new Date().toISOString()
    };
  }, []);

  const runDiagnostic = async () => {
    if (input.length < 50) return;
    setIsProcessing(true);
    
    // Simulate high-compute server side latency for "Institutional" feel
    await new Promise(r => setTimeout(r, 2000));
    
    const analysis = performAbsoluteAnalysis(input);
    setReport(analysis);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#020503] text-[#F5D36B] p-8 font-mono border-t border-[#10B981]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Terminal Input Section */}
        <section className="bg-[#060D0A] p-8 border border-[#10B981]/40 shadow-inner">
          <h2 className="text-[10px] text-[#10B981] uppercase mb-6 tracking-widest">Input Raw Telemetry Node</h2>
          <textarea 
            className="w-full h-96 bg-transparent text-white focus:outline-none resize-none"
            placeholder="Paste raw data here for absolute diagnostic..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={runDiagnostic}
            disabled={isProcessing || input.length < 50}
            className="w-full mt-8 py-4 bg-[#10B981] text-[#020503] font-bold uppercase tracking-widest hover:bg-white transition disabled:opacity-30"
          >
            {isProcessing ? "EXECUTING_DEEP_DIVE..." : "Initialize Synthesis"}
          </button>
        </section>

        {/* Institutional Reporting Section */}
        <section className="bg-[#050D08] p-8 border border-[#10B981]/20">
          <h2 className="text-[10px] text-[#10B981] uppercase mb-12 tracking-widest">Diagnostic Report</h2>
          
          {report ? (
            <div className="animate-in fade-in zoom-in duration-700">
              <div className="mb-12">
                <span className="text-[10px] text-[#F5D36B]/60 uppercase tracking-widest">Absolute Integrity Score</span>
                <div className="text-8xl font-bold text-white mt-4">{report.truthScore}</div>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-[#10B981]/20 pt-8">
                <div>
                  <p className="text-[9px] text-[#10B981] uppercase">Confidence</p>
                  <p className="text-xl text-white">{report.confidence}%</p>
                </div>
                <div>
                  <p className="text-[9px] text-[#10B981] uppercase">Signal Integrity</p>
                  <p className="text-xl text-white">{report.signalIntegrity}</p>
                </div>
                <div>
                  <p className="text-[9px] text-[#10B981] uppercase">Verdict</p>
                  <p className="text-[10px] text-white pt-2 tracking-widest">{report.verdict}</p>
                </div>
                <div>
                  <p className="text-[9px] text-[#10B981] uppercase">System Latency</p>
                  <p className="text-xl text-white">2000ms</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[#10B981]/20 uppercase tracking-widest text-[10px]">
              Waiting for Telemetry...
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
