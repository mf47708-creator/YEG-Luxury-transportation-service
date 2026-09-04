import React from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, Plane, Star, Clock, ChevronDown } from 'lucide-react';
import heroBgImage from '../assets/images/hero_jet_suv_1787621598993.jpg';

interface HeroProps {
  onBookNow: () => void;
  onViewRates: () => void;
  onExploreFleet: () => void;
  onCallNow?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookNow,
  onViewRates,
  onExploreFleet,
  onCallNow
}) => {
  return (
    <section id="home" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#080808]">
      {/* Background with Deep Black Luxury Overlay and Subtle Gold Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Air Time Luxury Black GMC Yukon Denali XL overlooking Edmonton skyline with executive jet"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-120"
        />
        {/* Deep Black & Warm Gold Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-[#080808]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A45C]/15 via-transparent to-transparent" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Main Headline in Ivory White with Champagne Gold */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F5F3EE] max-w-5xl leading-[1.15] mb-4">
          Air Time <span className="text-[#C9A45C]">Black Car & SUV</span> SERVICE
        </h1>

        {/* Tagline */}
        <div className="relative inline-block mb-6 md:mb-8">
          <p className="font-serif-luxury italic text-xl sm:text-2xl md:text-3xl text-[#F5F3EE] tracking-wide">
            “We Will Serve You Like Royalty.”
          </p>
          <div className="w-36 h-[2px] bg-gradient-to-r from-[#C8102E] via-[#C9A45C] to-[#C8102E] mx-auto mt-2.5" />
        </div>

        {/* AIRPORT FLAT RATES Button - Champagne Gold Flashing Action with Black Text */}
        <div className="w-full max-w-4xl mb-5 flex items-center justify-center">
           <button
             onClick={onViewRates}
             className="w-full sm:w-auto px-8 sm:px-14 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] border-2 border-[#FFF1C5] text-[#080808] font-black text-base sm:text-lg md:text-xl uppercase tracking-widest backdrop-blur-md shadow-2xl transition-all duration-200 flex items-center justify-center gap-3.5 cursor-pointer transform hover:-translate-y-1 group animate-gold-flash"
           >
             <div className="p-1.5 rounded-lg bg-black/15 text-[#080808] group-hover:scale-110 transition-transform">
               <Plane className="w-6 h-6 text-[#080808]" />
             </div>
             <span className="tracking-widest font-black text-[#080808] drop-shadow-sm font-cinzel">AIRPORT FLAT RATES</span>
           </button>
         </div>

        {/* Featured Hero Photo Showcase with Champagne Gold Border */}
        <div className="w-full max-w-4xl mb-8 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#C9A45C]/40 shadow-2xl shadow-black/80 bg-[#151515] backdrop-blur-sm group relative">
          <img
            src={heroBgImage}
            alt="Air Time Luxury Black 2026 GMC Yukon Denali XL overlooking Edmonton skyline with executive jet"
            className="w-full h-56 sm:h-80 md:h-96 object-cover object-center filter brightness-95 group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Primary Call to Action Buttons Below Picture */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          {/* 1. Book Now - Champagne Gold Action with Black Text */}
          <button
            onClick={onBookNow}
            className="w-full sm:w-auto px-10 py-4.5 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-[#C9A45C]/30 hover:shadow-[#C9A45C]/50 transition-all duration-200 flex items-center justify-center gap-3 group cursor-pointer transform hover:-translate-y-0.5 border border-[#FFF1C5]/40"
          >
            <Calendar className="w-5 h-5 text-[#080808]" />
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4 text-[#080808] transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* 2. Call Now - Royal Red & Gold Button */}
          <a
            href="tel:+15877282828"
            onClick={() => {
              if (onCallNow) {
                onCallNow();
              }
            }}
            className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-gradient-to-r from-[#C8102E] via-[#B91C1C] to-[#990000] hover:from-[#DC2626] hover:to-[#B91C1C] border-2 border-red-500/60 hover:border-red-400 text-white font-bold text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-red-950/50 transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4 text-white group-hover:animate-bounce" />
            <span>Call Now (+1 587-728-2828)</span>
          </a>
        </div>

        {/* Fleet & Guarantee Highlights Grid in Charcoal and Champagne Gold */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl w-full pt-4 border-t border-white/10">
          {/* 5.0 Star Rated */}
          <div className="flex flex-col items-center p-3.5 sm:p-4 rounded-xl bg-[#151515] border border-white/10 hover:border-[#C9A45C]/50 backdrop-blur-sm transition-colors shadow-md">
            <div className="flex items-center gap-1.5 text-[#F5F3EE] font-bold text-sm sm:text-base">
              <Star className="w-4 h-4 fill-[#E2C27A] text-[#E2C27A]" />
              <span>5.0 Star Rated</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#A7A7A7] mt-1 font-medium">140+ Google Reviews</span>
          </div>

          {/* YEG Airport VIP */}
          <div className="flex flex-col items-center p-3.5 sm:p-4 rounded-xl bg-[#151515] border border-white/10 hover:border-[#C9A45C]/50 backdrop-blur-sm transition-colors shadow-md">
            <div className="flex items-center gap-1.5 text-[#F5F3EE] font-bold text-sm sm:text-base">
              <Plane className="w-4 h-4 text-[#C9A45C]" />
              <span>YEG Airport VIP</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#A7A7A7] mt-1 font-medium">Flight Radar Sync</span>
          </div>

          {/* 15-Min Early Guarantee */}
          <div className="flex flex-col items-center p-3.5 sm:p-4 rounded-xl bg-[#151515] border border-white/10 hover:border-[#C9A45C]/50 backdrop-blur-sm transition-colors shadow-md">
            <div className="flex items-center gap-1.5 text-[#F5F3EE] font-bold text-sm sm:text-base">
              <Clock className="w-4 h-4 text-[#C9A45C]" />
              <span>15-Min Early</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#A7A7A7] mt-1 font-medium">Punctuality Guaranteed</span>
          </div>

          {/* 2026 Fleet */}
          <div className="flex flex-col items-center p-3.5 sm:p-4 rounded-xl bg-[#151515] border border-white/10 hover:border-[#C9A45C]/50 backdrop-blur-sm transition-colors shadow-md">
            <div className="flex items-center gap-1.5 text-[#F5F3EE] font-bold text-sm sm:text-base">
              <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
              <span>2026 Fleet</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#A7A7A7] mt-1 font-medium">Yukon Denali & Navigator</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          onClick={onExploreFleet}
          className="mt-8 flex flex-col items-center text-[#A7A7A7] hover:text-[#F5F3EE] cursor-pointer transition-colors group"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium mb-1">Explore Executive Services</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#C9A45C]" />
        </div>
      </div>
    </section>
  );
};

