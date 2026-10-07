import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowUpRight, Clock, Flame, BookOpen } from 'lucide-react';
import { Article } from '../types/article';
import { PayfricaLogo, SuiLogo, UsdcLogo, UsdsuiLogo, NairaLogo, BaseLogo, AvalancheLogo } from './Logos';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  loading?: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  loading = false,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'stablecoins',
    'off-ramp',
    'Sui payments',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const popularTopics = [
    'Stablecoins',
    'Off-ramp',
    'Sui',
    'Naira Payouts',
    'Fiat Vouchers',
    'Airtime & Bills',
    'West Africa',
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const filteredArticles = normalizedQuery
    ? articles.filter((a) =>
        a.title.toLowerCase().includes(normalizedQuery) ||
        a.excerpt.toLowerCase().includes(normalizedQuery) ||
        a.category.toLowerCase().includes(normalizedQuery) ||
        a.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const handleSelectArticle = (slug: string) => {
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches([query.trim(), ...recentSearches.slice(0, 3)]);
    }
    onClose();
    navigate(`/journal/${slug}`);
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#111215] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#C84323] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, topics, guides, or rails..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-white/10 text-neutral-400 border border-white/10 rounded-full">
              ESC
            </kbd>
          )}
        </div>

        {/* Results / Default state */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-white/5">
          {loading ? (
            <div className="py-12 text-center">
              <div className="animate-pulse">
                <div className="h-6 bg-white/10 rounded w-48 mx-auto mb-4"></div>
                <div className="h-4 bg-white/10 rounded w-32 mx-auto"></div>
              </div>
            </div>
          ) : query ? (
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-mono">
                <span>RESULTS ({filteredArticles.length})</span>
                <span>MATCHING "{query}"</span>
              </div>

              {filteredArticles.length > 0 ? (
                <div className="space-y-2">
                  {filteredArticles.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => handleSelectArticle(art.slug)}
                      className="w-full text-left p-3.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 mb-1">
                          {art.category.toLowerCase().includes('sui') ? (
                            <SuiLogo size={13} />
                          ) : art.category.toLowerCase().includes('crypto') ? (
                            <UsdcLogo size={13} />
                          ) : art.category.toLowerCase().includes('payments') ? (
                            <NairaLogo size={13} />
                          ) : (
                            <PayfricaLogo size={13} />
                          )}
                          <span className="text-[#C84323] uppercase font-medium">{art.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.readTime}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#C84323] transition-colors line-clamp-1">
                          {art.title}
                        </h4>
                        <p className="text-xs text-neutral-400 line-clamp-1 mt-1 font-sans">
                          {art.excerpt}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#C84323] shrink-0 mt-1" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <BookOpen className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-300 font-medium">No stories found</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Try searching for "stablecoins", "Sui", "off-ramp", or "fiat".
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>RECENT SEARCHES</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTagClick(item)}
                        className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 transition-colors cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Topics */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
                  <Flame className="w-3.5 h-3.5 text-[#C84323]" />
                  <span>POPULAR DISCOVERY TOPICS</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTagClick(topic)}
                      className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 hover:border-[#C84323]/40 transition-colors cursor-pointer"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400 px-5">
          <span>Search articles across Africa, Crypto, and Payments</span>
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span>Navigate</span>
            <kbd className="px-1 bg-white/10 rounded">↑↓</kbd>
            <span>Select</span>
            <kbd className="px-1 bg-white/10 rounded">↵</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
