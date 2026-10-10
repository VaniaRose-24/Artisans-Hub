import React, { useState } from 'react';
import { Product } from '../types';

interface StartSellingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => Promise<void>;
}

export const StartSellingModal: React.FC<StartSellingModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    artisanName: '',
    location: '',
    discipline: 'pottery' as Product['category'],
    title: '',
    materials: '',
    hoursToCraft: 12,
    priceUSD: 95,
    story: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbF-iVkeLaithc8XoNDQG924BFZBWQB_fNqZbYjpa016qg9-8DRJ9yDri0qiXy5fWQ97sY2gwFrGY0DS339bm5TAqoIyLCdxy8KRG_RqzpgMam67SNYEdVmJXOPtjReH1-QUVUsFeXwEY5Y7Yq_l27rnlqPLRUV9nWYAjEXVJp7logh-mQSgrfLm_U9NQEZp35L6-yonZYtr1oagP1GT3BgK6WM0W2pWl2I8lSYyE_izBN8qGfCNNLeQ',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newPiece: Omit<Product, 'id'> = {
      title: formData.title || 'Handcrafted Studio Artifact',
      category: formData.discipline,
      categoryLabel: formData.discipline === 'pottery' ? 'Pottery & Ceramics' : 'Textiles & Weaving',
      badge: 'New Studio Drop',
      priceUSD: Number(formData.priceUSD),
      priceINR: Math.round(Number(formData.priceUSD) * 82),
      artisanId: `artisan-${Date.now()}`,
      artisanName: formData.artisanName || 'Master Maker',
      artisanLocation: formData.location || 'Rural Atelier',
      artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewCount: 1,
      image: formData.image,
      altText: formData.title,
      stock: 3,
      leadTime: 'Crafted to order',
      materials: formData.materials.split(',').map((s) => s.trim()),
      dimensions: 'Hand-shaped · Custom proportions',
      provenanceDetails: {
        technique: 'Traditional hand lineage execution',
        heritageAge: 'Guild verified generational technique',
        fairWagePercentage: 88,
        hoursToCraft: Number(formData.hoursToCraft),
      },
      story: formData.story || 'Formed by hand using ancestral tools and natural mineral finishes.',
    };

    await onAddProduct(newPiece);
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-[#ffffff] rounded-2xl shadow-2xl border border-[#e4ded3] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 bg-[#f5f4ef] border-b border-[#e4ded3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8e4d32] text-2xl">storefront</span>
            <div>
              <h3 className="font-serif text-2xl text-[#10271d]">Artisan Guild Onboarding</h3>
              <p className="text-[12px] text-[#424844]">Join 4,200+ Master Makers with Direct Fair Trade</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#727974] hover:text-[#1b1c19] hover:bg-[#e9e8e3] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          {submitted ? (
            <div className="p-8 text-center flex flex-col items-center gap-3 my-auto">
              <span className="material-symbols-outlined text-4xl text-[#263d32]">check_circle</span>
              <h4 className="font-serif text-2xl text-[#10271d] font-semibold">
                Studio Artifact Published!
              </h4>
              <p className="text-[13px] text-[#424844]">
                Your creation has been synchronized across the global marketplace. Global collectors can now inspect its provenance and acquire it directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Your Name</label>
                  <input
                    required
                    value={formData.artisanName}
                    onChange={(e) => setFormData({ ...formData, artisanName: e.target.value })}
                    placeholder="e.g. Master Devendra"
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] focus:outline-none focus:border-[#263d32]"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Studio Location</label>
                  <input
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] focus:outline-none focus:border-[#263d32]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#10271d]">Artifact Title</label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Hand-Thrown Ochre Amphora"
                  className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] focus:outline-none focus:border-[#263d32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Craft Discipline</label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] focus:outline-none"
                  >
                    <option value="pottery">Pottery &amp; Ceramics</option>
                    <option value="textiles">Textiles &amp; Handloom</option>
                    <option value="metalwork">Metalwork &amp; Brass</option>
                    <option value="woodcraft">Woodcraft &amp; Carving</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Retail Price (USD $)</label>
                  <input
                    type="number"
                    required
                    value={formData.priceUSD}
                    onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] focus:outline-none focus:border-[#263d32]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#10271d]">
                  Natural Materials (comma-separated)
                </label>
                <input
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  placeholder="River Clay, Natural Ochre, Wood Fired"
                  className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] focus:outline-none focus:border-[#263d32]"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#10271d]">Crafting Story &amp; Oral Tradition</label>
                <textarea
                  rows={3}
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Share the generational techniques, firing methods, or folklore behind this artifact..."
                  className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] focus:outline-none focus:border-[#263d32]"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#cee9d9]/70 border border-[#b2cdbd] text-xs text-[#082016] flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#263d32]">verified</span>
                <span>Artisan direct payout guaranteed: 88% of retail value credited upon shipment.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-[#263d32] text-white font-semibold text-[14px] hover:bg-[#10271d] transition-colors cursor-pointer disabled:opacity-50 mt-1 shadow-sm"
              >
                {submitting ? 'Registering with Guild...' : 'Submit & Publish Studio Drop'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
