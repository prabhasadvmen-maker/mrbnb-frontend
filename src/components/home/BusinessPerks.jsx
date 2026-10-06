import React, { useState, useEffect } from 'react';
import { ArrowRight, Wifi, Calendar, Headphones, Users2, FileText, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getImage } from '../../data/localImages';

export const BusinessPerks = () => {
  const { setCorporateOnly } = useApp();
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);

  // Property images curated from local src/assets for business stays
  const businessProperties = [
    {
      img: getImage(1),
      title: 'Executive High-Rise Penthouse',
      location: 'DLF Cyber City, Gurgaon',
      highlight: 'Dedicated Ergonomic Desk & 500 Mbps Wi-Fi'
    },
    {
      img: getImage(3),
      title: 'Indiranagar Urban Loft',
      location: 'HAL 2nd Stage, Bengaluru',
      highlight: 'Silent Work Pods & Automated Digital Key'
    },
    {
      img: getImage(5),
      title: 'Bandra Coastal Executive Haven',
      location: 'BKC Business Hub, Mumbai',
      highlight: 'Corporate GST Invoices & Concierge Support'
    },
    {
      img: getImage(7),
      title: 'The Palm Glasshouse Residences',
      location: 'Whitefield Tech Corridor, Bengaluru',
      highlight: 'Private Meeting Room & Smart Board Access'
    },
    {
      img: getImage(9),
      title: 'Skyline Terrace Corporate Suite',
      location: 'Connaught Place, Central Delhi',
      highlight: 'Power Backup & Executive Lounge Access'
    }
  ];

  // Auto-cycle through property images every 3.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePropertyIndex((prev) => (prev + 1) % businessProperties.length);
    }, 3400);

    return () => clearInterval(timer);
  }, [businessProperties.length]);

  const handleExploreBusinessStays = () => {
    if (setCorporateOnly) setCorporateOnly(true);
    const element = document.getElementById('featured-stays-section') || document.getElementById('properties-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const perks = [
    { icon: <Wifi size={18} className="text-coral-500" />, text: 'Work-friendly spaces' },
    { icon: <Calendar size={18} className="text-coral-500" />, text: 'Monthly & long stays' },
    { icon: <Headphones size={18} className="text-coral-500" />, text: '24/7 support' },
    { icon: <Users2 size={18} className="text-coral-500" />, text: 'Team booking management' },
    { icon: <FileText size={18} className="text-coral-500" />, text: 'GST invoices' },
    { icon: <ShieldCheck size={18} className="text-coral-500" />, text: 'Verified properties' },
  ];

  const currentProperty = businessProperties[activePropertyIndex];

  return (
    <section id="business-perks-section" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/60 overflow-hidden">
      <div className="w-full px-[4%] mx-auto box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image Slider Showcase */}
          <div className="lg:col-span-6 relative anim-from-left">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
              {businessProperties.map((prop, idx) => (
                <img
                  key={idx}
                  src={prop.img}
                  alt={prop.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    idx === activePropertyIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                  loading="lazy"
                />
              ))}

              {/* Gradient Scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none"></div>

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-[#00D06C] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Sparkles size={13} />
                <span className="text-white">Verified Business Property</span>
              </div>

              {/* Bottom Floating Glass Card with Current Property Information */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-4 text-white shadow-2xl">
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium mb-1">
                  <MapPin size={13} className="text-coral-400" />
                  <span>{currentProperty.location}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-0.5 truncate">
                  {currentProperty.title}
                </h4>
                <p className="text-xs text-slate-200 mb-3 truncate">
                  {currentProperty.highlight}
                </p>

                {/* Slider Dot Indicators */}
                <div className="flex items-center gap-1.5">
                  {businessProperties.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === activePropertyIndex ? 'w-6 bg-coral-500' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      onClick={() => setActivePropertyIndex(dotIdx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Perks and Content */}
          <div className="lg:col-span-6 flex flex-col items-start anim-from-right">
            <span className="inline-block text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200/80 px-3 py-1 rounded-full mb-3">
              FOR BUSINESS TRAVELLERS &amp; TEAMS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
              Stays that keep <br />
              you <span className="text-coral-500">moving forward.</span>
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-lg">
              Flexible, comfortable and productive stays for individuals, teams and organizations with verified high-speed workspaces.
            </p>

            {/* 6 Perks Grid */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full mb-8">
              {perks.map((perk, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-sm hover:border-coral-500/30 hover:shadow-md transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-coral-50 flex items-center justify-center shrink-0">
                    {perk.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {perk.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="inline-flex items-center gap-2.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              onClick={handleExploreBusinessStays}
            >
              <span>Explore business stays</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BusinessPerks;
