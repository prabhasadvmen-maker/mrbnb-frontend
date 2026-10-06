import React, { useState } from 'react';
import { X, ShieldCheck, ArrowRight, User, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, setCurrentUser } = useApp();
  const [accountType, setAccountType] = useState('traveller'); // 'traveller' | 'corporate'
  const [authMode] = useState('otp'); // 'otp' | 'email'
  const [phoneOrEmail, setPhoneOrEmail] = useState('+91 98765 43210');
  const [otpStep, setOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState('4829');
  const [userName, setUserName] = useState('Aarav Mehta');

  if (!isAuthOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpStep(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const user = {
      name: userName || (accountType === 'corporate' ? 'RazorTech Admin' : 'Aarav Mehta'),
      email: authMode === 'email' ? phoneOrEmail : 'aarav.mehta@example.com',
      phone: authMode === 'otp' ? phoneOrEmail : '+91 98765 43210',
      role: accountType
    };
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setIsAuthOpen(false)}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Welcome to Mr.BNB
          </h2>
          <button 
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsAuthOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {/* Account Type Selector */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setAccountType('traveller')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                accountType === 'traveller' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User size={15} />
              <span>Traveller</span>
            </button>

            <button
              type="button"
              onClick={() => setAccountType('corporate')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                accountType === 'corporate' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building size={15} />
              <span>Corporate</span>
            </button>
          </div>

          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (with Country Code)
                </label>
                <input
                  type="tel"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-coral-500"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  required
                />
              </div>

              <p className="text-xs text-slate-500">
                We'll send you a 4-digit one-time authentication code. Standard messaging rates may apply.
              </p>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-coral-500/25 transition-all cursor-pointer"
              >
                <span>Continue with OTP</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-xs text-slate-600">
                  Enter the 4-digit code sent to <strong className="text-slate-900">{phoneOrEmail}</strong>
                </p>
              </div>

              <div>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-2xl text-center font-black tracking-widest text-slate-900 focus:outline-none focus:border-coral-500"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  maxLength={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <ShieldCheck size={16} />
                <span>Verify &amp; Enter</span>
              </button>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-full text-center text-xs text-slate-500 hover:text-coral-500 transition-colors cursor-pointer"
              >
                Change number / email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
