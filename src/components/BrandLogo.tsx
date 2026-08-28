import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'badge';
  className?: string;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'full', className = '' }) => {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Exact Golden Winged Falcon / Bird Icon matching IMG_1026.jpeg */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldWingPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8D6" />
              <stop offset="25%" stopColor="#F5D77F" />
              <stop offset="55%" stopColor="#D4AF37" />
              <stop offset="85%" stopColor="#AA771C" />
              <stop offset="100%" stopColor="#7A5208" />
            </linearGradient>
            <linearGradient id="goldWingFeather2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A5C0A" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#F9E29B" />
              <stop offset="100%" stopColor="#FFFDF2" />
            </linearGradient>
            <linearGradient id="goldWingFeather3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFEAA7" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#966710" />
            </linearGradient>
            <linearGradient id="goldWingTail" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="60%" stopColor="#F5D77F" />
              <stop offset="100%" stopColor="#7A5208" />
            </linearGradient>
          </defs>

          {/* Top primary wing plume swooping left-upwards */}
          <path
            d="M8 8 C 32 38, 72 62, 114 63 C 86 58, 54 44, 28 22 C 20 16, 12 11, 8 8 Z"
            fill="url(#goldWingPrimary)"
          />

          {/* Second layered wing feather */}
          <path
            d="M18 28 C 38 50, 76 68, 108 72 C 84 66, 56 56, 34 38 C 26 33, 20 29, 18 28 Z"
            fill="url(#goldWingFeather2)"
            opacity="0.95"
          />

          {/* Third interior wing feather */}
          <path
            d="M30 48 C 50 64, 80 75, 100 78 C 80 74, 58 66, 44 54 C 36 49, 32 47, 30 48 Z"
            fill="url(#goldWingFeather3)"
            opacity="0.9"
          />

          {/* Bird Head & Beak swooping forward right */}
          <path
            d="M114 63 C 119 61, 121 57, 118 55 C 110 54, 98 57, 92 60 C 102 62, 109 63, 114 63 Z"
            fill="url(#goldWingPrimary)"
          />

          {/* Lower swooping tail feathers curved down and back */}
          <path
            d="M44 68 C 58 78, 78 84, 88 88 C 72 85, 56 79, 44 72 C 41 70, 42 69, 44 68 Z"
            fill="url(#goldWingTail)"
            opacity="0.85"
          />
          <path
            d="M50 78 C 62 84, 76 89, 82 92 C 70 90, 58 86, 49 81 Z"
            fill="url(#goldWingFeather2)"
            opacity="0.7"
          />
        </svg>
      </div>

      {variant !== 'badge' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-cinzel text-xl md:text-2xl font-black tracking-[0.16em] text-white">
              AIR TIME
            </span>
            <div className="hidden sm:flex items-center gap-1 ml-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#d4af37]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
            </div>
          </div>
          <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.28em] text-[#D4AF37] mt-1">
            Black Car & SUV Service
          </span>
          {variant === 'full' && (
            <span className="text-[7.5px] uppercase tracking-[0.2em] text-neutral-400 font-light mt-0.5 hidden sm:block">
              Luxury Transportation • Edmonton
            </span>
          )}
        </div>
      )}
    </div>
  );
};
