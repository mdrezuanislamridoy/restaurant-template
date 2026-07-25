'use client';

import React, { useState } from 'react';
import { X, Lock, Phone } from 'lucide-react';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string, name: string) => void;
  defaultPhone?: string;
  lockPhone?: boolean;
}

export const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultPhone = '',
  lockPhone = false,
}) => {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState(defaultPhone);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^[0-9]{11}$/.test(phone)) {
      setError('Please enter a valid 11-digit phone number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('code');
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^[0-9]{4}$/.test(code)) {
      setError('Please enter a valid 4-digit OTP code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(phone, 'Woodhouse Guest');
      setStep('phone');
      setPhone('');
      setCode('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative bg-[#051413] border border-[#D5B875]/25 w-full max-w-sm rounded-none p-6.5 shadow-2xl flex flex-col text-[#FAF6F0]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#FAF6F0]/60 hover:text-[#D5B875] transition cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[1.5px]" />
        </button>

        {/* Lock Icon Box */}
        <div className="w-12 h-12 rounded-none bg-[#0C2522] border border-[#D5B875]/30 text-[#D5B875] flex items-center justify-center mx-auto mb-4">
          <Lock className="w-4.5 h-4.5 stroke-[1.5px]" />
        </div>

        <h3 className="text-center font-serif text-lg font-light tracking-widest uppercase text-white mb-1">
          Identity Verification
        </h3>
        <p className="text-center text-[10px] text-[#FAF6F0]/50 uppercase tracking-wider mb-6 px-4">
          Authenticate using single-use SMS OTP
        </p>

        {error && (
          <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/20 text-[#E74C3C] text-xs font-semibold px-4 py-2.5 rounded-none mb-4 text-center">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">
                Mobile Number
              </label>
              <div className="relative text-left">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FAF6F0]/30" />
                <input
                  type="tel"
                  required
                  maxLength={11}
                  disabled={lockPhone}
                  placeholder="e.g. 01700000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0C2522] border border-[#D5B875]/25 text-xs text-white pl-10 pr-4 py-3.5 rounded-none focus:border-[#D5B875] focus:outline-none transition disabled:opacity-70 placeholder-[#FAF6F0]/25"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] py-3.5 rounded-none font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Requesting OTP...' : 'Send OTP Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5 text-center">
              <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">
                Verification Code
              </label>
              <p className="text-[10px] text-[#FAF6F0]/50 tracking-wider mb-2">
                Sent to <span className="font-bold text-[#D5B875]">{phone}</span>
              </p>
              <input
                type="text"
                required
                maxLength={4}
                placeholder="••••"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-32 bg-[#0C2522] border border-[#D5B875]/25 text-2xl font-black text-[#D5B875] py-2 rounded-none text-center focus:border-[#D5B875] focus:outline-none transition tracking-[8px] mx-auto block"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] py-3.5 rounded-none font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Verify & Continue'}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-[#D5B875] hover:text-[#B99D5C] text-[10px] font-bold uppercase tracking-wider pt-2 cursor-pointer transition block"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
