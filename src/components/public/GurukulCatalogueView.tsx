import React, { useState } from 'react';
import { gurukulCourses, dinacharyaSchedule } from '../../data/gurukulData.ts';
import { GurukulCourse } from '../../types/index.ts';
import { Modal } from '../common/Modal.tsx';
import { useDevotee } from '../../context/DevoteeContext.tsx';

interface GurukulCatalogueViewProps {
  onNavigate: (path: string) => void;
}

export const GurukulCatalogueView: React.FC<GurukulCatalogueViewProps> = ({ onNavigate }) => {
  const { showToast } = useDevotee();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [enquiryCourse, setEnquiryCourse] = useState<string | null>(null);

  // Enquiry modal form
  const [applicantName, setApplicantName] = useState('');
  const [applicantAge, setApplicantAge] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [backgroundNotes, setBackgroundNotes] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Courses (सर्व अभ्यासक्रम)' },
    { id: 'residential', label: 'Residential Veda Pathshala (आवासीय)' },
    { id: 'weekend', label: 'Weekend Sanskrit & Stotra (साप्ताहिक)' },
    { id: 'paurohitya', label: 'Karmakanda & Yadnik (पौरोहित्य)' },
    { id: 'online', label: 'Online Global Adhyayan (विदेशस्थ)' },
  ];

  const filteredCourses = gurukulCourses.filter((course) => {
    if (activeFilter === 'all') return true;
    return course.category === activeFilter;
  });

  const toggleDetails = (courseId: string) => {
    setExpandedDetails((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      `धन्यवाद! ${enquiryCourse} साठी आपला प्रवेश अर्ज गुरुकुल कार्यालयात सादर झाला आहे. आमचे आचार्य संपर्क करतील.`,
      'success'
    );
    setEnquiryCourse(null);
    setApplicantName('');
    setApplicantPhone('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Heritage Breadcrumb */}
      <div className="w-full bg-[#FFF0ED] py-3 border-b border-[#E0BFBF]/30">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex items-center justify-between text-xs text-[#584141]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#570013] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-[#765B00]">home</span>
              <span>Home</span>
            </button>
            <span className="text-[#E0BFBF]">/</span>
            <span className="text-[#570013] font-semibold">
              Gurukul (गुरुकुल वेद पाठशाळा व अध्ययन केंद्र)
            </span>
          </nav>
          <span className="text-xs text-[#765B00] font-semibold hidden sm:inline">
            ॥ गुरुकुल परंपरा व वेद संरक्षणम् ॥
          </span>
        </div>
      </div>

      {/* Hero Editorial Section */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#FFF0ED] via-[#FFF8F6] to-white pb-14 pt-8">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <span className="px-3 py-1 rounded bg-[#FFDF94] text-[#251A00] text-xs tracking-wider uppercase font-bold w-fit">
                Traditional Vedic Scholarship
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#570013] font-bold tracking-tight leading-tight">
                Authentic Veda Adhyayan, Shastric Wisdom & Sanskrit Pathshala
                <span className="block mt-2 font-serif text-xl sm:text-2xl text-[#765B00] font-medium">
                  सांगवेद अध्ययन, व्याकरण व संस्कार शिक्षण
                </span>
              </h1>
              <p className="text-base text-[#584141] leading-relaxed">
                Preserving millennia of unbroken oral transmission through classical Guru-Shishya Parampara. Under the tutelage of reverent Ghanapathis, students undergo meticulous Swara-shuddha Rigveda and Shukla Yajurveda adhyayan, weekend Sanskrit Sambhashan, and practical Karmakanda certification.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-white p-3 rounded-lg border border-[#E0BFBF]/40 shadow-xs flex flex-col gap-0.5">
                  <span className="material-symbols-outlined text-[#765B00] text-lg">verified</span>
                  <span className="text-xs font-bold text-[#570013]">Govt. Recognized</span>
                  <span className="text-[10px] text-[#584141]">Trust F/49210</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#E0BFBF]/40 shadow-xs flex flex-col gap-0.5">
                  <span className="material-symbols-outlined text-[#765B00] text-lg">person_celebrate</span>
                  <span className="text-xs font-bold text-[#570013]">Ghanapathi Faculty</span>
                  <span className="text-[10px] text-[#584141]">Swara Masters</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#E0BFBF]/40 shadow-xs flex flex-col gap-0.5">
                  <span className="material-symbols-outlined text-[#765B00] text-lg">soup_kitchen</span>
                  <span className="text-xs font-bold text-[#570013]">100% Free Seva</span>
                  <span className="text-[10px] text-[#584141]">Food & Lodging</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#E0BFBF]/40 shadow-xs flex flex-col gap-0.5">
                  <span className="material-symbols-outlined text-[#765B00] text-lg">volunteer_activism</span>
                  <span className="text-xs font-bold text-[#570013]">Charitable Seva</span>
                  <span className="text-[10px] text-[#584141]">80G Tax Deductible</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#courses-catalogue"
                  className="px-6 py-3 rounded-lg bg-[#570013] text-white text-xs font-bold shadow-md hover:bg-[#800020] transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  <span>Explore Courses & Admissions</span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('gurukul-agni-sukta')}
                  className="px-5 py-3 rounded-lg bg-white border border-[#E0BFBF]/60 text-[#765B00] text-xs font-bold hover:bg-[#FFF0ED] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">headphones</span>
                  <span>Audio Adhyayan Player</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-xl overflow-hidden shadow-xl bg-[#FCEAE6] border border-[#E0BFBF]/40">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-cATCSMk4rqrbEcUosA2iWNFN0qHNCsKsYRlcb1sWLQgGuM9qOBHVSrT6jYdTIosgXWE_w4yoVxqpcn-u3iGV0RXxxvBVctylHKwOcgzUn9NpHKpErTQ5dQT_wSWkzI7omSjqM36sqTO9RcGh4qRw-rTu2NL-buYUo9AX5KtlOZutqKUSYLZ3m0DjriG9lc1qbIt45yn3r4_qUMM1akvI1QZhCxr0Nu10YdoBaYhdpxm7u9DCW-DU2A"
                  alt="Vedic Gurukul Courtyard in Pune"
                  className="w-full h-[360px] object-cover"
                />
                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#570013]">
                      Academic Year 2025–26
                    </h4>
                    <p className="text-xs text-[#584141]">
                      Residential Batches Commencing Shravana Purnima
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#FFDF94] text-[#251A00] text-[10px] font-bold uppercase">
                    Admissions Open
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filter Tabs */}
      <section className="w-full bg-[#FFF0ED] py-6 border-y border-[#E0BFBF]/30" id="courses-catalogue">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#765B00] font-semibold uppercase tracking-wider">
              Curriculum & Pathshala Tracks
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#570013] font-bold">
              Explore Sacred Adhyayan Streams
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#570013] text-white shadow-xs'
                    : 'bg-white text-[#584141] hover:text-[#570013] border border-[#E0BFBF]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Grid */}
      <section className="w-full bg-white py-12">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-xs hover:shadow-lg transition-all border border-[#E0BFBF]/40 flex flex-col justify-between overflow-hidden group"
              >
                <div className="h-2 bg-[#570013] w-full"></div>
                <div className="p-6 flex flex-col space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#FFDADA] text-[#570013] text-xs font-bold">
                      {course.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#765B00] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-[#570013] font-bold group-hover:text-[#800020] transition-colors leading-snug">
                      {course.titleEn}
                    </h3>
                    <p className="text-xs text-[#765B00] font-semibold mt-0.5">
                      {course.titleMr}
                    </p>
                  </div>

                  <p className="text-xs text-[#584141] leading-relaxed line-clamp-3">
                    {course.descriptionEn}
                  </p>

                  <div className="bg-[#FFF0ED] rounded-lg p-3 space-y-1.5 text-xs text-[#584141]">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#221918]">Eligibility:</span>
                      <span className="text-right truncate ml-2">{course.eligibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#221918]">Seva:</span>
                      <span className="text-[#765B00] font-bold">{course.seva}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#221918]">Faculty:</span>
                      <span className="text-right truncate ml-2">{course.acharya}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEnquiryCourse(course.titleEn)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors text-center cursor-pointer shadow-xs"
                    >
                      Admission Enquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleDetails(course.id)}
                      className="py-2.5 px-3 rounded-lg bg-[#FFF0ED] text-[#570013] text-xs font-semibold hover:bg-[#FCEAE6] transition-colors cursor-pointer"
                    >
                      {expandedDetails[course.id] ? 'Hide' : 'तपशील'}
                    </button>
                  </div>

                  {course.isFeaturedAudio && (
                    <button
                      type="button"
                      onClick={() => onNavigate('gurukul-agni-sukta')}
                      className="w-full py-2 px-3 rounded-lg bg-[#FFDF94] text-[#251A00] text-xs font-bold hover:bg-[#FFD979] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">headphones</span>
                      <span>Enter Agni Sukta Audio Learning Console</span>
                    </button>
                  )}

                  {expandedDetails[course.id] && (
                    <div className="mt-2 p-3 bg-[#FFF0ED] rounded-lg text-xs text-[#584141] space-y-1 animate-in fade-in duration-150">
                      <p className="font-bold text-[#570013]">Syllabus Focus Areas:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        {course.syllabusHighlights.map((hl, i) => (
                          <li key={i}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recitation Console Callout */}
      <section className="w-full bg-[#FFF0ED] py-14">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-[#E0BFBF]/40 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#765B00] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#765B00] animate-pulse"></span>
                <span>Interactive Swara Chanting Console</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
                Master Rigveda Agni Sukta with Vedic Notation
              </h2>
              <p className="text-sm text-[#584141] leading-relaxed">
                Step into our distraction-free study room: listen to 24-bit studio recitations by Acharya Shridhar Ghanapathi, toggle between Samhita Path, Pada Path, and Krama Path, and study the exact word-by-word Nirukta commentary.
              </p>
              <div className="p-3.5 bg-[#FFF0ED] rounded-lg text-center font-serif text-base sm:text-lg text-[#570013] font-semibold">
                ॥ ॐ अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म् । होता॑रं रत्न॒धात॑मम् ॥ १ ॥
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('gurukul-agni-sukta')}
                className="px-6 py-3.5 rounded-xl bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Open Agni Sukta Player</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('resources')}
                className="px-5 py-3 rounded-xl bg-[#FFF0ED] text-[#570013] text-xs font-semibold hover:bg-[#FCEAE6] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>Download Shastra PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Ashram Dinacharya (5 Slots) */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs text-[#765B00] font-bold uppercase tracking-wider">
              Rigorous Spiritual Disciplines
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
              The Ashram Dinacharya (दिनचर्या)
            </h2>
            <p className="text-sm text-[#584141]">
              Vedic mastery is not merely academic study; it is an austere life rhythm tuned with cosmic cycles, starting before dawn with sacred Agnihotra and concluding with evening Stotra Aradhana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {dinacharyaSchedule.map((item, index) => (
              <div
                key={index}
                className="bg-[#FFF0ED] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3 border border-[#E0BFBF]/30 hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-white text-[#570013] text-xs font-bold inline-block mb-2 shadow-2xs">
                    {item.time}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#570013]">
                    {item.titleMr}
                  </h4>
                  <p className="text-xs text-[#584141] mt-1.5 leading-relaxed">
                    {item.descMr}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[#765B00] text-[11px] font-semibold pt-2 border-t border-[#E0BFBF]/30">
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                  <span>{item.titleEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidyarthi Dattak Yojana (Sponsorship Banner) */}
      <section className="w-full bg-[#FFF0ED] py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-[#E0BFBF]/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-[#765B00] text-white text-xs font-semibold uppercase tracking-wider">
                    ॥ विद्यादानं महादानम् ॥
                  </span>
                  <span className="text-xs text-[#765B00] font-bold">100% 80G Tax Deductible</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
                  Vidyarthi Dattak Yojana (विद्यार्थी दत्तक योजना)
                </h3>
                <p className="text-sm text-[#584141] leading-relaxed">
                  Every year, promising young Brahmacharis from rural and traditional families dedicate 7 to 10 years of their youth exclusively to preserving our Vedic heritage. As a benevolent patron, you can sponsor a Vidyarthi’s pure Desi cow milk, sattvic food, scholarly texts, clothing, and healthcare needs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#FFF0ED] p-4 rounded-xl border border-[#E0BFBF]/30">
                    <span className="text-xs text-[#765B00] font-bold block uppercase">
                      Monthly Seva / मासिक सहयोग
                    </span>
                    <span className="font-serif text-2xl text-[#570013] font-bold">
                      ₹3,000 <span className="text-xs font-normal text-[#584141]">/ month</span>
                    </span>
                    <p className="text-[11px] text-[#584141] mt-1">
                      Covers nutrition, milk, uniforms, and medicine for one vidyarthi.
                    </p>
                  </div>
                  <div className="bg-[#FFF0ED] p-4 rounded-xl border border-[#E0BFBF]/30">
                    <span className="text-xs text-[#765B00] font-bold block uppercase">
                      Annual Sponsorship / वार्षिक दत्तक
                    </span>
                    <span className="font-serif text-2xl text-[#570013] font-bold">
                      ₹36,000 <span className="text-xs font-normal text-[#584141]">/ year</span>
                    </span>
                    <p className="text-[11px] text-[#584141] mt-1">
                      Complete patron support for entire academic year with annual progress report.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 bg-[#FFF0ED] p-6 rounded-xl border border-[#E0BFBF]/30 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FFDF94] text-[#795D00] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[36px]">volunteer_activism</span>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#570013] font-bold">Sponsor a Vidyarthi</h4>
                  <p className="text-xs text-[#584141] mt-1">
                    Receive authentic Sankalpa blessings and periodic handwritten letters from your adopted student.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('donate')}
                  className="w-full py-3 px-4 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                  <span>Sponsor Online / दत्तक सेवा</span>
                </button>
                <span className="text-[11px] text-[#584141]">
                  Official receipt with 80G tax certificate issued instantly
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Enquiry Modal */}
      <Modal
        isOpen={Boolean(enquiryCourse)}
        onClose={() => setEnquiryCourse(null)}
        title="Gurukul Admission Enquiry"
        subtitle={enquiryCourse || ''}
        maxWidth="lg"
      >
        <form onSubmit={handleEnquirySubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#221918] font-bold mb-1">
              Student / Applicant Full Name *
            </label>
            <input
              type="text"
              required
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="उदा. आदित्य शर्मा"
              className="w-full px-3 py-2 rounded-lg bg-[#FFF8F6] text-[#221918] text-sm border border-[#E0BFBF]/50 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#221918] font-bold mb-1">
                Age of Applicant *
              </label>
              <input
                type="number"
                min="7"
                max="75"
                required
                value={applicantAge}
                onChange={(e) => setApplicantAge(e.target.value)}
                placeholder="उदा. 12 किंवा 35"
                className="w-full px-3 py-2 rounded-lg bg-[#FFF8F6] text-[#221918] text-sm border border-[#E0BFBF]/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#221918] font-bold mb-1">
                WhatsApp Mobile *
              </label>
              <input
                type="tel"
                required
                value={applicantPhone}
                onChange={(e) => setApplicantPhone(e.target.value)}
                placeholder="+91 98XXX XXXXX"
                className="w-full px-3 py-2 rounded-lg bg-[#FFF8F6] text-[#221918] text-sm border border-[#E0BFBF]/50 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#221918] font-bold mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full px-3 py-2 rounded-lg bg-[#FFF8F6] text-[#221918] text-sm border border-[#E0BFBF]/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#221918] font-bold mb-1">
              Prior Vedic / Sanskrit Background
            </label>
            <textarea
              rows={2}
              value={backgroundNotes}
              onChange={(e) => setBackgroundNotes(e.target.value)}
              placeholder="पूर्व ज्ञान, उपनयन संस्कार स्थिती, किंवा उद्देश..."
              className="w-full px-3 py-2 rounded-lg bg-[#FFF8F6] text-[#221918] text-sm border border-[#E0BFBF]/50 focus:outline-none resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEnquiryCourse(null)}
              className="px-4 py-2 rounded-lg bg-[#FFF0ED] text-[#221918] text-xs font-semibold hover:bg-[#FCEAE6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs"
            >
              Submit Application / अर्ज पाठवा
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
