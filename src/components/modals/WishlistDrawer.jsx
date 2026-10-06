import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROPERTIES } from '../../data/propertiesData';
import { formatPrice } from '../../utils/formatters';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    setSelectedProperty,
    currency
  } = useApp();

  if (!isWishlistOpen) return null;

  const savedProperties = PROPERTIES.filter((p) => wishlist.includes(p.id));

  return (
    <div 
      className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <Heart size={22} fill="#FF385C" className="text-coral-500" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Saved Wishlist ({savedProperties.length})
            </h2>
          </div>
          <button 
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsWishlistOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {savedProperties.length > 0 ? (
            savedProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-coral-500/30 transition-all shadow-xs"
              >
                <img
                  src={prop.images[0]}
                  alt={prop.title || prop.name}
                  className="w-24 h-20 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {prop.title || prop.name}
                    </h4>
                    <button
                      onClick={() => toggleWishlist(prop.id)}
                      title="Remove from wishlist"
                      className="text-slate-400 hover:text-coral-500 transition-colors p-1 cursor-pointer shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {prop.location}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-sm font-black text-slate-900">
                        {formatPrice(prop.pricePerNight || prop.price, currency)}
                      </span>
                      <span className="text-[11px] text-slate-500"> / night</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProperty(prop);
                        setIsWishlistOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Heart size={44} className="text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Tap the heart on any property to save it for your next trip.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
