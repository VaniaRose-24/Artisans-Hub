import React from 'react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: Set<string>;
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
  currency: 'USD' | 'INR';
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onAddToCart,
  onRemoveFromWishlist,
  currency,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.has(p.id));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#ffffff] shadow-2xl border-l border-[#e4ded3] flex flex-col">
          <div className="p-6 bg-[#f5f4ef] border-b border-[#e4ded3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8e4d32]">favorite</span>
              <h3 className="font-serif text-2xl text-[#10271d]">Saved Artifacts</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#727974] hover:text-[#1b1c19] hover:bg-[#e9e8e3] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {wishlistedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-3 my-auto">
                <span className="material-symbols-outlined text-5xl text-[#c2c8c3]">favorite_border</span>
                <h4 className="font-serif text-xl text-[#10271d]">No saved creations yet</h4>
                <p className="text-[13px] text-[#424844] max-w-xs">
                  Tap the heart icon on any artisan piece in the catalog to curate your private wishlist.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 divide-y divide-[#efeee9]">
                {wishlistedProducts.map((product) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                    <img
                      alt={product.title}
                      className="w-20 h-24 object-cover rounded-lg border border-[#e4ded3] shrink-0"
                      src={product.image}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-serif text-[16px] text-[#10271d] font-semibold">
                            {product.title}
                          </h5>
                          <button
                            onClick={() => onRemoveFromWishlist(product)}
                            className="text-[#727974] hover:text-[#ba1a1a] cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-base">close</span>
                          </button>
                        </div>
                        <span className="text-[11px] text-[#8e4d32] font-medium block">
                          by {product.artisanName} · {product.artisanLocation}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-serif text-base font-semibold text-[#10271d]">
                          {currency === 'USD' ? `$${product.priceUSD}` : `₹${product.priceINR.toLocaleString()}`}
                        </span>

                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onRemoveFromWishlist(product);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#263d32] text-white text-[12px] font-semibold hover:bg-[#10271d] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xs">shopping_bag</span>
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
