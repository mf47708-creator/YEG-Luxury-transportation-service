import React from 'react';
import {
  UserCheck,
  Car,
  Clock,
  Plane,
  Building2,
  Timer,
  ShieldCheck,
  Sparkles,
  Shield,
  Award
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/services';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-6 h-6" />;
      case 'Car':
        return <Car className="w-6 h-6" />;
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      case 'Plane':
        return <Plane className="w-6 h-6" />;
      case 'Building2':
        return <Building2 className="w-6 h-6" />;
      case 'Timer':
        return <Timer className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Sparkle':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-[#D4AF37]/50 mb-3">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5D77F]">
              The Royal Standard
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-[#D4AF37]">Air Time Chauffeur</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            We do not simply drive—we curate a seamless executive sanctuary. From prompt airport pickups to pristine vehicle detailing, your comfort is our absolute priority.
          </p>
        </div>

        {/* 8 Core Pillars Grid in Black, Gold, and White */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37]/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl border border-[#D4AF37]/30 bg-black text-[#D4AF37] flex items-center justify-center mb-5 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 transition-all duration-300">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white mb-2 group-hover:text-[#F5D77F] transition-colors">
                  {item.title}
                </h3>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate Commitment Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-neutral-900 border border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] flex items-center justify-center text-black flex-shrink-0 shadow-lg shadow-[#D4AF37]/20 border border-[#FFF8D6]/60">
              <Award className="w-8 h-8 text-black" />
            </div>
            <div>
              <h4 className="font-cinzel text-xl font-bold text-white mb-1">
                Executive & Corporate Billing Accounts Available
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300">
                Monthly itemized invoicing, preferred corporate rates, employee portals, and dedicated fleet dispatchers for Edmonton businesses.
              </p>
            </div>
          </div>

          <a
            href="tel:+15877282828"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-black hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/50 text-[#F5D77F] font-bold text-xs uppercase tracking-wider transition-all"
          >
            Setup Corporate Account
          </a>
        </div>
      </div>
    </section>
  );
};
