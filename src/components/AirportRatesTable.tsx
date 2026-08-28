import React, { useState } from 'react';
import { Plane, Search, ShieldCheck, Check, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { AIRPORT_RATES_ZONES_TABLE } from '../data/airportRates';
import { AirportRateZone, VehicleId } from '../types';

interface AirportRatesTableProps {
  onQuickBookZone: (zone: AirportRateZone, vehicle: VehicleId) => void;
}

export const AirportRatesTable: React.FC<AirportRatesTableProps> = ({ onQuickBookZone }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'edmonton' | 'metro' | 'intercity'>('all');

  const filteredZones = AIRPORT_RATES_ZONES_TABLE.filter((z) => {
    const matchesSearch = z.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (z.notes && z.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'edmonton') return z.distanceKm <= 50;
    if (filterType === 'metro') return z.distanceKm > 50 && z.distanceKm <= 100;
    if (filterType === 'intercity') return z.distanceKm > 100;
    return true;
  });

  return (
    <section id="airport-rates" className="py-24 bg-black relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-[#D4AF37]/50 mb-3">
            <Plane className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest font-bold text-white">
              YEG Airport Flat Rate Schedule
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Edmonton & Surrounding <span className="text-[#D4AF37]">Airport Rates</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Guaranteed flat-rate pricing to and from Edmonton International Airport (YEG).
            All rates include standard baggage handling, flight tracking, and complimentary bottled water.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your neighbourhood or city..."
              className="w-full pl-10 pr-4 py-2.5 bg-black border border-neutral-700 rounded-xl text-white text-xs placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs uppercase font-bold text-neutral-400 hidden md:inline">
              Filter:
            </span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] text-black font-extrabold shadow-md'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              All Zones ({AIRPORT_RATES_ZONES_TABLE.length})
            </button>
            <button
              onClick={() => setFilterType('edmonton')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterType === 'edmonton'
                  ? 'bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] text-black font-extrabold shadow-md'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Edmonton Metro
            </button>
            <button
              onClick={() => setFilterType('metro')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterType === 'metro'
                  ? 'bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] text-black font-extrabold shadow-md'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Greater Suburbs
            </button>
            <button
              onClick={() => setFilterType('intercity')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterType === 'intercity'
                  ? 'bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] text-black font-extrabold shadow-md'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Intercity / Mountains
            </button>
          </div>
        </div>

        {/* Rate Schedule Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black border-b border-neutral-800 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                  <th className="py-4 px-5">Destination / Community</th>
                  <th className="py-4 px-4 text-center">Distance</th>
                  <th className="py-4 px-4 text-center">
                    <span className="block text-white">Executive Sedan</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Base / Total inc 5% GST</span>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="block text-[#D4AF37]">Luxury Black SUV</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Base + $20 / Total inc 5% GST</span>
                  </th>
                  <th className="py-4 px-5 text-right">Instant Booking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-xs sm:text-sm">
                {filteredZones.map((rate, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#D4AF37]/5 transition-colors group"
                  >
                    <td className="py-4 px-5 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span>{rate.zone}</span>
                        {rate.notes && (
                          <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-normal hidden sm:inline">
                            {rate.notes}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center text-neutral-300 font-medium">
                      {rate.distanceKm} km
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-white">
                        ${rate.sedanBase.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-neutral-400 block font-normal">
                        ${rate.sedanTotal.toFixed(2)} with GST
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center bg-[#D4AF37]/5">
                      <span className="font-bold text-[#F5D77F]">
                        ${rate.suvBase.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-neutral-300 block font-normal">
                        ${rate.suvTotal.toFixed(2)} with GST
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onQuickBookZone(rate, 'gmc-yukon-denali')}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#AA771C] text-black hover:opacity-90 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-[#FFF8D6]/60"
                        >
                          Book SUV
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Bottom Notes */}
        <div className="mt-6 p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <span>
              All rates include standard 5% Canadian GST, professional luggage assistance, flight delay tracking, and clean sanitized vehicles.
            </span>
          </div>
          <span className="text-[#F5D77F] font-bold flex-shrink-0">
            No Toll or Night Surge Surcharges
          </span>
        </div>
      </div>
    </section>
  );
};
