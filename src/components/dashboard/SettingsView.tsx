import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { Language } from '../../types/index.ts';

export const SettingsView: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { showToast } = useDevotee();
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [panchangReminders, setPanchangReminders] = useState(true);

  const handleSaveSettings = () => {
    showToast('सेटिंग्ज यशस्वीरित्या जतन केल्या (Settings Saved)', 'success');
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="space-y-1 pb-2">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
          सेटिंग्ज व प्राधान्ये (Settings & Preferences)
        </h1>
        <p className="text-xs sm:text-sm text-[#584141]">
          भाषा, सूचना प्राधान्ये, सुरक्षा व गोपनीयता नियंत्रणे.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xs border border-[#E0BFBF]/40 space-y-6 max-w-2xl">
        {/* Language setting */}
        <div className="space-y-3 pb-4 border-b border-[#E0BFBF]/30">
          <h3 className="font-serif text-base font-bold text-[#570013] flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[#765B00]">language</span>
            <span>इंटरफेस भाषा (Preferred Language)</span>
          </h3>
          <p className="text-xs text-[#584141]">
            वेबसाइट आणि भक्त कक्ष कोणत्या भाषेत दिसावा ते निवडा.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { id: 'mr', label: 'मराठी (Default)' },
              { id: 'en', label: 'English' },
              { id: 'hi', label: 'हिंदी' },
              { id: 'gu', label: 'ગુજરાતી' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLanguage(item.id as Language)}
                className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                  language === item.id
                    ? 'bg-[#570013] text-white border-transparent shadow-xs'
                    : 'bg-[#FFF0ED] text-[#221918] border-[#E0BFBF]/40 hover:bg-[#FCEAE6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="space-y-4 pb-4 border-b border-[#E0BFBF]/30">
          <h3 className="font-serif text-base font-bold text-[#570013] flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[#765B00]">notifications</span>
            <span>सूचना व संदेश प्राधान्ये (Alert Channels)</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFF0ED] cursor-pointer">
              <div>
                <span className="font-bold text-[#221918] block">WhatsApp थेट सूचना</span>
                <span className="text-[#584141]">यज्ञ थेट प्रक्षेपण सुरू होताच आणि स्पीड पोस्ट प्रसादाची स्थिती.</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#570013] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFF0ED] cursor-pointer">
              <div>
                <span className="font-bold text-[#221918] block">ईमेल पावती व मासिक अहवाल</span>
                <span className="text-[#584141]">८०-जी धर्मदाय पावत्या आणि वार्षिक Form 10BE अधिसूचना.</span>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="w-4 h-4 accent-[#570013] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFF0ED] cursor-pointer">
              <div>
                <span className="font-bold text-[#221918] block">पंचांग व एकादशी आठवण</span>
                <span className="text-[#584141]">महत्त्वाच्या तिथी व संकष्टी चतुर्थीच्या आधी पूर्वसूचना.</span>
              </div>
              <input
                type="checkbox"
                checked={panchangReminders}
                onChange={(e) => setPanchangReminders(e.target.checked)}
                className="w-4 h-4 accent-[#570013] rounded"
              />
            </label>
          </div>
        </div>

        {/* Security & Encryption Notice */}
        <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 space-y-1 text-xs">
          <span className="font-bold text-[#570013] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-[#765B00]">security</span>
            <span>२५६-बिट एनक्रिप्टेड वैदिक गोपनीयता हमी</span>
          </span>
          <p className="text-[#584141] leading-relaxed">
            आपली संपर्क माहिती, जन्मपत्रिका व वित्तीय तपशील केंद्रीय सार्वजनिक विश्वस्त नियमांनुसार सुरक्षित असून ते त्रयस्थ व्यक्तीशी सामायिक केले जात नाहीत.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs cursor-pointer"
          >
            बदल जतन करा (Save Preferences)
          </button>
        </div>
      </div>
    </div>
  );
};
