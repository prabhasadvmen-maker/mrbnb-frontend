import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Wifi, 
  Receipt, 
  UserCheck, 
  CalendarRange, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  PhoneCall,
  Check,
  Star,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PROPERTIES } from '../data/propertiesData';
import { formatCurrency } from '../utils/formatters';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { HavenPropertyCard } from '../components/common/HavenPropertyCard';
import { getImage } from '../data/localImages';

export const ForBusinessPage = () => {
  const { navigate, currency } = useApp();
  useScrollAnimation();

  // Calculator State
  const [teamSize, setTeamSize] = useState(15);
  const [nightsPerMonth, setNightsPerMonth] = useState(6);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '10-50',
    city: 'Mumbai',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Math for savings
  const avgHotelRate = 12500; // per night in 5-star business hotel
  const mrbnbRate = 7200; // per night in executive apartment
  const monthlyHotelSpend = teamSize * nightsPerMonth * avgHotelRate;
  const monthlyMrbnbSpend = teamSize * nightsPerMonth * mrbnbRate;
  const monthlySavings = monthlyHotelSpend - monthlyMrbnbSpend;
  const annualSavings = monthlySavings * 12;
  const savingsPercent = Math.round((monthlySavings / monthlyHotelSpend) * 100);

  // Filter top corporate properties
  const corporateProperties = PROPERTIES.filter(p => p.corporate || p.badge === 'Corporate Ready' || p.rating >= 4.9).slice(0, 4);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', teamSize: '10-50', city: 'Mumbai', notes: '' });
    }, 5000);
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
                <span>ENTERPRISE HOUSING &amp; TRAVEL SOLUTIONS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
                Executive Stays Engineered for <br />
                <span className="text-coral-500">High-Performing Teams.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                Eliminate hotel burnout. Provide your travelling executives, project teams, and consultants with premium serviced apartments featuring dual gigabit WiFi, dedicated workstations, and automated GST billing.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <a
                  href="#business-calculator"
                  className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Calculate Team Savings</span>
                  <ArrowRight size={17} />
                </a>
                <a
                  href="#demo-form"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xs transition-all hover:border-slate-300"
                >
                  <PhoneCall size={16} className="text-coral-500" />
                  <span>Request Corporate Demo</span>
                </a>
              </div>

              {/* Spaced Professional Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">5,000+</span>
                  <span className="text-xs text-slate-500 font-medium">Corporate Bookings</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-[#00D06C]">40%</span>
                  <span className="text-xs text-slate-500 font-medium">Avg. Savings vs Hotels</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">99.8%</span>
                  <span className="text-xs text-slate-500 font-medium">Dual WiFi Uptime</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-coral-500">100%</span>
                  <span className="text-xs text-slate-500 font-medium">GST Invoiced</span>
                </div>
              </div>
            </div>

            {/* Right Creative Visual Showcase Column */}
            <div className="lg:col-span-5 relative anim-from-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
                <img 
                  src={(PROPERTIES[0] && PROPERTIES[0].images && PROPERTIES[0].images[0]) || getImage(0)} 
                  alt="Executive Corporate Penthouse" 
                  className="w-full h-80 sm:h-96 object-cover" 
                />
                
                {/* Floating Top Left Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <Star size={14} fill="#FFB800" color="#FFB800" />
                  <span>4.96 Verified Executive Loft</span>
                </div>

                {/* Floating Top Right Speed Badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-[#00D06C] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <Wifi size={14} />
                  <span>250 Mbps Fiber Dedicated</span>
                </div>

                {/* Floating Bottom Highlights Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-4 text-slate-900 shadow-xl flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">Save ~42% On Corporate Housing</div>
                    <div className="text-xs text-slate-500">Trusted by 450+ high-growth tech &amp; consulting firms</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Core Pillars of MrBNB Corporate */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
              WHY LEADING ENTERPRISES CHOOSE MRBNB
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 mb-3">
              Built for Business Travel Without Friction
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Designed specifically to meet the high compliance, safety, and productivity standards of enterprise corporate travel managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <Receipt size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated GST Invoicing &amp; ERP Sync</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                Every booking generates immediate compliant corporate GST invoices with your company tax ID. Direct sync with Concur, Zoho Expense, and SAP.
              </p>
              <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200/60">
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Centralized corporate billing accounts</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Monthly consolidated statement options</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <Wifi size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Executive Workstations &amp; Gigabit Fiber</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                Never miss a critical client Zoom or board call. Every stay includes verified 250+ Mbps dual-redundant fiber with Herman Miller ergonomic seating.
              </p>
              <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200/60">
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Dedicated sound-insulated private offices</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> 4K monitors &amp; universal docking hubs</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">24/7 Security &amp; Concierge Dispatch</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                Secure multi-tier gated complexes with keyless digital locks, CCTV monitoring, and on-demand housekeeping or airport chauffeur pickups.
              </p>
              <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200/60">
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> 24/7 Priority Emergency Concierge</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Pre-inspected 40-point hygiene protocol</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <CalendarRange size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Flexible Relocation &amp; Long-Term Leases</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                Need accommodations for 30 to 180 days during team relocations or consulting projects? Enjoy tier discounts up to 35% with zero lock-in deposits.
              </p>
              <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200/60">
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Pro-rata billing for early project completion</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Seamless extension with 1-click renewal</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <UserCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dedicated Account Manager</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                Direct phone and WhatsApp line to an enterprise booking specialist who coordinates multi-city bookings, group offsites, and special dietary requests.
              </p>
              <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200/60">
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> 15-minute SLA on corporate inquiries</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Customized corporate pricing portal</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Comprehensive Spend Analytics</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                HR and Procurement dashboards show spend per department, city utilization patterns, and total cost savings versus legacy hotel chains.
              </p>
              <ul className="flex flex-col gap-2 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200/60">
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Downloadable CSV and PDF reports</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#00D06C]" /> Policy compliance monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Corporate Savings Calculator */}
      <section id="business-calculator" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Calculator Left: Sliders */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col">
              <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full w-max mb-3">
                ROI CALCULATOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                Estimate Your Team's Annual Corporate Savings
              </h2>
              <p className="text-sm text-slate-600 mb-8">
                Compare typical 5-star business hotel costs against MrBNB fully-furnished executive lofts and serviced apartments.
              </p>

              {/* Slider 1: Team Size */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-800">Travelling Employees</span>
                  <span className="text-sm font-black text-coral-500 bg-coral-50 px-2.5 py-0.5 rounded-full">{teamSize} Members</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="100" 
                  value={teamSize} 
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-coral-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>2</span>
                  <span>50</span>
                  <span>100+</span>
                </div>
              </div>

              {/* Slider 2: Nights Per Month */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-800">Average Travel Nights per Month</span>
                  <span className="text-sm font-black text-coral-500 bg-coral-50 px-2.5 py-0.5 rounded-full">{nightsPerMonth} Nights / person</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="25" 
                  value={nightsPerMonth} 
                  onChange={(e) => setNightsPerMonth(Number(e.target.value))}
                  className="w-full accent-coral-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>2 nights</span>
                  <span>12 nights</span>
                  <span>25 nights</span>
                </div>
              </div>
            </div>

            {/* Results Side */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black tracking-widest text-[#00D06C] uppercase bg-[#00D06C]/15 border border-[#00D06C]/30 px-3 py-1 rounded-full inline-block mb-4">
                  ESTIMATED ANNUAL IMPACT
                </span>

                <span className="text-xs text-slate-400 block mb-1">You Save Approximately</span>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                  {formatCurrency(annualSavings, currency)}
                </div>
                <span className="inline-block bg-[#00D06C]/20 text-[#00D06C] text-xs font-bold px-3 py-1 rounded-full mb-6">
                  Save ~{savingsPercent}% on Travel Budget
                </span>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>5-Star Business Hotels:</span>
                    <span className="line-through">{formatCurrency(monthlyHotelSpend, currency)}/mo</span>
                  </div>
                  <div className="flex justify-between text-white font-bold">
                    <span>MrBNB Executive Stays:</span>
                    <span className="text-[#00D06C]">{formatCurrency(monthlyMrbnbSpend, currency)}/mo</span>
                  </div>
                </div>
              </div>

              <a
                href="#demo-form"
                className="w-full text-center mt-8 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all"
              >
                Lock In Preferred Corporate Rates
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Curated Corporate Ready Properties */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
                PREMIER BUSINESS INVENTORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Top Business Stays Ready for Immediate Check-In
              </h2>
            </div>
            <button
              className="inline-flex items-center gap-1.5 text-sm font-bold text-coral-500 hover:text-coral-600 cursor-pointer"
              onClick={() => navigate('/destinations')}
            >
              <span>View All Destinations</span>
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {corporateProperties.map((prop, idx) => (
              <HavenPropertyCard
                key={prop.id}
                home={prop}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Request Corporate Account Form */}
      <section id="demo-form" className="py-16 md:py-24 bg-slate-50/70">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xl p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full inline-block mb-3">
                  GET STARTED TODAY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                  Open an Enterprise Account in 5 Minutes
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Join 450+ companies using MrBNB for seamless, cost-effective corporate housing across India, Dubai, and the UK. Our dedicated enterprise desk will contact you within 15 minutes.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                    <CheckCircle2 size={18} className="text-[#00D06C] shrink-0" />
                    <span>Zero onboarding fees or minimum booking commitment</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                    <CheckCircle2 size={18} className="text-[#00D06C] shrink-0" />
                    <span>Immediate 15% to 30% negotiated rate discount code</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                    <CheckCircle2 size={18} className="text-[#00D06C] shrink-0" />
                    <span>Customized billing with net-30 payment terms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#00D06C] text-white flex items-center justify-center mb-4">
                    <Check size={30} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you for reaching out!</h3>
                  <p className="text-sm text-slate-600 max-w-md">Our Corporate Solutions Director will reach out to you within 15 minutes with customized corporate rate options.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Vikram Singhania"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="vikram@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Google, Deloitte, etc."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Team Size</label>
                      <select 
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                      >
                        <option value="1-10">1 - 10 travelling employees</option>
                        <option value="10-50">10 - 50 travelling employees</option>
                        <option value="50-200">50 - 200 travelling employees</option>
                        <option value="200+">200+ Enterprise tier</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Cities of Interest</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mumbai BKC, Bengaluru, Gurgaon"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Additional Requirements (Optional)</label>
                    <textarea 
                      rows="3" 
                      placeholder="e.g. Need 4 apartments for a 2-month tech rollout in BKC..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm sm:text-base py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all cursor-pointer"
                  >
                    <span>Submit Corporate Inquiry</span>
                    <ArrowRight size={17} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ForBusinessPage;
