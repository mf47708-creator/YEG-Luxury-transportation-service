import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Shield, Sparkles, Clock, Smartphone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenDispatch?: () => void;
  onCallClick?: () => void;
  onOpenSmsCenter?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  onOpenDispatch,
  onCallClick,
  onOpenSmsCenter
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Book Ride' },
    { id: 'airport-rates', label: 'Airport Rates' },
    { id: 'fleet', label: 'Fleet' },
    { id: 'services', label: 'Services' },
    { id: 'why-us', label: 'Why Air Time' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro announcement bar in Deep Black and Champagne Gold */}
      <div className="bg-[#080808] border-b border-[#C9A45C]/20 text-[#A7A7A7] text-xs py-1.5 px-4 hidden md:block backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Live Fleet indicator */}
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#151515] border border-[#C9A45C]/40 text-[#F5F3EE] text-[11px] font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
              <span>Chauffeurs On Duty</span>
            </span>

            {/* Flight Radar Sync */}
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#151515] border border-white/10 text-[#F5F3EE] text-[11px] font-medium">
              <Sparkles className="w-3 h-3 text-[#E2C27A]" />
              <span>YEG Flight Tracking</span>
            </span>

            {/* 15-Min Early Guarantee */}
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C9A45C]/15 border border-[#C9A45C]/40 text-[#E2C27A] text-[11px] font-bold">
              <Clock className="w-3 h-3 text-[#C9A45C]" />
              <span>15-Min Early Guarantee</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenSmsCenter && (
              <button
                onClick={onOpenSmsCenter}
                className="text-[11px] uppercase tracking-wider text-[#F5F3EE] hover:text-[#E2C27A] transition-colors flex items-center gap-1.5 cursor-pointer bg-[#151515] hover:bg-[#202020] px-2.5 py-0.5 rounded-full border border-white/15"
                title="Open SMS Notification Dispatch Center"
              >
                <Smartphone className="w-3 h-3 text-[#C9A45C]" />
                <span>SMS Alert Center</span>
              </button>
            )}

            <button
              onClick={onOpenDispatch}
              className="text-[11px] uppercase tracking-wider text-[#F5F3EE] hover:text-[#E2C27A] transition-colors flex items-center gap-1.5 cursor-pointer bg-[#151515] hover:bg-[#202020] px-2.5 py-0.5 rounded-full border border-red-500/40"
            >
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping inline-block"></span>
              <span>24/7 Live Desk</span>
            </button>
            <a
              href="tel:+15877282828"
              onClick={() => {
                if (onCallClick) {
                  onCallClick();
                }
              }}
              className="flex items-center gap-1.5 font-bold text-[#F5F3EE] hover:text-[#E2C27A] transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>+1 (587) 728-2828</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#C9A45C]/25 py-3.5 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-[#080808]/95 via-[#080808]/85 to-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer group transition-transform duration-200 hover:scale-[1.01]"
          >
            <BrandLogo variant="full" />
          </div>

          {/* Desktop Nav Links: Black background with white text and gold hover effect */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-200 relative rounded-md ${
                    isActive
                      ? 'text-[#F5F3EE] font-bold bg-[#151515] border border-[#C9A45C]/50'
                      : 'text-[#A7A7A7] hover:text-[#F5F3EE] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C9A45C] rounded-full shadow-[0_0_8px_#C9A45C]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action CTA Buttons: Red & Gold with Black */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+15877282828"
              onClick={() => {
                if (onCallClick) {
                  onCallClick();
                }
              }}
              className="px-3.5 py-2.5 rounded-lg border border-red-500/50 bg-gradient-to-r from-[#C8102E] via-[#B91C1C] to-[#990000] text-white hover:from-[#DC2626] hover:to-[#B91C1C] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md shadow-red-950/40"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => handleLinkClick('booking')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#C9A45C]/30 hover:shadow-[#C9A45C]/50 transition-all duration-200 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border border-[#FFF1C5]/40"
            >
              <Calendar className="w-4 h-4 text-[#080808]" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+15877282828"
              onClick={() => {
                if (onCallClick) {
                  onCallClick();
                }
              }}
              className="p-2 rounded-lg bg-gradient-to-r from-[#C8102E] to-[#990000] border border-red-500/50 text-white cursor-pointer shadow-md shadow-red-950/40"
              aria-label="Call Air Time"
            >
              <Phone className="w-4 h-4 text-white" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#F5F3EE] hover:text-[#E2C27A] hover:bg-[#151515] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A45C]" /> : <Menu className="w-6 h-6 text-[#F5F3EE]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080808] border-b border-[#C9A45C]/30 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2.5 px-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#151515] text-[#F5F3EE] border border-[#C9A45C]/50 font-bold'
                    : 'text-[#A7A7A7] hover:bg-[#151515] hover:text-[#F5F3EE]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => handleLinkClick('booking')}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] text-[#080808] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C9A45C]/30 border border-[#FFF1C5]/40"
              >
                <Calendar className="w-4 h-4 text-[#080808]" />
                <span>Reserve Chauffeur Now</span>
              </button>

              <a
                href="tel:+15877282828"
                className="w-full py-3 rounded-lg border border-[#C9A45C]/40 bg-[#151515] text-[#F5F3EE] font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#202020] hover:border-[#E2C27A]"
              >
                <Phone className="w-4 h-4 text-[#C9A45C]" />
                <span>Call +1 (587) 728-2828</span>
              </a>

              <div className="flex items-center justify-between text-xs text-[#A7A7A7] pt-2 px-1">
                <span>Edmonton • YEG Airport • Alberta</span>
                <span className="text-[#C9A45C] font-bold">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

