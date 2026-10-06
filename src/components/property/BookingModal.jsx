import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Lock,
  CreditCard,
  Smartphone,
  Building,
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice, generateBookingId } from '../../utils/formatters';

export const BookingModal = () => {
  const {
    bookingProperty,
    setBookingProperty,
    checkInDate,
    checkOutDate,
    guestsCount,
    addBooking,
    currentUser,
    currency
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation

  // Form Fields
  const [fullName, setFullName] = useState(currentUser?.name || 'Aarav Mehta');
  const [email, setEmail] = useState(currentUser?.email || 'aarav.mehta@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [specialRequests, setSpecialRequests] = useState('Quiet high-floor room preferred.');

  // Corporate travel toggle
  const [isCorporate, setIsCorporate] = useState(false);
  const [companyName, setCompanyName] = useState('Apex Technologies Pvt. Ltd.');
  const [gstin, setGstin] = useState('27AADCA1234F1Z8');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking', 'pay_at_property'
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [promoCode, setPromoCode] = useState('EARLY20');
  const [discountApplied, setDiscountApplied] = useState(true);

  // Confirmed booking state
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  // Inventory lock countdown (10 minutes)
  const [timeLeft, setTimeLeft] = useState(599);

  useEffect(() => {
    if (!bookingProperty) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [bookingProperty]);

  if (!bookingProperty) return null;

  const room = bookingProperty.chosenRoom || (bookingProperty.rooms && bookingProperty.rooms[0]) || {
    name: 'Executive Master Suite',
    price: bookingProperty.pricePerNight || bookingProperty.price
  };
  const nights = 3;
  const roomPrice = room.price || bookingProperty.pricePerNight || bookingProperty.price || 7500;
  const roomBase = roomPrice * nights;
  const taxes = Math.round(roomBase * 0.12);
  const discountAmount = discountApplied ? Math.round(roomBase * 0.15) : 0;
  const grandTotal = roomBase + taxes - discountAmount;

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'EARLY20' || promoCode.trim().toUpperCase() === 'CORPBIZ' || promoCode.trim().toUpperCase() === 'LONGSTAY30') {
      setDiscountApplied(true);
    } else {
      alert('Invalid promo code. Try EARLY20 or CORPBIZ');
    }
  };

  const handleCompletePayment = () => {
    const newBookingId = generateBookingId();
    const confirmedData = {
      bookingId: newBookingId,
      propertyId: bookingProperty.id,
      propertyName: bookingProperty.title || bookingProperty.name,
      city: bookingProperty.city,
      address: bookingProperty.location || bookingProperty.address,
      roomName: room.name,
      checkIn: checkInDate || 'Tomorrow',
      checkOut: checkOutDate || 'In 3 Days',
      guests: `${guestsCount?.adults || 2} Adults${guestsCount?.children > 0 ? `, ${guestsCount.children} Children` : ''}`,
      amount: grandTotal,
      status: 'Confirmed',
      paymentMethod,
      timestamp: new Date().toISOString(),
      cancellationPolicy: bookingProperty.cancellationPolicy || 'Free cancellation up to 48 hrs prior',
      corporate: isCorporate,
      companyName: isCorporate ? companyName : null,
      gstin: isCorporate ? gstin : null
    };

    addBooking(confirmedData);
    setConfirmedBookingData(confirmedData);
    setCurrentStep(3);
  };

  return (
    <div 
      className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto"
      onClick={() => setBookingProperty(null)}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 shrink-0 bg-white">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-coral-600 bg-coral-50 border border-coral-200 px-2.5 py-0.5 rounded-full">
                Instant Reservation
              </span>
              {currentStep < 3 && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#00A855] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <Lock size={12} />
                  <span>Inventory Locked ({formatCountdown(timeLeft)})</span>
                </div>
              )}
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
              {currentStep === 1 && 'Step 1: Guest & Stay Details'}
              {currentStep === 2 && 'Step 2: Payment & Price Breakdown'}
              {currentStep === 3 && 'Booking Confirmed & Guaranteed!'}
            </h2>
          </div>

          <button 
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setBookingProperty(null)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1">
          {/* STEP 1: Guest Details */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Guest Information
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone (for WhatsApp)</label>
                    <input
                      type="tel"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Corporate Travel Checkbox */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCorporate}
                      onChange={(e) => setIsCorporate(e.target.checked)}
                      className="accent-coral-500 w-4 h-4 mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        I am booking for work / Corporate Travel
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Add company details to generate an instant tax-compliant GST invoice.
                      </p>
                    </div>
                  </label>

                  {isCorporate && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200/60">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-coral-500"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">GSTIN Number</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-coral-500"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Special Requests (Optional)</label>
                  <textarea
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-coral-500"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Right Column: Mini Summary */}
              <div className="lg:col-span-5">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                  <img
                    src={bookingProperty.images[0]}
                    alt={bookingProperty.title || bookingProperty.name}
                    className="w-full h-36 object-cover rounded-xl mb-3.5"
                  />
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {bookingProperty.title || bookingProperty.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {bookingProperty.location}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Selected Room:</span>
                      <strong className="text-slate-900">{room.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Dates:</span>
                      <span className="text-slate-800 font-semibold">{checkInDate} to {checkOutDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Guests:</span>
                      <span className="text-slate-800 font-semibold">{guestsCount?.adults || 2} Adults</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200/60 text-sm">
                      <span className="font-bold text-slate-900">Total Payable:</span>
                      <strong className="font-black text-coral-600">{formatPrice(grandTotal, currency)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Payment & Transparent Breakdown */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Payment Methods */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Select Payment Method
                </h3>
                <p className="text-xs text-slate-500">
                  All transactions are 256-bit encrypted with PCI-DSS banking grade security.
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'upi', label: 'UPI (GPay / PhonePe)', icon: <Smartphone size={16} /> },
                    { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={16} /> },
                    { id: 'netbanking', label: 'Net Banking', icon: <Building size={16} /> },
                    { id: 'pay_at_property', label: 'Pay at Property', icon: <Clock size={16} /> }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === m.id
                          ? 'border-coral-500 bg-coral-50/50 text-coral-600 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                      onClick={() => setPaymentMethod(m.id)}
                    >
                      {m.icon}
                      <span className="truncate">{m.label}</span>
                    </button>
                  ))}
                </div>

                {/* Active Payment details */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  {paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">VPA / UPI ID</label>
                      <input
                        type="text"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-coral-500"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        A payment request will be sent instantly to your UPI application.
                      </span>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-2">
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900" placeholder="Card Number (4532 •••• •••• 8821)" defaultValue="4532 8920 1289 4432" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900" placeholder="MM/YY" defaultValue="12/28" />
                        <input type="password" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900" placeholder="CVV" defaultValue="782" maxLength={4} />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select Bank</label>
                      <select className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-semibold" defaultValue="HDFC Bank">
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India (SBI)</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'pay_at_property' && (
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Pay upon check-in via cash, card or UPI. A card pre-authorization is placed to guarantee the room lock.
                    </p>
                  )}
                </div>

                {/* Promo Code Box */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 uppercase font-bold focus:outline-none focus:border-coral-500"
                    placeholder="Coupon code (EARLY20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {discountApplied && (
                  <span className="text-xs text-[#00A855] font-bold block">
                    ✓ 15% Special Discount applied!
                  </span>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleCompletePayment}
                    className="flex-1 flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all cursor-pointer"
                  >
                    <Lock size={16} />
                    <span>Pay {formatPrice(grandTotal, currency)} &amp; Confirm</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Price Breakdown */}
              <div className="lg:col-span-5">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3 text-xs">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200/80 pb-2">
                    Transparent Price Breakdown
                  </h4>

                  <div className="flex justify-between text-slate-600">
                    <span>Room ({formatPrice(roomPrice, currency)} × {nights} nights)</span>
                    <span className="font-semibold text-slate-900">{formatPrice(roomBase, currency)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Taxes &amp; GST (12%)</span>
                    <span className="font-semibold text-slate-900">+{formatPrice(taxes, currency)}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between text-[#00A855] font-bold">
                      <span>Promo Discount</span>
                      <span>-{formatPrice(discountAmount, currency)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 border-t border-slate-200/80 text-sm font-black text-slate-900">
                    <span>Total Payable</span>
                    <span className="text-coral-600">{formatPrice(grandTotal, currency)}</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 mt-3">
                    <div className="flex items-center gap-1.5 text-[#00A855] font-bold mb-1">
                      <CheckCircle2 size={13} />
                      <span>Free Cancellation Available</span>
                    </div>
                    <span>{bookingProperty.cancellationPolicy || 'Cancel 48h before check-in for 100% refund.'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmation Screen */}
          {currentStep === 3 && confirmedBookingData && (
            <div className="text-center py-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00D06C] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                Booking Confirmed &amp; Guaranteed!
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Your stay is locked. A confirmation email and WhatsApp pass have been dispatched.
              </p>

              <div className="inline-block bg-slate-100 font-mono text-xs font-black text-slate-800 px-4 py-1.5 rounded-full mb-6">
                Booking ID: {confirmedBookingData.bookingId}
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Property</span>
                    <strong className="text-slate-900 block">{confirmedBookingData.propertyName}</strong>
                    <span className="text-slate-500">{confirmedBookingData.address}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Room Type</span>
                    <strong className="text-slate-900 block">{confirmedBookingData.roomName}</strong>
                    <span className="text-slate-500">{confirmedBookingData.guests}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-in</span>
                    <strong className="text-slate-900 block">{confirmedBookingData.checkIn} (2:00 PM)</strong>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-out</span>
                    <strong className="text-slate-900 block">{confirmedBookingData.checkOut} (11:00 AM)</strong>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount</span>
                    <strong className="text-slate-900 font-black text-sm block">
                      {formatPrice(confirmedBookingData.amount, currency)}
                    </strong>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                    <span className="text-[#00A855] font-bold">Paid • Verified</span>
                  </div>
                </div>

                {confirmedBookingData.corporate && (
                  <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                    Corporate Invoice issued to: <strong className="text-slate-900">{confirmedBookingData.companyName}</strong> (GSTIN: {confirmedBookingData.gstin})
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  <Printer size={15} />
                  <span>Print Tax Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingProperty(null)}
                  className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
