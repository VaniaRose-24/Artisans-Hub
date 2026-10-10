import React from 'react';
import { motion } from 'motion/react';

interface AiMakerSuiteSectionProps {
  onNavigate: (tab: string) => void;
  onOpenStartSelling: () => void;
}

export const AiMakerSuiteSection: React.FC<AiMakerSuiteSectionProps> = ({
  onNavigate,
  onOpenStartSelling,
}) => {
  return (
    <section className="w-full px-4 md:px-12 py-16 lg:py-20 bg-[#10271d] text-white">
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#263d32] p-8 lg:p-14 relative overflow-hidden shadow-2xl border border-[#4c6457]/40">
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#8e4d32]/25 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#8e4d32] text-white text-[11px] font-semibold tracking-wider uppercase">
                Artisan Guild Companion
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
              Your Craft Deserves <br />
              <span className="italic text-[#ffdea9]">A Wider World.</span>
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#cee9d9] max-w-lg leading-relaxed font-light">
              Empowering traditional craftspeople with modern AI tools. Turn workshop snapshots into studio catalogs, compute fair wage pricing, and share your cultural folklore in multiple languages.
            </p>

            {/* 3 Tool Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-[#ffffff]/10 backdrop-blur-sm border border-[#ffffff]/10">
                <span className="material-symbols-outlined text-[#ffdea9] text-xl">calculate</span>
                <span className="text-[13px] font-semibold text-white">Crafts Calculator</span>
                <span className="text-[11px] text-[#cee9d9]">Honors hours, clay, silk &amp; mastery</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-[#ffffff]/10 backdrop-blur-sm border border-[#ffffff]/10">
                <span className="material-symbols-outlined text-[#ffdea9] text-xl">photo_camera</span>
                <span className="text-[13px] font-semibold text-white">Photo Studio AI</span>
                <span className="text-[11px] text-[#cee9d9]">Magazine-quality catalog lighting</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-lg bg-[#ffffff]/10 backdrop-blur-sm border border-[#ffffff]/10">
                <span className="material-symbols-outlined text-[#ffdea9] text-xl">translate</span>
                <span className="text-[13px] font-semibold text-white">Storyteller AI</span>
                <span className="text-[11px] text-[#cee9d9]">Local folklore to global stories</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenStartSelling}
                className="px-6 py-3.5 rounded-lg bg-[#ffffff] text-[#10271d] hover:bg-[#efeee9] font-semibold text-[14px] transition-colors shadow-md cursor-pointer"
              >
                Start Your Artisan Journey
              </button>
              <button
                onClick={() => onNavigate('ai-studio-and-tools')}
                className="px-6 py-3.5 rounded-lg bg-transparent text-white hover:bg-[#ffffff]/10 font-semibold text-[14px] transition-colors flex items-center gap-2 border border-[#ffffff]/20 cursor-pointer"
              >
                <span>Explore AI Maker Tools</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Side: Graphic UI Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-sm bg-[#ffffff] text-[#1b1c19] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-[#e4ded3]">
              <div className="flex items-center justify-between border-b border-[#efeee9] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8e4d32] text-lg">auto_fix_high</span>
                  <span className="text-[13px] text-[#10271d] font-semibold">
                    AI Studio: Pricing &amp; Story
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#cee9d9] text-[#082016]">
                  Active
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#424844]">Time Invested:</span>
                  <span className="font-semibold text-[#10271d]">18.5 Hours Handloom</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#424844]">Fair Living Wage Index:</span>
                  <span className="font-semibold text-[#10271d]">Tier 1 Certified (₹750/day)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#424844]">Raw Silk + Vegetable Vat:</span>
                  <span className="font-semibold text-[#10271d]">₹2,100</span>
                </div>
                <div className="h-px bg-[#efeee9] my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#10271d] font-bold">Suggested Fair Retail:</span>
                  <span className="font-serif text-xl text-[#8e4d32] font-bold">$78 / ₹6,400</span>
                </div>
              </div>

              <div className="mt-2 p-3 rounded-lg bg-[#f5f4ef] text-xs text-[#424844] leading-relaxed italic border border-[#e4ded3]">
                “This piece preserves the 12th-century Pochampally resist method. Generated provenance card ready for export shipment.”
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
