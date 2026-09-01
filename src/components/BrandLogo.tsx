import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'badge' | 'card';
  className?: string;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'full', className = '' }) => {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Luxury Royal Blue & Vibrant Orange Oilers-Inspired Medallion Emblem */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_2px_16px_rgba(255,85,0,0.45)]"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Royal Blue & Orange Rim Gradient */}
            <linearGradient id="oilersRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FF7700" />
              <stop offset="60%" stopColor="#0033A0" />
              <stop offset="100%" stopColor="#00205B" />
            </linearGradient>

            {/* Inner Disc Deep Royal Blue Gradient */}
            <radialGradient id="royalDiscGradient" cx="40%" cy="35%" r="65%" fx="35%" fy="30%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="35%" stopColor="#0033A0" />
              <stop offset="70%" stopColor="#00205B" />
              <stop offset="100%" stopColor="#030C1A" />
            </radialGradient>

            {/* Vibrant Orange Gradient for Emblem Swooshes */}
            <linearGradient id="vibrantOrangeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D93800" />
              <stop offset="40%" stopColor="#FF5500" />
              <stop offset="70%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#FFF2B2" />
            </linearGradient>

            {/* Silver / White Metallic Highlight */}
            <linearGradient id="silverHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            {/* Dark contrast cutouts */}
            <linearGradient id="darkCutout" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#020813" />
              <stop offset="100%" stopColor="#06162D" />
            </linearGradient>
          </defs>

          {/* Outer Royal Blue Disc with Orange/Silver Rim */}
          <circle cx="60" cy="60" r="56" fill="url(#royalDiscGradient)" stroke="url(#oilersRimGradient)" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="51" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" opacity="0.8" />
          <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,85,0,0.35)" strokeWidth="1" />

          {/* Stylized A / Arrow / Lightning Spear (Top segment) */}
          <path
            d="M60 12 L72 38 L60 48 L48 38 Z"
            fill="url(#vibrantOrangeGradient)"
          />
          <path
            d="M58 14 L68 36 L58 44 L48 36 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <path
            d="M60 15 L78 52 L56 50 L64 36 L50 36 Z"
            fill="url(#vibrantOrangeGradient)"
          />

          {/* Bold Angular Stylized Wing */}
          <path
            d="M62 13 L86 44 L60 49 L70 34 L46 38 Z"
            fill="url(#silverHighlight)"
          />

          {/* Dynamic Speed Swoosh #1 (Upper sweeping ribbon to right edge) */}
          <path
            d="M24 72 C 34 52, 58 32, 104 32 C 86 38, 62 48, 42 76 C 35 76, 28 75, 24 72 Z"
            fill="url(#vibrantOrangeGradient)"
          />
          <path
            d="M27 75 C 38 56, 62 38, 102 34 C 84 40, 64 52, 45 78 C 38 78, 31 77, 27 75 Z"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Dynamic Speed Swoosh #2 (Lower parallel speed ribbon) */}
          <path
            d="M28 84 C 38 68, 56 54, 88 50 C 72 56, 54 68, 42 88 C 36 88, 30 87, 28 84 Z"
            fill="url(#vibrantOrangeGradient)"
          />

          {/* Lower Foundation Horizontal Block */}
          <path
            d="M50 78 L88 78 C 84 84, 76 89, 66 90 L50 90 Z"
            fill="url(#silverHighlight)"
          />

          {/* Inner Royal Blue Accents & 3D Shading */}
          <path
            d="M60 18 L70 38 L60 46 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <path
            d="M48 68 C 60 52, 80 42, 98 38 C 82 45, 66 56, 52 74 Z"
            fill="url(#vibrantOrangeGradient)"
            opacity="0.9"
          />
        </svg>
      </div>

      {variant !== 'badge' && (
        <div className="flex flex-col">
          {/* AIR TIME Main Wordmark in Crisp White */}
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-cinzel text-xl md:text-2xl font-black tracking-[0.16em] text-white">
              AIR TIME
            </span>
            <div className="hidden sm:flex items-center gap-1.5 ml-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#ff5500]" />
              <span className="w-2 h-2 rounded-full bg-[#0033A0] shadow-[0_0_8px_#0033a0]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
            </div>
          </div>

          {/* BLACK CAR & SUV SERVICE with vibrant orange and white styling */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.24em] text-[#FF6B00] whitespace-nowrap">
              Black Car & SUV Service
            </span>
          </div>

          {variant === 'full' && (
            <span className="text-[8px] uppercase tracking-[0.22em] text-slate-300 font-medium mt-0.5 hidden sm:block">
              “We Will Serve You Like Royalty.”
            </span>
          )}
        </div>
      )}
    </div>
  );
};
