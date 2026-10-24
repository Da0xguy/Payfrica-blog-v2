import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, X, Sparkles, BookOpen, Search } from 'lucide-react';
import { 
  PayfricaLogo, 
  SuiLogo, 
  UsdcLogo, 
  UsdsuiLogo, 
  NairaLogo, 
  BaseLogo, 
  AvalancheLogo,
  ECOSYSTEM_LOGOS_INFO,
  SupportedAssetOrChain 
} from './Logos';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onSelectCategory?: (category: string) => void;
  onOpenSearch?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onExploreClick, 
  onSelectCategory,
  onOpenSearch 
}) => {
  const [showBotChainBanner, setShowBotChainBanner] = useState(true);
  const [activeLogoHover, setActiveLogoHover] = useState<SupportedAssetOrChain | null>(null);

  const supportedLogos: { id: SupportedAssetOrChain; component: React.ReactNode }[] = [
    { id: 'payfrica', component: <PayfricaLogo size={24} /> },
    { id: 'sui', component: <SuiLogo size={24} /> },
    { id: 'usdc', component: <UsdcLogo size={24} /> },
    { id: 'usdsui', component: <UsdsuiLogo size={24} /> },
    { id: 'naira', component: <NairaLogo size={24} /> },
    { id: 'base', component: <BaseLogo size={24} /> },
    { id: 'avalanche', component: <AvalancheLogo size={24} /> },
  ];

  const popularTopics = [
    'Stablecoins',
    'Payments',
    'Sui',
    'Africa',
    'Guides',
    'Product'
  ];

  return (
    <section className="relative w-full min-w-0 overflow-hidden bg-[#F8F9FA] px-0 pt-7 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20">
      
      {/* Background Concentric Circles matching the design reference */}
      <div className="hero-concentric-rings select-none pointer-events-none">
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
        <div className="hero-ring hero-ring-3" />
        <div className="hero-ring hero-ring-4" />
        <div className="hero-ring hero-ring-5" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Center Hero Content */}
        <div className="mx-auto mb-8 w-full max-w-3xl text-center sm:mb-14">

          {/* Punchy Headline matching the design screenshot */}
          <h1 className="mb-4 font-display text-[clamp(2.15rem,8vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-[#111215] [text-wrap:balance] sm:mb-5 sm:text-5xl md:text-6xl lg:text-[62px]">
            {['Turn', 'digital', 'assets'].map((word, index) => (
              <span key={word} className="hero-word-enter mr-[0.22em] inline-block" style={{ animationDelay: `${index * 90}ms` }}>
                {word}
              </span>
            ))}
            <br className="hidden sm:inline" />
            {['into', 'cash,', 'in', 'seconds'].map((word, index) => (
              <span
                key={word}
                className="hero-word-enter mr-[0.22em] inline-block"
                style={{ animationDelay: `${(index + 3) * 90}ms` }}
              >
                {word === 'cash,' ? <span className="hero-highlight">{word}</span> : word}
              </span>
            ))}
          </h1>

          {/* Subtitle connecting the landing page theme to real blog stories */}
          <p className="hero-copy-enter mx-auto mb-6 max-w-2xl text-sm font-normal leading-relaxed text-neutral-600 sm:mb-8 sm:text-base md:text-lg">
            The official publication of Payfrica. Deep dives, market intelligence, builder guides, and research on stablecoins, cross-border payments, and Web3 finance across Nigeria, Kenya, Ghana, and Africa.
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-actions-enter mb-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#C84323] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C84323]/25 transition-all duration-200 hover:bg-[#B0381D] active:bg-[#9B2F17] sm:px-7 sm:text-base sm:hover:-translate-y-0.5"
            >
              <span>Explore All Stories</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neutral-200/90 bg-white px-5 py-3.5 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:bg-neutral-100 sm:text-base"
              >
                <Search className="w-4 h-4 text-neutral-500" />
                <span>Search Articles</span>
              </button>
            )}
          </div>

          {/* Quick Category / Topic Chips */}
          <div className="hero-topics-enter flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="mr-1 w-full font-mono text-neutral-400 sm:w-auto">Popular Topics:</span>
            {popularTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(topic);
                  }
                  if (onExploreClick) {
                    onExploreClick();
                  }
                }}
                className="px-3 py-1 bg-white hover:bg-neutral-100/80 active:bg-neutral-200 border border-neutral-200/80 rounded-full text-neutral-700 font-medium transition-colors cursor-pointer hover:border-neutral-300"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Prominent Featured Story Cards Grid */}
        <div className="mb-10 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mb-12 lg:grid-cols-3 lg:gap-6">
          
          {/* Card 1: Lead Story Link - "Any asset in. Local cash out." */}
          <Link
            to="/journal/why-stablecoins-are-becoming-more-than-a-crypto-story-in-africa"
            className="hero-card-enter group relative block h-[clamp(18rem,78vw,24rem)] min-w-0 overflow-hidden rounded-3xl border border-neutral-200/80 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-xl sm:h-96 sm:hover:-translate-y-1"
          >
            {/* Background Image: stylish warm lighting portrait */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Any asset in. Local cash out."
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              loading="lazy"
            />
            {/* Dark warm gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
            
            {/* Card Content */}
            <div className="relative z-10 p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono font-medium text-white mb-3">
                  <span>Featured Lead · 8 min</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Any asset in.<br />
                  Local cash out.
                </h3>
              </div>

              <div>
                <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                  Why stablecoins are becoming more than a speculative crypto story across Nigeria and Ghana.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                  <span>Read full story</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: 10X Guide - Speed & Settlement */}
          <Link
            to="/journal/how-to-cash-out-usdc-in-lagos-in-under-60-seconds"
            className="hero-card-enter group relative block h-[clamp(18rem,78vw,24rem)] min-w-0 overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-900 shadow-sm transition-all duration-300 hover:shadow-xl sm:h-96 sm:hover:-translate-y-1"
          >
            {/* Background Image: cyclist in speed motion */}
            <img
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
              alt="10X speed"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-[#111215]/60 to-transparent" />

            {/* Card Content */}
            <div className="relative z-10 p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-mono font-medium text-white mb-2">
                    <span>Practical Guide · 5 min</span>
                </div>
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  10X
                </div>
              </div>

              <div>
                <p className="text-sm sm:text-base text-neutral-200 font-medium leading-snug mb-3">
                  Cash out up to 10x faster than the banks, settled in seconds, not days.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  <span>Read guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Golden sphere & Official Payfrica Logo Badge */}
          <Link
            to="/journal/the-rise-of-usdsui-and-native-liquidity-in-west-africa"
            className="hero-card-enter group relative flex h-[clamp(18rem,78vw,24rem)] min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-amber-200/60 bg-[#FDF7E7] p-6 shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-xl sm:h-96 sm:p-7 sm:hover:-translate-y-1"
          >
            {/* Golden 3D Sphere / Dot Pattern Illustration */}
            <div className="absolute right-0 top-0 w-64 h-64 translate-x-12 -translate-y-8 pointer-events-none opacity-85">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 blur-[2px] opacity-40 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-amber-500/20" />
            </div>

            {/* Payfrica Roundel Mark on Top Left */}
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full shadow-md bg-white flex items-center justify-center p-1 border border-neutral-100">
                <PayfricaLogo size={36} />
              </div>
              <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-200/60 text-amber-900 font-semibold">
                Ecosystem Research
              </span>
            </div>

            {/* Editorial Copy */}
            <div className="relative z-10">
              <p className="text-neutral-800 text-sm sm:text-base font-medium leading-relaxed mb-3">
                The future of African payments starts here, shaping how money moves on-chain.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C84323] group-hover:underline">
                <span>Explore research</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Floating "LIVE ON BOT CHAIN" Network Toast */}
        {showBotChainBanner && (
          <div className="fixed bottom-3 left-3 right-3 z-40 w-auto rounded-2xl border border-white/10 bg-[#111215] p-4 text-white shadow-2xl backdrop-blur-xl animate-fade-in sm:bottom-6 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm sm:p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                  LIVE ON BOT CHAIN
                </span>
              </div>
              <button
                onClick={() => setShowBotChainBanner(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h4 className="font-display text-sm font-bold text-white mb-1">
              Payfrica is now live on BOT Chain
            </h4>

            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Trade stablecoins and cash out to local currency on BOT Chain. Payfrica's newest network.
            </p>

            <Link
              to="/journal/why-stablecoins-are-becoming-more-than-a-crypto-story-in-africa"
              onClick={() => setShowBotChainBanner(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <span>Read story</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Supported Multi-Chain Rails Strip with Official Logos */}
        <div className="hero-rails-enter border-t border-neutral-200/90 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
              Covered Networks & Currencies
            </div>

            {/* Official Logo Icons Strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {supportedLogos.map(({ id, component }) => {
                const info = ECOSYSTEM_LOGOS_INFO[id];
                return (
                  <div
                    key={id}
                    className="relative group flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                    onMouseEnter={() => setActiveLogoHover(id)}
                    onMouseLeave={() => setActiveLogoHover(null)}
                    title={info.name}
                  >
                    <div className="w-7 h-7 flex items-center justify-center">
                      {component}
                    </div>
                    <span className="text-xs font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
                      {info.ticker}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
