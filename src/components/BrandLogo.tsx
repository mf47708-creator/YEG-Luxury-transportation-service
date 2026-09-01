import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'badge' | 'card';
  className?: string;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'full', className = '' }) => {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Luxury Black & Champagne Gold Medallion Emblem */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_2px_16px_rgba(201,164,92,0.4)]"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Champagne Gold & Soft Gold Rim Gradient */}
            <linearGradient id="goldRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1C5" />
              <stop offset="30%" stopColor="#E2C27A" />
              <stop offset="70%" stopColor="#C9A45C" />
              <stop offset="100%" stopColor="#8C6B28" />
            </linearGradient>

            {/* Inner Disc Deep Black & Charcoal Radial Gradient */}
            <radialGradient id="blackDiscGradient" cx="40%" cy="35%" r="65%" fx="35%" fy="30%">
              <stop offset="0%" stopColor="#222222" />
              <stop offset="45%" stopColor="#151515" />
              <stop offset="80%" stopColor="#0D0D0D" />
              <stop offset="100%" stopColor="#050505" />
            </radialGradient>

            {/* Champagne Gold Gradient for Wings & Emblem Swooshes */}
            <linearGradient id="champagneGoldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A7843B" />
              <stop offset="40%" stopColor="#C9A45C" />
              <stop offset="75%" stopColor="#E2C27A" />
              <stop offset="100%" stopColor="#FFF4D0" />
            </linearGradient>

            {/* Ivory / Pure White Metallic Highlight */}
            <linearGradient id="ivoryHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F5F3EE" />
              <stop offset="100%" stopColor="#D8D5CC" />
            </linearGradient>
          </defs>

          {/* Outer Black Disc with Champagne Gold Rim */}
          <circle cx="60" cy="60" r="56" fill="url(#blackDiscGradient)" stroke="url(#goldRimGradient)" strokeWidth="3" />
          <circle cx="60" cy="60" r="51" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" opacity="0.8" />
          <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(201,164,92,0.4)" strokeWidth="1" />

          {/* Stylized A / Arrow / Crown Spear (Top segment) */}
          <path
            d="M60 12 L72 38 L60 48 L48 38 Z"
            fill="url(#champagneGoldGradient)"
          />
          <path
            d="M58 14 L68 36 L58 44 L48 36 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <path
            d="M60 15 L78 52 L56 50 L64 36 L50 36 Z"
            fill="url(#champagneGoldGradient)"
          />

          {/* Bold Angular Stylized Wing */}
          <path
            d="M62 13 L86 44 L60 49 L70 34 L46 38 Z"
            fill="url(#ivoryHighlight)"
          />

          {/* Dynamic Speed Swoosh #1 (Upper sweeping ribbon) */}
          <path
            d="M24 72 C 34 52, 58 32, 104 32 C 86 38, 62 48, 42 76 C 35 76, 28 75, 24 72 Z"
            fill="url(#champagneGoldGradient)"
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
            fill="url(#champagneGoldGradient)"
          />

          {/* Lower Foundation Horizontal Block */}
          <path
            d="M50 78 L88 78 C 84 84, 76 89, 66 90 L50 90 Z"
            fill="url(#ivoryHighlight)"
          />

          {/* Inner Accents & 3D Shading */}
          <path
            d="M60 18 L70 38 L60 46 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <path
            d="M48 68 C 60 52, 80 42, 98 38 C 82 45, 66 56, 52 74 Z"
            fill="url(#champagneGoldGradient)"
            opacity="0.9"
          />
        </svg>
      </div>

      {variant !== 'badge' && (
        <div className="flex flex-col">
          {/* AIR TIME Main Wordmark in Ivory White */}
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-cinzel text-xl md:text-2xl font-black tracking-[0.16em] text-[#F5F3EE]">
              AIR TIME
            </span>
            <div className="hidden sm:flex items-center gap-1.5 ml-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C9A45C] shadow-[0_0_8px_#C9A45C]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2C27A] shadow-[0_0_6px_#E2C27A]" />
              <span className="w-1 h-1 rounded-full bg-[#F5F3EE] opacity-80" />
            </div>
          </div>

          {/* BLACK CAR & SUV SERVICE with Champagne Gold styling */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.24em] text-[#C9A45C] whitespace-nowrap">
              Black Car & SUV Service
            </span>
          </div>

          {variant === 'full' && (
            <span className="text-[8px] uppercase tracking-[0.22em] text-[#A7A7A7] font-medium mt-0.5 hidden sm:block">
              “We Will Serve You Like Royalty.”
            </span>
          )}
        </div>
      )}
    </div>
  );
};

