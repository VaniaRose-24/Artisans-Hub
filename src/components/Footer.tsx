import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenStartSelling: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenStartSelling }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#f5f4ef] text-[#1b1c19] pt-12 pb-10 border-t border-[#e4ded3] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#e4ded3]">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                alt="Artisans Hub Brand Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1V6MI3t5xgRtP6ahdj05UHL709gIO30T01MkVJzxyHvaRDlsbF1CNGQz4pGqcsQIVzqJQzQ7_wv6WTulPM8MSI4yfO3A3dX4rPbylJvnNImNnptO0EC6xjP6tkBIeWgxfROcQVqNEh4vlaBe_dfvykJwAoODLj95KgHkF4hDYZ-rlsHkNNnnSi1FzyXWtjoBUjiNsLTX8AtHTL_FO8zb2i2ovOQqQoSPur33YPZ7uyUK1xQFIOSfTJ7T7Gu"
              />
              <span className="font-serif text-2xl text-[#10271d] font-normal tracking-tight">
                Artisans Hub
              </span>
            </div>
            <p className="text-[14px] text-[#424844] leading-relaxed max-w-sm">
              Bridging traditional master craftsmanship and global commerce. Empowering indigenous creators with generative provenance, equitable earnings, and worldwide patrons.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[13px] font-semibold text-[#10271d]">
                Craft Chronicles Newsletter
              </span>
              <p className="text-[12px] text-[#424844]">
                Enter your email for craft stories, heritage profiles &amp; curated studio drops.
              </p>
              {subscribed ? (
                <div className="p-2.5 rounded-lg bg-[#cee9d9] text-[#082016] text-[13px] font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Thank you for subscribing to Craft Chronicles!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#ffffff] text-[13px] text-[#1b1c19] placeholder:text-[#424844]/70 border border-[#e4ded3] focus:border-[#263d32] focus:outline-none transition-all"
                    placeholder="Your email address..."
                    type="email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#263d32] text-white font-semibold text-[13px] hover:bg-[#10271d] transition-colors shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Column: Discover & Shop */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-3">
            <span className="font-serif text-lg text-[#10271d] font-medium mb-1">
              Discover &amp; Shop
            </span>
            <ul className="flex flex-col gap-2 text-[14px] text-[#424844]">
              {['Pottery & Ceramics', 'Handwoven Textiles', 'Woodcraft', 'Brass & Metalwork', 'Traditional Jewelry', 'Sustainable Decor'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column: For Artisans */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-serif text-lg text-[#10271d] font-medium mb-1">
              For Artisans
            </span>
            <ul className="flex flex-col gap-2 text-[14px] text-[#424844]">
              <li>
                <button
                  onClick={onOpenStartSelling}
                  className="hover:text-[#1b1c19] transition-colors font-medium text-[#8e4d32] text-left cursor-pointer"
                >
                  Start Selling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-studio-and-tools')}
                  className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                >
                  AI Photo Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-studio-and-tools')}
                  className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                >
                  Crafts Pricing Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-studio-and-tools')}
                  className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                >
                  Storyteller AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                >
                  Seller Academy &amp; Fair Trade
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column: Trust & Support */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-serif text-lg text-[#10271d] font-medium mb-1">
              Trust &amp; Support
            </span>
            <ul className="flex flex-col gap-2 text-[14px] text-[#424844]">
              <li>
                <button
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                >
                  Global Carbon-Neutral Transit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                >
                  Artisan Direct Payouts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                >
                  Authenticity Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-story')}
                  className="hover:text-[#1b1c19] transition-colors text-left cursor-pointer"
                >
                  Provenance Standards
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#424844] text-[13px]">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2025 Artisans Hub Foundation. All crafts authentic and hand-curated.</span>
            <span className="opacity-40 hidden md:inline">·</span>
            <span className="text-[#8e4d32] font-semibold">Ethical Craft &amp; Fair Wage Pledge Compliant</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('our-story')}
              className="hover:text-[#1b1c19] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('our-story')}
              className="hover:text-[#1b1c19] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate('our-story')}
              className="hover:text-[#1b1c19] transition-colors cursor-pointer"
            >
              Provenance Standards
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
