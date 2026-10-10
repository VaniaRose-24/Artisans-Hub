import React from 'react';
import { motion } from 'motion/react';

export const WhyArtisansHubSection: React.FC = () => {
  const pillars = [
    {
      icon: 'verified',
      iconBg: 'bg-[#cee9d9]',
      iconColor: 'text-[#10271d]',
      title: 'Authentic Provenance',
      desc: 'Every master artisan is verified through physical guild inspections and generational heritage criteria. No mass factory replicas.'
    },
    {
      icon: 'payments',
      iconBg: 'bg-[#ffdbce]',
      iconColor: 'text-[#8e4d32]',
      title: 'Fair-Trade Direct Payouts',
      desc: 'Over 85% of purchase proceeds flow straight to artisan bank accounts, cutting out manipulative middlemen and export traders.'
    },
    {
      icon: 'smart_toy',
      iconBg: 'bg-[#ffdea9]',
      iconColor: 'text-[#4a3407]',
      title: 'AI Maker Empowerment',
      desc: 'Proprietary AI tools help indigenous makers photograph, calculate fair pricing, and translate local stories for global collectors.'
    },
    {
      icon: 'eco',
      iconBg: 'bg-[#e9e8e3]',
      iconColor: 'text-[#10271d]',
      title: 'Carbon-Neutral Transit',
      desc: 'Curated plastic-free kraft packaging and 100% carbon-offset transit directly from remote workshops to 60+ countries worldwide.'
    }
  ];

  return (
    <section className="w-full px-4 md:px-12 py-16 lg:py-20 bg-[#f5f4ef] border-t border-[#e4ded3]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
            The Direct Promise
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-[#10271d] font-normal">
            Why Artisans Hub?
          </h2>
          <p className="text-[15px] text-[#424844] leading-relaxed">
            We rebuilt global craft trade from the roots up—ensuring the master maker is valued, respected, and directly compensated.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#e4ded3] hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${pillar.iconBg} flex items-center justify-center ${pillar.iconColor}`}>
                <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
              </div>
              <h3 className="font-serif text-xl text-[#10271d] font-semibold">
                {pillar.title}
              </h3>
              <p className="text-[13px] text-[#424844] leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
