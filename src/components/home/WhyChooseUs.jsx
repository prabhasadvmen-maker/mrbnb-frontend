import React from 'react';
import { ShieldCheck, Receipt, Lock, RotateCcw, Headphones, Award } from 'lucide-react';

const REASONS = [
  {
    icon: ShieldCheck,
    title: '100% Curated & Inspected',
    desc: 'Every villa, penthouse and serviced loft passes our 75-point physical hygiene and amenities inspection.'
  },
  {
    icon: Receipt,
    title: 'Zero Hidden Fees',
    desc: 'Transparent price breakdown with exact room rate, taxes and discounts. What you see is what you pay.'
  },
  {
    icon: Lock,
    title: 'Atomic Inventory Lock',
    desc: 'Real-time room reservation locks during checkout so you never experience double-booking or surge jumps.'
  },
  {
    icon: RotateCcw,
    title: 'Instant Refund Engine',
    desc: 'Cancel with 1 click based on clear property policies. Automated instant refund dispatch to original source.'
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated Concierge',
    desc: 'Direct human support via WhatsApp, phone and email from reservation until post-checkout settlement.'
  },
  {
    icon: Award,
    title: 'Corporate Travel Ready',
    desc: 'Instant GST tax invoices, corporate travel allowances and compliant booking approvals for team retreats.'
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="w-full px-[4%] mx-auto box-border">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
            The Mr.BNB Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-2">
            Engineered For Pure Peace of Mind
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Built on reliability, uncompromising hospitality standards, and modern travel engineering.
          </p>
        </div>

        {/* Why Us Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-coral-500/30 transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{reason.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{reason.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
