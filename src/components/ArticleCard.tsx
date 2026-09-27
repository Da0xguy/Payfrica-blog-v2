import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '../types/article';
import { ImageWithFallback } from './ImageWithFallback';
import { PayfricaLogo, SuiLogo, UsdcLogo, UsdsuiLogo, NairaLogo, BaseLogo, AvalancheLogo } from './Logos';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'wide' | 'compact';
  index?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  index,
}) => {
  const formattedIndex = index !== undefined ? String(index + 1).padStart(2, '0') : null;

  const getCardLogo = (category: string, tags: string[] = []) => {
    const text = (category + ' ' + tags.join(' ')).toLowerCase();
    if (text.includes('sui')) return <SuiLogo size={14} className="shrink-0" />;
    if (text.includes('usdsui')) return <UsdsuiLogo size={14} className="shrink-0" />;
    if (text.includes('usdc') || text.includes('stablecoin')) return <UsdcLogo size={14} className="shrink-0" />;
    if (text.includes('naira') || text.includes('off-ramp')) return <NairaLogo size={14} className="shrink-0" />;
    if (text.includes('base')) return <BaseLogo size={14} className="shrink-0" />;
    if (text.includes('avalanche')) return <AvalancheLogo size={14} className="shrink-0" />;
    return <PayfricaLogo size={14} className="shrink-0" />;
  };

  if (variant === 'wide') {
    return (
      <Link
        to={`/journal/${article.slug}`}
        className="group relative block bg-white hover:bg-neutral-50/70 border border-neutral-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
          <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
            <div>
              {/* Unboxed Metadata with Ecosystem Mark */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-3 tracking-wide">
                {getCardLogo(article.category, article.tags)}
                <span className="text-[#C84323] font-semibold uppercase">{article.category}</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>{article.date}</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 group-hover:text-[#C84323] transition-colors duration-200 leading-snug mb-3">
                {article.title}
              </h3>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto">
              <span className="text-xs font-medium text-neutral-700">By {article.author.name}</span>
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#C84323] group-hover:translate-x-1 transition-transform">
                <span>Read story</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 h-56 md:h-full min-h-[240px] relative overflow-hidden bg-neutral-100">
            <ImageWithFallback
              src={article.image || article.coverImage || ''}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        to={`/journal/${article.slug}`}
        className="group flex items-start gap-4 p-4 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 shadow-sm hover:shadow transition-all duration-200"
      >
        {formattedIndex && (
          <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-300 group-hover:text-[#C84323] transition-colors tabular-nums shrink-0 pt-0.5">
            {formattedIndex}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 mb-1">
            {getCardLogo(article.category, article.tags)}
            <span className="text-[#C84323] font-semibold uppercase">{article.category}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>{article.readTime}</span>
          </div>
          <h4 className="font-display text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#C84323] transition-colors line-clamp-2 leading-snug mb-1">
            {article.title}
          </h4>
          <p className="text-xs text-neutral-600 line-clamp-1">
            {article.excerpt}
          </p>
        </div>
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
          <ImageWithFallback
            src={article.image || article.coverImage || ''}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
    );
  }

  // Standard vertical card (Default)
  return (
    <Link
      to={`/journal/${article.slug}`}
      className="group flex flex-col bg-white hover:bg-neutral-50/70 border border-neutral-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <ImageWithFallback
          src={article.image || article.coverImage || ''}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-neutral-800 font-semibold flex items-center gap-1.5 shadow-sm border border-neutral-200">
          {getCardLogo(article.category, article.tags)}
          <span>{article.category}</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2.5">
            <span>{article.date}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-[#C84323] transition-colors duration-200 leading-snug mb-3">
            {article.title}
          </h3>

          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2 mb-4 font-normal">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-neutral-200"
            />
            <span className="text-xs text-neutral-700 font-medium">{article.author.name}</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#C84323] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
};
