import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

interface RitualsViewProps {
  onNavigatePublic: (path: string, param?: string) => void;
}

export const RitualsView: React.FC<RitualsViewProps> = ({ onNavigatePublic }) => {
  const { showToast } = useDevotee();
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  const [isJoinStreamModalOpen, setIsJoinStreamModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#FFF0ED] text-[#570013] flex items-center justify-center">
              <span className="material-symbols-outlined text-base">local_fire_department</span>
            </span>
            <span className="text-xs uppercase tracking-wider text-[#765B00] font-bold">
              {t('devoteeSanctum')} • {t('nav.rituals')}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold tracking-tight">
            {language === 'en'
              ? 'My Rituals & Vedic Anushthan'
              : language === 'hi'
              ? 'मेरे यज्ञ एवं अनुष्ठान'
              : language === 'gu'
              ? 'મારા યજ્ઞ અને અનુષ્ઠાન'
              : 'माझे यज्ञ व अनुष्ठान'}
          </h1>
          <p className="text-xs sm:text-sm text-[#584141] max-w-2xl leading-relaxed">
            {language === 'en'
              ? 'Real-time progress of consecrated Vedic Havans, live altar streaming, daily ahuti sessions, and sacred prasad consignment tracking.'
              : 'वैदिक परंपरेनुसार संकल्पित अनुष्ठानांची दैनिक प्रगती, थेट यज्ञमंडप प्रक्षेपण, आहुती सत्रे आणि सिद्ध प्रसादाचे टपाल ट्रॅकिंग.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => showToast(language === 'en' ? 'Speed Post: #IP784920412IN • In Transit' : 'स्पीड पोस्ट ट्रॅकिंग: #IP784920412IN • आज दुपारी ३ वाजेपर्यंत वितरण अपेक्षित', 'info')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#570013] border border-[#E0BFBF]/40 shadow-xs hover:bg-[#FFF0ED] text-xs font-bold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#765B00]">local_shipping</span>
            <span>{t('dash.trackPrasad')}</span>
          </button>
          <button
            onClick={() => onNavigatePublic('yadnik-and-pooja')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#570013] text-white shadow-md hover:bg-[#800020] text-xs font-bold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>{t('dash.newBooking')}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-1.5 bg-[#FFF0ED] rounded-xl border border-[#E0BFBF]/30">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'सर्व विधी (All Rituals)', count: 3 },
            { id: 'active', label: 'चालू अनुष्ठान (Active / Live)', count: 1, ping: true },
            { id: 'upcoming', label: 'आगामी विधी (Scheduled)', count: 1 },
            { id: 'completed', label: 'संपन्न अनुष्ठान (Archive)', count: 1 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-white text-[#570013] shadow-xs'
                  : 'text-[#584141] hover:text-[#570013]'
              }`}
            >
              {tab.ping && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#765B00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#765B00]"></span>
                </span>
              )}
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#FFF0ED] text-[#584141] text-[10px]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#584141] pr-2">
          <span className="material-symbols-outlined text-sm text-[#765B00]">verified</span>
          <span>यज्ञशाळा संकलन: सायं संध्या व रुद्र आहुती नियमित चालू</span>
        </div>
      </div>

      {/* ACTIVE LIVE RITUAL CARD */}
      {(activeFilter === 'all' || activeFilter === 'active') && (
        <div className="w-full bg-white rounded-2xl shadow-xs border border-[#E0BFBF]/40 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#570013] via-[#765B00] to-[#800020]"></div>
          <div className="p-6 lg:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#570013] text-white text-xs font-bold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    <span>थेट प्रक्षेपण चालू • LIVE NOW</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD979]/40 text-[#795D00] text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>दिवस ३ / ७ (Day 3 of 7) • अष्टम अध्याय संपुट</span>
                  </span>
                  <span className="text-xs font-mono text-[#765B00] font-semibold">
                    संकल्प क्र: #CVP-RUDRA-9842
                  </span>
                </div>
                <h2 className="font-serif text-2xl text-[#570013] font-bold pt-1">
                  महामृत्युंजय महा अनुष्ठान व रुद्र स्वाहाकार
                </h2>
                <p className="text-xs sm:text-sm text-[#584141]">
                  शतचंडी व महारुद्र विधी विधान • प्रत्यक्ष वेद मंत्रोच्चार व दशांश होम तर्पण
                </p>
              </div>

              <button
                onClick={() =>
                  showToast('यजमान: श्री राजेश कुळकर्णी, काश्यप गोत्र, रोहिणी नक्षत्र', 'info')
                }
                className="px-4 py-2 rounded-lg bg-[#FFF0ED] text-[#570013] text-xs font-bold hover:bg-[#FCEAE6] transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">description</span>
                <span>संकल्प गोत्र तपशील</span>
              </button>
            </div>

            {/* Video & Specs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Video Container (7 cols) */}
              <div className="lg:col-span-7 flex flex-col space-y-2">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xs bg-[#FCEAE6]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvmS_y21mXiTUbxeV58F0d56w6FQj4LC2ROYgnt3wqE0Hjn4axULQDYALLS0hIXGgCRD5QGIh1zB_qG5hp-6WMcyCsOaVQKQntd6sfT04m6toH9qrFjrzvovsoRLkBqyC7B76bdrVT1cc7hrGaQbQPjVknnOtKxwh5ufvhW-DLrJMVTIWpLII04wRfjbmrtattFvANvnAaNRL1tyddtUID8fWIUZXpK-3020XBXNoIQvvp05lbgRukaQ"
                    alt="Active Yajna"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-[#570013]/90 backdrop-blur-md text-xs font-bold uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">videocam</span>
                        1080p HD • यज्ञशाळा कॅमेरा १
                      </span>
                      <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#FFDF94]">group</span>
                        १८ यजमान कुटुंबे जोडलेली आहेत
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span>वर्तमान आहुती सत्र: रुद्र स्वाहाकार संपुट (रुद्रचमकम्)</span>
                        <span className="text-[#FFDF94]">थेट ध्वनी चालू</span>
                      </div>
                      <button
                        onClick={() => setIsJoinStreamModalOpen(true)}
                        className="w-full py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">video_call</span>
                        <span>थेट प्रक्षेपणात सहभागी व्हा (Join 2-Way Live Stream)</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 text-xs text-[#584141]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#765B00]">info</span>
                    २-वे ऑडिओ/व्हिडिओद्वारे यजमान नामोच्चार व संकल्प पठण शक्य
                  </span>
                  <span className="text-[11px] text-[#584141]">विलंब: 0.8s (अल्ट्रा-लो लेटन्सी)</span>
                </div>
              </div>

              {/* Right Specs & Japa Meter (5 cols) */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#570013] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#765B00]">counter_1</span>
                      <span>मंत्र जप प्रगती (Japa Progress)</span>
                    </span>
                    <span className="font-serif text-base font-bold text-[#765B00]">
                      १९,००० <span className="text-xs text-[#584141] font-normal">/ १,२५,०००</span>
                    </span>
                  </div>
                  <div className="w-full bg-white h-3 rounded-full overflow-hidden p-0.5 border border-[#E0BFBF]/30">
                    <div className="bg-gradient-to-r from-[#765B00] to-[#570013] h-full rounded-full transition-all duration-1000" style={{ width: '15.2%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#584141]">
                    <span>१५.२% संपन्न (लक्ष्य: १,२५,००० जप)</span>
                    <span className="text-[#570013] font-bold">उर्वरित: १,०६,००० जप</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 space-y-1 text-xs">
                  <span className="text-[10px] text-[#584141] uppercase tracking-wider block font-semibold">
                    संकल्प हेतू (Sankalpa Intent)
                  </span>
                  <p className="font-bold text-[#221918]">
                    सकुटुंब आरोग्य, दीर्घायुष्य, अपमृत्यू निवारण व क्लेश निवृत्ती
                  </p>
                  <p className="text-[#765B00] text-[11px]">
                    गोत्र: कश्यप • यजमान: श्री राजेश कुलकर्णी व सौ. अनुराधा कुलकर्णी
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#584141] block">मुख्य ऋत्विक</span>
                    <span className="font-bold text-[#570013] block">वे. मू. डॉ. श्रीपाद भट</span>
                    <span className="text-[10px] text-[#584141]">घनापाठी (३५ वर्षे अनुभव)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#584141] block">सहाय्यक पुरोहित</span>
                    <span className="font-bold text-[#221918] block">४ वेद ब्रह्मवृंद</span>
                    <span className="text-[10px] text-[#765B00]">ऋग्वेद व यजुर्वेद शाखा</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFD979]/40 border border-[#C9A64B]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#765B00]">wb_sunny</span>
                    <div>
                      <span className="font-bold text-[#795D00] block">आजचे मुख्य आहुती सत्र</span>
                      <span className="font-bold text-[#570013]">११:०० AM - ०१:३० PM (स्वाहाकार)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white text-[#584141] text-[10px] font-bold">
                    सत्र २/३
                  </span>
                </div>
              </div>
            </div>

            {/* Sanctified Prasad Tracking */}
            <div className="p-5 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E0BFBF]/30">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-[#FFD979] text-[#795D00]">
                    <span className="material-symbols-outlined text-base">local_shipping</span>
                  </span>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#570013]">
                      अभिमंत्रित महाप्रसाद टपाल ट्रॅकिंग
                    </h3>
                    <span className="text-xs font-mono text-[#765B00] font-semibold">
                      Speed Post Consignment: #IP784920412IN
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD979] text-[#795D00] text-xs font-bold">
                  <span className="material-symbols-outlined text-xs">near_me</span>
                  <span>मार्गावर (Out for Delivery • Pune Central Hub)</span>
                </span>
              </div>

              {/* 4 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#570013] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    ✓
                  </span>
                  <div>
                    <span className="font-bold text-[#221918] block">हवन भस्म संकलन</span>
                    <span className="text-[10px] text-[#584141]">२१ जून, सायंकाळी</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#570013] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    ✓
                  </span>
                  <div>
                    <span className="font-bold text-[#221918] block">वेदोक्त संपुटीकरण</span>
                    <span className="text-[10px] text-[#584141]">२२ जून, सकाळी ०९:००</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#765B00] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    ३
                  </span>
                  <div>
                    <span className="font-bold text-[#765B00] block">टपाल वितरण चालू</span>
                    <span className="text-[10px] text-[#584141]">आज दुपारी ३ वाजेपर्यंत</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 opacity-50">
                  <span className="w-5 h-5 rounded-full bg-white text-[#584141] border border-[#E0BFBF] flex items-center justify-center text-[10px] font-bold shrink-0">
                    ४
                  </span>
                  <div>
                    <span className="font-bold text-[#221918] block">यजमान गृही पावती</span>
                    <span className="text-[10px] text-[#584141]">कोथरूड, पुणे</span>
                  </div>
                </div>
              </div>

              {/* Box items */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#584141] font-semibold">प्रसाद पेटी अंतर्भूत घटक:</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#E0BFBF]/40 text-[#221918] text-[11px] font-medium">
                  रक्षा सूत्र (Sanctified Red Thread)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#E0BFBF]/40 text-[#221918] text-[11px] font-medium">
                  सिद्ध भस्म (Yajna Bhasma)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#E0BFBF]/40 text-[#221918] text-[11px] font-medium">
                  ५-मुखी रुद्राक्ष (5-Mukhi Rudraksha)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#E0BFBF]/40 text-[#221918] text-[11px] font-medium">
                  यज्ञातील काजू-बदाम महाप्रसाद
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPCOMING & COMPLETED RITUALS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Card */}
        {(activeFilter === 'all' || activeFilter === 'upcoming') && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#E0BFBF]/40 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FFF0ED] text-[#570013] text-xs font-bold">
                    <span className="material-symbols-outlined text-xs">calendar_month</span>
                    <span>आगामी विधी • Scheduled & Confirmed</span>
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#570013] mt-1">
                    लघुरुद्र अभिषेक व पंचामृत महापूजा
                  </h3>
                  <p className="text-xs text-[#584141]">
                    एकादशणी रुद्राध्याय आवर्तन • सार्ध पंचामृत स्नान व बिल्वपत्र समर्पण
                  </p>
                </div>
                <span className="p-2 rounded-xl bg-[#FFF0ED] text-[#570013]">
                  <span className="material-symbols-outlined text-2xl">temple_hindu</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#FFF0ED] border border-[#E0BFBF]/30">
                  <span className="text-[10px] text-[#584141] block">मुहूर्त व तिथी</span>
                  <span className="font-bold text-[#221918] block">आषाढ शुद्ध एकादशी</span>
                  <span className="text-[11px] text-[#765B00]">रविवार, ६ जुलै २०२५ • ०७:३० AM</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FFF0ED] border border-[#E0BFBF]/30">
                  <span className="text-[10px] text-[#584141] block">उपस्थिती पद्धत</span>
                  <span className="font-bold text-[#570013] block">प्रत्यक्ष आश्रम उपस्थिती</span>
                  <span className="text-[11px] text-[#584141]">आसन व्यवस्था: कक्ष क्र. ४</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFF8F6] border border-[#E0BFBF]/30 text-xs text-[#584141] space-y-1">
                <span className="font-bold text-[#570013] block">तयारी सूचना (Checklist):</span>
                <p>• सोवळे वस्त्र (धोतर-उपरणे अथवा पारंपारिक रेशमी वस्त्र) परिधान करावे.</p>
                <p>• विधीपूर्वी अल्पोपहार टाळावा, केवळ फलाहार किंवा जल प्राशन चालते.</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E0BFBF]/30 flex items-center justify-between">
              <button
                onClick={() => showToast('पुनर्नियोजन विनंती नोंदवली. समन्वयकांचा फोन येईल.', 'info')}
                className="text-xs font-semibold text-[#584141] hover:text-[#570013] cursor-pointer"
              >
                वेळ बदला / रीशेड्यूल
              </button>
              <button
                onClick={() => showToast('ई-आमंत्रण पत्रिका (PDF) डाउनलोड होत आहे...', 'success')}
                className="px-4 py-2 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">download</span>
                <span>आमंत्रण पत्रिका (PDF)</span>
              </button>
            </div>
          </div>
        )}

        {/* Completed Card */}
        {(activeFilter === 'all' || activeFilter === 'completed') && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#E0BFBF]/40 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FFF0ED] text-[#765B00] text-xs font-bold">
                    <span className="material-symbols-outlined text-xs">task_alt</span>
                    <span>संपन्न विधी • Completed Archive</span>
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#570013] mt-1">
                    गणेश याग व नवग्रह शांती होम
                  </h3>
                  <p className="text-xs text-[#584141]">
                    अथर्वशीर्ष सहस्रावर्तन, मोदक समर्पण व नवग्रह समिधा आहुती विधी
                  </p>
                </div>
                <span className="p-2 rounded-xl bg-[#FFF0ED] text-[#765B00]">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#FFF0ED] border border-[#E0BFBF]/30">
                  <span className="text-[10px] text-[#584141] block">संपन्न तिथी</span>
                  <span className="font-bold text-[#221918] block">वैशाख शुक्ल चतुर्थी</span>
                  <span className="text-[11px] text-[#584141]">१५ मे २०२५ • पूर्णाहूती प्राप्त</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FFF0ED] border border-[#E0BFBF]/30">
                  <span className="text-[10px] text-[#584141] block">योगदान व कर सवलत पावती</span>
                  <span className="font-bold text-[#570013] block">₹११,००० (८०-जी सवलत)</span>
                  <span className="text-[11px] text-[#765B00]">पावती: <span className="font-mono font-semibold">#CVP-2025-0721</span></span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFF8F6] border-l-4 border-[#570013] text-xs space-y-1">
                <span className="font-bold text-[#570013] block">संकल्प सिद्धी आशीर्वाद:</span>
                <p className="font-serif italic text-[#221918] leading-relaxed">
                  "गणानां त्वा गणपतिं हवामहे कविं कवीनामुपमश्रवस्तमम् । ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नः शृण्वन्नूतिभिः सीद सादनम् ॥"
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E0BFBF]/30 flex items-center justify-between">
              <button
                onClick={() => showToast('संपूर्ण यज्ञ रेकॉर्डिंग प्लेयर उघडत आहे...', 'info')}
                className="px-3 py-1.5 rounded-lg bg-[#FFF0ED] text-[#570013] text-xs font-bold hover:bg-[#FCEAE6] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">video_library</span>
                <span>यज्ञ रेकॉर्डिंग पहा</span>
              </button>
              <button
                onClick={() => showToast('आशीर्वाद पत्र (PDF) डाउनलोड सुरू झाले', 'success')}
                className="px-4 py-2 rounded-lg bg-white border border-[#E0BFBF] text-[#570013] text-xs font-bold hover:bg-[#FFF0ED] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-[#765B00]">workspace_premium</span>
                <span>आशीर्वाद पत्र (PDF)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2-Way Stream Joining Modal */}
      {isJoinStreamModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#241B19]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          role="dialog"
        >
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 border border-[#E0BFBF]/40">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#570013] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">videocam</span>
                </span>
                <h3 className="font-serif text-lg font-bold text-[#570013]">
                  थेट २-वे यज्ञशाळा प्रक्षेपण
                </h3>
              </div>
              <button
                onClick={() => setIsJoinStreamModalOpen(false)}
                className="text-[#584141] hover:text-[#570013]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#584141]">
              <div className="bg-[#FFF0ED] p-4 rounded-xl space-y-2 border border-[#E0BFBF]/30">
                <p className="font-bold text-[#221918]">
                  यजमान: श्री राजेश कुळकर्णी व कुटुंब (गोत्र: काश्यप)
                </p>
                <p>सध्या चालू: महामृत्युंजय मंत्र जप व स्वाहाकार आहुती सत्र</p>
                <div className="flex items-center gap-2 text-[#765B00] font-semibold pt-1">
                  <span className="w-2 h-2 rounded-full bg-[#BA1A1A] animate-pulse"></span>
                  <span>Audio & Video Feed Ready (Google Meet / WebRTC)</span>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed">
                प्रक्षेपणात जोडल्यानंतर कृपया आपला माईक म्यूट ठेवावा. मुख्य ऋत्विक आपल्या नावाचा संकल्प उच्चारताना माईक सुरू करण्यास सांगतील.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setIsJoinStreamModalOpen(false);
                  showToast('थेट यज्ञमंडपात जोडले गेले आहात!', 'success');
                }}
                className="w-full py-3 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">video_call</span>
                <span>यज्ञमंडपात प्रवेश करा (Join Live Sanctum)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
