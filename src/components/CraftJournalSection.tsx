import React from 'react';
import { JOURNAL_ARTICLES } from '../data/mockData';

interface CraftJournalSectionProps {
  onNavigate: (tab: string, articleId?: string) => void;
}

export const CraftJournalSection: React.FC<CraftJournalSectionProps> = ({ onNavigate }) => {
  const [featureArticle, ...sideArticles] = JOURNAL_ARTICLES;

  return (
    <section className="w-full px-4 md:px-12 py-16 lg:py-20 bg-[#fbf9f4] border-t border-[#e4ded3]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex items-center justify-between border-b border-[#e9e8e3] pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
              EDITORIAL STORIES &amp; FIELD NOTES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#10271d] mt-1 font-medium">
              The Craft Journal
            </h2>
          </div>
          <button
            onClick={() => onNavigate('our-story')}
            className="hidden sm:inline-flex items-center gap-1 text-[14px] font-semibold text-[#8e4d32] hover:text-[#783c23] transition-colors cursor-pointer"
          >
            <span>Read All Dispatches</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Feature Article */}
          <article className="lg:col-span-7 flex flex-col bg-[#ffffff] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#e4ded3]">
            <div className="h-80 w-full overflow-hidden relative">
              <img
                alt={featureArticle.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                src={featureArticle.image}
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#fbf9f4]/90 backdrop-blur-sm text-[12px] text-[#10271d] font-semibold">
                {featureArticle.readTime} · {featureArticle.tag}
              </span>
            </div>
            <div className="p-6 md:p-8 flex flex-col gap-4 flex-1 justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-[11px] uppercase tracking-wider text-[#8e4d32] font-semibold">
                  {featureArticle.tag}
                </span>
                <h3
                  onClick={() => onNavigate('our-story', featureArticle.id)}
                  className="font-serif text-2xl md:text-3xl text-[#10271d] leading-snug hover:text-[#8e4d32] transition-colors cursor-pointer"
                >
                  {featureArticle.title}
                </h3>
                <p className="text-[15px] text-[#424844] leading-relaxed">
                  {featureArticle.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#efeee9]">
                <span className="text-[12px] text-[#424844] font-medium">
                  {featureArticle.author}
                </span>
                <button
                  onClick={() => onNavigate('our-story', featureArticle.id)}
                  className="text-[13px] text-[#10271d] font-semibold hover:text-[#8e4d32] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Continue Reading</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>

          {/* Side Articles Grid */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {sideArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onNavigate('our-story', article.id)}
                className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl bg-[#f5f4ef] hover:bg-[#efeee9] transition-colors border border-[#e4ded3] cursor-pointer group"
              >
                <div className="sm:w-36 h-36 shrink-0 rounded-lg overflow-hidden">
                  <img
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={article.image}
                  />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-[#8e4d32] font-semibold">
                      {article.tag} · {article.readTime}
                    </span>
                    <h4 className="font-serif text-[18px] text-[#10271d] line-clamp-2 group-hover:text-[#8e4d32] transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-[13px] text-[#424844] line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                  <div className="text-[12px] text-[#10271d] font-semibold group-hover:text-[#8e4d32] inline-flex items-center gap-1 mt-2">
                    <span>Read Story</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
