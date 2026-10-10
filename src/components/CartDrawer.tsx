import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => Promise<boolean>;
  currency: 'USD' | 'INR';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency,
}) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const subtotalINR = items.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);
  const artisanDirectPayoutUSD = Math.round(subtotalUSD * 0.88);
  const artisanDirectPayoutINR = Math.round(subtotalINR * 0.88);

  const handleCompleteOrder = async () => {
    setCheckingOut(true);
    const success = await onCheckout();
    setCheckingOut(false);
    if (success) {
      setCheckoutComplete(true);
      setTimeout(() => {
        setCheckoutComplete(false);
        onClose();
      }, 3500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#ffffff] shadow-2xl border-l border-[#e4ded3] flex flex-col">
          {/* Header */}
          <div className="p-6 bg-[#f5f4ef] border-b border-[#e4ded3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#10271d]">shopping_bag</span>
              <h3 className="font-serif text-2xl text-[#10271d]">Your Curated Bag</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#727974] hover:text-[#1b1c19] hover:bg-[#e9e8e3] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {checkoutComplete ? (
              <div className="flex flex-col items-center justify-center p-8 bg-[#cee9d9]/60 rounded-2xl border border-[#b2cdbd] text-center gap-3 my-auto">
                <span className="material-symbols-outlined text-4xl text-[#263d32]">verified</span>
                <h4 className="font-serif text-2xl text-[#10271d] font-semibold">
                  Handcrafted Order Confirmed
                </h4>
                <p className="text-[13px] text-[#082016] leading-relaxed">
                  Your order has been transmitted directly to the rural workshops. 88% of your funds have been credited to the master makers. Real-time stock counts have been synced across the guild.
                </p>
                <span className="text-[11px] font-mono text-[#263d32]">
                  ORDER #{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-3 my-auto">
                <span className="material-symbols-outlined text-5xl text-[#c2c8c3]">shopping_bag</span>
                <h4 className="font-serif text-xl text-[#10271d]">Your bag is empty</h4>
                <p className="text-[13px] text-[#424844] max-w-xs">
                  Discover one-of-a-kind artifacts hand-thrown on wheels and woven on wooden pit-looms.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-lg bg-[#263d32] text-white text-[13px] font-semibold cursor-pointer"
                >
                  Explore Studio Drops
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 divide-y divide-[#efeee9]">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                    <img
                      alt={product.title}
                      className="w-20 h-24 object-cover rounded-lg border border-[#e4ded3] shrink-0"
                      src={product.image}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-serif text-[16px] text-[#10271d] font-semibold leading-tight">
                            {product.title}
                          </h5>
                          <button
                            onClick={() => onRemoveItem(product.id)}
                            className="text-[#727974] hover:text-[#ba1a1a] cursor-pointer"
                            title="Remove"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                        <span className="text-[11px] text-[#8e4d32] font-medium block">
                          by {product.artisanName}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#e4ded3] rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="px-2 py-0.5 text-xs text-[#10271d] hover:bg-[#efeee9] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="px-2 py-0.5 text-xs text-[#10271d] hover:bg-[#efeee9] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-base font-semibold text-[#10271d]">
                          {currency === 'USD'
                            ? `$${product.priceUSD * quantity}`
                            : `₹${(product.priceINR * quantity).toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && !checkoutComplete && (
            <div className="p-6 bg-[#f5f4ef] border-t border-[#e4ded3] flex flex-col gap-3">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#424844]">Subtotal:</span>
                <span className="font-serif text-xl font-bold text-[#10271d]">
                  {currency === 'USD' ? `$${subtotalUSD}` : `₹${subtotalINR.toLocaleString()}`}
                </span>
              </div>

              {/* Artisan Direct Payout Callout */}
              <div className="p-3 rounded-lg bg-[#cee9d9]/70 border border-[#b2cdbd] text-xs text-[#082016] flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#263d32] shrink-0 mt-0.5">
                  handshake
                </span>
                <span>
                  <strong>
                    {currency === 'USD'
                      ? `$${artisanDirectPayoutUSD}`
                      : `₹${artisanDirectPayoutINR.toLocaleString()}`}
                  </strong>{' '}
                  (88%) flows directly to master artisan bank accounts.
                </span>
              </div>

              <button
                onClick={handleCompleteOrder}
                disabled={checkingOut}
                className="w-full py-3.5 rounded-xl bg-[#263d32] hover:bg-[#10271d] text-white font-semibold text-[14px] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">lock</span>
                <span>{checkingOut ? 'Syncing Real-Time Order...' : 'Acquire Handcrafted Pieces'}</span>
              </button>

              <span className="text-[11px] text-center text-[#727974]">
                100% Carbon-Neutral Shipping · Direct Guild Provenance Card Included
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
