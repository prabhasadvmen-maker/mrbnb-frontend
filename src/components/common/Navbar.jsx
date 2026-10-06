import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Globe, Heart, CalendarCheck, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
const mrbnbLogo = '/images/mrbnb-logo.png';

export const Navbar = () => {
  const {
    wishlist,
    bookings,
    setIsWishlistOpen,
    setIsMyBookingsOpen,
    setIsAuthOpen,
    setIsSupportOpen,
    currentUser,
    setCurrentUser,
    currency,
    setCurrency,
    setCorporateOnly,
    setSelectedCategory,
    setSearchDestination,
    navigate,
    currentPath
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Derive active tab from currentPath
  const getActiveTab = () => {
    if (currentPath === '/for-business' || currentPath === '/business') return 'business';
    if (currentPath === '/destinations') return 'destinations';
    if (currentPath === '/host' || currentPath === '/list-property') return 'host';
    if (currentPath === '/support' || currentPath === '/help') return 'support';
    return 'stays';
  };
  const activeTab = getActiveTab();

  const handleStaysClick = (e) => {
    if (e) e.preventDefault();
    setCorporateOnly(false);
    setSelectedCategory('all');
    setSearchDestination('');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleForBusinessClick = (e) => {
    if (e) e.preventDefault();
    navigate('/for-business');
    setMobileMenuOpen(false);
  };

  const handleDestinationsClick = (e) => {
    if (e) e.preventDefault();
    navigate('/destinations');
    setMobileMenuOpen(false);
  };

  const handleHostClick = (e) => {
    if (e) e.preventDefault();
    navigate('/host');
    setMobileMenuOpen(false);
  };

  const handleSupportClick = (e) => {
    if (e) e.preventDefault();
    navigate('/support');
    setMobileMenuOpen(false);
  };

  const isLightNav = scrolled || currentPath !== '/';

  return (
    <>
      <header
        className={`w-full z-50 transition-all duration-300 flex items-center ${
          currentPath === '/'
            ? scrolled
              ? 'fixed top-0 left-0 right-0 h-[64px] md:h-[70px] bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md'
              : 'fixed top-0 left-0 right-0 h-[76px] md:h-[84px] bg-transparent border-b border-transparent'
            : 'sticky top-0 h-[66px] md:h-[72px] bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
        }`}
      >
        <div className="w-full px-[4%] mx-auto flex items-center justify-between box-border">
          {/* Left: Official MrBNB Logo - Sleek Proportional Size & 100% Transparent */}
          <a
            href="/"
            className="inline-flex items-center cursor-pointer transition-transform duration-200 hover:scale-105 select-none py-1"
            onClick={handleStaysClick}
            title="MrBNB — Book. Nest. Belong."
          >
            <img
              src={mrbnbLogo}
              alt="MrBNB Logo"
              className="h-9 sm:h-10 md:h-11 w-auto max-h-[44px] object-contain block bg-transparent"
            />
          </a>

          {/* Center: Frosted Glass Capsule Navigation Pill */}
          <nav
            className={`hidden md:flex items-center rounded-full p-1.5 gap-1 transition-all duration-300 ${
              isLightNav
                ? 'bg-slate-100/90 border border-slate-200/90 shadow-sm'
                : 'bg-white/15 backdrop-blur-xl border border-white/25 shadow-lg'
            }`}
          >
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'stays'
                  ? isLightNav
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'bg-white text-slate-900 shadow-md font-bold'
                  : isLightNav
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-white font-medium'
                    : 'text-white/85 hover:text-white hover:bg-white/10 font-medium'
              }`}
              onClick={handleStaysClick}
            >
              Stays
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'business'
                  ? isLightNav
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'bg-white text-slate-900 shadow-md font-bold'
                  : isLightNav
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-white font-medium'
                    : 'text-white/85 hover:text-white hover:bg-white/10 font-medium'
              }`}
              onClick={handleForBusinessClick}
            >
              For Business
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'destinations'
                  ? isLightNav
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'bg-white text-slate-900 shadow-md font-bold'
                  : isLightNav
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-white font-medium'
                    : 'text-white/85 hover:text-white hover:bg-white/10 font-medium'
              }`}
              onClick={handleDestinationsClick}
            >
              Destinations
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'host'
                  ? isLightNav
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'bg-white text-slate-900 shadow-md font-bold'
                  : isLightNav
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-white font-medium'
                    : 'text-white/85 hover:text-white hover:bg-white/10 font-medium'
              }`}
              onClick={handleHostClick}
            >
              Host
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'support'
                  ? isLightNav
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'bg-white text-slate-900 shadow-md font-bold'
                  : isLightNav
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-white font-medium'
                    : 'text-white/85 hover:text-white hover:bg-white/10 font-medium'
              }`}
              onClick={handleSupportClick}
            >
              Support
            </button>
          </nav>

          {/* Right: Actions and Vibrant Neon Pill Button */}
          <div className="flex items-center gap-3">
            {/* Desktop-only Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Currency Pill */}
              <button
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isLightNav
                    ? 'bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700'
                    : 'bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25'
                }`}
                onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                title="Toggle Currency"
              >
                <Globe size={14} className={isLightNav ? 'text-slate-600' : 'text-white'} />
                <span>{currency}</span>
              </button>

              {/* Wishlist */}
              <button
                className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                  isLightNav
                    ? 'bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700'
                    : 'bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25'
                }`}
                onClick={() => setIsWishlistOpen(true)}
                title="Wishlist"
              >
                <Heart
                  size={16}
                  color={wishlist.length > 0 ? '#FF385C' : (isLightNav ? '#475569' : '#FFFFFF')}
                  fill={wishlist.length > 0 ? '#FF385C' : 'transparent'}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Bookings */}
              <button
                className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                  isLightNav
                    ? 'bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700'
                    : 'bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25'
                }`}
                onClick={() => setIsMyBookingsOpen(true)}
                title="My Bookings"
              >
                <CalendarCheck size={16} color={isLightNav ? '#475569' : '#FFFFFF'} />
                {bookings.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {bookings.length}
                  </span>
                )}
              </button>

              {/* Right Neon Pill Button */}
              {currentUser ? (
                <button
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    isLightNav
                      ? 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800'
                      : 'bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30'
                  }`}
                  onClick={() => {
                    if (window.confirm('Would you like to log out?')) {
                      setCurrentUser(null);
                    }
                  }}
                >
                  <User size={14} className={isLightNav ? 'text-slate-700' : 'text-white'} />
                  <span>{currentUser.name}</span>
                </button>
              ) : (
                <button
                  className="inline-flex items-center justify-center bg-[#00D06C] text-[#042612] text-sm font-bold rounded-full px-6 py-2 shadow-lg shadow-[#00D06C]/30 hover:bg-[#00E676] hover:scale-105 transition-all"
                  onClick={() => setIsAuthOpen(true)}
                >
                  Sign in
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              className={`md:hidden flex items-center justify-center w-11 h-11 rounded-full shadow-sm transition-all ${
                mobileMenuOpen
                  ? 'bg-coral-500 border border-coral-500 text-white scale-105'
                  : isLightNav
                    ? 'bg-slate-100 hover:bg-slate-200/90 border border-slate-200 text-slate-800'
                    : 'bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-coral-500 hover:border-coral-500'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              id="haven-hamburger-btn"
            >
              {mobileMenuOpen ? (
                <X size={22} color="#FFFFFF" />
              ) : (
                <Menu size={22} color={isLightNav ? '#1E293B' : '#FFFFFF'} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modern High-Z Fixed Mobile Overlay Drawer mounted directly to document.body via Portal */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 w-screen h-screen z-[9999999] bg-[#050912]/80 backdrop-blur-md flex justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="relative w-[340px] max-w-[88vw] h-full bg-[#0A0F1D] border-l border-white/15 shadow-2xl flex flex-col overflow-y-auto p-5 z-[10000000] box-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Header with Official Logo (Large & Transparent) & Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center">
                <img src={mrbnbLogo} alt="MrBNB Logo" className="h-12 md:h-14 w-auto object-contain block bg-transparent drop-shadow-sm" />
              </div>
              <button
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all hover:bg-coral-500 hover:border-coral-500"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* 2. User Account / Sign In Status Card */}
            <div className="mb-4">
              {currentUser ? (
                <div className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-2xl p-3">
                  <div className="w-9 h-9 rounded-full bg-[#00D06C]/15 border border-[#00D06C]/30 flex items-center justify-center text-[#00D06C] shrink-0">
                    <User size={18} />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-bold text-white truncate">{currentUser.name || 'Corporate Traveller'}</span>
                    <span className="text-xs text-slate-400 truncate">{currentUser.email || 'Verified Guest'}</span>
                  </div>
                  <button
                    className="bg-coral-500/15 border border-coral-500/30 text-coral-500 text-xs font-bold px-2.5 py-1 rounded-lg"
                    onClick={() => {
                      setCurrentUser(null);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">Sign in to access corporate rates &amp; manage bookings.</p>
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00D06C] to-[#059669] text-[#032110] text-sm font-extrabold py-2.5 rounded-xl shadow-lg shadow-[#00D06C]/30 hover:scale-[1.02] transition-all"
                    onClick={() => {
                      setIsAuthOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User size={16} />
                    <span>Sign In or Register</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Quick Utilities: Currency & Badges Grid */}
            <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <Globe size={13} /> Currency:
                </span>
                <div className="flex gap-1.5">
                  {['INR', 'USD', 'EUR'].map((curr) => (
                    <button
                      key={curr}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        currency === curr
                          ? 'bg-coral-500 text-white'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                      onClick={() => setCurrency(curr)}
                    >
                      {curr === 'INR' ? '₹ INR' : curr === 'USD' ? '$ USD' : '€ EUR'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl text-white hover:bg-white/10 transition-all text-left"
                  onClick={() => {
                    setIsWishlistOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart size={16} color="#FF385C" fill={wishlist.length > 0 ? '#FF385C' : 'transparent'} />
                  <span className="text-xs font-bold flex-1 truncate">Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="bg-coral-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                <button
                  className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl text-white hover:bg-white/10 transition-all text-left"
                  onClick={() => {
                    setIsMyBookingsOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <CalendarCheck size={16} color="#00D06C" />
                  <span className="text-xs font-bold flex-1 truncate">Bookings</span>
                  {bookings.length > 0 && (
                    <span className="bg-coral-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                      {bookings.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 4. Complete Mobile Navigation Links */}
            <div className="flex flex-col gap-1.5 flex-1">
              <span className="text-[11px] font-extrabold text-slate-500 tracking-wider mb-1 uppercase">EXPLORE MRBNB</span>
              <button
                className={`flex items-center gap-3 p-3 rounded-xl border text-left text-sm font-bold transition-all ${
                  activeTab === 'stays'
                    ? 'bg-coral-500/20 border-coral-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                }`}
                onClick={handleStaysClick}
              >
                <span>🏠</span>
                <span className="flex-1">Stays &amp; Featured Homes</span>
              </button>
              <button
                className={`flex items-center gap-3 p-3 rounded-xl border text-left text-sm font-bold transition-all ${
                  activeTab === 'business'
                    ? 'bg-coral-500/20 border-coral-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                }`}
                onClick={handleForBusinessClick}
              >
                <span>💼</span>
                <span className="flex-1">For Business</span>
                <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-slate-300 font-bold">B2B</span>
              </button>
              <button
                className={`flex items-center gap-3 p-3 rounded-xl border text-left text-sm font-bold transition-all ${
                  activeTab === 'destinations'
                    ? 'bg-coral-500/20 border-coral-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                }`}
                onClick={handleDestinationsClick}
              >
                <span>📍</span>
                <span className="flex-1">Destinations Directory</span>
                <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-slate-300 font-bold">6 Metros</span>
              </button>
              <button
                className={`flex items-center gap-3 p-3 rounded-xl border text-left text-sm font-bold transition-all ${
                  activeTab === 'host'
                    ? 'bg-coral-500/20 border-coral-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                }`}
                onClick={handleHostClick}
              >
                <span>🔑</span>
                <span className="flex-1">List Property / Host</span>
                <span className="text-[10px] bg-coral-500/30 text-coral-400 px-2 py-0.5 rounded-full font-bold">+45%</span>
              </button>
              <button
                className={`flex items-center gap-3 p-3 rounded-xl border text-left text-sm font-bold transition-all ${
                  activeTab === 'support'
                    ? 'bg-coral-500/20 border-coral-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                }`}
                onClick={handleSupportClick}
              >
                <span>🎧</span>
                <span className="flex-1">24/7 Corporate Support</span>
                <span className="text-[10px] bg-[#00D06C]/30 text-[#00D06C] px-2 py-0.5 rounded-full font-bold">Live</span>
              </button>
            </div>

            {/* 5. Mobile Concierge Info Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px]">
              <span className="text-slate-500 block font-semibold mb-0.5">Priority Concierge:</span>
              <span className="text-slate-300 font-bold block">+91 98200 12345 • concierge@mrbnb.com</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
