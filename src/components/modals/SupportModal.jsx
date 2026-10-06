import React, { useState } from 'react';
import { X, HelpCircle, MessageSquare, Phone, Mail, CheckCircle2, ChevronDown, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FAQS = [
  {
    q: 'How does Mr.BNB real-time inventory locking work?',
    a: 'When you proceed to checkout, our platform applies an atomic room lock for 10 minutes. This guarantees that your selected luxury villa or suite cannot be booked by another user simultaneously.'
  },
  {
    q: 'How do I claim input tax credit (GST) for business travel?',
    a: 'Simply toggle "I am booking for work / Corporate Travel" during checkout, enter your company name and GSTIN number. Your digitally signed GST invoice is generated instantaneously upon payment.'
  },
  {
    q: 'What is the refund turnaround time if I cancel?',
    a: 'Eligible cancellations processed through our automated Refund Engine are initiated immediately. For UPI and card transactions, banks reflect the funds within 2 hours to 2 business days.'
  },
  {
    q: 'Are the properties inspected physically?',
    a: 'Yes. Every Mr.BNB property undergoes a mandatory 75-point physical audit covering high-speed internet reliability, linen hygiene, safety alarms, and concierge readiness before listing.'
  }
];

export const SupportModal = () => {
  const { isSupportOpen, setIsSupportOpen } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  if (!isSupportOpen) return null;

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (ticketSubject && ticketMessage) {
      setTicketSubmitted(true);
      setTimeout(() => {
        setTicketSubject('');
        setTicketMessage('');
        setTicketSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setIsSupportOpen(false)}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <HelpCircle size={22} className="text-coral-500" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Mr.BNB 24/7 Concierge &amp; Support
            </h2>
          </div>
          <button 
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsSupportOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Support Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center flex flex-col items-center">
              <MessageSquare size={22} className="text-[#00D06C] mb-1.5" />
              <strong className="text-xs font-bold text-slate-900 block">WhatsApp Desk</strong>
              <span className="text-[11px] text-slate-500">Instant 24/7 replies</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center flex flex-col items-center">
              <Phone size={22} className="text-blue-600 mb-1.5" />
              <strong className="text-xs font-bold text-slate-900 block">Toll-Free Line</strong>
              <span className="text-[11px] text-slate-500">1800-419-BNB</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center flex flex-col items-center">
              <Mail size={22} className="text-coral-500 mb-1.5" />
              <strong className="text-xs font-bold text-slate-900 block">VIP Concierge</strong>
              <span className="text-[11px] text-slate-500">concierge@mrbnb.com</span>
            </div>
          </div>

          {/* Ticket Dispatch */}
          <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Create Support Ticket
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Direct dispatch to your dedicated stay concierge manager.
            </p>

            {ticketSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800">
                <CheckCircle2 size={24} className="text-[#00D06C] mx-auto mb-1" />
                <p className="text-xs font-bold">Ticket Created Successfully!</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Ticket #TKT-8924 assigned to Concierge Lead. Estimated response: 8 mins.</p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-3">
                <input
                  type="text"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-coral-500"
                  placeholder="Subject (e.g. Early Check-in or Airport Transfer)"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  required
                />
                <textarea
                  rows={3}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-coral-500"
                  placeholder="Describe how we can assist you..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <Send size={13} />
                  <span>Submit Ticket</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-bold text-slate-800 hover:text-coral-600 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={15}
                        className={`text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
