import React from 'react';
import { Star, MapPin, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';

export const PropertyCard = ({ property }) => {
  const { wishlist, toggleWishlist, setSelectedProperty, currency } = useApp();
  const isWishlisted = wishlist.includes(property.id);

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl md:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Media Image & Wishlist Button */}
      <div 
        className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => setSelectedProperty(property)}
      >
        <img
          src={property.images[0]}
          alt={property.name || property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge */}
        {property.badge && (
          <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            <span>{property.badge}</span>
          </div>
        )}

        {/* Heart Wishlist Button */}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all cursor-pointer shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(property.id);
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? '#FF385C' : 'transparent'} color={isWishlisted ? '#FF385C' : '#334155'} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1">
        {/* Meta row: Location & Rating */}
        <div className="flex items-center justify-between gap-1 mb-1.5 text-xs">
          <div className="flex items-center gap-1 text-slate-500 truncate">
            <MapPin size={12} className="text-coral-500 shrink-0" />
            <span className="truncate">{property.city || property.location}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-slate-800 shrink-0">
            <Star size={12} fill="#F59E0B" className="text-amber-400" />
            <span>{property.rating}</span>
          </div>
        </div>

        {/* Property Name */}
        <h3
          className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-coral-600 transition-colors cursor-pointer line-clamp-1 mb-1"
          onClick={() => setSelectedProperty(property)}
          title={property.name || property.title}
        >
          {property.name || property.title}
        </h3>

        {/* Amenities tags */}
        <div className="flex items-center gap-1.5 flex-wrap my-2">
          {property.amenities && property.amenities.slice(0, 2).map((amenity, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] sm:text-xs px-2 py-0.5 rounded-md font-medium">
              {amenity}
            </span>
          ))}
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-sm sm:text-lg font-black text-slate-900">
              {formatPrice(property.pricePerNight || property.price, currency)}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400"> / night</span>
          </div>

          <button
            className="inline-flex items-center gap-1 bg-slate-900 hover:bg-black text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            onClick={() => setSelectedProperty(property)}
          >
            <span>View</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
