import React from 'react';
import { Briefcase, FileText, ShieldCheck, Zap, ArrowRight, Building, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateBanner = () => {
  const { setCorporateOnly, setIsAuthOpen } = useApp();

  const handleExploreCorporate = () => {
    setCorporateOnly(true);
    const element = document.getElementById('properties-section') || document.getElementById('featured-stays-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full px-[4%] mx-auto box-border py-8 md:py-14">
      <div className="bg-gradient-to-br from-[#0B1120] to-[#1E293B] rounded-3xl p-6 md:p-12 text-white grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative overflow-hidden shadow-2xl">
        {/* Glow blob */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-coral-500/20 blur-3xl pointer-events-none" />

        {/* Left Column: Value Prop */}
        <div className="relative z-10 anim-from-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-coral-400 tracking-wider uppercase mb-4">
            <Briefcase size={14} />
            <span>Mr.BNB For Business &amp; Enterprises</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-4">
            Streamline Corporate Travel With Policy Controls &amp; Instant GST Invoicing
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
            Empower executive teams, consultants and remote engineers with certified work-ready spaces featuring high-speed 300+ Mbps fiber Wi-Fi, ergonomic desks, and centralized company billing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-coral-500/20 text-coral-400 flex items-center justify-center shrink-0">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Instant GST Invoices</p>
                <p className="text-xs text-slate-400">Automated compliant tax input credits</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-coral-500/20 text-coral-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Travel Policy Guardrails</p>
                <p className="text-xs text-slate-400">Automated budget limits &amp; approvals</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-coral-500/20 text-coral-400 flex items-center justify-center shrink-0">
                <Zap size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Dedicated Workspaces</p>
                <p className="text-xs text-slate-400">Tested ergonomic chairs &amp; monitors</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-coral-500/20 text-coral-400 flex items-center justify-center shrink-0">
                <Building size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Post-Paid Settlement</p>
                <p className="text-xs text-slate-400">30-day consolidated monthly invoicing</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              className="bg-coral-500 hover:bg-coral-600 text-white font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-coral-500/30 transition-all"
              onClick={handleExploreCorporate}
            >
              <span>View Corporate Stays</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-white text-sm font-semibold underline underline-offset-4 hover:text-coral-400 transition-colors cursor-pointer"
            >
              Sign Up Company Account
            </button>
          </div>
        </div>

        {/* Right Column: Live Mockup / Glass Card */}
        <div className="relative z-10 anim-from-right">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/10">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-coral-400 font-bold block">
                  Corporate Portal Preview
                </span>
                <h4 className="text-lg md:text-xl font-extrabold text-white">RazorTech Global Pvt. Ltd.</h4>
              </div>
              <div className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">
                Active Plan
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <span className="text-xs text-slate-400 block mb-1">Monthly Stays Booked</span>
                <span className="text-xl font-extrabold text-white">42 Residences</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <span className="text-xs text-slate-400 block mb-1">Corporate Tax Saved</span>
                <span className="text-xl font-extrabold text-[#00D06C]">₹1,84,200</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                <span>Centralized GSTIN 07AAAAA0000A1Z5 Auto-invoiced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                <span>Zero Cancellation charges up to 24 hrs before check-in</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                <span>Dedicated Enterprise Account Concierge: +91 98200 12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
