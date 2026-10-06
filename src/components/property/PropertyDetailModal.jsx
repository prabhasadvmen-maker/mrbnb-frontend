import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  MapPin,
  CheckCircle2,
  Heart,
  Share2,
  Shield,
  Coffee,
  Wifi,
  Sparkles,
  Clock,
  ArrowRight,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { getMultipleImages } from '../../data/localImages';

export const PropertyDetailModal = () => {
  const {
    selectedProperty,
    setSelectedProperty,
    setBookingProperty,
    wishlist,
    toggleWishlist,
    currency
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [showAllPhotosModal, setShowAllPhotosModal] = useState(false);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);

  // Safely compute imagesList before hooks
  const imagesList = selectedProperty
    ? (selectedProperty.images && selectedProperty.images.length >= 3)
      ? selectedProperty.images
      : [
          ...(selectedProperty.images || []),
          ...getMultipleImages(0, 6)
        ].slice(0, 8)
    : [];

  // Auto-slideshow for modal photos: automatic photo change every 3.2s
  useEffect(() => {
    if (!imagesList || imagesList.length <= 1) return;
    if (isGalleryPaused || showAllPhotosModal) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [imagesList, isGalleryPaused, showAllPhotosModal]);

  // Reset active image index when property changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedRoomIndex(0);
  }, [selectedProperty?.id]);

  if (!selectedProperty) return null;

  const isWishlisted = wishlist.includes(selectedProperty.id);
  const activeRoom = (selectedProperty.rooms && selectedProperty.rooms[selectedRoomIndex]) || {
    name: 'Executive Master Suite',
    price: selectedProperty.pricePerNight,
    features: ['High-Speed Wi-Fi', 'Air Conditioning', 'En-suite Bathroom']
  };
  const roomPrice = activeRoom.price || selectedProperty.pricePerNight || 4200;

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleStartBooking = () => {
    setBookingProperty({
      ...selectedProperty,
      chosenRoom: activeRoom
    });
    setSelectedProperty(null);
  };

  return (
    <div 
      className="fixed inset-0 z-[10000] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fade-in"
      onClick={() => setSelectedProperty(null)}
    >
      <div 
        className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden relative border border-slate-200/80 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-200 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="text-[11px] font-black uppercase tracking-wider text-coral-600 bg-coral-50 border border-coral-200/60 px-3 py-1 rounded-full">
              {selectedProperty.type || 'Luxury Residence'}
            </span>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-600 font-semibold truncate">
              <MapPin size={14} className="text-coral-500 shrink-0" />
              <span className="truncate">{selectedProperty.location || 'Prime Location'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Wishlist Button */}
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              onClick={() => toggleWishlist(selectedProperty.id)}
              title={isWishlisted ? 'Saved' : 'Save'}
            >
              <Heart 
                size={16} 
                fill={isWishlisted ? '#FF385C' : 'transparent'} 
                color={isWishlisted ? '#FF385C' : 'currentColor'} 
              />
            </button>

            {/* Close Button */}
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
              onClick={() => setSelectedProperty(null)}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* Title & Ratings Row */}
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {selectedProperty.name}
            </h1>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-sm">
              <div className="flex items-center gap-1 font-bold text-slate-900 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span>{selectedProperty.rating || '4.9'}</span>
                <span className="text-slate-500 font-normal">
                  ({selectedProperty.reviewCount || 120} verified reviews)
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-semibold">{selectedProperty.address || selectedProperty.location}</span>
            </div>
          </div>

          {/* Interactive Multi-Image Gallery Showcase */}
          <div className="w-full mb-6">
            {/* Main Featured Photo with Auto-Changing Slideshow */}
            <div 
              className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-950 group shadow-md"
              onMouseEnter={() => setIsGalleryPaused(true)}
              onMouseLeave={() => setIsGalleryPaused(false)}
            >
              {imagesList.map((imgUrl, imgIdx) => (
                <img
                  key={imgIdx}
                  src={imgUrl}
                  alt={`${selectedProperty.name} view ${imgIdx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    imgIdx === activeImageIndex 
                      ? 'opacity-100 scale-100 z-1' 
                      : 'opacity-0 scale-98 pointer-events-none z-0'
                  }`}
                />
              ))}

              {/* Prev / Next Floating Arrows */}
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                onClick={handlePrevImage}
                title="Previous photo"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                onClick={handleNextImage}
                title="Next photo"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>

              {/* Top Photo Counter Pill */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-md">
                📸 {activeImageIndex + 1} / {imagesList.length} Photos
              </div>

              {/* Bottom "View all photos" button */}
              <button
                type="button"
                className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-900 text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl cursor-pointer transition-all"
                onClick={() => setShowAllPhotosModal(true)}
              >
                <Grid size={14} />
                <span>View all {imagesList.length} photos</span>
              </button>
            </div>

            {/* Horizontal Multi-Image Thumbnails Ribbon Strip */}
            <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
              {imagesList.map((thumbUrl, tIdx) => (
                <div
                  key={tIdx}
                  className={`relative w-16 h-12 sm:w-20 sm:h-14 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    tIdx === activeImageIndex 
                      ? 'border-coral-500 ring-2 ring-coral-300 scale-102' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setActiveImageIndex(tIdx)}
                >
                  <img
                    src={thumbUrl}
                    alt={`Preview photo ${tIdx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* All Photos Lightbox Modal Overlay if clicked */}
          {showAllPhotosModal && (
            <div 
              className="fixed inset-0 z-[10010] bg-slate-950/90 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto"
              onClick={() => setShowAllPhotosModal(false)}
            >
              <div 
                className="max-w-5xl w-full mx-auto bg-white rounded-3xl p-5 sm:p-6 shadow-2xl my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    All {imagesList.length} Photos • {selectedProperty.name}
                  </h3>
                  <button 
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 cursor-pointer"
                    onClick={() => setShowAllPhotosModal(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {imagesList.map((pImg, pIdx) => (
                    <div
                      key={pIdx}
                      className="group relative h-40 sm:h-52 rounded-xl overflow-hidden cursor-pointer border border-slate-200"
                      onClick={() => {
                        setActiveImageIndex(pIdx);
                        setShowAllPhotosModal(false);
                      }}
                    >
                      <img src={pImg} alt={`Full view ${pIdx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                      <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">Photo {pIdx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
            
            {/* Left 2 Columns: Full Details */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Host Overview Box */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <img
                  src={selectedProperty.host?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={selectedProperty.host?.name || "Host"}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-coral-400"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      Hosted by {selectedProperty.host?.name || "MrBNB Premium Host"}
                    </h4>
                    <UserCheck size={16} className="text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500">{selectedProperty.host?.role || "Corporate Hospitality Partner"}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Response rate: {selectedProperty.host?.responseRate || "100%"} • Responds {selectedProperty.host?.responseTime || "within an hour"}
                  </p>
                </div>
              </div>

              {/* Property Overview */}
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2">
                  About this sanctuary
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProperty.overview || "Engineered for executive stays, seamless workations, and discerning travelers. Equipped with redundant fiber internet, ergonomic work desk, premium linens, and 24/7 keyless digital entry."}
                </p>
              </div>

              {/* Room Options Selection */}
              {selectedProperty.rooms && selectedProperty.rooms.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1">
                    Select Room Configuration
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    Choose the layout tailored for your party size.
                  </p>

                  <div className="flex flex-col gap-2.5">
                    {selectedProperty.rooms.map((room, idx) => {
                      const isSelected = selectedRoomIndex === idx;
                      return (
                        <div
                          key={room.id || idx}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                            isSelected 
                              ? 'border-coral-500 bg-coral-50/40 shadow-sm' 
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                          onClick={() => setSelectedRoomIndex(idx)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">
                                {room.name}
                              </h4>
                              {isSelected && (
                                <span className="text-[10px] font-black uppercase bg-coral-500 text-white px-2 py-0.5 rounded-full">
                                  Selected
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {room.bed} • {room.capacity} • {room.size}
                            </p>
                            <div className="flex gap-1.5 flex-wrap mt-2">
                              {room.features?.map((feat, fIdx) => (
                                <span key={fIdx} className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                                  {feat}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-base font-black text-slate-900 block">
                              {formatPrice(room.price, currency)}
                            </span>
                            <span className="text-[11px] text-slate-500">/ night</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Amenities Grid */}
              {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-3">
                    What this place offers
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {selectedProperty.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* House Rules */}
              {selectedProperty.houseRules && (
                <div className="border-t border-slate-100 pt-4">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2">
                    House Rules
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {selectedProperty.houseRules.map((rule, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Clock size={14} className="text-slate-400 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cancellation Policy */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm mb-1">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Cancellation &amp; Refund Policy</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProperty.cancellationPolicy || "Full refund up to 48 hours before check-in. Instant corporate invoice generation with GST credit available."}
                </p>
              </div>
            </div>

            {/* Right Column: Sticky Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-5 shadow-xl sticky top-20 flex flex-col gap-4">
                {/* Price Display */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-slate-950">
                      {formatPrice(roomPrice, currency)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium"> / night</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-slate-900">
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span>{selectedProperty.rating || '4.9'}</span>
                  </div>
                </div>

                {/* Selected Room Pill */}
                <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Configuration
                  </span>
                  <span className="font-bold text-xs text-slate-900">{activeRoom.name}</span>
                </div>

                {/* Booking Dates Summary */}
                <div className="border border-slate-200 rounded-xl overflow-hidden grid grid-cols-2 text-xs divide-x divide-slate-200">
                  <div className="p-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Check-in</span>
                    <span className="font-bold text-slate-800">15 Oct 2026</span>
                  </div>
                  <div className="p-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Check-out</span>
                    <span className="font-bold text-slate-800">19 Oct 2026</span>
                  </div>
                </div>

                {/* Reserve Stay Action Button */}
                <button
                  type="button"
                  onClick={handleStartBooking}
                  className="w-full py-3.5 px-4 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-coral-500/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Zap size={16} />
                  <span>Reserve Stay</span>
                  <ArrowRight size={16} />
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  You won't be charged yet • Instant confirmation
                </p>

                {/* Price Breakdown Preview */}
                <div className="border-t border-slate-100 pt-3 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>{formatPrice(roomPrice, currency)} × 4 nights</span>
                    <span className="font-semibold text-slate-800">{formatPrice(roomPrice * 4, currency)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated GST (12%)</span>
                    <span className="font-semibold text-slate-800">{formatPrice(Math.round(roomPrice * 4 * 0.12), currency)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Corporate Perk (Discount)</span>
                    <span>-{formatPrice(Math.round(roomPrice * 4 * 0.08), currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                    <span>Total Estimate</span>
                    <span>{formatPrice(Math.round(roomPrice * 4 * 1.04), currency)}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200/60 p-2.5 rounded-lg text-[11px] text-emerald-800 flex items-center gap-2 font-medium">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>100% Verified Corporate Ready Residence</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal;
