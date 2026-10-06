import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Heart, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { getMultipleImages } from '../../data/localImages';

export const HavenPropertyCard = ({ 
  home, 
  property, 
  wishlist: propWishlist, 
  toggleWishlist: propToggleWishlist, 
  onOpenDetail, 
  currency: propCurrency, 
  index = 0 
}) => {
  const context = useApp();
  
  // Resolve item
  const item = home || property || {};
  
  // Resolve props or context
  const wishlist = propWishlist || context.wishlist || [];
  const toggleWishlist = propToggleWishlist || context.toggleWishlist;
  const currency = propCurrency || context.currency || 'INR';
  const handleOpenDetail = onOpenDetail || ((selected) => {
    if (context.setSelectedProperty) {
      context.setSelectedProperty({
        ...selected,
        images: selected.images || getMultipleImages(index * 3, 6)
      });
    }
  });

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = item.id ? wishlist.includes(item.id) : false;

  const imagesList = (item.images && item.images.length > 0)
    ? item.images
    : (item.image ? [item.image] : getMultipleImages(index * 3, 6));

  useEffect(() => {
    if (!imagesList || imagesList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % imagesList.length);
    }, 3200 + ((index % 3) * 400));

    return () => clearInterval(interval);
  }, [imagesList, index]);

  const locationText = item.location || (item.city ? `${item.city}${item.state ? `, ${item.state}` : ''}` : 'Prime Business Hub');
  const ratingVal = item.rating || 4.88;
  const priceVal = item.pricePerNight || item.price || 4200;
  const badgeText = item.badge || item.type || (item.corporate ? 'Corporate Ready' : 'City View');
  const bedsText = item.beds || (item.guests ? `${item.guests} Guests` : '3 Beds');
  const bathsText = item.baths || '2 Baths';
  const areaText = item.area || '2,100 sq.ft';
  const descText = item.overview || item.highlight || `${locationText} • Premium serviced sanctuary with high-speed fiber internet and dedicated executive workspace.`;

  return (
    <div
      className="group flex flex-col h-full bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative cursor-pointer box-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleOpenDetail(item)}
    >
      {/* 1. Media Container with Smooth Slideshow & Seamless Scooped Corner Dock */}
      <div className="relative h-[155px] sm:h-[185px] md:h-[235px] overflow-hidden bg-slate-900 shrink-0">
        {imagesList.map((imgUrl, idx) => (
          <img
            key={idx}
            src={imgUrl}
            alt={`${item.name} view ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              idx === activeImgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            loading="lazy"
          />
        ))}

        {/* Top-left Glass Pill Badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-slate-900 shadow-sm z-10">
          <span>{badgeText}</span>
        </div>

        {/* Top-right Wishlist Heart */}
        <button
          type="button"
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white z-10 hover:scale-110 transition-transform cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (toggleWishlist && item.id) toggleWishlist(item.id);
          }}
          title={isWishlisted ? 'Remove from saved' : 'Save to wishlist'}
        >
          <Heart
            size={14}
            fill={isWishlisted ? '#FF385C' : 'transparent'}
            color={isWishlisted ? '#FF385C' : '#FFFFFF'}
          />
        </button>

        {/* Seamless Scooped Dock for Circular Action Arrow (Reference Design Matching) */}
        <div className="absolute bottom-0 right-0 z-10">
          {/* Top Inverted Fillet (Curves from image right edge into dock) */}
          <svg
            viewBox="0 0 20 20"
            className="absolute -top-5 right-0 w-5 h-5 fill-white pointer-events-none"
            aria-hidden="true"
          >
            <path d="M20,20 L20,0 C20,11.0457 11.0457,20 0,20 Z" />
          </svg>

          {/* Left Inverted Fillet (Curves from image bottom edge into dock) */}
          <svg
            viewBox="0 0 20 20"
            className="absolute bottom-0 -left-5 w-5 h-5 fill-white pointer-events-none"
            aria-hidden="true"
          >
            <path d="M20,20 L0,20 C11.0457,20 20,11.0457 20,0 Z" />
          </svg>

          {/* White Dock Socket matching card body */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-white rounded-tl-[20px] sm:rounded-tl-[26px] flex items-center justify-center pt-1 pl-1 sm:pt-1.5 sm:pl-1.5">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isHovered
                  ? 'bg-[#00D06C] text-[#042612] shadow-md scale-105'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
              }`}
            >
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Structured Card Body Matching Reference Image 1 */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Line 1: Specs Line (4 Beds | 3 Baths | 2,800 sq.ft) */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500 font-medium mb-1">
            <span>{bedsText}</span>
            <span className="text-slate-300">|</span>
            <span>{bathsText}</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">{areaText}</span>
          </div>

          {/* Line 2: Property Title */}
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-coral-600 transition-colors line-clamp-1 mb-1">
            {item.name}
          </h3>

          {/* Line 3: Description snippet (like Image 1) */}
          <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2.5">
            {descText}
          </p>
        </div>

        {/* Line 4: Bottom Price & Rating Row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Price:</span>
            <span className="text-xs sm:text-sm md:text-base font-extrabold text-slate-950">
              {formatPrice(priceVal, currency)}
            </span>
            <small className="text-[9px] sm:text-xs text-slate-400">/ night</small>
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-800 bg-amber-50 border border-amber-200/70 px-1.5 py-0.5 rounded">
            <Star size={11} fill="#FFB800" color="#FFB800" />
            <span>{ratingVal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HavenPropertyCard;
