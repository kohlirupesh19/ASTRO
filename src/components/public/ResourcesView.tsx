import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';

interface ResourcesViewProps {
  onNavigate: (path: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => {
  const { showToast } = useDevotee();
  const [activeTab, setActiveTab] = useState<'pothi' | 'panchang' | 'audio'>('panchang');

  const pothiDownloads = [
    {
      title: 'ऋग्वेद शाकल संहिता (प्रथम मण्डल)',
      format: 'PDF • 8.4 MB',
      shakha: 'शाकल शाखा',
      desc: 'मूळ सस्वर संहिता, पदपाठ आणि सायण भाष्य सारांश.',
    },
    {
      title: 'श्री रुद्राष्टाध्यायी व चमकम् सस्वर पाठ',
      format: 'PDF • 5.1 MB',
      shakha: 'शुक्ल यजुर्वेद',
      desc: 'नमक-चमक मंत्र, न्यास विधी आणि फलश्रुतीसह.',
    },
    {
      title: 'श्री सूक्त व पुरुष सूक्त उपासना विधी',
      format: 'PDF • 3.2 MB',
      shakha: 'ऋग्वेद परिशिष्ट',
      desc: 'लक्ष्मी प्राप्ती व आत्मिक उद्धारासाठी प्रामाणिक पाठ.',
    },
    {
      title: 'नित्य संध्योपासन व ब्रह्मयज्ञ विधी',
      format: 'PDF • 2.8 MB',
      shakha: 'त्रिकाल संध्या',
      desc: 'आचमन, प्राणायाम, गायत्री जप व तर्पण सविस्तर पद्धती.',
    },
  ];

  const audioChants = [
    {
      title: 'अग्नि सूक्त — ऋग्वेद १.१',
      reciter: 'वे. मू. डॉ. श्रीपाद भट',
      duration: '०८:३५',
    },
    {
      title: 'श्री रुद्रम् — चमकम् संपुट',
      reciter: 'आश्रम घनपाठ मंडळ',
      duration: '२२:१५',
    },
    {
      title: 'महामृत्युंजय मंत्र १०८ आवर्तने',
      reciter: 'पं. गणेशबुवा रानडे',
      duration: '२८:४०',
    },
    {
      title: 'विष्णुसहस्रनाम स्तोत्र सस्वर',
      reciter: 'वेदमंदिर वृंद',
      duration: '२५:१०',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#FFF8F6] min-h-screen">
      <div className="w-full bg-[#FFF0ED] py-3 border-b border-[#E0BFBF]/30">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex items-center gap-2 text-xs text-[#584141]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#570013] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-[#765B00]">home</span>
            <span>Home</span>
          </button>
          <span className="text-[#E0BFBF]">/</span>
          <span className="text-[#570013] font-semibold">
            Sacred Resources (साहित्य, पोथी व नित्य पंचांग)
          </span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 lg:px-12 py-12 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs text-[#765B00] font-bold uppercase tracking-wider">
            Public Knowledge Repository
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#570013] font-bold tracking-tight">
            Vedic Pothis, Audio Masters & Daily Panchang
            <span className="block font-serif text-xl sm:text-2xl text-[#765B00] font-medium mt-1">
              अस्सल वैदिक पोथी, ध्वनीमुद्रण व पंचांग
            </span>
          </h1>
          <p className="text-sm text-[#584141]">
            Freely accessible sacred resources preserved from authentic palm manuscripts and recorded by traditional master scholars.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#E0BFBF]/40 pb-2">
          <button
            onClick={() => setActiveTab('panchang')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'panchang'
                ? 'bg-[#570013] text-white shadow-xs'
                : 'text-[#584141] hover:bg-[#FFF0ED]'
            }`}
          >
            दैनिक पंचांग व शुभ मुहूर्त (Daily Panchang)
          </button>
          <button
            onClick={() => setActiveTab('pothi')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pothi'
                ? 'bg-[#570013] text-white shadow-xs'
                : 'text-[#584141] hover:bg-[#FFF0ED]'
            }`}
          >
            सस्वर पोथी व हस्तलिखित (Pothi Downloads)
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'audio'
                ? 'bg-[#570013] text-white shadow-xs'
                : 'text-[#584141] hover:bg-[#FFF0ED]'
            }`}
          >
            वैदिक ध्वनीमुद्रण (Audio Chants)
          </button>
        </div>

        {/* Tab 1: Daily Panchang */}
        {activeTab === 'panchang' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#E0BFBF]/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E0BFBF]/30">
              <div>
                <span className="text-xs text-[#765B00] font-bold uppercase tracking-wider">
                  लाहिडी अयनांश संमत • Chitra Paksha
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#570013] mt-0.5">
                  ज्येष्ठ शुक्ल दशमी • सोमवासर (सोमप्रदोष)
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#FFD979]/40 text-[#795D00] text-xs font-bold rounded-full w-fit">
                सूर्योदय: ०५:५६ AM • सूर्यास्त: ०७:०८ PM
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#FFF0ED] p-4 rounded-xl border border-[#E0BFBF]/30 space-y-1">
                <span className="text-[11px] text-[#584141] uppercase">तिथी (Tithi)</span>
                <span className="font-serif text-base font-bold text-[#570013] block">शुक्ल दशमी</span>
                <span className="text-xs text-[#584141]">दुपारी ०२:१४ पर्यंत, तदनंतर एकादशी</span>
              </div>

              <div className="bg-[#FFF0ED] p-4 rounded-xl border border-[#E0BFBF]/30 space-y-1">
                <span className="text-[11px] text-[#584141] uppercase">नक्षत्र (Nakshatra)</span>
                <span className="font-serif text-base font-bold text-[#570013] block">हस्त नक्षत्र</span>
                <span className="text-xs text-[#584141]">रात्री ०८:४० पर्यंत, तदनंतर चित्रा</span>
              </div>

              <div className="bg-[#FFF0ED] p-4 rounded-xl border border-[#E0BFBF]/30 space-y-1">
                <span className="text-[11px] text-[#584141] uppercase">योग व करण</span>
                <span className="font-serif text-base font-bold text-[#570013] block">सिद्धि योग</span>
                <span className="text-xs text-[#584141]">करण: गर • आनंदादि योग: छत्र</span>
              </div>

              <div className="bg-[#FFF0ED] p-4 rounded-xl border border-[#E0BFBF]/30 space-y-1">
                <span className="text-[11px] text-[#584141] uppercase">चंद्र राशी (Moon Sign)</span>
                <span className="font-serif text-base font-bold text-[#570013] block">कन्या रास</span>
                <span className="text-xs text-[#584141]">राशी स्वामी: बुध ग्रह</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FCEAE6] border border-[#E0BFBF]/40 space-y-2">
                <span className="text-xs font-bold text-[#570013] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#765B00] text-[16px]">check_circle</span>
                  <span>शुभ मुहूर्त (Auspicious Muhurtas)</span>
                </span>
                <div className="text-xs text-[#584141] space-y-1">
                  <div className="flex justify-between">
                    <span>अभिजीत मुहूर्त:</span>
                    <strong className="text-[#221918]">१२:०२ PM – १२:५४ PM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>अमृत काळ:</span>
                    <strong className="text-[#221918]">०२:३० PM – ०४:१५ PM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>ब्रह्म मुहूर्त:</span>
                    <strong className="text-[#221918]">०४:२५ AM – ०५:१० AM</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/40 space-y-2">
                <span className="text-xs font-bold text-[#BA1A1A] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#BA1A1A] text-[16px]">block</span>
                  <span>अशुभ काळ (Avoid Major Undertakings)</span>
                </span>
                <div className="text-xs text-[#584141] space-y-1">
                  <div className="flex justify-between">
                    <span>राहू काळ:</span>
                    <strong className="text-[#BA1A1A]">०७:३० AM – ०९:०८ AM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>यमगंड:</span>
                    <strong className="text-[#BA1A1A]">१०:४५ AM – १२:२२ PM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>गुलिक काळ:</span>
                    <strong className="text-[#584141]">०१:५९ PM – ०३:३६ PM</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pothi Downloads */}
        {activeTab === 'pothi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pothiDownloads.map((pothi, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow-xs border border-[#E0BFBF]/40 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] bg-[#FFDADA] text-[#570013] px-2 py-0.5 rounded font-bold uppercase">
                    {pothi.shakha}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#570013]">{pothi.title}</h3>
                  <p className="text-xs text-[#584141]">{pothi.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E0BFBF]/30">
                  <span className="text-xs text-[#765B00] font-semibold">{pothi.format}</span>
                  <button
                    onClick={() => showToast(`डाउनलोड सुरू झाले: ${pothi.title}`, 'info')}
                    className="px-3 py-1.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">download</span>
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Audio Chants */}
        {activeTab === 'audio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audioChants.map((audio, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow-xs border border-[#E0BFBF]/40 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF0ED] text-[#570013] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">graphic_eq</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#570013]">{audio.title}</h3>
                    <p className="text-xs text-[#584141]">{audio.reciter}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-[#765B00] font-mono">{audio.duration}</span>
                  <button
                    onClick={() => onNavigate('gurukul-agni-sukta')}
                    className="p-2 rounded-full bg-[#570013] text-white hover:bg-[#800020] transition-colors cursor-pointer"
                    title="Play in recitation console"
                  >
                    <span className="material-symbols-outlined text-base">play_arrow</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
