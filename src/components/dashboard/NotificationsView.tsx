import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

interface NotificationsViewProps {
  onNavigateModule: (module: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onNavigateModule }) => {
  const { showToast } = useDevotee();
  const { language, t } = useLanguage();

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      titleEn: 'Live Yajna Broadcast Active Now',
      titleMr: 'थेट यज्ञानुष्ठान सत्र चालू आहे (Live Now)',
      timeEn: '10 mins ago',
      timeMr: '१० मिनिटांपूर्वी',
      messageEn: 'Maha Mrityunjaya Anushthan: Chapter 8 Samputa Swahakar session streaming live. 18 Yajmans connected.',
      messageMr: 'महामृत्युंजय अनुष्ठान: अष्टम अध्याय संपुट स्वाहाकार सत्र थेट प्रक्षेपण सुरू आहे. १८ यजमान जोडले आहेत.',
      unread: true,
      actionModule: 'rituals',
      actionTextEn: 'Join Live Yajna Stream',
      actionTextMr: 'थेट प्रवाहात सामील व्हा',
      icon: 'local_fire_department',
    },
    {
      id: 'n2',
      titleEn: 'Astrology Session Confirmed for Tomorrow',
      titleMr: 'उद्याचा ज्योतिष परामर्श निश्चित (Confirmed)',
      timeEn: '2 hours ago',
      timeMr: '२ तासांपूर्वी',
      messageEn: 'Session scheduled tomorrow at 11:30 AM IST with Pt. Vishnupant Shastri. Pre-questionnaire reviewed.',
      messageMr: 'दैवज्ञ पं. विष्णुपंत शास्त्री यांच्यासोबत उद्या सकाळी ११:३० वाजता आपले सत्र नियोजित आहे. पूर्व-प्रश्नावली तपासली गेली आहे.',
      unread: true,
      actionModule: 'astrology',
      actionTextEn: 'View Consultation Room',
      actionTextMr: 'परामर्श कक्ष पहा',
      icon: 'auto_awesome',
    },
    {
      id: 'n3',
      titleEn: 'Sacred Raksha Sutra & Bhasma Consignment Dispatched',
      titleMr: 'अभिमंत्रित रक्षा सूत्र व भस्म प्रसाद रवाना',
      timeEn: 'Yesterday',
      timeMr: 'काल दुपारी',
      messageEn: 'Consignment IP784920412IN handed over to India Speed Post. Expected delivery today by 3 PM.',
      messageMr: 'स्पीड पोस्ट ट्रॅकिंग क्र. IP784920412IN द्वारे महाप्रसाद पाठवला आहे. आज दुपारी ३ वाजेपर्यंत वितरण अपेक्षित.',
      unread: false,
      actionModule: 'rituals',
      actionTextEn: 'Track Postal Consignment',
      actionTextMr: 'टपाल ट्रॅक करा',
      icon: 'local_shipping',
    },
    {
      id: 'n4',
      titleEn: 'FY 2024-25 Form 10BE Annual Certificate Generated',
      titleMr: 'आर्थिक वर्ष २०२४-२५ Form 10BE प्रमाणपत्र तयार',
      timeEn: '2 days ago',
      timeMr: '२ दिवसांपूर्वी',
      messageEn: 'Your 80G tax deduction annual certificate is ready for download with IT Dept ARN: 2425-CVPT-9981-BE.',
      messageMr: 'आपले वार्षिक ८०-जी आयकर करसवलत Form 10BE प्रमाणपत्र संच तयार आहे (ARN: 2425-CVPT-9981-BE).',
      unread: false,
      actionModule: 'donations',
      actionTextEn: 'Download Form 10BE',
      actionTextMr: '८०-जी संच पहा',
      icon: 'receipt_long',
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast(
      language === 'en'
        ? 'All notifications marked as read'
        : 'सर्व सूचना वाचल्या म्हणून चिन्हांकित केल्या',
      'info'
    );
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
            {language === 'en'
              ? 'Devotee Sanctum Notifications & Alerts'
              : language === 'hi'
              ? 'भक्त सूचनाएं एवं संदेश'
              : language === 'gu'
              ? 'ભક્ત સૂચનાઓ અને સંદેશાઓ'
              : 'सूचना व संदेश (Devotee Notifications)'}
          </h1>
          <p className="text-xs sm:text-sm text-[#584141]">
            {language === 'en'
              ? 'Live ritual broadcasts, upcoming consultations, and tax receipt alerts.'
              : 'यज्ञ सत्रे, परामर्श वेळा, आणि पावती संदर्भातील थेट संदेश.'}
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="text-xs font-bold text-[#570013] hover:underline cursor-pointer self-start sm:self-auto"
        >
          {language === 'en' ? 'Mark all as read' : 'सर्व वाचले म्हणून चिन्हांकित करा'}
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              n.unread
                ? 'bg-white border-[#765B00]/40 shadow-xs'
                : 'bg-[#FFF0ED]/60 border-[#E0BFBF]/30 opacity-90'
            }`}
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                  n.unread ? 'bg-[#570013] text-white' : 'bg-[#FFF0ED] text-[#765B00]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{n.icon}</span>
              </div>
              <div className="flex flex-col min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-[#221918]">
                    {language === 'en' ? n.titleEn : n.titleMr}
                  </span>
                  {n.unread && (
                    <span className="px-1.5 py-0.5 rounded bg-[#BA1A1A] text-white text-[10px] font-bold">
                      {language === 'en' ? 'NEW' : 'नवीन'}
                    </span>
                  )}
                  <span className="text-[11px] text-[#584141] opacity-75">
                    • {language === 'en' ? n.timeEn : n.timeMr}
                  </span>
                </div>
                <p className="text-xs text-[#584141] leading-relaxed">
                  {language === 'en' ? n.messageEn : n.messageMr}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateModule(n.actionModule)}
              className="px-3.5 py-2 rounded-lg bg-[#FFF0ED] text-[#570013] text-xs font-bold hover:bg-[#FCEAE6] transition-colors shrink-0 self-end sm:self-auto cursor-pointer"
            >
              {language === 'en' ? n.actionTextEn : n.actionTextMr}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
