import React from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

interface AppointmentsViewProps {
  onNavigatePublic: (path: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({ onNavigatePublic }) => {
  const { consultation, showToast } = useDevotee();
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
            {language === 'en'
              ? 'My Scheduled Consultations & Appointments'
              : language === 'hi'
              ? 'मेरी निर्धारित अपॉइंटमेंट्स'
              : language === 'gu'
              ? 'મારી નિર્ધારિત એપોઇન્ટમેન્ટ્સ'
              : 'माझ्या नियोजित अपॉइंटमेंट्स'}
          </h1>
          <p className="text-xs sm:text-sm text-[#584141]">
            {language === 'en'
              ? 'Details of your astrology consultations, muhurta deliberations, and ritual coordination.'
              : 'ज्योतिषीय मार्गदर्शन, मुहूर्त निश्चिती व पूजा नियोजन सत्रांचे तपशील.'}
          </p>
        </div>

        <button
          onClick={() => onNavigatePublic('book-appointment')}
          className="px-4 py-2.5 rounded-xl bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>+ {t('bookAppointment')}</span>
        </button>
      </div>

      {/* Confirmed Active Card */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E0BFBF]/40 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#765B00] animate-pulse"></span>
            <span className="text-xs font-bold text-[#765B00]">
              {language === 'en' ? 'Upcoming Confirmed Session' : 'पुढील निश्चित सत्र (Upcoming)'}
            </span>
          </div>
          <span className="font-mono text-xs text-[#584141]">{consultation.id}</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqBoNe284pPDGZptxHjiY2YqjFnHWCk4n78DlFNs1FRoDvIKHHVjjmhOx-oXo1OwKc46AtIoWl6A55f5zgiDKS-5Lj3pZqEg09XUIFdp_Kpvu1H2E-prbWfydWNumkqemfsUDBp06kPL0o1clUKepUj4ylJMKzXt-7Id3RKEN6rO3EPzoMW8jQ1UCO1Dy0-OpYJdqgdRnUozHBo8ZZQDpGE5GFrQ__QtFU_QkXHMBUAGzilwuqjNy_dA"
              alt="Pt. Vishnupant Shastri"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#765B00] shrink-0"
            />
            <div>
              <span className="font-serif text-base font-bold text-[#570013] block">
                {consultation.acharyName}
              </span>
              <span className="text-xs text-[#584141] block">{consultation.acharyaTitle}</span>
              <span className="text-xs text-[#765B00] font-semibold mt-0.5 block">
                {language === 'en' ? 'Subject:' : 'विषय:'} {consultation.subject}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#221918]">
              <span className="material-symbols-outlined text-[#570013] text-base">event</span>
              <span>{consultation.date} • {consultation.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#584141]">
              <span className="material-symbols-outlined text-[#765B00] text-base">location_on</span>
              <span>{consultation.location}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD979]/40 text-[#795D00] text-[11px] font-bold mt-1">
              {language === 'en' ? 'Confirmed & Verified' : 'आरक्षित व निश्चित'}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E0BFBF]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[#584141]">
            {language === 'en' ? 'Need to reschedule?' : 'काही बदल करायचे असल्यास आश्रम समन्वयक:'}{' '}
            <a href="tel:+919822054321" className="text-[#570013] font-bold font-mono">
              +91 98220 54321
            </a>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast(language === 'en' ? 'Directions sent to phone' : 'पत्ता व नकाशा आपल्या फोनवर पाठवला आहे.', 'info')}
              className="px-3 py-1.5 rounded-lg bg-[#FFF0ED] text-[#221918] font-semibold hover:bg-[#FCEAE6] transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Ashram Directions' : 'आश्रम नकाशा व मार्ग'}
            </button>
            <button
              onClick={() => showToast(language === 'en' ? 'Opening questions modal...' : 'प्रश्न सूची उघडली जात आहे...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-[#570013] text-white font-bold hover:bg-[#800020] transition-colors cursor-pointer"
            >
              {language === 'en' ? 'My Questions' : 'माझे प्रश्न'}
            </button>
          </div>
        </div>
      </div>

      {/* Past Completed Consultations */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E0BFBF]/40 space-y-4">
        <h2 className="font-serif text-base font-bold text-[#570013]">
          {language === 'en' ? 'Past Consultations & Remedies History' : 'मागील पूर्ण झालेली सत्रे व उपाय इतिहास'}
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-[#FFF0ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#E0BFBF]/30">
            <div>
              <span className="font-bold text-[#221918] block text-sm">
                {language === 'en' ? 'Griha Vastu Shanti Consult & Janmapatrika Examination' : 'गृह वास्तुशांती मुहूर्त व जन्मपत्रिका वेध'}
              </span>
              <span className="text-[#584141]">
                १० जानेवारी २०२४ • पं. पु. विष्णुपंत शास्त्री • {language === 'en' ? 'Mode: Ashram Consultation' : 'थेट आश्रम परामर्श'}
              </span>
            </div>
            <button
              onClick={() => showToast(language === 'en' ? 'Downloading remedy notes PDF...' : 'सल्ला नोंद पीडीएफ डाउनलोड केली जात आहे.', 'info')}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#E0BFBF]/40 text-[#570013] font-bold hover:bg-[#FFDADA] transition-colors self-start sm:self-auto cursor-pointer"
            >
              {language === 'en' ? 'Remedy Notes PDF' : 'सल्ला नोंद (PDF)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
