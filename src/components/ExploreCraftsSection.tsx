import React from 'react';
import { motion } from 'motion/react';
import { HERITAGE_DISCIPLINES } from '../data/mockData';

interface ExploreCraftsSectionProps {
  onNavigate: (tab: string, categoryFilter?: string) => void;
}

export const ExploreCraftsSection: React.FC<ExploreCraftsSectionProps> = ({ onNavigate }) => {
  return (
    <section className="w-full px-4 md:px-12 py-16 bg-[#f5f4ef] border-t border-[#e4ded3]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
              Traditions Preserved
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#10271d] mt-1 font-medium">
              Explore Heritage Crafts
            </h2>
            <p className="text-[15px] text-[#424844] max-w-xl mt-1 leading-relaxed">
              Centuries of refined techniques passed through generations of master makers across five continents.
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore-crafts')}
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#8e4d32] hover:text-[#783c23] transition-colors group cursor-pointer"
          >
            <span>View All Disciplines</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* 4 Prominent Craft Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HERITAGE_DISCIPLINES.map((discipline, idx) => (
            <motion.div
              key={discipline.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => onNavigate('shop', discipline.id)}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-[#ffffff] shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e4ded3] cursor-pointer"
            >
              <div className="h-64 w-full overflow-hidden relative">
                <img
                  alt={discipline.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={discipline.image}
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#fbf9f4]/90 backdrop-blur-sm text-[11px] text-[#10271d] font-semibold shadow-xs">
                  {discipline.count}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-serif text-[20px] text-[#10271d] font-semibold group-hover:text-[#8e4d32] transition-colors">
                  {discipline.name}
                </h3>
                <p className="text-[13px] text-[#424844] line-clamp-2">
                  {discipline.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Tag Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2 justify-center">
          <span className="text-[12px] text-[#424844] mr-2 font-medium">Specialty Disciplines:</span>
          {[
            'Jewellery & Filigree',
            'Traditional Paintings',
            'Sustainable Home Décor',
            'Fine Embroidery',
            'Vegetable-Tanned Leathercraft',
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => onNavigate('shop', tag)}
              className="px-4 py-1.5 rounded-full bg-[#ffffff] text-[#1b1c19] text-[12px] font-medium border border-[#e4ded3] hover:bg-[#ffdbce] hover:text-[#370e00] transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
