import React from 'react';

export default function DigitalDivision() {
  return (
    <div className="min-h-screen bg-[#060604] text-white font-sans selection:bg-neutral-800 selection:text-white">
      {/* Navigation */}
      <header className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center border-b border-neutral-900/50">
        <a href="/" className="text-xs font-bold tracking-widest text-neutral-400 hover:text-white transition">
          ← PURE APPROACH INVESTMENTS
        </a>
        <div className="text-xs tracking-widest text-emerald-500 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          PULSE // ONLINE
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-[0.3em] text-neutral-500 uppercase font-mono">
            Division Portfolio // 02
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            PURE APEX PULSE
          </h1>
          <p className="mt-6 text-base text-neutral-400 leading-relaxed max-w-2xl">
            The data and systems infrastructure pipeline of Pure Approach Investments. We specialize in the development, deployment, and acquisition of highly scalable web properties, automated utility applications, and programmatic traffic networks.
          </p>
        </div>

        {/* Operational Status Panels */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Asset Framework 01 */}
          <div className="p-6 rounded-lg bg-neutral-950 border border-neutral-900">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-neutral-200">Programmatic Traffic Engines</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-neutral-900 text-neutral-400 border border-neutral-800 rounded">
                OPTIMIZING
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
              Building lightweight, high-speed, informational media properties engineered for extreme search engine visibility. These assets generate compound organic data pipelines and consistent monetizable impressions.
            </p>
            <div className="mt-6 pt-4 border-t border-neutral-900/50 grid grid-cols-2 gap-4 text-xs font-mono text-neutral-500">
              <div>TARGET RPM: <span className="text-neutral-300">OPTIMAL</span></div>
              <div>GEO-TARGETS: <span className="text-neutral-300">GLOBAL</span></div>
            </div>
          </div>

          {/* Asset Framework 02 */}
          <div className="p-6 rounded-lg bg-neutral-950 border border-neutral-900">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-neutral-200">Custom Software Utilities</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-emerald-950/30 text-emerald-400 border border-emerald-900/30 rounded">
                ACTIVE FRAMEWORK
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
              Developing standalone micro-SaaS applications and modular tech utilities designed to solve precise transactional and analytical inefficiencies with zero overhead.
            </p>
            <div className="mt-6 pt-4 border-t border-neutral-900/50 grid grid-cols-2 gap-4 text-xs font-mono text-neutral-500">
              <div>STACK: <span className="text-neutral-300">NEXT.JS / VERCEL</span></div>
              <div>LEVERAGE: <span className="text-neutral-300">0% DEBT</span></div>
            </div>
          </div>

        </div>

        {/* System Methodology */}
        <div className="mt-24 max-w-3xl border-t border-neutral-900/60 pt-16">
          <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase font-mono mb-6">
            System Architecture Protocol
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed mb-6">
            Our software and media acquisitions run under a hyper-efficient operational framework engineered to guarantee performance stability:
          </p>
          <div className="space-y-4 text-xs font-mono text-neutral-400">
            <div className="bg-neutral-950/40 p-4 rounded border border-neutral-900/50">
              <span className="text-neutral-200 block font-bold mb-1">[PROTOCOL A] SERVERLESS DEPLOYMENT</span>
              Assets are deployed entirely across decoupled global edge networks to maintain instantaneous latency and remove traditional server configuration vulnerabilities.
            </div>
            <div className="bg-neutral-950/40 p-4 rounded border border-neutral-900/50">
              <span className="text-neutral-200 block font-bold mb-1">[PROTOCOL B] EXPENSE CONTROL</span>
              Fixed operating infrastructure limits are computationally restricted to preserve high net operational margins per digital asset.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-neutral-900/50 text-xs text-neutral-600">
        © 2026 Pure Approach Investments (Pty) Ltd. Apex Digital Assets Division.
      </footer>
    </div>
  );
}
