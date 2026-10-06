import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Sparkles, RotateCcw } from 'lucide-react';
import { PROPERTIES } from '../../data/propertiesData';
import { useApp } from '../../context/AppContext';
import { getMultipleImages } from '../../data/localImages';
import { HavenPropertyCard } from '../common/HavenPropertyCard';

export const FeaturedStays = () => {
  const {
    wishlist,
    toggleWishlist,
    setSelectedProperty,
    currency,
    searchDestination,
    setSearchDestination,
    filteredProperties
  } = useApp();

  const isFiltered = Boolean(searchDestination && searchDestination.trim());
  const displayProperties = isFiltered ? filteredProperties : PROPERTIES;
  const [visibleCount, setVisibleCount] = useState(6);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(6);
  }, [searchDestination]);

  const displayedList = displayProperties.slice(0, visibleCount);
  const hasMore = visibleCount < displayProperties.length;

  const handleOpenDetail = (home) => {
    // Pass full property object with all 6 multi-images
    setSelectedProperty({
      ...home,
      images: home.images || getMultipleImages(0, 6)
    });
  };

  return (
    <section id="featured-stays-section" className="py-12 md:py-20 bg-white haven-featured-section">
      <div className="w-full px-[4%] mx-auto box-border">
        {/* Section Header */}
        <div className="mb-8 anim-from-left">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF1F2] border border-[#FFE4E6] rounded-full px-3.5 py-1 text-xs font-bold text-[#E00B41] mb-2.5">
            <Sparkles size={14} color="#FF385C" />
            <span>Curated Architectural Properties</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            {isFiltered ? `Properties in ${searchDestination}` : 'Discover Featured Homes & Villas'}
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed">
            {isFiltered
              ? `Explore all handpicked residences and apartments currently available in ${searchDestination}.`
              : 'Explore our handpicked selection of homes that combine style, comfort, and prime locations across all major hubs.'}
          </p>
        </div>

        {/* Active Location Filter Banner */}
        {isFiltered && (
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-white/15 rounded-2xl p-4 md:p-5 flex items-center justify-between mb-8 shadow-md text-white flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-coral-500 flex items-center justify-center shadow-lg shadow-coral-500/40">
                <MapPin size={20} color="#FFFFFF" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-white m-0">
                  Showing all properties in <span className="text-coral-400">{searchDestination}</span>
                </h3>
                <p className="text-xs md:text-sm text-white/75 m-0">
                  {displayProperties.length > 0
                    ? `Found ${displayProperties.length} verified stays ready for instant booking.`
                    : 'No properties found matching this exact filter.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="bg-white/15 hover:bg-coral-500 hover:border-coral-500 text-white border border-white/25 px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all"
              onClick={() => setSearchDestination('')}
              title="Show all locations"
            >
              <RotateCcw size={14} />
              <span>Show All Locations</span>
            </button>
          </div>
        )}

        {/* Properties Grid: 2 Columns on Mobile, 3 on Desktop */}
        {displayProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-7 haven-cards-grid">
              {displayedList.map((home, index) => (
                <div key={home.id} className={index % 2 === 0 ? 'anim-from-left' : 'anim-from-right'}>
                  <HavenPropertyCard
                    home={home}
                    index={index}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    onOpenDetail={handleOpenDetail}
                    currency={currency}
                  />
                </div>
              ))}
            </div>

            {/* View More Properties Button */}
            {displayProperties.length > 6 && (
              <div className="flex justify-center items-center mt-10 w-full">
                {hasMore ? (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#FF385C] to-[#D90429] text-white text-sm md:text-base font-extrabold px-8 py-3.5 rounded-full shadow-lg shadow-coral-500/35 hover:-translate-y-0.5 hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setVisibleCount(displayProperties.length)}
                    id="btn-show-more-stays"
                  >
                    <span>View All {displayProperties.length} Properties</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-800 text-sm md:text-base font-bold px-7 py-3 rounded-full hover:border-coral-500 hover:text-coral-500 transition-all cursor-pointer shadow-sm"
                    onClick={() => {
                      setVisibleCount(6);
                      const el = document.getElementById('featured-stays-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    id="btn-show-less-stays"
                  >
                    <span>Show Fewer Stays (Top 6)</span>
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-14 px-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 mt-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-slate-500 mb-3">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Stays Found in "{searchDestination}"</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-5">
              We currently haven't onboarded luxury residences matching this specific search query.
            </p>
            <button
              type="button"
              className="bg-coral-500 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-coral-600 transition-all cursor-pointer shadow-md"
              onClick={() => setSearchDestination('')}
            >
              Reset Filters &amp; View All Stays
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
