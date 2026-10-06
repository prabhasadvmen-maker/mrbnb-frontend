import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  FileText, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Check, 
  KeyRound, 
  Receipt, 
  Wifi, 
  Calendar 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const SupportPage = () => {
  const { setIsSupportOpen } = useApp();
  useScrollAnimation();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  // Ticket Form State
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    bookingId: '',
    category: 'Booking & Check-in',
    message: ''
  });
  const [ticketSent, setTicketSent] = useState(false);

  const faqs = [
    {
      q: 'How do I download automated GST invoices for corporate expense filing?',
      a: 'All bookings automatically generate downloadable GST-compliant tax invoices immediately upon booking confirmation and post check-out. You can download them directly from your "My Bookings" modal, or check the automated email receipt sent to your corporate email address with your company GSTIN and HSN code 996311.'
    },
    {
      q: 'What happens if my flight arrives late at night? Can I self check-in?',
      a: 'Yes, 100% of MrBNB executive apartments feature 24/7 digital keyless check-in. Your unique digital PIN lock code and instructions will be sent via SMS and WhatsApp 4 hours prior to check-in. You can enter the property at any time of night without needing to wait for a physical host.'
    },
    {
      q: 'What is the corporate cancellation and rescheduling policy?',
      a: 'Corporate reservations enjoy enhanced flexibility: Full refund for cancellations made up to 48 hours prior to check-in. For project delays or meeting reschedules, you can modify your dates free of charge subject to calendar availability.'
    },
    {
      q: 'How do I report an issue with high-speed WiFi or smart appliances?',
      a: 'All our properties are equipped with dedicated 250+ Mbps fiber connections and dual-band routers. If you experience any connectivity issue, open the 24/7 WhatsApp Concierge or click the "Live Concierge" button. Our tech support responds in under 3 minutes, with backup 5G routers ready for on-site dispatch.'
    },
    {
      q: 'Can I request an extra ergonomic chair, 4K monitor, or printer for team work?',
      a: 'Absolutely! Our executive inventory supports customized workstation setups. During booking or via our concierge chat, simply request dual 4K monitors, ergonomic Herman Miller seating, or high-speed document scanners, and our team will have them staged before your arrival.'
    },
    {
      q: 'How do I reach emergency ground support in case of an urgent requirement?',
      a: 'Our ground operations team is stationed within 15 minutes of every major business cluster (BKC, Cyber City, Indiranagar, DIFC). For emergencies, call our priority toll-free hotline: +91 800-MRBNB-99 (Option 1) for immediate dispatch.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketData({
        name: '',
        email: '',
        bookingId: '',
        category: 'Booking & Check-in',
        message: ''
      });
    }, 6000);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Creative Hero Search Section */}
      <section className="relative pt-10 pb-14 md:pt-16 md:pb-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#00D06C]/10 border border-[#00D06C]/30 text-[#00A855] text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-4 anim-from-left">
            <span className="w-2 h-2 rounded-full bg-[#00D06C] animate-pulse"></span>
            <span>24/7 LIVE CONCIERGE ACTIVE • AVG RESPONSE &lt; 2 MINS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4 anim-from-right">
            How Can We Assist You <br />
            <span className="text-coral-500">Today?</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Whether you need to modify a corporate stay, retrieve an automated GST tax invoice, or require immediate on-ground concierge support, our team is standing by 24/7.
          </p>

          {/* Quick Search Input */}
          <div className="relative max-w-2xl mx-auto mb-5">
            <div className="flex items-center bg-white border-2 border-slate-200/80 focus-within:border-coral-500 rounded-2xl px-4 py-3.5 shadow-lg shadow-slate-100 transition-all">
              <Search size={22} className="text-coral-500 shrink-0 mr-3" />
              <input 
                type="text" 
                placeholder="Search solutions (e.g. GST invoice, late check-in, wifi password, cancel booking)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 text-xs shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Action Shortcut Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-semibold text-slate-500 mb-6">
            <span className="font-bold text-slate-700">Quick Links:</span>
            <button 
              type="button" 
              className="bg-white border border-slate-200 hover:border-coral-500 hover:text-coral-600 px-3 py-1 rounded-full transition-all shadow-2xs cursor-pointer"
              onClick={() => setSearchQuery('GST invoice')}
            >
              🧾 GST Invoice
            </button>
            <button 
              type="button" 
              className="bg-white border border-slate-200 hover:border-coral-500 hover:text-coral-600 px-3 py-1 rounded-full transition-all shadow-2xs cursor-pointer"
              onClick={() => setSearchQuery('check-in')}
            >
              🔑 Smart Door PIN
            </button>
            <button 
              type="button" 
              className="bg-white border border-slate-200 hover:border-coral-500 hover:text-coral-600 px-3 py-1 rounded-full transition-all shadow-2xs cursor-pointer"
              onClick={() => setSearchQuery('cancel')}
            >
              📅 Reschedule Dates
            </button>
            <button 
              type="button" 
              className="bg-white border border-slate-200 hover:border-coral-500 hover:text-coral-600 px-3 py-1 rounded-full transition-all shadow-2xs cursor-pointer"
              onClick={() => setIsSupportOpen(true)}
            >
              💬 Live Chat Assistant
            </button>
          </div>

          {/* SLA badges */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-slate-600 pt-4 border-t border-slate-200/60 flex-wrap">
            <div className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#00D06C]" /> 15-Minute Enterprise SLA</div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5"><Clock size={15} className="text-[#00D06C]" /> 24/7 Dedicated Ground Support</div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5"><FileText size={15} className="text-[#00D06C]" /> Instant GST Receipts</div>
          </div>
        </div>
      </section>

      {/* 2. Quick Help Topic Hubs */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
              SELF-SERVICE DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Popular Help Topics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div 
              className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-coral-500/30 transition-all cursor-pointer flex flex-col"
              onClick={() => setSearchQuery('GST')}
            >
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-3">
                <Receipt size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Corporate Billing &amp; GST</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Download invoices, update company GSTIN, and view monthly statements.</p>
            </div>

            <div 
              className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-coral-500/30 transition-all cursor-pointer flex flex-col"
              onClick={() => setSearchQuery('check-in')}
            >
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-3">
                <KeyRound size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Keyless Entry &amp; Check-in</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Retrieve digital door PIN codes, parking access, and elevator smart cards.</p>
            </div>

            <div 
              className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-coral-500/30 transition-all cursor-pointer flex flex-col"
              onClick={() => setSearchQuery('cancel')}
            >
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-3">
                <Calendar size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Changes &amp; Cancellations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Extend your reservation, alter guest names, or request a flexible refund.</p>
            </div>

            <div 
              className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-coral-500/30 transition-all cursor-pointer flex flex-col"
              onClick={() => setSearchQuery('wifi')}
            >
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-3">
                <Wifi size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">WiFi &amp; Tech Workstation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Dual gigabit router diagnostics, 4K monitor connection, and backup 5G.</p>
            </div>

            <div 
              className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-coral-500/30 transition-all cursor-pointer flex flex-col"
              onClick={() => setSearchQuery('emergency')}
            >
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-3">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Safety &amp; Ground Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">24/7 security dispatch, medical emergency assistance, and building rules.</p>
            </div>

            <div 
              className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-coral-500/30 transition-all cursor-pointer flex flex-col"
              onClick={() => setIsSupportOpen(true)}
            >
              <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500 mb-3">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Live Concierge Chat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Chat directly with an executive assistant in real-time (SLA &lt; 2 minutes).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Direct Contact Channels Bar */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/60">
        <div className="w-full px-[4%] mx-auto box-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-coral-500 text-white flex items-center justify-center shrink-0">
                <PhoneCall size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">24/7 Emergency Line</h4>
                <p className="text-xs text-slate-600 font-semibold">+91 800-MRBNB-99</p>
                <span className="text-[10px] text-coral-500 font-bold uppercase">Immediate Dispatch</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#00D06C] text-slate-950 flex items-center justify-center shrink-0">
                <MessageSquare size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">WhatsApp Priority Desk</h4>
                <p className="text-xs text-slate-600 font-semibold">+91 91234 56789</p>
                <span className="text-[10px] text-[#00A855] font-bold uppercase">Avg Response: 2 mins</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Corporate Support Email</h4>
                <p className="text-xs text-slate-600 font-semibold">concierge@mrbnb.com</p>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Within 15 mins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="w-full px-[4%] mx-auto box-border max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
              KNOWLEDGE BASE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  type="button"
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-coral-600 transition-colors cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <span>{faq.q}</span>
                  <span className="shrink-0 text-slate-400">
                    {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Submit Support Ticket */}
      <section className="py-16 md:py-24 bg-slate-50/70">
        <div className="w-full px-[4%] mx-auto box-border max-w-2xl">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-10">
            <div className="text-center mb-8">
              <span className="text-xs font-black tracking-widest text-coral-600 uppercase bg-coral-50 border border-coral-200 px-3 py-1 rounded-full">
                CAN'T FIND AN ANSWER?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3 mb-2">
                Submit an Official Support Ticket
              </h2>
              <p className="text-sm text-slate-600">
                Our priority escalation team reviews every ticket and responds via email and WhatsApp with immediate resolution.
              </p>
            </div>

            {ticketSent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#00D06C] text-white flex items-center justify-center mb-4">
                  <Check size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Support Ticket Logged! (#TKT-2026-9812)</h3>
                <p className="text-sm text-slate-600 max-w-md">An executive concierge has been assigned to your request and will contact you within 15 minutes.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleTicketSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Siddharth Verma"
                      value={ticketData.name}
                      onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="siddharth@example.com"
                      value={ticketData.email}
                      onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Booking ID (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. MRB-2026-7821"
                      value={ticketData.bookingId}
                      onChange={(e) => setTicketData({ ...ticketData, bookingId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Issue Category</label>
                    <select 
                      value={ticketData.category}
                      onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500 font-semibold"
                    >
                      <option value="Booking & Check-in">Booking &amp; Check-in</option>
                      <option value="Corporate Billing & GST">Corporate Billing &amp; GST Invoicing</option>
                      <option value="WiFi & Electronics">WiFi &amp; Electronics Setup</option>
                      <option value="Housekeeping & Amenities">Housekeeping &amp; Amenities</option>
                      <option value="Host Partner Inquiry">Host Partner Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Describe Your Issue or Request</label>
                  <textarea 
                    rows="4" 
                    required 
                    placeholder="Provide details about your query so our concierge team can resolve it immediately..."
                    value={ticketData.message}
                    onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all cursor-pointer"
                  >
                    <span>Submit Priority Ticket</span>
                    <ArrowRight size={17} />
                  </button>
                  <button 
                    type="button" 
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-3.5 px-5 rounded-xl transition-all cursor-pointer"
                    onClick={() => setIsSupportOpen(true)}
                  >
                    <MessageSquare size={16} />
                    <span>Launch Live Chat</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
