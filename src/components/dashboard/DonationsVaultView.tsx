import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { TaxReceipt } from '../../types/index.ts';
import { Modal } from '../common/Modal.tsx';

export const DonationsVaultView: React.FC = () => {
  const { receipts, addReceipt, showToast } = useDevotee();
  const { language, t } = useLanguage();
  const [selectedFy, setSelectedFy] = useState('2024-25');
  const [selectedSevaCategory, setSelectedSevaCategory] = useState('all');

  // New Seva Contribution form state
  const [customAmount, setCustomAmount] = useState<number>(5100);
  const [sevaPurpose, setSevaPurpose] = useState<string>('रुद्राभिषेक, शांतिपाठ व नित्य गोसेवा');
  const [isPanAttached, setIsPanAttached] = useState<boolean>(true);

  // Active Receipt Modal
  const [selectedReceipt, setSelectedReceipt] = useState<TaxReceipt | null>(null);

  const presets = [
    { amount: 2500, label: 'मासिक दत्तक', title: '१ महिना वेद विद्यार्थी दत्तक' },
    { amount: 5100, label: 'अभिषेक व गोसेवा', title: 'एकादशी अभिषेक व नित्य गोgrass' },
    { amount: 11000, label: 'अन्नदान सेवा', title: 'एक दिवस संपूर्ण गुरुकुल अन्नदान' },
    { amount: 21000, label: 'महा अनुष्ठान', title: 'विशेष ऋग्वेद स्वाध्याय अनुष्ठान' },
  ];

  const filteredReceipts = receipts.filter((r) => {
    if (selectedFy !== 'all' && r.fy !== selectedFy) return false;
    if (selectedSevaCategory !== 'all' && r.category !== selectedSevaCategory) return false;
    return true;
  });

  const totalFilteredAmount = filteredReceipts.reduce((acc, curr) => acc + curr.amount, 0);

  const handleSelectPreset = (amount: number, purpose: string) => {
    setCustomAmount(amount);
    setSevaPurpose(purpose);
  };

  const handlePaymentInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAmount <= 0) {
      showToast('कृपया योग्य समर्पण रक्कम प्रविष्ट करा.', 'error');
      return;
    }

    const newReceiptNo = `#CVP-2025-0${Math.floor(100 + Math.random() * 900)}`;
    const newReceipt: TaxReceipt = {
      receiptNo: newReceiptNo,
      date: 'आज, ' + new Date().toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      dateIso: new Date().toISOString(),
      purpose: sevaPurpose,
      purposeMr: sevaPurpose,
      mode: 'UPI / Direct Gateway',
      amount: customAmount,
      status: '८०-जी जारी (Verified)',
      fy: '2024-25',
      category: 'anushthan',
      donorName: 'श्री राजेश शांताराम कुळकर्णी',
      donorPan: isPanAttached ? 'ABCDE****F' : 'पॅन संलग्न नाही',
    };

    addReceipt(newReceipt);
    showToast(`समर्पण यशस्वी! पावती ${newReceiptNo} तयार करण्यात आली.`, 'success');
  };

  const handleDownloadForm10BE = () => {
    showToast(
      'केंद्रीय प्रत्यक्ष कर मंडळ (CBDT) Form 10BE अधिकृत प्रमाणपत्र PDF डाउनलोड केली जात आहे (ARN: 2425-CVPT-9981-BE).',
      'success'
    );
  };

  const handleCopyVPA = () => {
    navigator.clipboard.writeText('chaitanyaved@sbi');
    showToast('UPI VPA copied: chaitanyaved@sbi', 'info');
  };

  const handleExportCSV = () => {
    showToast('सर्व ८०-जी पावत्यांचा अहवाल (FY 2024-25) CSV स्वरूपात डाउनलोड केला जात आहे.', 'info');
  };

  const handleEmailReceipt = (receiptNo: string) => {
    showToast(
      `पावती ${receiptNo} भक्त कुळकर्णी यांच्या ईमेलवर (rajesh.kulkarni@gmail.com) पाठवली आहे.`,
      'success'
    );
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Breadcrumb & Action Header Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
        <div className="space-y-1">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#584141] mb-1">
            <span className="material-symbols-outlined text-sm leading-none text-[#765B00]">temple_hindu</span>
            <span>{t('devoteeSanctum')}</span>
            <span className="text-[#E0BFBF]">/</span>
            <span className="text-[#570013] font-semibold">
              {language === 'en' ? '80G Tax Exemption Receipts Vault' : '८०-जी करसवलत व धर्मदाय पावती संच (80G Tax Vault)'}
            </span>
          </nav>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold tracking-tight">
            {language === 'en'
              ? '80G Tax Exemption Receipts Vault'
              : language === 'hi'
              ? '80G धर्मार्थ रसीदें एवं सेवा संचय'
              : language === 'gu'
              ? '૮૦-જી ધર્માદા પાવતી અને સેવા સંચય'
              : '८०-जी धर्मदाय पावत्या व सेवा संच'}
          </h1>
          <p className="text-xs sm:text-sm text-[#584141] flex flex-wrap items-center gap-2">
            <span>{language === 'en' ? '100% Tax Deductible under Income Tax Act Sec 80G' : 'आयकर कलम ८०-जी अन्वये १००% करसवलत पात्र'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#765B00]"></span>
            <span>Regd. Public Trust: F/49210 (Pune)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#765B00]"></span>
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#FFD979]/40 text-[#795D00] px-2 py-0.5 rounded font-bold font-mono">
              <span className="material-symbols-outlined text-xs">verified</span>
              PAN: AAATC49210F
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={handleDownloadForm10BE}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E0BFBF]/40 text-[#570013] hover:bg-[#FFF0ED] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#765B00]">file_download</span>
            <span>{language === 'en' ? 'Download Form 10BE (PDF)' : 'वार्षिक Form 10BE (PDF)'}</span>
          </button>
          <a
            href="#quick-seva-panel"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#570013] text-white hover:bg-[#800020] text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">volunteer_activism</span>
            <span>{language === 'en' ? '+ New Seva Contribution' : '+ नवीन संकल्प सेवा समर्पण'}</span>
          </a>
        </div>
      </div>

      {/* FY 2024-25 Tax Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Seva */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#E0BFBF]/40 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-[#584141] font-bold uppercase tracking-wider">
              चालू आ.व. २०२४-२५ समर्पण
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#FFF0ED] flex items-center justify-center text-[#570013]">
              <span className="material-symbols-outlined text-base">savings</span>
            </span>
          </div>
          <div className="my-2">
            <div className="font-serif text-3xl font-bold text-[#570013] tracking-tight">₹३६,०००</div>
            <div className="text-xs text-[#584141] mt-0.5">Total Devotional Contribution</div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFDF94] text-[#251A00] text-[10px] font-bold w-fit">
            <span className="material-symbols-outlined text-xs">check_circle</span>
            ८०-जी पात्र (100% Tax Deductible)
          </span>
        </div>

        {/* Metric 2: Estimated Tax Saved */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#E0BFBF]/40 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-[#584141] font-bold uppercase tracking-wider">
              उपलब्ध कर वजावट अंदाज
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#FFF0ED] flex items-center justify-center text-[#765B00]">
              <span className="material-symbols-outlined text-base">calculate</span>
            </span>
          </div>
          <div className="my-2">
            <div className="font-serif text-3xl font-bold text-[#221918] tracking-tight">₹११,१६०</div>
            <div className="text-xs text-[#584141] mt-0.5">Estimated 31.2% Slab Benefit</div>
          </div>
          <div className="flex items-center justify-between text-[#584141] text-[11px]">
            <span>Section 80G(5)(vi)</span>
            <span className="text-[#570013] font-bold">कमाल वजावट लागू</span>
          </div>
        </div>

        {/* Metric 3: Digital Receipts Count */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#E0BFBF]/40 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-[#584141] font-bold uppercase tracking-wider">
              जारी केलेल्या अधिकृत पावत्या
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#FFF0ED] flex items-center justify-center text-[#570013]">
              <span className="material-symbols-outlined text-base">receipt_long</span>
            </span>
          </div>
          <div className="my-2">
            <div className="font-serif text-3xl font-bold text-[#570013] tracking-tight">
              ०४ <span className="text-base font-normal text-[#584141]">पावत्या</span>
            </div>
            <div className="text-xs text-[#584141] mt-0.5">Digitally Signed & Stamped</div>
          </div>
          <div className="flex items-center gap-1.5 text-[#584141] text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#765B00]"></span>
            <span>सर्व पावत्या पॅनशी संलग्न</span>
          </div>
        </div>

        {/* Metric 4: Form 10BE Filing Status */}
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#E0BFBF]/40 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-[#584141] font-bold uppercase tracking-wider">
              आयकर पोर्टल Form 10BE स्थिती
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#FFD979]/40 flex items-center justify-center text-[#795D00]">
              <span className="material-symbols-outlined text-base">security</span>
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-center gap-1 text-[#765B00] text-sm font-bold">
              <span className="material-symbols-outlined text-base">task_alt</span>
              <span>सत्यापित व दाखल</span>
            </div>
            <div className="text-[11px] text-[#584141] font-mono mt-0.5">ARN: 2425-CVPT-9981-BE</div>
          </div>
          <div className="flex items-center justify-between text-[#584141] text-[11px]">
            <span>AIS / 26AS रिफ्लेक्शन</span>
            <span className="text-[#570013] font-bold">होय (Confirmed)</span>
          </div>
        </div>
      </div>

      {/* Form 10BE Instant Annual Certificate Shastric Vault Banner */}
      <div className="relative w-full rounded-2xl bg-gradient-to-r from-[#570013] to-[#800020] text-white p-6 sm:p-8 overflow-hidden shadow-lg">
        {/* Decorative Yantra Line Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full stroke-current" fill="none" strokeWidth="1.5" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90"></circle>
            <polygon points="100,15 180,150 20,150"></polygon>
            <polygon points="100,185 20,50 180,50"></polygon>
            <circle cx="100" cy="100" r="50"></circle>
            <circle cx="100" cy="100" r="25"></circle>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[#FFDF94] text-xs font-bold w-fit">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              <span>केंद्रीय प्रत्यक्ष कर मंडळ (CBDT) मान्यताप्राप्त अधिकृत प्रमाणपत्र</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
              आयकर विवरणपत्रासाठी वार्षिक 'Form 10BE' प्रमाणपत्र
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              आर्थिक वर्ष २०२४-२५ (करनिर्धारण वर्ष २०२५-२६) मध्ये चैतन्य वेद प्रतिष्ठानला अर्पण केलेल्या एकूण ₹३६,००० देणग्यांचे अधिकृत आयकर विवरण प्रमाणपत्र उपलब्ध आहे. हे प्रमाणपत्र थेट ITR-1 / ITR-2 भरताना मान्य आहे.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 border-t border-white/20 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#FFDF94]">person</span>
                <span>यजमान: <strong>श्री राजेश शांताराम कुळकर्णी</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-sm text-[#FFDF94]">badge</span>
                <span>PAN: <strong>ABCDE****F</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#FFDF94]">domain_verification</span>
                <span>ट्रस्ट नोंदणी क्र: <strong>F/49210/Pune</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row xl:flex-col items-start xl:items-end justify-center gap-3 shrink-0">
            <button
              onClick={handleDownloadForm10BE}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FFDF94] text-[#251A00] hover:bg-[#FFD979] transition-all text-xs font-bold shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl leading-none">download_for_offline</span>
              <span>Form 10BE (PDF) डाउनलोड करा</span>
            </button>
            <span className="text-[11px] text-white/80 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#FFDF94]">verified_user</span>
              डिजिटल स्वाक्षरीसह • SHA-256 Verified
            </span>
          </div>
        </div>
      </div>

      {/* Dual Layout: Direct Trust UPI QR & Instant Seva Sankalpa Formulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="quick-seva-panel">
        {/* Left: Direct UPI QR Code & Banking Credentials (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-xs border border-[#E0BFBF]/40 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E0BFBF]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#570013] text-xl">qr_code_2</span>
                <h3 className="font-serif text-base font-bold text-[#221918]">
                  अधिकृत ट्रस्ट थेट UPI QR
                </h3>
              </div>
              <span className="bg-[#FFD979]/40 text-[#795D00] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                झटपट ८०-जी पावती
              </span>
            </div>

            <p className="text-xs text-[#584141] mt-2 mb-4 leading-relaxed">
              कोणत्याही UPI ॲपवरून (GPay, PhonePe, Paytm, BHIM) स्कॅन करून थेट आश्रम खात्यात सेवा समर्पण करा.
            </p>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-4 bg-[#FFF0ED] rounded-xl mb-4 border border-[#E0BFBF]/30">
              <div className="w-48 h-48 bg-white p-3 rounded-lg shadow-xs flex flex-col items-center justify-center relative border border-[#E0BFBF]/20">
                <svg className="w-full h-full" fill="none" viewBox="0 0 100 100">
                  <rect fill="#FFFFFF" height="100" width="100"></rect>
                  {/* Top Left Marker */}
                  <rect fill="#570013" height="26" rx="3" width="26" x="6" y="6"></rect>
                  <rect fill="#FFFFFF" height="16" rx="2" width="16" x="11" y="11"></rect>
                  <rect fill="#570013" height="8" rx="1" width="8" x="15" y="15"></rect>
                  {/* Top Right Marker */}
                  <rect fill="#570013" height="26" rx="3" width="26" x="68" y="6"></rect>
                  <rect fill="#FFFFFF" height="16" rx="2" width="16" x="73" y="11"></rect>
                  <rect fill="#570013" height="8" rx="1" width="8" x="77" y="15"></rect>
                  {/* Bottom Left Marker */}
                  <rect fill="#570013" height="26" rx="3" width="26" x="6" y="68"></rect>
                  <rect fill="#FFFFFF" height="16" rx="2" width="16" x="11" y="73"></rect>
                  <rect fill="#570013" height="8" rx="1" width="8" x="15" y="77"></rect>
                  {/* Data Elements */}
                  <rect fill="#765B00" height="6" width="6" x="38" y="8"></rect>
                  <rect fill="#221918" height="6" width="12" x="48" y="8"></rect>
                  <rect fill="#570013" height="8" width="8" x="38" y="18"></rect>
                  <rect fill="#221918" height="6" width="8" x="52" y="18"></rect>
                  <rect fill="#221918" height="6" width="22" x="38" y="28"></rect>
                  <rect fill="#221918" height="10" width="6" x="8" y="38"></rect>
                  <rect fill="#765B00" height="6" width="8" x="18" y="38"></rect>
                  <rect fill="#221918" height="8" width="8" x="30" y="38"></rect>
                  <rect fill="#570013" height="6" width="16" x="42" y="38"></rect>
                  <rect fill="#221918" height="8" width="8" x="64" y="38"></rect>
                  <rect fill="#765B00" height="6" width="16" x="76" y="38"></rect>
                  <rect fill="#570013" height="8" width="14" x="8" y="52"></rect>
                  <rect fill="#221918" height="6" width="12" x="26" y="50"></rect>
                  <rect fill="#221918" height="12" width="12" x="44" y="48"></rect>
                  <rect fill="#570013" height="10" width="6" x="62" y="50"></rect>
                  <rect fill="#221918" height="6" width="18" x="74" y="48"></rect>
                  <rect fill="#221918" height="6" width="8" x="38" y="68"></rect>
                  <rect fill="#765B00" height="8" width="16" x="50" y="68"></rect>
                  <rect fill="#570013" height="14" width="8" x="70" y="68"></rect>
                  <rect fill="#221918" height="6" width="10" x="82" y="68"></rect>
                  {/* Central Trust Om Emblem */}
                  <circle cx="50" cy="50" fill="#FFFFFF" r="10"></circle>
                  <circle cx="50" cy="50" fill="#570013" r="8"></circle>
                  <text fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" x="50" y="53">
                    ॐ
                  </text>
                </svg>
              </div>

              <div className="mt-2 text-center">
                <span className="text-[11px] text-[#584141] font-medium">अधिकृत UPI VPA ID:</span>
                <div className="flex items-center justify-center gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-[#570013] font-mono select-all">
                    chaitanyaved@sbi
                  </span>
                  <button
                    onClick={handleCopyVPA}
                    className="text-[#584141] hover:text-[#570013] p-1 cursor-pointer"
                    title="Copy VPA"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Transfer Details Box */}
            <div className="p-3 bg-[#FFF0ED] rounded-xl space-y-1.5 text-xs text-[#221918] border border-[#E0BFBF]/30">
              <div className="flex items-center justify-between">
                <span className="text-[#584141]">खाते नाव (A/c Name):</span>
                <span className="font-semibold text-right">Chaitanya Ved Pratishthan Trust</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#584141]">खाते क्र. (Current A/c):</span>
                <span className="font-semibold font-mono">39482019482</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#584141]">IFSC कोड:</span>
                <span className="font-semibold text-[#570013] font-mono">SBIN0001234 (SBI Main Branch)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E0BFBF]/30 flex items-center justify-between text-xs text-[#584141]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#765B00] text-sm">verified</span>
              <span>State Bank of India Corporate Trust</span>
            </span>
            <span className="text-[#570013] font-bold">100% Tax Deductible</span>
          </div>
        </div>

        {/* Right: Instant Seva Selection & Online Contribution (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-xs border border-[#E0BFBF]/40 flex flex-col justify-between space-y-4">
          <form onSubmit={handlePaymentInitiate} className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E0BFBF]/30">
              <div>
                <h3 className="font-serif text-base font-bold text-[#221918]">
                  नवीन संकल्प सेवा समर्पण
                </h3>
                <p className="text-xs text-[#584141] mt-0.5">
                  वेद संवर्धन, गुरुकुल निवासी छात्र व नित्य गोपूजनासाठी आपले योगदान निवडा.
                </p>
              </div>
              <span className="w-9 h-9 rounded-full bg-[#FFD979]/40 flex items-center justify-center text-[#765B00] shrink-0">
                <span className="material-symbols-outlined text-xl">self_improvement</span>
              </span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presets.map((p) => {
                const isSelected = customAmount === p.amount;
                return (
                  <button
                    key={p.amount}
                    type="button"
                    onClick={() => handleSelectPreset(p.amount, p.title)}
                    className={`p-3 rounded-xl text-left flex flex-col justify-between transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#FCEAE6] border-[#570013] ring-1 ring-[#570013]'
                        : 'bg-[#FFF0ED] border-[#E0BFBF]/40 hover:bg-[#F6E4E1]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] text-[#765B00] font-bold uppercase tracking-wider">
                        {p.label}
                      </span>
                      <span
                        className={`material-symbols-outlined text-base ${
                          isSelected ? 'text-[#570013]' : 'text-[#8C7071] opacity-50'
                        }`}
                      >
                        check_circle
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#221918] mt-1 leading-snug">
                      {p.title}
                    </div>
                    <div className="font-serif text-xl font-bold text-[#570013] mt-2">
                      ₹{p.amount.toLocaleString()}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount & Purpose Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#584141] mb-1">
                  समर्पण रक्कम (रुपये):
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-serif font-bold text-sm text-[#570013]">₹</span>
                  <input
                    type="number"
                    min="100"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#FFF8F6] text-[#221918] font-serif text-base font-bold border border-[#E0BFBF]/50 focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#584141] mb-1">
                  सेवा संकल्प उद्देश:
                </label>
                <input
                  type="text"
                  value={sevaPurpose}
                  onChange={(e) => setSevaPurpose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8F6] text-[#221918] text-xs border border-[#E0BFBF]/50 focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                />
              </div>
            </div>

            {/* PAN Card Toggle */}
            <div className="p-3 bg-[#FFF0ED] rounded-xl space-y-1 border border-[#E0BFBF]/30">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPanAttached}
                  onChange={(e) => setIsPanAttached(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#570013] rounded"
                />
                <div className="flex flex-col text-xs">
                  <span className="font-bold text-[#221918]">
                    ८०-जी करसवलतीसाठी माझा पॅन क्रमांक (PAN) संलग्न करा
                  </span>
                  <span className="text-[#584141]">
                    पॅन कार्ड: ABCDE****F (श्री राजेश शांताराम कुळकर्णी) • Form 10BE साठी स्वयंचलित जोडले जाईल.
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E0BFBF]/30">
              <div className="flex items-center gap-1.5 text-xs text-[#584141]">
                <span className="material-symbols-outlined text-[#765B00] text-base">lock</span>
                <span>२५६-बिट सुरक्षित पेमेंट गेटवे (UPI, Cards, NetBanking)</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#570013] text-white hover:bg-[#800020] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>सुरक्षित समर्पण पुढे करा</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Comprehensive 80G Receipt History Table Section */}
      <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-xs border border-[#E0BFBF]/40 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#E0BFBF]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#570013] text-2xl">history_edu</span>
              <h2 className="font-serif text-xl font-bold text-[#221918]">
                पावती इतिहास व तपशीलवार यादी (80G Receipts History)
              </h2>
            </div>
            <p className="text-xs text-[#584141] mt-0.5">
              सर्व पावत्या आयकर विभाग (CBDT) नियमांनुसार डिजिटल स्वाक्षरीसह सुरक्षित संग्रहित आहेत.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0ED] text-xs border border-[#E0BFBF]/40">
              <span className="text-[#584141]">आर्थिक वर्ष:</span>
              <select
                value={selectedFy}
                onChange={(e) => setSelectedFy(e.target.value)}
                className="bg-transparent font-bold text-[#570013] focus:outline-none cursor-pointer"
              >
                <option value="2024-25">FY 2024-25</option>
                <option value="2023-24">FY 2023-24</option>
                <option value="all">सर्व वर्षे (All)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0ED] text-xs border border-[#E0BFBF]/40">
              <span className="text-[#584141]">सेवा:</span>
              <select
                value={selectedSevaCategory}
                onChange={(e) => setSelectedSevaCategory(e.target.value)}
                className="bg-transparent font-bold text-[#570013] focus:outline-none cursor-pointer"
              >
                <option value="all">सर्व सेवा (All)</option>
                <option value="anushthan">अनुष्ठान सेवा</option>
                <option value="gurukul">गुरुकुल दत्तक</option>
                <option value="goseva">गोसेवा व अभिषेक</option>
                <option value="library">ग्रंथालय निधी</option>
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              className="p-2 rounded-xl bg-[#FFF0ED] hover:bg-[#FCEAE6] text-[#221918] transition-colors border border-[#E0BFBF]/40 cursor-pointer"
              title="Export as CSV"
            >
              <span className="material-symbols-outlined text-base">download</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FFF0ED] text-[#584141] font-semibold">
                <th className="py-3 px-4 rounded-l-xl">पावती क्रमांक (Receipt #)</th>
                <th className="py-3 px-3">दिनांक (Date)</th>
                <th className="py-3 px-4">सेवेचे नाव व संकल्प (Seva Purpose)</th>
                <th className="py-3 px-3">भरणा पद्धत (Mode)</th>
                <th className="py-3 px-4 text-right">रक्कम (Amount)</th>
                <th className="py-3 px-3 text-center">८०-जी स्थिती</th>
                <th className="py-3 px-4 rounded-r-xl text-center">कृती (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0BFBF]/20 text-[#221918]">
              {filteredReceipts.map((r) => (
                <tr key={r.receiptNo} className="hover:bg-[#FFF0ED]/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#570013] whitespace-nowrap">
                    {r.receiptNo}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap text-[#584141]">{r.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#221918]">{r.purposeMr}</div>
                    <div className="text-[11px] text-[#584141]">{r.purpose}</div>
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap text-[#584141]">{r.mode}</td>
                  <td className="py-3.5 px-4 text-right font-serif font-bold text-sm text-[#570013] whitespace-nowrap">
                    ₹ {r.amount.toLocaleString()}.००
                  </td>
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFDF94] text-[#251A00] text-[10px] font-bold">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      ८०-जी जारी
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedReceipt(r)}
                        className="p-1.5 rounded-lg text-[#570013] hover:bg-[#FFF0ED] transition-colors cursor-pointer"
                        title="पावती PDF उघडा"
                      >
                        <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                      </button>
                      <button
                        onClick={() => handleEmailReceipt(r.receiptNo)}
                        className="p-1.5 rounded-lg text-[#584141] hover:text-[#570013] hover:bg-[#FFF0ED] transition-colors cursor-pointer"
                        title="ईमेलवर पाठवा"
                      >
                        <span className="material-symbols-outlined text-base">mail</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Summary Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E0BFBF]/30 text-xs text-[#584141]">
          <span>एकूण {filteredReceipts.length} नोंदी दर्शविल्या जात आहेत</span>
          <span>
            चालू पानातील एकूण योग:{' '}
            <strong className="text-[#570013] font-serif text-sm font-bold">
              ₹ {totalFilteredAmount.toLocaleString()}.००
            </strong>
          </span>
        </div>
      </div>

      {/* Statutory Compliance Notice */}
      <div className="p-6 rounded-2xl bg-[#FFF0ED] border border-[#E0BFBF]/40 flex flex-col md:flex-row items-start gap-4 text-xs text-[#584141]">
        <div className="w-10 h-10 rounded-xl bg-white text-[#570013] flex items-center justify-center shrink-0 shadow-2xs">
          <span className="material-symbols-outlined text-xl">policy</span>
        </div>
        <div className="space-y-1 leading-relaxed">
          <h3 className="font-serif text-sm font-bold text-[#570013]">
            ८०-जी आयकर सवलत व वैधानिक पारदर्शकता नियम (Statutory Compliance Notice)
          </h3>
          <p>
            चैतन्य वेद प्रतिष्ठान हे मुंबई सार्वजनिक विश्वस्त व्यवस्था अधिनियम १९५० (Bombay Public Trusts Act, 1950) अंतर्गत नोंदणीकृत धर्मादाय न्यास आहे (नोंदणी क्र. F/49210/पुणे). न्यासाला भारतीय आयकर कायदा १९६१ च्या कलम ८०-जी (५)(vi) अन्वये करसवलत प्रमाणपत्र प्राप्त आहे. पॅन क्रमांक नोंदवलेल्या सर्व देणगीदारांच्या पावत्या केंद्रीय प्रत्यक्ष कर मंडळ (CBDT) कडे फॉर्म १०-बीई (Form 10BE) मध्ये विहित मुदतीत दाखल केल्या जातात.
          </p>
          <p className="text-[11px] text-[#765B00] pt-1">
            आश्रम लेखा विभाग (Ashram Accounts Desk): +९१ ९८२२० ५४३२१ • ईमेल: accounts@chaitanyaved.org
          </p>
        </div>
      </div>

      {/* Receipt Modal Replica */}
      {selectedReceipt && (
        <Modal
          isOpen={Boolean(selectedReceipt)}
          onClose={() => setSelectedReceipt(null)}
          title="अधिकृत ८०-जी धर्मदाय पावती"
          subtitle="Tax Exemption Certificate under Section 80G(5)(vi)"
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="text-center pb-3 border-b border-[#E0BFBF]/30 space-y-0.5">
              <div className="font-serif text-xl font-bold text-[#570013]">
                चैतन्य वेद प्रतिष्ठान
              </div>
              <div className="text-[11px] text-[#584141]">
                Regd. Public Charitable Trust F/49210 (Pune) • 80G Approval #AAATC49210F20214
              </div>
              <div className="text-xs text-[#765B00] font-semibold">
                वेद अध्ययन, स्वाध्याय व गुरुकुल सेवा न्यास
              </div>
            </div>

            <div className="bg-[#FFF0ED] p-4 rounded-xl space-y-2 text-xs border border-[#E0BFBF]/30">
              <div className="flex justify-between">
                <span className="text-[#584141]">पावती क्र (Receipt No):</span>
                <span className="font-mono font-bold text-[#570013]">{selectedReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#584141]">दिनांक (Date):</span>
                <span className="font-semibold text-[#221918]">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#584141]">देणगीदार (Donor Name):</span>
                <span className="font-bold text-[#221918]">{selectedReceipt.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#584141]">पॅन (Donor PAN):</span>
                <span className="font-bold text-[#221918] font-mono">{selectedReceipt.donorPan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#584141]">सेवा संकल्प (Seva Purpose):</span>
                <span className="font-bold text-[#570013]">{selectedReceipt.purposeMr}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E0BFBF]/40 text-sm font-bold">
                <span>समर्पण रक्कम (Amount):</span>
                <span className="text-[#570013] font-serif text-lg">
                  ₹ {selectedReceipt.amount.toLocaleString()}.००
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#FFDF94]/30 rounded-xl text-xs text-[#251A00] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#765B00] text-lg">verified</span>
              <div>
                <strong>डिजिटल स्वाक्षरी केलेले अधिकृत दस्तऐवज:</strong> हे पावती दस्तऐवज आयकर कलम ८०-जी अन्वये १००% कर वजावटीसाठी अधिकृत आहे.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E0BFBF]/30">
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 rounded-lg bg-[#FFF0ED] text-[#221918] text-xs font-semibold"
              >
                बंद करा
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('अधिकृत पावती PDF डाउनलोड झाली', 'success');
                  setSelectedReceipt(null);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>PDF डाउनलोड करा</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
