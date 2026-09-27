import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { 
  PayfricaLogo, 
  SuiLogo, 
  UsdcLogo, 
  UsdsuiLogo, 
  NairaLogo, 
  BaseLogo, 
  AvalancheLogo 
} from './Logos';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-900 bg-[#111215] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white mb-4 group"
            >
              <PayfricaLogo size={32} className="transition-transform group-hover:scale-105" />
              <span>Payfrica</span>
            </Link>

            <p className="text-neutral-300 text-sm max-w-sm mb-6 leading-relaxed">
              Turn digital assets into cash, in seconds. The fastest way to swap, cash out, buy airtime/data, and save across Africa.
            </p>

            <div className="flex items-center gap-4 text-neutral-400">
              <a
                href="https://twitter.com/payfrica"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Payfrica on X"
              >
                X (Twitter)
              </a>
              <span className="text-neutral-600">·</span>
              <a
                href="https://t.me/payfrica"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Payfrica Telegram"
              >
                Telegram
              </a>
              <span className="text-neutral-600">·</span>
              <a
                href="https://discord.gg/payfrica"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Payfrica Discord"
              >
                Discord
              </a>
              <span className="text-neutral-600">·</span>
              <a
                href="https://github.com/TeamSushiSui/payfrica-lite-v2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Payfrica GitHub"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Editorial Columns */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4 font-semibold">
              Explore Journal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/category/Crypto" className="hover:text-white transition-colors">
                  Crypto & Protocols
                </Link>
              </li>
              <li>
                <Link to="/category/Payments" className="hover:text-white transition-colors">
                  Payments & Off-Ramps
                </Link>
              </li>
              <li>
                <Link to="/category/Africa" className="hover:text-white transition-colors">
                  Africa Is Building
                </Link>
              </li>
              <li>
                <Link to="/category/Stablecoins" className="hover:text-white transition-colors">
                  Stablecoin Utility
                </Link>
              </li>
              <li>
                <Link to="/category/Sui" className="hover:text-white transition-colors">
                  Sui Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/category/Guides" className="hover:text-white transition-colors">
                  Web3 Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Payfrica Ecosystem Links */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4 font-semibold">
              Payfrica Platform
            </h4>
            <ul className="space-y-2.5 mb-6">
              <li>
                <a
                  href="https://www.payfrica.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C84323] hover:text-[#e05433] font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Trade on Payfrica (Instant Cash Out)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://payfrica.xyz/airtime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Airtime & Utility Top-Ups</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://suiexplorer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Sui Network Explorer</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.payfrica.xyz/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Privacy & Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Supported Multi-Chain & Currencies Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-neutral-300 font-medium">Supported Ecosystem:</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <PayfricaLogo size={16} />
              <span>Payfrica</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <SuiLogo size={16} />
              <span>Sui</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <UsdcLogo size={16} />
              <span>USDC</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <UsdsuiLogo size={16} />
              <span>USDsui</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <NairaLogo size={16} />
              <span>Naira (₦)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <BaseLogo size={16} />
              <span>Base</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <AvalancheLogo size={16} />
              <span>Avalanche</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Payfrica. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>A product of</span>
            <span className="text-white font-medium">Team Sushi</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400 font-mono">Move on Sui</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
