import React from "react";
import payfricaImg from "@/src/assets/logos/payfrica.png";
import suiImg from "@/src/assets/logos/sui.png";
import usdcImg from "@/src/assets/logos/usdc.png";
import usdsuiImg from "@/src/assets/logos/usdsui.png";
import nairaImg from "@/src/assets/logos/naira.png";
import baseImg from "@/src/assets/logos/base.png";
import avalancheImg from "@/src/assets/logos/avalanche.png";

export type SupportedAssetOrChain = 
  | 'payfrica' 
  | 'sui' 
  | 'usdc' 
  | 'usdsui' 
  | 'naira' 
  | 'base' 
  | 'avalanche';

export const LOGO_ASSETS: Record<SupportedAssetOrChain, string> = {
  payfrica: payfricaImg,
  sui: suiImg,
  usdc: usdcImg,
  usdsui: usdsuiImg,
  naira: nairaImg,
  base: baseImg,
  avalanche: avalancheImg,
};

export const ECOSYSTEM_LOGOS_INFO: Record<SupportedAssetOrChain, {
  name: string;
  ticker: string;
  description: string;
  image: string;
}> = {
  payfrica: {
    name: 'Payfrica',
    ticker: 'PAYFRICA',
    description: 'Fast non-custodial fiat & crypto payment gateway for Africa',
    image: payfricaImg,
  },
  sui: {
    name: 'Sui Network',
    ticker: 'SUI',
    description: 'Object-centric high-performance Layer 1 with sub-second finality',
    image: suiImg,
  },
  usdc: {
    name: 'USD Coin',
    ticker: 'USDC',
    description: 'Circle-issued digital dollar fully backed by cash and US treasuries',
    image: usdcImg,
  },
  usdsui: {
    name: 'USDsui',
    ticker: 'USDSUI',
    description: 'Native dollar stablecoin standard built directly for the Sui ecosystem',
    image: usdsuiImg,
  },
  naira: {
    name: 'Nigerian Naira',
    ticker: 'NGN (₦)',
    description: 'Direct automated settlement into all commercial Nigerian bank accounts',
    image: nairaImg,
  },
  base: {
    name: 'Base',
    ticker: 'BASE',
    description: 'Coinbase-incubated Ethereum L2 optimized for low gas fees',
    image: baseImg,
  },
  avalanche: {
    name: 'Avalanche',
    ticker: 'AVAX',
    description: 'Fast, secure consensus protocol with custom app-chain subnets',
    image: avalancheImg,
  },
};

interface LogoProps {
  size?: number;
  className?: string;
  alt?: string;
}

export const PayfricaLogo: React.FC<LogoProps> = ({ size = 24, className = '', alt = 'Payfrica' }) => (
  <img 
    src={payfricaImg} 
    alt={alt} 
    width={size} 
    height={size} 
    style={{ width: size, height: size }}
    className={`object-contain inline-block shrink-0 ${className}`} 
    loading="eager" 
  />
);

export const SuiLogo: React.FC<LogoProps> = ({ size = 24, className = '', alt = 'Sui' }) => (
  <img 
    src={suiImg} 
    alt={alt} 
    width={size} 
    height={size} 
    style={{ width: size, height: size }}
    className={`object-contain inline-block shrink-0 ${className}`} 
    loading="lazy" 
  />
);

export const UsdcLogo: React.FC<LogoProps> = ({ size = 24, className = '', alt = 'USDC' }) => (
  <img 
    src={usdcImg} 
    alt={alt} 
    width={size} 
    height={size} 
    style={{ width: size, height: size }}
    className={`object-contain inline-block shrink-0 ${className}`} 
    loading="lazy" 
  />
);

export const UsdsuiLogo: React.FC<LogoProps> = ({ size = 24, className = '', alt = 'USDsui' }) => (
  <img 
    src={usdsuiImg} 
    alt={alt} 
    width={size} 
    height={size} 
    style={{ width: size, height: size }}
    className={`object-contain inline-block shrink-0 ${className}`} 
    loading="lazy" 
  />
);

export const NairaLogo: React.FC<LogoProps> = ({ size = 24, className = '', alt = 'Naira (₦)' }) => (
  <img 
    src={nairaImg} 
    alt={alt} 
    width={size} 
    height={size} 
    style={{ width: size, height: size }}
    className={`object-contain inline-block shrink-0 ${className}`} 
    loading="lazy" 
  />
);

export const BaseLogo: React.FC<LogoProps> = ({ size = 24, className = '', alt = 'Base' }) => (
  <img 
    src={baseImg} 
    alt={alt} 
    width={size} 
    height={size} 
    style={{ width: size, height: size }}
    className={`object-contain inline-block shrink-0 ${className}`} 
    loading="lazy" 
  />
);

export const AvalancheLogo: React.FC<LogoProps> = ({ size = 24, className = '', alt = 'Avalanche' }) => (
  <img 
    src={avalancheImg} 
    alt={alt} 
    width={size} 
    height={size} 
    style={{ width: size, height: size }}
    className={`object-contain inline-block shrink-0 ${className}`} 
    loading="lazy" 
  />
);
