import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowUpRight, TrendingUp, Layers, Quote } from 'lucide-react';
import { Article } from '../types/article';
import { ImageWithFallback } from './ImageWithFallback';

interface AfricaBuildingProps {
  articles: Article[];
}

export const AfricaBuilding: React.FC<AfricaBuildingProps> = ({ articles }) => {
  const africaArticles = articles.filter(a => a.isAfricaBuilding || a.category === 'Africa' || a.tags.includes('Africa')).slice(0, 3);

  const testimonials = [
    {
      quote: "Payfrica made cross-border supplier settlement with Kenya instant. No more waiting 4 days for wire transfers.",
      author: "Chinedu E.",
      role: "Importer & Merchant, Lagos",
      speed: "12s settlement"
    },
    {
      quote: "Receiving USDC from international clients and having Naira in my GTBank in 30 seconds changed my freelance business.",
      author: "Amina K.",
      role: "Product Designer, Nairobi",
      speed: "100% automated"
    },
    {
      quote: "The Sui integration is ridiculously cheap. Gas fees are practically zero compared to old Ethereum bridging.",
      author: "Kwame O.",
      role: "Web3 Developer, Accra",
      speed: "<$0.001 fee"
    }
  ];

  return (
    <section id="testimonies" className="py-14 sm:py-20 border-b border-neutral-200/90 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C84323] font-semibold mb-2">
              <Compass className="w-4 h-4 text-[#C84323]" />
              <span>Continental Frontier & Testimonies</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight">
              Africa is building.
            </h2>
          </div>
          <p className="text-neutral-600 text-sm max-w-md">
            How young developers, logistics pioneers, and traders across the continent are moving money in seconds.
          </p>
        </div>

        {/* 3 Featured Building Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {africaArticles.map((article) => (
            <Link
              key={article.id}
              to={`/journal/${article.slug}`}
              className="group flex flex-col justify-between rounded-2xl bg-[#F8F9FA] hover:bg-neutral-50 border border-neutral-200/90 hover:border-neutral-300 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackTitle={article.title}
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2">
                    <span className="text-[#C84323] uppercase font-semibold">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-[#C84323] transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-normal mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200/60 text-xs font-semibold text-neutral-800 group-hover:text-[#C84323]">
                  <span>Read dispatch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Real User Testimonies Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
              <div>
                <Quote className="w-5 h-5 text-[#C84323] mb-2 opacity-80" />
                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed mb-4">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200/60 text-xs">
                <div>
                  <div className="font-semibold text-neutral-900">{t.author}</div>
                  <div className="text-[11px] text-neutral-500">{t.role}</div>
                </div>
                <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {t.speed}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
