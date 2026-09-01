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
    <footer className="bg-[#080808] border-t border-[#C9A45C]/20 text-[#A7A7A7] relative overflow-hidden">
      {/* Top champagne gold accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent" />

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

              <p className="font-serif-luxury italic text-[#F5F3EE] text-base mb-4">
                “We Will Serve You Like Royalty.”
              </p>

              <p className="text-[#A7A7A7] text-xs sm:text-sm leading-relaxed max-w-md mb-6">
                Air Time Black Car & SUV Service is Edmonton’s premier executive chauffeur provider.
                Specializing in seamless Edmonton International Airport (YEG) transfers, corporate travel, wedding elegance, and VIP event logistics across Alberta.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#A7A7A7]">
              <span className="flex items-center gap-1 text-[#C9A45C]">
                <Star className="w-4 h-4 fill-[#C9A45C]" />
                <span className="font-bold text-[#F5F3EE]">5.0 Star Rated</span>
              </span>
              <span>•</span>
              <span>Commercial Chauffeur Licensure</span>
              <span>•</span>
              <span className="text-[#F5F3EE] font-medium">24/7 Dispatch</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-sm font-bold text-[#F5F3EE] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#A7A7A7] hover:text-[#E2C27A] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-[#A7A7A7] hover:text-[#E2C27A] transition-colors"
                >
                  Luxury Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('airport-rates')}
                  className="text-[#A7A7A7] hover:text-[#E2C27A] transition-colors"
                >
                  Airport Flat Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fleet')}
                  className="text-[#A7A7A7] hover:text-[#E2C27A] transition-colors"
                >
                  Executive Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="text-[#A7A7A7] hover:text-[#E2C27A] transition-colors"
                >
                  Book Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-[#A7A7A7] hover:text-[#E2C27A] transition-colors"
                >
                  About Our Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[#A7A7A7] hover:text-[#E2C27A] transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-sm font-bold text-[#F5F3EE] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Chauffeur Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A7A7A7]">
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
            <h4 className="font-cinzel text-sm font-bold text-[#F5F3EE] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Dispatch & Operations
            </h4>
            <div className="space-y-3 text-xs text-[#A7A7A7]">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Primary 24/7 Dispatch:
                </span>
                <a
                  href="tel:+15877282828"
                  onClick={() => {
                    if (onCallClick) {
                      onCallClick();
                    }
                  }}
                  className="font-bold text-[#E2C27A] hover:text-[#F5F3EE] text-sm cursor-pointer"
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
                  className="text-[#F5F3EE] hover:text-[#E2C27A]"
                >
                  limoairtime@gmail.com
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                  Operational Base:
                </span>
                <span className="text-[#A7A7A7]">
                  Edmonton, Alberta, Canada
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} Air Time Black Car & SUV SERVICE. All rights reserved. Black Elegance SUV Service.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#A7A7A7]">Edmonton, Alberta</span>
            <span>•</span>
            <span className="hover:text-[#A7A7A7]">Privacy & Terms</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#151515] hover:bg-[#222222] text-[#C9A45C] hover:text-[#F5F3EE] transition-colors cursor-pointer border border-white/10"
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

