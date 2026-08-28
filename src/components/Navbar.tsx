import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Clock, Sparkles, Smartphone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenDispatch: () => void;
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Airport Rates', id: 'airport-rates' },
    { label: 'Fleet', id: 'fleet' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro announcement bar in black, gold and white */}
      <div className="bg-black border-b border-neutral-800 text-neutral-300 text-xs py-1.5 px-4 hidden md:block backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Live Fleet indicator */}
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-white text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Chauffeurs On Duty</span>
            </span>

            {/* Flight Radar Sync */}
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-white text-[11px] font-medium">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>YEG Flight Tracking</span>
            </span>

            {/* 15-Min Early Guarantee */}
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#F5D77F] text-[11px] font-medium">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              <span>15-Min Early Guarantee</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenSmsCenter && (
              <button
                onClick={onOpenSmsCenter}
                className="text-[11px] uppercase tracking-wider text-white hover:text-[#F5D77F] transition-colors flex items-center gap-1.5 cursor-pointer bg-neutral-900 hover:bg-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-800"
                title="Open SMS Notification Dispatch Center"
              >
                <Smartphone className="w-3 h-3 text-[#D4AF37]" />
                <span>SMS Alert Center</span>
              </button>
            )}

            <button
              onClick={onOpenDispatch}
              className="text-[11px] uppercase tracking-wider text-white hover:text-[#F5D77F] transition-colors flex items-center gap-1.5 cursor-pointer bg-neutral-900 px-2.5 py-0.5 rounded-full border border-neutral-800"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping inline-block"></span>
              <span>24/7 Live Desk</span>
            </button>
            <a
              href="tel:+15877282828"
              onClick={() => {
                if (onCallClick) {
                  onCallClick();
                }
              }}
              className="flex items-center gap-1.5 font-bold text-white hover:text-[#F5D77F] transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>+1 (587) 728-2828</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-[#D4AF37]/30 py-3.5 shadow-2xl shadow-black/90'
            : 'bg-gradient-to-b from-black/95 via-black/80 to-transparent py-4 md:py-5'
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

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-200 relative rounded-md ${
                    isActive
                      ? 'text-[#F5D77F] font-bold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+15877282828"
              onClick={() => {
                if (onCallClick) {
                  onCallClick();
                }
              }}
              className="px-3.5 py-2.5 rounded-lg border border-neutral-700 text-white hover:bg-white/10 hover:border-[#D4AF37] hover:text-[#F5D77F] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => handleLinkClick('booking')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] hover:from-[#FFF8D6] hover:to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-200 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border border-[#FFF8D6]/60"
            >
              <Calendar className="w-4 h-4 text-black" />
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
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white cursor-pointer"
              aria-label="Call Air Time"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-b border-[#D4AF37]/30 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2.5 px-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#D4AF37]/15 text-[#F5D77F] border border-[#D4AF37]/40'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
              <button
                onClick={() => handleLinkClick('booking')}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/25 border border-[#FFF8D6]/60"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Reserve Chauffeur Now</span>
              </button>

              <a
                href="tel:+15877282828"
                className="w-full py-3 rounded-lg border border-neutral-700 text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-900 hover:border-[#D4AF37]"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call +1 (587) 728-2828</span>
              </a>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 px-1">
                <span>Edmonton • YEG Airport • Alberta</span>
                <span className="text-[#D4AF37] font-medium">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
