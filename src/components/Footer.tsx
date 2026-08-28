import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp, Star, Plane } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onCallClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onCallClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-300 relative overflow-hidden">
      {/* Top gold accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div
                onClick={() => onNavigate('home')}
                className="cursor-pointer inline-block mb-4"
              >
                <BrandLogo variant="full" />
              </div>

              <p className="font-serif-luxury italic text-[#D4AF37] text-base mb-4">
                “We Will Serve You Like Royalty.”
              </p>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-md mb-6">
                Air Time Black Car & SUV Service is Edmonton’s premier executive chauffeur provider.
                Specializing in seamless Edmonton International Airport (YEG) transfers, corporate travel, wedding elegance, and VIP event logistics across Alberta.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1 text-[#D4AF37]">
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <span className="font-bold text-white">5.0 Star Rated</span>
              </span>
              <span>•</span>
              <span>Commercial Chauffeur Licensure</span>
              <span>•</span>
              <span>24/7 Dispatch</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-neutral-400 hover:text-[#F5D77F] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-neutral-400 hover:text-[#F5D77F] transition-colors"
                >
                  Luxury Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('airport-rates')}
                  className="text-neutral-400 hover:text-[#F5D77F] transition-colors"
                >
                  Airport Flat Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fleet')}
                  className="text-neutral-400 hover:text-[#F5D77F] transition-colors"
                >
                  Executive Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="text-neutral-400 hover:text-[#F5D77F] transition-colors"
                >
                  Book Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-neutral-400 hover:text-[#F5D77F] transition-colors"
                >
                  About Our Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-neutral-400 hover:text-[#F5D77F] transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Chauffeur Services
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>Airport Transfer (YEG)</li>
              <li>Corporate & Executive Travel</li>
              <li>Weddings & Celebrations</li>
              <li>VIP Events & Rogers Place</li>
              <li>Night Out & Milestones</li>
              <li>Alberta Mountain Corridors</li>
            </ul>
          </div>

          {/* Col 4: Contact & Dispatch info */}
          <div className="lg:col-span-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Dispatch & Operations
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Primary 24/7 Dispatch:
                </span>
                <a
                  href="tel:+15877282828"
                  onClick={(e) => {
                    if (onCallClick) {
                      onCallClick();
                    }
                  }}
                  className="font-bold text-[#D4AF37] hover:text-[#F5D77F] text-sm cursor-pointer"
                >
                  +1 (587) 728-2828
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Email Reservations:
                </span>
                <a
                  href="mailto:limoairtime@gmail.com"
                  className="text-white hover:text-[#F5D77F]"
                >
                  limoairtime@gmail.com
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Operational Base:
                </span>
                <span className="text-neutral-300">
                  Edmonton, Alberta, Canada
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} Air Time Black Car & SUV SERVICE. All rights reserved. Black Elegance SUV Service.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300">Edmonton, Alberta</span>
            <span>•</span>
            <span className="hover:text-neutral-300">Privacy & Terms</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[#D4AF37] transition-colors cursor-pointer border border-neutral-800"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
