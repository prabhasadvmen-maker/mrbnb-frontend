import React from 'react';

export const ClientLogos = () => {
  const logos = [
    {
      id: 'google',
      content: (
        <span className="font-bold text-xl tracking-tight flex items-center">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </span>
      )
    },
    {
      id: 'microsoft',
      content: (
        <div className="flex items-center gap-2 font-semibold text-lg text-slate-700">
          <span className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <span className="bg-[#F25022] w-1.5 h-1.5"></span>
            <span className="bg-[#7FBA00] w-1.5 h-1.5"></span>
            <span className="bg-[#00A4EF] w-1.5 h-1.5"></span>
            <span className="bg-[#FFB900] w-1.5 h-1.5"></span>
          </span>
          <span>Microsoft</span>
        </div>
      )
    },
    {
      id: 'amazon',
      content: (
        <span className="font-bold text-xl tracking-tighter text-slate-800">
          amazon
        </span>
      )
    },
    {
      id: 'deloitte',
      content: (
        <span className="font-bold text-lg text-slate-800">
          Deloitte<span className="text-[#86BC25]">.</span>
        </span>
      )
    },
    {
      id: 'infosys',
      content: (
        <span className="font-bold text-xl tracking-wide text-[#007CC3]">
          Infosys
        </span>
      )
    },
    {
      id: 'tcs',
      content: (
        <div className="flex flex-col text-slate-800">
          <span className="font-black text-lg tracking-wider leading-none">tcs</span>
          <span className="text-[7px] font-bold tracking-widest text-slate-400">TATA CONSULTANCY SERVICES</span>
        </div>
      )
    },
    {
      id: 'accenture',
      content: (
        <span className="font-bold text-lg text-slate-800">
          accenture<span className="text-[#A100FF] font-black">&gt;</span>
        </span>
      )
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div className="w-full px-[4%] mx-auto text-center mb-6">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400">
          Trusted by leading enterprises &amp; high-growth companies
        </p>
      </div>

      {/* Infinite Smooth Right-to-Left Ticker Marquee */}
      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* Soft edge fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex items-center gap-12 sm:gap-16 py-3">
          {/* Group 1 */}
          <div className="flex items-center gap-12 sm:gap-16 shrink-0">
            {logos.map((item, idx) => (
              <div key={`g1-${idx}`} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                {item.content}
              </div>
            ))}
          </div>

          {/* Group 2 */}
          <div className="flex items-center gap-12 sm:gap-16 shrink-0" aria-hidden="true">
            {logos.map((item, idx) => (
              <div key={`g2-${idx}`} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                {item.content}
              </div>
            ))}
          </div>

          {/* Group 3 */}
          <div className="flex items-center gap-12 sm:gap-16 shrink-0" aria-hidden="true">
            {logos.map((item, idx) => (
              <div key={`g3-${idx}`} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
