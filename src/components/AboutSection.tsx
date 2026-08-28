import React from 'react';
import { ShieldCheck, Award, MapPin, Plane, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import interiorCabinImg from '../assets/images/wedding_interior_luxury_1787433514055.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-black relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Unique Interior Luxury Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src={interiorCabinImg}
                alt="Air Time Luxury Executive Chauffeur Interior Cabin Experience"
                className="w-full h-[450px] sm:h-[520px] object-cover filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/90 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                    First-Class Cabin Experience
                  </span>
                  <span className="font-cinzel text-xl font-bold text-white">
                    Royal Hospitality
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-cinzel text-2xl font-extrabold text-[#F5D77F] block">
                    100%
                  </span>
                  <span className="text-[10px] text-neutral-400">Punctuality Record</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-[#D4AF37]/50 mb-3">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#F5D77F]">
                About Air Time Black Car
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              We Will Serve You <span className="text-[#D4AF37]">Like Royalty</span>
            </h2>

            <p className="text-[#D4AF37] font-serif-luxury italic text-lg sm:text-xl mb-6">
              “Setting a new benchmark for private executive travel in Edmonton, Alberta.”
            </p>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              Air Time Black Car & SUV Service was founded on an uncompromising principle: executive transportation should be an oasis of calm, luxury, and absolute punctuality. Whether transporting corporate executives to meetings in the ICE District, greeting international travelers at Edmonton International Airport (YEG), or escorting wedding parties on their most memorable day, we treat every client like royalty.
            </p>

            {/* Core Hospitality Standards Checklist */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">White-Glove Etiquette & Discretion:</strong> All chauffeurs are seasoned, commercially licensed professionals dressed in formal black suits, trained in VIP client confidentiality and courteous baggage handling.
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Live Aviation & Gate Radar Sync:</strong> Inbound YEG commercial flights and private airfield tail numbers are continuously tracked to synchronize curb and tarmac staging to the exact minute.
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Strict Punctuality Guarantee:</strong> Our drivers are dispatched with built-in buffers and staged 15 minutes prior to scheduled departures to guarantee you never wait.
                </span>
              </div>
            </div>

            {/* Contact Callout */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                  Edmonton Chauffeur Headquarters
                </span>
                <span className="text-sm font-bold text-white">
                  Serving Edmonton, Sherwood Park, St. Albert & YEG Airport
                </span>
              </div>
              <a
                href="tel:+15877282828"
                className="px-4 py-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5D77F] text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-black transition-colors"
              >
                Call Chauffeur
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
