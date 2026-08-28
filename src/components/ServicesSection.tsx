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
    <section id="services" className="py-24 bg-black relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-[#D4AF37]/50 mb-3">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5D77F]">
              Chauffeur & Transportation Services
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            First-Class <span className="text-[#D4AF37]">Luxury Services</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            From seamless Edmonton International Airport (YEG) transfers to VIP galas, weddings, and executive travel across Alberta, our fleet delivers unrivaled sophistication.
          </p>
        </div>

        {/* Services Grid (6 Unique Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service) => {
            return (
              <div
                key={service.id}
                className="group bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Image banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.75] group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40" />

                  {/* Service Icon Badge */}
                  <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-black/85 border border-[#D4AF37]/40 text-[#D4AF37] backdrop-blur-md">
                    {getIcon(service.iconName)}
                  </div>

                  {service.badge && (
                    <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] text-black">
                      {service.badge}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#F5D77F] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs uppercase font-bold text-[#D4AF37] hover:text-[#F5D77F] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      onClick={() => onBookService(service.title)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#D4AF37] hover:text-black text-neutral-300 hover:font-bold text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border border-neutral-700"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-[#D4AF37]/60 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-neutral-300 hover:text-white z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">
                  Air Time Chauffeur Experience
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                {selectedService.description}
              </p>

              <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-3">
                Key Inclusions & Amenities:
              </h4>

              <div className="space-y-2.5 mb-6">
                {selectedService.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onBookService(title);
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] hover:from-[#FFF8D6] hover:to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/25 border border-[#FFF8D6]/60"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {selectedService.title}</span>
                </button>

                <a
                  href="tel:+15877282828"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-neutral-700 hover:border-[#D4AF37] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
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
