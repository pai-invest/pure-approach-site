"use client";
import React from 'react';

export default function DigitalDivision() {
  const products = [
    {
      id: "tax-efficiency-matrix",
      title: "Tax Efficiency Matrix",
      category: "Governance",
      description: "A professional structural audit comparing Sole Proprietor vs. Corporate Entity tax burdens.",
      price: "R 1,800",
      link: "/digital/vault/tax-efficiency"
    },
    {
      id: "global-swing-matrix",
      title: "Global Swing Matrix",
      category: "Trading",
      description: "Proprietary algorithmic tracking system for US equity swings and international capital allocation.",
      price: "R 2,500",
      link: "/digital/vault/global-swing"
    }
  ];

  return (
    <div className="min-h-screen bg-[#032213] text-[#F5D36B] font-sans">
      <header className="max-w-5xl mx-auto px-6 pt-16 border-b border-[#10B981]/10 pb-12">
        <h1 className="text-4xl font-serif text-[#FFFDF0] uppercase tracking-widest">Digital Asset Registry</h1>
        <p className="text-[#10B981] font-mono text-xs mt-2">PURE APEX PULSE // MULTI-PRODUCT DEPLOYMENT</p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="p-8 bg-[#021A0E] border border-[#10B981]/20 rounded-xl hover:border-[#F5D36B]/50 transition duration-300">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#10B981]">{product.category}</span>
            <h3 className="text-xl text-[#FFFDF0] font-serif mt-2 mb-4">{product.title}</h3>
            <p className="text-sm text-[#F5D36B]/70 font-light mb-8">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[#FFFDF0]">{product.price}</span>
              <a href={product.link} className="px-6 py-2 bg-[#032213] border border-[#10B981]/30 hover:border-[#10B981] text-xs font-mono uppercase tracking-widest transition">
                Access Engine
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
