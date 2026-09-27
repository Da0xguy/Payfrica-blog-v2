import React, { useState, useRef } from 'react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { CategoryType } from '../types/article';
import { HeroSection } from '../components/HeroSection';
import { TickerBar } from '../components/TickerBar';
import { FeaturedStory } from '../components/FeaturedStory';
import { CategoryTabs } from '../components/CategoryTabs';
import { EditorialGrid } from '../components/EditorialGrid';
import { EditorsPick } from '../components/EditorsPick';
import { GuidesHub } from '../components/GuidesHub';
import { AfricaBuilding } from '../components/AfricaBuilding';
import { LatestStories } from '../components/LatestStories';
import { Newsletter } from '../components/Newsletter';
import { ArticleCard } from '../components/ArticleCard';

interface HomePageProps {
  onOpenSearch?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const storiesRef = useRef<HTMLDivElement>(null);

  const scrollToStories = () => {
    storiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: string) => {
    const matched = CATEGORIES.find((c) => c.toLowerCase() === cat.toLowerCase());
    if (matched) {
      setSelectedCategory(matched);
      storiesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-calculate category counts
  const articleCounts = CATEGORIES.reduce((acc, cat) => {
    if (cat === 'All') {
      acc[cat] = ARTICLES.length;
    } else {
      acc[cat] = ARTICLES.filter((a) => a.category.toLowerCase() === cat.toLowerCase()).length;
    }
    return acc;
  }, {} as Record<string, number>);

  // Find featured and editor's pick
  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];
  const editorsPickArticle = ARTICLES.find((a) => a.editorsPick) || ARTICLES[1];

  // Articles for category filtering
  const filteredArticles = selectedCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  // Non-featured articles for the asymmetric grid when 'All' is active
  const gridArticles = ARTICLES.filter((a) => a.id !== featuredArticle.id && a.id !== editorsPickArticle.id);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111215]">
      {/* 1. Blog Hero Section matching the new design language */}
      <HeroSection 
        onExploreClick={scrollToStories} 
        onSelectCategory={handleSelectCategory}
        onOpenSearch={onOpenSearch}
      />

      {/* 2. Real-time Ticker & Indicative Exchange Rate Bar */}
      <TickerBar />

      {/* 3. Featured Lead Editorial Story */}
      <FeaturedStory article={featuredArticle} />

      {/* 4. Interactive Category Filter Bar */}
      <div ref={storiesRef}>
        <CategoryTabs
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          articleCounts={articleCounts}
        />
      </div>

      {/* 5. Main Story Feed / Category View */}
      {selectedCategory === 'All' ? (
        <>
          {/* Asymmetric Editorial Grid */}
          <EditorialGrid articles={gridArticles.slice(0, 7)} />

          {/* Editor's Pick High-Contrast Panel */}
          <EditorsPick article={editorsPickArticle} />

          {/* Guides Learning Hub */}
          <GuidesHub articles={ARTICLES} />

          {/* Africa Is Building Section */}
          <AfricaBuilding articles={ARTICLES} />

          {/* Latest from Payfrica Journal List */}
          <LatestStories articles={ARTICLES} />
        </>
      ) : (
        /* Filtered Category View */
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
              {selectedCategory} Stories
            </h2>
            <span className="text-xs font-mono text-neutral-500 tabular-nums">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, idx) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="standard"
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
              <p className="text-neutral-500 text-sm mb-4">No stories found in this category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-semibold text-[#C84323] hover:underline cursor-pointer"
              >
                Reset to all stories
              </button>
            </div>
          )}
        </section>
      )}

      {/* 6. Newsletter Subscription */}
      <Newsletter />
    </div>
  );
};
