import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Article } from '../types/article';
import { ImageWithFallback } from './ImageWithFallback';
import { UsdcLogo } from './Logos';

interface FeaturedStoryProps {
  article: Article;
}

export const FeaturedStory: React.FC<FeaturedStoryProps> = ({ article }) => {
  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C84323]" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            Featured Lead Story
          </h2>
        </div>
        <span className="text-xs text-neutral-500 font-mono">Curated Editorial</span>
      </div>

      <Link
        to={`/journal/${article.slug}`}
        className="group relative block bg-white hover:bg-neutral-50/70 border border-neutral-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Text Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
            <div>
              {/* Unboxed Metadata with Official Mark */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-4 tracking-wide">
                <UsdcLogo size={16} />
                <span className="text-[#C84323] font-semibold uppercase">{article.category}</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>{article.date}</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 group-hover:text-[#C84323] transition-colors leading-[1.18] mb-4">
                {article.title}
              </h3>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-neutral-200 shadow-sm"
                />
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{article.author.name}</div>
                  <div className="text-xs text-neutral-500">{article.author.role}</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 rounded-full group-hover:bg-[#C84323] group-hover:text-white transition-colors duration-200">
                <span>Read Story</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Feature Image with subtle zoom on card hover */}
          <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full overflow-hidden order-1 lg:order-2 bg-neutral-100">
            <ImageWithFallback
              src={article.image || article.coverImage || ''}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </Link>
    </section>
  );
};
