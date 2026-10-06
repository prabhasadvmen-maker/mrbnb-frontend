import React from 'react';

export const ValueProps = () => {
  const perks = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 12L2 9z"/>
          <path d="M12 21 7 9h10z"/>
          <path d="M2 9h20"/>
        </svg>
      ),
      title: 'Curated & Verified',
      desc: 'Quality stays for business and long-term travellers.'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
          <path d="M9 22v-4h6v4"/>
          <path d="M8 6h.01"/>
          <path d="M16 6h.01"/>
          <path d="M12 6h.01"/>
          <path d="M12 10h.01"/>
          <path d="M12 14h.01"/>
          <path d="M16 10h.01"/>
          <path d="M16 14h.01"/>
          <path d="M8 10h.01"/>
          <path d="M8 14h.01"/>
        </svg>
      ),
      title: 'Business Ready',
      desc: 'Work-friendly spaces, fast Wi-Fi and seamless check-in.'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'For Individuals & Teams',
      desc: "From solo trips to large teams, we've got you covered."
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" x2="22" y1="12" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      title: 'Global Destinations',
      desc: 'Stays in top business hubs worldwide.'
    }
  ];

  return (
    <section className="py-10 md:py-14 bg-white border-b border-slate-100">
      <div className="w-full px-[4%] mx-auto box-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:bg-white hover:border-coral-500/30 hover:shadow-lg hover:shadow-coral-500/5 transition-all duration-300 group ${
                idx % 2 === 0 ? 'anim-from-left' : 'anim-from-right'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-coral-50 border border-coral-100 flex items-center justify-center text-coral-500 group-hover:scale-110 group-hover:bg-coral-500 group-hover:text-white transition-all shrink-0">
                {perk.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-coral-600 transition-colors">
                  {perk.title}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
