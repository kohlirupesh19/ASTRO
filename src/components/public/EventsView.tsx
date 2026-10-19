import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { Modal } from '../common/Modal.tsx';

interface EventsViewProps {
  onNavigate: (path: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onNavigate }) => {
  const { showToast } = useDevotee();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [devoteeName, setDevoteeName] = useState('');
  const [devoteePhone, setDevoteePhone] = useState('');
  const [attendeeCount, setAttendeeCount] = useState(2);

  const events = [
    {
      id: 'event-1',
      dateDay: '०४',
      dateMonth: 'जून',
      title: 'निर्जला एकादशी सामूहिक विष्णुसहस्रनाम पारायण',
      subtitle: 'Nirjala Ekadashi Collective Vishnu Sahasranama Chanting',
      time: 'सायंकाळी ०५:३० ते ०८:०० IST',
      location: 'यज्ञाश्रम मुख्य सभागृह, वेद भवन, पुणे',
      category: 'सामूहिक जप व पारायण',
      status: 'Passes Available',
      desc: '१००१ भक्त एकत्र बसून भगवान विष्णूच्या सहस्र नामांचा सस्वर उच्चार करतील. तुळशीपत्र व तीर्थप्रसाद वाटप.',
    },
    {
      id: 'event-2',
      dateDay: '२१',
      dateMonth: 'जून',
      title: 'सूर्य संक्रांति महा रुद्राभिषेक व सौर होम',
      subtitle: 'Surya Sankranti Maha Rudrabhishek & Saura Havan',
      time: 'सकाळी ०७:०० ते १०:३० IST',
      location: 'आश्रम प्रांगण • थेट प्रक्षेपण उपलब्ध (1080p)',
      category: 'महायज्ञ व होम',
      status: 'Live Stream & In-person',
      desc: 'सूर्य ग्रहाच्या संक्रमण दिनी आरोग्य व तेज वृद्धीसाठी विशेष आदित्यहृदय स्तोत्र संपुटित रुद्राभिषेक.',
    },
    {
      id: 'event-3',
      dateDay: '०६',
      dateMonth: 'जुलै',
      title: 'आषाढ शुद्ध एकादशी पंढरपूर वारी महाप्रसाद व कीर्तन',
      subtitle: 'Ashadh Ekadashi Wari Mahaprasad & Kirtan',
      time: 'दुपारी १२:०० ते ०४:०० IST',
      location: 'अन्नछत्र सभागृह, पौड रोड संकुल',
      category: 'अन्नदान व कीर्तन',
      status: 'Open to All',
      desc: 'वारकरी भक्तांसाठी मोफत सात्त्विक भोजन व्यवस्था व ज्येष्ठ कीर्तनकारांचे शास्त्रोक्त प्रवचन.',
    },
    {
      id: 'event-4',
      dateDay: '०४',
      dateMonth: 'ऑगस्ट',
      title: 'श्रावण सोमवार महारुद्र अभिषेक अनुष्ठान',
      subtitle: 'Shravan Somvar Maharudra Abhishek Series',
      time: 'सकाळी ०६:०० ते दुपारी ०१:०० IST',
      location: 'वेदमंदिर शिव गर्भगृह',
      category: 'श्रावण विशेष',
      status: 'Sankalpa Booking Open',
      desc: 'श्रावणातील पहिल्या सोमवारी ११००० बिल्वपत्र व पंचामृत अभिषेकासह महारुद्र महायज्ञ संपन्न होईल.',
    },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      `आपला ई-पास (${selectedEvent}) साठी यशस्वीरित्या आरक्षित झाला आहे! SMS पाठवला आहे.`,
      'success'
    );
    setSelectedEvent(null);
    setDevoteeName('');
    setDevoteePhone('');
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
          <span className="text-[#570013] font-semibold">Events & Satsang (आश्रम उपक्रम व दिनदर्शिका)</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 lg:px-12 py-12 space-y-10">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs text-[#765B00] font-bold uppercase tracking-wider">
            Satsang & Spiritual Calendar 2025
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#570013] font-bold tracking-tight">
            Upcoming Ashram Events & Religious Gatherings
            <span className="block font-serif text-xl sm:text-2xl text-[#765B00] font-medium mt-1">
              आगामी धार्मिक उपक्रम व व्याख्यानमाला
            </span>
          </h1>
          <p className="text-sm text-[#584141]">
            Participate in communal Vedic chanting, sacred ekadashi observances, and philosophical discourses at our Pune campus or through global live broadcasts.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-xl p-6 shadow-xs border border-[#E0BFBF]/40 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-[#570013] text-white shrink-0 shadow-xs">
                      <span className="font-serif text-xl font-bold leading-none">{ev.dateDay}</span>
                      <span className="text-[11px] font-semibold opacity-90 mt-1">{ev.dateMonth}</span>
                    </div>
                    <div>
                      <span className="text-[11px] bg-[#FFD979]/40 text-[#795D00] px-2 py-0.5 rounded font-bold">
                        {ev.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#570013] mt-1 leading-snug">
                        {ev.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#584141] leading-relaxed">
                  {ev.desc}
                </p>

                <div className="bg-[#FFF0ED] p-3 rounded-lg text-xs text-[#584141] space-y-1">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-[#765B00]">schedule</span>
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#765B00]">location_on</span>
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E0BFBF]/30 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#765B00]">{ev.status}</span>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(ev.title)}
                  className="px-4 py-2 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">confirmation_number</span>
                  <span>ई-पास आरक्षित करा (Reserve Pass)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RSVP Modal */}
      <Modal
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        title="Event Pass Registration"
        subtitle={selectedEvent || ''}
        maxWidth="md"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#221918] font-bold mb-1">
              Devotee Full Name *
            </label>
            <input
              type="text"
              required
              value={devoteeName}
              onChange={(e) => setDevoteeName(e.target.value)}
              placeholder="उदा. श्री राहुल कुलकर्णी"
              className="w-full px-3 py-2 rounded-lg bg-[#FFF8F6] text-[#221918] text-sm border border-[#E0BFBF]/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#221918] font-bold mb-1">
              WhatsApp Mobile Number *
            </label>
            <input
              type="tel"
              required
              value={devoteePhone}
              onChange={(e) => setDevoteePhone(e.target.value)}
              placeholder="+91 98XXX XXXXX"
              className="w-full px-3 py-2 rounded-lg bg-[#FFF8F6] text-[#221918] text-sm border border-[#E0BFBF]/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#221918] font-bold mb-1">
              Number of Attendees (उपस्थित व्यक्ती संख्या)
            </label>
            <select
              value={attendeeCount}
              onChange={(e) => setAttendeeCount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-[#FFF8F6] text-[#221918] text-sm border border-[#E0BFBF]/50 focus:outline-none"
            >
              <option value={1}>1 व्यक्ती (Individual)</option>
              <option value={2}>2 व्यक्ती (Couple)</option>
              <option value={4}>4 व्यक्ती (Family Pass)</option>
              <option value={6}>6 व्यक्ती (Group)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="px-4 py-2 rounded-lg bg-[#FFF0ED] text-[#221918] text-xs font-semibold hover:bg-[#FCEAE6]"
            >
              रद्द करा
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs"
            >
              ई-पास निश्चित करा (Confirm Pass)
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
