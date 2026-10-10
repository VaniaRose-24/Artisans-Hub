import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onNavigate: (tab: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.artisanName.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  const navigationCommands = [
    { label: 'Explore Heritage Crafts', tab: 'explore-crafts', icon: 'auto_awesome' },
    { label: 'Shop All Artisan Pieces', tab: 'shop', icon: 'storefront' },
    { label: 'Meet the Master Artisans', tab: 'meet-the-artisans', icon: 'group' },
    { label: 'Read The Craft Journal', tab: 'our-story', icon: 'menu_book' },
    { label: 'AI Studio: Crafts Calculator', tab: 'ai-studio-and-tools', icon: 'calculate' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl bg-[#ffffff] rounded-2xl shadow-2xl border border-[#e4ded3] overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="p-4 border-b border-[#e4ded3] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#727974] text-xl">search</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crafts, master artisans, or jump to a section..."
            className="w-full text-[14px] text-[#1b1c19] placeholder:text-[#424844]/60 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#efeee9] text-[#727974] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-3 flex flex-col gap-4">
          {/* Direct Navigation */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e4d32] px-2">
              Quick Navigation
            </span>
            {navigationCommands.map((cmd) => (
              <button
                key={cmd.tab}
                onClick={() => {
                  onNavigate(cmd.tab);
                  onClose();
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg text-left text-[13px] text-[#1b1c19] hover:bg-[#f5f4ef] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#263d32] text-lg">{cmd.icon}</span>
                <span>{cmd.label}</span>
              </button>
            ))}
          </div>

          {/* Handcrafted Creations */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e4d32] px-2">
              Artifacts &amp; Masterpieces
            </span>
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f5f4ef] transition-colors cursor-pointer"
              >
                <img alt={p.title} className="w-10 h-10 object-cover rounded-md" src={p.image} />
                <div className="flex-1 truncate">
                  <span className="text-[13px] font-medium text-[#10271d] block truncate">
                    {p.title}
                  </span>
                  <span className="text-[11px] text-[#424844]">
                    {p.artisanName} · ${p.priceUSD}
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm text-[#727974]">arrow_forward</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
