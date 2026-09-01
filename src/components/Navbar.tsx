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
      {/* Top micro announcement bar in Royal Blue, Orange and Crisp White */}
      <div className="bg-[#020813] border-b border-[#0033A0]/40 text-slate-200 text-xs py-1.5 px-4 hidden md:block backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Live Fleet indicator */}
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#071B38] border border-[#0033A0]/60 text-white text-[11px] font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              <span>Chauffeurs On Duty</span>
            </span>

            {/* Flight Radar Sync */}
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#071B38] border border-blue-900/60 text-slate-200 text-[11px] font-medium">
              <Sparkles className="w-3 h-3 text-[#FF7700]" />
              <span>YEG Flight Tracking</span>
            </span>

            {/* 15-Min Early Guarantee */}
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF5500]/15 border border-[#FF5500]/40 text-[#FF8C00] text-[11px] font-bold">
              <Clock className="w-3 h-3 text-[#FF5500]" />
              <span>15-Min Early Guarantee</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenSmsCenter && (
              <button
                onClick={onOpenSmsCenter}
                className="text-[11px] uppercase tracking-wider text-white hover:text-[#FF8C00] transition-colors flex items-center gap-1.5 cursor-pointer bg-[#071B38] hover:bg-[#0C244C] px-2.5 py-0.5 rounded-full border border-blue-900/70"
                title="Open SMS Notification Dispatch Center"
              >
                <Smartphone className="w-3 h-3 text-[#FF5500]" />
                <span>SMS Alert Center</span>
              </button>
            )}

            <button
              onClick={onOpenDispatch}
              className="text-[11px] uppercase tracking-wider text-white hover:text-[#FF8C00] transition-colors flex items-center gap-1.5 cursor-pointer bg-[#071B38] px-2.5 py-0.5 rounded-full border border-blue-900/70"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping inline-block"></span>
              <span>24/7 Live Desk</span>
            </button>
            <a
              href="tel:+15877282828"
              onClick={() => {
                if (onCallClick) {
                  onCallClick();
                }
              }}
              className="flex items-center gap-1.5 font-bold text-white hover:text-[#FF8C00] transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>+1 (587) 728-2828</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030c1a]/95 backdrop-blur-md border-b border-[#0033A0]/40 py-3.5 shadow-2xl shadow-[#020813]/90'
            : 'bg-gradient-to-b from-[#020813]/95 via-[#030c1a]/85 to-transparent py-4 md:py-5'
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
                      ? 'text-white font-bold bg-[#0033A0]/30 border border-[#0033A0]/50'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FF5500] rounded-full shadow-[0_0_8px_#ff5500]" />
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
              className="px-3.5 py-2.5 rounded-lg border border-slate-600 bg-[#071B38] text-white hover:bg-[#0C244C] hover:border-[#FF5500] hover:text-[#FF8C00] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => handleLinkClick('booking')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FF5500]/30 hover:shadow-[#FF5500]/50 transition-all duration-200 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border border-orange-300/40"
            >
              <Calendar className="w-4 h-4 text-white" />
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
              className="p-2 rounded-lg bg-[#071B38] border border-[#0033A0]/60 text-white cursor-pointer"
              aria-label="Call Air Time"
            >
              <Phone className="w-4 h-4 text-[#FF5500]" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#071B38] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF5500]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030c1a] border-b border-[#0033A0]/40 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2.5 px-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#0033A0]/25 text-white border border-[#FF5500]/50 font-bold'
                    : 'text-slate-300 hover:bg-[#071B38] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => handleLinkClick('booking')}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF5500]/30 border border-orange-300/40"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Reserve Chauffeur Now</span>
              </button>

              <a
                href="tel:+15877282828"
                className="w-full py-3 rounded-lg border border-slate-700 bg-[#071B38] text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#0C244C] hover:border-[#FF5500]"
              >
                <Phone className="w-4 h-4 text-[#FF5500]" />
                <span>Call +1 (587) 728-2828</span>
              </a>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
                <span>Edmonton • YEG Airport • Alberta</span>
                <span className="text-[#FF7700] font-bold">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
