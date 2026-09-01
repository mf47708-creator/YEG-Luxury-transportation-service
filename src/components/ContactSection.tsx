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
  MessageSquare
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
    <section id="contact" className="py-24 bg-[#030c1a] relative border-t border-[#0033A0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#071B38] border border-[#0033A0]/60 mb-3 shadow-md">
            <Phone className="w-4 h-4 text-[#FF5500]" />
            <span className="text-xs uppercase tracking-widest font-bold text-white">
              Get In Touch
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-[#FF6B00]">Air Time Chauffeur</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Have questions regarding custom corporate contracts, long-distance luxury charters, or wedding fleets? Our 24/7 Edmonton dispatch desk is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & Service Areas */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Quick 24/7 Action Buttons in Royal Blue, Orange, and White */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onOpenDispatchChat}
                  className="p-3.5 rounded-xl bg-[#071B38] hover:bg-[#0C244C] border border-[#0033A0]/70 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-[#FF5500]" />
                  <span>24/7 Live Chat</span>
                </button>

                <a
                  href="tel:+15877282828"
                  onClick={(e) => {
                    if (onOpenDispatchCall) {
                      onOpenDispatchCall();
                    }
                  }}
                  className="p-3.5 rounded-xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF5500]/30 transition-all cursor-pointer border border-orange-300/40"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call Dispatch</span>
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-[#071B38] border border-[#0033A0]/50 flex items-start gap-4 shadow-md">
                <div className="p-3 rounded-xl bg-[#041122] border border-[#0033A0]/50 text-[#FF5500] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block">
                    24/7 Primary Dispatch Phone
                  </span>
                  <a
                    href="tel:+15877282828"
                    onClick={(e) => {
                      if (onOpenDispatchCall) {
                        onOpenDispatchCall();
                      }
                    }}
                    className="font-cinzel text-lg sm:text-xl font-bold text-white hover:text-[#FF7700] transition-colors block mt-0.5 cursor-pointer"
                  >
                    +1 (587) 728-2828
                  </a>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Direct Chauffeur & Airport Dispatch Desk
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#071B38] border border-[#0033A0]/50 flex items-start gap-4 shadow-md">
                <div className="p-3 rounded-xl bg-[#041122] border border-[#0033A0]/50 text-[#FF5500] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block">
                    Dispatch Email
                  </span>
                  <a
                    href="mailto:limoairtime@gmail.com"
                    className="text-sm sm:text-base font-semibold text-white hover:text-[#FF7700] transition-colors block mt-0.5"
                  >
                    limoairtime@gmail.com
                  </a>
                  <span className="text-[11px] text-slate-400 block">
                    Fast response for quote requests & itineraries
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#071B38] border border-[#0033A0]/50 flex items-start gap-4 shadow-md">
                <div className="p-3 rounded-xl bg-[#041122] border border-[#0033A0]/50 text-[#FF5500] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block">
                    Headquarters & Operational Base
                  </span>
                  <span className="text-sm font-semibold text-white block mt-0.5">
                    Edmonton, Alberta, Canada
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Serving Edmonton International Airport (YEG) & Greater Alberta
                  </span>
                </div>
              </div>
            </div>

            {/* Service Areas Pill Grid */}
            <div className="p-6 rounded-2xl bg-[#071B38] border border-[#0033A0]/50 shadow-md">
              <h3 className="text-xs uppercase font-black tracking-widest text-[#FF5500] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF5500]" />
                <span>Executive Service Coverage Areas</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {serviceAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact / Inquiry Form */}
          <div className="lg:col-span-7 bg-[#071B38] border border-[#0033A0]/60 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#FF5500] mx-auto mb-4" />
                <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                  Message Transmitted
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for reaching out to Air Time Black Car & SUV Service. Our dispatch team will review your inquiry and get in touch promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  For immediate rides within 2 hours, please call us directly at <a href="tel:+15877282828" className="text-[#FF7700] font-bold">+1 (587) 728-2828</a>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Rigby"
                      className="w-full px-4 py-3 bg-[#041122] border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (780) 000-0000"
                      className="w-full px-4 py-3 bg-[#041122] border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-[#041122] border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#041122] border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5500]"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Message / Travel Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide dates, passenger count, vehicle preferences, or custom itinerary requests..."
                    className="w-full px-4 py-3 bg-[#041122] border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF5500] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FF5500]/30 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5 border border-orange-300/40"
                >
                  <Send className="w-4 h-4 text-white" />
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
