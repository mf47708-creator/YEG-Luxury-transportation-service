import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  Clock,
  ShieldCheck,
  Plane,
  Sparkles,
  Copy,
  Check,
  MapPin,
  Send,
  Star
} from 'lucide-react';

interface BookingQuotationSectionProps {
  onOpenCallDesk?: () => void;
  onOpenChatDesk?: () => void;
}

export const BookingQuotationSection: React.FC<BookingQuotationSectionProps> = ({
  onOpenCallDesk
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Quick inquiry form state for clients who want to compose a quick message
  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    dateTime: '',
    passengers: '1-3 Passengers (Luxury Sedan or SUV)',
    notes: ''
  });

  const phoneNumber = '+1 (587) 728-2828';
  const phoneRaw = '+15877282828';
  const emailAddress = 'limoairtime@gmail.com';

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSendQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-populate email / SMS link
    const messageBody = `Hello Air Time Chauffeur Team,%0A%0AI would like to request a booking / quotation:%0A%0A• Name: ${encodeURIComponent(quickForm.name || 'Not provided')}%0A• Phone: ${encodeURIComponent(quickForm.phone || 'Not provided')}%0A• Pickup: ${encodeURIComponent(quickForm.pickup || 'Not provided')}%0A• Drop-off: ${encodeURIComponent(quickForm.destination || 'Not provided')}%0A• Date & Time: ${encodeURIComponent(quickForm.dateTime || 'Not provided')}%0A• Passengers / Vehicle: ${encodeURIComponent(quickForm.passengers)}%0A• Notes: ${encodeURIComponent(quickForm.notes || 'None')}%0A%0AThank you!`;
    
    // Automatically trigger mailto link
    window.location.href = `mailto:${emailAddress}?subject=New%20Luxury%20Ride%20Booking%20%26%20Quotation%20Request%20-%20${encodeURIComponent(quickForm.name || 'Client')}&body=${messageBody}`;
  };

  return (
    <section
      id="booking"
      className="py-20 lg:py-28 bg-[#030c1a] relative border-t border-b border-[#0033A0]/30 overflow-hidden"
    >
      {/* Background ambient lighting effects in Royal Blue & Orange */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0033A0]/15 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-[400px] h-[400px] bg-[#FF5500]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow Tag */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#071B38] border border-[#0033A0]/60 shadow-lg shadow-[#0033A0]/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#FF5500] animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-white">
              Direct Chauffeur Booking & Quotations
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase drop-shadow-md">
            BOOK YOUR <span className="text-[#FF6B00]">LUXURY RIDE</span> TODAY
          </h2>
        </div>

        {/* Content Paragraph */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed">
            For bookings, custom quotations, pricing, or service inquiries, contact us directly. Our team is ready to assist you with premium transportation services.
          </p>
        </div>

        {/* Bold Action Banner: CALL US • TEXT US • EMAIL US */}
        <div className="flex items-center justify-center mb-12">
          <div className="px-6 py-3.5 sm:px-10 sm:py-4 rounded-2xl bg-[#071B38] border-2 border-[#0033A0]/70 shadow-xl shadow-[#0033A0]/20 flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <span className="font-cinzel text-base sm:text-xl md:text-2xl font-extrabold text-white uppercase tracking-widest flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#FF5500]" />
              <span>CALL US</span>
            </span>
            <span className="text-[#FF5500] text-lg sm:text-2xl font-bold">•</span>
            <span className="font-cinzel text-base sm:text-xl md:text-2xl font-extrabold text-white uppercase tracking-widest flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-white" />
              <span>TEXT US</span>
            </span>
            <span className="text-[#FF5500] text-lg sm:text-2xl font-bold">•</span>
            <span className="font-cinzel text-base sm:text-xl md:text-2xl font-extrabold text-white uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#FF5500]" />
              <span>EMAIL US</span>
            </span>
          </div>
        </div>

        {/* Three Large, Bold, Highly Visible Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {/* 1. CALL US CARD */}
          <div className="bg-[#071B38] border-2 border-[#0033A0]/60 hover:border-[#FF5500] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0033A0]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-16 h-16 rounded-2xl bg-[#0033A0]/30 border border-[#0033A0]/70 text-[#FF5500] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Phone className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF7700] text-[11px] font-extrabold uppercase tracking-wider border border-[#FF5500]/40">
                  24/7 Priority Line
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                📞 Direct Phone Call
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-wide">
                PHONE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-normal">
                Call our direct dispatch desk for immediate booking, airport transfers, or instant custom rate confirmations.
              </p>

              <div className="p-4 rounded-xl bg-[#041122] border border-[#0033A0]/40 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Direct Dispatch Number
                  </span>
                  <a
                    href={`tel:${phoneRaw}`}
                    className="font-cinzel text-lg sm:text-xl font-extrabold text-white hover:text-[#FF7700] tracking-wider block mt-0.5"
                  >
                    {phoneNumber}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(phoneNumber, 'phone')}
                  className="p-2 rounded-lg bg-[#071B38] hover:bg-[#0C244C] text-white transition-colors cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedType === 'phone' ? <Check className="w-4 h-4 text-[#FF5500]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href={`tel:${phoneRaw}`}
              onClick={() => {
                if (onOpenCallDesk) onOpenCallDesk();
              }}
              className="w-full py-4 sm:py-4.5 rounded-xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-[#FF5500]/30 flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer transform group-hover:scale-[1.02] border border-orange-300/40"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>CALL NOW</span>
            </a>
          </div>

          {/* 2. TEXT US (SMS) CARD */}
          <div className="bg-[#071B38] border-2 border-white/40 hover:border-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/40 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider border border-white/40">
                  Instant SMS
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                💬 Text Message / SMS
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-wide">
                TEXT
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-normal">
                Text your pickup location, drop-off destination, and time to receive an instant price quote and ride confirmation.
              </p>

              <div className="p-4 rounded-xl bg-[#041122] border border-[#0033A0]/40 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Text / SMS Number
                  </span>
                  <a
                    href={`sms:${phoneRaw}?body=Hello%20Air%20Time%2C%20I%20would%20like%20to%20request%20a%20luxury%20chauffeur%20booking%20%2F%20quotation.`}
                    className="font-cinzel text-lg sm:text-xl font-extrabold text-white hover:text-[#FF7700] tracking-wider block mt-0.5"
                  >
                    {phoneNumber}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(phoneNumber, 'sms')}
                  className="p-2 rounded-lg bg-[#071B38] hover:bg-[#0C244C] text-white transition-colors cursor-pointer"
                  title="Copy SMS Number"
                >
                  {copiedType === 'sms' ? <Check className="w-4 h-4 text-[#FF5500]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href={`sms:${phoneRaw}?body=Hello%20Air%20Time%2C%20I%20would%20like%20to%20request%20a%20luxury%20chauffeur%20booking%20%2F%20quotation.%0A%0APickup%20Address%3A%20%0ADrop-off%20Address%3A%20%0ADate%20%26%20Time%3A%20%0ANumber%20of%20Passengers%3A%20`}
              className="w-full py-4 sm:py-4.5 rounded-xl bg-white hover:bg-slate-100 text-[#00205B] font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-white/20 flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer transform group-hover:scale-[1.02]"
            >
              <MessageSquare className="w-5 h-5 fill-current text-[#0033A0]" />
              <span>TEXT US</span>
            </a>
          </div>

          {/* 3. EMAIL US CARD */}
          <div className="bg-[#071B38] border-2 border-[#0033A0]/60 hover:border-[#FF5500] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0033A0]/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-16 h-16 rounded-2xl bg-[#0033A0]/30 border border-[#0033A0]/70 text-[#FF5500] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Mail className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FF5500]/20 text-[#FF7700] text-[11px] font-extrabold uppercase tracking-wider border border-[#FF5500]/40">
                  Custom Quotations
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                ✉️ Direct Email Dispatch
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-wide">
                EMAIL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-normal">
                Email us your detailed travel itinerary, corporate invoice needs, wedding fleet requests, or multi-stop charters.
              </p>

              <div className="p-4 rounded-xl bg-[#041122] border border-[#0033A0]/40 mb-6 flex items-center justify-between">
                <div className="overflow-hidden">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Official Dispatch Email
                  </span>
                  <a
                    href={`mailto:${emailAddress}?subject=Booking%20%26%20Quotation%20Inquiry%20-%20Air%20Time%20Chauffeur`}
                    className="text-sm sm:text-base font-bold text-white hover:text-[#FF7700] truncate block mt-0.5"
                  >
                    {emailAddress}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(emailAddress, 'email')}
                  className="p-2 rounded-lg bg-[#071B38] hover:bg-[#0C244C] text-white transition-colors cursor-pointer flex-shrink-0 ml-2"
                  title="Copy Email Address"
                >
                  {copiedType === 'email' ? <Check className="w-4 h-4 text-[#FF5500]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href={`mailto:${emailAddress}?subject=Booking%20%26%20Quotation%20Inquiry%20-%20Air%20Time%20Chauffeur&body=Hello%20Air%20Time%20Chauffeur%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20booking%20%2F%20custom%20quotation%20with%20the%20following%20details%3A%0A%0A-%20Pickup%20Location%3A%20%0A-%20Drop-off%20Location%3A%20%0A-%20Date%20%26%20Time%3A%20%0A-%20Number%20of%20Passengers%3A%20%0A-%20Vehicle%20Preference%20(Sedan%20%2F%20SUV)%3A%20%0A-%20Luggage%20Count%3A%20%0A%0AThank%20you!`}
              className="w-full py-4 sm:py-4.5 rounded-xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-[#FF5500]/30 flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer transform group-hover:scale-[1.02] border border-orange-300/40"
            >
              <Mail className="w-5 h-5 fill-current" />
              <span>EMAIL US</span>
            </a>
          </div>
        </div>

        {/* Quick 1-Click Fast Quotation Composer Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#071B38] border-2 border-[#0033A0]/60 p-6 sm:p-10 shadow-2xl relative">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase font-black tracking-widest text-[#FF5500] block mb-1">
              Prefer to send details now?
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
              Fast Quotation Request
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Fill in your basic trip details below and click submit to dispatch directly to our reservation desk.
            </p>
          </div>

          <form onSubmit={handleSendQuickInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={quickForm.name}
                  onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-4 py-3 bg-[#041122] border border-slate-700 focus:border-[#FF5500] rounded-xl text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={quickForm.phone}
                  onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                  placeholder="+1 (780) 000-0000"
                  className="w-full px-4 py-3 bg-[#041122] border border-slate-700 focus:border-[#FF5500] rounded-xl text-white text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#FF5500] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={quickForm.pickup}
                    onChange={(e) => setQuickForm({ ...quickForm, pickup: e.target.value })}
                    placeholder="e.g. Edmonton International Airport (YEG) or Address"
                    className="w-full pl-10 pr-4 py-3 bg-[#041122] border border-slate-700 focus:border-[#FF5500] rounded-xl text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Drop-Off Destination
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-white absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={quickForm.destination}
                    onChange={(e) => setQuickForm({ ...quickForm, destination: e.target.value })}
                    placeholder="e.g. Downtown Edmonton / JW Marriott ICE District"
                    className="w-full pl-10 pr-4 py-3 bg-[#041122] border border-slate-700 focus:border-[#FF5500] rounded-xl text-white text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Preferred Date & Time
                </label>
                <input
                  type="text"
                  value={quickForm.dateTime}
                  onChange={(e) => setQuickForm({ ...quickForm, dateTime: e.target.value })}
                  placeholder="e.g. Tomorrow at 6:30 AM"
                  className="w-full px-4 py-3 bg-[#041122] border border-slate-700 focus:border-[#FF5500] rounded-xl text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Vehicle / Passenger Preference
                </label>
                <select
                  value={quickForm.passengers}
                  onChange={(e) => setQuickForm({ ...quickForm, passengers: e.target.value })}
                  className="w-full px-4 py-3 bg-[#041122] border border-slate-700 focus:border-[#FF5500] rounded-xl text-white text-sm focus:outline-none"
                >
                  <option value="1-3 Passengers (Luxury Sedan or SUV)">1–3 Passengers (Luxury Sedan or SUV)</option>
                  <option value="4-6 Passengers (2026 GMC Yukon Denali XL)">4–6 Passengers (2026 GMC Yukon Denali XL)</option>
                  <option value="4-6 Passengers (Lincoln Navigator L Reserve)">4–6 Passengers (Lincoln Navigator Reserve)</option>
                  <option value="Executive Corporate Charter">Executive Corporate / Multi-Hour Charter</option>
                  <option value="YEG Airport VIP Transfer">YEG Airport VIP Transfer</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-[#FF5500]/30 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.01] border border-orange-300/40"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Submit Quotation Request via Email / Dispatch</span>
              </button>
            </div>
          </form>

          {/* Guarantee Badges Footer */}
          <div className="mt-8 pt-6 border-t border-[#0033A0]/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-slate-300">
            <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#041122] border border-[#0033A0]/50">
              <Clock className="w-4 h-4 text-[#FF5500]" />
              <span className="font-bold text-white">24/7 Dispatch</span>
              <span className="text-[10px] text-slate-400">Immediate Response</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#041122] border border-[#0033A0]/50">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="font-bold text-white">Licensed & Insured</span>
              <span className="text-[10px] text-slate-400">City & Airport Permit</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#041122] border border-[#0033A0]/50">
              <Plane className="w-4 h-4 text-[#FF5500]" />
              <span className="font-bold text-white">YEG Radar Sync</span>
              <span className="text-[10px] text-slate-400">No Flight Delay Fees</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[#041122] border border-[#0033A0]/50">
              <Star className="w-4 h-4 text-[#FF5500] fill-[#FF5500]" />
              <span className="font-bold text-white">5.0 Star Rating</span>
              <span className="text-[10px] text-slate-400">Top Alberta Chauffeur</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
