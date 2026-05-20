"use client";
import React from 'react';

export default function DigitalDivision() {
  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      
      {/* Header Area */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#10B981]/10 gap-6">
        <div className="flex items-center justify-center shrink-0">
          <img src="/apexlogo.png" alt="Pure Apex Pulse Logo" className="h-28 sm:h-32 w-auto object-contain" />
        </div>
        <div className="w-full flex justify-between items-center mt-4">
          <a href="/preview" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#04381F]/50 px-3 py-1.5 rounded border border-[#10B981]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[#F5D36B] font-bold font-mono">PULSE // SECURE_NODE</span>
          </div>
        </div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.4em] text-[#10B981] uppercase font-mono">System Registry // Division 02</span>
          <h1 className="mt-4 text-4xl md:text-6xl tracking-[0.15em] font-serif font-light uppercase py-2 bg-[linear-gradient(135deg,#FFFDF0_0%,#F5D36B_25%,#D4AF37_50%,#B38F24_75%,#543D04_100%)] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            PURE APEX PULSE
          </h1>
          <p className="mt-6 text-base text-[#F5D36B]/80 leading-relaxed max-w-2xl font-light">
            The high-performance digital asset pipeline of Pure Approach Investments. We build, optimize, and scale algorithmic web architectures and proprietary financial utilities engineered for compound growth.
          </p>
        </div>

        {/* --- SYSTEM DIRECTORY --- */}
        <div className="mt-20 border-t border-[#10B981]/20 pt-16">
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase font-mono mb-8 text-[#10B981]">Active Deployment Nodes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Vault Portal */}
            <div className="p-8 rounded-xl bg-[#021A0E] border border-[#10B981]/20 hover:border-[#F5D36B]/50 transition duration-500 shadow-2xl flex flex-col relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F5D36B] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-3 text-[#10B981]">SECURE PORTAL</span>
              <h3 className="text-2xl font-serif tracking-wide text-[#FFFDF0] mb-3">The Apex Vault</h3>
              <p className="text-sm text-[#F5D36B]/70 font-light leading-relaxed flex-1 mb-8">
                Access proprietary, cloud-hosted tracking architectures including our Tax Efficiency Matrix and structural financial frameworks.
              </p>
              <a href="/digital/vault" className="inline-flex items-center justify-between px-6 py-3 bg-[#032213] border border-[#10B981]/30 hover:border-[#F5D36B] text-[#F5D36B] hover:text-[#FFFDF0] text-xs font-mono font-bold tracking-widest transition-all duration-300">
                ENTER VAULT <span className="text-[#10B981] text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Link to Free Calculator Hub */}
            <div className="p-8 rounded-xl bg-[#021A0E] border border-[#10B981]/20 hover:border-[#10B981]/60 transition duration-500 shadow-2xl flex flex-col relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981] opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-3 text-[#10B981]">PUBLIC MICRO-UTILITIES</span>
              <h3 className="text-2xl font-serif tracking-wide text-[#FFFDF0] mb-3">Diagnostic Hub</h3>
              <p className="text-sm text-[#F5D36B]/70 font-light leading-relaxed flex-1 mb-8">
                A repository of free, high-velocity mathematical frameworks designed to diagnose capital inefficiencies and tax drag.
              </p>
              <a href="/digital/calculator" className="inline-flex items-center justify-between px-6 py-3 bg-[#032213] border border-[#10B981]/30 hover:border-[#10B981] text-[#F5D36B] hover:text-[#FFFDF0] text-xs font-mono font-bold tracking-widest transition-all duration-300">
                INITIALIZE TOOLS <span className="text-[#10B981] text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-[#10B981]/10 py-12 text-xs text-[#10B981]/50 font-mono text-center">
          SYS_STATUS: SECURE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. APEX DIGITAL ASSETS DIVISION.
        </footer>
      </main>
    </div>
  );
}
