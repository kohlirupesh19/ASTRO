import React, { useState, useMemo } from 'react';
import { poojaServices } from '../../data/poojaData.ts';
import { PoojaService } from '../../types/index.ts';
import { PoojaDetailModal } from './PoojaDetailModal.tsx';

interface PoojaCatalogueViewProps {
  onNavigate: (path: string, param?: string) => void;
  selectedPoojaId?: string;
}

export const PoojaCatalogueView: React.FC<PoojaCatalogueViewProps> = ({
  onNavigate,
  selectedPoojaId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [activeModalPooja, setActiveModalPooja] = useState<PoojaService | null>(() => {
    if (selectedPoojaId) {
      return poojaServices.find((p) => p.id === selectedPoojaId) || null;
    }
    return null;
  });

  const categories = [
    { id: 'all', label: 'All Services (सर्व विधी)' },
    { id: 'shanti', label: 'Shanti & Graha Dosha (शांती व ग्रहदोष)' },
    { id: 'mahayajna', label: 'Mahayajna & Anushthan (महायज्ञ व अनुष्ठान)' },
    { id: 'samskara', label: 'Samskara & Griha Pravesh (संस्कार व वास्तु)' },
    { id: 'abhishek', label: 'Nitya & Abhishek (नित्य व अभिषेक)' },
    { id: 'pitru', label: 'Pitru Tarpan (श्राद्ध व तर्पण)' },
  ];

  const filteredPoojaList = useMemo(() => {
    let list = poojaServices.filter((pooja) => {
      // Category filter
      if (selectedCategory !== 'all' && pooja.category !== selectedCategory) {
        return false;
      }
      // Mode filter
      if (selectedMode !== 'all' && !pooja.mode.includes(selectedMode as 'online' | 'ashram')) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName =
          pooja.nameEn.toLowerCase().includes(query) ||
          pooja.nameMr.toLowerCase().includes(query) ||
          pooja.descriptionEn.toLowerCase().includes(query) ||
          pooja.categoryLabelEn.toLowerCase().includes(query);
        if (!matchesName) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'low-to-high') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'duration') {
      list = [...list].sort((a, b) => {
        const aHours = a.duration.includes('Days') ? 999 : parseFloat(a.duration) || 10;
        const bHours = b.duration.includes('Days') ? 999 : parseFloat(b.duration) || 10;
        return aHours - bHours;
      });
    }

    return list;
  }, [selectedCategory, selectedMode, searchQuery, sortBy]);

  const handleBook = (poojaId: string) => {
    onNavigate('book-appointment', poojaId);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Heritage Breadcrumbs & Sub-Bar */}
      <div className="w-full bg-[#FFF0ED] py-3 border-b border-[#E0BFBF]/30">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-wrap items-center justify-between gap-3 text-xs text-[#584141]">
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
              Sacred Poojas & Yadnik (पूजा व याज्ञिक सेवा सूची)
            </span>
          </nav>
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#765B00] animate-pulse"></span>
            <span className="font-medium text-[#765B00]">
              Verified Shastric Vidhana • Authenticated by Traditional Lineage
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Page Header */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#FFF8F6] via-[#FFF0ED] to-[#FFF8F6] py-12 lg:py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div className="inline-flex items-center gap-2 text-[#765B00] text-xs font-semibold tracking-wider uppercase">
                <span className="material-symbols-outlined text-[18px]">flare</span>
                <span>॥ श्रौत स्मार्त कर्मकांड विधानम् ॥ • Authentic Shastric Vidhi</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#570013] font-bold tracking-tight leading-tight">
                Sacred Poojas, Havans & Yadnik Ceremonies
                <span className="block font-serif text-xl sm:text-2xl lg:text-3xl text-[#765B00] font-semibold mt-1">
                  (पवित्र पूजा, हवि व याज्ञिक विधी)
                </span>
              </h1>
              <p className="text-base text-[#584141] max-w-2xl leading-relaxed">
                Performed with strict Vedic swara pronunciation, authentic organic samagri, and zero fear-mongering. Available both live-streamed online and in-person at our Pune Ashram or your residence.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#221918]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[18px]">local_florist</span>
                  <span>100% Desi Cow Ghee & Bilva Samagri</span>
                </div>
                <span className="text-[#E0BFBF] hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[18px]">groups</span>
                  <span>Ghanapathi Reciters</span>
                </div>
                <span className="text-[#E0BFBF] hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[18px]">verified</span>
                  <span>Transparent Sankalpa Patra</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] p-6 bg-[#FCEAE6] rounded-xl shadow-xs flex flex-col items-center text-center space-y-3 border border-[#E0BFBF]/40">
                <div className="w-14 h-14 rounded-full bg-[#570013] text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[28px]">wb_sunny</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-[#570013]">शौच व श्रद्धा</span>
                  <p className="text-xs text-[#584141] mt-0.5">
                    Purity of thought, authentic Sanskrit intonation, and total liturgical integrity since 1994.
                  </p>
                </div>
                <div className="w-full bg-white rounded-lg p-2.5 text-left flex items-center justify-between text-xs text-[#221918]">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#765B00] font-semibold uppercase">Daily Ashram Havan</span>
                    <span className="font-semibold">Brahma Muhurta (06:15 AM)</span>
                  </div>
                  <span className="material-symbols-outlined text-[#570013] text-[20px]">nest_clock_farsight_analog</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Console: Search, Mode, Sort & Category Filter Pills */}
      <section className="w-full sticky top-20 z-30 bg-[#FFF8F6]/95 backdrop-blur-md shadow-xs py-4 border-y border-[#E0BFBF]/30">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="lg:col-span-6 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7071] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pooja by deity, purpose (e.g., Navagraha, Rudrabhishek, Vastu)..."
                className="w-full pl-11 pr-4 py-2.5 bg-white text-[#221918] text-sm rounded-lg border border-[#E0BFBF]/40 focus:outline-none focus:ring-2 focus:ring-[#765B00] shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7071] hover:text-[#570013]"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Mode Toggle */}
            <div className="lg:col-span-4 flex items-center bg-[#F6E4E1] p-1 rounded-lg">
              {[
                { id: 'all', label: 'All Modes' },
                { id: 'online', label: 'Online Video' },
                { id: 'ashram', label: 'Ashram / Home' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMode(m.id)}
                  className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold transition-all cursor-pointer ${
                    selectedMode === m.id
                      ? 'text-white bg-[#570013] shadow-xs'
                      : 'text-[#584141] hover:text-[#570013]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="lg:col-span-2 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white text-[#221918] text-xs font-semibold py-2.5 pl-3 pr-8 rounded-lg border border-[#E0BFBF]/40 shadow-xs focus:outline-none cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="low-to-high">Dakshina: Low to High</option>
                <option value="duration">Duration (Quickest first)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7071] pointer-events-none text-[18px]">
                unfold_more
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#570013] text-white shadow-xs'
                    : 'bg-[#F6E4E1] text-[#221918] hover:bg-[#FCEAE6] hover:text-[#570013]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Pooja Catalogue Grid Section */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#570013] font-serif">
                Available Yadnik Vidhis
              </span>
              <span className="text-xs bg-[#FFD979] text-[#795D00] px-2 py-0.5 rounded font-bold">
                {filteredPoojaList.length} Services Displayed
              </span>
            </div>
            <p className="text-xs text-[#584141] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#765B00]">info</span>
              <span>All rituals include personal Sankalpa by Gotra, Nakshatra & Kula Devata.</span>
            </p>
          </div>

          {filteredPoojaList.length === 0 ? (
            <div className="p-12 text-center bg-[#FFF0ED] rounded-xl space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#765B00]">search_off</span>
              <h3 className="font-serif text-lg font-bold text-[#570013]">
                कोणतीही पूजा सापडली नाही (No matching poojas found)
              </h3>
              <p className="text-xs text-[#584141]">
                कृपया आपले शोध शब्द किंवा फिल्टर बदलून पुन्हा प्रयत्न करा.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedMode('all');
                }}
                className="px-4 py-2 bg-[#570013] text-white rounded-lg text-xs font-semibold"
              >
                फिल्टर्स साफ करा (Clear Filters)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoojaList.map((pooja) => (
                <article
                  key={pooja.id}
                  className="flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#E0BFBF]/30 group"
                >
                  {/* Card Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#FCEAE6]">
                    <img
                      src={pooja.image}
                      alt={pooja.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#570013]/80 via-transparent to-black/20"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-white/90 backdrop-blur-sm text-[#570013] text-xs px-2.5 py-1 rounded font-semibold shadow-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-[#765B00]">
                          {pooja.mode.includes('online') ? 'videocam' : 'temple_hindu'}
                        </span>
                        <span>{pooja.mode.includes('online') ? 'Ashram / Online Video' : 'Ashram Sanctum'}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-semibold tracking-widest uppercase text-[#FFDF94]">
                        {pooja.lineage}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h2 className="font-serif text-lg font-bold text-[#570013] group-hover:text-[#800020] transition-colors leading-snug">
                        {pooja.nameEn}
                        <span className="block text-xs font-normal text-[#584141] mt-0.5">
                          ({pooja.nameMr})
                        </span>
                      </h2>
                      <p className="text-xs text-[#584141] leading-relaxed line-clamp-2">
                        {pooja.descriptionEn}
                      </p>
                    </div>

                    {/* Ritual Specs Grid */}
                    <div className="bg-[#FFF0ED] rounded-lg p-3 grid grid-cols-2 gap-2 text-xs text-[#584141]">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#765B00] text-[16px]">schedule</span>
                        <span>{pooja.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#765B00] text-[16px]">group</span>
                        <span className="truncate">{pooja.pandits}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#765B00] text-[16px]">water_drop</span>
                        <span className="truncate">{pooja.samagri.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#765B00] text-[16px]">verified</span>
                        <span>Personal Sankalpa</span>
                      </div>
                    </div>

                    {/* Pricing & Action Buttons */}
                    <div className="pt-2 space-y-3">
                      <div className="flex items-baseline justify-between border-t border-[#E0BFBF]/30 pt-3">
                        <span className="text-xs text-[#584141] font-medium">Dakshina Seva:</span>
                        <span className="font-serif text-base font-bold text-[#570013]">
                          {pooja.priceLabel}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveModalPooja(pooja)}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#FCEAE6] text-[#570013] text-xs font-bold hover:bg-[#F6E4E1] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>तपशील पहा</span>
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBook(pooja.id)}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">event_available</span>
                          <span>Book Sankalpa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust & Shastra Conformance Section (3 Pillars) */}
      <section className="w-full bg-[#FFF0ED] py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs text-[#765B00] font-semibold uppercase tracking-widest">
              ॥ धर्मो रक्षति रक्षितः ॥
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
              Our Shastric Integrity Charter
            </h2>
            <p className="text-sm text-[#584141]">
              Every ritual at Chaitanya Ved Pratishthan adheres to unbroken Smarta canons, devoid of superstition, market pricing markups, or abbreviated shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-xs flex flex-col space-y-3 border border-[#E0BFBF]/30">
              <div className="w-12 h-12 rounded-lg bg-[#FCEAE6] flex items-center justify-center text-[#765B00]">
                <span className="material-symbols-outlined text-[28px]">eco</span>
              </div>
              <h3 className="font-serif text-lg text-[#570013] font-bold">
                100% Organic Samagri
                <span className="block text-xs font-normal text-[#765B00] mt-0.5">(शुद्ध सेंद्रिय सामग्री)</span>
              </h3>
              <p className="text-sm text-[#584141] leading-relaxed">
                Sourced directly from certified gaushalas and Ayurvedic herb collectors: pure Gir cow bilona ghee, unadulterated camphor, organic sesame, and wild bilva patra.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#584141]">
                <span className="material-symbols-outlined text-[16px] text-[#765B00]">check_circle</span>
                <span>Zero chemical adulterants or colored dyes</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xs flex flex-col space-y-3 border border-[#E0BFBF]/30">
              <div className="w-12 h-12 rounded-lg bg-[#FCEAE6] flex items-center justify-center text-[#765B00]">
                <span className="material-symbols-outlined text-[28px]">school</span>
              </div>
              <h3 className="font-serif text-lg text-[#570013] font-bold">
                Verified Ghanapathi Reciters
                <span className="block text-xs font-normal text-[#765B00] mt-0.5">(प्रमाणित वेदपाठी)</span>
              </h3>
              <p className="text-sm text-[#584141] leading-relaxed">
                Every Acharya has undergone at least 8 to 12 years of residential Gurukul discipline with verified mastery over swara accents (Udatta, Anudatta, Svarita).
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#584141]">
                <span className="material-symbols-outlined text-[16px] text-[#765B00]">check_circle</span>
                <span>Rigveda & Shukla Yajurveda lineages</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xs flex flex-col space-y-3 border border-[#E0BFBF]/30">
              <div className="w-12 h-12 rounded-lg bg-[#FCEAE6] flex items-center justify-center text-[#765B00]">
                <span className="material-symbols-outlined text-[28px]">receipt_long</span>
              </div>
              <h3 className="font-serif text-lg text-[#570013] font-bold">
                Transparent Dakshina Charter
                <span className="block text-xs font-normal text-[#765B00] mt-0.5">(पारदर्शक मानधन)</span>
              </h3>
              <p className="text-sm text-[#584141] leading-relaxed">
                All dakshina amounts are predetermined by our public charitable trust board. 100% of proceeds go towards vedic scholars, samagri sourcing, and Gurukul student stipends.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#584141]">
                <span className="material-symbols-outlined text-[16px] text-[#765B00]">check_circle</span>
                <span>Official 80G tax receipt provided upon request</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Consultation Helpline CTA Section */}
      <section className="w-full bg-[#FFF8F6] py-14">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="relative overflow-hidden bg-[#570013] rounded-xl p-8 lg:p-12 text-white shadow-xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#800020] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">contact_support</span>
                  <span>Unsure Which Pooja or Homa is Appropriate for Your Horoscope?</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  Speak with a Senior Vedic Counselor & Jyotishi
                </h2>
                <p className="text-sm text-white/90 max-w-2xl leading-relaxed">
                  Before undertaking any major remedy or expensive anushthan, have your Janma Kundali reviewed by our senior Shastris to evaluate planetary dashas and genuine scriptural needs.
                </p>
                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#FFDF94] text-[20px]">call</span>
                    <span>Helpline: +91 98220 54321</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#FFDF94] text-[20px]">schedule</span>
                    <span>10:00 AM – 06:00 PM (Daily)</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => onNavigate('book-appointment')}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#FFD979] text-[#795D00] text-xs font-bold text-center hover:bg-[#FFDF94] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  <span>Book Shastra Consultation</span>
                </button>
                <a
                  href="tel:+919822054321"
                  className="w-full py-3.5 px-6 rounded-lg bg-white/15 backdrop-blur-md text-white text-xs font-bold text-center hover:bg-white/25 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  <span>Call Helpline Directly</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pooja Detail Modal */}
      <PoojaDetailModal
        pooja={activeModalPooja}
        isOpen={Boolean(activeModalPooja)}
        onClose={() => setActiveModalPooja(null)}
        onBook={handleBook}
      />
    </div>
  );
};
