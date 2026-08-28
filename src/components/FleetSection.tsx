import React, { useState } from 'react';
import { Users, Luggage, Check, ArrowRight, Car } from 'lucide-react';
import { FLEET_DATA } from '../data/fleet';
import { Vehicle, VehicleId } from '../types';

interface FleetSectionProps {
  onSelectVehicle: (vehicleId: VehicleId) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(FLEET_DATA[0]);

  return (
    <section id="fleet" className="py-24 bg-black relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-[#D4AF37]/50 mb-3">
            <Car className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest font-bold text-white">
              Our Executive Vehicles
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The Premier <span className="text-[#D4AF37]">Black Fleet</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Impeccably detailed, late-model luxury SUVs and executive sedans outfitted with first-class amenities for business, private aviation, weddings, and VIP events.
          </p>
        </div>

        {/* Fleet Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {FLEET_DATA.map((vehicle) => {
            const isSelected = selectedVehicle.id === vehicle.id;
            return (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] text-black shadow-lg shadow-[#D4AF37]/25 border border-[#FFF8D6]/60'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                {vehicle.name.split('(')[0]}
              </button>
            );
          })}
        </div>

        {/* Featured Vehicle Showcase Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Vehicle Image & Gallery View */}
            <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] lg:h-[500px] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-110 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-900" />

              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/50 text-white text-xs font-bold uppercase tracking-wider">
                {selectedVehicle.category}
              </div>
            </div>

            {/* Vehicle Specs & Amenities */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
                  Edmonton Chauffeur Spec
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1 mb-2">
                  {selectedVehicle.name}
                </h3>
                <p className="text-neutral-300 italic text-sm mb-4">
                  “{selectedVehicle.tagline}”
                </p>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {selectedVehicle.description}
                </p>

                {/* Capacity Badges */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black border border-neutral-800">
                    <div className="p-2 rounded-lg bg-neutral-800 text-[#D4AF37]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                        Passenger Capacity
                      </span>
                      <span className="text-sm font-bold text-white">
                        Up to {selectedVehicle.passengers} Guests
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black border border-neutral-800">
                    <div className="p-2 rounded-lg bg-neutral-800 text-[#D4AF37]">
                      <Luggage className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                        Luggage Capacity
                      </span>
                      <span className="text-sm font-bold text-white">
                        {selectedVehicle.luggage} Full-Size Bags
                      </span>
                    </div>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2 mb-8">
                  {selectedVehicle.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectVehicle(selectedVehicle.id)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] hover:from-[#FFF8D6] hover:to-[#D4AF37] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5 border border-[#FFF8D6]/60"
              >
                <span>Reserve This {selectedVehicle.name.split(' ')[1] || 'Vehicle'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FLEET_DATA.map((v) => (
            <div
              key={v.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37]/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
            >
              <div>
                <div className="h-44 rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/80 text-[10px] font-bold text-white uppercase tracking-wider border border-neutral-700">
                    {v.category}
                  </div>
                </div>

                <h4 className="font-cinzel text-lg font-bold text-white mb-1">
                  {v.name}
                </h4>
                <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{v.passengers} seats</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{v.luggage} bags</span>
                  </span>
                  <span className="text-white font-semibold">
                    ${v.hourlyRate}/hr
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedVehicle(v);
                  onSelectVehicle(v.id);
                }}
                className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-[#D4AF37] hover:text-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Select Vehicle
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
