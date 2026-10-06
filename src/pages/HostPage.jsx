import React, { useState } from 'react';
import { 
  Building, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Camera, 
  KeyRound, 
  CalendarCheck, 
  ArrowRight, 
  Check, 
  Star, 
  Users, 
  Award 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getImage } from '../data/localImages';

export const HostPage = () => {
  const { currency } = useApp();
  useScrollAnimation();

  // Calculator State
  const [propertyType, setPropertyType] = useState('2bhk');
  const [city, setCity] = useState('mumbai');
  const [occupancyRate, setOccupancyRate] = useState(78); // percentage

  // Rate Matrix
  const rateMatrix = {
    '1bhk': { baseNightly: 5500, tradRent: 45000 },
    '2bhk': { baseNightly: 8500, tradRent: 75000 },
    '3bhk': { baseNightly: 14000, tradRent: 130000 },
    'villa': { baseNightly: 26000, tradRent: 220000 }
  };

  const cityMultiplier = {
    'mumbai': 1.25,
    'bengaluru': 1.05,
    'delhi-ncr': 1.10,
    'goa': 1.20,
    'dubai': 1.60
  };

  const effectiveNightly = Math.round(rateMatrix[propertyType].baseNightly * (cityMultiplier[city] || 1));
  const bookedNightsPerMonth = Math.round((30 * occupancyRate) / 100);
  const monthlyGrossRevenue = effectiveNightly * bookedNightsPerMonth;
  const mrbnbCommission = 0.15; // 15% comprehensive full-management fee
  const hostMonthlyNet = Math.round(monthlyGrossRevenue * (1 - mrbnbCommission));
  const hostAnnualNet = hostMonthlyNet * 12;
  const traditionalAnnual = rateMatrix[propertyType].tradRent * 12 * (cityMultiplier[city] || 1);
  const extraGainAnnual = hostAnnualNet - traditionalAnnual;

  // Form State
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    email: '',
    propertyCity: 'Mumbai',
    bedrooms: '2 BHK',
    area: '',
    pincode: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        ownerName: '',
        phone: '',
        email: '',
        propertyCity: 'Mumbai',
        bedrooms: '2 BHK',
        area: '',
        pincode: ''
      });
    }, 6000);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Creative 2-Column Split Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 overflow-hidden">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start anim-from-left">
              <div className="inline-flex items-center gap-2 bg-coral-50 border border-coral-200 text-coral-600 text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4">
                <Sparkles size={14} className="text-coral-500" />
                <span>MRBNB HOST PARTNER PROGRAM</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
                Turn Your Premium Property into <br />
                <span className="text-coral-500">a High-Yield Corporate Asset.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                Earn up to 45% more rental revenue than traditional tenants. Host verified corporate executives from Google, Deloitte, and Microsoft with zero management hassle, guaranteed damage protection, and bi-weekly payouts.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <a
                  href="#host-calculator"
                  className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Calculate Your Earnings</span>
                  <ArrowRight size={17} />
                </a>
                <a
                  href="#list-form"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xs transition-all hover:border-slate-300"
                >
                  <Building size={16} className="text-coral-500" />
                  <span>List Your Property</span>
                </a>
              </div>

              {/* Trust Highlights Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs font-bold text-slate-800">
                  <ShieldCheck size={18} className="text-[#00D06C] shrink-0" />
                  <span>₹5,00,000 Coverage</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs font-bold text-slate-800">
                  <Award size={18} className="text-[#00D06C] shrink-0" />
                  <span>Verified Corporate Only</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs font-bold text-slate-800">
                  <CalendarCheck size={18} className="text-[#00D06C] shrink-0" />
                  <span>Bi-Weekly Direct Payouts</span>
                </div>
              </div>
            </div>

            {/* Right Creative Visual Showcase Column */}
            <div className="lg:col-span-5 relative anim-from-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
                <img 
                  src={getImage(3)} 
                  alt="Host Partner Luxury Residence" 
                  className="w-full h-80 sm:h-96 object-cover" 
                />

                {/* Floating Top Left Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <Star size={14} fill="#FFB800" color="#FFB800" />
                  <span>Superhost Managed Partner</span>
                </div>

                {/* Floating Top Right Security Badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-[#00D06C] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <KeyRound size={14} />
                  <span>Smart Keyless Locks</span>
                </div>

                {/* Floating Bottom Highlights Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-4 text-slate-900 shadow-xl flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">Average Net Payout: ₹1,45,000/mo</div>
                    <div className="text-xs text-slate-500">+45% higher annual cash flow vs traditional tenancy</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Earnings Calculator */}
      <section id="host-calculator" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Calculator Left: Sliders & Controls */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col">
              <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full w-max mb-3">
                REVENUE SIMULATOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                How Much Could You Earn?
              </h2>
              <p className="text-sm text-slate-600 mb-8">
                Select your property type and city to see estimated earnings based on our 2026 corporate booking demand.
              </p>

              {/* Property Configuration */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Property Configuration</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '1bhk', label: '1 BHK Loft' },
                    { id: '2bhk', label: '2 BHK Luxury' },
                    { id: '3bhk', label: '3 BHK Penthouse' },
                    { id: 'villa', label: 'Executive Villa' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        propertyType === item.id
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                      onClick={() => setPropertyType(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Location / City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500 font-semibold"
                >
                  <option value="mumbai">Mumbai (BKC, Bandra, Powai)</option>
                  <option value="bengaluru">Bengaluru (Indiranagar, Whitefield)</option>
                  <option value="delhi-ncr">Delhi NCR (Cyber City, Gurgaon)</option>
                  <option value="goa">Goa (Anjuna, Assagao, Candolim)</option>
                  <option value="dubai">Dubai (Downtown, DIFC, Marina)</option>
                </select>
              </div>

              {/* Occupancy Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Estimated Occupancy Rate</span>
                  <span className="text-sm font-black text-coral-500 bg-coral-50 px-2.5 py-0.5 rounded-full">
                    {occupancyRate}% ({bookedNightsPerMonth} nights / mo)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={occupancyRate}
                  onChange={(e) => setOccupancyRate(Number(e.target.value))}
                  className="w-full accent-coral-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>50%</span>
                  <span>75% (Avg)</span>
                  <span>95% (Peak Demand)</span>
                </div>
              </div>
            </div>

            {/* Results Side */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black tracking-widest text-[#00D06C] uppercase bg-[#00D06C]/15 border border-[#00D06C]/30 px-3 py-1 rounded-full inline-block mb-4">
                  ESTIMATED NET HOST PAYOUT
                </span>

                <span className="text-xs text-slate-400 block mb-1">Net Monthly Earnings</span>
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                  {formatCurrency(hostMonthlyNet, currency)}
                </div>
                <span className="text-xs text-[#00D06C] font-bold block mb-6">
                  ~ {formatCurrency(hostAnnualNet, currency)} Projected Annually
                </span>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Traditional Rent:</span>
                    <span>{formatCurrency(rateMatrix[propertyType].tradRent * (cityMultiplier[city] || 1), currency)}/mo</span>
                  </div>
                  <div className="flex justify-between text-white font-bold">
                    <span>With MrBNB Partner:</span>
                    <span className="text-[#00D06C]">{formatCurrency(hostMonthlyNet, currency)}/mo</span>
                  </div>
                  <div className="p-3 rounded-xl bg-coral-500/10 border border-coral-500/20 text-coral-400 text-xs font-bold">
                    ✦ You make an extra {formatCurrency(extraGainAnnual, currency)} every year!
                  </div>
                </div>
              </div>

              <a
                href="#list-form"
                className="w-full text-center mt-8 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all"
              >
                Apply to List This Property
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Partner with MrBNB */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
              WHY HOSTS LOVE MRBNB
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-3">
              100% Hands-Off Real Estate Management
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We convert your residential property into a steady cash-flow engine while maintaining pristine upkeep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Curated Corporate Guests</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Strict enterprise verification protocol. No parties, no unauthorized visitors, and strictly business travelers with linked corporate email IDs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">₹5 Lakh Damage Coverage</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every booking includes automated host protection coverage against accidental property damage, appliance malfunction, and deep-clean guarantees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <KeyRound size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Keyless Locks</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We install high-security digital smart locks for seamless keyless access. Unique time-expiring codes for every guest and service crew.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <Camera size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Free Professional Photography</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our architectural media team photographs and stages your property with 4K HDR imagery and 3D walkthrough tours at zero cost to you.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dynamic AI Pricing Engine</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our algorithms adjust nightly rates based on corporate conferences, festive seasons, and flight traffic to maximize your occupancy and yield.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <DollarSign size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Direct Bi-Weekly Bank Payouts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No waiting for monthly reconciliation. Host disbursements are transferred straight into your bank account twice a month with full GST audit logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Onboarding Process (3 Simple Steps) */}
      <section className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border text-center">
          <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
            GETTING STARTED
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-12">
            Go Live in 3 Simple Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-black text-base flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Submit Details</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Share your property location, configuration, and a few quick photos via our form below.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-coral-500 text-white font-black text-base flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Audit &amp; Staging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Our operations team conducts an on-site 40-point quality audit, installs smart locks, and takes HDR photos.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00D06C] text-white font-black text-base flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Start Earning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Your property goes live across our enterprise corporate network. Welcome guests and receive bi-weekly payouts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Listing Application Form */}
      <section id="list-form" className="py-16 md:py-24 bg-white">
        <div className="w-full px-[4%] mx-auto box-border max-w-2xl">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-10">
            <div className="text-center mb-8">
              <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
                JOIN THE MRBNB NETWORK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3 mb-2">
                Submit Your Property for Evaluation
              </h2>
              <p className="text-sm text-slate-600">
                Our Partner Acquisitions team will review your submission and schedule a site visit within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#00D06C] text-white flex items-center justify-center mb-4">
                  <Check size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Property Submitted Successfully!</h3>
                <p className="text-sm text-slate-600 max-w-md">A regional partner manager will call you within 24 hours to schedule the complimentary property audit and photography.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Ramesh Patel"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="ramesh@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Property City</label>
                    <select 
                      value={formData.propertyCity}
                      onChange={(e) => setFormData({ ...formData, propertyCity: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500 font-semibold"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Goa">Goa</option>
                      <option value="Dubai">Dubai</option>
                      <option value="London">London</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Configuration</label>
                    <select 
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500 font-semibold"
                    >
                      <option value="1 BHK">1 BHK Studio / Loft</option>
                      <option value="2 BHK">2 BHK Executive Apartment</option>
                      <option value="3 BHK">3 BHK Luxury Penthouse</option>
                      <option value="Villa">Independent Villa / Estate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Locality / Area Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Bandra West, Indiranagar"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm sm:text-base py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all cursor-pointer"
                >
                  <span>Submit Property Application</span>
                  <ArrowRight size={17} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HostPage;
