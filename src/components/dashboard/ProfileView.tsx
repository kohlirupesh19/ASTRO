import React, { useState } from 'react';
import { useDevotee } from '../../context/DevoteeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, showToast } = useDevotee();
  const { language, t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('');
  const [newMemberNakshatra, setNewMemberNakshatra] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const updatedMembers = [
      ...formData.familyMembers,
      { name: newMemberName.trim(), relation: newMemberRelation.trim(), nakshatra: newMemberNakshatra.trim() },
    ];
    setFormData((p) => ({ ...p, familyMembers: updatedMembers }));
    updateProfile({ familyMembers: updatedMembers });
    setNewMemberName('');
    setNewMemberRelation('');
    setNewMemberNakshatra('');
    showToast('नवीन कुटुंब सदस्य संकल्पासाठी जोडले गेले', 'success');
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#570013] font-bold">
            {language === 'en'
              ? 'My Devotee Profile & Gotra Lineage'
              : language === 'hi'
              ? 'मेरी प्रोफाइल एवं गोत्र विवरण'
              : language === 'gu'
              ? 'મારી પ્રોફાઇલ અને ગોત્ર વિગત'
              : 'माझे प्रोफाईल व गोत्र तपशील'}
          </h1>
          <p className="text-xs sm:text-sm text-[#584141]">
            {language === 'en'
              ? 'Official Gotra and family details utilized for Vedic Sankalpa, Havans, and horoscopy.'
              : 'यज्ञ संकल्प, पूजा व ज्योतिषीय संदर्भासाठी आपले अधिकृत गोत्र व कौटुंबिक तपशील.'}
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">
            {isEditing ? 'close' : 'edit'}
          </span>
          <span>{isEditing ? (language === 'en' ? 'Cancel' : 'रद्द करा') : (language === 'en' ? 'Edit Profile' : 'माहिती संपादित करा')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Details Form (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 lg:p-8 shadow-xs border border-[#E0BFBF]/40 space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-[#E0BFBF]/30">
            <div className="w-16 h-16 rounded-full bg-[#FFD979] text-[#795D00] flex items-center justify-center font-bold font-serif text-2xl shadow-xs">
              RK
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#570013]">
                {profile.name}
              </h2>
              <span className="text-xs text-[#765B00] font-mono font-bold block">
                अधिकृत भक्त संकेतांक: {profile.code}
              </span>
              <span className="text-xs text-[#584141]">{profile.kuladaivat}</span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#584141] block">
                  यजमान नाव
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FFF8F6] px-3 py-2 rounded-lg border border-[#E0BFBF]/40 text-sm text-[#221918] disabled:opacity-75 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#584141] block">
                  गोत्र व प्रवर
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.gotra}
                  onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                  className="w-full bg-[#FFF8F6] px-3 py-2 rounded-lg border border-[#E0BFBF]/40 text-sm text-[#221918] disabled:opacity-75 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#584141] block">
                  जन्म नक्षत्र व चरण
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.nakshatra}
                  onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                  className="w-full bg-[#FFF8F6] px-3 py-2 rounded-lg border border-[#E0BFBF]/40 text-sm text-[#221918] disabled:opacity-75 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#584141] block">
                  चंद्र रास
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.rashi}
                  onChange={(e) => setFormData({ ...formData, rashi: e.target.value })}
                  className="w-full bg-[#FFF8F6] px-3 py-2 rounded-lg border border-[#E0BFBF]/40 text-sm text-[#221918] disabled:opacity-75 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#584141] block">
                  भ्रमणध्वनी (Mobile)
                </label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FFF8F6] px-3 py-2 rounded-lg border border-[#E0BFBF]/40 text-sm text-[#221918] disabled:opacity-75 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#584141] block">
                  ईमेल पत्ता (Email)
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FFF8F6] px-3 py-2 rounded-lg border border-[#E0BFBF]/40 text-sm text-[#221918] disabled:opacity-75 focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold uppercase text-[#584141] block">
                  निवास पत्ता (प्रसाद टपाल वितरणासाठी)
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#FFF8F6] px-3 py-2 rounded-lg border border-[#E0BFBF]/40 text-sm text-[#221918] disabled:opacity-75 focus:outline-none"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#570013] text-white text-xs font-bold hover:bg-[#800020] shadow-xs cursor-pointer"
                >
                  बदल जतन करा (Save Changes)
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Right (4 cols): Family members for Sankalpa */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-xs border border-[#E0BFBF]/40 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E0BFBF]/30">
            <h3 className="font-serif text-base font-bold text-[#570013]">
              कुटुंब सदस्य (Sankalpa Family)
            </h3>
            <span className="material-symbols-outlined text-[#765B00] text-xl">family_restroom</span>
          </div>
          <p className="text-xs text-[#584141]">
            प्रत्येक अनुष्ठान व होमामध्ये या सदस्यांचा नामोच्चार व संकल्प केला जातो.
          </p>

          <div className="space-y-2 text-xs">
            {formData.familyMembers.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#FFF0ED] border border-[#E0BFBF]/30 flex flex-col space-y-0.5"
              >
                <span className="font-bold text-[#221918]">{m.name}</span>
                <span className="text-[11px] text-[#584141]">
                  {m.relation} • नक्षत्र: {m.nakshatra}
                </span>
              </div>
            ))}
          </div>

          {/* Add Member inline form */}
          <form onSubmit={handleAddMember} className="pt-3 border-t border-[#E0BFBF]/30 space-y-2 text-xs">
            <span className="font-bold text-[#570013] block">+ नवीन सदस्य जोडा</span>
            <input
              type="text"
              placeholder="नाव"
              required
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="w-full bg-[#FFF8F6] p-2 rounded border border-[#E0BFBF]/40"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="नाते (उदा. कन्या)"
                value={newMemberRelation}
                onChange={(e) => setNewMemberRelation(e.target.value)}
                className="bg-[#FFF8F6] p-2 rounded border border-[#E0BFBF]/40"
              />
              <input
                type="text"
                placeholder="नक्षत्र"
                value={newMemberNakshatra}
                onChange={(e) => setNewMemberNakshatra(e.target.value)}
                className="bg-[#FFF8F6] p-2 rounded border border-[#E0BFBF]/40"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded bg-[#765B00] text-white font-bold hover:opacity-90 transition-opacity cursor-pointer mt-1"
            >
              सदस्य जोडा
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
