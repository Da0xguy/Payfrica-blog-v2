import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { CategoryType } from '../types/article';
import { ArticleCard } from '../components/ArticleCard';
import { Newsletter } from '../components/Newsletter';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  // Normalize category
  const activeCategory = (CATEGORIES.find(
    (c) => c.toLowerCase() === category?.toLowerCase()
  ) || 'Crypto') as CategoryType;

  const categoryDescriptions: Record<string, string> = {
    Crypto: 'Deep dives on protocol mechanics, token economics, and cryptographic infrastructure.',
    Payments: 'The mechanics of turning digital currency into domestic clearing house credits.',
    Africa: 'Dispatches on the African fintech revolution, cross-border commerce, and founders.',
    Stablecoins: 'Exploring digital dollars, reserve audits, and real-world liquidity utility.',
    Sui: 'Inside the Move execution layer, object models, and sub-second settlement.',
    Guides: 'Jargon-free tutorials on navigating digital assets, off-ramps, and local bills.',
    Product: 'Product philosophy, UX innovations, and feature breakdowns from Payfrica.',
    Company: 'Behind the scenes at Team Sushi, technical roadmaps, and culture.',
  };

  const filteredArticles = ARTICLES.filter(
    (a) => a.category.toLowerCase() === activeCategory.toLowerCase()
  );

  useEffect(() => {
    document.title = `${activeCategory} — Payfrica Journal`;
    window.scrollTo(0, 0);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-800">
      {/* Category Header */}
      <section className="py-12 sm:py-16 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-[#C84323] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Stories</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C84323] font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Editorial Category</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#111215] tracking-tight">
                {activeCategory}
              </h1>
              <p className="text-neutral-600 text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
                {categoryDescriptions[activeCategory] || 'Curated editorial perspectives.'}
              </p>
            </div>
            <div className="font-mono text-xs text-neutral-500">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'dispatch' : 'dispatches'}
            </div>
          </div>
        </div>
      </section>

      {/* Category Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => (
              <ArticleCard key={article.id} article={article} variant="standard" index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 p-8">
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">No dispatches in this category yet</h3>
            <p className="text-neutral-500 text-sm mb-6">
              Our editorial desk is preparing upcoming essays and analysis for this sector.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C84323] text-white font-semibold rounded-full text-xs hover:bg-[#B0381D] transition-colors"
            >
              Browse all publications
            </Link>
          </div>
        )}
      </div>

      <Newsletter />
    </div>
  );
};
