import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Dr. Siddharth Mehrotra',
    role: 'Managing Director, Apex Health',
    stay: 'The Azure Sands Villa, Goa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Mr.BNB redefined what vacation rentals should be. The private chef, impeccable cleanliness, and cliffside infinity pool made our annual family vacation truly magical.'
  },
  {
    name: 'Priyanka Sen',
    role: 'VP Engineering, Finscale Labs',
    stay: 'The Glasshouse Executive Loft, BKC Mumbai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Corporate stays are usually sterile and tiring. Mr.BNB’s BKC loft was gorgeous, the ergonomic Herman Miller chair was a godsend for 12-hour workdays, and GST invoicing took 3 seconds.'
  },
  {
    name: 'Kabir & Sanjana Anand',
    role: 'Creative Directors, Studio K',
    stay: 'Cedar & Stone Alpine Chalet, Manali',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Waking up to snow peaks and drinking hot artisanal cider by the stone fireplace was unforgettable. The local host Tenzin was the kindest host we have ever encountered.'
  }
];

export const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="w-full px-[4%] mx-auto box-border">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
            Guest Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-2">
            Loved by Discerning Travellers &amp; Leaders
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Over 25,000+ five-star verified stays completed across luxury villas and corporate sanctuaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-coral-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" className="text-amber-400" />
                    ))}
                  </div>
                  <Quote size={20} className="text-slate-300" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/70">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{t.name}</h4>
                    <CheckCircle2 size={13} className="text-[#00A855]" />
                  </div>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                  <p className="text-[10px] text-coral-600 font-bold">Stayed at: {t.stay}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
