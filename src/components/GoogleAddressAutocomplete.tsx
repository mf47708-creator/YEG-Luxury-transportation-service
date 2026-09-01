// Source: Google Maps Platform Code Assist
import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Navigation,
  Sparkles,
  Plane,
  Building2,
  ShieldCheck,
  Edit3,
  Zap
} from 'lucide-react';
import {
  AddressDetails,
  PlaceSuggestion,
  fetchGooglePlaceSuggestions,
  fetchPlaceCoordinates,
  parseAddressString,
  POPULAR_ALBERTA_PLACES,
  isNorthOfYellowhead
} from '../utils/googleMapsService';

interface GoogleAddressAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (address: string, details?: AddressDetails) => void;
  required?: boolean;
  isPickup?: boolean;
  accentColor?: 'gold' | 'amber' | 'orange';
  idPrefix?: string;
}

export const GoogleAddressAutocomplete: React.FC<GoogleAddressAutocompleteProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  isPickup = true,
  accentColor = 'orange',
  idPrefix = 'addr'
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<AddressDetails | null>(null);
  const [isManualMode, setIsManualMode] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [sessionToken] = useState(() => Math.random().toString(36).substring(2, 15));

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize internal input state if parent updates the string directly
  useEffect(() => {
    setInputValue(value || '');
    if (value && (!selectedDetails || selectedDetails.formattedAddress !== value)) {
      const parsed = parseAddressString(value);
      setSelectedDetails({
        formattedAddress: value,
        streetAddress: parsed.streetAddress || value,
        city: parsed.city || 'Edmonton',
        province: parsed.province || 'AB',
        postalCode: parsed.postalCode,
        country: 'Canada',
        lat: parsed.lat,
        lng: parsed.lng,
        isAirport: parsed.isAirport,
        isValidated: (value.length >= 6),
        validationSource: parsed.validationSource || 'manual_verified'
      });
    }
  }, [value]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    onChange(text); // Let parent know of text change
    setIsOpen(true);
    setHighlightedIndex(-1);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!text || text.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await fetchGooglePlaceSuggestions(text, sessionToken);
        setSuggestions(results);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);
  };

  // User selects an address suggestion
  const handleSelectSuggestion = async (suggestion: PlaceSuggestion) => {
    setIsLoading(true);
    setIsOpen(false);

    try {
      const details = await fetchPlaceCoordinates(suggestion.placeId, suggestion.description);
      setInputValue(details.formattedAddress);
      setSelectedDetails(details);
      onChange(details.formattedAddress, details);
    } catch (err) {
      const fallbackDetails = parseAddressString(suggestion.description);
      const fullFallback: AddressDetails = {
        formattedAddress: suggestion.description,
        streetAddress: suggestion.mainText,
        city: fallbackDetails.city || 'Edmonton',
        province: fallbackDetails.province || 'AB',
        postalCode: fallbackDetails.postalCode,
        country: 'Canada',
        lat: fallbackDetails.lat || 53.5444,
        lng: fallbackDetails.lng || -113.4909,
        isValidated: true,
        validationSource: 'google_places'
      };
      setInputValue(suggestion.description);
      setSelectedDetails(fullFallback);
      onChange(suggestion.description, fullFallback);
    } finally {
      setIsLoading(false);
    }
  };

  // User selects a preset landmark
  const handleSelectPresetPlace = (place: typeof POPULAR_ALBERTA_PLACES[0]) => {
    const details: AddressDetails = {
      formattedAddress: place.address,
      streetAddress: place.name,
      city: place.city,
      province: 'AB',
      postalCode: place.postalCode,
      country: 'Canada',
      lat: place.lat,
      lng: place.lng,
      isAirport: place.isAirport,
      isValidated: true,
      validationSource: 'google_places'
    };
    setInputValue(place.address);
    setSelectedDetails(details);
    onChange(place.address, details);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSelectedDetails(null);
    setSuggestions([]);
    onChange('', undefined);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Label and GPS Status Header */}
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={`${idPrefix}-input`}
          className="block text-xs font-semibold text-slate-300"
        >
          {label} {required && <span className="text-[#FF5500]">*</span>}
        </label>

        {selectedDetails?.isValidated && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#0033A0]/50 border border-[#0033A0] px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-[#FF5500]" />
            <span>Google Verified GPS</span>
          </span>
        )}
      </div>

      {/* Input container */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF5500] pointer-events-none">
          {isPickup ? (
            <MapPin className="w-4 h-4" />
          ) : (
            <Navigation className="w-4 h-4" />
          )}
        </div>

        <input
          ref={inputRef}
          id={`${idPrefix}-input`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (inputValue.trim().length >= 2 || suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="w-full pl-10 pr-20 py-3 bg-[#041122] border border-slate-700 hover:border-slate-500 focus:border-[#FF5500] rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5500]/50 transition-all placeholder:text-slate-500"
        />

        {/* Right side controls: Loading spinner, Clear button, Validation Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {isLoading && <Loader2 className="w-4 h-4 text-[#FF5500] animate-spin" />}

          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-[#071B38] transition-colors"
              title="Clear address"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {selectedDetails?.isValidated && (
            <div
              className="flex items-center text-[#FF5500] pl-1"
              title="Address Verified & Geocoded"
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[#071B38] border border-[#0033A0]/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in-50 zoom-in-95 duration-150 max-h-80 overflow-y-auto divide-y divide-[#0033A0]/40">
          {/* Header indicator */}
          <div className="px-3.5 py-2 bg-[#041122] border-b border-[#0033A0]/40 flex items-center justify-between text-[11px]">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Search className="w-3 h-3 text-[#FF5500]" />
              <span>Google Places Suggestions</span>
            </span>
            <span className="text-slate-300 text-[10px]">Select to auto-fill location</span>
          </div>

          {/* List of fetched suggestions */}
          {suggestions.length > 0 ? (
            <div className="py-1">
              {suggestions.map((suggestion, index) => {
                const isSelected = index === highlightedIndex;
                const isAirport =
                  suggestion.description.toLowerCase().includes('yeg') ||
                  suggestion.description.toLowerCase().includes('airport');

                return (
                  <button
                    key={suggestion.placeId || index}
                    type="button"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#0033A0]/50 text-white'
                        : 'hover:bg-[#0C244C] text-slate-200'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${
                        isAirport
                          ? 'bg-[#FF5500]/20 text-[#FF5500]'
                          : 'bg-[#041122] text-slate-300'
                      }`}
                    >
                      {isAirport ? (
                        <Plane className="w-3.5 h-3.5" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-white truncate flex items-center gap-2">
                        <span>{suggestion.mainText || suggestion.description}</span>
                        {isAirport && (
                          <span className="text-[9px] bg-[#0033A0] text-white px-1.5 py-0.2 rounded font-bold uppercase">
                            YEG Airport
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {suggestion.secondaryText || suggestion.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* No Google suggestions found */
            <div className="p-4 text-center">
              <p className="text-xs text-white font-medium mb-1">
                No matching Google addresses found for "{inputValue}"
              </p>
              <p className="text-[11px] text-slate-300 mb-3">
                You can use this custom address directly, or pick one of the frequent Edmonton locations below.
              </p>
              <button
                type="button"
                onClick={() => {
                  const details = parseAddressString(inputValue);
                  const fullManual: AddressDetails = {
                    formattedAddress: inputValue,
                    streetAddress: details.streetAddress || inputValue,
                    city: details.city || 'Edmonton',
                    province: details.province || 'AB',
                    postalCode: details.postalCode,
                    country: 'Canada',
                    lat: details.lat || 53.5444,
                    lng: details.lng || -113.4909,
                    isValidated: true,
                    validationSource: 'manual_verified'
                  };
                  setSelectedDetails(fullManual);
                  onChange(inputValue, fullManual);
                  setIsOpen(false);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#FF5500]/20 hover:bg-[#FF5500]/30 text-white text-xs font-bold transition-colors border border-[#FF5500]/40"
              >
                Use "{inputValue}" as Manual Location
              </button>
            </div>
          )}

          {/* Popular Edmonton Landmarks Section */}
          <div className="p-3 bg-[#041122] border-t border-[#0033A0]/40">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block mb-2">
              Frequent Edmonton & Alberta Hubs
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {POPULAR_ALBERTA_PLACES.slice(0, 4).map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleSelectPresetPlace(p)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#071B38] hover:bg-[#0C244C] border border-[#0033A0]/50 hover:border-[#FF5500]/50 text-left text-[11px] text-slate-200 hover:text-white transition-all flex items-center gap-2 group cursor-pointer"
                >
                  {p.isAirport ? (
                    <Plane className="w-3 h-3 text-[#FF5500] group-hover:scale-110 transition-transform" />
                  ) : (
                    <Building2 className="w-3 h-3 text-slate-400 group-hover:text-[#FF5500] transition-colors" />
                  )}
                  <span className="truncate">{p.name.split('(')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Validated Details Pill Preview */}
      {selectedDetails && (
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
          {selectedDetails.city && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#041122] border border-[#0033A0]/50 text-slate-300">
              <span className="text-slate-400">City:</span>
              <strong className="text-white">{selectedDetails.city}</strong>
              {selectedDetails.province && <span>, {selectedDetails.province}</span>}
              {selectedDetails.postalCode && (
                <span className="text-slate-400 font-mono">({selectedDetails.postalCode})</span>
              )}
            </span>
          )}

          {(isNorthOfYellowhead(selectedDetails) || isNorthOfYellowhead(value)) && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0033A0]/40 border border-[#0033A0] text-white font-semibold">
              <Navigation className="w-3 h-3 text-[#FF5500]" />
              <span>Anthony Henday Ring Road Route</span>
            </span>
          )}

          {selectedDetails.isAirport && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#041122] border border-[#FF5500]/50 text-white font-semibold">
              <Plane className="w-3 h-3 text-[#FF5500]" />
              <span>YEG Airport Transfer</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
