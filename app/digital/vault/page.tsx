"use client";
import React from 'react';

export default function VaultMasterDashboard() {
  // Override: isLocked set to 'false' for admin access.
  const vaultAssets = [
    {
      id: "tax-efficiency",
      title: "Tax Efficiency Matrix",
      tag: "GOVERNANCE // SARS",
      description: "Proprietary structural audit engine comparing Sole Proprietor versus Corporate Entity (Pty Ltd) tax drag.",
      status: "SYS_ONLINE",
      isLocked: false,
      price: "R 1,800",
      link: "/digital/vault/tax-efficiency",
      checkoutLink: "#" 
    },
    {
      id: "global-swing",
      title: "Global Swing Matrix",
      tag: "TRADING // ALLOCATION",
      description: "Algorithmic tracking system for Barbell capital allocation and automated percentage swing execution.",
      status: "SYS_ONLINE",
      isLocked: false,
      price: "R 2,500",
      link: "/digital/vault/global-swing",
      checkoutLink: "#" 
    },
    {
      id: "purification-ledger",
      title: "Purification Ledger",
      tag: "Purification",
      description: "Algorithmic tracking system for Barbell capital allocation and automated percentage swing execution.",
      status: "SYS_ONLINE",
      isLocked: false,
      price: "R 2,500",
      link: "/digital/vault/purification-ledger",
      checkoutLink: "#" 
    }
  ];

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans selection:bg-[#04381F] selection:text-[#FFFDF0]">
      
      {/* Navigation & Status Header */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 border-b border-[#10B981]/10">
        <div className="flex justify-between items-center mb-12">
          <a href="/digital" className="text-xs font-bold tracking-[0.2em] text-[#10B981] hover:text-[#FFFDF0] transition font-mono">
            ← RETURN TO PULSE TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-[#04381F]/50 px-3 py-1.5 rounded border border-[#10B981]/20">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10B981]"></span>
            <span className="text-[#F5D36B] font-bold">ACCESS_GRANTED</span>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-serif text-[#FFFDF0] uppercase tracking-[0.1em]">The Vault</h1>
          <p className="text-[#10B981] font-mono text-xs mt-3 tracking-widest uppercase">
            SECURE CLIENT ASSET REGISTRY // PURE APPROACH INVESTMENTS
          </p>
        </div>
      </header>

      {/* Asset Grid */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-bold tracking-[0.3em] uppercase font-mono mb-8 text-[#F5D36B]">
          Unlocked Architectures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vaultAssets.map((asset) => (
            <div key={asset.id} className={`p-8 rounded-lg bg-[#021A0E] border ${asset.isLocked ? 'border-[#EF4444]/30' : 'border-[#10B981]/20'} hover:border-[#F5D36B]/40 transition duration-500 shadow-2xl flex flex-col justify-between relative overflow-hidden`}>
              
              {asset.isLocked && (
                <div className="absolute -right-8 -bottom-8 opacity-5 text-9xl">
                  🔒
                </div>
              )}

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-[#032213] text-[#10B981] border border-[#10B981]/30 rounded">
                    {asset.tag}
                  </span>
                  <span className={`flex items-center gap-1.5 text-[10px] font-mono ${asset.isLocked ? 'text-[#EF4444]' : 'text-[#10B981]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${asset.isLocked ? 'bg-[#EF4444]' : 'bg-[#10B981]'}`}></span>
                    {asset.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-serif tracking-wide text-[#FFFDF0] mb-3 flex items-center gap-3">
                  {asset.title}
                </h3>
                <p className="text-sm text-[#F5D36B]/70 font-light leading-relaxed mb-8">
                  {asset.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#10B981]/10 relative z-10">
                {asset.isLocked ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-serif text-[#FFFDF0]">{asset.price}</span>
                    <a href={asset.checkoutLink} className="flex-1 text-center px-4 py-3 bg-[#F5D36B] text-[#032213] text-xs uppercase tracking-widest font-mono font-bold hover:bg-[#FFFDF0] transition shadow-[0_0_15px_rgba(245,211,107,0.15)]">
                      Unlock Engine
                    </a>
                  </div>
                ) : (
                  <a href={asset.link} className="block w-full text-center px-4 py-3 bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs uppercase tracking-widest font-mono font-bold hover:bg-[#10B981] hover:text-[#032213] transition">
                    Initialize Engine
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-[#10B981]/10 text-xs text-[#10B981]/50 font-mono text-center">
        VAULT PROTOCOL: SECURE // © 2026 PURE APPROACH INVESTMENTS (PTY) LTD.
      </footer>
    </div>
  );
}
