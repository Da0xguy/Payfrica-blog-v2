import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark } from 'lucide-react';
import { Article } from '../types/article';
import { ImageWithFallback } from './ImageWithFallback';

interface EditorsPickProps {
  article: Article;
}

export const EditorsPick: React.FC<EditorsPickProps> = ({ article }) => {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-widest text-[#C84323] font-semibold">
        <Bookmark className="w-4 h-4 text-[#C84323] fill-[#C84323]/20" />
        <span>Editor's Spotlight · Must Read</span>
      </div>

      <div className="bg-[#111215] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden group shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Oversized Typography & Info */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
                <span className="text-[#C84323] uppercase font-semibold">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
              </div>

              <Link to={`/journal/${article.slug}`}>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-neutral-200 transition-colors leading-[1.14] mb-4">
                  {article.title}
                </h3>
              </Link>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-normal">
                {article.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{article.author.name}</div>
                  <div className="text-xs text-neutral-400">{article.author.role}</div>
                </div>
              </div>

              <Link
                to={`/journal/${article.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#C84323] hover:bg-[#B0381D] rounded-full transition-colors duration-200 cursor-pointer shadow-md shadow-[#C84323]/20"
              >
                <span>Read Feature</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Media Presentation */}
          <div className="lg:col-span-5 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden relative bg-neutral-900">
            <ImageWithFallback
              src={article.image || article.coverImage || ''}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
