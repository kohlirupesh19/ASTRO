import React from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { poojaServices } from '../../data/poojaData.ts';

interface HomeViewProps {
  onNavigate: (path: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const featuredPoojas = poojaServices.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <section className="relative w-full overflow-hidden bg-[#FFF8F6] py-14 lg:py-24">
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#FFDF94]/30 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#FFDADA]/30 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Text Content */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              {/* Overline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F6E4E1] w-fit shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#765B00]"></span>
                <span className="text-xs font-semibold text-[#765B00] tracking-widest uppercase">
                  {t('home.heroBadge')}
                </span>
                <span className="text-[#8C7071] text-xs">|</span>
                <span className="text-xs text-[#584141] font-medium">Authentic & Scholarly</span>
              </div>

              {/* Hero Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#570013] font-bold tracking-tight leading-tight lg:leading-[56px]">
                {t('home.heroTitle1')}
                <br />
                <span className="italic font-normal text-[#221918]">
                  {t('home.heroTitle2')}
                </span>
              </h1>

              {/* Body Description */}
              <p className="text-base sm:text-lg text-[#584141] max-w-2xl leading-relaxed">
                {t('home.heroDesc')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('book-appointment')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#570013] text-white text-sm font-semibold shadow-md hover:bg-[#800020] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  <span>{t('home.ctaBook')}</span>
                </button>
                <button
                  onClick={() => onNavigate('yadnik-and-pooja')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#FCEAE6] text-[#570013] text-sm font-semibold shadow-xs hover:bg-[#F6E4E1] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#765B00]">explore</span>
                  <span>{t('home.ctaExplore')}</span>
                </button>
              </div>

              {/* Trust Markers */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 max-w-xl">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FFF0ED] shadow-xs">
                  <span className="material-symbols-outlined text-[#765B00] text-[22px]">verified</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#221918] font-bold">{t('home.trust1')}</span>
                    <span className="text-[11px] text-[#584141]">{t('home.trust1Sub')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FFF0ED] shadow-xs">
                  <span className="material-symbols-outlined text-[#765B00] text-[22px]">auto_stories</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#221918] font-bold">{t('home.trust2')}</span>
                    <span className="text-[11px] text-[#584141]">{t('home.trust2Sub')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FFF0ED] shadow-xs col-span-2 sm:col-span-1">
                  <span className="material-symbols-outlined text-[#765B00] text-[22px]">visibility</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-[#221918] font-bold">{t('home.trust3')}</span>
                    <span className="text-[11px] text-[#584141]">{t('home.trust3Sub')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Sacred Emblem Visual */}
            <div className="lg:col-span-5 relative flex justify-center mt-8 lg:mt-0">
              <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
                {/* Concentric Golden Circles */}
                <div className="absolute inset-0 rounded-full bg-[#F6E4E1]/60 shadow-inner"></div>
                <div className="absolute inset-4 rounded-full bg-[#FFF0ED] shadow-md"></div>
                <div className="absolute inset-8 rounded-full bg-[#FCEAE6] shadow-sm flex items-center justify-center">
                  {/* Sacred Mandala Line Artwork */}
                  <svg
                    className="absolute w-full h-full text-[#765B00]/15 animate-[spin_120s_linear_infinite]"
                    fill="none"
                    viewBox="0 0 200 200"
                  >
                    <circle cx="100" cy="100" r="95" stroke="currentColor" strokeDasharray="4 6" strokeWidth="1.5"></circle>
                    <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1"></circle>
                    <polygon points="100,10 120,80 190,100 120,120 100,190 80,120 10,100 80,80" stroke="currentColor" strokeWidth="0.8"></polygon>
                    <polygon points="100,25 115,85 175,100 115,115 100,175 85,115 25,100 85,85" stroke="currentColor" strokeWidth="0.8" transform="rotate(45 100 100)"></polygon>
                  </svg>
                </div>

                {/* Central Official Insignia Seal */}
                <div className="relative z-10 w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-2xl p-1 bg-gradient-to-tr from-[#570013] to-[#800020] flex items-center justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WQx-MZEEhbXqKhoaLkmASOqXQYhn6rji3Ylb67O7tIjwLDMCg2whHyVQRIZVGExCzdkDHbtjL6snEefYtX0KYaioMH_9nERFdB1D3WT6X3XuECoWjUYJusxvOrxRjCbzXN-TvBEzai24ayVJgaUkN3z4unpSmodhE70I3AJ-GlPdBpVenEDdax9fLypAKZDZyx_h8M3429uVYdHljZ0RWuTRRp2JOMJzpgnyFHJFzhRrpos7EULtYq6IT9Qgf08o7zTanUEAqucw"
                    alt="Chaitanya Ved Pratishthan Official Seal"
                    className="w-full h-full object-cover rounded-full shadow-lg"
                  />
                </div>

                {/* Floating Stamp */}
                <div className="absolute -bottom-2 -left-2 bg-white text-[#221918] px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 z-20 border border-[#E0BFBF]/40">
                  <span className="material-symbols-outlined text-[#765B00] text-[20px]">workspace_premium</span>
                  <span className="text-xs font-semibold tracking-wide">
                    {t('home.experience')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE FOUR PILLARS */}
      <section className="w-full bg-[#FFF0ED] py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-[#765B00] uppercase tracking-widest font-semibold">
                चार मुख्य स्तंभ • The Four Pillars
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
                {t('pillars.title')}
              </h2>
            </div>
            <p className="text-sm text-[#584141] max-w-md">
              {t('pillars.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Jyotish */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 border border-[#E0BFBF]/30">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[#FCEAE6] flex items-center justify-center text-[#570013] shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">brightness_high</span>
                </div>
                <div>
                  <span className="text-xs text-[#765B00] font-medium tracking-wide">
                    वेदचक्षु • Astrology
                  </span>
                  <h3 className="font-serif text-lg text-[#221918] font-bold mt-1">
                    {t('pillars.jyotishTitle')}
                  </h3>
                </div>
                <p className="text-sm text-[#584141] leading-relaxed">
                  {t('pillars.jyotishDesc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('jyotish')}
                className="inline-flex items-center gap-1.5 text-sm text-[#570013] hover:text-[#800020] font-semibold pt-2 transition-colors cursor-pointer"
              >
                <span>Consult Scholars</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Pillar 2: Yadnik */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 border border-[#E0BFBF]/30">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[#FCEAE6] flex items-center justify-center text-[#570013] shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">local_fire_department</span>
                </div>
                <div>
                  <span className="text-xs text-[#765B00] font-medium tracking-wide">
                    कर्मकांड • Sacred Rites
                  </span>
                  <h3 className="font-serif text-lg text-[#221918] font-bold mt-1">
                    {t('pillars.yadnikTitle')}
                  </h3>
                </div>
                <p className="text-sm text-[#584141] leading-relaxed">
                  {t('pillars.yadnikDesc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('yadnik-and-pooja')}
                className="inline-flex items-center gap-1.5 text-sm text-[#570013] hover:text-[#800020] font-semibold pt-2 transition-colors cursor-pointer"
              >
                <span>Explore Poojas</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Pillar 3: Gurukul */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 border border-[#E0BFBF]/30">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[#FCEAE6] flex items-center justify-center text-[#570013] shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">school</span>
                </div>
                <div>
                  <span className="text-xs text-[#765B00] font-medium tracking-wide">
                    गुरुकुल • Living Tradition
                  </span>
                  <h3 className="font-serif text-lg text-[#221918] font-bold mt-1">
                    {t('pillars.gurukulTitle')}
                  </h3>
                </div>
                <p className="text-sm text-[#584141] leading-relaxed">
                  {t('pillars.gurukulDesc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('gurukul')}
                className="inline-flex items-center gap-1.5 text-sm text-[#570013] hover:text-[#800020] font-semibold pt-2 transition-colors cursor-pointer"
              >
                <span>Adhyayan Scheme</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Pillar 4: Resources */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 border border-[#E0BFBF]/30">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[#FCEAE6] flex items-center justify-center text-[#570013] shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">menu_book</span>
                </div>
                <div>
                  <span className="text-xs text-[#765B00] font-medium tracking-wide">
                    विनामूल्य ज्ञान • Public Repository
                  </span>
                  <h3 className="font-serif text-lg text-[#221918] font-bold mt-1">
                    {t('pillars.resourcesTitle')}
                  </h3>
                </div>
                <p className="text-sm text-[#584141] leading-relaxed">
                  {t('pillars.resourcesDesc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('resources')}
                className="inline-flex items-center gap-1.5 text-sm text-[#570013] hover:text-[#800020] font-semibold pt-2 transition-colors cursor-pointer"
              >
                <span>Free Downloads</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED POOJAS & SACRAMENTAL CEREMONIES */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-[#765B00] uppercase tracking-widest font-semibold">
                नियत पूजा व अनुष्ठान • Authentic Rituals
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
                Featured Sacramental Ceremonies
              </h2>
            </div>
            <button
              onClick={() => onNavigate('yadnik-and-pooja')}
              className="inline-flex items-center gap-1 text-sm text-[#765B00] hover:text-[#570013] font-semibold transition-colors cursor-pointer"
            >
              <span>View All 24+ Vidhis</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPoojas.map((pooja) => (
              <div
                key={pooja.id}
                className="bg-[#FFF0ED] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between border border-[#E0BFBF]/30 group"
              >
                <div className="h-44 w-full relative overflow-hidden bg-[#FCEAE6]">
                  <img
                    src={pooja.image}
                    alt={pooja.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#570013] text-white text-xs px-2.5 py-1 rounded-md shadow-xs font-semibold">
                    {pooja.categoryLabelMr}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#765B00] font-medium">
                      <span>{pooja.duration}</span>
                      <span className="bg-white px-2 py-0.5 rounded text-[11px] font-semibold text-[#584141] shadow-xs">
                        Ashram & Online
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#570013] leading-snug">
                      {pooja.nameEn}
                    </h4>
                    <p className="text-xs text-[#584141] line-clamp-2 leading-relaxed">
                      {pooja.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#E0BFBF]/30">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#584141] uppercase">Dakshina</span>
                      <span className="text-sm font-bold text-[#221918]">{pooja.priceLabel}</span>
                    </div>
                    <button
                      onClick={() => onNavigate('yadnik-and-pooja', pooja.id)}
                      className="p-2 rounded-lg bg-white text-[#570013] hover:bg-[#570013] hover:text-white transition-colors shadow-xs cursor-pointer"
                      title="View details"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INSTITUTIONAL CREDIBILITY & THREE CORE TENETS */}
      <section className="w-full bg-[#F6E4E1] py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <span className="text-xs text-[#765B00] uppercase tracking-widest font-semibold">
              आमची विचारसरणी • Institutional Integrity
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
              Why Seek Guidance with Chaitanya Ved Pratishthan?
            </h2>
            <p className="text-base text-[#584141] leading-relaxed">
              In an era filled with sensational astrological claims, our trust maintains an austere sanctuary dedicated strictly to shastric discipline, scholarship, and genuine empathy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-xs flex flex-col space-y-3 relative border border-[#E0BFBF]/30">
              <div className="w-10 h-10 rounded-full bg-[#FFDADA] flex items-center justify-center font-bold text-[#570013] font-serif text-lg">
                १
              </div>
              <h3 className="font-serif text-lg text-[#221918] font-bold">Rigorous Shastra Conformance</h3>
              <span className="text-xs text-[#765B00] font-medium">शास्त्रोक्त शुद्धता व निष्ठा</span>
              <p className="text-sm text-[#584141] leading-relaxed">
                Every mantra is voiced with strict swara intonation. Our purohits undergo twelve years of rigorous Shruti study under authorized traditional teachers.
              </p>
              <ul className="pt-2 space-y-1.5 text-xs text-[#221918]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[16px]">check_circle</span>
                  <span>Precise phonetic accuracy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[16px]">check_circle</span>
                  <span>Authentic organic Havana samagri</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-xs flex flex-col space-y-3 relative border border-[#E0BFBF]/30">
              <div className="w-10 h-10 rounded-full bg-[#FFDF94] flex items-center justify-center font-bold text-[#795D00] font-serif text-lg">
                २
              </div>
              <h3 className="font-serif text-lg text-[#221918] font-bold">Ethical & Transparent Counsel</h3>
              <span className="text-xs text-[#765B00] font-medium">पारदर्शक व भयमुक्त मार्गदर्शन</span>
              <p className="text-sm text-[#584141] leading-relaxed">
                We hold zero tolerance for superstitious exploitation. Consultations present clear celestial indicators alongside practical life counsel without exorbitant stone prescriptions.
              </p>
              <ul className="pt-2 space-y-1.5 text-xs text-[#221918]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[16px]">check_circle</span>
                  <span>Published fixed Dakshina structure</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[16px]">check_circle</span>
                  <span>Transparent samkalpa records</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-xs flex flex-col space-y-3 relative border border-[#E0BFBF]/30">
              <div className="w-10 h-10 rounded-full bg-[#F0DFDB] flex items-center justify-center font-bold text-[#584141] font-serif text-lg">
                ३
              </div>
              <h3 className="font-serif text-lg text-[#221918] font-bold">Accessible Heritage for All</h3>
              <span className="text-xs text-[#765B00] font-medium">सुलभ व सर्वसमावेशक परंपरा</span>
              <p className="text-sm text-[#584141] leading-relaxed">
                Spiritual knowledge belongs to everyone. Devotees abroad participate seamlessly via high-definition two-way video sankalpas, accompanied by full Marathi and English commentary.
              </p>
              <ul className="pt-2 space-y-1.5 text-xs text-[#221918]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[16px]">check_circle</span>
                  <span>Global diaspora live sankalpas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#765B00] text-[16px]">check_circle</span>
                  <span>Free downloadable study material</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: GURUKUL & COMMUNITY ACTIVITIES SPOTLIGHT */}
      <section className="w-full bg-[#FFF8F6] py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-[#765B00] uppercase tracking-widest font-semibold">
                गुरुकुल उपक्रम • Community & Vidya
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
                Nurturing Tradition, Serving Society
              </h2>
            </div>
            <p className="text-sm text-[#584141] max-w-md">
              Beyond individual rituals, the Pratishthan funds full-time student bursaries and leads eco-spiritual programs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#FFF0ED] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between border border-[#E0BFBF]/30">
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-[#765B00] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>गुरुकुल वेदपाठ योजना</span>
                </div>
                <h3 className="font-serif text-2xl text-[#570013] font-bold">
                  Preserving Oral Recitation for Future Generations
                </h3>
                <p className="text-sm text-[#584141] leading-relaxed">
                  Our residential students master Samhita, Pada, and Krama recitations alongside modern mathematics and English. Donors sponsor entire academic cohorts through our 80G-certified trust scheme.
                </p>
                <div className="pt-2 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl text-[#570013] font-bold">48+</span>
                    <span className="text-xs text-[#584141]">Full-time Vidyarthis</span>
                  </div>
                  <div className="w-px h-10 bg-[#E0BFBF]"></div>
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl text-[#570013] font-bold">100%</span>
                    <span className="text-xs text-[#584141]">Free Food & Lodging</span>
                  </div>
                </div>
              </div>
              <div className="h-64 w-full bg-[#FCEAE6] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFDxJIEOeesVt62cJRI8eWtLhmrUi2Fia4vQBbcpLrE6emxGdxXnRCX6rXwM_T_XMyuw13sga6qahjZuSaU7au87abF3WR-PRXP_2kD5wQuBlcY29LymwgDzGLROmdblTc8b0N6hZawmbUeCo8M1bWgTknTpPg_gtF3mxXPJ4Kfzx8Jq26FTOBmKe0LzSq2ul75gHfRwKfswMcnXpYEBIWDmEeOp9kSDk-l9IL5yJe8ePlYChH_tC-xA"
                  alt="Vedic Gurukul Vidyarthis studying in courtyard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#FCEAE6] rounded-xl p-6 shadow-xs flex flex-col justify-between flex-1 border border-[#E0BFBF]/30">
                <div className="space-y-2">
                  <span className="text-xs text-[#765B00] font-semibold uppercase">
                    संस्कृत संभाषण शिबीर
                  </span>
                  <h4 className="font-serif text-lg text-[#221918] font-bold">
                    Conversational Sanskrit Weekends
                  </h4>
                  <p className="text-sm text-[#584141] leading-relaxed">
                    Open to enthusiasts of all age groups. Learn to converse, read Subhashitas, and grasp foundational grammar seamlessly.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('gurukul')}
                  className="inline-flex items-center gap-1 text-sm text-[#570013] hover:text-[#800020] font-semibold pt-3 cursor-pointer"
                >
                  <span>View Batch Timetable</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              <div className="bg-[#F6E4E1] rounded-xl p-6 shadow-xs flex flex-col justify-between flex-1 border border-[#E0BFBF]/30">
                <div className="space-y-2">
                  <span className="text-xs text-[#765B00] font-semibold uppercase">
                    वृक्षारोपण व अन्नदान सेवा
                  </span>
                  <h4 className="font-serif text-lg text-[#221918] font-bold">
                    Eco-Spiritual Seva Initiatives
                  </h4>
                  <p className="text-sm text-[#584141] leading-relaxed">
                    Planting indigenous medicinal trees (Audumbar, Bilva, Peepal) around Western Ghats watersheds and daily satvik Prasad distribution.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('events')}
                  className="inline-flex items-center gap-1 text-sm text-[#570013] hover:text-[#800020] font-semibold pt-3 cursor-pointer"
                >
                  <span>Participate in Seva</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="w-full bg-[#FFF0ED] py-16">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12 flex flex-col space-y-10">
          <div className="text-center space-y-1">
            <span className="text-xs text-[#765B00] uppercase tracking-widest font-semibold">
              अनुभव व अभिप्राय • Voices of Trust
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
              Quiet Dignity, Reverent Accuracy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-xs flex flex-col justify-between space-y-4 border border-[#E0BFBF]/30">
              <p className="text-sm text-[#584141] italic leading-relaxed">
                "We arranged the Shatachandi Homa through Chaitanya Ved Pratishthan for my mother’s recovery. What impressed us most was their absolute adherence to time, dignified chanting without loud speakers, and complete transparency in Samagri billing. It felt truly sacred."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFDADA] flex items-center justify-center font-bold text-[#570013] font-serif">
                  DR
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-[#221918] font-bold">Dr. Rajesh Deshmukh</span>
                  <span className="text-xs text-[#584141]">Professor & Researcher, Pune</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-xs flex flex-col justify-between space-y-4 border border-[#E0BFBF]/30">
              <p className="text-sm text-[#584141] italic leading-relaxed">
                "Residing in London, we were worried about conducting our daughter’s Navagraha and Laghurudra pooja properly. The Live Stream was crystal clear; Guruji explained the meaning of each Marathi and Sanskrit mantra so patiently. Highly recommended for families abroad."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFDF94] flex items-center justify-center font-bold text-[#795D00] font-serif">
                  SK
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-[#221918] font-bold">Snehal & Kedar Joshi</span>
                  <span className="text-xs text-[#584141]">Software Architect, London UK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL REASSURING CONSULTATION CALLOUT */}
      <section className="w-full bg-[#FFF8F6] py-14">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-12">
          <div className="relative bg-gradient-to-r from-[#FCEAE6] via-[#F6E4E1] to-[#FCEAE6] p-8 lg:p-12 rounded-2xl shadow-xs border border-[#E0BFBF]/40 overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white shadow-xs">
                  <span className="material-symbols-outlined text-[#765B00] text-[16px]">support_agent</span>
                  <span className="text-xs font-semibold text-[#765B00]">वैयक्तिक मार्गदर्शन व पूजा सल्ला</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
                  Plan Your Sacred Ritual or Astrological Consultation
                </h2>
                <p className="text-sm text-[#584141]">
                  Our scholars are ready to assist you in selecting auspicious dates, explaining Vidhi preparations, and setting up in-person or live-streamed ceremonies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="tel:+919822054321"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-[#570013] text-sm font-semibold shadow-xs hover:bg-[#FFF0ED] transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#765B00]">phone_in_talk</span>
                  <span>+91 98220 54321</span>
                </a>
                <button
                  onClick={() => onNavigate('book-appointment')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#570013] text-white text-sm font-bold shadow-md hover:bg-[#800020] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <span>अपॉइंटमेंट बुक करा</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
