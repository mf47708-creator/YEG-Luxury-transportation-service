// Source: Google Maps Platform Code Assist
import React, { useState, useMemo, useEffect } from 'react';
import { Plane, Calculator, ArrowRightLeft, Check, AlertCircle, Sparkles, Users, Luggage, Car, ChevronRight, Route, Timer, Zap, Navigation } from 'lucide-react';
import { calculateEdmontonAirportFare, POPULAR_DESTINATIONS, isEdmontonAirportLocation } from '../data/airportRates';
import { FareCalculationResult, VehicleId } from '../types';
import { GoogleAddressAutocomplete } from './GoogleAddressAutocomplete';
import { AddressDetails, calculateRouteDistance, parseAddressString, isNorthOfYellowhead } from '../utils/googleMapsService';

interface AirportCalculatorProps {
  onApplyToBooking: (fareResult: FareCalculationResult, vehicleType: VehicleId) => void;
}

export const AirportCalculator: React.FC<AirportCalculatorProps> = ({ onApplyToBooking }) => {
  const [direction, setDirection] = useState<'from_airport' | 'to_airport'>('from_airport');
  const [pickupInput, setPickupInput] = useState<string>('Edmonton International Airport (YEG)');
  const [destInput, setDestInput] = useState<string>('Downtown Edmonton / Rogers Place (ICE District)');
  const [pickupDetails, setPickupDetails] = useState<AddressDetails | null>(() => parseAddressString('Edmonton International Airport (YEG)') as AddressDetails);
  const [destDetails, setDestDetails] = useState<AddressDetails | null>(() => parseAddressString('Downtown Edmonton / Rogers Place (ICE District)') as AddressDetails);
  const [distanceKm, setDistanceKm] = useState<number>(31.4);
  const [durationText, setDurationText] = useState<string>('26 mins');
  const [routeSummary, setRouteSummary] = useState<string>('Direct Highway Route via QEII & Gateway Blvd');
  const [vehicleType, setVehicleType] = useState<VehicleId>('gmc-yukon-denali');
  const [passengers, setPassengers] = useState<number>(2);
  const [luggage, setLuggage] = useState<number>(2);

  // Toggle direction between pickup and destination
  const handleSwapDirection = () => {
    if (direction === 'from_airport') {
      setDirection('to_airport');
      const tempStr = pickupInput;
      const tempDet = pickupDetails;
      setPickupInput(destInput);
      setPickupDetails(destDetails);
      setDestInput(tempStr.includes('Airport') ? tempStr : 'Edmonton International Airport (YEG)');
      setDestDetails(tempDet);
    } else {
      setDirection('from_airport');
      const tempStr = destInput;
      const tempDet = destDetails;
      setDestInput(pickupInput);
      setDestDetails(pickupDetails);
      setPickupInput(tempStr.includes('Airport') ? tempStr : 'Edmonton International Airport (YEG)');
      setPickupDetails(tempDet);
    }
  };

  // Select a preset popular destination
  const handleSelectPreset = (preset: typeof POPULAR_DESTINATIONS[0]) => {
    setDistanceKm(preset.distanceKm);
    if (direction === 'from_airport') {
      setPickupInput('Edmonton International Airport (YEG)');
      setDestInput(preset.name + ' (' + preset.address + ')');
    } else {
      setPickupInput(preset.name + ' (' + preset.address + ')');
      setDestInput('Edmonton International Airport (YEG)');
    }
  };

  // Recalculate distance and fastest route when both details are updated
  useEffect(() => {
    let isMounted = true;
    async function updateDistance() {
      if (pickupDetails && destDetails && pickupInput && destInput) {
        try {
          const metrics = await calculateRouteDistance(pickupDetails, destDetails);
          if (isMounted && metrics.distanceKm > 0) {
            setDistanceKm(metrics.distanceKm);
            if (metrics.durationText) setDurationText(metrics.durationText);
            if (metrics.routeSummary) setRouteSummary(metrics.routeSummary);
          }
        } catch (err) {
          // ignore
        }
      }
    }
    updateDistance();
    return () => { isMounted = false; };
  }, [pickupDetails?.lat, pickupDetails?.lng, destDetails?.lat, destDetails?.lng]);

  // Compute live calculation
  const fareResult = useMemo(() => {
    return calculateEdmontonAirportFare(
      pickupInput,
      destInput,
      distanceKm,
      vehicleType,
      passengers,
      luggage
    );
  }, [pickupInput, destInput, distanceKm, vehicleType, passengers, luggage]);

  const hasAirport = isEdmontonAirportLocation(pickupInput) || isEdmontonAirportLocation(destInput);

  return (
    <section id="airport-calculator" className="py-20 bg-[#030c1a] relative overflow-hidden border-t border-[#0033A0]/40">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0033A0]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071B38] border border-[#0033A0]/60 mb-3">
            <Calculator className="w-4 h-4 text-[#FF5500]" />
            <span className="text-xs uppercase tracking-widest font-black text-white">
              Transparent & Flat YEG Pricing
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Edmonton Airport <span className="text-[#FF5500]">Fare Calculator</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Instant, automated quote with Google Places autocomplete for transfers to and from Edmonton International Airport (YEG).
            Zero surge pricing, luxury vehicles, and professional chauffeur service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calculator Controls */}
          <div className="lg:col-span-7 bg-[#071B38] border border-[#0033A0]/60 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Direction switch */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0033A0]/40">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#FF5500]" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  {direction === 'from_airport' ? 'Pick up from YEG Airport' : 'Drop off at YEG Airport'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSwapDirection}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#041122] hover:bg-[#0C244C] text-xs font-bold text-[#FF7700] hover:text-white border border-[#0033A0]/60 transition-colors cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Switch Direction</span>
              </button>
            </div>

            {/* Google Address Autocomplete inputs */}
            <div className="space-y-4 mb-6">
              <GoogleAddressAutocomplete
                label="Pickup Location"
                placeholder="Search pickup address or landmark..."
                value={pickupInput}
                onChange={(val, details) => {
                  setPickupInput(val);
                  if (details) setPickupDetails(details);
                }}
                isPickup={true}
                idPrefix="calc-pickup"
              />

              <GoogleAddressAutocomplete
                label="Destination Location"
                placeholder="Search destination address or city..."
                value={destInput}
                onChange={(val, details) => {
                  setDestInput(val);
                  if (details) setDestDetails(details);
                }}
                isPickup={false}
                idPrefix="calc-dest"
              />
            </div>

            {/* Popular Presets Quick Selector */}
            <div className="mb-6">
              <label className="block text-xs font-black uppercase tracking-wider text-[#FF5500] mb-2">
                Popular Edmonton & Surrounding Destinations (Click to auto-calculate):
              </label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_DESTINATIONS.slice(0, 8).map((preset) => {
                  const isSelected = Math.abs(preset.distanceKm - distanceKm) < 0.2;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#FF5500] text-white font-black shadow-md shadow-[#FF5500]/30'
                          : 'bg-[#041122] hover:bg-[#0C244C] text-slate-300 border border-[#0033A0]/50 hover:border-[#FF5500]/50'
                      }`}
                    >
                      {preset.name.split('/')[0]} ({preset.distanceKm} km)
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Distance Slider / Manual Adjust */}
            <div className="mb-6 p-4 rounded-xl bg-[#041122] border border-[#0033A0]/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-300 flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>Calculated Distance:</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#071B38] border border-[#0033A0] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-[#FF5500]" />
                    <span>Direct Route</span>
                  </span>
                  {(isNorthOfYellowhead(pickupDetails) || isNorthOfYellowhead(destDetails) || isNorthOfYellowhead(pickupInput) || isNorthOfYellowhead(destInput)) && (
                    <span className="px-2 py-0.5 rounded-md bg-[#071B38] border border-[#0033A0]/60 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Navigation className="w-2.5 h-2.5 text-[#FF5500]" />
                      <span>Via Anthony Henday (North of Yellowhead)</span>
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-cinzel text-lg font-bold text-[#FF5500]">
                    {distanceKm} km
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="1"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#071B38] rounded-lg appearance-none cursor-pointer accent-[#FF5500] mb-2"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-[#0033A0]/40">
                <span className="flex items-center gap-1 text-slate-300">
                  <Timer className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Est. Driving Time: <strong className="text-white">{durationText}</strong></span>
                </span>
                <span className="text-[10px] text-white flex items-center gap-1 bg-[#0033A0]/40 px-2 py-0.5 rounded">
                  <Check className="w-3 h-3 text-[#FF5500]" />
                  <span>Live Traffic Optimized</span>
                </span>
              </div>
            </div>

            {/* Vehicle, Passengers & Luggage Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Vehicle Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Vehicle Type</span>
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as VehicleId)}
                  className="w-full px-3 py-2.5 bg-[#041122] border border-[#0033A0]/60 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF5500] font-medium"
                >
                  <option value="gmc-yukon-denali">2026 GMC Yukon Denali (SUV)</option>
                  <option value="lincoln-navigator">Lincoln Navigator (SUV)</option>
                  <option value="luxury-sedan">Luxury Executive Sedan</option>
                </select>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Passengers</span>
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#041122] border border-[#0033A0]/60 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF5500] font-medium"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Luggage */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                  <Luggage className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Checked Luggage</span>
                </label>
                <select
                  value={luggage}
                  onChange={(e) => setLuggage(parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#041122] border border-[#0033A0]/60 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF5500] font-medium"
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Luggage' : 'Luggage Pieces'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Quote Breakdown */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {hasAirport ? (
              <div className="bg-gradient-to-br from-[#071B38] via-[#041122] to-[#020813] border-2 border-[#0033A0]/70 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                {/* Ribbon badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FF7700] via-[#FF5500] to-[#E63900] text-white text-[10px] uppercase font-black tracking-widest px-4 py-1 rounded-bl-xl shadow-md">
                  Guaranteed Flat Rate
                </div>

                <div className="flex items-center gap-2 text-[#FF5500] text-xs uppercase font-bold tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Calculated Airport Transfer</span>
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-white mb-6">
                  {vehicleType === 'luxury-sedan' ? 'Executive Sedan' : 'Luxury Black SUV'}
                </h3>

                {/* Pricing Line items */}
                <div className="space-y-3.5 pb-6 border-b border-[#0033A0]/40 text-sm">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span>Distance Bracket:</span>
                      <span className="text-xs text-slate-400">({fareResult.bracketDescription})</span>
                    </span>
                    <span className="font-semibold text-white">{fareResult.distanceKm} km</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Base Chauffeur Fare:</span>
                    <span className="font-semibold text-white">${fareResult.baseFare.toFixed(2)}</span>
                  </div>

                  {fareResult.suvCharge > 0 ? (
                    <div className="flex justify-between items-center text-white">
                      <span className="flex items-center gap-1 text-xs">
                        <span>SUV / Capacity Upgrade:</span>
                        <span className="text-[10px] bg-[#0033A0] px-1.5 py-0.5 rounded text-white font-bold">
                          {passengers > 3 || luggage > 3 ? 'Extra Capacity' : 'SUV Model'}
                        </span>
                      </span>
                      <span className="font-semibold text-[#FF5500]">+${fareResult.suvCharge.toFixed(2)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-slate-400 text-xs">
                      <span>SUV Charge:</span>
                      <span>$0.00 (Standard Sedan)</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-1">
                      <span>5% GST (Federal Tax):</span>
                    </span>
                    <span className="font-semibold text-white">${fareResult.gstAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="py-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block">
                      Total Price (CAD)
                    </span>
                    <span className="text-[11px] text-white">All Taxes & Fees Included</span>
                  </div>
                  <div className="text-right">
                    <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#FF5500]">
                      ${fareResult.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Included perks checkmarks */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mb-6 bg-[#041122] p-3 rounded-xl border border-[#0033A0]/40">
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Check className="w-3.5 h-3.5 text-[#FF5500] flex-shrink-0" />
                    <span>Flight delay tracking</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Check className="w-3.5 h-3.5 text-[#FF5500] flex-shrink-0" />
                    <span>Inside Meet & Greet</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Check className="w-3.5 h-3.5 text-[#FF5500] flex-shrink-0" />
                    <span>Chilled artesian water</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Check className="w-3.5 h-3.5 text-[#FF5500] flex-shrink-0" />
                    <span>No surprise surge fees</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => onApplyToBooking(fareResult, vehicleType)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-[#FF5500]/30 flex items-center justify-center gap-2 group cursor-pointer transition-transform hover:-translate-y-0.5 border border-orange-300/40"
                >
                  <span>Lock Rate & Book This Ride</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              /* Non-airport fallback message */
              <div className="bg-[#071B38] border border-[#0033A0]/60 rounded-2xl p-8 shadow-xl text-center flex flex-col items-center justify-center min-h-[380px]">
                <div className="w-14 h-14 rounded-full bg-[#FF5500]/15 border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500] mb-4">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h4 className="font-cinzel text-xl font-bold text-white mb-2">
                  Custom Location Quote Required
                </h4>
                <p className="text-white font-serif-luxury italic text-base sm:text-lg mb-6 max-w-md">
                  “Thank you for your request. One of our team members will contact you shortly with your personalized quote.”
                </p>
                <p className="text-xs text-slate-300 max-w-sm mb-6">
                  Our automatic flat-rate calculator requires either the pickup or destination to include Edmonton International Airport (YEG). For non-airport charters, hourly, or out-of-town trips, we provide instant custom quotes.
                </p>
                <button
                  type="button"
                  onClick={() => onApplyToBooking(fareResult, vehicleType)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#FF5500]/20"
                >
                  Submit For Custom Personalized Quote
                </button>
              </div>
            )}

            {/* Quick 24/7 dispatcher help callout */}
            <div className="bg-[#041122] border border-[#0033A0]/50 rounded-xl p-4 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
                <span>Need an immediate airport pickup in under 30 mins?</span>
              </span>
              <a
                href="tel:+15877282828"
                className="text-[#FF5500] font-black hover:underline"
              >
                +1 (587) 728-2828
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
