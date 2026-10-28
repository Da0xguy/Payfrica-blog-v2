import React from 'react';
import { Article } from '../types/article';
import { ArticleCard } from './ArticleCard';

interface EditorialGridProps {
  articles: Article[];
}

export const EditorialGrid: React.FC<EditorialGridProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  const item1 = articles[0];
  const item2 = articles[1];
  const item3 = articles[2];
  const item4 = articles[3];
  const item5 = articles[4];
  const item6 = articles[5];
  const item7 = articles[6];

  return (
    <section className="editorial-section py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="editorial-heading flex items-end justify-between mb-8 sm:mb-10">
        <div>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#C84323] font-semibold block mb-2">
            Curated Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111215]">
            Perspectives & Analysis
          </h2>
        </div>
        <span className="editorial-heading-note text-xs font-mono text-neutral-500 hidden sm:inline-flex items-center gap-2">
          <span className="h-px w-8 bg-[#C84323]/50" />
          Asymmetric Dispatch
        </span>
      </div>

      {/* Row 1: 1 large card (7 cols) + 2 medium stacked cards (5 cols) */}
      <div className="editorial-bento-grid grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mb-5 lg:mb-6">
        {item1 && (
          <div className="editorial-bento-primary lg:col-span-7">
            <ArticleCard article={item1} variant="featured" index={0} />
          </div>
        )}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
          {item2 && <ArticleCard article={item2} variant="standard" index={1} />}
          {item3 && <ArticleCard article={item3} variant="standard" index={2} />}
        </div>
      </div>

      {/* Row 2: 1 full-width wide editorial story */}
      {item4 && (
        <div className="editorial-wide-card mb-5 lg:mb-6">
          <ArticleCard article={item4} variant="wide" index={3} />
        </div>
      )}

      {/* Row 3: 3 smaller compact cards */}
      <div className="editorial-bottom-grid grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {item5 && <ArticleCard article={item5} variant="standard" index={4} />}
        {item6 && <ArticleCard article={item6} variant="standard" index={5} />}
        {item7 && <ArticleCard article={item7} variant="standard" index={6} />}
      </div>
    </section>
  );
};
