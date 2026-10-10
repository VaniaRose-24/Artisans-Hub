import React, { useState } from 'react';
import { HERITAGE_DISCIPLINES } from '../data/mockData';

interface CraftsViewProps {
  onNavigateToShop: (discipline: string) => void;
}

export const CraftsView: React.FC<CraftsViewProps> = ({ onNavigateToShop }) => {
  const [activeTab, setActiveTab] = useState<string>('pottery');

  const detailedDisciplines: Record<string, {
    title: string;
    subtitle: string;
    lineageHistory: string;
    rawMaterials: string[];
    technicalProcesses: string[];
    regions: string[];
    preservationNote: string;
  }> = {
    pottery: {
      title: 'Pottery & Ceramics',
      subtitle: 'Living Earth, Pure Quartz & High-Fire Kilns',
      lineageHistory: 'Traced back over five millennia through the Indus Valley Civilization, traditional Indian earthenware and Persian-derived Jaipur Blue Pottery embody humanity’s earliest transformation of earth into sacred functional form.',
      rawMaterials: ['Alluvial River Clay', 'Mined Quartz Sand', 'Fuller’s Earth (Multani Mitti)', 'Vegetable Katira Gum', 'Natural Cobalt & Copper Oxides'],
      technicalProcesses: ['Balanced Wooden Kick-Wheel Throwing', 'Non-Clay Quartz Dough Hand-Molding', 'Oxide Pigment Miniature Painting', 'Wood & Charcoal Muffle Kiln Firing (850°C - 1000°C)'],
      regions: ['Jaipur (Blue Pottery)', 'Khurja (Glazed Stoneware)', 'Terracotta of Gorakhpur', 'Manamadurai (Clay Pot Lineage)'],
      preservationNote: 'Every ceramic studio is certified plastic-free, using non-toxic food-safe mineral glazes made from crushed stones and river salts.'
    },
    textiles: {
      title: 'Textiles & Handloom Weaving',
      subtitle: 'Mathematical Verse, Wild Mulberry Silk & Natural Vats',
      lineageHistory: 'Handloom weaving represents India’s second-largest livelihood after agriculture. Pochampally Ikat, Bagru Dabu resist, and Banarasi brocades preserve ancestral geometric codes passed through song.',
      rawMaterials: ['Raw Mulberry Silk Filaments', 'Wild Tussar Fibers', 'Rain-fed Organic Cotton', 'Natural Fermented Indigo', 'Madder Root (Manjistha)', 'Pomegranate Rinds'],
      technicalProcesses: ['Oral Verse Warp-Tie Calculations', 'Double-Ikat Pit Loom Weaving', 'Teakwood Hand-Block Stamping', 'Riverbed Sun Bleaching & Cold Mud Resist'],
      regions: ['Pochampally (Telangana)', 'Bagru & Sanganer (Rajasthan)', 'Varanasi (Silk Brocades)', 'Chanderi (Madhya Pradesh)'],
      preservationNote: 'Our master handlooms reject motorized fly-shuttles, ensuring zero carbon footprint and unmatched textural density.'
    },
    metalwork: {
      title: 'Metalwork & Brassware',
      subtitle: 'Lost-Wax Metallurgy & Chiseled Relief',
      lineageHistory: 'Moradabad, known globally as the Brass City (Peetal Nagri), alongside the tribal Dhokra casters of Bastar, carry continuous casting techniques unchanged since the Bronze Age.',
      rawMaterials: ['Virgin Bell Metal (Bronze)', 'Sand-Cast Brass Alloy', 'Pure Beeswax & Dammar Resin', 'River Clay & Rice Chaff Molds'],
      technicalProcesses: ['Lost-Wax (Cire Perdue) Core Shaping', 'Molten Crucible Pouring at 1,000°C', 'Tempered Steel Relief Chiseling', 'Charcoal & Lemon Natural Burnishing'],
      regions: ['Moradabad (Embossed Brass)', 'Bastar & Kondagaon (Dhokra)', 'Swamimalai (Bronze Icons)', 'Thanjavur (Art Plates)'],
      preservationNote: 'Every brass piece is hand-hewn without industrial stamping presses, giving each artifact singular character and lifelong heirloom durability.'
    },
    woodcraft: {
      title: 'Woodcraft & Architectural Carving',
      subtitle: 'Seasoned Teak, Walnut Filigree & Beeswax Finishes',
      lineageHistory: 'From the intricate jali screens of Saharanpur to the relief carvings of Ubud and Kashmir’s walnut root carving, master woodworkers coax botanical geometry from seasoned native timber.',
      rawMaterials: ['Reclaimed Architectural Teak', 'Slow-Grown Wild Walnut', 'Rosewood & Shisham', 'Cold-Pressed Linseed Oil & Organic Beeswax'],
      technicalProcesses: ['Multi-Year Timber Seasoning', 'Double-Hand Gouge Chiseled Relief', 'Precision Mortise & Tenon Joinery', 'Hand-Polishing with Agate Stones'],
      regions: ['Saharanpur (Jali Openwork)', 'Ubud (Balinese Botanical Relief)', 'Srinagar (Walnut Root Filigree)', 'Sankheda (Lacquered Teak)'],
      preservationNote: 'Zero freshly felled virgin timber. All wood is sourced from certified reclaimed architectural structures or government-licensed sustainable plantations.'
    }
  };

  const currentDetails = detailedDisciplines[activeTab] || detailedDisciplines.pottery;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-10">
      <div className="flex flex-col gap-2 mb-8 border-b border-[#e4ded3] pb-6">
        <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
          Encyclopedic Guild Registry
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#10271d] font-normal">
          Centuries of Heritage Crafts
        </h1>
        <p className="text-[15px] text-[#424844] max-w-2xl mt-1 leading-relaxed">
          Deep-dive into the lineage, geological materials, and complex hand techniques preserved by independent artisan guilds worldwide.
        </p>
      </div>

      {/* Discipline Selector Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 border-b border-[#efeee9] scrollbar-none">
        {HERITAGE_DISCIPLINES.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveTab(d.id)}
            className={`px-5 py-2.5 rounded-xl text-[14px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === d.id
                ? 'bg-[#10271d] text-white shadow-md'
                : 'bg-[#ffffff] text-[#424844] hover:bg-[#e9e8e3] border border-[#e4ded3]'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Main Discipline Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#ffffff] p-6 md:p-10 rounded-2xl border border-[#e4ded3] shadow-sm">
        {/* Left Column: Lineage Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-[12px] uppercase tracking-wider text-[#8e4d32] font-semibold">
              Heritage Deep-Dive
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#10271d] mt-1 font-medium">
              {currentDetails.title}
            </h2>
            <h3 className="font-serif text-lg text-[#8e4d32] italic mt-0.5">
              {currentDetails.subtitle}
            </h3>
          </div>

          <p className="text-[15px] text-[#424844] leading-relaxed">
            {currentDetails.lineageHistory}
          </p>

          {/* Technical Processes */}
          <div className="flex flex-col gap-3 pt-2">
            <h4 className="text-[13px] font-semibold text-[#10271d] uppercase tracking-wider">
              Traditional Hand Techniques
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentDetails.technicalProcesses.map((proc, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-[#f5f4ef] border border-[#e4ded3]">
                  <span className="material-symbols-outlined text-sm text-[#8e4d32] mt-0.5">check_circle</span>
                  <span className="text-[13px] text-[#1b1c19] font-medium">{proc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Raw Materials */}
          <div className="flex flex-col gap-2 pt-2">
            <h4 className="text-[13px] font-semibold text-[#10271d] uppercase tracking-wider">
              Natural Raw Materials
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentDetails.rawMaterials.map((mat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#fbf9f4] text-[#1b1c19] text-[12px] font-medium border border-[#e4ded3]"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Provenance note */}
          <div className="p-4 rounded-xl bg-[#cee9d9]/60 border border-[#b2cdbd] text-[13px] text-[#082016] flex items-start gap-3 mt-2">
            <span className="material-symbols-outlined text-[#263d32] text-xl">shield_with_heart</span>
            <p className="leading-relaxed">{currentDetails.preservationNote}</p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateToShop(activeTab)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#263d32] text-white font-semibold text-[14px] hover:bg-[#10271d] transition-colors shadow-sm cursor-pointer"
            >
              <span>Explore {currentDetails.title} in Catalog</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right Column: Key Geographic Hubs & Imagery */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-xl overflow-hidden border border-[#e4ded3] shadow-md">
            <img
              alt={currentDetails.title}
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
              src={HERITAGE_DISCIPLINES.find((d) => d.id === activeTab)?.image}
            />
          </div>

          <div className="p-5 rounded-xl bg-[#f5f4ef] border border-[#e4ded3] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8e4d32]">public</span>
              <span className="font-serif text-lg text-[#10271d] font-semibold">
                Major Lineage Clusters
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {currentDetails.regions.map((reg, idx) => (
                <div key={idx} className="flex items-center justify-between text-[13px] py-1 border-b border-[#e4ded3]/60 last:border-none">
                  <span className="font-medium text-[#1b1c19]">{reg}</span>
                  <span className="text-[11px] font-semibold text-[#8e4d32] uppercase">Guild Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
