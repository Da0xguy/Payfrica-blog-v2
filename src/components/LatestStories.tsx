import React, { useState } from 'react';
import { Newspaper, ChevronDown } from 'lucide-react';
import { Article } from '../types/article';
import { ArticleCard } from './ArticleCard';

interface LatestStoriesProps {
  articles: Article[];
}

export const LatestStories: React.FC<LatestStoriesProps> = ({ articles }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, articles.length));
  };

  const displayedArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-200/90">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#C84323]" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111215] tracking-tight">
            Latest from Payfrica Journal
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-500 tabular-nums">
          Showing {displayedArticles.length} of {articles.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article, idx) => (
          <ArticleCard key={article.id} article={article} variant="standard" index={idx} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-semibold text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-full transition-all shadow-sm cursor-pointer"
          >
            <span>Load more stories</span>
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      )}
    </section>
  );
};
