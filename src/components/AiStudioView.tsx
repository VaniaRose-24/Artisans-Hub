import React, { useState } from 'react';

export const AiStudioView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'calculator' | 'storyteller' | 'photo'>('calculator');

  // Calculator State
  const [discipline, setDiscipline] = useState<'textiles' | 'pottery' | 'metalwork' | 'woodcraft'>('textiles');
  const [hours, setHours] = useState<number>(18.5);
  const [wageTier, setWageTier] = useState<'tier-1' | 'tier-2'>('tier-1');
  const [materialCostINR, setMaterialCostINR] = useState<number>(2100);
  const [overheadPercent, setOverheadPercent] = useState<number>(15);

  const hourlyRateINR = wageTier === 'tier-2' ? 125 : 94;
  const laborCostINR = Math.round(hours * hourlyRateINR);
  const studioOverheadINR = Math.round((laborCostINR + materialCostINR) * (overheadPercent / 100));
  const artisanNetINR = laborCostINR + materialCostINR + studioOverheadINR;
  const suggestedRetailINR = Math.round(artisanNetINR * 1.18);
  const suggestedRetailUSD = Math.round(suggestedRetailINR / 82);

  // Storyteller State
  const [storyCraft, setStoryCraft] = useState('Pochampally Handloom Ikat');
  const [storyMaker, setStoryMaker] = useState('Someshwar Dev');
  const [storyOrigin, setStoryOrigin] = useState('Telangana, India');
  const [storyAge, setStoryAge] = useState('12th Century');
  const [generatedStory, setGeneratedStory] = useState<string | null>(
    '“Every single thread in this Pochampally piece was measured and hand-tied using mathematical verse memorized across five generations. Dipped in fermented indigo and woven in a pit loom over 18.5 hours of steady breath, this textile preserves an unbroken 12th-century Deccan royal lineage.”'
  );
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const handleGenerateStory = () => {
    setIsGeneratingStory(true);
    setTimeout(() => {
      setGeneratedStory(
        `“Woven in the quiet courtyard atelier of ${storyMaker} in ${storyOrigin}, this ${storyCraft} breathes with the cadence of human hands. Rooted in an authentic ${storyAge} tradition, each motif was calculated by oral memory and dyed in earthen vats before meeting the shuttle. This piece embodies sacred geometry, patient dedication, and equitable artisan empowerment.”`
      );
      setIsGeneratingStory(false);
    }, 800);
  };

  // Photo Studio State
  const [selectedLighting, setSelectedLighting] = useState<'studio' | 'hearth' | 'museum'>('studio');
  const [photoSample, setPhotoSample] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAbF-iVkeLaithc8XoNDQG924BFZBWQB_fNqZbYjpa016qg9-8DRJ9yDri0qiXy5fWQ97sY2gwFrGY0DS339bm5TAqoIyLCdxy8KRG_RqzpgMam67SNYEdVmJXOPtjReH1-QUVUsFeXwEY5Y7Yq_l27rnlqPLRUV9nWYAjEXVJp7logh-mQSgrfLm_U9NQEZp35L6-yonZYtr1oagP1GT3BgK6WM0W2pWl2I8lSYyE_izBN8qGfCNNLeQ'
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-10">
      <div className="flex flex-col gap-2 mb-8 border-b border-[#e4ded3] pb-6">
        <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
          Artisan Guild Companion Suite
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#10271d] font-normal">
          AI Studio &amp; Maker Tools
        </h1>
        <p className="text-[15px] text-[#424844] max-w-2xl mt-1 leading-relaxed">
          Generative intelligence built to serve traditional makers—protecting cultural folklore, computing fair living wage pricing, and styling raw workshop photography.
        </p>
      </div>

      {/* Tool Navigation Tabs */}
      <div className="flex items-center gap-3 mb-8 border-b border-[#efeee9] pb-3">
        {[
          { id: 'calculator', label: 'Crafts Pricing Calculator', icon: 'calculate' },
          { id: 'storyteller', label: 'Storyteller AI (Folklore & Provenance)', icon: 'translate' },
          { id: 'photo', label: 'AI Photo Studio (Catalog Staging)', icon: 'photo_camera' },
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer ${
              activeTool === tool.id
                ? 'bg-[#263d32] text-white shadow-sm'
                : 'bg-[#ffffff] text-[#424844] hover:bg-[#e9e8e3] border border-[#e4ded3]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tool.icon}</span>
            <span>{tool.label}</span>
          </button>
        ))}
      </div>

      {/* TOOL 1: CRAFTS PRICING CALCULATOR */}
      {activeTool === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#ffffff] p-6 md:p-10 rounded-2xl border border-[#e4ded3] shadow-sm">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
                Transparent Labor Economics
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#10271d] mt-1">
                Fair Living Wage Pricing Engine
              </h2>
              <p className="text-[14px] text-[#424844] mt-1">
                Input your crafting hours, raw materials, and guild tier. The engine computes an honest global retail price with 88%+ directly paid to the creator.
              </p>
            </div>

            {/* Discipline Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#10271d]">Craft Discipline</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'textiles', label: 'Textiles & Silk' },
                  { id: 'pottery', label: 'Clay & Terracotta' },
                  { id: 'metalwork', label: 'Brass & Bronze' },
                  { id: 'woodcraft', label: 'Carved Wood' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDiscipline(d.id as any)}
                    className={`py-2 px-3 rounded-lg text-[12px] font-semibold border text-center transition-colors cursor-pointer ${
                      discipline === d.id
                        ? 'bg-[#cee9d9] text-[#082016] border-[#263d32]'
                        : 'bg-[#fbf9f4] text-[#424844] border-[#e4ded3] hover:bg-[#efeee9]'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#10271d]">Handcrafted Labor Time:</span>
                <span className="font-serif text-lg text-[#8e4d32] font-semibold">
                  {hours} Hours
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="60"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="accent-[#263d32] w-full cursor-pointer"
              />
              <span className="text-[11px] text-[#424844]">
                Calculates preparation, throwing/weaving, firing/chisel passes, and finishing touches.
              </span>
            </div>

            {/* Wage Tier Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#10271d]">
                Artisan Wage Benchmark
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setWageTier('tier-1')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    wageTier === 'tier-1'
                      ? 'bg-[#cee9d9]/60 border-[#263d32] ring-1 ring-[#263d32]'
                      : 'border-[#e4ded3] hover:bg-[#f5f4ef]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[13px] text-[#10271d]">Tier 1: Master Artisan</span>
                    <span className="text-[12px] font-bold text-[#8e4d32]">₹750/day</span>
                  </div>
                  <p className="text-[11px] text-[#424844] mt-1">
                    Certified 10+ years practicing. Exceeds regional living wage index by 40%.
                  </p>
                </button>
                <button
                  onClick={() => setWageTier('tier-2')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    wageTier === 'tier-2'
                      ? 'bg-[#cee9d9]/60 border-[#263d32] ring-1 ring-[#263d32]'
                      : 'border-[#e4ded3] hover:bg-[#f5f4ef]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[13px] text-[#10271d]">Tier 2: Living Treasure</span>
                    <span className="text-[12px] font-bold text-[#8e4d32]">₹1,000/day</span>
                  </div>
                  <p className="text-[11px] text-[#424844] mt-1">
                    National awardee or generational custodian. 25+ years continuous practice.
                  </p>
                </button>
              </div>
            </div>

            {/* Raw Material Cost INR */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#10271d]">
                Raw Material Costs (INR ₹)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={materialCostINR}
                  onChange={(e) => setMaterialCostINR(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg border border-[#e4ded3] text-[14px] text-[#1b1c19] w-48 font-medium focus:border-[#263d32] focus:outline-none"
                />
                <span className="text-[12px] text-[#424844]">
                  Clay, natural indigo, mulberry yarn, lost-wax core, brass ingots.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Transparent Price Output Certificate */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#f5f4ef] border border-[#e4ded3]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#e4ded3] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8e4d32] text-xl">auto_fix_high</span>
                  <span className="font-serif text-lg text-[#10271d] font-semibold">
                    Fair Wage Breakdown
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#cee9d9] text-[#082016]">
                  88% Payout Certified
                </span>
              </div>

              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between items-center">
                  <span className="text-[#424844]">Direct Skilled Labor:</span>
                  <span className="font-semibold text-[#10271d]">₹{laborCostINR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#424844]">Ethical Raw Materials:</span>
                  <span className="font-semibold text-[#10271d]">₹{materialCostINR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#424844]">Studio Kiln &amp; Tools ({overheadPercent}%):</span>
                  <span className="font-semibold text-[#10271d]">₹{studioOverheadINR.toLocaleString()}</span>
                </div>
                <div className="h-px bg-[#e4ded3] my-2"></div>
                <div className="flex justify-between items-center bg-[#ffffff] p-3 rounded-lg border border-[#e4ded3]">
                  <div>
                    <span className="font-semibold text-[13px] text-[#10271d] block">
                      Artisan Direct Take-Home:
                    </span>
                    <span className="text-[11px] text-[#8e4d32]">Direct wire to rural maker</span>
                  </div>
                  <span className="font-serif text-xl font-bold text-[#10271d]">
                    ₹{artisanNetINR.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#ffffff] border border-[#263d32] shadow-xs mt-2">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8e4d32]">
                  Suggested Global Fair Retail
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#10271d]">
                    ${suggestedRetailUSD} USD
                  </span>
                  <span className="text-[14px] text-[#424844]">
                    / ₹{suggestedRetailINR.toLocaleString()}
                  </span>
                </div>
                <span className="text-[11px] text-[#424844] mt-1">
                  Includes carbon-offset worldwide shipping &amp; guild certification packaging.
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-[#ffffff] text-xs text-[#424844] border border-[#e4ded3] italic leading-relaxed">
              “Fair pricing protects traditions from being abandoned. Every artisan under this formula can sustain a family on pure handcrafted mastery.”
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: STORYTELLER AI */}
      {activeTool === 'storyteller' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#ffffff] p-6 md:p-10 rounded-2xl border border-[#e4ded3] shadow-sm">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
                Oral Tradition to Digital Provenance
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#10271d] mt-1">
                Storyteller AI Generator
              </h2>
              <p className="text-[14px] text-[#424844] mt-1">
                Translate oral craft folklore, regional clay minerals, and generational motifs into museum-grade curatorial statements.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#10271d]">Craft Artifact Title</label>
                <input
                  value={storyCraft}
                  onChange={(e) => setStoryCraft(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
                  placeholder="e.g. Terracotta Amphora Vase"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#10271d]">Master Artisan Name</label>
                <input
                  value={storyMaker}
                  onChange={(e) => setStoryMaker(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
                  placeholder="e.g. Meera Sharma"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Origin Region</label>
                  <input
                    value={storyOrigin}
                    onChange={(e) => setStoryOrigin(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
                    placeholder="e.g. Jaipur, Rajasthan"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#10271d]">Heritage Age</label>
                  <input
                    value={storyAge}
                    onChange={(e) => setStoryAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#e4ded3] text-[13px] text-[#1b1c19] focus:border-[#263d32] focus:outline-none"
                    placeholder="e.g. 14th Century"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateStory}
                disabled={isGeneratingStory}
                className="mt-2 py-3 px-5 rounded-lg bg-[#263d32] text-white font-semibold text-[13px] hover:bg-[#10271d] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>{isGeneratingStory ? 'Drafting Curatorial Story...' : 'Generate Provenance Narrative'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-2xl bg-[#f5f4ef] border border-[#e4ded3]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#e4ded3] pb-3">
                <span className="font-serif text-lg text-[#10271d] font-semibold">
                  Authenticated Provenance Card
                </span>
                <span className="text-[11px] font-mono text-[#8e4d32] font-semibold">
                  HASH: 0x984F2B7
                </span>
              </div>

              {generatedStory ? (
                <div className="p-4 rounded-xl bg-[#ffffff] border border-[#e4ded3] shadow-xs">
                  <p className="font-serif text-[16px] text-[#10271d] leading-relaxed italic">
                    {generatedStory}
                  </p>
                </div>
              ) : null}

              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#cee9d9]/70 text-[#082016] text-[12px]">
                <span className="material-symbols-outlined text-lg text-[#263d32]">verified</span>
                <span>Ready for export documentation, museum certificate, and global package slip.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: AI PHOTO STUDIO */}
      {activeTool === 'photo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#ffffff] p-6 md:p-10 rounded-2xl border border-[#e4ded3] shadow-sm">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
                Workshop Staging AI
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#10271d] mt-1">
                Magazine-Grade Lighting &amp; Framing
              </h2>
              <p className="text-[14px] text-[#424844] mt-1">
                Transform rough workshop smartphone photos into crisp, museum-lit catalog photography without expensive studio equipment.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[13px] font-semibold text-[#10271d]">Select Ambient Lighting Preset</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'studio', label: 'Gallery Daylight', desc: 'Cool, crisp 5500K natural diffused light' },
                  { id: 'hearth', label: 'Warm Hearth Sun', desc: 'Warm 3200K golden hour workshop glow' },
                  { id: 'museum', label: 'Museum Spotlight', desc: 'Directional shadow and deep ceramic contrast' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedLighting(preset.id as any)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                      selectedLighting === preset.id
                        ? 'bg-[#cee9d9] text-[#082016] border-[#263d32]'
                        : 'bg-[#fbf9f4] text-[#424844] border-[#e4ded3] hover:bg-[#efeee9]'
                    }`}
                  >
                    <span className="font-semibold text-[12px] block">{preset.label}</span>
                    <span className="text-[10px] text-[#424844] line-clamp-2 mt-0.5">{preset.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <label className="text-[13px] font-semibold text-[#10271d]">Choose Sample Craft Shot</label>
              <div className="flex gap-3">
                {[
                  {
                    name: 'Amphora Vase',
                    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbF-iVkeLaithc8XoNDQG924BFZBWQB_fNqZbYjpa016qg9-8DRJ9yDri0qiXy5fWQ97sY2gwFrGY0DS339bm5TAqoIyLCdxy8KRG_RqzpgMam67SNYEdVmJXOPtjReH1-QUVUsFeXwEY5Y7Yq_l27rnlqPLRUV9nWYAjEXVJp7logh-mQSgrfLm_U9NQEZp35L6-yonZYtr1oagP1GT3BgK6WM0W2pWl2I8lSYyE_izBN8qGfCNNLeQ'
                  },
                  {
                    name: 'Brass Diya',
                    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjL9gBVFFjnXpr8P7OeKeKYqPH3n5DzXBq_juHu-fZniPmGr5-AXZruh2Y86X61RWgtguIiVeNGKMvONsL9NBMOPSY4LFyTxM55pDAcuDq6tn9DCekzUybszOx9l-PrN09N5eN9kQeN1EwguBDaewQZW5GeuhzzYLwKpTK-cctqSem1MnRJxNuUT_niUDJho9RExDfJDJdzf3w8hEZreUE4d8jkb0UIxn-bLWXdslYH1hy2JjalWKp7w'
                  },
                  {
                    name: 'Blue Platter',
                    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChmW1IFD2pB_GQ-4jKS3G4l6IxKE52pf-MxfINa9BSP6bQ5CM4FeYTVHjPOOEGv4anU-JVhAXxuZtDBswkDIYpg0gRZJrVPbQByxwpk-EV2QVOpC-DJKGiOcCLRP2LpWhprkGr38BSLjmYpqFAvhw3y7NcmuAAcXIX_c4t7kXSzv5B4b8WzneM7Nh1p4LNawI4EJLBNPVBp5Esldq-DSWTYDf2r92NlU1NHqiaItFH5XClXwpJsDIcVQ'
                  }
                ].map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setPhotoSample(s.url)}
                    className="p-1 rounded-lg border border-[#e4ded3] hover:border-[#263d32] cursor-pointer"
                  >
                    <img alt={s.name} className="w-14 h-14 object-cover rounded" src={s.url} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#f5f4ef] border border-[#e4ded3]">
            <div className="relative rounded-xl overflow-hidden shadow-xl max-w-sm w-full aspect-[4/5] bg-black">
              <img
                alt="Studio sample"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  selectedLighting === 'hearth'
                    ? 'sepia-[0.25] brightness-105 contrast-105'
                    : selectedLighting === 'museum'
                    ? 'contrast-125 brightness-95'
                    : 'brightness-105 saturate-105'
                }`}
                src={photoSample}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#ffffff]/90 text-[11px] font-semibold text-[#10271d]">
                {selectedLighting === 'studio' && 'Preset: Diffused Daylight'}
                {selectedLighting === 'hearth' && 'Preset: Hearth 3200K'}
                {selectedLighting === 'museum' && 'Preset: Museum Chiaroscuro'}
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#10271d]/90 text-[10px] text-white flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-xs text-[#cee9d9]">verified</span>
                <span>Artisan Hub Verified</span>
              </div>
            </div>
            <span className="text-[12px] text-[#424844] mt-3 font-medium">
              Live Preview: 4:5 Catalog Framing with Provenance Watermark
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
