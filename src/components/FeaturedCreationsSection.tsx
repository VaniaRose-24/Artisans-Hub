import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface FeaturedCreationsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onNavigate: (tab: string) => void;
  currency: 'USD' | 'INR';
}

export const FeaturedCreationsSection: React.FC<FeaturedCreationsSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigate,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Pieces' },
    { id: 'pottery', label: 'Pottery' },
    { id: 'textiles', label: 'Textiles' },
    { id: 'metalwork', label: 'Brassware' },
    { id: 'woodcraft', label: 'Woodcraft' },
    { id: 'jewelry', label: 'Jewelry' },
  ];

  return (
    <section className="w-full px-4 md:px-12 py-16 lg:py-20 bg-[#fbf9f4]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
              Studio Drops
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#10271d] mt-1 font-medium">
              Featured Creations
            </h2>
            <p className="text-[15px] text-[#424844] max-w-xl mt-1 leading-relaxed">
              Each one-of-a-kind piece is crafted by hand, inspected for provenance, and shipped directly from the artisan's studio.
            </p>
          </div>

          {/* Filter Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-[13px] font-semibold shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#263d32] text-white shadow-xs'
                      : 'bg-[#efeee9] text-[#424844] hover:bg-[#e9e8e3] hover:text-[#1b1c19]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Detailed Artisan Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.has(product.id);
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group flex flex-col bg-[#ffffff] rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e4ded3]"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#efeee9]">
                  <img
                    alt={product.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    src={product.image}
                    onClick={() => onSelectProduct(product)}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#8e4d32] text-white text-[11px] font-semibold tracking-wide shadow-xs">
                    {product.badge}
                  </span>

                  {/* Stock tag */}
                  {product.stock <= 5 && (
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#10271d]/85 text-[#cee9d9] text-[10px] font-medium backdrop-blur-xs">
                      Only {product.stock} left in studio
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    aria-label="Add to wishlist"
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all backdrop-blur-sm cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#ffffff] text-[#ba1a1a] shadow-md'
                        : 'bg-[#ffffff]/80 text-[#1b1c19] hover:bg-[#ffffff] hover:text-[#ba1a1a]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        alt={product.artisanName}
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-[#e4ded3]"
                        src={product.artisanAvatar}
                      />
                      <span className="text-[12px] text-[#424844] font-medium">
                        {product.artisanName} · {product.artisanLocation}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#4a3407] text-[12px] font-semibold">
                      <span
                        className="material-symbols-outlined text-sm text-[#8e4d32]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-[19px] text-[#10271d] font-semibold group-hover:text-[#8e4d32] transition-colors cursor-pointer"
                  >
                    {product.title}
                  </h4>

                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <div className="flex items-baseline gap-2">
                      {currency === 'USD' ? (
                        <>
                          <span className="font-serif text-2xl text-[#10271d] font-normal">
                            ${product.priceUSD}
                          </span>
                          <span className="text-[12px] text-[#424844]">
                            (₹{product.priceINR.toLocaleString()})
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-serif text-2xl text-[#10271d] font-normal">
                            ₹{product.priceINR.toLocaleString()}
                          </span>
                          <span className="text-[12px] text-[#424844]">
                            (${product.priceUSD})
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock === 0}
                      className="px-4 py-2 rounded-lg bg-[#263d32] text-white text-[13px] font-semibold hover:bg-[#10271d] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                      <span>{product.stock === 0 ? 'Sold Out' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Discovery CTA */}
        <div className="flex justify-center pt-6">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[#e9e8e3] hover:bg-[#e4e2de] text-[#10271d] font-semibold text-[14px] transition-colors shadow-xs cursor-pointer"
          >
            <span>Discover More Creations (1,480+ Available)</span>
            <span className="material-symbols-outlined text-lg">tune</span>
          </button>
        </div>
      </div>
    </section>
  );
};
