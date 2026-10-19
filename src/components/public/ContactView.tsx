import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

interface ContactViewProps {
  onNavigate: (path: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const { showToast } = useDevotee();
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Pooja & Havan Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('कृपया सर्व आवश्यक माहिती भरा (Please fill all required fields)', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('आपला संदेश आश्रम समन्वय कक्षाला प्राप्त झाला आहे. आम्ही २४ तासांत संपर्क करू.', 'success');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 600);
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
          <span className="text-[#570013] font-semibold">Contact (संपर्क व मार्गदर्शन केंद्र)</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 lg:px-12 py-12 space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs text-[#765B00] font-bold uppercase tracking-wider">
            Ashram Seva Desk & Helplines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#570013] font-bold tracking-tight">
            Connect with Chaitanya Ved Pratishthan
            <span className="block font-serif text-xl sm:text-2xl text-[#765B00] font-medium mt-1">
              आश्रम संपर्क व मार्गदर्शन केंद्र
            </span>
          </h1>
          <p className="text-sm text-[#584141]">
            Reach out to our ritual coordinators, astrologers, or Gurukul administration for bookings, muhurta inquiries, or donation assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Particulars (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#570013] border-b border-[#E0BFBF]/30 pb-3">
              Central Ashram Coordinates
            </h3>

            <div className="space-y-4 text-xs text-[#221918]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-lg text-[#765B00] mt-0.5 shrink-0">
                  location_on
                </span>
                <div>
                  <span className="font-bold text-[#570013] block">Central Ashram Campus</span>
                  <p className="text-[#584141] mt-0.5 leading-relaxed">
                    Ved Bhavan, Maharshi Vidya Nagar, Paud Road, Kothrud, Pune, Maharashtra 411038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-lg text-[#765B00] mt-0.5 shrink-0">
                  schedule
                </span>
                <div>
                  <span className="font-bold text-[#570013] block">Consultation Timings</span>
                  <p className="text-[#584141] mt-0.5">
                    Monday to Sunday: 09:00 AM – 06:00 PM (IST)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-lg text-[#765B00] mt-0.5 shrink-0">
                  call
                </span>
                <div>
                  <span className="font-bold text-[#570013] block">Helpline & WhatsApp</span>
                  <a href="tel:+919822054321" className="text-[#765B00] font-bold hover:underline block">
                    +91 98220 54321
                  </a>
                  <span className="text-[#584141]">Office: 020 2543 8921</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-lg text-[#765B00] mt-0.5 shrink-0">
                  mail
                </span>
                <div>
                  <span className="font-bold text-[#570013] block">Electronic Mail</span>
                  <a href="mailto:seva@chaitanyaved.org" className="text-[#570013] hover:underline block">
                    seva@chaitanyaved.org
                  </a>
                  <a href="mailto:accounts@chaitanyaved.org" className="text-[#584141] hover:underline block">
                    accounts@chaitanyaved.org (80G Tax Inquiries)
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FFF0ED] rounded-xl border border-[#E0BFBF]/40 space-y-2">
              <span className="text-xs font-bold text-[#765B00] block uppercase tracking-wider">
                Direct WhatsApp Support
              </span>
              <p className="text-xs text-[#584141]">
                Quick questions regarding Sankalpa dates or Puja samagri can be sent directly to our coordinator.
              </p>
              <a
                href="https://wa.me/919822054321"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded text-xs font-bold shadow-xs hover:opacity-90"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#570013] border-b border-[#E0BFBF]/30 pb-3">
              Send an Online Inquiry (चौकशी अर्ज)
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#221918] block">
                    Full Name (पूर्ण नाव) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. श्री राहुल देशपांडे"
                    className="w-full bg-[#FFF8F6] px-3 py-2 text-sm text-[#221918] rounded-lg border border-[#E0BFBF]/50 focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#221918] block">
                    Phone Number (भ्रमणध्वनी) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-[#FFF8F6] px-3 py-2 text-sm text-[#221918] rounded-lg border border-[#E0BFBF]/50 focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#221918] block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#FFF8F6] px-3 py-2 text-sm text-[#221918] rounded-lg border border-[#E0BFBF]/50 focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#221918] block">
                    Subject / Domain
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#FFF8F6] px-3 py-2 text-sm text-[#221918] rounded-lg border border-[#E0BFBF]/50 focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                  >
                    <option>Pooja & Havan Enquiry</option>
                    <option>Jyotish Kundali Consultation</option>
                    <option>Gurukul Admission & Courses</option>
                    <option>Vidyarthi Dattak Yojana (Donations)</option>
                    <option>80G Tax Exemption Receipt</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[#221918] block">
                  Your Message or Inquiry Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="आपला प्रश्न किंवा अपेक्षित पूजेचा दिनांक येथे नमूद करावा..."
                  className="w-full bg-[#FFF8F6] p-3 text-sm text-[#221918] rounded-lg border border-[#E0BFBF]/50 focus:outline-none focus:ring-2 focus:ring-[#765B00] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSubmitting ? 'sync' : 'send'}
                </span>
                <span>{isSubmitting ? 'संदेश पाठवत आहे...' : 'संदेश सादर करा (Send Message)'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
