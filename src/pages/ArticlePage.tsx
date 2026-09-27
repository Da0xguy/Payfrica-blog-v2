import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Twitter, 
  Copy, 
  Check, 
  Clock, 
  Calendar, 
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Newsletter } from '../components/Newsletter';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PayfricaLogo, SuiLogo, UsdcLogo, UsdsuiLogo, NairaLogo, BaseLogo, AvalancheLogo } from '../components/Logos';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const article = ARTICLES.find((a) => a.slug === slug);

  // Track reading progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Set page title
  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Payfrica Journal`;
      window.scrollTo(0, 0);
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-bold text-neutral-900 mb-3">Article not found</h1>
        <p className="text-neutral-500 text-sm mb-6">
          The requested story may have been relocated or updated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C84323] text-white font-semibold rounded-full text-sm hover:bg-[#B0381D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Journal Home</span>
        </Link>
      </div>
    );
  }

  // Get related articles
  const relatedArticles = ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t)))
  ).slice(0, 3);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" on Payfrica Journal`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const getArticleLogo = () => {
    const text = (article.category + ' ' + (article.tags || []).join(' ')).toLowerCase();
    if (text.includes('sui')) return <SuiLogo size={18} />;
    if (text.includes('usdsui')) return <UsdsuiLogo size={18} />;
    if (text.includes('usdc') || text.includes('stablecoin')) return <UsdcLogo size={18} />;
    if (text.includes('naira') || text.includes('off-ramp')) return <NairaLogo size={18} />;
    if (text.includes('base')) return <BaseLogo size={18} />;
    if (text.includes('avalanche')) return <AvalancheLogo size={18} />;
    return <PayfricaLogo size={18} />;
  };

  return (
    <article className="min-h-screen bg-[#F8F9FA] text-neutral-800">
      {/* Sticky Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 z-50">
        <div
          className="h-full bg-[#C84323] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-6 sm:mb-8">
          <Link to="/" className="hover:text-[#C84323] transition-colors">
            Journal
          </Link>
          <span className="text-neutral-300">/</span>
          <Link to={`/category/${article.category}`} className="hover:text-[#C84323] transition-colors">
            {article.category}
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-700 truncate max-w-[200px] sm:max-w-none">
            {article.title}
          </span>
        </nav>

        {/* Category & Metadata with Official Mark */}
        <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-500 mb-4 tracking-wide">
          {getArticleLogo()}
          <span className="text-[#C84323] font-bold uppercase">{article.category}</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>{article.date}</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Huge Article Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111215] tracking-tight leading-[1.12] mb-6 text-balance">
          {article.title}
        </h1>

        {/* Subtitle / Excerpt */}
        <p className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed mb-8 max-w-3xl">
          {article.subtitle || article.excerpt}
        </p>

        {/* Author Byline & Social Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-neutral-200">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border border-neutral-300 shadow-sm"
            />
            <div>
              <div className="text-sm font-semibold text-neutral-900">{article.author.name}</div>
              <div className="text-xs text-neutral-500">{article.author.role}</div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareTwitter}
              className="p-2 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 transition-colors cursor-pointer"
              title="Share on X"
              aria-label="Share on X"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 transition-colors text-xs font-medium cursor-pointer"
              title="Copy story link"
              aria-label="Copy story link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Large Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100 relative shadow-sm aspect-[16/9] max-h-[520px]">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            fallbackTitle={article.title}
          />
        </div>
        {article.imageCaption && (
          <p className="text-xs text-neutral-500 text-center mt-3 font-sans italic">
            Fig. 1 — {article.imageCaption}
          </p>
        )}
      </div>

      {/* Article Body with Desktop Sticky Sidebar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 max-w-[720px] mx-auto lg:mx-0">
            {/* Sections */}
            <div className="space-y-10 text-neutral-700 text-base sm:text-lg leading-[1.8]">
              {article.sections.map((section, sIdx) => (
                <section key={sIdx} id={`section-${sIdx}`} className="scroll-mt-24">
                  {section.heading && (
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111215] tracking-tight mt-10 mb-4 pt-4 border-t border-neutral-200">
                      {section.heading}
                    </h2>
                  )}

                  {section.content.map((paragraph, pIdx) => {
                    const isFirst = sIdx === 0 && pIdx === 0;

                    if (isFirst) {
                      const firstLetter = paragraph.charAt(0);
                      const restOfText = paragraph.slice(1);
                      return (
                        <p key={pIdx} className="mb-6 font-normal">
                          <span className="float-left text-5xl font-display font-extrabold text-[#C84323] mr-3 mt-1 leading-none">
                            {firstLetter}
                          </span>
                          {restOfText}
                        </p>
                      );
                    }

                    return (
                      <p key={pIdx} className="mb-6 font-normal">
                        {paragraph}
                      </p>
                    );
                  })}

                  {/* Pull Quote */}
                  {section.pullQuote && (
                    <figure className="my-8 py-6 px-6 sm:px-8 rounded-2xl bg-neutral-100/90 border-l-4 border-[#C84323] text-neutral-900 font-display text-lg sm:text-xl font-medium italic leading-snug">
                      "{section.pullQuote}"
                    </figure>
                  )}

                  {/* Callout box */}
                  {section.callout && (
                    <div className="my-8 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#C84323] uppercase font-semibold mb-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                        {section.callout.description}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Tags Strip */}
            <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 mr-2">TOPICS:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 border border-neutral-200 text-neutral-700"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Payfrica CTA Callout */}
            <div className="mt-12 p-8 rounded-3xl bg-[#111215] text-white border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-1">
                  Ready to move money without limits?
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Experience instant stablecoin cash-outs and sub-second settlement on Payfrica.
                </p>
              </div>
              <a
                href="https://www.payfrica.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#C84323] hover:bg-[#B0381D] active:bg-[#9B2F17] rounded-full transition-all shrink-0 shadow-lg shadow-[#C84323]/20"
              >
                <span>Launch Payfrica</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Desktop Sidebar: "On this page" TOC & Metadata */}
          <aside className="hidden lg:block lg:col-span-4 pl-4">
            <div className="sticky top-28 space-y-8">
              {/* Table of Contents */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-sm">
                <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-800 mb-4 font-semibold">
                  On this page
                </h4>
                <nav className="space-y-2 text-xs">
                  {article.sections
                    .filter((s) => s.heading)
                    .map((s, idx) => (
                      <a
                        key={idx}
                        href={`#section-${idx}`}
                        className="block text-neutral-500 hover:text-[#C84323] transition-colors py-1 pl-2 border-l border-neutral-200 hover:border-[#C84323] leading-normal"
                      >
                        {s.heading}
                      </a>
                    ))}
                </nav>
              </div>

              {/* Payfrica Product Card with Official Logo */}
              <div className="p-6 rounded-2xl bg-[#111215] text-white border border-white/10 shadow-lg">
                <div className="flex items-center gap-2.5 mb-3">
                  <PayfricaLogo size={28} />
                  <span className="font-display font-bold text-sm text-white">Trade on Payfrica</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Turn digital assets into cash in seconds. Zero fee off-ramp to Nigerian bank accounts.
                </p>
                <a
                  href="https://www.payfrica.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#C84323] hover:bg-[#B0381D] text-white rounded-full text-xs font-semibold transition-colors"
                >
                  <span>Trade Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Stories */}
      {relatedArticles.length > 0 && (
        <section className="py-14 sm:py-20 border-t border-neutral-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-2xl font-bold text-[#111215] mb-8">
              Related Perspectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} variant="standard" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Embedded Newsletter */}
      <Newsletter />
    </article>
  );
};
