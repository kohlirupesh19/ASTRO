import React from 'react';
import { Logo } from '../common/Logo.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col w-full bg-[#FFF8F6] min-h-screen">
      {/* Breadcrumb */}
      <div className="w-full bg-[#FFF0ED] py-3 border-b border-[#E0BFBF]/30">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex items-center gap-2 text-xs text-[#584141]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#570013] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-[#765B00]">home</span>
            <span>{t('nav.home')}</span>
          </button>
          <span className="text-[#E0BFBF]">/</span>
          <span className="text-[#570013] font-semibold">{t('nav.about')}</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 lg:px-12 py-12 space-y-12">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFD979]/40 text-[#795D00] text-xs font-bold uppercase tracking-wider">
            ॥ धर्मो रक्षति रक्षितः ॥ • 35+ Years of Service
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#570013] font-bold tracking-tight">
            Chaitanya Ved Pratishthan
            <span className="block font-serif text-xl sm:text-2xl text-[#765B00] font-semibold mt-1">
              चैतन्य वेद प्रतिष्ठान — संस्था इतिहास व उद्दिष्टे
            </span>
          </h1>
          <p className="text-base text-[#584141] leading-relaxed">
            Founded in Pune under the Bombay Public Trusts Act, 1950 (Regn. No. F/49210/Pune), Chaitanya Ved Pratishthan is dedicated to preserving the pristine oral transmission of the Four Vedas, advancing authentic Jyotish Shastra research, and maintaining a non-commercial, austere Gurukul environment.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FFDADA] text-[#570013] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#570013]">Vedic Oral Lineage</h3>
            <p className="text-xs text-[#584141] leading-relaxed">
              Preserving the unbroken oral recitations of Shakala Rigveda and Madhyandina Shukla Yajurveda. Over 48 full-time students study tuition-free at our Ved Bhavan campus.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FFDF94] text-[#795D00] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#570013]">Shastric Astronomy & Jyotish</h3>
            <p className="text-xs text-[#584141] leading-relaxed">
              Anchored in Brihat Parashara Hora Shastra, Jaimini, and Surya Siddhanta mathematics. Consultations provide objective life discernment free from exploitative gemstone sales.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF0ED] text-[#570013] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">volunteer_activism</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#570013]">100% Tax Deductible 80G Seva</h3>
            <p className="text-xs text-[#584141] leading-relaxed">
              Recognized under Section 80G(5)(vi) of the Income Tax Act, 1961 (CBDT Approval #AAATC49210F20214). All contributions provide direct educational support to young Brahmacharis.
            </p>
          </div>
        </div>

        {/* Acharya Council */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs text-[#765B00] font-bold uppercase tracking-wider">
              विद्वत्परिषद • Advisory Board
            </span>
            <h2 className="font-serif text-2xl text-[#570013] font-bold">
              Our Senior Acharyas & Trustees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 border border-[#E0BFBF]/40 shadow-xs flex items-start gap-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr8sUQmJU_ddYYDQH_FMwyANmppwuhlKmDsC5agsgu5KLGBNnUEFsVOF6m15896lNDYI-WoYxiQUZMAZoOsET-3jNqm5ya9xYYvno9QMEb0YtSqayVEXsdRFxneOxrarysM1PGql_ztJhegdgmB91BGP6qVO85cdueBUI2WlMdx2bT445bfplMTx06IH5xwtN-JQqBknbNd6eoI5dLvQ7AtBOIItTrgpB8d-5-qsTL_jfw6eenEEBLIQ"
                alt="Acharya Shridhar Ghanapathi"
                className="w-14 h-14 rounded-full object-cover shrink-0 border border-[#E0BFBF]"
              />
              <div className="flex flex-col min-w-0">
                <h4 className="font-serif text-sm font-bold text-[#570013]">
                  वे. मू. डॉ. श्रीपाद भट
                </h4>
                <span className="text-xs text-[#765B00] font-semibold">ऋग्वेद घनापाठी व मुख्य कुलगुरू</span>
                <p className="text-[11px] text-[#584141] mt-1">
                  ३५ वर्षे अविरत अध्यापन, पुणे विद्यापीठ सुवर्णपदक, वैदिक प्रातिशाख्य तज्ञ.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#E0BFBF]/40 shadow-xs flex items-start gap-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqBoNe284pPDGZptxHjiY2YqjFnHWCk4n78DlFNs1FRoDvIKHHVjjmhOx-oXo1OwKc46AtIoWl6A55f5zgiDKS-5Lj3pZqEg09XUIFdp_Kpvu1H2E-prbWfydWNumkqemfsUDBp06kPL0o1clUKepUj4ylJMKzXt-7Id3RKEN6rO3EPzoMW8jQ1UCO1Dy0-OpYJdqgdRnUozHBo8ZZQDpGE5GFrQ__QtFU_QkXHMBUAGzilwuqjNy_dA"
                alt="Pt. Vishnupant Shastri"
                className="w-14 h-14 rounded-full object-cover shrink-0 border border-[#E0BFBF]"
              />
              <div className="flex flex-col min-w-0">
                <h4 className="font-serif text-sm font-bold text-[#570013]">
                  दैवज्ञ पं. पु. विष्णुपंत शास्त्री
                </h4>
                <span className="text-xs text-[#765B00] font-semibold">फलज्योतिष व मुहूर्त विशारद</span>
                <p className="text-[11px] text-[#584141] mt-1">
                  ३२ वर्षे फलज्योतिष व प्रश्नशास्त्र अनुभव, काशी विद्यापीठ सन्मानित.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#E0BFBF]/40 shadow-xs flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#570013] text-white flex items-center justify-center font-bold font-serif text-lg shrink-0">
                पं
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-serif text-sm font-bold text-[#570013]">
                  पं. विनायक दीक्षित
                </h4>
                <span className="text-xs text-[#765B00] font-semibold">आश्रम व यज्ञाश्रम समन्वयक</span>
                <p className="text-[11px] text-[#584141] mt-1">
                  यज्ञ साहित्य, गोत्र संकल्प व देश-विदेशातील यजमान समन्वय प्रमुख.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Trust Registration Badge */}
        <div className="p-8 rounded-2xl bg-[#FFF0ED] border border-[#E0BFBF]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold text-[#570013]">
              Visit Ved Bhavan Campus (पुणे आश्रम भेट)
            </h3>
            <p className="text-sm text-[#584141]">
              Maharshi Vidya Nagar, Paud Road, Pune 411038. Open daily for darshan, consultations, and library access.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shrink-0 shadow-md cursor-pointer"
          >
            Get Location & Directions
          </button>
        </div>
      </div>
    </div>
  );
};
