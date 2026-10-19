import React, { useState, useEffect } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { toDevanagariNumerals } from '../../utils/formatters.ts';
import { Modal } from '../common/Modal.tsx';

export const AstrologyView: React.FC = () => {
  const { consultation, addQuestion, showToast } = useDevotee();
  const { language, t } = useLanguage();
  const [activeChartTab, setActiveChartTab] = useState<'d1' | 'd9' | 'moon' | 'degrees'>('d1');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [newQuestionCat, setNewQuestionCat] = useState('करिअर व उद्योग विस्तार');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionBhav, setNewQuestionBhav] = useState('दशम (कर्म) भाव');

  // Live countdown timer in Devanagari
  const [countdown, setCountdown] = useState({
    hours: 16,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    addQuestion({
      category: newQuestionCat,
      question: newQuestionText.trim(),
      refBhav: newQuestionBhav,
    });
    setNewQuestionText('');
    setIsQuestionModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Action Ribbon */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-xs text-[#584141]">
            <span>{t('devoteeSanctum')}</span>
            <span className="text-[#E0BFBF]">/</span>
            <span className="text-[#570013] font-semibold">{t('nav.astrology')}</span>
            <span className="text-[#E0BFBF]">/</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD979]/50 text-[#795D00] text-[10px] font-bold uppercase">
              {language === 'en' ? 'Confidential Sanctum' : 'गोपनीय कक्ष'}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold tracking-tight">
            {language === 'en'
              ? 'Vedic Astrology & Janmapatrika Console'
              : language === 'hi'
              ? 'वैदिक ज्योतिष एवं जन्मकुंडली परामर्श'
              : language === 'gu'
              ? 'વૈદિક જ્યોતિષ અને જન્મકુંડળી પરામર્શ'
              : 'ज्योतिष व जन्मपत्रिका परामर्श'}
          </h1>
          <p className="text-xs sm:text-sm text-[#584141]">
            {language === 'en'
              ? 'Maharishi Parashara & Jaimini Shastra principles • Auspicious Muhurtas, planetary remedies, and confidential counsel.'
              : 'महर्षि पराशर व जैमिनी सिद्धांत • वैदिक मुहूर्त, ग्रहदोष निवारण आणि गोपनीय भविष्य दर्शन.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            onClick={() => showToast(language === 'en' ? 'Downloading Kundali PDF...' : 'जन्मपत्रिका PDF डाउनलोड सुरू झाले...', 'info')}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#E0BFBF]/40 text-[#221918] hover:bg-[#FFF0ED] text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#765B00]">download_for_offline</span>
            <span>{language === 'en' ? 'Download Janmapatrika PDF' : 'जन्मपत्रिका PDF डाउनलोड'}</span>
          </button>
          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#570013] text-white hover:bg-[#800020] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>{language === 'en' ? '+ Add Consultation Question' : '+ नवीन प्रश्न जोडा'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Active Upcoming Consultation Card */}
      <div className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-xs border border-[#E0BFBF]/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#570013] via-[#765B00] to-[#800020]"></div>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6">
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqBoNe284pPDGZptxHjiY2YqjFnHWCk4n78DlFNs1FRoDvIKHHVjjmhOx-oXo1OwKc46AtIoWl6A55f5zgiDKS-5Lj3pZqEg09XUIFdp_Kpvu1H2E-prbWfydWNumkqemfsUDBp06kPL0o1clUKepUj4ylJMKzXt-7Id3RKEN6rO3EPzoMW8jQ1UCO1Dy0-OpYJdqgdRnUozHBo8ZZQDpGE5GFrQ__QtFU_QkXHMBUAGzilwuqjNy_dA"
                  alt="Pt. Vishnupant Shastri"
                  className="w-20 h-20 rounded-full object-cover shadow-sm border-2 border-[#C9A64B]"
                />
                <span
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#765B00] text-white flex items-center justify-center text-xs"
                  title="Vedic Certified Acharya"
                >
                  <span className="material-symbols-outlined text-sm leading-none">verified</span>
                </span>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFD979]/40 text-[#795D00] text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">event_available</span>
                    <span>उद्याचा निश्चित परामर्श (Confirmed)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFF0ED] text-[#584141] text-xs font-mono">
                    परामर्श क्र: {consultation.id}
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#570013]">
                  {consultation.acharyName}
                </h2>
                <p className="text-xs text-[#584141] leading-relaxed">
                  {consultation.acharyaTitle} • {consultation.experience}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-[#FFF0ED] rounded-xl border border-[#E0BFBF]/30 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-white text-[#570013] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-xl">calendar_today</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#584141] block">दिनांक व वेळ</span>
                  <span className="font-bold text-[#221918]">{consultation.date} • {consultation.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-white text-[#765B00] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-xl">hourglass_top</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#584141] block">सत्र कालावधी</span>
                  <span className="font-bold text-[#221918]">{consultation.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-white text-[#570013] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#584141] block">माध्यम व स्थान</span>
                  <span className="font-bold text-[#221918]">{consultation.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Devanagari Countdown */}
          <div className="lg:w-72 shrink-0 flex flex-col justify-between bg-[#FCEAE6] rounded-xl p-5 border border-[#E0BFBF]/40">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-[#584141] font-bold">
                  परामर्श प्रारंभ वेळ
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#765B00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#765B00]"></span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center my-2">
                <div className="bg-white py-2 rounded-lg shadow-2xs border border-[#E0BFBF]/30">
                  <span className="font-serif text-2xl font-bold text-[#570013] block">
                    {toDevanagariNumerals(countdown.hours)}
                  </span>
                  <span className="text-[10px] text-[#584141]">तास (Hrs)</span>
                </div>
                <div className="bg-white py-2 rounded-lg shadow-2xs border border-[#E0BFBF]/30">
                  <span className="font-serif text-2xl font-bold text-[#570013] block">
                    {toDevanagariNumerals(countdown.minutes)}
                  </span>
                  <span className="text-[10px] text-[#584141]">मिनिटे (Min)</span>
                </div>
                <div className="bg-white py-2 rounded-lg shadow-2xs border border-[#E0BFBF]/30">
                  <span className="font-serif text-2xl font-bold text-[#765B00] block">
                    {toDevanagariNumerals(countdown.seconds)}
                  </span>
                  <span className="text-[10px] text-[#584141]">सेकंद (Sec)</span>
                </div>
              </div>
              <p className="text-[11px] text-center text-[#584141] mt-1">
                सत्र सुरू होण्याच्या १५ मिनिटे आधी स्वागतकक्षात पोहोचावे.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <a
                href="https://meet.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-[#570013] text-white text-xs font-bold text-center hover:bg-[#800020] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-base">videocam</span>
                <span>पर्यायी Google Meet लिंक</span>
              </a>
              <button
                type="button"
                onClick={() => showToast('पुनर्नियोजन विनंती नोंदवली. आश्रम समन्वयकांचा संपर्क येईल.', 'info')}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#FFF0ED] text-[#221918] text-xs font-bold text-center border border-[#E0BFBF]/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-[#765B00]">schedule</span>
                <span>पुनर्नियोजन विनंती (Reschedule)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Kundali Chart Viewer & Birth Data */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (8 cols): Kundali Chart Diagram */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 lg:p-8 shadow-xs border border-[#E0BFBF]/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-3 border-b border-[#E0BFBF]/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#765B00] text-xl">stars</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#570013]">
                  जन्मपत्रिका प्रारूप (Kundali Visualization)
                </h3>
                <span className="text-xs text-[#584141]">
                  वैदिक उत्तर भारतीय चौकोनी स्वरूप (North-Indian Diamond Style)
                </span>
              </div>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center p-1 bg-[#FFF0ED] rounded-xl gap-1 text-xs font-semibold overflow-x-auto">
              {[
                { id: 'd1', label: 'लग्न कुंडली (D1)' },
                { id: 'd9', label: 'नवमांश (D9)' },
                { id: 'moon', label: 'चंद्र कुंडली' },
                { id: 'degrees', label: 'ग्रह अंश तक्ता' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveChartTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeChartTab === tab.id
                      ? 'bg-white text-[#570013] shadow-xs'
                      : 'text-[#584141] hover:text-[#221918]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Diagram */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-[#FFF8F6] rounded-xl p-4 flex items-center justify-center border border-[#E0BFBF]/40 shadow-inner">
            <svg className="w-full h-full text-[#570013]" fill="none" viewBox="0 0 500 500">
              <rect x="10" y="10" width="480" height="480" rx="4" className="fill-white stroke-[#570013]" strokeWidth="2.5"></rect>
              <line x1="10" y1="10" x2="490" y2="490" className="stroke-[#570013]" strokeWidth="2"></line>
              <line x1="490" y1="10" x2="10" y2="490" className="stroke-[#570013]" strokeWidth="2"></line>
              <polygon points="250,10 490,250 250,490 10,250" className="stroke-[#570013]" strokeWidth="2" fill="none"></polygon>

              <line x1="10" y1="10" x2="250" y2="10" className="stroke-[#765B00]" opacity="0.4" strokeDasharray="3 3" strokeWidth="1.2"></line>
              <line x1="490" y1="10" x2="250" y2="10" className="stroke-[#765B00]" opacity="0.4" strokeDasharray="3 3" strokeWidth="1.2"></line>

              {/* Center Bindu */}
              <circle cx="250" cy="250" r="14" className="fill-[#FFF0ED] stroke-[#765B00]" strokeWidth="1.5"></circle>
              <text x="250" y="254" textAnchor="middle" className="fill-[#570013] font-serif font-bold text-[13px]">ॐ</text>

              {/* House 1: Lagna */}
              <text x="250" y="70" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[15px]">२ (वृषभ)</text>
              <text x="250" y="105" textAnchor="middle" className="fill-[#570013] font-sans font-bold text-[13px]">लग्न • सूर्य (२१°)</text>
              <text x="250" y="125" textAnchor="middle" className="fill-[#584141] font-sans text-[11px]">बुध (०८°)</text>

              {/* House 2 */}
              <text x="135" y="55" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[14px]">३</text>
              <text x="135" y="85" textAnchor="middle" className="fill-[#570013] font-sans text-[12px]">शुक्र (१४°)</text>

              {/* House 12 */}
              <text x="365" y="55" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[14px]">१</text>
              <text x="365" y="85" textAnchor="middle" className="fill-[#570013] font-sans text-[12px]">राहू (१६°)</text>

              {/* House 4 */}
              <text x="135" y="245" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[15px]">५ (सिंह)</text>
              <text x="135" y="275" textAnchor="middle" className="fill-[#570013] font-sans font-bold text-[12px]">चंद्र (२९°)</text>

              {/* House 5 */}
              <text x="65" y="365" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[14px]">६</text>
              <text x="65" y="395" textAnchor="middle" className="fill-[#570013] font-sans text-[12px]">मंगळ (०३°)</text>

              {/* House 6 */}
              <text x="135" y="445" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[14px]">७</text>
              <text x="135" y="465" textAnchor="middle" className="fill-[#570013] font-sans text-[12px]">शनी [व] (१८°)</text>

              {/* House 7 */}
              <text x="250" y="420" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[15px]">८ (वृश्चिक)</text>
              <text x="250" y="380" textAnchor="middle" className="fill-[#570013] font-sans font-bold text-[13px]">गुरु (११°)</text>
              <text x="250" y="360" textAnchor="middle" className="fill-[#584141] font-sans text-[11px]">सप्तम भाव (कलत्र)</text>

              {/* House 10 */}
              <text x="365" y="245" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[15px]">११ (कुंभ)</text>
              <text x="365" y="275" textAnchor="middle" className="fill-[#584141] font-sans text-[11px]">दशम भाव (कर्म)</text>

              {/* House 11 */}
              <text x="435" y="135" textAnchor="middle" className="fill-[#765B00] font-serif font-bold text-[14px]">१२</text>
              <text x="435" y="165" textAnchor="middle" className="fill-[#570013] font-sans text-[12px]">केतू (१६°)</text>
            </svg>

            <span className="absolute bottom-3 left-4 text-[#584141] text-[11px] bg-white/90 px-2 py-0.5 rounded border border-[#E0BFBF]/40">
              [व] = वक्री (Retrograde)
            </span>
            <span className="absolute bottom-3 right-4 text-[#765B00] text-[11px] bg-white/90 px-2 py-0.5 rounded border border-[#E0BFBF]/40 flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-xs">verified_user</span>
              <span>श्री चैतन्य पराशर संप्रदाय</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-[#584141]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-[#765B00]">info</span>
              <span>कुंडलीचे गणितीय अयन: <strong className="text-[#221918]">लाहिडी अयन (Chitra Paksha Ayanamsha 23°38')</strong></span>
            </span>
            <button
              onClick={() => showToast('कुंडली SVG जतन केली (Downloaded)', 'success')}
              className="px-3 py-1.5 rounded-lg bg-[#FFF0ED] text-[#570013] hover:bg-[#FCEAE6] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-[#765B00]">download</span>
              <span>SVG जतन करा</span>
            </button>
          </div>
        </div>

        {/* Right (4 cols): Birth Particulars */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-xs border border-[#E0BFBF]/40 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
            <h3 className="font-serif text-base font-bold text-[#570013]">
              जन्म तपशील (Birth Data)
            </h3>
            <span className="material-symbols-outlined text-[#765B00] text-xl">account_circle</span>
          </div>
          <p className="text-xs text-[#584141]">
            श्री राजेश शांताराम कुळकर्णी (यजमान • गोत्र: भारद्वाज)
          </p>

          <div className="space-y-2 text-xs">
            {[
              { label: 'जन्म तारीख (DOB)', val: '१५ ऑगस्ट १९८४' },
              { label: 'जन्म वेळ (TOB)', val: '०६:२२ AM (घटिका ०२:५५)' },
              { label: 'जन्म स्थान (POB)', val: 'पुणे, महाराष्ट्र' },
              { label: 'अयन व ऋतू', val: 'दक्षिणायन • वर्षा ऋतू' },
              { label: 'जन्म नक्षत्र व चरण', val: 'रोहिणी (चरण २)', highlight: true },
              { label: 'जन्म रास / चंद्र रास', val: 'वृषभ (स्वामी: शुक्र)' },
              { label: 'गण / नाडी / योनी', val: 'मनुष्य / अंत्य / सर्प' },
              { label: 'वर्ण / वश्य', val: 'वैश्य / चतुष्पाद' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-[#FFF0ED] border border-[#E0BFBF]/20"
              >
                <span className="text-[#584141]">{item.label}</span>
                <span className={`font-semibold ${item.highlight ? 'text-[#570013] font-bold' : 'text-[#221918]'}`}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#765B00] text-xl shrink-0 mt-0.5">verified</span>
            <div className="text-[11px] text-[#584141]">
              <strong className="text-[#570013] block">पंचांग शुद्धता प्रमाणीकरण</strong>
              धर्मसिंधू आणि निर्णयसिंधू संमत सूक्ष्म वेध पद्धतीनुसार १००% प्रमाणित.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Vimshottari Mahadasha Timeline */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xs border border-[#E0BFBF]/40 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2 border-b border-[#E0BFBF]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#765B00] text-xl">timelapse</span>
              <h3 className="font-serif text-lg font-bold text-[#570013]">
                विंशोत्तरी महादशा व अंतर्दशा कालचक्र (Vimshottari Dasha Analysis)
              </h3>
            </div>
            <p className="text-xs text-[#584141] mt-0.5">
              सध्या चालू असलेले ग्रहचक्र, प्रभाव आणि आगामी जीवन टप्पे
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#FFD979]/50 text-[#795D00] text-xs font-bold w-fit">
            वर्तमान: गुरु महादशा (Jupiter)
          </span>
        </div>

        {/* Graphical Journey Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#584141]">
            <span>राहु महादशा (समाप्त २०१८)</span>
            <span className="text-[#570013] font-bold">चालू: गुरु महादशा (२०१८ - २०३४)</span>
            <span>आगामी: शनी महादशा (२०३४+)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#FFF0ED] overflow-hidden flex border border-[#E0BFBF]/40">
            <div className="h-full bg-[#E0BFBF] w-[20%]" title="राहु महादशा"></div>
            <div className="h-full bg-gradient-to-r from-[#765B00] to-[#570013] w-[45%]" title="गुरु महादशा चालू"></div>
            <div className="h-full bg-[#FFF8F6] w-[35%]" title="शनि महादशा"></div>
          </div>
        </div>

        {/* Dasha Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#584141] uppercase tracking-wider font-semibold">
                  महादशा स्वामी
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFDF94] text-[#251A00] text-[10px] font-bold">
                  १६ वर्षे
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#570013]">बृहस्पती (गुरु)</h4>
              <p className="text-xs font-bold text-[#221918] mt-0.5">कालावधी: २०१८ ते २०३४</p>
              <p className="text-xs text-[#584141] mt-2 leading-relaxed">
                सप्तमस्थ गुरु आध्यात्मिक प्रगती, उच्च सन्मान आणि विवेक बुद्धी जागृत करतो.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E0BFBF]/30 text-[11px]">
              <span className="text-[#584141]">स्थिती: </span>
              <span className="text-[#570013] font-bold">सप्तम भाव (मित्रक्षेत्री)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#584141] uppercase tracking-wider font-semibold">
                  चालू अंतर्दशा
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#570013] text-white text-[10px] font-bold">
                  सक्रिय
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#570013]">शनी (Saturn)</h4>
              <p className="text-xs font-bold text-[#221918] mt-0.5">ऑक्टोबर २०२३ ते एप्रिल २०२६</p>
              <p className="text-xs text-[#584141] mt-2 leading-relaxed">
                षष्ठस्थ वक्री शनी कार्यक्षेत्रात कठोर परिश्रम करवून घेतो; स्पर्धा व आव्हानांवर मात होईल.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E0BFBF]/30 text-[11px]">
              <span className="text-[#584141]">स्थिती: </span>
              <span className="text-[#765B00] font-bold">षष्ठ भाव (उच्च राशी वक्री)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#584141] uppercase tracking-wider font-semibold">
                  प्रत्यंतर दशा
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FCEAE6] text-[#570013] text-[10px] font-bold">
                  सूक्ष्म काल
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#570013]">बुध (Mercury)</h4>
              <p className="text-xs font-bold text-[#221918] mt-0.5">मार्च २०२४ ते ऑगस्ट २०२४</p>
              <p className="text-xs text-[#584141] mt-2 leading-relaxed">
                व्यापार निर्णय, दस्तऐवजीकरण आणि नवीन गुंतवणुकीसाठी अत्यंत सतर्क राहण्याचा काळ.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E0BFBF]/30 text-[11px]">
              <span className="text-[#584141]">स्थिती: </span>
              <span className="text-[#221918] font-bold">लग्नस्थ (बुधादित्य योग)</span>
            </div>
          </div>
        </div>

        {/* Shastric Advice Callout */}
        <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#765B00] text-2xl shrink-0 mt-0.5">auto_stories</span>
            <div>
              <h5 className="font-serif text-sm font-bold text-[#570013]">
                दैवज्ञ सूक्ष्म निरीक्षण व प्राथमिक उपाय सल्ला:
              </h5>
              <p className="text-[#584141] mt-0.5 leading-relaxed">
                सध्या गुरु-शनी दशा असल्याने आरोग्य व गुडघ्यांचे विकार यांकडे लक्ष द्यावे. गुरु ग्रहाचा 'ॐ बृं बृहस्पतये नमः' जप नियमित चालू ठेवावा.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Pre-Consultation Questions */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xs border border-[#E0BFBF]/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2 border-b border-[#E0BFBF]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#765B00] text-xl">quiz</span>
              <h3 className="font-serif text-lg font-bold text-[#570013]">
                परामर्श पूर्व-प्रश्नावली (Confidential Inquiries)
              </h3>
            </div>
            <p className="text-xs text-[#584141] mt-0.5">
              उद्याच्या सत्रासाठी आपण नोंदवलेले प्रश्न — दैवज्ञ पं. विष्णुपंत शास्त्री यांनी अभ्यासासाठी स्वीकारले आहेत.
            </p>
          </div>
          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>+ नवीन प्रश्न जोडा</span>
          </button>
        </div>

        <div className="space-y-3">
          {consultation.questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 flex flex-col md:flex-row items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="w-6 h-6 rounded-full bg-[#570013] text-white font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#221918]">{q.category}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FFD979]/50 text-[#795D00] text-[10px] font-bold">
                      {q.status}
                    </span>
                  </div>
                  <p className="text-[#584141] leading-relaxed">{q.question}</p>
                  <span className="text-[10px] text-[#765B00] font-semibold block">
                    संदर्भ भाव: {q.refBhav}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Question Modal */}
      <Modal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        title="नवीन प्रश्न जोडा (Add Consultation Question)"
        subtitle="दैवज्ञ आचार्यांकडे सखोल पत्रिका तपासणीसाठी प्रश्न सादर करा"
        maxWidth="md"
      >
        <form onSubmit={handleAddQuestionSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-[#221918] mb-1">
              विषय श्रेणी (Category)
            </label>
            <select
              value={newQuestionCat}
              onChange={(e) => setNewQuestionCat(e.target.value)}
              className="w-full bg-[#FFF8F6] px-3 py-2 text-xs rounded-lg border border-[#E0BFBF]/50 focus:outline-none"
            >
              <option>करिअर व उद्योग विस्तार (Career & Business)</option>
              <option>कौटुंबिक आरोग्य व शिक्षण (Health & Family)</option>
              <option>विवाह योग व जोडीदार (Vivah & Matchmaking)</option>
              <option>वास्तु व भूमी खरेदी (Property & Vastu)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-[#221918] mb-1">
              संदर्भित भाव (House Focus)
            </label>
            <input
              type="text"
              value={newQuestionBhav}
              onChange={(e) => setNewQuestionBhav(e.target.value)}
              placeholder="उदा. दशम (कर्म) किंवा सप्तम भाव"
              className="w-full bg-[#FFF8F6] px-3 py-2 text-xs rounded-lg border border-[#E0BFBF]/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-[#221918] mb-1">
              आपला प्रश्न सविस्तर लिहा *
            </label>
            <textarea
              rows={3}
              required
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="नवीन व्यवसायातील भागीदारी, वेळ, अथवा विशेष ग्रहस्थिती संदर्भात..."
              className="w-full bg-[#FFF8F6] p-2.5 text-xs rounded-lg border border-[#E0BFBF]/50 focus:outline-none resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsQuestionModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#FFF0ED] text-[#221918] text-xs font-semibold"
            >
              रद्द करा
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] shadow-xs"
            >
              प्रश्न सादर करा
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
