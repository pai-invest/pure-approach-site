import React from 'react';

export default function DigitalDivision() {
  return (
    <div className="min-h-screen bg-[#030705] text-neutral-200 font-sans selection:bg-emerald-950 selection:text-amber-400">
      {/* Navigation */}
      <header className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center border-b border-emerald-950">
        <a href="/preview" className="text-xs font-bold tracking-widest text-emerald-500 hover:text-amber-400 transition font-mono">
          ← PURE APPROACH TERMINAL
        </a>
        <div className="text-xs tracking-widest text-amber-400 font-mono flex items-center gap-2 bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-900/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]"></span>
          PULSE // SECURE_NODE
        </div>
      </header>

      {/* Brand Hero */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.3em] text-amber-500/80 uppercase font-mono">
            System Registry // Division 02
          </span>
          {/* Stunning Emerald-to-Gold Tech Gradient */}
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-amber-200 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            PURE APEX PULSE
          </h1>
          <p className="mt-6 text-base text-neutral-400 leading-relaxed max-w-2xl">
            The high-performance digital asset pipeline of Pure Approach Investments. We build, optimize, and scale algorithmic web architectures, custom micro-utilities, and automated data networks engineered for compound equity growth with zero capital drag.
          </p>
        </div>

        {/* Tech Matrix / Operational Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Asset Framework 01 */}
          <div className="p-6 rounded-lg bg-[#060f0a] border border-emerald-900/30 hover:border-amber-500/40 transition duration-300 shadow-xl group">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-amber-400 tracking-wide font-mono">Programmatic Media Pipelines</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/50 rounded">
                SYS_ACTIVE
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
              Deploying light, edge-optimized content networks designed for mathematical keyword capture. These assets convert global search volume into persistent, high-margin transactional flow.
            </p>
            <div className="mt-6 pt-4 border-t border-emerald-950 grid grid-cols-2 gap-4 text-xs font-mono text-emerald-600">
              <div>CAPACITY: <span className="text-amber-200/90">MAX_EFFICIENCY</span></div>
              <div>MONETIZATION: <span className="text-amber-200/90">PROGRAMMATIC</span></div>
            </div>
          </div>

          {/* Asset Framework 02 */}
          <div className="p-6 rounded-lg bg-[#060f0a] border border-emerald-900/30 hover:border-amber-500/40 transition duration-300 shadow-xl group">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-amber-400 tracking-wide font-mono">Custom Software Utilities</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-amber-950/40 text-amber-400 border border-amber-800/30 rounded">
                NODE_SCALING
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
              Engineering proprietary serverless micro-SaaS and transactional web interfaces that eliminate workflow inefficiencies and yield automated recurring margins.
            </p>
            <div className="mt-6 pt-4 border-t border-emerald-950 grid grid-cols-2 gap-4 text-xs font-mono text-emerald-600">
              <div>INFRASTRUCTURE: <span className="text-amber-200/90">DECOUPLED</span></div>
              <div>DEBT LEVERAGE: <span className="text-amber-200/90">0.00%</span></div>
            </div>
          </div>

        </div>

        {/* Protocol Control Room */}
        <div className="mt-24 max-w-3xl border-t border-emerald-950 pt-16">
          <h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase font-mono mb-6">
            System Telemetry Protocols
          </h2>
          <div className="space-y-4 text-xs font-mono text-neutral-400">
            <div className="bg-[#050c08] p-4 rounded border border-emerald-950 flex items-start gap-3">
              <span className="text-emerald-400 font-bold">[PROT_01]</span>
              <div>
                <span className="text-amber-400 block font-bold mb-1">AUTOMATED VELOCITY CONTROL</span>
                All web platforms operate under automated edge deployment lines, matching traffic spikes globally without manual infrastructure intervention or database overhead scaling limits.
              </div>
            </div>
            <div className="bg-[#050c08] p-4 rounded border border-emerald-950 flex items-start gap-3">
              <span className="text-emerald-400 font-bold">[PROT_02]</span>
              <div>
                <span className="text-amber-400 block font-bold mb-1">CAPITAL ALLOCATION EFFICIENCY</span>
                Operating expenditures are computationally locked at minimum baselines to capture the highest possible net yield per single digital node.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-emerald-950 text-xs text-emerald-700/60 font-mono">
        SYS_STATUS: SECURE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD. APEX DIGITAL ASSETS DIVISION.
      </footer>
    </div>
  );
}
