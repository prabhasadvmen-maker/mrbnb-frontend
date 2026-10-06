import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Building } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinationsData';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';

export const Destinations = () => {
  const { searchDestination, currency, navigate } = useApp();
  const carouselRef = useRef(null);
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setImageIndex((prev) => prev + 1);
    }, 3200);
    return () => clearInterval(imgInterval);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const nextIndex = (activeLocationIndex + 1) % DESTINATIONS.length;
        setActiveLocationIndex(nextIndex);

        if (scrollLeft >= maxScroll - 30) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 4800);

    return () => clearInterval(scrollInterval);
  }, [isPaused, activeLocationIndex]);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectCity = (dest) => {
    navigate(`/destination/${dest.id}`);
  };

  const activeDest = DESTINATIONS[activeLocationIndex % DESTINATIONS.length];

  return (
    <section id="destinations-section" className="py-12 md:py-16 relative w-full bg-slate-50/50">
      <div className="w-full px-[4%] mx-auto box-border">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3 anim-from-left">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFF1F2] border border-[#FFE4E6] rounded-full px-3.5 py-1 text-xs text-[#E00B41] mb-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse"></span>
              <span>
                Trending Destination: <strong>{activeDest.name}</strong> • {activeDest.count}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Popular Destinations</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              Explore verified premium corporate residences and architectural villas in top business hubs
            </p>
          </div>

          <div className="hidden md:flex items-center anim-from-right">
            <button
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800 hover:text-coral-500 transition-colors cursor-pointer"
              onClick={() => navigate(`/destination/${activeDest.id}`)}
            >
              <span>Explore {activeDest.name} stays</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Carousel Wrapper with Floating Side Arrows */}
        <div
          className="relative w-full flex items-center group anim-from-bottom"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Navigation Arrow */}
          <button
            type="button"
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-4 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-900 items-center justify-center cursor-pointer shadow-xl z-20 hover:bg-[#00D06C] hover:border-[#00D06C] hover:text-[#042612] hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
            onClick={() => handleScroll('left')}
            aria-label="Previous destinations"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          {/* Cards Row */}
          <div className="flex gap-3 md:gap-5 overflow-x-auto scroll-smooth py-3 px-1 w-full no-scrollbar" ref={carouselRef}>
            {DESTINATIONS.map((dest, dIdx) => {
              const currentImg = dest.images[imageIndex % dest.images.length];
              const isSelected = searchDestination && searchDestination.toLowerCase().includes(dest.name.toLowerCase());

              return (
                <div
                  key={dest.id}
                  className={`relative min-w-[210px] md:min-w-[240px] h-[250px] md:h-[280px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shrink-0 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-slate-900 ${
                    isSelected ? 'ring-4 ring-[#00D06C]' : ''
                  }`}
                  onClick={() => handleSelectCity(dest)}
                  title={`Explore stays in ${dest.name}`}
                >
                  <img
                    key={currentImg}
                    src={currentImg}
                    alt={`${dest.name} properties`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent pointer-events-none"></div>

                  {/* Top Badge: Stays Count */}
                  <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md text-white border border-white/20 rounded-full px-2.5 py-1 text-[11px] font-bold flex items-center gap-1 z-10">
                    <Building size={11} />
                    <span>{dest.count}</span>
                  </div>

                  {/* Card Bottom Meta Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 md:p-4 text-white z-10 flex flex-col">
                    <div className="flex items-center gap-1 mb-0.5">
                      <MapPin size={11} color="#FF385C" />
                      <span className="text-[10px] font-bold text-coral-400 uppercase tracking-wider">{dest.state}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold text-white leading-tight mb-0.5">{dest.name}</h3>
                    <p className="text-[11px] text-white/80 truncate mb-1.5">{dest.popularFor}</p>

                    <div className="flex items-baseline gap-1 pt-1.5 border-t border-white/15">
                      <span className="text-[10px] text-white/70">From:</span>
                      <span className="text-xs font-extrabold text-[#00D06C]">{formatPrice(dest.avgPrice, currency)} / night</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-4 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-900 items-center justify-center cursor-pointer shadow-xl z-20 hover:bg-[#00D06C] hover:border-[#00D06C] hover:text-[#042612] hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
            onClick={() => handleScroll('right')}
            aria-label="Next destinations"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};
