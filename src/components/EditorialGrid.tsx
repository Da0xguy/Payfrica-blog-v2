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
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C84323] font-semibold block mb-1">
            Curated Architecture
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111215]">
            Perspectives & Analysis
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
          Asymmetric Editorial Dispatch
        </span>
      </div>

      {/* Row 1: 1 large card (7 cols) + 2 medium stacked cards (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {item1 && (
          <div className="lg:col-span-7">
            <ArticleCard article={item1} variant="standard" />
          </div>
        )}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {item2 && <ArticleCard article={item2} variant="standard" />}
          {item3 && <ArticleCard article={item3} variant="standard" />}
        </div>
      </div>

      {/* Row 2: 1 full-width wide editorial story */}
      {item4 && (
        <div className="mb-6">
          <ArticleCard article={item4} variant="wide" />
        </div>
      )}

      {/* Row 3: 3 smaller compact cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {item5 && <ArticleCard article={item5} variant="standard" index={0} />}
        {item6 && <ArticleCard article={item6} variant="standard" index={1} />}
        {item7 && <ArticleCard article={item7} variant="standard" index={2} />}
      </div>
    </section>
  );
};
