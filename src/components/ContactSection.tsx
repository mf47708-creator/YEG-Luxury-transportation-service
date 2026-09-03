import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Plane,
  Shield,
  MessageSquare,
  Instagram,
  Facebook
} from 'lucide-react';

interface ContactSectionProps {
  onOpenDispatchChat?: () => void;
  onOpenDispatchCall?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenDispatchChat,
  onOpenDispatchCall
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Corporate / General Chauffeur Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const serviceAreas = [
    'Edmonton (Downtown, ICE District, Windermere, Terwillegar)',
    'Edmonton International Airport (YEG)',
    'Sherwood Park / Strathcona County',
    'St. Albert',
    'Spruce Grove',
    'Stony Plain',
    'Fort Saskatchewan',
    'Leduc & Nisku Industrial Park',
    'Beaumont',
    'Devon & Acheson',
    'Red Deer (Intercity Corridor)',
    'Calgary & Rocky Mountains (Jasper / Banff)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Corporate / General Chauffeur Inquiry',
        message: ''
      });
    }, 3500);
  };

  return (
    <section id="contact" className="py-24 bg-[#080808] relative border-t border-[#C9A45C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151515] border border-[#C9A45C]/40 mb-3 shadow-md">
            <Phone className="w-4 h-4 text-[#C9A45C]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5F3EE]">
              Get In Touch
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F3EE] mb-4">
            Contact <span className="text-[#C9A45C]">Air Time Chauffeur</span>
          </h2>
          <p className="text-[#A7A7A7] text-base sm:text-lg">
            Have questions regarding custom corporate contracts, long-distance luxury charters, or wedding fleets? Our 24/7 Edmonton dispatch desk is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & Service Areas */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Quick 24/7 Action Buttons in Champagne Gold and Charcoal */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onOpenDispatchChat}
                  className="p-3.5 rounded-xl bg-[#151515] hover:bg-[#222222] border border-white/15 text-[#F5F3EE] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-[#C9A45C]" />
                  <span>24/7 Live Chat</span>
                </button>

                <a
                  href="tel:+15877282828"
                  onClick={(e) => {
                    if (onOpenDispatchCall) {
                      onOpenDispatchCall();
                    }
                  }}
                  className="p-3.5 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C9A45C]/30 transition-all cursor-pointer border border-[#FFF1C5]/40"
                >
                  <Phone className="w-4 h-4 fill-current text-[#080808]" />
                  <span>Call Dispatch</span>
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-[#151515] border border-white/10 flex items-start gap-4 shadow-md">
                <div className="p-3 rounded-xl bg-[#080808] border border-white/10 text-[#C9A45C] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-[#A7A7A7] block">
                    24/7 Primary Dispatch Phone
                  </span>
                  <a
                    href="tel:+15877282828"
                    onClick={(e) => {
                      if (onOpenDispatchCall) {
                        onOpenDispatchCall();
                      }
                    }}
                    className="font-cinzel text-lg sm:text-xl font-bold text-[#F5F3EE] hover:text-[#E2C27A] transition-colors block mt-0.5 cursor-pointer"
                  >
                    +1 (587) 728-2828
                  </a>
                  <span className="text-xs text-[#A7A7A7] mt-1 block">
                    Direct Chauffeur & Airport Dispatch Desk
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#151515] border border-white/10 flex items-start gap-4 shadow-md">
                <div className="p-3 rounded-xl bg-[#080808] border border-white/10 text-[#C9A45C] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-[#A7A7A7] block">
                    Dispatch Email
                  </span>
                  <a
                    href="mailto:limoairtime@gmail.com"
                    className="text-sm sm:text-base font-semibold text-[#F5F3EE] hover:text-[#E2C27A] transition-colors block mt-0.5"
                  >
                    limoairtime@gmail.com
                  </a>
                  <span className="text-[11px] text-[#A7A7A7] block">
                    Fast response for quote requests & itineraries
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#151515] border border-white/10 flex items-start gap-4 shadow-md">
                <div className="p-3 rounded-xl bg-[#080808] border border-white/10 text-[#C9A45C] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-[#A7A7A7] block">
                    Headquarters & Operational Base
                  </span>
                  <span className="text-sm font-semibold text-[#F5F3EE] block mt-0.5">
                    Edmonton, Alberta, Canada
                  </span>
                  <span className="text-[11px] text-[#A7A7A7] block">
                    Serving Edmonton International Airport (YEG) & Greater Alberta
                  </span>
                </div>
              </div>

              {/* Official Social Media Channels */}
              <div className="p-5 rounded-2xl bg-[#151515] border border-white/10 shadow-md">
                <span className="text-xs uppercase font-bold text-[#C9A45C] block mb-1">
                  Official Social Channels
                </span>
                <p className="text-xs text-[#A7A7A7] mb-3.5">
                  Follow us for real-time fleet updates, Edmonton events, and passenger stories:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://www.instagram.com/airtimeblacksuv?igsi=MThpYW1mcG9kajgzbQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#080808] hover:bg-[#202020] border border-white/10 hover:border-[#C9A45C]/60 text-[#F5F3EE] hover:text-[#E2C27A] flex items-center gap-2.5 text-xs font-bold transition-all shadow-sm group"
                  >
                    <div className="p-1.5 rounded-lg bg-[#151515] text-[#C9A45C] group-hover:scale-110 transition-transform">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block leading-tight">Instagram</span>
                      <span className="text-[10px] text-neutral-400 font-normal">@airtimeblacksuv</span>
                    </div>
                  </a>

                  <a
                    href="https://www.facebook.com/share/18KKr9wMXU/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#080808] hover:bg-[#202020] border border-white/10 hover:border-[#C9A45C]/60 text-[#F5F3EE] hover:text-[#E2C27A] flex items-center gap-2.5 text-xs font-bold transition-all shadow-sm group"
                  >
                    <div className="p-1.5 rounded-lg bg-[#151515] text-[#C9A45C] group-hover:scale-110 transition-transform">
                      <Facebook className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block leading-tight">Facebook</span>
                      <span className="text-[10px] text-neutral-400 font-normal">Air Time Chauffeur</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Service Areas Pill Grid */}
            <div className="p-6 rounded-2xl bg-[#151515] border border-white/10 shadow-md">
              <h3 className="text-xs uppercase font-black tracking-widest text-[#C9A45C] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A45C]" />
                <span>Executive Service Coverage Areas</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A7A7A7]">
                {serviceAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact / Inquiry Form */}
          <div className="lg:col-span-7 bg-[#151515] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#C9A45C] mx-auto mb-4" />
                <h3 className="font-cinzel text-2xl font-bold text-[#F5F3EE] mb-2">
                  Message Transmitted
                </h3>
                <p className="text-[#A7A7A7] text-sm max-w-md mx-auto">
                  Thank you for reaching out to Air Time Black Car & SUV Service. Our dispatch team will review your inquiry and get in touch promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-cinzel text-2xl font-bold text-[#F5F3EE] mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[#A7A7A7] mb-6">
                  For immediate rides within 2 hours, please call us directly at <a href="tel:+15877282828" className="text-[#E2C27A] font-bold">+1 (587) 728-2828</a>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A7A7] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Rigby"
                      className="w-full px-4 py-3 bg-[#080808] border border-white/15 rounded-xl text-[#F5F3EE] text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A7A7] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (780) 000-0000"
                      className="w-full px-4 py-3 bg-[#080808] border border-white/15 rounded-xl text-[#F5F3EE] text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#A7A7A7] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-[#080808] border border-white/15 rounded-xl text-[#F5F3EE] text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A7A7] mb-1.5">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#080808] border border-white/15 rounded-xl text-[#F5F3EE] text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C]"
                    >
                      <option value="Corporate / General Chauffeur Inquiry">Corporate Account Inquiry</option>
                      <option value="Wedding Transportation Package">Wedding Fleet Package</option>
                      <option value="Out of Town Luxury Transfer (Calgary/Jasper)">Out-of-Town / Jasper / Banff Trip</option>
                      <option value="Special VIP Event / Private Aviation">VIP Event / FBO Aviation Pickup</option>
                      <option value="General Questions">General Questions</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#A7A7A7] mb-1.5">
                    Your Message / Travel Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide dates, passenger count, vehicle preferences, or custom itinerary requests..."
                    className="w-full px-4 py-3 bg-[#080808] border border-white/15 rounded-xl text-[#F5F3EE] text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#C9A45C]/30 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5 border border-[#FFF1C5]/40"
                >
                  <Send className="w-4 h-4 text-[#080808]" />
                  <span>Send Message to Dispatch</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

