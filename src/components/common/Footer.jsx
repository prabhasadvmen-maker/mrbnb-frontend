import React, { useState } from 'react';
import { Globe, ArrowRight, Check, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import mrbnbLogo from '../../assets/mrbnb-logo.png';

export const Footer = () => {
  const { navigate, setIsSupportOpen } = useApp();
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailSub.trim()) return;
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setEmailSub('');
    }, 4500);
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#090F1E] to-[#04060C] text-slate-300 pt-16 pb-12 overflow-hidden border-t border-white/10">
      {/* Ambient Lighting Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] bg-coral-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="w-full px-[4%] mx-auto box-border relative z-10">
        {/* Top: Enterprise Newsletter & Priority Access Strip */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 md:p-10 mb-14 shadow-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 bg-coral-500/15 border border-coral-500/30 text-coral-400 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              <Sparkles size={13} className="text-coral-500" />
              <span>MRBNB CORPORATE CLUB</span>
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">
              Subscribe for Exclusive Corporate Rates &amp; New Cities
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Receive bi-weekly updates on new executive penthouses, offsite packages, and negotiated company discounts.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[380px]">
            {subSuccess ? (
              <div className="flex items-center gap-2.5 bg-[#00D06C]/15 border border-[#00D06C]/30 text-[#00D06C] px-5 py-3.5 rounded-2xl text-sm font-bold">
                <Check size={18} />
                <span>You're subscribed! Check your inbox for corporate access.</span>
              </div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-2.5" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your work email address..."
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-coral-500 transition-colors"
                />
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-coral-500/25 transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  <span>Join</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10 pb-12 border-b border-white/10">
          {/* Column 1 & 2: Brand Identity (Wide) */}
          <div className="col-span-2 flex flex-col items-start gap-4">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              className="inline-block transition-transform hover:scale-105"
              title="MrBNB — Book. Nest. Belong."
            >
              <img 
                src={mrbnbLogo} 
                alt="MrBNB Logo" 
                className="h-12 md:h-16 w-auto object-contain block bg-transparent"
              />
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Corporate stays worldwide. <br />
              High-yield corporate assets &amp; premium furnished living for modern business travellers.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-xs text-slate-300 font-semibold px-3 py-1.5 rounded-full">
                <ShieldCheck size={13} className="text-[#00D06C]" /> GST Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-xs text-slate-300 font-semibold px-3 py-1.5 rounded-full">
                <Award size={13} className="text-amber-400" /> ISO Certified
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-coral-500 hover:border-coral-500 transition-all"
                aria-label="LinkedIn" 
                onClick={(e) => e.preventDefault()}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-coral-500 hover:border-coral-500 transition-all"
                aria-label="Instagram" 
                onClick={(e) => e.preventDefault()}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-coral-500 hover:border-coral-500 transition-all"
                aria-label="Facebook" 
                onClick={(e) => e.preventDefault()}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-coral-500 hover:border-coral-500 transition-all"
                aria-label="X" 
                onClick={(e) => e.preventDefault()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore Pages */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/')}>All Stays (Home)</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/for-business')}>For Business</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/destinations')}>Destinations Hub</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/host')}>Partner as Host</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/support')}>24/7 Support Center</button></li>
            </ul>
          </div>

          {/* Column 3: Top Hubs */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Destinations</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/destination/mumbai')}>Mumbai (BKC)</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/destination/bengaluru')}>Bengaluru (Tech Hub)</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/destination/delhi-ncr')}>Delhi NCR (Cyber City)</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/destination/goa')}>Goa Workations</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/destination/dubai')}>Dubai (DIFC)</button></li>
            </ul>
          </div>

          {/* Column 4: Solutions & Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Solutions</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/support')}>Help Center &amp; FAQs</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/for-business')}>GST Invoicing</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/host')}>Host Revenue Sim</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => setIsSupportOpen(true)}>Emergency Dispatch</button></li>
              <li><button className="text-slate-400 hover:text-coral-400 transition-colors text-left" onClick={() => navigate('/support')}>Sanitation Standards</button></li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Trust &amp; Legal</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-coral-400 transition-colors" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-coral-400 transition-colors" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-coral-400 transition-colors" onClick={(e) => e.preventDefault()}>Corporate Agreement</a></li>
              <li><a href="#" className="text-slate-400 hover:text-coral-400 transition-colors" onClick={(e) => e.preventDefault()}>Guest Conduct Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-coral-400 transition-colors" onClick={(e) => e.preventDefault()}>Security &amp; ISO 27001</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 MrBNB Global Hospitality Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-300">
            <Globe size={14} className="text-slate-400" />
            <span>INR (₹) • English (Global)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
