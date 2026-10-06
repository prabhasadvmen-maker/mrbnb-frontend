import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Background images for rotating Hero section
import heroBg1 from '../../assets/edc020124lauder-004-656776cf4986f.avif';
import heroBg2 from '../../assets/wp4110663.jpg';
import heroBg3 from '../../assets/86cdbbcd-4cec-4290-920e-9e65601e62b8.avif';
import heroBg4 from '../../assets/winter_villa_reviews_bg.jpg';
import heroBg5 from '../../assets/c72f97e6-aec7-4518-bffc-d99ecc201777.avif';

const HERO_BACKGROUNDS = [
  heroBg1,
  heroBg2,
  heroBg3,
  heroBg4,
  heroBg5
];

export const HeroSearch = () => {
  const {
    searchDestination = '',
    setSearchDestination,
    checkInDate = '2026-10-15',
    setCheckInDate,
    checkOutDate = '2026-10-19',
    setCheckOutDate,
    guestsCount = 2,
    setGuestsCount,
    setCorporateOnly,
    navigate
  } = useApp();

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 4200);
    return () => clearInterval(bgTimer);
  }, []);

  const [activeTab, setActiveTab] = useState('stays');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const totalGuests =
    typeof guestsCount === 'object' && guestsCount !== null
      ? ((guestsCount.adults || 0) + (guestsCount.children || 0)) || 1
      : (Number(guestsCount) || 1);

  const handleGuestChange = (delta) => {
    if (!setGuestsCount) return;
    if (typeof guestsCount === 'object' && guestsCount !== null) {
      const currentAdults = guestsCount.adults ?? 1;
      const nextAdults = Math.max(1, currentAdults + delta);
      setGuestsCount({
        ...guestsCount,
        adults: nextAdults
      });
    } else {
      const current = Number(guestsCount) || 1;
      setGuestsCount(Math.max(1, current + delta));
    }
  };

  const topLocations = [
    { city: 'Mumbai', state: 'Maharashtra', stays: '1,200+', slug: 'mumbai' },
    { city: 'Bengaluru', state: 'Karnataka', stays: '950+', slug: 'bengaluru' },
    { city: 'Delhi NCR', state: 'Delhi / Haryana', stays: '1,100+', slug: 'delhi-ncr' },
    { city: 'Hyderabad', state: 'Telangana', stays: '820+', slug: 'hyderabad' },
    { city: 'Pune', state: 'Maharashtra', stays: '640+', slug: 'pune' },
    { city: 'Goa', state: 'Goa', stays: '530+', slug: 'goa' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'teams') {
      if (setCorporateOnly) setCorporateOnly(true);
    }
    const element = document.getElementById('featured-stays-section') || document.getElementById('properties-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 sm:pt-28 md:pt-32 pb-16 overflow-hidden bg-[#0A0E1A]">
      {/* Background Slideshow */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {HERO_BACKGROUNDS.map((bg, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              idx === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080E1C]/40 via-transparent to-[#080E1C]/75 pointer-events-none z-[1]"></div>

      <div className="relative z-10 w-full px-[4%] mx-auto flex flex-col md:flex-row items-end justify-between box-border">
        {/* Left Content */}
        <div className="w-full max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap mb-3.5">
            <span className="inline-flex items-center bg-coral-500/20 border border-coral-500/40 text-coral-400 text-[11px] font-extrabold tracking-widest px-3.5 py-1 rounded-full uppercase backdrop-blur-md">
              BUSINESS STAYS. A BETTER WAY.
            </span>
            <span className="text-xs font-semibold text-white/85 tracking-wide">✦ Over 5,000+ Corporate Bookings</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight md:leading-[1.15] mb-3 tracking-tight">
            Premium stays for <br />
            <span className="text-coral-500">a more productive you.</span>
          </h1>

          <p className="text-sm md:text-base text-white/85 max-w-xl leading-relaxed mb-6">
            Curated homes, serviced apartments, and architectural villas designed for modern business travellers and high-performing teams.
          </p>

          {/* Floating Frosted Glass Search Widget Card */}
          <div className="bg-white/20 backdrop-blur-2xl border border-white/35 rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-2xl w-full max-w-3xl">
            {/* 3 Tabs with Glass Pills */}
            <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'stays'
                    ? 'bg-white text-coral-500 shadow-md font-bold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                onClick={() => setActiveTab('stays')}
              >
                <span>Stays</span>
              </button>

              <button
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'monthly'
                    ? 'bg-white text-coral-500 shadow-md font-bold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                onClick={() => setActiveTab('monthly')}
              >
                <Calendar size={13} strokeWidth={2.2} />
                <span>Monthly Stays</span>
              </button>

              <button
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'teams'
                    ? 'bg-white text-coral-500 shadow-md font-bold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                onClick={() => setActiveTab('teams')}
              >
                <Users size={13} strokeWidth={2.2} />
                <span>For Teams</span>
              </button>
            </div>

            {/* Inputs Row */}
            <form className="flex flex-col md:flex-row items-stretch md:items-center bg-white/95 backdrop-blur-xl border border-white/80 rounded-xl md:rounded-2xl p-2 gap-2 shadow-lg" onSubmit={handleSearchSubmit}>
              {/* Where */}
              <div
                className="flex items-center gap-2.5 p-2 md:p-2.5 flex-1 relative cursor-pointer min-w-0"
                onClick={() => setShowLocationPicker(!showLocationPicker)}
              >
                <div className="text-slate-500 shrink-0">
                  <MapPin size={17} strokeWidth={2} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-900 mb-0.5 whitespace-nowrap">Where are you going?</span>
                  <input
                    type="text"
                    className="border-none bg-transparent outline-none text-xs text-slate-700 w-full p-0 font-medium placeholder-slate-400"
                    placeholder="City, area or property"
                    value={searchDestination || ''}
                    onChange={(e) => setSearchDestination && setSearchDestination(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Location Quick Dropdown */}
                {showLocationPicker && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-2">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider">Top Business Hubs</div>
                    {topLocations.map((loc) => (
                      <div
                        key={loc.city}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer text-xs text-slate-800 hover:bg-slate-50 hover:text-coral-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (setSearchDestination) setSearchDestination(loc.city);
                          setShowLocationPicker(false);
                          if (navigate) navigate(`/destination/${loc.slug}`);
                        }}
                      >
                        <MapPin size={13} className="text-slate-400" />
                        <div>
                          <strong>{loc.city}</strong>
                          <span className="text-slate-500"> — {loc.state}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200 shrink-0" />

              {/* Check-in */}
              <div className="flex items-center gap-2.5 p-2 md:p-2.5 flex-1 relative min-w-0">
                <div className="text-slate-500 shrink-0">
                  <Calendar size={17} strokeWidth={2} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-900 mb-0.5 whitespace-nowrap">Check-in</span>
                  <input
                    type="date"
                    className="border-none bg-transparent outline-none text-xs text-slate-700 w-full p-0 font-medium cursor-pointer"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate && setCheckInDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200 shrink-0" />

              {/* Check-out */}
              <div className="flex items-center gap-2.5 p-2 md:p-2.5 flex-1 relative min-w-0">
                <div className="text-slate-500 shrink-0">
                  <Calendar size={17} strokeWidth={2} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-900 mb-0.5 whitespace-nowrap">Check-out</span>
                  <input
                    type="date"
                    className="border-none bg-transparent outline-none text-xs text-slate-700 w-full p-0 font-medium cursor-pointer"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate && setCheckOutDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200 shrink-0" />

              {/* Guests */}
              <div
                className="flex items-center gap-2.5 p-2 md:p-2.5 flex-1 relative cursor-pointer min-w-0"
                onClick={() => setShowGuestPicker(!showGuestPicker)}
              >
                <div className="text-slate-500 shrink-0">
                  <Users size={17} strokeWidth={2} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-900 mb-0.5 whitespace-nowrap">Who's Staying?</span>
                  <span className="text-xs text-slate-700 font-medium">
                    {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>

                {showGuestPicker && (
                  <div
                    className="absolute top-[calc(100%+8px)] right-0 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 p-3.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Guests</div>
                        <div className="text-[10px] text-slate-500 font-normal">Ages 13 or above</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:border-coral-500 cursor-pointer disabled:opacity-40 transition-colors"
                          disabled={totalGuests <= 1}
                          onClick={() => handleGuestChange(-1)}
                        >
                          -
                        </button>
                        <span className="font-bold text-xs w-4 text-center">{totalGuests}</span>
                        <button
                          type="button"
                          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:border-coral-500 cursor-pointer transition-colors"
                          onClick={() => handleGuestChange(1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-coral-500 hover:bg-coral-600 text-white rounded-xl px-6 py-3 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
              >
                <Search size={16} />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
