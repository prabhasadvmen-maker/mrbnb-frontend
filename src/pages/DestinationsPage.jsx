import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building, 
  Compass, 
  Plane, 
  ShieldCheck, 
  TrendingUp, 
  Palmtree,
  Wifi,
  Laptop,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { DESTINATIONS } from '../data/destinationsData';
import { getImage } from '../data/localImages';

export const DestinationsPage = () => {
  const { navigate } = useApp();
  useScrollAnimation();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const allDestinations = DESTINATIONS.map((d, index) => {
    let cat = 'financial';
    if (d.id === 'bengaluru') cat = 'tech';
    if (d.id === 'goa') cat = 'retreat';
    if (d.id === 'dubai' || d.id === 'london') cat = 'international';

    return {
      id: d.id,
      city: d.name,
      state: d.state,
      country: d.country,
      slug: d.id,
      category: cat,
      image: (d.images && d.images.length > 0) ? d.images[0] : getImage(index * 3),
      staysCount: d.count || '850+ Stays',
      avgPrice: `₹${d.avgPrice?.toLocaleString() || '6,500'}`,
      tag: d.tagline ? d.tagline.split('&')[0].trim() : 'Prime Hub',
      badge: d.popularFor || 'Central Business District',
      description: d.overview || 'Curated residences designed for high-performing teams and corporate leaders.',
      airportDistance: d.airport || '20 mins to Airport',
      coworkingDensity: `${(d.corporateHubs && d.corporateHubs.length) || 4} Tech Hubs`
    };
  });

  // Filtering
  const filtered = allDestinations.filter((dest) => {
    const matchesSearch = 
      dest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.badge.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      activeTab === 'all' || 
      dest.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  // Prime Business Corridors Data
  const primeCorridors = [
    {
      city: 'Mumbai',
      district: 'Bandra Kurla Complex (BKC)',
      description: 'The premier financial capital housing global investment banks, NSE, and consular offices.',
      commute: '18 mins to Mumbai T2 Airport',
      speed: '500 Mbps Dedicated Line',
      stays: '320+ Executive Suites'
    },
    {
      city: 'Bengaluru',
      district: 'Outer Ring Road & Indiranagar',
      description: 'Silicon Plateau corridor close to major tech parks, venture capital funds, and artisanal dining.',
      commute: '35 mins to Kempegowda Airport',
      speed: '1 Gbps Ultra Fiber',
      stays: '410+ Tech Workstations'
    },
    {
      city: 'Delhi NCR',
      district: 'DLF Cyber City & Aerocity',
      description: 'Top Fortune 500 headquarters hub with immediate proximity to IGI Terminal 3.',
      commute: '12 mins to Delhi Airport',
      speed: '400 Mbps Redundant Line',
      stays: '380+ Corporate Residences'
    },
    {
      city: 'Dubai',
      district: 'DIFC & Downtown Business Bay',
      description: 'Tax-friendly global trade district featuring high-rise skyline views and metro connectivity.',
      commute: '15 mins to DXB Airport',
      speed: '1 Gbps Du Fiber',
      stays: '240+ Skyline Lofts'
    },
    {
      city: 'London',
      district: 'Canary Wharf & City of London',
      description: 'Historic and ultra-modern banking centers right on the Elizabeth Line and River Thames.',
      commute: '25 mins to London City Airport',
      speed: '500 Mbps Hyperoptic',
      stays: '190+ Serviced Mansions'
    },
    {
      city: 'Goa',
      district: 'Assagao & Anjuna Creative Belt',
      description: 'Portuguese heritage villas engineered with silent air conditioning and generator backups for workations.',
      commute: '35 mins to Mopa International',
      speed: '300 Mbps Starlink / Fiber',
      stays: '160+ Executive Retreats'
    }
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'How does MrBNB verify work-friendly amenities in each destination?',
      a: 'Every property is on-site audited with our 40-point protocol. We test real-world upload/download speeds under load, verify dedicated ergonomic desk chairs, confirm silent air-conditioning, and ensure 24/7 keyless code check-in.'
    },
    {
      q: 'Can our company book stays across multiple cities under one corporate billing account?',
      a: 'Yes. With a MrBNB Corporate Account, your team gets centralized GST invoicing, single-click approvals, consolidated monthly billing, and a dedicated Enterprise Mobility Manager.'
    },
    {
      q: 'What is the cancellation and rescheduling policy for corporate travelers?',
      a: 'We understand business plans shift. Most MrBNB executive residences provide 100% full refund up to 48 hours prior to check-in, along with instant date-change flexibility.'
    },
    {
      q: 'Are high-speed WiFi and power backups guaranteed in all cities?',
      a: 'Yes. In cities prone to regional fluctuations, our verified stays include dual ISP failovers and 100% full-capacity silent generator backups to guarantee uninterrupted Zoom/Teams calls.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Creative Hero Search Section */}
      <section className="relative pt-10 pb-12 md:pt-14 md:pb-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-coral-50 border border-coral-200 text-coral-600 text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-3 anim-from-left">
            <Compass size={14} className="text-coral-500" />
            <span>GLOBAL DESTINATIONS DIRECTORY</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-3 anim-from-right">
            Explore Premier Business Hubs &amp; <br />
            <span className="text-coral-500">Executive Workation Sanctuaries.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto anim-fade-in">
            From high-density financial districts in Mumbai and Dubai to serene executive workation villas in Goa, discover curated stays designed for high-performing professionals.
          </p>

          {/* Live Search Bar */}
          <div className="relative max-w-xl mx-auto mb-4 anim-from-bottom">
            <div className="flex items-center bg-white border-2 border-slate-200 focus-within:border-coral-500 rounded-2xl px-3.5 py-2.5 sm:py-3 shadow-md transition-all">
              <Search size={20} className="text-coral-500 shrink-0 mr-2.5" />
              <input 
                type="text" 
                placeholder="Search city, district, or landmark (e.g. BKC, Cyber City, Dubai, London)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 text-xs shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Trending Quick Search Chips */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs font-semibold text-slate-500 mb-5 anim-fade-in">
            <span className="font-bold text-slate-700 text-[11px] sm:text-xs">Trending:</span>
            {['Mumbai', 'Bengaluru', 'Delhi NCR', 'Goa', 'Dubai', 'London'].map((c) => (
              <button
                key={c}
                type="button"
                className="bg-white border border-slate-200 hover:border-coral-500 hover:text-coral-600 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs transition-all shadow-xs cursor-pointer"
                onClick={() => setSearchQuery(c === 'Delhi NCR' ? 'Delhi' : c)}
              >
                📍 {c}
              </button>
            ))}
          </div>

          {/* Meta metrics */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-bold text-slate-600 pt-3 border-t border-slate-200/60 flex-wrap anim-fade-in">
            <div><span className="text-slate-900 font-black">6</span> Global Metros</div>
            <span className="text-slate-300">•</span>
            <div><span className="text-slate-900 font-black">850+</span> Verified Stays</div>
            <span className="text-slate-300">•</span>
            <div><span className="text-slate-900 font-black">100%</span> Keyless Check-in</div>
            <span className="text-slate-300">•</span>
            <div><span className="text-coral-500 font-black">250 Mbps</span> Dedicated Fiber</div>
          </div>
        </div>
      </section>

      {/* 2. Compact Destination Cards Grid */}
      <section className="py-10 md:py-14 bg-white">
        <div className="w-full px-[4%] mx-auto box-border">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none justify-start sm:justify-center anim-from-left">
            <button 
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeTab === 'all'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('all')}
            >
              <span>All Cities ({allDestinations.length})</span>
            </button>
            <button 
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeTab === 'financial'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('financial')}
            >
              <Building size={13} />
              <span>Financial Capitals</span>
            </button>
            <button 
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeTab === 'tech'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('tech')}
            >
              <TrendingUp size={13} />
              <span>Tech &amp; Innovation</span>
            </button>
            <button 
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeTab === 'retreat'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('retreat')}
            >
              <Palmtree size={13} />
              <span>Executive Retreats</span>
            </button>
            <button 
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                activeTab === 'international'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('international')}
            >
              <Plane size={13} />
              <span>International</span>
            </button>
          </div>

          {/* Compact Cards Grid - 2 on mobile, 3 on tablet, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 anim-from-bottom">
            {filtered.map((item) => (
              <div 
                key={item.id} 
                className="group relative h-[230px] sm:h-[260px] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200/80 bg-slate-900 hover:-translate-y-1"
                onClick={() => navigate(`/destination/${item.slug}`)}
                title={`Explore stays in ${item.city}`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={`${item.city} properties`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Rich Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none"></div>

                {/* Top Badge: Stays Count */}
                <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md">
                  <Building size={11} className="text-coral-400" />
                  <span>{item.staysCount}</span>
                </div>

                {/* Bottom Meta Content */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 text-white">
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-white/90 font-semibold mb-0.5">
                    <MapPin size={11} className="text-coral-500 shrink-0" />
                    <span className="truncate">{item.state || item.country}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight mb-0.5 group-hover:text-coral-400 transition-colors">
                    {item.city}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-300 mb-1.5 truncate">
                    {item.badge || item.tag}
                  </p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-white/15 text-[10px] sm:text-xs">
                    <span className="text-slate-300">
                      From: <strong className="text-[#00D06C] font-bold">{item.avgPrice}</strong>
                    </span>
                    <span className="font-bold text-coral-400 group-hover:translate-x-0.5 transition-transform">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-6 max-w-md mx-auto">
              <h3 className="text-base font-bold text-slate-900 mb-1">No destinations found for "{searchQuery}"</h3>
              <p className="text-xs text-slate-500 mb-3">Try searching for Mumbai, Bengaluru, Delhi NCR, Goa, Dubai, or London.</p>
              <button 
                className="bg-coral-500 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-coral-600 transition-colors cursor-pointer"
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. NEW CONTENT: Prime Business Corridors & Commute Times */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="max-w-2xl mb-8 anim-from-left">
            <span className="text-coral-600 font-bold text-xs uppercase tracking-wider block mb-1">
              Location Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Prime Business Districts &amp; Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Strategically situated within walking distance of multinational HQs, consulates, and rapid transit hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {primeCorridors.map((corridor, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all hover:border-coral-200 flex flex-col justify-between anim-from-bottom"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase text-coral-600 bg-coral-50 px-2.5 py-0.5 rounded-full">
                      {corridor.city}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{corridor.stays}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                    {corridor.district}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {corridor.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock size={13} className="text-amber-500 shrink-0" />
                    <span>{corridor.commute}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Wifi size={13} className="text-emerald-600 shrink-0" />
                    <span>{corridor.speed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW CONTENT: Executive Housing Standards */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200/80">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="text-center max-w-2xl mx-auto mb-10 anim-from-bottom">
            <span className="text-coral-600 font-bold text-xs uppercase tracking-wider block mb-1">
              Guaranteed Consistency
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              The 4 Pillars of Every MrBNB Stay
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Engineered so your teams can hit the ground running with zero onboarding friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 anim-from-left">
              <div className="w-10 h-10 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center mb-3">
                <Wifi size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-1">Dual-ISP Fiber Internet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Minimum 250+ Mbps with auto-switch backup lines and low jitter for critical video conferences.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 anim-from-bottom">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Laptop size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-1">Ergonomic Workstations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-size desks, orthopedic chairs, universal surge power strips, and HDMI connectivity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 anim-from-bottom">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-1">Keyless 24/7 Check-in</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Smart digital locks with unique per-guest PIN codes. Land at 2 AM and walk straight to bed.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 anim-from-right">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Award size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-1">GST &amp; Expense Ready</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant tax compliant invoices with company GST details and automated ERP export formats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW CONTENT: Frequently Asked Questions (FAQ) */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="w-full px-[4%] mx-auto box-border max-w-3xl">
          <div className="text-center mb-8 anim-from-bottom">
            <span className="text-coral-600 font-bold text-xs uppercase tracking-wider block mb-1">
              Help &amp; Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Corporate Destination FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs cursor-pointer anim-fade-in"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="p-4 flex items-center justify-between gap-3">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</h4>
                    <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-coral-500' : ''}`} />
                  </div>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Global Quality Assurance Guarantee Banner */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl anim-from-bottom">
            <div className="w-14 h-14 rounded-2xl bg-coral-500/20 border border-coral-500/40 flex items-center justify-center text-coral-400 shrink-0">
              <Sparkles size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg sm:text-2xl font-black mb-1">
                Need Custom Corporate Housing in a New City?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether deploying 20 engineers to Hyderabad or setting up executive housing in London, our mobility team onboards tailor-fit residences in 48 hours.
              </p>
            </div>
            <button 
              className="bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-lg"
              onClick={() => navigate('/for-business')}
            >
              Consult Corporate Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;
