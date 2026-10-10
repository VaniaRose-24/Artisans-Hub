import React, { useState, useMemo } from 'react';
import { Product } from '../types';

interface ShopViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  initialCategory?: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currency: 'USD' | 'INR';
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  initialCategory = 'all',
  searchQuery,
  setSearchQuery,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'pottery', label: 'Pottery & Ceramics' },
    { id: 'textiles', label: 'Textiles & Weaving' },
    { id: 'metalwork', label: 'Metalwork & Brass' },
    { id: 'woodcraft', label: 'Woodcraft & Carving' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          // Check specialty keywords
          const matchedTag = p.materials.some((m) =>
            m.toLowerCase().includes(selectedCategory.toLowerCase())
          ) || p.badge.toLowerCase().includes(selectedCategory.toLowerCase());
          if (!matchedTag) return false;
        }
        // Search query
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const match =
            p.title.toLowerCase().includes(q) ||
            p.artisanName.toLowerCase().includes(q) ||
            p.categoryLabel.toLowerCase().includes(q) ||
            p.materials.some((m) => m.toLowerCase().includes(q));
          if (!match) return false;
        }
        // Max price filter (USD)
        if (p.priceUSD > maxPrice) return false;
        // In stock only
        if (inStockOnly && p.stock <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-10">
      {/* Editorial Header */}
      <div className="flex flex-col gap-2 mb-8 border-b border-[#e4ded3] pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8e4d32]"></span>
          <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
            Direct Provenance Marketplace
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl text-[#10271d] font-normal">
              Curated Artisan Catalog
            </h1>
            <p className="text-[15px] text-[#424844] max-w-2xl mt-1">
              Browse authentic, individually crafted artifacts direct from rural workshops. Each order funds fair artisan wages and offsets global carbon emissions.
            </p>
          </div>
          <span className="text-[13px] text-[#424844] font-medium whitespace-nowrap">
            Showing <strong className="text-[#10271d]">{filteredProducts.length}</strong> creations
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-6 p-5 rounded-2xl bg-[#ffffff] border border-[#e4ded3] h-fit">
          <div className="flex items-center justify-between border-b border-[#efeee9] pb-3">
            <span className="font-serif text-lg text-[#10271d] font-semibold">Filter Crafts</span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(200);
                setInStockOnly(false);
                setSearchQuery('');
              }}
              className="text-[11px] font-semibold text-[#8e4d32] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>

          {/* Search inside catalog */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-[#10271d]">Search Catalog</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-2.5 text-[#727974] text-base">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Keywords, clay, silk..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
              />
            </div>
          </div>

          {/* Craft Discipline */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-[#10271d]">Craft Discipline</label>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-[#cee9d9] text-[#082016] font-semibold'
                      : 'text-[#424844] hover:bg-[#f5f4ef]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && (
                    <span className="material-symbols-outlined text-sm">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Range */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-[#10271d]">Max Price:</span>
              <span className="font-serif text-[#8e4d32] font-semibold">
                ${maxPrice} USD (₹{maxPrice * 82})
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#263d32] w-full cursor-pointer"
            />
          </div>

          {/* In stock toggle */}
          <label className="flex items-center gap-2 cursor-pointer pt-2 border-t border-[#efeee9]">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-[#263d32] cursor-pointer"
            />
            <span className="text-[13px] text-[#1b1c19] font-medium">In Studio / Ready to Ship</span>
          </label>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Top Sort Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#ffffff] p-3 rounded-xl border border-[#e4ded3]">
            <div className="flex items-center gap-2 text-[13px] text-[#424844]">
              <span>Discipline:</span>
              <span className="font-semibold text-[#10271d] capitalize">
                {selectedCategory === 'all' ? 'All Pieces' : selectedCategory}
              </span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-[12px] text-[#424844]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg border border-[#e4ded3] bg-[#fbf9f4] text-[13px] text-[#10271d] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Curator's Choice</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 bg-[#ffffff] rounded-2xl border border-[#e4ded3] text-center gap-3">
              <span className="material-symbols-outlined text-4xl text-[#727974]">search_off</span>
              <h3 className="font-serif text-xl text-[#10271d]">No creations match your filter</h3>
              <p className="text-[14px] text-[#424844] max-w-md">
                Try widening your price range or resetting discipline filters to discover authentic handmade pieces.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxPrice(200);
                  setInStockOnly(false);
                  setSearchQuery('');
                }}
                className="mt-2 px-5 py-2 rounded-lg bg-[#263d32] text-white text-[13px] font-semibold cursor-pointer"
              >
                Show All Crafts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlistIds.has(product.id);
                return (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-[#ffffff] rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e4ded3]"
                  >
                    <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#efeee9]">
                      <img
                        alt={product.altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        src={product.image}
                        onClick={() => onSelectProduct(product)}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#8e4d32] text-white text-[11px] font-semibold shadow-xs">
                        {product.badge}
                      </span>
                      {product.stock <= 5 && (
                        <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#10271d]/90 text-[#cee9d9] text-[10px] font-semibold backdrop-blur-xs">
                          {product.stock > 0 ? `${product.stock} in Studio` : 'Sold Out'}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product);
                        }}
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

                    <div className="pt-4 flex flex-col gap-2 flex-1">
                      <div className="flex items-center justify-between text-[12px] text-[#424844]">
                        <span className="truncate">{product.artisanName}</span>
                        <div className="flex items-center gap-1 font-semibold text-[#4a3407] shrink-0">
                          <span
                            className="material-symbols-outlined text-sm text-[#8e4d32]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h4
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-[18px] text-[#10271d] font-semibold group-hover:text-[#8e4d32] transition-colors cursor-pointer"
                      >
                        {product.title}
                      </h4>

                      <div className="flex items-center justify-between pt-2 mt-auto border-t border-[#efeee9]">
                        <div className="flex items-baseline gap-1.5">
                          {currency === 'USD' ? (
                            <>
                              <span className="font-serif text-xl text-[#10271d] font-normal">
                                ${product.priceUSD}
                              </span>
                              <span className="text-[11px] text-[#424844]">
                                (₹{product.priceINR.toLocaleString()})
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="font-serif text-xl text-[#10271d] font-normal">
                                ₹{product.priceINR.toLocaleString()}
                              </span>
                              <span className="text-[11px] text-[#424844]">
                                (${product.priceUSD})
                              </span>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => onAddToCart(product)}
                          disabled={product.stock === 0}
                          className="px-3.5 py-1.5 rounded-lg bg-[#263d32] text-white text-[12px] font-semibold hover:bg-[#10271d] transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40"
                        >
                          <span className="material-symbols-outlined text-sm">shopping_bag</span>
                          <span>{product.stock === 0 ? 'Sold' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
