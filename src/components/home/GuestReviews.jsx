import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import winterVillaBg from '../../assets/winter_villa_reviews_bg.jpg';

export const GuestReviews = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const reviewPairs = [
    [
      {
        id: 1,
        title: 'I found my dream stay in less than a week',
        text: "MrBNB made the entire corporate stay booking process incredibly smooth. The team was attentive, knowledgeable, and genuinely cared about our requirements. We found the perfect penthouse within days! Couldn't have asked for a better experience.",
        author: 'Daniel S',
        role: 'Tech Lead, Stripe',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 2,
        title: 'Fantastic corporate experience!',
        text: "We've booked multiple corporate stays before, but MrBNB was an absolute game-changer. The high-speed fiber internet was rock-solid, automated GST invoicing was instantaneous, and the dedicated concierge was on standby 24/7.",
        author: 'Marcus H',
        role: 'Consulting Director, EY',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      }
    ],
    [
      {
        id: 3,
        title: 'Exceptional luxury and seamless booking',
        text: 'The property in Bandra Kurla Complex surpassed all expectations. High-speed fiber internet, pristine kitchen, and 24/7 concierge support. We will definitely be booking all our upcoming quarterly stays here.',
        author: 'Priya Sharma',
        role: 'Product Manager, Google',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 4,
        title: 'Flawless corporate invoicing & safety',
        text: 'Automated GST invoices generated instantaneously, and the digital keypad check-in eliminated waiting at the reception. Our finance team was thrilled with the automated reporting.',
        author: 'Rahul Mehta',
        role: 'Operations Head, Deloitte',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      }
    ]
  ];

  const currentReviews = reviewPairs[currentPage];

  return (
    <section
      className="relative py-20 md:py-28 bg-cover bg-center bg-no-repeat overflow-hidden text-white"
      style={{ backgroundImage: `url(${winterVillaBg})` }}
    >
      {/* Dark gradient glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/95 via-[#0B1120]/85 to-[#0B1120]/95 backdrop-blur-[2px]"></div>

      <div className="w-full px-[4%] mx-auto box-border relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 anim-from-bottom">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            What Our Guests Are Saying
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Explore verified feedback from corporate travellers, remote executives, and fast-growing teams who trust MrBNB worldwide.
          </p>
        </div>

        {/* Carousel Wrapper with Side Green Navigation Buttons */}
        <div className="relative flex items-center justify-center">
          {/* Left Circular Green Navigation Button */}
          <button
            type="button"
            className="hidden md:flex absolute -left-4 lg:-left-6 w-12 h-12 rounded-full bg-[#00D06C] hover:bg-[#00E576] text-slate-950 items-center justify-center shadow-xl shadow-[#00D06C]/30 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
            onClick={() => setCurrentPage((prev) => (prev === 0 ? reviewPairs.length - 1 : prev - 1))}
            aria-label="Previous reviews"
          >
            <ChevronLeft size={24} strokeWidth={2.8} />
          </button>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {currentReviews.map((rev, idx) => (
              <div 
                key={rev.id} 
                className={`flex flex-col justify-between bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 relative group ${
                  idx === 0 ? 'anim-from-left' : 'anim-from-right'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote size={28} className="text-coral-500 opacity-80" />
                    <div className="flex text-amber-400 gap-0.5">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug">
                    {rev.title}
                  </h3>
                  <p className="text-sm text-slate-200 leading-relaxed italic mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/15 flex items-center gap-3.5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/30"
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                    <span className="text-xs text-slate-300">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Circular Green Navigation Button */}
          <button
            type="button"
            className="hidden md:flex absolute -right-4 lg:-right-6 w-12 h-12 rounded-full bg-[#00D06C] hover:bg-[#00E576] text-slate-950 items-center justify-center shadow-xl shadow-[#00D06C]/30 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
            onClick={() => setCurrentPage((prev) => (prev === reviewPairs.length - 1 ? 0 : prev + 1))}
            aria-label="Next reviews"
          >
            <ChevronRight size={24} strokeWidth={2.8} />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#00D06C] text-slate-950 flex items-center justify-center shadow-lg cursor-pointer"
            onClick={() => setCurrentPage((prev) => (prev === 0 ? reviewPairs.length - 1 : prev - 1))}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-1.5">
            {reviewPairs.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${i === currentPage ? 'bg-[#00D06C]' : 'bg-white/30'}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#00D06C] text-slate-950 flex items-center justify-center shadow-lg cursor-pointer"
            onClick={() => setCurrentPage((prev) => (prev === reviewPairs.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default GuestReviews;
