import React from 'react';
import { PoojaService } from '../../types/index.ts';
import { Modal } from '../common/Modal.tsx';

interface PoojaDetailModalProps {
  pooja: PoojaService | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export const PoojaDetailModal: React.FC<PoojaDetailModalProps> = ({
  pooja,
  isOpen,
  onClose,
  onBook,
}) => {
  if (!pooja) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={pooja.nameEn}
      subtitle={pooja.nameMr}
      maxWidth="xl"
    >
      <div className="flex flex-col gap-5">
        {/* Banner Image */}
        <div className="relative h-48 w-full rounded-lg overflow-hidden bg-[#FCEAE6]">
          <img
            src={pooja.image}
            alt={pooja.nameEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className="bg-[#570013] text-white text-xs px-2.5 py-1 rounded font-semibold">
              {pooja.lineage}
            </span>
          </div>
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-[#570013] font-bold text-sm px-3 py-1 rounded shadow-xs">
            {pooja.priceLabel}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-[#570013] uppercase tracking-wider">
            शास्त्रोक्त स्वरूप व विवरण (Description)
          </h4>
          <p className="text-sm text-[#584141] leading-relaxed">
            {pooja.longDescriptionEn}
          </p>
          <p className="text-xs text-[#765B00] italic leading-relaxed bg-[#FFF0ED] p-2.5 rounded-lg border border-[#E0BFBF]/30">
            <strong>मराठी भावार्थ:</strong> {pooja.longDescriptionMr}
          </p>
        </div>

        {/* Quick Spec Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-[#221918]">
          <div className="bg-[#FFF0ED] p-2.5 rounded-lg flex flex-col">
            <span className="text-[10px] text-[#584141] uppercase">Duration</span>
            <span className="font-semibold text-[#570013] mt-0.5">{pooja.duration}</span>
          </div>
          <div className="bg-[#FFF0ED] p-2.5 rounded-lg flex flex-col">
            <span className="text-[10px] text-[#584141] uppercase">Priests</span>
            <span className="font-semibold text-[#570013] mt-0.5">{pooja.pandits}</span>
          </div>
          <div className="bg-[#FFF0ED] p-2.5 rounded-lg flex flex-col">
            <span className="text-[10px] text-[#584141] uppercase">Mode</span>
            <span className="font-semibold text-[#570013] mt-0.5">
              {pooja.mode.includes('online') ? 'Online & Ashram' : 'At Ashram / Home'}
            </span>
          </div>
          <div className="bg-[#FFF0ED] p-2.5 rounded-lg flex flex-col">
            <span className="text-[10px] text-[#584141] uppercase">Samagri</span>
            <span className="font-semibold text-[#765B00] mt-0.5">100% Organic</span>
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-[#570013] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-[#765B00]">star</span>
            <span>प्रमुख फलश्रुती व आध्यात्मिक लाभ (Spiritual Benefits)</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-[#584141]">
            {pooja.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[14px] text-[#765B00] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Included items */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-[#570013] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-[#765B00]">checklist</span>
            <span>विधीमध्ये अंतर्भूत घटक (Included Ritual Protocols)</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-[#584141]">
            {pooja.includedItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[14px] text-[#570013] shrink-0 mt-0.5">
                  task_alt
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#E0BFBF]/30 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#584141]">Seva Dakshina</span>
            <span className="text-lg font-bold text-[#570013]">{pooja.priceLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-[#FFF0ED] text-[#221918] hover:bg-[#FCEAE6] text-xs font-semibold transition-colors cursor-pointer"
            >
              बंद करा
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(pooja.id);
              }}
              className="px-5 py-2.5 rounded-lg bg-[#570013] text-white hover:bg-[#800020] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
              <span>या विधीसाठी संकल्प नोंदवा (Book Now)</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
