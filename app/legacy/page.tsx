import React from 'react';
import { Playfair_Display } from 'next/font/google';

// Injecting the elegant serif font globally
const globalFont = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'] 
});

export default function PureLegacyFoundation() {
  const legacyGradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #0A1C40 0%, #0D2B5E 40%, #10B981 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    /* The Background is now a brighter, more vibrant green: #C6F6D5 */
    <div className={`min-h-screen bg-[#C6F6D5] text-[#0F1C14] ${globalFont.className} selection:bg-[#1E3A8A] selection:text-white pb-24`}>
      
      {/* Foundation Top Navigation */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center border-b border-[#0F1C14]/10 gap-6">
        
        {/* THE LOGO WRAPPER: White box removed, logo floats naturally with a drop shadow */}
        <div className="flex items-center justify-center shrink-0">
          <img 
            src="/legacylogo.png" 
            alt="Pure Legacy Foundation Logo" 
            className="h-40 sm:h-48 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        <div className="w-full flex justify-between items-center mt-6">
          <a href="/" className="text-sm font-bold tracking-[0.2em] text-[#0A1C40] hover:text-[#10B981] transition uppercase">
            ← Pure Approach Terminal
          </a>
          <div className="text-xs tracking-widest flex items-center gap-2 bg-white/90 px-4 py-2 rounded shadow-sm border border-[#0F1C14]/5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#0A1C40] font-bold uppercase tracking-widest">Impact Node // Live</span>
          </div>
        </div>
      </header>

      {/* Main Framework Content */}
      <main className="max-w-5xl mx-auto px-6 pt-16">
        
        {/* Manifest Header */}
        <div className="max-w-4xl">
          <span className="text-sm font-bold tracking-[0.4em] text-[#0A1C40] uppercase block mb-4">
            Social Responsibility // Division 05
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-sm mb-2" style={legacyGradientStyle}>
            Pure Legacy Foundation
          </h1>
          
          <div className="mt-12 border-l-4 border-[#D4AF37] pl-8 py-4 bg-gradient-to-r from-white/40 to-transparent">
            <p className="text-xl md:text-2xl font-semibold tracking-wide italic leading-relaxed text-[#0A1C40]">
              "True prosperity is realized when corporate success directly drives community restoration."
            </p>
          </div>
        </div>

        {/* Vision & Philosophy Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-[#1A2E22] font-medium">
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4">
              Our Vision
            </h2>
            <p>
              At the <strong className="font-bold text-[#0A1C40]">Pure Legacy Foundation</strong>, we believe that true wealth is measured not just by the returns we generate, but by the legacy of positive change we leave behind. 
            </p>
            <p>
              Operating as the dedicated social responsibility division of Pure Approach Investments (Pty) Ltd, the Foundation serves as our vehicle for purposed philanthropy—transforming market success into sustainable, real-world impact.
            </p>
          </div>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-[#1A2E22] font-medium">
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-4">
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
        <section className="mt-24 pt-16 border-t border-[#0F1C14]/10">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#0A1C40] uppercase mb-6 text-center">
            Operational Focus: What We Do
          </h2>
          <p className="text-center text-lg text-[#1A2E22] max-w-3xl mx-auto mb-16 font-medium">
            The Pure Legacy Foundation acts with precision and agility to direct corporate funding toward critical community needs, crisis relief, and long-term restoration initiatives. By bypassing institutional layers, we ensure that capital flows directly to where it is needed most.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-10 rounded-xl bg-white/80 border border-white hover:border-[#D4AF37] transition duration-500 shadow-lg shadow-[#0F1C14]/5 flex flex-col justify-start backdrop-blur-sm">
              <div className="text-xs text-[#10B981] mb-6 tracking-[0.2em] uppercase font-bold border-b border-[#0F1C14]/10 pb-2 inline-block w-max">Vector_01</div>
              <h3 className="text-2xl font-bold mb-4 text-[#0A1C40]">Direct Relief</h3>
              <p className="text-base text-[#1A2E22] leading-relaxed font-medium">
                Providing immediate, essential support, food security, and supplies to vulnerable communities and grassroots organizations operating on the front lines.
              </p>
            </div>

            <div className="p-10 rounded-xl bg-white/80 border border-white hover:border-[#D4AF37] transition duration-500 shadow-lg shadow-[#0F1C14]/5 flex flex-col justify-start backdrop-blur-sm">
              <div className="text-xs text-[#10B981] mb-6 tracking-[0.2em] uppercase font-bold border-b border-[#0F1C14]/10 pb-2 inline-block w-max">Vector_02</div>
              <h3 className="text-2xl font-bold mb-4 text-[#0A1C40]">Restoration</h3>
              <p className="text-base text-[#1A2E22] leading-relaxed font-medium">
                Funding sustainable initiatives aimed at restoring dignity, renewing local infrastructure, and empowering individuals to rebuild their futures.
              </p>
            </div>

            <div className="p-10 rounded-xl bg-white/80 border border-white hover:border-[#D4AF37] transition duration-500 shadow-lg shadow-[#0F1C14]/5 flex flex-col justify-start backdrop-blur-sm">
              <div className="text-xs text-[#10B981] mb-6 tracking-[0.2em] uppercase font-bold border-b border-[#0F1C14]/10 pb-2 inline-block w-max">Vector_03</div>
              <h3 className="text-2xl font-bold mb-4 text-[#0A1C40]">Strategic Impact</h3>
              <p className="text-base text-[#1A2E22] leading-relaxed font-medium">
                Allocating targeted corporate sponsorships to registered public benefit causes that align with our core values of clarity, impact, and transparency.
              </p>
            </div>

          </div>
        </section>

      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 mt-24 border-t border-[#0F1C14]/10 text-xs text-center tracking-widest text-[#0A1C40] uppercase font-bold">
        © 2026 PURE LEGACY FOUNDATION. THE SOCIAL RESPONSIBILITY DIVISION OF PURE APPROACH INVESTMENTS (PTY) LTD.
      </footer>
    </div>
  );
}
