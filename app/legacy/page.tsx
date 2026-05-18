import React from 'react';

export default function PureLegacyFoundation() {
  // Custom multi-metallic gradient to support the Blue, Gold, and Green logo
  const legacyGradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #A7F3D0 0%, #34D399 25%, #3B82F6 50%, #FBBF24 75%, #D4AF37 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const sageText = {
    color: '#A7F3D0' // Light mint/sage
  };

  return (
    <div className="min-h-screen bg-[#050f0a] text-neutral-300 font-sans selection:bg-emerald-900 selection:text-emerald-100 pb-24">
      
      {/* Foundation Top Navigation */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-emerald-500/10 gap-6">
        {/* Seamless Branded Image Node Wrapper */}
        <div className="flex items-center justify-center shrink-0 bg-white/5 p-4 rounded-xl border border-emerald-500/20 shadow-[0_0_30px_rgba(52,211,153,0.1)]">
          {/* Ensure your logo is saved as legacylogo.png in the public folder */}
          <img 
            src="/legacylogo.png" 
            alt="Pure Legacy Foundation Logo" 
            className="h-24 sm:h-28 w-auto object-contain"
          />
        </div>

        <div className="w-full flex justify-between items-center mt-4">
          <a href="/" className="text-xs font-bold tracking-[0.2em] text-emerald-400 hover:text-white transition font-mono">
            ← PURE APPROACH TERMINAL
          </a>
          <div className="text-xs tracking-widest font-mono flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
            <span className="text-emerald-50 font-bold uppercase">Impact_Node // Live</span>
          </div>
        </div>
      </header>

      {/* Main Framework Content */}
      <main className="max-w-5xl mx-auto px-6 pt-16">
        
        {/* Manifest Header */}
        <div className="max-w-4xl">
          <span className="text-xs font-bold tracking-[0.4em] text-emerald-500 uppercase font-mono block mb-2">
            Social Responsibility // Division 05
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight uppercase filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" style={legacyGradientStyle}>
            Pure Legacy Foundation
          </h1>
          
          {/* Sidebar Highlight Quote */}
          <div className="mt-10 border-l-4 border-emerald-500/60 pl-6 py-2 bg-gradient-to-r from-emerald-900/20 to-transparent">
            <p className="text-xl md:text-2xl font-medium tracking-wide italic leading-relaxed text-white">
              "True prosperity is realized when corporate success directly drives community restoration."
            </p>
          </div>
        </div>

        {/* Vision & Philosophy Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-emerald-50/80 font-light">
            <h2 className="text-sm font-bold tracking-[0.3em] text-emerald-500 uppercase font-mono mb-4">
              Our Vision
            </h2>
            <p>
              At the <strong className="font-semibold text-white">Pure Legacy Foundation</strong>, we believe that true wealth is measured not just by the returns we generate, but by the legacy of positive change we leave behind. 
            </p>
            <p>
              Operating as the dedicated social responsibility division of Pure Approach Investments (Pty) Ltd, the Foundation serves as our vehicle for purposed philanthropy—transforming market success into sustainable, real-world impact.
            </p>
          </div>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-emerald-50/80 font-light">
            <h2 className="text-sm font-bold tracking-[0.3em] text-emerald-500 uppercase font-mono mb-4">
              Pure Returns, Lasting Impact
            </h2>
            <p>
              We approach philanthropy with the same strategic mindset that drives our investment and trading divisions. To us, charity is a continuous investment in humanity—an intentional effort to purify our corporate gains by uplifting the collective society.
            </p>
            <p>
              Every trade executed, every corporate division launched, and every milestone achieved across our group directly fuels the Pure Legacy Foundation. We build our business success with a singular, defining purpose: to leave a pure, enduring legacy that extends far beyond the balance sheet.
            </p>
          </div>
        </section>

        {/* Execution Grid - What We Do */}
        <section className="mt-24 pt-16 border-t border-emerald-500/10">
          <h2 className="text-sm font-bold tracking-[0.3em] text-emerald-500 uppercase font-mono mb-6 text-center">
            Operational Focus: What We Do
          </h2>
          <p className="text-center text-lg text-emerald-50/70 max-w-3xl mx-auto mb-16 font-light">
            The Pure Legacy Foundation acts with precision and agility to direct corporate funding toward critical community needs, crisis relief, and long-term restoration initiatives. By bypassing institutional layers, we ensure that capital flows directly to where it is needed most.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 01 */}
            <div className="p-8 rounded-xl bg-[#081812] border border-emerald-500/20 hover:border-emerald-400/40 transition duration-500 shadow-xl shadow-emerald-900/10 flex flex-col justify-start">
              <div className="text-xs font-mono text-emerald-600 mb-4 tracking-widest">[VECTOR_01]</div>
              <h3 className="text-xl font-bold mb-4 text-white">Direct Community Relief</h3>
              <p className="text-sm md:text-base text-emerald-50/60 leading-relaxed font-light">
                Providing immediate, essential support, food security, and supplies to vulnerable communities and grassroots organizations operating on the front lines.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="p-8 rounded-xl bg-[#081812] border border-emerald-500/20 hover:border-emerald-400/40 transition duration-500 shadow-xl shadow-emerald-900/10 flex flex-col justify-start">
              <div className="text-xs font-mono text-emerald-600 mb-4 tracking-widest">[VECTOR_02]</div>
              <h3 className="text-xl font-bold mb-4 text-white">Restoration & Rebuilding</h3>
              <p className="text-sm md:text-base text-emerald-50/60 leading-relaxed font-light">
                Funding sustainable initiatives aimed at restoring dignity, renewing local infrastructure, and empowering individuals to rebuild their futures.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="p-8 rounded-xl bg-[#081812] border border-emerald-500/20 hover:border-emerald-400/40 transition duration-500 shadow-xl shadow-emerald-900/10 flex flex-col justify-start">
              <div className="text-xs font-mono text-emerald-600 mb-4 tracking-widest">[VECTOR_03]</div>
              <h3 className="text-xl font-bold mb-4 text-white">Strategic Philanthropy</h3>
              <p className="text-sm md:text-base text-emerald-50/60 leading-relaxed font-light">
                Allocating targeted corporate sponsorships and resources to registered public benefit causes that align with our core values of clarity, impact, and transparency.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 mt-24 border-t border-emerald-500/10 text-xs text-center font-mono tracking-widest" style={sageText}>
        © 2026 PURE LEGACY FOUNDATION. THE SOCIAL RESPONSIBILITY DIVISION OF PURE APPROACH INVESTMENTS (PTY) LTD.
      </footer>
    </div>
  );
}
