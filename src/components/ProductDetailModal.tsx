import React from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  currency: 'USD' | 'INR';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  currency,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#ffffff] rounded-2xl shadow-2xl border border-[#e4ded3] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#f5f4ef] border-b border-[#e4ded3] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8e4d32]">verified</span>
            <span className="text-[12px] uppercase tracking-wider text-[#8e4d32] font-semibold">
              Authentic Provenance Registry
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#727974] hover:text-[#1b1c19] hover:bg-[#e9e8e3] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 overflow-y-auto">
          {/* Left Column: Image */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#efeee9] shadow-md border border-[#e4ded3]">
              <img
                alt={product.altText}
                className="w-full h-full object-cover"
                src={product.image}
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#8e4d32] text-white text-[11px] font-semibold">
                {product.badge}
              </span>
            </div>

            {/* Quick Artisan Attribution Pill */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f5f4ef] border border-[#e4ded3]">
              <img
                alt={product.artisanName}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#e4ded3]"
                src={product.artisanAvatar}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-[13px] text-[#10271d]">
                  {product.artisanName}
                </span>
                <span className="text-[11px] text-[#424844]">
                  {product.artisanLocation} · Master Guild
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Specs */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
                  {product.categoryLabel}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#10271d] font-medium mt-0.5">
                  {product.title}
                </h2>
                <div className="flex items-center gap-3 mt-1 text-[13px] text-[#424844]">
                  <div className="flex items-center gap-1 font-semibold text-[#8e4d32]">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span>{product.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{product.reviewCount} Collector Reviews</span>
                  <span>•</span>
                  <span className="text-[#263d32] font-semibold">
                    {product.stock > 0 ? `${product.stock} Available in Studio` : 'Sold Out'}
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 p-3 rounded-xl bg-[#f5f4ef] border border-[#e4ded3]">
                {currency === 'USD' ? (
                  <>
                    <span className="font-serif text-3xl font-normal text-[#10271d]">
                      ${product.priceUSD}
                    </span>
                    <span className="text-[14px] text-[#424844]">
                      (₹{product.priceINR.toLocaleString()})
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-serif text-3xl font-normal text-[#10271d]">
                      ₹{product.priceINR.toLocaleString()}
                    </span>
                    <span className="text-[14px] text-[#424844]">
                      (${product.priceUSD})
                    </span>
                  </>
                )}
                <span className="ml-auto text-[11px] text-[#263d32] font-semibold px-2 py-0.5 rounded bg-[#cee9d9]">
                  {product.provenanceDetails.fairWagePercentage}% Direct Artisan Equity
                </span>
              </div>

              {/* Story */}
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold text-[#10271d] uppercase tracking-wider">
                  Curatorial Provenance
                </span>
                <p className="text-[14px] text-[#424844] leading-relaxed">
                  {product.story}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#efeee9]">
                <span className="text-[12px] font-semibold text-[#10271d] uppercase tracking-wider">
                  Materiality &amp; Technique
                </span>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div className="p-2.5 rounded-lg bg-[#fbf9f4] border border-[#e4ded3]">
                    <span className="text-[#727974] block">Handcraft Time:</span>
                    <strong className="text-[#10271d]">{product.provenanceDetails.hoursToCraft} Hours Dedicated</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#fbf9f4] border border-[#e4ded3]">
                    <span className="text-[#727974] block">Heritage Tradition:</span>
                    <strong className="text-[#10271d]">{product.provenanceDetails.heritageAge}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#fbf9f4] border border-[#e4ded3]">
                    <span className="text-[#727974] block">Dimensions / Weight:</span>
                    <strong className="text-[#10271d]">{product.dimensions}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#fbf9f4] border border-[#e4ded3]">
                    <span className="text-[#727974] block">Technique:</span>
                    <strong className="text-[#10271d] truncate block">{product.provenanceDetails.technique}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#efeee9]">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={product.stock === 0}
                className="flex-1 py-3 px-6 rounded-xl bg-[#263d32] hover:bg-[#10271d] text-white font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">shopping_bag</span>
                <span>{product.stock === 0 ? 'Currently Sold Out' : 'Acquire for Handcrafted Collection'}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border border-[#e4ded3] transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#ffffff] text-[#ba1a1a] border-[#ba1a1a]'
                    : 'bg-[#ffffff] text-[#1b1c19] hover:bg-[#efeee9]'
                }`}
                title="Wishlist"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
