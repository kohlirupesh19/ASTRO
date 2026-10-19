import React, { useState, useEffect, useRef } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { setIsLoggedIn, showToast } = useDevotee();
  const { language, t } = useLanguage();
  const [mobileNumber, setMobileNumber] = useState('98220 54321');
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [otp, setOtp] = useState<string[]>(['5', '8', '4', '', '', '']);
  const [secondsRemaining, setSecondsRemaining] = useState(33);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, secondsRemaining]);

  if (!isOpen) return null;

  const handleOtpChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-advance
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsLoggedIn(true);
      showToast('भक्त कक्षामध्ये आपले स्वागत आहे! (Welcome to Devotee Sanctum)', 'success');
      onSuccess();
      onClose();
    }, 600);
  };

  const handleResend = () => {
    setSecondsRemaining(60);
    showToast('नवीन ६ अंकी ओटीपी आपल्या व्हॉट्सॲपवर पाठवला आहे.', 'info');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241B19]/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-[#E0BFBF]/40 overflow-hidden my-auto animate-in zoom-in-95 duration-150">
        {/* Top Sacred Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#570013] via-[#765B00] to-[#800020]"></div>

        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-7 pb-3 flex items-start justify-between gap-4 border-b border-[#E0BFBF]/20">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 bg-[#FCEAE6] rounded-full text-[#765B00] text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              <span className="tracking-wider uppercase font-semibold text-[11px]">
                ॥ आत्मदीपो भव ॥ • Shastric Access
              </span>
            </div>
            <h2 className="font-serif text-2xl text-[#570013] font-bold tracking-tight">
              {language === 'en'
                ? 'Devotee Portal Login & Verification'
                : language === 'hi'
                ? 'भक्त पोर्टल प्रवेश एवं सत्यापन'
                : language === 'gu'
                ? 'ભક્ત પોર્ટલ પ્રવેશ અને ચકાસણી'
                : 'भक्त प्रवेश व पडताळणी'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#584141] hover:text-[#570013] p-1.5 rounded-full hover:bg-[#FCEAE6] transition-colors shrink-0"
            aria-label="Close login dialog"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-5">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between bg-[#FFF0ED] px-4 py-2.5 rounded-lg text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#765B00]/20 text-[#765B00] flex items-center justify-center font-bold">
                ✓
              </span>
              <span className="text-[#584141]">Step 1: Mobile ID</span>
            </div>
            <span className="material-symbols-outlined text-[#E0BFBF] text-[15px]">arrow_forward</span>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#570013] text-white flex items-center justify-center font-bold">
                2
              </span>
              <span className="text-[#570013] font-bold">Step 2: Shastric OTP (सत्यापन)</span>
            </div>
          </div>

          {/* Registered Mobile Box */}
          <div className="bg-[#FCEAE6] rounded-lg p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F0DFDB] flex items-center justify-center text-[#570013] shrink-0">
                <span className="material-symbols-outlined text-[18px]">stay_current_portrait</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#584141] uppercase tracking-wider font-semibold">
                  Registered Mobile
                </span>
                <div className="flex items-center gap-2">
                  {isEditingMobile ? (
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="text-base text-[#221918] font-semibold bg-white px-2 py-0.5 rounded border border-[#C9A64B] focus:outline-none w-36"
                    />
                  ) : (
                    <span className="text-base text-[#221918] font-semibold tracking-wide">
                      +91 {mobileNumber}
                    </span>
                  )}
                  <span className="text-[10px] bg-[#FFDF94]/60 text-[#251A00] px-1.5 py-0.5 rounded font-medium">
                    Verified
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsEditingMobile(!isEditingMobile)}
              className="inline-flex items-center gap-1 text-xs text-[#765B00] hover:text-[#570013] transition-colors font-semibold py-1 px-2.5 rounded bg-white shadow-xs hover:shadow-sm shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">
                {isEditingMobile ? 'check' : 'edit'}
              </span>
              <span>{isEditingMobile ? 'जतन करा' : 'बदला (Edit)'}</span>
            </button>
          </div>

          {/* OTP Instructions */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#221918] font-semibold flex items-center justify-between">
              <span>Enter 6-Digit Passcode (६ अंकी ओटीपी)</span>
              <span className="text-xs text-[#584141] font-normal">Sent to WhatsApp & SMS</span>
            </label>
            <p className="text-xs text-[#584141]">
              Please enter the 6-digit numeric verification code sent to your registered phone.
            </p>
          </div>

          {/* 6-Box Input Grid */}
          <form className="flex flex-col gap-4" onSubmit={handleVerify}>
            <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  placeholder="•"
                  className={`w-full h-14 text-center font-serif text-2xl font-bold text-[#570013] rounded-lg transition-all focus:outline-none ${
                    digit
                      ? 'bg-white border-2 border-[#765B00] shadow-sm'
                      : 'bg-[#FFF0ED] border border-[#E0BFBF]/60 focus:bg-white focus:ring-2 focus:ring-[#765B00]'
                  }`}
                />
              ))}
            </div>

            {/* Cooldown Timer & Alternate Channel */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-[#584141]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#765B00]">hourglass_top</span>
                {secondsRemaining > 0 ? (
                  <span>
                    पुन्हा पाठवा (Resend OTP in{' '}
                    <span className="font-bold text-[#570013] font-mono">
                      00:{secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
                    </span>
                    s)
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#570013] font-bold hover:underline cursor-pointer"
                  >
                    आता पुन्हा पाठवा (Resend Now)
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center gap-1 text-[#584141] hover:text-[#25D366] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-[#25D366]">chat</span>
                <span>व्हॉट्सॲपवर कोड मिळवा (Via WhatsApp)</span>
              </button>
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#800020] text-white font-bold text-base shadow-md hover:bg-[#570013] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isVerifying ? 'sync' : 'lock_open'}
                </span>
                <span>
                  {isVerifying
                    ? 'पडताळणी होत आहे...'
                    : 'Verify & Enter Sanctum (पडताळणी करा व प्रवेश करा)'}
                </span>
              </button>
            </div>

            {/* Security Assurance Note */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FFF0ED] text-[#584141] text-xs">
              <span className="material-symbols-outlined text-[#765B00] text-[18px] shrink-0 mt-0.5">
                verified_user
              </span>
              <p className="leading-snug">
                <strong className="font-semibold text-[#221918]">Shastric Data Sanctuary:</strong> 256-bit SSL encryption. We strictly preserve the privacy of devotee contact coordinates and Janma Patrika records.
              </p>
            </div>

            {/* Trouble Logging In Quick Link */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#584141] border-t border-[#E0BFBF]/30">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#765B00]">help_outline</span>
                <span>लॉगिन अडचण?</span>
              </span>
              <a
                href="tel:+919822054321"
                className="text-[#765B00] hover:text-[#570013] transition-colors font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                <span>Ashram Seva Desk: +91 98220 54321</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
