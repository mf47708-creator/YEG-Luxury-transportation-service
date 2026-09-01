import React, { useState } from 'react';
import {
  PlaneTakeoff,
  Briefcase,
  HeartHandshake,
  Crown,
  Sparkles,
  Camera,
  Compass,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  Phone,
  Calendar
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-6 h-6" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6" />;
      case 'Crown':
        return <Crown className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Camera':
        return <Camera className="w-6 h-6" />;
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      default:
        return <Crown className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#030c1a] relative border-t border-[#0033A0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#071B38] border border-[#0033A0]/60 mb-3 shadow-md">
            <Crown className="w-4 h-4 text-[#FF5500]" />
            <span className="text-xs uppercase tracking-widest font-bold text-white">
              Chauffeur & Transportation Services
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            First-Class <span className="text-[#FF6B00]">Luxury Services</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From seamless Edmonton International Airport (YEG) transfers to VIP galas, weddings, and executive travel across Alberta, our fleet delivers unrivaled sophistication.
          </p>
        </div>

        {/* Services Grid (6 Unique Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service) => {
            return (
              <div
                key={service.id}
                className="group bg-[#071B38] border border-[#0033A0]/50 hover:border-[#FF5500]/70 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Image banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.75] group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B38] via-transparent to-black/40" />

                  {/* Service Icon Badge */}
                  <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-[#020813]/85 border border-[#0033A0]/60 text-[#FF5500] backdrop-blur-md">
                    {getIcon(service.iconName)}
                  </div>

                  {service.badge && (
                    <div className="absolute top-3 right-3 text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full shadow-md bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] text-white border border-orange-300/40">
                      {service.badge}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#FF7700] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#0033A0]/40 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs uppercase font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#FF5500]" />
                    </button>

                    <button
                      onClick={() => onBookService(service.title)}
                      className="px-3 py-1.5 rounded-lg bg-[#041122] hover:bg-[#FF5500] hover:text-white text-slate-200 hover:font-bold text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border border-[#0033A0]/50"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020813]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#071B38] border border-[#0033A0]/60 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-slate-300 hover:text-white z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B38] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-xs uppercase font-bold text-[#FF5500] tracking-wider">
                  Air Time Chauffeur Experience
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                {selectedService.description}
              </p>

              <h4 className="text-xs uppercase tracking-widest font-black text-[#FF5500] mb-3">
                Key Inclusions & Amenities:
              </h4>

              <div className="space-y-2.5 mb-6">
                {selectedService.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5500] flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#0033A0]/40">
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onBookService(title);
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF5500]/30 border border-orange-300/40"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {selectedService.title}</span>
                </button>

                <a
                  href="tel:+15877282828"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-600 bg-[#041122] hover:border-[#FF5500] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#071B38] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#FF5500]" />
                  <span>Call Dispatch</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
