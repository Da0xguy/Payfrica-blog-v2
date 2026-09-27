import React, { useState } from 'react';
import { Newspaper } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Editorial illustration',
  className = '',
  containerClassName = '',
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`relative overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center p-6 text-center text-neutral-400 ${containerClassName || className}`}
      >
        <div className="w-12 h-12 rounded-full bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center mb-3 text-emerald-400">
          <Newspaper className="w-5 h-5" />
        </div>
        <p className="text-xs font-medium text-neutral-300 tracking-wide uppercase line-clamp-1">
          {fallbackTitle || 'Payfrica Journal'}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
      )}
    </div>
  );
};
