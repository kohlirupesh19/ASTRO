import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

interface DonateViewProps {
  onNavigate: (path: string) => void;
}

export const DonateView: React.FC<DonateViewProps> = ({ onNavigate }) => {
  const { showToast, addReceipt } = useDevotee();
  const { language, t } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState<number>(3000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [selectedSeva, setSelectedSeva] = useState('वेद विद्यार्थी दत्तक योजना (Vidyarthi Adoption)');

  const sevaPresets = [
    { amount: 1500, label: 'नित्य गो grass सेवा (Gau Seva)' },
    { amount: 3000, label: '१ महिना वेद बटू दत्तक (Student Monthly)' },
    { amount: 11000, label: '१ दिवस गुरुकुल अन्नदान (Annadanam)' },
    { amount: 36000, label: '१ वर्ष संपूर्ण विद्यार्थी दत्तक (Annual Full)' },
  ];

  const handleCopyVpa = () => {
    navigator.clipboard.writeText('chaitanyaved@sbi');
    showToast('UPI VPA copied: chaitanyaved@sbi', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : selectedAmount;
    if (finalAmount <= 0) {
      showToast('कृपया योग्य समर्पण रक्कम प्रविष्ट करा', 'error');
      return;
    }

    const receiptNo = `#CVP-2025-0${Math.floor(100 + Math.random() * 900)}`;
    addReceipt({
      receiptNo,
      date: 'आज, ' + new Date().toLocaleDateString('mr-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      dateIso: new Date().toISOString(),
      purpose: selectedSeva,
      purposeMr: selectedSeva,
      mode: 'Online UPI Gateway',
      amount: finalAmount,
      status: '८०-जी जारी (Verified)',
      fy: '2024-25',
      category: 'gurukul',
      donorName: donorName || 'धर्मप्रेमी यजमान',
      donorPan: donorPan || 'पॅन संलग्न नाही',
    });

    showToast(`समर्पण यशस्वी! पावती ${receiptNo} जारी झाली. भक्त कक्षात उपलब्ध आहे.`, 'success');
  };

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
          <span className="text-[#570013] font-semibold">Donations & 80G Seva (८०-जी करसवलत देणगी)</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 lg:px-12 py-12 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD979]/40 text-[#795D00] text-xs font-bold uppercase tracking-wider">
            ॥ परोपकाराय पुण्याय ॥ • 100% Tax Deductible under 80G
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#570013] font-bold tracking-tight">
            Support Vedic Preservation & Gurukul Vidyarthis
            <span className="block font-serif text-xl sm:text-2xl text-[#765B00] font-medium mt-1">
              वेद संवर्धन, गुरुकुल छात्र दत्तक व गोसेवा समर्पण
            </span>
          </h1>
          <p className="text-sm text-[#584141] leading-relaxed">
            All donations made to Chaitanya Ved Pratishthan (Regd. Public Charitable Trust F/49210/Pune) are 100% tax-deductible under Section 80G(5)(vi) of the Income Tax Act. Instant digitally signed receipts are issued and filed under Form 10BE with CBDT.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-[#E0BFBF]/40 space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#570013] border-b border-[#E0BFBF]/30 pb-3">
              ऑनलाइन सेवा समर्पण (Contribute Online)
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#221918] block uppercase">
                  १. सेवा योजना निवडा (Choose Seva Intent)
                </label>
                <select
                  value={selectedSeva}
                  onChange={(e) => setSelectedSeva(e.target.value)}
                  className="w-full bg-[#FFF8F6] p-2.5 rounded-lg border border-[#E0BFBF]/50 text-[#221918] text-xs focus:outline-none"
                >
                  <option>वेद विद्यार्थी दत्तक योजना (Vidyarthi Adoption)</option>
                  <option>नित्य गो grass व गोशाळा सेवा (Gau Seva)</option>
                  <option>गुरुकुल अन्नछत्र व प्रसाद सेवा (Annadanam)</option>
                  <option>प्राचीन हस्तलिखित जतन व ग्रंथालय निधी (Veda Library)</option>
                  <option>सामान्य आश्रम संवर्धन निधी (General Ashram Corpus)</option>
                </select>
              </div>

              {/* Amount Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#221918] block uppercase">
                  २. समर्पण रक्कम निवडा (Select Amount)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {sevaPresets.map((p) => {
                    const isSelected = selectedAmount === p.amount && !customAmount;
                    return (
                      <button
                        key={p.amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(p.amount);
                          setCustomAmount('');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#570013] text-white border-transparent shadow-xs'
                            : 'bg-[#FFF0ED] text-[#221918] border-[#E0BFBF]/40 hover:bg-[#FCEAE6]'
                        }`}
                      >
                        <span className="font-serif font-bold text-base block">
                          ₹{p.amount.toLocaleString()}
                        </span>
                        <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-[#FFDF94]' : 'text-[#584141]'}`}>
                          {p.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative pt-2">
                  <span className="absolute left-3 top-4.5 font-bold text-sm text-[#570013]">₹</span>
                  <input
                    type="number"
                    placeholder="इतर ऐच्छिक रक्कम (Other Custom Amount)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-[#FFF8F6] pl-8 pr-3 py-2.5 rounded-lg border border-[#E0BFBF]/50 text-[#221918] text-xs focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                  />
                </div>
              </div>

              {/* Donor Credentials for 80G */}
              <div className="space-y-3 pt-2 border-t border-[#E0BFBF]/30">
                <span className="text-xs font-bold text-[#570013] block uppercase">
                  ३. करसवलतीसाठी देणगीदार तपशील (Donor PAN Details)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#584141] block mb-1">
                      देणगीदाराचे पूर्ण नाव (As on PAN) *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="उदा. राजेश शांताराम कुळकर्णी"
                      className="w-full bg-[#FFF8F6] p-2 rounded-lg border border-[#E0BFBF]/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#584141] block mb-1">
                      पॅन क्रमांक (PAN for Form 10BE) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="w-full bg-[#FFF8F6] p-2 rounded-lg border border-[#E0BFBF]/50 uppercase font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#584141] block mb-1">
                    भ्रमणध्वनी (पावती SMS व WhatsApp साठी)
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-[#FFF8F6] p-2 rounded-lg border border-[#E0BFBF]/50 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">lock</span>
                <span>सुरक्षित समर्पण करा (Pay & Generate 80G Receipt)</span>
              </button>
            </form>
          </div>

          {/* Right Direct Banking & QR (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E0BFBF]/40 space-y-4 text-center">
              <span className="text-xs font-bold text-[#765B00] uppercase tracking-wider block">
                थेट ट्रस्ट बँक खात्यात भरणा
              </span>
              <h3 className="font-serif text-lg font-bold text-[#570013]">
                State Bank of India Corporate Account
              </h3>

              <div className="w-44 h-44 mx-auto bg-[#FFF0ED] p-3 rounded-xl border border-[#E0BFBF]/40 flex items-center justify-center">
                <svg className="w-full h-full" fill="none" viewBox="0 0 100 100">
                  <rect fill="#FFFFFF" height="100" width="100"></rect>
                  <rect fill="#570013" height="26" rx="3" width="26" x="6" y="6"></rect>
                  <rect fill="#FFFFFF" height="16" rx="2" width="16" x="11" y="11"></rect>
                  <rect fill="#570013" height="8" rx="1" width="8" x="15" y="15"></rect>
                  <rect fill="#570013" height="26" rx="3" width="26" x="68" y="6"></rect>
                  <rect fill="#FFFFFF" height="16" rx="2" width="16" x="73" y="11"></rect>
                  <rect fill="#570013" height="8" rx="1" width="8" x="77" y="15"></rect>
                  <rect fill="#570013" height="26" rx="3" width="26" x="6" y="68"></rect>
                  <rect fill="#FFFFFF" height="16" rx="2" width="16" x="11" y="73"></rect>
                  <rect fill="#570013" height="8" rx="1" width="8" x="15" y="77"></rect>
                  <rect fill="#765B00" height="6" width="6" x="38" y="8"></rect>
                  <rect fill="#221918" height="6" width="12" x="48" y="8"></rect>
                  <rect fill="#570013" height="8" width="8" x="38" y="18"></rect>
                  <circle cx="50" cy="50" fill="#570013" r="8"></circle>
                  <text fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" x="50" y="53">ॐ</text>
                </svg>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs">
                <span className="font-mono font-bold text-[#570013]">chaitanyaved@sbi</span>
                <button
                  onClick={handleCopyVpa}
                  className="p-1 hover:text-[#570013] text-[#584141] cursor-pointer"
                  title="Copy UPI VPA"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF0ED] text-left text-xs space-y-1 border border-[#E0BFBF]/30">
                <div className="flex justify-between">
                  <span className="text-[#584141]">Account Name:</span>
                  <span className="font-semibold text-right">Chaitanya Ved Pratishthan Trust</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-[#584141]">Account No:</span>
                  <span className="font-bold text-[#221918]">39482019482 (Current A/c)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-[#584141]">IFSC Code:</span>
                  <span className="font-bold text-[#570013]">SBIN0001234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#584141]">Branch:</span>
                  <span>SBI Main Branch, Pune</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#E0BFBF]/40 text-xs text-[#584141] space-y-2">
              <span className="font-bold text-[#570013] block">८०-जी आयकर पावती कशी मिळवाल?</span>
              <p className="leading-relaxed">
                NEFT/RTGS किंवा UPI ने रक्कम पाठवल्यानंतर त्याचा UTR संदर्भ क्रमांक आणि आपले नाव <a href="mailto:accounts@chaitanyaved.org" className="text-[#570013] font-semibold underline">accounts@chaitanyaved.org</a> वर ईमेल करा. २४ तासांत डिजिटल स्वाक्षरीसह पावती पाठवली जाईल.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
