import React, { useState } from 'react';
import { X, CalendarCheck, Printer, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';

export const MyBookingsModal = () => {
  const { isMyBookingsOpen, setIsMyBookingsOpen, bookings, currency } = useApp();
  const [cancellationStatuses, setCancellationStatuses] = useState({});

  if (!isMyBookingsOpen) return null;

  const handleRequestCancellation = (bookingId) => {
    if (window.confirm(`Request cancellation for booking ${bookingId}? The refund engine will verify eligibility.`)) {
      setCancellationStatuses((prev) => ({
        ...prev,
        [bookingId]: 'Processing'
      }));

      setTimeout(() => {
        setCancellationStatuses((prev) => ({
          ...prev,
          [bookingId]: 'Completed (100% Refund Dispatched to Original Source)'
        }));
      }, 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setIsMyBookingsOpen(false)}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <CalendarCheck size={22} className="text-coral-500" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              My Bookings &amp; Stays ({bookings.length})
            </h2>
          </div>
          <button 
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsMyBookingsOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => {
              const cancelStatus = cancellationStatuses[booking.bookingId];

              return (
                <div
                  key={booking.bookingId}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {booking.bookingId}
                      </span>
                      {booking.corporate && (
                        <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-full">
                          Corporate GST
                        </span>
                      )}
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      cancelStatus ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {cancelStatus ? `Refund: ${cancelStatus}` : 'Confirmed • Active'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Property</span>
                      <strong className="text-slate-900 font-bold block">{booking.propertyName}</strong>
                      <span className="text-slate-500">{booking.city}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Room &amp; Guests</span>
                      <strong className="text-slate-900 font-bold block">{booking.roomName}</strong>
                      <span className="text-slate-500">{booking.guests}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Stay Dates</span>
                      <strong className="text-slate-900 font-bold block">{booking.checkIn} → {booking.checkOut}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Paid Amount</span>
                      <strong className="text-slate-900 font-black text-sm block">
                        {formatPrice(booking.amount, currency)}
                      </strong>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-end gap-2.5 mt-4 pt-3 border-t border-slate-200/60">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
                    >
                      <Printer size={13} />
                      <span>Tax Invoice</span>
                    </button>

                    {!cancelStatus && (
                      <button
                        onClick={() => handleRequestCancellation(booking.bookingId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer shadow-2xs"
                      >
                        <RotateCcw size={13} />
                        <span>Cancel &amp; Refund</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <CalendarCheck size={44} className="text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No active bookings</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your confirmed stays, automated GST invoices and reservation passes will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsModal;
