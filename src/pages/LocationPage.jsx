import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Star,
  ShieldCheck,
  Building,
  Plane,
  Sun,
  Sparkles,
  ArrowLeft,
  Filter,
  CheckCircle2,
  Search,
  Briefcase
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';
import { PROPERTIES } from '../data/propertiesData';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/formatters';
import { HavenPropertyCard } from '../components/common/HavenPropertyCard';

export const LocationPage = ({ citySlug }) => {
  const {
    navigate,
    currency
  } = useApp();

  // 1. Resolve Destination
  const currentDestination = useMemo(() => {
    if (!citySlug) return DESTINATIONS[0];
    const normalized = citySlug.toLowerCase().trim();
    return (
      DESTINATIONS.find((d) => d.id === normalized || d.name.toLowerCase() === normalized) ||
      DESTINATIONS.find((d) => normalized.includes(d.id) || d.id.includes(normalized)) ||
      DESTINATIONS[0]
    );
  }, [citySlug]);

  // 2. Filter states for this location page
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'price-asc' | 'price-desc'
  const [inCitySearch, setInCitySearch] = useState('');
  const [corporateOnly, setCorporateOnly] = useState(false);

  // Reset in-city filters when switching destination
  useEffect(() => {
    setSelectedCategory('all');
    setInCitySearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentDestination.id]);

  // 3. Filter properties specifically belonging to this destination
  const destinationProperties = useMemo(() => {
    const cityName = currentDestination.name.toLowerCase();
    const cityId = currentDestination.id.toLowerCase();

    return PROPERTIES.filter((prop) => {
      const pCity = (prop.city || '').toLowerCase();
      const pLoc = (prop.location || '').toLowerCase();

      // Matches city
      const isCityMatch =
        pCity === cityName ||
        pCity.includes(cityId) ||
        pLoc.toLowerCase().includes(cityId) ||
        pLoc.toLowerCase().includes(cityName);

      if (!isCityMatch) return false;

      // Category filter
      if (selectedCategory === 'business' && !prop.corporate && prop.badge !== 'Corporate Ready') return false;
      if (selectedCategory === 'luxury' && prop.price < 12000 && prop.badge !== 'Ultra Luxury') return false;
      if (selectedCategory === 'serviced' && !prop.type?.toLowerCase().includes('apartment') && !prop.title.toLowerCase().includes('apartment')) return false;
      if (selectedCategory === 'long-stay' && prop.price > 18000) return false;

      // Corporate Only checkbox
      if (corporateOnly && !prop.corporate) return false;

      // Keyword search in city
      if (inCitySearch.trim()) {
        const query = inCitySearch.toLowerCase().trim();
        const matchesTitle = (prop.title || '').toLowerCase().includes(query);
        const matchesLocation = (prop.location || '').toLowerCase().includes(query);
        const matchesType = (prop.type || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesType) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [currentDestination, selectedCategory, corporateOnly, inCitySearch, sortBy]);

  // Other destinations for the bottom exploration section
  const otherDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => d.id !== currentDestination.id);
  }, [currentDestination.id]);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Top Breadcrumb & Navigation Bar */}
      <div className="bg-slate-900 border-b border-white/10 py-3 text-white">
        <div className="w-full px-[4%] mx-auto box-border flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 cursor-pointer hover:text-white" onClick={() => navigate('/destinations')}>
              Destinations
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-coral-400 font-bold">{currentDestination.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-slate-200">
              <Sun size={13} className="text-amber-400" />
              <span>{currentDestination.weather}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#00D06C]/15 text-[#00D06C] px-2.5 py-1 rounded-full font-bold">
              <ShieldCheck size={13} />
              <span>100% Verified Stays</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Panoramic City Hero Showcase */}
      <section
        className="relative py-16 md:py-24 bg-cover bg-center text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10,14,26,0.7) 0%, rgba(10,14,26,0.92) 80%, #0A0E1A 100%), url(${currentDestination.images && currentDestination.images[0]})`
        }}
      >
        <div className="w-full px-[4%] mx-auto box-border relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold px-3 py-1 rounded-full">
                <MapPin size={13} className="text-coral-500" />
                {currentDestination.state}, {currentDestination.country}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#00D06C]/15 border border-[#00D06C]/30 text-[#00D06C] text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D06C] animate-pulse"></span>
                Instant Confirmation • GST Invoicing
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] mb-2">
              Stays in <span className="text-coral-500">{currentDestination.name}</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-medium mb-4">
              {currentDestination.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {currentDestination.overview}
            </p>

            {/* Live City Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-400 flex items-center justify-center shrink-0">
                  <Building size={20} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-white">{currentDestination.count}</div>
                  <div className="text-[11px] text-slate-300">Verified Stays</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Star size={20} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-white">{currentDestination.rating} / 5.0</div>
                  <div className="text-[11px] text-slate-300">Guest Rating</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#00D06C] flex items-center justify-center shrink-0">
                  <Briefcase size={20} />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-white">{formatPrice(currentDestination.avgPrice, currency)}</div>
                  <div className="text-[11px] text-slate-300">Avg. Nightly Rate</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Plane size={20} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">Transit Ready</div>
                  <div className="text-[10px] text-slate-300 truncate">{currentDestination.airport}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick City Switcher Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3">
        <div className="w-full px-[4%] mx-auto box-border flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-500 shrink-0 mr-1">Explore City:</span>
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.id}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                dest.id === currentDestination.id
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              onClick={() => navigate(`/destination/${dest.id}`)}
            >
              <MapPin size={12} className={dest.id === currentDestination.id ? 'text-coral-500' : 'text-slate-400'} />
              <span>{dest.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Filter, Search & Sorting Controls Toolbar */}
      <section className="py-6 bg-white border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Left: In-city keyword search */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 w-full lg:w-72 shadow-2xs">
              <Search size={16} className="text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder={`Search in ${currentDestination.name}...`}
                value={inCitySearch}
                onChange={(e) => setInCitySearch(e.target.value)}
                className="w-full text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
              />
              {inCitySearch && (
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  onClick={() => setInCitySearch('')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Center: Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto scrollbar-none pb-1 lg:pb-0">
              {[
                { id: 'all', label: `All Stays (${destinationProperties.length})` },
                { id: 'business', label: 'Business Ready' },
                { id: 'luxury', label: 'Luxury & Villas' },
                { id: 'serviced', label: 'Serviced Apartments' },
                { id: 'long-stay', label: 'Long-Stay' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right: Sort & Corporate Toggle */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={corporateOnly}
                  onChange={(e) => setCorporateOnly(e.target.checked)}
                  className="accent-coral-500 rounded"
                />
                <span>Corporate Only</span>
              </label>

              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
                <Filter size={13} className="text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="rating">Top Rated First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Main Properties Showcase Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Available Properties in {currentDestination.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {destinationProperties.length} hand-picked corporate residences &amp; luxury stays
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-coral-50 border border-coral-200 text-coral-600 text-xs font-bold px-3 py-1 rounded-full w-max">
              <Sparkles size={13} className="text-coral-500" />
              <span>Best Price Guarantee • No Booking Fees</span>
            </div>
          </div>

          {destinationProperties.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
              <Building size={40} className="text-coral-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No properties found matching your criteria</h3>
              <p className="text-xs text-slate-500 mb-4">Try clearing your filters or search keywords to view all stays in {currentDestination.name}.</p>
              <button
                type="button"
                className="bg-coral-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-coral-600 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedCategory('all');
                  setInCitySearch('');
                  setCorporateOnly(false);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 md:gap-7">
              {destinationProperties.map((property, idx) => (
                <HavenPropertyCard
                  key={property.id}
                  home={property}
                  index={idx}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. City Neighborhood & District Guide */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Key Districts in {currentDestination.name}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Strategically situated near metro lines, business corridors, and premium entertainment centers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(currentDestination.corporateHubs || ['Central Business District', 'Tech Park Corridor', 'Financial District']).map((hub, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center shrink-0">
                  <Building size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{hub}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Executive apartments within 10-15 mins transit with guaranteed high-speed connectivity.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Corporate Amenities & Standards */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">The MrBNB Executive Guarantee</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Every verified property in {currentDestination.name} adheres to our 5-star corporate hosting standard.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
              <CheckCircle2 size={24} className="text-[#00D06C] mb-3" />
              <h4 className="text-sm font-bold text-slate-900 mb-1">250+ Mbps Fiber</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Dual band commercial fiber connections with uninterrupted backup power supply.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
              <CheckCircle2 size={24} className="text-[#00D06C] mb-3" />
              <h4 className="text-sm font-bold text-slate-900 mb-1">24/7 Digital Self Check-in</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Keyless smart locks with secure dynamic PIN codes dispatched 4 hours prior to arrival.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
              <CheckCircle2 size={24} className="text-[#00D06C] mb-3" />
              <h4 className="text-sm font-bold text-slate-900 mb-1">GST Compliance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Itemized tax invoices with complete company GSTIN &amp; HSN filing ready for corporate reimbursement.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
              <CheckCircle2 size={24} className="text-[#00D06C] mb-3" />
              <h4 className="text-sm font-bold text-slate-900 mb-1">On-Demand Housekeeping</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Professional daily or bi-weekly linen change, sanitize protocol, and laundry service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Other Popular Destinations */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Explore Other Prime Destinations</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Discover hand-picked residences across major commercial and leisure hubs.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {otherDestinations.slice(0, 4).map((d) => (
              <div
                key={d.id}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer border border-slate-200"
                onClick={() => navigate(`/destination/${d.id}`)}
              >
                <img src={d.images && d.images[0]} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex flex-col justify-end p-3.5 text-white">
                  <h4 className="text-sm font-bold leading-tight">{d.name}</h4>
                  <p className="text-[11px] text-slate-300">{d.count || '850+ Stays'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;