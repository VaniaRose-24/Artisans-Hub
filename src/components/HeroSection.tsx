import React from 'react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenStartSelling: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenStartSelling }) => {
  return (
    <section className="relative w-full px-4 md:px-12 py-10 lg:py-16 bg-[#fbf9f4] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-6 z-10"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8e4d32] animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
              A WORLD OF CRAFTSMANSHIP · FAIR TRADE &amp; DIRECT FROM MAKER
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] lg:leading-[1.15] text-[#10271d] font-normal leading-tight tracking-tight">
            Made by Hand. <br />
            <span className="italic font-normal text-[#8e4d32]">Meant to Be Discovered.</span>
          </h1>

          <p className="text-[17px] sm:text-[18px] text-[#424844] max-w-xl font-light leading-relaxed">
            Discover extraordinary handmade creations from independent artisans around the world. Every piece carries a story, a tradition, and the hands that brought it to life.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-[#10271d] text-white font-semibold text-[14px] shadow-md hover:bg-[#263d32] transition-all group cursor-pointer"
            >
              <span>Explore the Marketplace</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
            <button
              onClick={onOpenStartSelling}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#f5f4ef] text-[#8e4d32] font-semibold text-[14px] hover:bg-[#e9e8e3] transition-all cursor-pointer border border-[#e4ded3]"
            >
              <span className="material-symbols-outlined text-lg">storefront</span>
              <span>Share Your Craft</span>
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-2 bg-[#f5f4ef]/80 rounded-xl p-5 border border-[#e4ded3]/80 backdrop-blur-sm">
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl text-[#10271d] font-normal">
                4,200+
              </span>
              <span className="text-[12px] text-[#424844] mt-0.5">Master Artisans</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl text-[#10271d] font-normal">
                38
              </span>
              <span className="text-[12px] text-[#424844] mt-0.5">Heritage Crafts</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl text-[#8e4d32] font-normal">
                100%
              </span>
              <span className="text-[12px] text-[#424844] mt-0.5">Fair Direct Payouts</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Hero Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 relative mt-4 lg:mt-0"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#e9e8e3] border border-[#e4ded3]">
            <img
              alt="Still life in a sunlit rustic studio featuring an authentic terracotta earthenware vase with wild dried grasses, a dark hand-turned wooden bowl with smooth stones, folded hand-dyed indigo ikat fabric, and an ornate vintage brass lamp beside a soft linen tablecloth with warm natural tones."
              className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgls5P-MwCj8StONzPpaLoQPoZ-l4tv2pxLjbjFSX7csmnWeOLmnW5tScTFmM5rSIBKnL655HWXt93Kw8bWP9k-M9Y9l7UKX6rs4DGcyIje_9XxNHODWEs0DZ2_TUGp9lQ4BUwOS04ojUmsDyOMkZLbVufRD9cMN2MDE1UNx-1CLW88Ud_NJdxzy2SJtmmommVFXjHu3bFvj-yP7kWCd924TPm6FpSODl4J50sqhoiUS1wszxE0eDaNA"
            />
            {/* Subtle Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10271d]/75 via-transparent to-transparent pointer-events-none"></div>

            {/* Floating Editorial Spotlight Badge */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#fbf9f4]/95 backdrop-blur-md shadow-lg flex items-start gap-3 border border-[#e4ded3]">
              <div className="p-2 rounded-full bg-[#ffdbce] text-[#370e00] shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
                  Curator's Spotlight
                </span>
                <p className="text-[13px] text-[#1b1c19] font-medium line-clamp-2">
                  Living Earth Terracotta &amp; Indigo Handloom — by Master Devendra, Jaipur
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
