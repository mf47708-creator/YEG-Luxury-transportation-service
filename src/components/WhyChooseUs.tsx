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
    <section id="why-us" className="py-24 bg-[#080808] relative overflow-hidden border-t border-[#C9A45C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151515] border border-[#C9A45C]/40 mb-3 shadow-md">
            <Shield className="w-4 h-4 text-[#C9A45C]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5F3EE]">
              The Royal Standard
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F3EE] mb-4">
            Why Choose <span className="text-[#C9A45C]">Air Time Chauffeur</span>
          </h2>
          <p className="text-[#A7A7A7] text-base sm:text-lg">
            We do not simply drive—we curate a seamless executive sanctuary. From prompt airport pickups to pristine vehicle detailing, your comfort is our absolute priority.
          </p>
        </div>

        {/* 8 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-[#151515] border border-white/10 hover:border-[#C9A45C]/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl border border-[#C9A45C]/40 bg-[#080808] text-[#C9A45C] flex items-center justify-center mb-5 group-hover:bg-[#C9A45C] group-hover:text-[#080808] group-hover:scale-110 transition-all duration-300 shadow-md">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="font-cinzel text-lg font-bold text-[#F5F3EE] mb-2 group-hover:text-[#E2C27A] transition-colors">
                  {item.title}
                </h3>

                <p className="text-[#A7A7A7] text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate Commitment Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-[#151515] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] flex items-center justify-center text-[#080808] flex-shrink-0 shadow-lg shadow-[#C9A45C]/30 border border-[#FFF1C5]/40">
              <Award className="w-8 h-8 text-[#080808]" />
            </div>
            <div>
              <h4 className="font-cinzel text-xl font-bold text-[#F5F3EE] mb-1">
                Executive & Corporate Billing Accounts Available
              </h4>
              <p className="text-xs sm:text-sm text-[#A7A7A7]">
                Monthly itemized invoicing, preferred corporate rates, employee portals, and dedicated fleet dispatchers for Edmonton businesses.
              </p>
            </div>
          </div>

          <a
            href="tel:+15877282828"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-[#080808] hover:bg-[#C9A45C] hover:text-[#080808] border border-[#C9A45C]/40 text-[#F5F3EE] font-bold text-xs uppercase tracking-wider transition-all"
          >
            Setup Corporate Account
          </a>
        </div>
      </div>
    </section>
  );
};

