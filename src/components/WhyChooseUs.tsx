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
    <section id="why-us" className="py-24 bg-[#030c1a] relative overflow-hidden border-t border-[#0033A0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#071B38] border border-[#0033A0]/60 mb-3 shadow-md">
            <Shield className="w-4 h-4 text-[#FF5500]" />
            <span className="text-xs uppercase tracking-widest font-bold text-white">
              The Royal Standard
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-[#FF6B00]">Air Time Chauffeur</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            We do not simply drive—we curate a seamless executive sanctuary. From prompt airport pickups to pristine vehicle detailing, your comfort is our absolute priority.
          </p>
        </div>

        {/* 8 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-[#071B38] border border-[#0033A0]/50 hover:border-[#FF5500]/70 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl border border-[#0033A0]/70 bg-[#041122] text-[#FF5500] flex items-center justify-center mb-5 group-hover:bg-[#FF5500] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white mb-2 group-hover:text-[#FF7700] transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate Commitment Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-[#071B38] border border-[#0033A0]/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-[#FF5500]/30 border border-orange-300/40">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-cinzel text-xl font-bold text-white mb-1">
                Executive & Corporate Billing Accounts Available
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Monthly itemized invoicing, preferred corporate rates, employee portals, and dedicated fleet dispatchers for Edmonton businesses.
              </p>
            </div>
          </div>

          <a
            href="tel:+15877282828"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-[#041122] hover:bg-[#FF5500] hover:text-white border border-[#0033A0]/70 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Setup Corporate Account
          </a>
        </div>
      </div>
    </section>
  );
};
