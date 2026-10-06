import React, { useState } from 'react';
import { Tag, Copy, Check } from 'lucide-react';
import { OFFERS } from '../../data/offersData';

export const OffersSection = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <section id="offers-section" className="py-14 bg-white border-b border-slate-100">
      <div className="w-full px-[4%] mx-auto box-border">
        {/* Section Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-coral-600 text-xs font-black uppercase tracking-wider mb-1">
            <Tag size={15} />
            <span>Exclusive Privileges</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Curated Offers &amp; Seasonal Savings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Unlock guaranteed transparent discounts on advance bookings and corporate itineraries.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {OFFERS.map((offer) => (
            <div 
              key={offer.id} 
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3"
                  style={{
                    backgroundColor: `${offer.accentColor}15`,
                    color: offer.accentColor
                  }}
                >
                  {offer.badge}
                </span>

                <div className="text-xl sm:text-2xl font-black text-slate-950 mb-1">{offer.discount}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{offer.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{offer.desc}</p>
              </div>

              <div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">
                      Promo Code
                    </span>
                    <span className="font-mono text-xs font-black text-slate-900 tracking-wider">
                      {offer.code}
                    </span>
                  </div>

                  <button
                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    onClick={() => handleCopy(offer.code)}
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check size={13} className="text-[#00A855]" />
                        <span className="text-[#00A855]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-2 text-[10px] text-slate-400 text-right">
                  {offer.validity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
