import React from 'react';
import { motion } from 'motion/react';
import { ARTISANS } from '../data/mockData';

interface MeetMakersSectionProps {
  onNavigate: (tab: string, artisanId?: string) => void;
}

export const MeetMakersSection: React.FC<MeetMakersSectionProps> = ({ onNavigate }) => {
  return (
    <section className="w-full px-4 md:px-12 py-16 lg:py-20 bg-[#f5f4ef] border-t border-[#e4ded3]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
            Provenance &amp; Lineage
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-[#10271d] font-normal">
            Human Hands. Living Traditions.
          </h2>
          <p className="text-[15px] text-[#424844] leading-relaxed">
            Meet the master artisans preserving cultural heritage while building sustainable livelihoods for their communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTISANS.map((artisan, idx) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col bg-[#ffffff] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e4ded3]"
            >
              <div className="h-72 w-full overflow-hidden relative">
                <img
                  alt={artisan.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src={artisan.image}
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#fbf9f4]/90 backdrop-blur-sm text-[12px] text-[#8e4d32] font-semibold border border-[#e4ded3]">
                  {artisan.experienceYears} Years Practicing
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="font-serif text-2xl text-[#10271d] font-medium">
                      {artisan.name}
                    </h3>
                    <span className="text-[12px] text-[#424844] font-medium">
                      {artisan.title} · {artisan.location}
                    </span>
                  </div>
                  <blockquote className="font-serif text-lg italic text-[#1b1c19] font-normal leading-relaxed border-l-2 border-[#8e4d32] pl-3 py-1">
                    “{artisan.quote}”
                  </blockquote>
                </div>

                <button
                  onClick={() => onNavigate('meet-the-artisans', artisan.id)}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#8e4d32] hover:text-[#783c23] transition-colors group cursor-pointer"
                >
                  <span>Visit {artisan.name.split(' ')[0]}'s Studio</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
