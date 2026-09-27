import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowUpRight, HelpCircle } from 'lucide-react';
import { Article } from '../types/article';
import { PayfricaLogo, SuiLogo, UsdcLogo, NairaLogo } from './Logos';

interface GuidesHubProps {
  articles: Article[];
}

export const GuidesHub: React.FC<GuidesHubProps> = ({ articles }) => {
  const guideArticles = articles.filter(a => a.isGuide || a.category === 'Guides').slice(0, 4);

  const getGuideLogo = (title: string, tags: string[]) => {
    const text = (title + ' ' + tags.join(' ')).toLowerCase();
    if (text.includes('sui')) return <SuiLogo size={18} />;
    if (text.includes('usdc') || text.includes('stablecoin')) return <UsdcLogo size={18} />;
    if (text.includes('naira') || text.includes('off-ramp')) return <NairaLogo size={18} />;
    return <PayfricaLogo size={18} />;
  };

  return (
    <section id="faq" className="py-14 sm:py-20 border-b border-neutral-200/90 bg-neutral-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C84323] font-semibold mb-2">
              <GraduationCap className="w-4 h-4 text-[#C84323]" />
              <span>Payfrica Learning Hub & FAQ</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight">
              Make Web3 make sense.
            </h2>
          </div>
          <p className="text-neutral-600 text-sm max-w-md">
            No technical jargon, no seed-phrase complexity. Step-by-step guides on navigating digital dollars, off-ramps, and local African rails.
          </p>
        </div>

        {/* Learning Hub Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {guideArticles.map((guide, idx) => (
            <Link
              key={guide.id}
              to={`/journal/${guide.slug}`}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200/90 hover:border-[#C84323]/50 transition-all duration-300 relative shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getGuideLogo(guide.title, guide.tags)}
                    <span className="font-mono text-xs font-semibold text-[#C84323]">
                      Guide 0{idx + 1}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-[#C84323] transition-colors leading-snug mb-3">
                  {guide.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                  {guide.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs font-semibold text-neutral-800 group-hover:text-[#C84323] transition-colors">
                <span>Read guide</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#111215] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6 text-[#C84323]" />
            </div>
            <div>
              <h4 className="font-display text-base sm:text-lg font-bold text-white">
                Have questions about swapping stablecoins to Naira?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300">
                Explore our full walkthrough on zero-fee off-ramps and multi-chain settlement.
              </p>
            </div>
          </div>

          <a
            href="https://www.payfrica.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-2.5 rounded-full bg-[#C84323] hover:bg-[#B0381D] text-white text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-[#C84323]/25"
          >
            Open Payfrica Help Center
          </a>
        </div>
      </div>
    </section>
  );
};
