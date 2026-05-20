"use client";
import React from 'react';

export default function GlobalSwingMatrix() {
  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] p-8 flex flex-col items-center justify-center font-sans">
      <h1 className="text-3xl font-serif text-[#FFFDF0] mb-4 uppercase tracking-widest text-center">Global Swing Matrix</h1>
      <p className="text-xs font-mono text-[#10B981] mb-8 tracking-widest">NODE // INITIALIZING</p>
      
      <div className="border border-[#10B981]/20 p-8 rounded-xl bg-[#021A0E] max-w-md text-center shadow-2xl">
        <span className="inline-block w-3 h-3 rounded-full bg-[#10B981] animate-pulse mb-6 shadow-[0_0_10px_#10b981]"></span>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#F5D36B] mb-3">System Offline</h2>
        <p className="text-sm font-light text-[#F5D36B]/70 leading-relaxed">
          The algorithmic tracking system for equity swings is currently undergoing architectural calibration. Access is restricted.
        </p>
      </div>
    </div>
  );
}
