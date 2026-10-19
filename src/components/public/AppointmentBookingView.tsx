import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { ServiceDomain, ConsultationMode } from '../../types/index.ts';

interface AppointmentBookingViewProps {
  onNavigate: (path: string) => void;
  initialServiceId?: string;
}

export const AppointmentBookingView: React.FC<AppointmentBookingViewProps> = ({
  onNavigate,
  initialServiceId,
}) => {
  const { showToast } = useDevotee();

  const [serviceDomain, setServiceDomain] = useState<ServiceDomain>(
    initialServiceId ? 'pooja' : 'jyotish'
  );
  const [consultationMode, setConsultationMode] = useState<ConsultationMode>('online');
  const [selectedDate, setSelectedDate] = useState<string>('Tue, 20 May 2025');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:45 AM - 11:30 AM');

  // Devotee info form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [notes, setNotes] = useState('');

  // Confirmation slip state
  const [confirmedSlip, setConfirmedSlip] = useState<{
    id: string;
    name: string;
    service: string;
    slot: string;
    mode: string;
  } | null>(null);

  const availableDays = [
    { day: 'Mon', date: '19', slots: '4 slots', isAvailable: true, fullDate: 'Mon, 19 May 2025' },
    { day: 'Tue', date: '20', slots: '6 slots', isAvailable: true, fullDate: 'Tue, 20 May 2025' },
    { day: 'Wed', date: '21', slots: '2 slots', isAvailable: true, fullDate: 'Wed, 21 May 2025' },
    { day: 'Thu', date: '22', slots: '5 slots', isAvailable: true, fullDate: 'Thu, 22 May 2025' },
    { day: 'Fri', date: '23', slots: '1 slot', isAvailable: true, fullDate: 'Fri, 23 May 2025' },
    { day: 'Sat', date: '24', slots: '3 slots', isAvailable: true, fullDate: 'Sat, 24 May 2025' },
    { day: 'Sun', date: '25', slots: 'Full', isAvailable: false, fullDate: 'Sun, 25 May 2025' },
  ];

  const morningSlots = [
    { time: '10:00 AM - 10:45 AM', label: '10:00 AM', status: 'available' },
    { time: '10:45 AM - 11:30 AM', label: '10:45 AM', status: 'available' },
    { time: '11:45 AM - 12:30 PM', label: '11:45 AM', status: 'available' },
    { time: '12:30 PM - 01:15 PM', label: '12:30 PM', status: 'booked' },
  ];

  const afternoonSlots = [
    { time: '03:15 PM - 04:00 PM', label: '03:15 PM', status: 'available' },
    { time: '04:00 PM - 04:45 PM', label: '04:00 PM', status: 'available' },
    { time: '05:00 PM - 05:45 PM', label: '05:00 PM', status: 'available' },
    { time: '06:00 PM - 06:45 PM', label: '06:00 PM', status: 'available' },
  ];

  const serviceSpecs = {
    jyotish: {
      name: 'Vedic Jyotish Consultation',
      nameMr: 'वैदिक ज्योतिष सल्ला',
      price: '₹ 1,100',
      duration: '45 Mins',
      desc: 'Kundali review, dosha analysis & authentic gemstone guidance.',
    },
    pooja: {
      name: 'Yadnik & Pooja Planning',
      nameMr: 'पूजा व याज्ञिक नियोजन',
      price: 'Margadarshan Seva',
      duration: '30 Mins',
      desc: 'Sankalpa, Muhurta selection & purohit assignment consultation.',
    },
    vastu: {
      name: 'Vastu Shastra Consultation',
      nameMr: 'वास्तु सल्ला व परीक्षण',
      price: '₹ 1,500',
      duration: '45 Mins',
      desc: 'Residential & commercial directional harmony consultation.',
    },
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('कृपया आपले पूर्ण नाव भरा (Please enter full name)', 'error');
      return;
    }
    if (!phone.trim()) {
      showToast('कृपया आपला संपर्क क्रमांक भरा (Please enter phone number)', 'error');
      return;
    }

    const slip = {
      id: `CVP-${new Date().getFullYear()}-0${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      service: serviceSpecs[serviceDomain].name,
      slot: `${selectedDate} • ${selectedSlot}`,
      mode: consultationMode === 'online' ? 'Online Google Meet / Video' : 'In-Person at Pune Ashram',
    };

    setConfirmedSlip(slip);
    showToast('अपॉइंटमेंट तात्पुरती नोंदवली गेली आहे! (Appointment Slip Generated)', 'success');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner / Editorial Vedic Header */}
      <section className="w-full bg-[#FFF0ED] py-10 lg:py-14 border-b border-[#E0BFBF]/30">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#584141] mb-3">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#570013] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-[#E0BFBF]">/</span>
            <span className="text-[#570013] font-semibold">Book Appointment (अपॉइंटमेंट बुकिंग)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FFD979]/40 text-[#795D00] text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px] text-[#765B00]">verified</span>
                <span>वैदिक मार्गदर्शन व शास्त्रोक्त सल्ला केंद्र</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#570013] font-bold tracking-tight">
                Schedule a Consultation or Pooja Planning
                <span className="block text-xl sm:text-2xl text-[#221918] font-semibold mt-1">
                  सल्ला व मार्गदर्शन अपॉइंटमेंट
                </span>
              </h1>
              <p className="text-sm text-[#584141] max-w-2xl pt-1 leading-relaxed">
                Consult with our authentic Vedic astrologers and ritual coordinators. Transparent, personalized, and confidential guidance grounded in traditional texts without fear-mongering.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-xl shadow-xs border border-[#E0BFBF]/30">
                <div className="w-12 h-12 rounded-full bg-[#FFF0ED] flex items-center justify-center shrink-0 text-[#765B00]">
                  <span className="material-symbols-outlined text-2xl">event_available</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#584141] uppercase tracking-wider block font-semibold">
                    Real-time Desk
                  </span>
                  <span className="text-sm font-bold text-[#570013]">Pune Ashram Open</span>
                  <span className="text-xs text-[#765B00] block">Slots refreshed daily at 08:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Flow: Left 65% Form, Right 35% Summary */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column (65% / col-span-8) */}
            <form onSubmit={handleBookingSubmit} className="lg:col-span-8 space-y-6">
              {/* Step 1: Service Type Selection */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#800020] text-white flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <h2 className="text-base sm:text-lg text-[#221918] font-bold">
                      Select Service Domain (विषय निवडा)
                    </h2>
                  </div>
                  <span className="text-xs text-[#765B00] font-semibold uppercase tracking-wider">
                    Step 1 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['jyotish', 'pooja', 'vastu'] as ServiceDomain[]).map((domain) => {
                    const isSelected = serviceDomain === domain;
                    const spec = serviceSpecs[domain];
                    return (
                      <label
                        key={domain}
                        className={`cursor-pointer group relative p-4 rounded-xl border transition-all shadow-xs flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#FCEAE6] border-[#570013] ring-1 ring-[#570013]'
                            : 'bg-white border-[#E0BFBF]/50 hover:bg-[#FFF0ED]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service_type"
                          value={domain}
                          checked={isSelected}
                          onChange={() => setServiceDomain(domain)}
                          className="sr-only"
                        />
                        <div className="flex items-start justify-between">
                          <span
                            className={`material-symbols-outlined text-2xl ${
                              isSelected ? 'text-[#570013]' : 'text-[#765B00]'
                            }`}
                          >
                            {domain === 'jyotish'
                              ? 'brightness_high'
                              : domain === 'pooja'
                              ? 'local_fire_department'
                              : 'domain'}
                          </span>
                          <span
                            className={`w-3.5 h-3.5 rounded-full ring-2 ${
                              isSelected
                                ? 'bg-[#570013] ring-[#FFDADA]'
                                : 'bg-[#E8D6D3] ring-transparent'
                            }`}
                          ></span>
                        </div>
                        <div>
                          <h3 className="font-serif text-sm font-bold text-[#221918]">
                            {spec.name}
                          </h3>
                          <p className="text-xs text-[#765B00] font-semibold mt-0.5">
                            {spec.nameMr}
                          </p>
                          <p className="text-xs text-[#584141] mt-1 line-clamp-2">
                            {spec.desc}
                          </p>
                        </div>
                        <div className="pt-2 text-xs font-semibold flex items-center justify-between border-t border-[#E0BFBF]/30">
                          <span className="text-[#584141]">{spec.duration}</span>
                          <span className="bg-[#570013]/10 px-2 py-0.5 rounded text-[#570013] font-bold">
                            {spec.price}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Mode of Consultation */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#800020] text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <h2 className="text-base sm:text-lg text-[#221918] font-bold">
                      Consultation Mode (मार्ग निवडा)
                    </h2>
                  </div>
                  <span className="text-xs text-[#765B00] font-semibold uppercase tracking-wider">
                    Step 2 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationMode('online')}
                    className={`p-4 rounded-xl text-left transition-all flex items-start gap-3 shadow-xs border cursor-pointer ${
                      consultationMode === 'online'
                        ? 'bg-[#FCEAE6] border-[#570013] ring-1 ring-[#570013]'
                        : 'bg-white border-[#E0BFBF]/50 hover:bg-[#FFF0ED]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#570013]/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#570013] text-xl">videocam</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#570013]">Online Video / Phone</span>
                        <span className="px-1.5 py-0.5 bg-[#FFDF94] text-[#251A00] text-[10px] font-bold rounded">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-[#765B00] font-semibold mt-0.5">
                        व्हिडिओ किंवा फोन कॉल सल्ला
                      </p>
                      <p className="text-xs text-[#584141] mt-1 leading-snug">
                        Join via secure Google Meet link or direct audio call. Digitized Kundali chart shared prior to session.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationMode('ashram')}
                    className={`p-4 rounded-xl text-left transition-all flex items-start gap-3 shadow-xs border cursor-pointer ${
                      consultationMode === 'ashram'
                        ? 'bg-[#FCEAE6] border-[#570013] ring-1 ring-[#570013]'
                        : 'bg-white border-[#E0BFBF]/50 hover:bg-[#FFF0ED]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FFF0ED] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#584141] text-xl">temple_hindu</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#221918]">In-Person at Ashram</span>
                      <p className="text-xs text-[#765B00] font-semibold mt-0.5">
                        आश्रम प्रत्यक्ष भेट (पुणे केंद्र)
                      </p>
                      <p className="text-xs text-[#584141] mt-1 leading-snug">
                        Visit Ved Bhavan, Maharshi Vidya Nagar, Paud Road, Pune. Face-to-face consultation with reverent Acharya.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 3: Date & Real-Time Slot Picker */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#800020] text-white flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <h2 className="text-base sm:text-lg text-[#221918] font-bold">
                      Select Date & Available Slot (दिनांक व वेळ)
                    </h2>
                  </div>
                  <span className="text-xs text-[#765B00] font-semibold uppercase tracking-wider">
                    Step 3 of 4
                  </span>
                </div>

                {/* Day selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#221918] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#570013]">
                        calendar_month
                      </span>
                      <span>Next 7 Available Days (मे / जून २०२५)</span>
                    </span>
                    <span className="text-[#765B00] font-semibold">IST (GMT +5:30)</span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {availableDays.map((dayItem) => {
                      const isSelected = selectedDate === dayItem.fullDate;
                      if (!dayItem.isAvailable) {
                        return (
                          <div
                            key={dayItem.day}
                            className="p-2.5 rounded-lg text-center bg-[#F0DFDB]/50 opacity-40 cursor-not-allowed border border-transparent"
                          >
                            <span className="block text-xs text-[#584141]">{dayItem.day}</span>
                            <span className="block text-base font-bold text-[#221918]">{dayItem.date}</span>
                            <span className="block text-[10px] text-[#8C7071] font-semibold uppercase">
                              {dayItem.slots}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={dayItem.day}
                          type="button"
                          onClick={() => setSelectedDate(dayItem.fullDate)}
                          className={`p-2.5 rounded-lg text-center transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-[#570013] text-white shadow-sm ring-2 ring-[#FFDADA] border-transparent'
                              : 'bg-white hover:bg-[#FFF0ED] text-[#221918] border-[#E0BFBF]/40'
                          }`}
                        >
                          <span
                            className={`block text-xs ${
                              isSelected ? 'text-white/80' : 'text-[#584141]'
                            }`}
                          >
                            {dayItem.day}
                          </span>
                          <span className="block text-base font-bold">{dayItem.date}</span>
                          <span
                            className={`block text-[10px] font-semibold ${
                              isSelected ? 'text-[#FFDF94]' : 'text-[#765B00]'
                            }`}
                          >
                            {dayItem.slots}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Morning Slots */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#221918] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#765B00]">
                        wb_twilight
                      </span>
                      <span>Morning Sessions (सकाळची सत्रे: 10:00 AM – 01:00 PM)</span>
                    </span>
                    <span className="text-[#584141]">45 min each</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {morningSlots.map((slot) => {
                      const isSelected = selectedSlot === slot.time;
                      const isBooked = slot.status === 'booked';

                      if (isBooked) {
                        return (
                          <div
                            key={slot.label}
                            className="py-2 px-3 rounded text-center bg-[#F0DFDB] opacity-50 flex items-center justify-between text-xs text-[#584141] line-through cursor-not-allowed"
                          >
                            <span>{slot.label}</span>
                            <span className="text-[10px] text-[#BA1A1A] uppercase font-bold">Booked</span>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={slot.label}
                          type="button"
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`py-2 px-3 rounded text-center transition-colors flex items-center justify-between text-xs font-semibold cursor-pointer border ${
                            isSelected
                              ? 'bg-[#570013] text-white ring-1 ring-[#FFDADA] border-transparent'
                              : 'bg-[#FFF0ED] hover:bg-[#FFD979]/40 text-[#221918] border-[#E0BFBF]/40'
                          }`}
                        >
                          <span>{slot.label}</span>
                          {isSelected ? (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-[#765B00]"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#221918] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#765B00]">
                        wb_sunny
                      </span>
                      <span>Afternoon & Evening Sessions (दुपारी व संध्याकाळी: 03:00 PM – 07:00 PM)</span>
                    </span>
                    <span className="text-[#584141]">Pradosh Kaal Slots</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {afternoonSlots.map((slot) => {
                      const isSelected = selectedSlot === slot.time;
                      return (
                        <button
                          key={slot.label}
                          type="button"
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`py-2 px-3 rounded text-center transition-colors flex items-center justify-between text-xs font-semibold cursor-pointer border ${
                            isSelected
                              ? 'bg-[#570013] text-white ring-1 ring-[#FFDADA] border-transparent'
                              : 'bg-[#FFF0ED] hover:bg-[#FFD979]/40 text-[#221918] border-[#E0BFBF]/40'
                          }`}
                        >
                          <span>{slot.label}</span>
                          {isSelected ? (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-[#765B00]"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slot Legend */}
                <div className="flex items-center gap-4 pt-2 text-[11px] text-[#584141]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#765B00]"></span> Available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#570013]"></span> Selected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A]"></span> Booked
                  </span>
                </div>
              </div>

              {/* Step 4: Devotee Information */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#800020] text-white flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <h2 className="text-base sm:text-lg text-[#221918] font-bold">
                      Devotee Information (भक्ताची माहिती)
                    </h2>
                  </div>
                  <span className="text-xs text-[#765B00] font-semibold uppercase tracking-wider">
                    Step 4 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wide text-[#221918] font-bold block">
                      Full Name (पूर्ण नाव) <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#584141] text-[18px]">
                        person
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="उदा. श्री राजेश शांताराम कुळकर्णी"
                        className="w-full bg-[#FFF8F6] pl-10 pr-3 py-2 rounded-lg border border-[#E0BFBF]/50 text-sm text-[#221918] focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wide text-[#221918] font-bold block">
                      Phone Number (भ्रमणध्वनी) <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-[#FFF0ED] px-3 py-2 rounded-lg text-xs font-bold text-[#584141] flex items-center border border-[#E0BFBF]/40">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98220 54321"
                        className="w-full bg-[#FFF8F6] px-3 py-2 rounded-lg border border-[#E0BFBF]/50 text-sm text-[#221918] focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs uppercase tracking-wide text-[#221918] font-bold block">
                      Email Address (ईमेल आयडी) <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#584141] text-[18px]">
                        mail
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rajesh.kulkarni@gmail.com (For video call invitation & summary)"
                        className="w-full bg-[#FFF8F6] pl-10 pr-3 py-2 rounded-lg border border-[#E0BFBF]/50 text-sm text-[#221918] focus:outline-none focus:ring-2 focus:ring-[#765B00]"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp opt-in */}
                <label className="flex items-center gap-3 p-3 rounded-lg bg-[#FFF0ED] cursor-pointer select-none border border-[#E0BFBF]/30">
                  <input
                    type="checkbox"
                    checked={whatsappOptIn}
                    onChange={(e) => setWhatsappOptIn(e.target.checked)}
                    className="w-4 h-4 accent-[#570013] rounded"
                  />
                  <div className="flex items-center gap-2 text-xs text-[#221918]">
                    <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                    <span>Send appointment confirmation, reminder, and Google Meet link via WhatsApp</span>
                  </div>
                </label>

                {/* Collapsible Birth Particulars */}
                <div className="pt-2 border-t border-[#E0BFBF]/30">
                  <div
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    className="flex items-center justify-between cursor-pointer select-none bg-[#FFF8F6] p-3 rounded-lg border border-[#E0BFBF]/40"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#570013] text-[20px]">
                        auto_awesome
                      </span>
                      <div>
                        <span className="font-serif text-sm font-bold text-[#570013] block">
                          Birth Particulars for Janma Patrika (जन्म तपशील)
                        </span>
                        <span className="text-[11px] text-[#584141]">
                          Recommended for Astrological Horoscopy & Muhurta precision
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#570013]">
                      {isAccordionOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>

                  {isAccordionOpen && (
                    <div className="space-y-3 pt-3 p-3 bg-[#FFF0ED] rounded-b-lg border-x border-b border-[#E0BFBF]/40">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#221918] block">
                            Date of Birth (जन्म तारीख)
                          </label>
                          <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-white px-3 py-2 rounded-lg text-xs text-[#221918] border border-[#E0BFBF]/50 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#221918] block">
                            Exact Time (जन्म वेळ)
                          </label>
                          <input
                            type="time"
                            value={birthTime}
                            onChange={(e) => setBirthTime(e.target.value)}
                            className="w-full bg-white px-3 py-2 rounded-lg text-xs text-[#221918] border border-[#E0BFBF]/50 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#221918] block">
                            Birth Place (जन्म स्थान)
                          </label>
                          <input
                            type="text"
                            value={birthPlace}
                            onChange={(e) => setBirthPlace(e.target.value)}
                            placeholder="e.g. Pune, MH"
                            className="w-full bg-white px-3 py-2 rounded-lg text-xs text-[#221918] border border-[#E0BFBF]/50 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#221918] block">
                          Key Questions or Special Concerns (प्रश्नांचा थोडक्यात तपशील)
                        </label>
                        <textarea
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Career, Health, Vivah Yoga, Griha Nirmana Muhurta, Navagraha Shanti requirements..."
                          className="w-full bg-white p-2.5 rounded-lg text-xs text-[#221918] border border-[#E0BFBF]/50 focus:outline-none resize-none"
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Action CTA */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-[#E0BFBF]/30">
                  <div className="flex items-center gap-2 text-xs text-[#584141]">
                    <span className="material-symbols-outlined text-[16px] text-[#765B00]">lock</span>
                    <span>256-bit encrypted • Strict Shastric privacy guaranteed</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#570013] text-white font-serif font-bold text-sm shadow-md hover:bg-[#800020] transition-all cursor-pointer"
                  >
                    <span>Confirm & Proceed to Slot Confirmation</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Summary & Instructions Sidebar (35% / col-span-4) */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="bg-[#FFF0ED] p-6 rounded-xl shadow-xs border border-[#E0BFBF]/40 space-y-4 sticky top-28">
                <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
                  <h3 className="font-serif text-lg text-[#570013] font-bold">Booking Overview</h3>
                  <span className="px-2 py-0.5 rounded bg-[#765B00]/15 text-[#765B00] text-[11px] font-bold">
                    Live Summary
                  </span>
                </div>

                {/* Shloka Callout */}
                <div className="p-3 bg-white rounded-lg shadow-xs border border-[#E0BFBF]/30">
                  <p className="font-serif text-xs text-[#570013] italic font-semibold leading-relaxed">
                    ॥ यस्य नास्ति स्वयं प्रज्ञा शास्त्रं तस्य करोति किम् ॥
                  </p>
                  <p className="text-[10px] text-[#765B00] mt-1">
                    Vedic guidance illuminates inner discernment.
                  </p>
                </div>

                {/* Summary Attributes */}
                <div className="space-y-2.5 text-xs text-[#221918]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#584141] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#765B00]">category</span>
                      <span>Service:</span>
                    </span>
                    <span className="font-bold text-[#570013]">{serviceSpecs[serviceDomain].name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#584141] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#765B00]">devices</span>
                      <span>Mode:</span>
                    </span>
                    <span className="font-semibold">
                      {consultationMode === 'online' ? 'Online Video / Phone' : 'In-Person at Ashram'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#584141] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#765B00]">calendar_today</span>
                      <span>Date:</span>
                    </span>
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#584141] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#765B00]">schedule</span>
                      <span>Time Slot:</span>
                    </span>
                    <span className="font-bold text-[#570013]">{selectedSlot}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#584141] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#765B00]">timer</span>
                      <span>Duration:</span>
                    </span>
                    <span className="font-semibold">{serviceSpecs[serviceDomain].duration}</span>
                  </div>

                  <div className="pt-2 border-t border-[#E0BFBF]/30 flex items-center justify-between">
                    <span className="font-bold text-sm text-[#221918]">Consultation Dakshina:</span>
                    <span className="font-serif font-bold text-base text-[#570013]">
                      {serviceSpecs[serviceDomain].price}
                    </span>
                  </div>
                </div>

                {/* What to expect list */}
                <div className="bg-white p-3.5 rounded-lg shadow-xs border border-[#E0BFBF]/30 space-y-2">
                  <h4 className="text-xs text-[#570013] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#765B00]">fact_check</span>
                    <span>What to Expect (सत्राचे स्वरूप)</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] text-[#584141]">
                    <li className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[13px] text-[#765B00] mt-0.5">check_circle</span>
                      <span>One-on-one confidential dialogue with a certified Shastric Scholar.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[13px] text-[#765B00] mt-0.5">check_circle</span>
                      <span>Vedic Kundali analysis, planetary periods (Dasha-Bhukti) assessment.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[13px] text-[#765B00] mt-0.5">check_circle</span>
                      <span>Simple, ethical scriptural remedies without fear.</span>
                    </li>
                  </ul>
                </div>

                {/* Helpline Panel */}
                <div className="p-3 bg-[#F6E4E1] rounded-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#765B00] text-lg">headset_mic</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#584141] font-medium">Need immediate assistance?</span>
                    <a href="tel:+919822054321" className="text-xs font-bold text-[#570013] hover:underline">
                      +91 98220 54321
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Confirmation Slip Modal */}
      {confirmedSlip && (
        <div
          className="fixed inset-0 z-50 bg-[#241B19]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          role="dialog"
        >
          <div className="bg-white max-w-lg w-full rounded-xl p-6 sm:p-8 shadow-2xl space-y-4 border border-[#E0BFBF]/40 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#FFDF94]/60 flex items-center justify-center text-[#765B00]">
                  <span className="material-symbols-outlined text-2xl">task_alt</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#570013] font-bold">Appointment Provisional Slip</h3>
                  <span className="text-xs text-[#765B00]">प्रवेश व सत्र नोंदणी क्रमांक</span>
                </div>
              </div>
              <button
                onClick={() => setConfirmedSlip(null)}
                className="text-[#584141] hover:text-[#570013]"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="bg-[#FFF0ED] p-4 rounded-lg space-y-2 text-xs text-[#221918]">
              <div className="flex justify-between">
                <span className="text-[#584141]">Appointment ID:</span>
                <span className="font-mono font-bold text-[#570013]">{confirmedSlip.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#584141]">Devotee Name:</span>
                <span className="font-semibold">{confirmedSlip.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#584141]">Service:</span>
                <span className="font-semibold">{confirmedSlip.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#584141]">Slot:</span>
                <span className="font-semibold text-[#765B00]">{confirmedSlip.slot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#584141]">Mode:</span>
                <span className="font-semibold">{confirmedSlip.mode}</span>
              </div>
            </div>

            <div className="p-3 bg-[#FFDF94]/30 rounded text-center text-xs text-[#251A00]">
              A confirmation SMS & WhatsApp ping has been dispatched. Our coordinator will verify Kundali details 2 hours prior to the session.
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmedSlip(null);
                  onNavigate('dashboard');
                }}
                className="w-full py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors cursor-pointer"
              >
                View in Devotee Dashboard (भक्त कक्षामध्ये पहा)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
