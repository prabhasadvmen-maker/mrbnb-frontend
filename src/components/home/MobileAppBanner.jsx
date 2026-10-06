import React from 'react';
import { Plane, Gift, Bell, Apple } from 'lucide-react';

export const MobileAppBanner = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="w-full px-[4%] mx-auto box-border">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0E1A] text-white p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-coral-500/15 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Left Column: Heading and App Store Badges */}
          <div className="flex-1 max-w-lg z-10 anim-from-left">
            <span className="inline-block text-xs font-black tracking-widest text-coral-400 uppercase bg-coral-500/20 border border-coral-500/30 px-3 py-1 rounded-full mb-3">
              MOBILE CONCIERGE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
              Get the MrBNB App
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Book stays, manage trips, check in with digital keys and unlock negotiated executive deals anytime, anywhere.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* App Store Badge */}
              <a
                href="#"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-5 py-3 transition-all hover:scale-105 active:scale-95"
                onClick={(e) => e.preventDefault()}
              >
                <Apple size={24} className="text-white" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Download on the</span>
                  <span className="text-sm font-bold text-white leading-tight">App Store</span>
                </div>
              </a>

              {/* Google Play Badge */}
              <a
                href="#"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-5 py-3 transition-all hover:scale-105 active:scale-95"
                onClick={(e) => e.preventDefault()}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.39 0 .75.15 1.03.41l11.02 8.59-11.02 8.59c-.28.26-.64.41-1.03.41-.83 0-1.5-.67-1.5-1.5zm13.12-8.5-2.6-2.03 2.6-2.03 3.48 2.71c.7.54.7 1.48 0 2.03l-3.48 1.32zm-12.12-7.5 9.4 7.33-9.4 7.33v-14.66z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase leading-none">GET IT ON</span>
                  <span className="text-sm font-bold text-white leading-tight">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Center Column: Phone Mockup */}
          <div className="z-10 shrink-0 anim-from-right">
            <div className="w-[260px] sm:w-[280px] rounded-[36px] bg-slate-900 border-4 border-slate-700 shadow-2xl p-3 relative">
              {/* Phone Dynamic Island / Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-3"></div>

              {/* Phone Screen Mockup Content */}
              <div className="bg-slate-950 rounded-[28px] p-4 text-white flex flex-col gap-3 min-h-[380px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-base font-black">
                    <span className="text-white">Mr</span>
                    <span className="text-coral-500">BNB</span>
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#00D06C]"></div>
                </div>

                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <h4 className="text-xs font-bold text-white">Find your next</h4>
                  <span className="text-sm font-black text-coral-400">business stay</span>
                </div>

                <div className="flex gap-1.5 bg-white/10 p-1 rounded-xl text-[11px] font-bold">
                  <span className="flex-1 text-center py-1 bg-coral-500 rounded-lg text-white">Stays</span>
                  <span className="flex-1 text-center py-1 text-slate-400">Monthly</span>
                  <span className="flex-1 text-center py-1 text-slate-400">Teams</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 mt-auto">
                  <span className="text-[10px] text-slate-400 block mb-1">Where are you going?</span>
                  <div className="bg-coral-500 text-white font-bold text-xs py-2 rounded-lg text-center shadow-md">
                    Search Corporate Hubs
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Feature Pills */}
          <div className="flex flex-col gap-3.5 z-10 w-full lg:w-auto">
            <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-white hover:bg-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-coral-500/20 flex items-center justify-center text-coral-400">
                <Plane size={20} />
              </div>
              <span className="text-sm font-bold">Manage all team trips</span>
            </div>

            <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-white hover:bg-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-coral-500/20 flex items-center justify-center text-coral-400">
                <Gift size={20} />
              </div>
              <span className="text-sm font-bold">Exclusive app deals &amp; points</span>
            </div>

            <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-white hover:bg-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-coral-500/20 flex items-center justify-center text-coral-400">
                <Bell size={20} />
              </div>
              <span className="text-sm font-bold">Real-time gate &amp; room access</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileAppBanner;
