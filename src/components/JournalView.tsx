import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/mockData';
import { JournalArticle } from '../types';

export const JournalView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(JOURNAL_ARTICLES[0]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-10">
      <div className="flex flex-col gap-2 mb-10 border-b border-[#e4ded3] pb-6">
        <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
          Curatorial Dispatches &amp; Field Notes
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#10271d] font-normal">
          The Craft Journal
        </h1>
        <p className="text-[15px] text-[#424844] max-w-2xl mt-1 leading-relaxed">
          Critical essays, anthropological documentation, and technical deep-dives into living craft cultures across India and Southeast Asia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Active Article Reading Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-6 bg-[#ffffff] p-6 md:p-10 rounded-2xl border border-[#e4ded3] shadow-sm">
          {selectedArticle ? (
            <article className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ffdbce] text-[#370e00] text-[11px] font-semibold tracking-wide uppercase">
                  {selectedArticle.tag}
                </span>
                <span className="text-[12px] text-[#424844]">{selectedArticle.readTime}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#10271d] font-medium leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 py-2 border-y border-[#efeee9] text-[13px] text-[#424844]">
                <span className="font-medium text-[#1b1c19]">{selectedArticle.author}</span>
                <span>•</span>
                <span>Field Documentation Series</span>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  alt={selectedArticle.title}
                  className="w-full h-80 sm:h-96 object-cover"
                  src={selectedArticle.image}
                />
              </div>

              <div className="prose max-w-none flex flex-col gap-4 text-[16px] text-[#1b1c19] leading-relaxed">
                <p className="font-serif text-xl italic text-[#8e4d32] leading-relaxed border-l-2 border-[#8e4d32] pl-4 py-1">
                  “{selectedArticle.summary}”
                </p>
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx} className="text-[#424844] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Ethical Transparency Box */}
              <div className="mt-6 p-6 rounded-xl bg-[#f5f4ef] border border-[#e4ded3] flex flex-col gap-2">
                <h4 className="font-serif text-lg text-[#10271d] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8e4d32]">handshake</span>
                  <span>Our Fair Trade &amp; Equity Pledge</span>
                </h4>
                <p className="text-[13px] text-[#424844] leading-relaxed">
                  Artisans Hub operates on a radically transparent distribution model: 85% to 92% of the retail price reaches the artisan directly before logistics. We do not extract retail markup or demand exclusivity agreements from generational masters.
                </p>
              </div>
            </article>
          ) : null}
        </div>

        {/* Right Column: Other Articles in Journal */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="font-serif text-xl text-[#10271d] font-semibold mb-2">
            Other Field Dispatches
          </span>
          {JOURNAL_ARTICLES.map((article) => {
            const isSelected = selectedArticle?.id === article.id;
            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className={`p-4 rounded-xl transition-all cursor-pointer border flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-[#ffffff] border-[#263d32] shadow-md ring-1 ring-[#263d32]'
                    : 'bg-[#ffffff] border-[#e4ded3] hover:bg-[#f5f4ef]'
                }`}
              >
                <div className="h-32 w-full rounded-lg overflow-hidden">
                  <img
                    alt={article.title}
                    className="w-full h-full object-cover"
                    src={article.image}
                  />
                </div>
                <span className="text-[11px] text-[#8e4d32] font-semibold uppercase mt-1">
                  {article.tag} · {article.readTime}
                </span>
                <h4 className="font-serif text-[17px] text-[#10271d] font-semibold line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-[12px] text-[#424844] line-clamp-2">
                  {article.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
