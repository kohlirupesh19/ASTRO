import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

export const GurukulLearningView: React.FC = () => {
  const { audioState, setAudioState, togglePlayAudio, showToast } = useDevotee();
  const { language, t } = useLanguage();
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const formatAudioTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const handleStartRecord = () => {
    setIsRecording(true);
    setRecordSeconds(0);
    const interval = setInterval(() => {
      setRecordSeconds((p) => p + 1);
    }, 1000);
    (window as any).__recInterval = interval;
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    clearInterval((window as any).__recInterval);
  };

  const handleSubmitRecord = () => {
    clearInterval((window as any).__recInterval);
    setIsRecordModalOpen(false);
    setIsRecording(false);
    showToast(
      'आपले वेदमंत्रोच्चार ध्वनीमुद्रण आचार्य परीक्षणासाठी यशस्वीरित्या पाठवण्यात आले आहे! (Ref: #REC-7829-05)',
      'success'
    );
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header Strip & Streak Ribbon */}
      <div className="flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-xs border border-[#E0BFBF]/40">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#584141]">
          <div className="flex items-center gap-1.5">
            <span>{t('devoteeSanctum')}</span>
            <span className="opacity-50">/</span>
            <span className="text-[#570013] font-bold">{t('nav.learning')}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDF94] text-[#251A00] text-xs font-bold">
              <span className="material-symbols-outlined text-sm leading-none">local_fire_department</span>
              <span>
                {language === 'en'
                  ? '14-Day Continuous Vedic Sadhana'
                  : '१४ दिवस अखंड साधना (14-Day Streak)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0ED] text-[#221918] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm text-[#570013]">timer</span>
              <span>
                {language === 'en'
                  ? 'Total Study Hours: 28h 40m'
                  : 'एकूण साधना वेळ: २८ तास ४० मिनिटे'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-1">
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold tracking-tight">
              {language === 'en'
                ? 'My Gurukul Learning & Veda Sadhana Suite'
                : language === 'hi'
                ? 'मेरा गुरुकुल स्वाध्याय एवं वेद साधना कक्ष'
                : language === 'gu'
                ? 'મારો ગુરુકુળ સ્વાધ્યાય અને વેદ સાધના કક્ષ'
                : 'माझा गुरुकुल स्वाध्याय व वेद साधना कक्ष'}
            </h1>
            <p className="text-xs sm:text-sm text-[#584141]">
              {language === 'en'
                ? 'Shruti Parampara & Authentic Vedic Chanting • Direct learning under vetted Ghanapathis with pronunciation validation.'
                : 'श्रुतिपरंपरा व सस्वर वेदमंत्रोच्चार • प्रत्यक्ष गुरुमुखातून अध्ययन व उच्चार शुद्धीकरण'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => setIsRecordModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold shadow-xs hover:bg-[#800020] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">mic</span>
              <span>{language === 'en' ? 'Record My Chanting / Audio Test' : 'माझा उच्चार तपासा / ऑडिओ सादर करा'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Synchronized Recitation Audio Console */}
      <div className="bg-white rounded-2xl shadow-xs border border-[#E0BFBF]/40 overflow-hidden flex flex-col">
        <div className="px-6 py-3 bg-[#FFF0ED] flex flex-wrap items-center justify-between gap-2 border-b border-[#E0BFBF]/30">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-[#570013] text-white font-bold">
              चालू स्वाध्याय
            </span>
            <span className="font-bold text-[#221918]">
              ऋग्वेद शाकल संहिता - प्रथम मण्डल
            </span>
            <span className="opacity-40 hidden sm:inline">•</span>
            <span className="text-[#584141] hidden sm:inline">
              पाठ क्र. ४ / १२ • अग्नि सूक्त (१.१)
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[#FFDF94] text-[#251A00] font-semibold">
            उदात्त • अनुदात्त • स्वरित सस्वर पाठ
          </span>
        </div>

        <div className="p-6 space-y-5">
          {/* Synchronized Shloka Block */}
          <div className="p-6 rounded-xl bg-[#FFF8F6] border border-[#E0BFBF]/30 space-y-4 text-center">
            <div className="flex items-center justify-between text-xs text-[#584141]">
              <span className="text-[#570013] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#765B00]">auto_awesome</span>
                <span>शौनकीय प्रतिशाख्य स्वर-चिन्हांकित संहिता</span>
              </span>
              <span className="text-[#765B00] font-medium">
                गुरुमुख उच्चार: वे. मू. डॉ. श्रीपाद भट (घनापाठी)
              </span>
            </div>

            <p
              className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#570013] font-bold tracking-wide select-all"
              style={{ lineHeight: '2.2' }}
            >
              ॥ ॐ अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म् ।<br className="hidden sm:inline" />
              होता॑रं रत्न॒धात॑मम् ॥ १ ॥
            </p>

            <span className="text-xs text-[#765B00] font-semibold inline-block">
              ऋग्वेद अ. १ • सू. १ • ऋचा १
            </span>

            {/* Word by word breakdown grid */}
            <div className="bg-[#FFF0ED] rounded-xl p-3 text-left border border-[#E0BFBF]/30">
              <span className="text-xs font-bold text-[#570013] block mb-2">
                पदपाठ व निरुक्त अर्थविवरण (Word-by-word Breakdown):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 rounded bg-white border border-[#E0BFBF]/30">
                  <span className="font-bold text-[#570013] block">अ॒ग्निम्</span>
                  <span className="text-[11px] text-[#584141]">अग्नीला (सर्वप्रथम)</span>
                </div>
                <div className="p-2 rounded bg-white border border-[#E0BFBF]/30">
                  <span className="font-bold text-[#570013] block">ई॒ळे</span>
                  <span className="text-[11px] text-[#584141]">मी स्तवन करतो</span>
                </div>
                <div className="p-2 rounded bg-white border border-[#E0BFBF]/30">
                  <span className="font-bold text-[#570013] block">पु॒रः-हि॑तम्</span>
                  <span className="text-[11px] text-[#584141]">यज्ञाचे पुरोहित</span>
                </div>
                <div className="p-2 rounded bg-white border border-[#E0BFBF]/30">
                  <span className="font-bold text-[#570013] block">य॒ज्ञस्य॑</span>
                  <span className="text-[11px] text-[#584141]">यज्ञाचे रक्षक</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Console Waveform & Controls */}
          <div className="bg-[#FFF0ED] p-4 rounded-xl border border-[#E0BFBF]/40 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#584141]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#570013] text-white font-bold text-[10px]">
                  सस्वर ध्वनी
                </span>
                <span className="font-bold text-[#221918]">
                  ऋचा १: {formatAudioTime(audioState.currentTimeSeconds)}
                </span>
              </div>
              <span>एकूण: {formatAudioTime(audioState.totalDurationSeconds)}</span>
            </div>

            {/* Simulated 35 Waveform Bars */}
            <div className="w-full h-11 bg-white rounded-lg p-2 flex items-center justify-between gap-1 border border-[#E0BFBF]/30 cursor-pointer">
              {[
                3, 5, 8, 6, 9, 10, 7, 4, 8, 10, 6, 9, 11, 8, 5, 7, 9, 11, 6, 8, 10, 7, 5, 8, 4, 6, 9,
                7, 5, 8, 3, 6, 9, 4, 2,
              ].map((h, i) => {
                const isPast =
                  i / 35 <= audioState.currentTimeSeconds / audioState.totalDurationSeconds;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${
                      isPast ? (i % 2 === 0 ? 'bg-[#570013]' : 'bg-[#765B00]') : 'bg-[#E0BFBF]'
                    }`}
                    style={{ height: `${h * 3}px` }}
                  ></div>
                );
              })}
            </div>

            {/* Control buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setAudioState((p) => ({
                      ...p,
                      currentTimeSeconds: Math.max(0, p.currentTimeSeconds - 10),
                    }))
                  }
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#584141] hover:bg-[#FCEAE6] border border-[#E0BFBF]/30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">replay_10</span>
                </button>
                <button
                  onClick={togglePlayAudio}
                  className="w-10 h-10 rounded-full bg-[#570013] text-white flex items-center justify-center hover:bg-[#800020] shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">
                    {audioState.isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button
                  onClick={() =>
                    setAudioState((p) => ({
                      ...p,
                      currentTimeSeconds: Math.min(p.totalDurationSeconds, p.currentTimeSeconds + 10),
                    }))
                  }
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#584141] hover:bg-[#FCEAE6] border border-[#E0BFBF]/30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">forward_10</span>
                </button>
                <button
                  onClick={() => setAudioState((p) => ({ ...p, isLooping: !p.isLooping }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border border-[#E0BFBF]/30 cursor-pointer ${
                    audioState.isLooping ? 'bg-[#FFD979] text-[#795D00]' : 'bg-white text-[#584141]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">repeat</span>
                  <span>मंत्र आवर्तन (Loop)</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex bg-white rounded-lg p-0.5 border border-[#E0BFBF]/30 font-semibold">
                  {[1.0, 0.75, 0.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setAudioState((p) => ({ ...p, playbackSpeed: spd }))}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        audioState.playbackSpeed === spd
                          ? 'bg-[#570013] text-white font-bold'
                          : 'text-[#584141]'
                      }`}
                    >
                      {spd === 1.0 ? '१.०x' : spd === 0.75 ? '०.७५x (सराव)' : '०.५x'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Tracks & Acharya Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Enrolled tracks */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-xs border border-[#E0BFBF]/40 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
            <h2 className="font-serif text-base font-bold text-[#570013]">
              माझे नोंदणीकृत अभ्यासक्रम (Active Tracks)
            </h2>
            <span className="text-xs text-[#765B00] font-semibold">३ अभ्यासक्रम सक्रिय</span>
          </div>

          <div className="space-y-3">
            {/* Course 1 */}
            <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#570013] text-white font-bold">
                      चालू पाठ
                    </span>
                    <span className="text-xs text-[#584141]">वेदमंत्र शाखा: शाकल संहिता</span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#221918]">
                    ऋग्वेद शाकल संहिता अध्ययन (प्रारंभिक)
                  </h3>
                  <span className="text-xs text-[#584141]">आचार्य: वे. मू. डॉ. श्रीपाद भट</span>
                </div>
                <button
                  onClick={() => showToast('स्वाध्याय सुरू केला आहे', 'info')}
                  className="px-3 py-1.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors cursor-pointer shrink-0"
                >
                  स्वाध्याय सुरू ठेवा
                </button>
              </div>
              <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-[#E0BFBF]/30">
                <div className="h-full bg-[#570013] rounded-full" style={{ width: '33.3%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-[#584141]">
                <span>प्रगती</span>
                <span className="font-bold text-[#570013]">३३% (४/१२ पाठ)</span>
              </div>
            </div>

            {/* Course 2 */}
            <div className="p-4 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#FFDF94] text-[#251A00] font-bold">
                      थेट वर्ग (Live)
                    </span>
                    <span className="text-xs text-[#584141]">व्याकरण वेदांग</span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#221918]">
                    संस्कृत संभाषण व पाणिनीय व्याकरण
                  </h3>
                  <span className="text-xs text-[#584141]">आचार्य: डॉ. माधवशास्त्री गोडबोले</span>
                </div>
                <a
                  href="https://zoom.us"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FFD979] text-[#795D00] text-xs font-bold hover:bg-[#FFDF94] transition-colors flex items-center gap-1 shrink-0"
                >
                  <span className="material-symbols-outlined text-sm">videocam</span>
                  <span>Zoom लिंक</span>
                </a>
              </div>
              <div className="p-2.5 rounded bg-white text-xs text-[#584141] flex items-center gap-2 border border-[#E0BFBF]/30">
                <span className="material-symbols-outlined text-base text-[#570013]">event</span>
                <span>पुढील सत्र: शनिवार, १ जून २०२४ • सकाळी ०८:३० AM IST</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-[#E0BFBF]/30">
                <div className="h-full bg-[#765B00] rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Acharya Review */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xs border border-[#E0BFBF]/40 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#570013] text-xl">record_voice_over</span>
              <h2 className="font-serif text-base font-bold text-[#570013]">उच्चार शुद्धता परीक्षण</h2>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#FFDADA] text-[#570013] text-[10px] font-bold">
              सत्यापित
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] text-[#584141] uppercase">सादरीकरण तपशील:</span>
              <h4 className="font-serif text-sm font-bold text-[#221918]">अग्नि सूक्त मंत्र क्र. १ व २</h4>
              <span className="text-[11px] text-[#765B00]"><span className="font-mono">#REC-7829-04</span> • २६ मे २०२४</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FFF0ED] text-center border border-[#E0BFBF]/30 shrink-0">
              <span className="font-serif text-2xl font-bold text-[#570013] leading-none">९२%</span>
              <span className="text-[10px] text-[#765B00] font-bold mt-0.5">शुद्धता स्कोअर</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2 rounded bg-[#FFF0ED]">
              <span className="text-[#584141] block">उदात्त स्वर</span>
              <span className="text-[#570013] font-bold">उत्कृष्ट (९५%)</span>
            </div>
            <div className="p-2 rounded bg-[#FFF0ED]">
              <span className="text-[#584141] block">अनुदात्त स्वर</span>
              <span className="text-[#570013] font-bold">संधी शुद्ध (९०%)</span>
            </div>
            <div className="p-2 rounded bg-[#FFF0ED]">
              <span className="text-[#584141] block">वर्णोच्चार</span>
              <span className="text-[#570013] font-bold">शुद्ध (९१%)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#570013] text-white flex items-center justify-center font-bold text-xs shrink-0">
                वि
              </div>
              <div>
                <span className="font-bold text-[#570013] block">आचार्य वे. मू. विनायकशास्त्री जोशी</span>
                <span className="text-[10px] text-[#584141]">मुख्य परीक्षक, वेद विद्यापीठ</span>
              </div>
            </div>
            <p className="text-[#221918] italic leading-relaxed bg-white p-2.5 rounded-lg border border-[#E0BFBF]/30">
              "उदात्त व अनुदात्त उच्चार समाधानकारक आहेत. मात्र दुसऱ्या मंत्रातील <strong>'रत्नधातमम्'</strong> उच्चारताना अक्षरावरील आघात किंचित संथ असावा. पुढील पाठाकडे जाण्यास अनुमती."
            </p>
          </div>

          <button
            onClick={() => setIsRecordModalOpen(true)}
            className="w-full py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">upload_file</span>
            <span>नवीन सराव रेकॉर्डिंग पाठवा (#REC-05)</span>
          </button>
        </div>
      </div>

      {/* Record Modal */}
      {isRecordModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#241B19]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          role="dialog"
        >
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 border border-[#E0BFBF]/40">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#570013] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">mic</span>
                </span>
                <h3 className="font-serif text-lg font-bold text-[#570013]">
                  सस्वर मंत्रोच्चार सादरीकरण
                </h3>
              </div>
              <button
                onClick={() => setIsRecordModalOpen(false)}
                className="text-[#584141] hover:text-[#570013]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#221918] mb-1">
                  निवडलेला पाठ:
                </label>
                <select className="w-full p-2.5 rounded-lg bg-[#FFF8F6] text-xs text-[#221918] border border-[#E0BFBF]/50 focus:outline-none">
                  <option>ऋग्वेद प्रथम मण्डल • अग्नि सूक्त मंत्र १ ते ९</option>
                  <option>श्रीसूक्त (ऋग्वेद परिशिष्ट) • संपूर्ण १६ ऋचा</option>
                  <option>पुरुषसूक्त • अध्याय ३१ (शुक्ल यजुर्वेद)</option>
                </select>
              </div>

              <div className="p-6 rounded-xl bg-[#FFF0ED] border border-[#E0BFBF]/30 flex flex-col items-center justify-center space-y-3 text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-[#BA1A1A] text-white animate-pulse'
                      : 'bg-white text-[#570013] shadow-xs'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">mic</span>
                </div>

                <div className="space-y-0.5">
                  <span className="font-mono text-2xl font-bold text-[#570013]">
                    {formatAudioTime(recordSeconds)}
                  </span>
                  <p className="text-xs text-[#584141]">
                    {isRecording ? 'रेकॉर्डिंग सुरू आहे... शांतपणे व सस्वर उच्चारण करा.' : 'तयार झाल्यावर सुरू करा.'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecord}
                      className="px-4 py-2 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
                      <span>रेकॉर्ड सुरू करा</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecord}
                      className="px-4 py-2 rounded-lg bg-[#BA1A1A] text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">stop</span>
                      <span>थांबवा</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E0BFBF]/30">
              <button
                onClick={() => setIsRecordModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#FFF0ED] text-[#221918] text-xs font-semibold"
              >
                रद्द करा
              </button>
              <button
                onClick={handleSubmitRecord}
                className="px-5 py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] shadow-xs cursor-pointer"
              >
                परीक्षणासाठी सादर करा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
