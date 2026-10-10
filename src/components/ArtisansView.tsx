import React, { useState } from 'react';
import { ARTISANS } from '../data/mockData';
import { Artisan } from '../types';

interface ArtisansViewProps {
  onNavigateToShop: (filter?: string) => void;
}

export const ArtisansView: React.FC<ArtisansViewProps> = ({ onNavigateToShop }) => {
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [commissionSent, setCommissionSent] = useState(false);
  const [commissionForm, setCommissionForm] = useState({
    name: '',
    email: '',
    dimensions: '',
    notes: '',
  });

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommissionSent(true);
    setTimeout(() => {
      setCommissionSent(false);
      setSelectedArtisan(null);
      setCommissionForm({ name: '', email: '', dimensions: '', notes: '' });
    }, 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-10">
      <div className="flex flex-col gap-2 mb-10 border-b border-[#e4ded3] pb-6">
        <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
          Preserving Human Lineage
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#10271d] font-normal">
          Master Artisans of the Guild
        </h1>
        <p className="text-[15px] text-[#424844] max-w-2xl mt-1 leading-relaxed">
          Each artisan is formally verified with genealogical or lifelong master craft certification. 88%+ of all proceeds flow directly to their community bank accounts.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {ARTISANS.map((artisan, index) => (
          <div
            key={artisan.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#ffffff] p-6 md:p-10 rounded-2xl border border-[#e4ded3] shadow-sm ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Portrait Image */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden shadow-md">
              <img
                alt={artisan.name}
                className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                src={artisan.image}
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#fbf9f4]/90 backdrop-blur-sm text-[12px] font-semibold text-[#8e4d32] border border-[#e4ded3]">
                {artisan.experienceYears} Years Practicing
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#10271d]/90 backdrop-blur-xs text-white text-[12px] flex items-center gap-2 border border-[#cee9d9]/20">
                <span className="material-symbols-outlined text-[#b2cdbd] text-sm">verified</span>
                <span className="truncate">{artisan.guildCertification}</span>
              </div>
            </div>

            {/* Narrative & Details */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div>
                <span className="text-[12px] uppercase tracking-wider text-[#8e4d32] font-semibold">
                  {artisan.craft}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#10271d] font-medium mt-1">
                  {artisan.name}
                </h2>
                <span className="text-[14px] text-[#424844] font-medium">
                  {artisan.title} · {artisan.location}
                </span>
              </div>

              <blockquote className="font-serif text-xl italic text-[#10271d] leading-relaxed border-l-3 border-[#8e4d32] pl-4 py-1 bg-[#fbf9f4] rounded-r-lg">
                “{artisan.quote}”
              </blockquote>

              <p className="text-[15px] text-[#424844] leading-relaxed">
                {artisan.bio}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => onNavigateToShop(artisan.name)}
                  className="px-5 py-2.5 rounded-lg bg-[#263d32] text-white text-[13px] font-semibold hover:bg-[#10271d] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">storefront</span>
                  <span>View Handcrafted Catalog</span>
                </button>
                <button
                  onClick={() => setSelectedArtisan(artisan)}
                  className="px-5 py-2.5 rounded-lg bg-[#f5f4ef] text-[#8e4d32] text-[13px] font-semibold hover:bg-[#e9e8e3] transition-colors flex items-center gap-2 border border-[#e4ded3] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  <span>Request Custom Commission</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Commission Dialog */}
      {selectedArtisan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[#ffffff] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#e4ded3] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#efeee9] pb-3">
              <div>
                <h3 className="font-serif text-2xl text-[#10271d]">
                  Commission {selectedArtisan.name}
                </h3>
                <span className="text-[12px] text-[#8e4d32] font-medium">
                  {selectedArtisan.craft} · {selectedArtisan.location}
                </span>
              </div>
              <button
                onClick={() => setSelectedArtisan(null)}
                className="p-1.5 rounded-lg text-[#727974] hover:text-[#1b1c19] hover:bg-[#efeee9] cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {commissionSent ? (
              <div className="p-6 rounded-xl bg-[#cee9d9] text-[#082016] text-center flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-3xl text-[#263d32]">check_circle</span>
                <h4 className="font-serif text-xl font-semibold">Inquiry Dispatched</h4>
                <p className="text-[13px]">
                  Your direct studio inquiry has been forwarded to {selectedArtisan.name}'s workshop coordinator. Expect a response with estimated lead times and raw material feasibility within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCommissionSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Your Name</label>
                  <input
                    required
                    value={commissionForm.name}
                    onChange={(e) => setCommissionForm({ ...commissionForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
                    placeholder="Collector or Interior Architect..."
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Your Email</label>
                  <input
                    required
                    type="email"
                    value={commissionForm.email}
                    onChange={(e) => setCommissionForm({ ...commissionForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
                    placeholder="name@domain.com"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">
                    Desired Specifications / Dimensions
                  </label>
                  <input
                    value={commissionForm.dimensions}
                    onChange={(e) => setCommissionForm({ ...commissionForm, dimensions: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
                    placeholder="e.g. 45cm Vase, or 8-yard Handloom Runner..."
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Notes &amp; Timeline</label>
                  <textarea
                    rows={3}
                    value={commissionForm.notes}
                    onChange={(e) => setCommissionForm({ ...commissionForm, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
                    placeholder="Share specific motifs, color palettes, or context..."
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#efeee9]">
                  <button
                    type="button"
                    onClick={() => setSelectedArtisan(null)}
                    className="px-4 py-2 rounded-lg text-[13px] font-semibold text-[#424844] hover:bg-[#efeee9] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#263d32] text-white text-[13px] font-semibold hover:bg-[#10271d] cursor-pointer"
                  >
                    Send Commission Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
