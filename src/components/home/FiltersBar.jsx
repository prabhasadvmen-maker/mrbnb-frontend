import React from 'react';
import { Star, Briefcase, RotateCcw, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const COMMON_AMENITIES = ['Wi-Fi', 'Pool', 'Workspace', 'Kitchen', 'Breakfast'];

export const FiltersBar = () => {
  const {
    corporateOnly,
    setCorporateOnly,
    minRating,
    setMinRating,
    priceRange,
    setPriceRange,
    selectedAmenities,
    setSelectedAmenities,
    filteredProperties,
    searchDestination,
    setSearchDestination,
    setSelectedCategory
  } = useApp();

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handlePriceSelect = (range) => {
    setPriceRange(range);
  };

  const resetAllFilters = () => {
    setCorporateOnly(false);
    setMinRating(0);
    setPriceRange([4000, 30000]);
    setSelectedAmenities([]);
    setSearchDestination('');
    setSelectedCategory('all');
  };

  const isFiltered =
    corporateOnly ||
    minRating > 0 ||
    priceRange[0] > 4000 ||
    priceRange[1] < 30000 ||
    selectedAmenities.length > 0 ||
    searchDestination !== '';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
        {/* Corporate Verified Pill */}
        <button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            corporateOnly
              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
          onClick={() => setCorporateOnly(!corporateOnly)}
        >
          <Briefcase size={14} className={corporateOnly ? 'text-[#00D06C]' : 'text-slate-500'} />
          <span>Corporate Verified</span>
          {corporateOnly && <Check size={14} className="text-[#00D06C]" />}
        </button>

        {/* 4.9+ Rating Filter */}
        <button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            minRating === 4.9
              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
          onClick={() => setMinRating(minRating === 4.9 ? 0 : 4.9)}
        >
          <Star size={14} className="text-amber-400" fill={minRating === 4.9 ? '#F59E0B' : 'transparent'} />
          <span>Top Rated (4.9+)</span>
        </button>

        {/* Price Tier: Under 8k */}
        <button
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            priceRange[1] === 8000
              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
          onClick={() => handlePriceSelect(priceRange[1] === 8000 ? [4000, 30000] : [4000, 8000])}
        >
          <span>Under ₹8,000</span>
        </button>

        {/* Price Tier: 8k to 14k */}
        <button
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            priceRange[0] === 8000 && priceRange[1] === 14000
              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
          onClick={() =>
            handlePriceSelect(
              priceRange[0] === 8000 && priceRange[1] === 14000 ? [4000, 30000] : [8000, 14000]
            )
          }
        >
          <span>₹8,000 – ₹14,000</span>
        </button>

        {/* Price Tier: Luxury 14k+ */}
        <button
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            priceRange[0] === 14000
              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
          onClick={() => handlePriceSelect(priceRange[0] === 14000 ? [4000, 30000] : [14000, 50000])}
        >
          <span>Luxury (₹14k+)</span>
        </button>

        {/* Amenity Pills */}
        {COMMON_AMENITIES.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity);
          return (
            <button
              key={amenity}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-coral-500 border-coral-500 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => toggleAmenity(amenity)}
            >
              <span>{amenity}</span>
              {isSelected && <Check size={12} />}
            </button>
          );
        })}

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-1.5 text-xs text-coral-500 font-bold px-2.5 py-1.5 rounded-lg hover:bg-coral-50 transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Stats Counter */}
      <div className="text-xs text-slate-500 shrink-0 font-medium">
        Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> stays
        {searchDestination ? ` in "${searchDestination}"` : ' across India'}
      </div>
    </div>
  );
};

export default FiltersBar;
