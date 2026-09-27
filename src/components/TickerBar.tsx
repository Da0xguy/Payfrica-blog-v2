import React, { useState } from 'react';
import { ArrowRight, Calculator, X } from 'lucide-react';
import { 
  PayfricaLogo, 
  SuiLogo, 
  UsdcLogo, 
  UsdsuiLogo, 
  NairaLogo, 
  BaseLogo, 
  AvalancheLogo 
} from './Logos';

export const TickerBar: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [amount, setAmount] = useState('100');
  const [selectedAsset, setSelectedAsset] = useState<'USDC' | 'USDsui' | 'SUI'>('USDC');

  const rates: Record<'USDC' | 'USDsui' | 'SUI', number> = {
    USDC: 1590,
    USDsui: 1590,
    SUI: 5420,
  };

  const calculatedNgn = (parseFloat(amount) || 0) * rates[selectedAsset];

  const marqueeBadges = [
    { name: 'PAYFRICA LITE', icon: <PayfricaLogo size={15} /> },
    { name: 'SUI NETWORK', icon: <SuiLogo size={15} /> },
    { name: 'USDC NATIVE', icon: <UsdcLogo size={15} /> },
    { name: 'USDSUI', icon: <UsdsuiLogo size={15} /> },
    { name: 'NAIRA ₦ DIRECT', icon: <NairaLogo size={15} /> },
    { name: 'BASE L2', icon: <BaseLogo size={15} /> },
    { name: 'AVALANCHE', icon: <AvalancheLogo size={15} /> },
    { name: 'SUB-SECOND OFF-RAMP', icon: <span className="text-[#C84323] font-bold">⚡</span> },
    { name: 'FIAT VOUCHER RAILS', icon: <span className="text-amber-500 font-bold">🔗</span> },
  ];

  return (
    <div className="relative border-y border-neutral-200/90 bg-white overflow-hidden text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Animated Marquee with Official Logos */}
        <div className="flex-1 overflow-hidden relative w-full">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-6 text-neutral-500 font-mono text-[11px] uppercase tracking-wider">
            {[...marqueeBadges, ...marqueeBadges].map((item, idx) => (
              <span key={idx} className="flex items-center gap-2 shrink-0">
                {item.icon}
                <span className="text-neutral-800 font-medium">{item.name}</span>
                <span className="text-[#C84323]/50 ml-2">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Currency benchmarks & interactive rate simulator trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2.5 font-mono text-[11px] text-neutral-600">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200">
              <UsdcLogo size={14} />
              <span className="text-neutral-900 font-medium">USDC</span>
              <span className="text-neutral-400">→</span>
              <span className="text-neutral-900 font-bold">₦1,590</span>
            </span>

            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200">
              <SuiLogo size={14} />
              <span className="text-neutral-900 font-medium">SUI</span>
              <span className="text-neutral-400">→</span>
              <span className="text-neutral-900 font-bold">₦5,420</span>
            </span>
          </div>

          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium border border-neutral-200 transition-colors cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-[#C84323]" />
            <span>Simulate Rate</span>
          </button>
        </div>
      </div>

      {/* Embedded Quick Conversion Calculator Dropdown */}
      {showCalculator && (
        <div className="border-t border-neutral-200 bg-[#F8F9FA] px-4 py-4 sm:px-6 animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="text-xs font-semibold text-neutral-600">Convert</div>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-24 sm:w-28 bg-white border border-neutral-300 rounded-lg px-2.5 py-1 text-sm font-mono text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#C84323]"
                  placeholder="100"
                />
              </div>

              {/* Asset Selector */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-neutral-200">
                {(['USDC', 'USDsui', 'SUI'] as const).map((asset) => (
                  <button
                    key={asset}
                    onClick={() => setSelectedAsset(asset)}
                    className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
                      selectedAsset === asset
                        ? 'bg-[#111215] text-white font-bold'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {asset}
                  </button>
                ))}
              </div>

              <span className="text-neutral-400">≈</span>

              <div className="font-mono text-sm font-bold text-neutral-900 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-emerald-800">
                <NairaLogo size={14} />
                <span>₦{calculatedNgn.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a
                href="https://www.payfrica.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#C84323] hover:bg-[#B0381D] px-3.5 py-1.5 rounded-full transition-colors"
              >
                <span>Swap on Payfrica</span>
                <ArrowRight className="w-3 h-3" />
              </a>
              <button
                onClick={() => setShowCalculator(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
