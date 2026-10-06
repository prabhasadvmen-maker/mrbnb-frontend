import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, ShieldCheck, CheckCircle2, Sparkles, Calculator } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HostBanner = () => {
  const { setIsSupportOpen } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt auto-play with sound muted
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="host-banner-section" className="py-16 md:py-24 bg-white border-b border-slate-200/60 overflow-hidden">
      <div className="w-full px-[4%] mx-auto box-border">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B] text-white p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden border border-white/10">
          
          {/* Ambient Decorative Lighting in Background */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-coral-500/15 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-[#00D06C]/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start anim-from-left">
              <div className="inline-flex items-center gap-2 bg-coral-500/20 border border-coral-500/30 text-coral-400 text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4">
                <Sparkles size={14} className="text-coral-400" />
                <span>PARTNER WITH MRBNB • HIGHEST REVENUE SHARE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
                List Your Property <br />
                with <span className="text-coral-500">Mr.BNB</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-xl">
                Reach high-value corporate clients, business executives, and global travelling teams. Get predictable high-occupancy bookings, complete damage protection, and automated monthly payouts.
              </p>

              {/* Value checklist */}
              <div className="flex flex-col gap-3 mb-8 w-full max-w-lg">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 size={18} className="text-[#00D06C] shrink-0" />
                  <span>Guaranteed corporate payouts on the 1st of every month</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 size={18} className="text-[#00D06C] shrink-0" />
                  <span>₹10,00,000 Complete Host Damage &amp; Maintenance Coverage</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium">
                  <CheckCircle2 size={18} className="text-[#00D06C] shrink-0" />
                  <span>Automated Smart Pricing AI maximizing your earnings by 35%</span>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md w-full max-w-lg mb-8">
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-white">₹85,000+</span>
                  <span className="text-[11px] sm:text-xs text-slate-400">Avg. Monthly Yield</span>
                </div>
                <div className="flex flex-col border-x border-white/10 px-2 sm:px-4">
                  <span className="text-xl sm:text-2xl font-black text-[#00D06C]">94.2%</span>
                  <span className="text-[11px] sm:text-xs text-slate-400">Corporate Occupancy</span>
                </div>
                <div className="flex flex-col pl-2">
                  <span className="text-xl sm:text-2xl font-black text-coral-400">0%</span>
                  <span className="text-[11px] sm:text-xs text-slate-400">Listing Fee</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  className="inline-flex items-center gap-2.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-coral-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  onClick={() => setIsSupportOpen(true)}
                >
                  <span>Become a Host</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base px-5 py-3.5 rounded-xl transition-all cursor-pointer"
                  onClick={() => setIsSupportOpen(true)}
                >
                  <Calculator size={16} />
                  <span>Estimate Earnings</span>
                </button>
              </div>
            </div>

            {/* Right Media Column: Video Showcase */}
            <div className="lg:col-span-5 relative anim-from-right">
              <div 
                className="relative aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black cursor-pointer group"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                >
                  <source
                    src="https://cdn.coverr.co/videos/coverr-luxurious-modern-house-with-a-pool-5339/1080p.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Top Video Controls Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-[#00D06C] animate-pulse"></span>
                    <span>LIVE SHOWCASE</span>
                  </div>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-coral-500 transition-colors"
                      onClick={toggleMute}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-coral-500 transition-colors"
                      onClick={togglePlay}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    </button>
                  </div>
                </div>

                {/* Bottom Video Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-4 text-white shadow-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-[#00D06C] font-bold mb-1">
                    <ShieldCheck size={14} />
                    <span>Verified Partner Villa • DLF Phase 5</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white truncate">
                    The Glass Pavilion &amp; Infinity Pool
                  </h4>
                  <p className="text-xs text-slate-200 truncate">
                    Hosted by Vikram Malhotra • Generating ₹1.4L / month
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HostBanner;
