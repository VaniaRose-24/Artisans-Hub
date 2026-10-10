import React from 'react';
import { User } from '../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenCommand: () => void;
  onOpenStartSelling: () => void;
  currentUser: User | null;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currency: 'USD' | 'INR';
  setCurrency: (c: 'USD' | 'INR') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenCommand,
  onOpenStartSelling,
  currentUser,
  onLogout,
  searchQuery,
  setSearchQuery,
  currency,
  setCurrency,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f4]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Banner */}
      <div className="bg-[#e9e8e3] py-1 px-4 md:px-12 text-[#424844] font-medium text-[11px] tracking-[0.06em]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="truncate">
            Complimentary global carbon-neutral shipping on curated artisan orders over $150 · Fair trade guaranteed
          </span>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
              className="flex items-center gap-1 cursor-pointer hover:text-[#1b1c19] transition-colors"
            >
              <span>{currency === 'USD' ? 'USD ($)' : 'INR (₹)'}</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#1b1c19] transition-colors">
              <span>English</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-20 md:h-24 max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <img
              alt="Artisans Hub Brand Logo"
              className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V6MI3t5xgRtP6ahdj05UHL709gIO30T01MkVJzxyHvaRDlsbF1CNGQz4pGqcsQIVzqJQzQ7_wv6WTulPM8MSI4yfO3A3dX4rPbylJvnNImNnptO0EC6xjP6tkBIeWgxfROcQVqNEh4vlaBe_dfvykJwAoODLj95KgHkF4hDYZ-rlsHkNNnnSi1FzyXWtjoBUjiNsLTX8AtHTL_FO8zb2i2ovOQqQoSPur33YPZ7uyUK1xQFIOSfTJ7T7Gu"
            />
            <span className="font-serif text-2xl md:text-[28px] text-[#10271d] font-normal tracking-tight">
              Artisans Hub
            </span>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl mx-auto hidden lg:flex flex-col gap-1">
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3 text-[#727974] text-lg pointer-events-none">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentTab !== 'shop') onNavigate('shop');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && currentTab !== 'shop') onNavigate('shop');
              }}
              className="w-full pl-9 pr-14 py-2 bg-[#ffffff] rounded-lg text-[13px] text-[#1b1c19] placeholder:text-[#424844]/70 shadow-[0_4px_20px_-2px_rgba(41,42,39,0.05)] border border-[#e4ded3] focus:border-[#263d32] focus:outline-none transition-all"
              placeholder="Search handmade pottery, handloom ikat, brass crafts, or master artisans..."
              type="text"
            />
            <button
              onClick={onOpenCommand}
              className="absolute right-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#efeee9] text-[#424844] hover:text-[#1b1c19] hover:bg-[#e9e8e3] transition-colors"
              title="Command Palette"
            >
              ⌘K
            </button>
          </div>
          <div className="flex items-center gap-2 pl-1">
            <span className="text-[11px] font-medium text-[#424844]/70">Popular:</span>
            <button
              onClick={() => {
                setSearchQuery('Terracotta');
                onNavigate('shop');
              }}
              className="text-[11px] font-semibold text-[#8e4d32] hover:text-[#783c23] transition-colors"
            >
              Terracotta
            </button>
            <span className="text-[#c2c8c3] text-[10px]">•</span>
            <button
              onClick={() => {
                setSearchQuery('Mulberry Silk');
                onNavigate('shop');
              }}
              className="text-[11px] font-semibold text-[#8e4d32] hover:text-[#783c23] transition-colors"
            >
              Mulberry Silk
            </button>
            <span className="text-[#c2c8c3] text-[10px]">•</span>
            <button
              onClick={() => {
                setSearchQuery('Dhokra Brass');
                onNavigate('shop');
              }}
              className="text-[11px] font-semibold text-[#8e4d32] hover:text-[#783c23] transition-colors"
            >
              Dhokra Brass
            </button>
            <span className="text-[#c2c8c3] text-[10px]">•</span>
            <button
              onClick={() => onNavigate('meet-the-artisans')}
              className="text-[11px] font-semibold text-[#8e4d32] hover:text-[#783c23] transition-colors"
            >
              Heritage Guilds
            </button>
          </div>
        </div>

        {/* Action Buttons: Wishlist, Cart, Profile / Sign In */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="relative p-2 rounded-full text-[#424844] hover:text-[#1b1c19] hover:bg-[#efeee9] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8e4d32] text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2 rounded-full text-[#424844] hover:text-[#1b1c19] hover:bg-[#efeee9] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#263d32] text-white text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 pl-1">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 text-left p-1 rounded-lg hover:bg-[#efeee9] transition-colors group cursor-pointer"
                >
                  <img
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#b2cdbd]"
                    src={currentUser.avatar}
                  />
                  <div className="hidden sm:flex flex-col">
                    <span className="text-[12px] font-semibold text-[#1b1c19] leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-[#8e4d32] flex items-center gap-0.5">
                      {currentUser.mfaEnabled && (
                        <span className="material-symbols-outlined text-[11px] text-[#263d32]">
                          verified_user
                        </span>
                      )}
                      {currentUser.role === 'artisan' ? 'Master Artisan' : 'Collector'}
                    </span>
                  </div>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-[#727974] hover:text-[#ba1a1a] hover:bg-[#efeee9] transition-colors"
                  title="Sign out"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 md:px-4 py-2 rounded-lg font-semibold text-[13px] text-[#1b1c19] hover:bg-[#e9e8e3] transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            <button
              onClick={onOpenStartSelling}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#263d32] text-white font-semibold text-[13px] hover:bg-[#10271d] transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              <span>Start Selling</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subnavigation Bar */}
      <div className="bg-[#f5f4ef] border-t border-[#e4ded3]/70">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          <nav className="flex items-center gap-1 md:gap-2 py-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'explore-crafts', label: 'Explore Crafts' },
              { id: 'shop', label: 'Shop' },
              { id: 'meet-the-artisans', label: 'Meet the Artisans' },
              { id: 'our-story', label: 'Our Story' },
              { id: 'ai-studio-and-tools', label: 'AI Studio & Tools' },
            ].map((nav) => {
              const isActive = currentTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => onNavigate(nav.id)}
                  className={`px-3 md:px-4 py-1.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#263d32] text-white shadow-sm'
                      : 'text-[#424844] hover:text-[#1b1c19] hover:bg-[#e9e8e3]'
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-1.5 text-[#424844] font-medium text-[11px] tracking-wide">
            <span className="material-symbols-outlined text-sm text-[#8e4d32]">verified_user</span>
            <span>Direct Provenance &amp; Artisan Equity</span>
          </div>
        </div>
      </div>
    </header>
  );
};
