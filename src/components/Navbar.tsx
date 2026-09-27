import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowUpRight, BookOpen } from 'lucide-react';
import { PayfricaLogo } from './Logos';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const blogNavLinks = [
    { label: 'All Stories', href: '/' },
    { label: 'Stablecoins', href: '/category/Stablecoins' },
    { label: 'Payments', href: '/category/Payments' },
    { label: 'Guides', href: '/category/Guides' },
    { label: 'Africa', href: '/category/Africa' },
  ];

  return (
    <header className="sticky top-3 sm:top-5 z-50 px-4 max-w-4xl mx-auto w-full transition-all duration-200">
      {/* Floating Dark Pill Bar */}
      <div className="bg-[#111215] text-white rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-xl shadow-black/15 border border-white/10 flex items-center justify-between gap-3 sm:gap-6 backdrop-blur-md">
        
        {/* Brand: Official Payfrica Icon + Wordmark + Blog Badge */}
        <Link 
          to="/" 
          className="group flex items-center gap-2.5 font-display text-base sm:text-lg font-bold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C84323] rounded-full shrink-0"
        >
          <PayfricaLogo size={24} className="transition-transform duration-300 group-hover:scale-105" />
          <span className="font-semibold tracking-tight text-white text-base">Payfrica</span>
          <span className="text-[10px] font-mono uppercase bg-[#C84323]/25 text-[#FF7A59] border border-[#C84323]/35 px-2 py-0.5 rounded-full font-medium tracking-wider">
            Blog
          </span>
        </Link>

        {/* Center Nav Links: Editorial Blog Categories */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-neutral-300">
          {blogNavLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`transition-colors duration-150 text-sm font-medium hover:text-white ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-300'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search Icon + Trade Now Red Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer text-xs"
            title="Search articles (⌘K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-400">⌘K</span>
          </button>

          {/* Trade Now CTA Pill matching the screenshot */}
          <a
            href="https://www.payfrica.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#C84323] hover:bg-[#B0381D] active:bg-[#9B2F17] rounded-full transition-all duration-200 shadow-md shadow-[#C84323]/30 cursor-pointer"
          >
            <span>Trade Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-[#111215] border border-white/10 rounded-2xl shadow-xl text-neutral-200 flex flex-col gap-3 backdrop-blur-lg">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider px-2 pt-1">
            Blog Sections
          </div>
          {blogNavLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="px-3 py-2 text-sm font-medium hover:bg-white/5 rounded-lg hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="text-xs font-medium text-neutral-400 hover:text-white flex items-center gap-2 py-1 px-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search articles (⌘K)</span>
            </button>
            <a
              href="https://www.payfrica.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#FF7A59] hover:underline"
            >
              Payfrica Exchange ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
