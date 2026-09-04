import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingQuotationSection } from './components/BookingQuotationSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FleetSection } from './components/FleetSection';
import { AirportRatesTable } from './components/AirportRatesTable';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DispatchDrawer } from './components/DispatchDrawer';
import { FloatingDispatchWidget } from './components/FloatingDispatchWidget';
import { ActiveCallModal } from './components/ActiveCallModal';
import { SmsManagerModal } from './components/SmsManagerModal';
import { VehicleId, AirportRateZone, BookingRecord } from './types';
import { Phone, Calendar, Smartphone } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDispatchOpen, setIsDispatchOpen] = useState<boolean>(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState<boolean>(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState<boolean>(false);
  const [dispatchTab, setDispatchTab] = useState<'chat' | 'call' | 'feed'>('chat');
  const [recentBookings, setRecentBookings] = useState<BookingRecord[]>([]);

  // Smooth scroll to section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Open active call center & trigger dial
  const handleInitiateCall = () => {
    setIsCallModalOpen(true);
  };

  // Fetch recent bookings for the dispatch live feed
  const fetchRecentBookings = async () => {
    try {
      const res = await fetch('/api/bookings/recent');
      if (res.ok) {
        const data = await res.json();
        if (data.bookings && data.bookings.length > 0) {
          setRecentBookings(data.bookings);
          return;
        }
      }
      throw new Error('API unavailable');
    } catch (err) {
      // Fallback for local storage
      try {
        const local = JSON.parse(localStorage.getItem('airtime_bookings') || '[]');
        setRecentBookings(local);
      } catch (lsErr) {
        setRecentBookings([]);
      }
    }
  };

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  // Handle fleet card selection into booking section
  const handleSelectFleetVehicle = (vehicleId: VehicleId) => {
    handleNavigate('booking');
  };

  // Handle quick book from the airport rates table
  const handleQuickBookZone = (zone: AirportRateZone, vehicle: VehicleId) => {
    handleNavigate('booking');
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Fixed Luxury Navigation Header */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenDispatch={() => {
          setDispatchTab('chat');
          setIsDispatchOpen(true);
        }}
        onCallClick={handleInitiateCall}
        onOpenSmsCenter={() => setIsSmsModalOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* 1. Full-screen Hero Section */}
        <Hero
          onBookNow={() => handleNavigate('booking')}
          onViewRates={() => handleNavigate('airport-rates')}
          onExploreFleet={() => handleNavigate('fleet')}
          onCallNow={handleInitiateCall}
        />

        {/* 2. Clean, Bold, and Highly Visible Booking & Quotation Section */}
        <BookingQuotationSection
          onOpenCallDesk={handleInitiateCall}
          onOpenChatDesk={() => {
            setDispatchTab('chat');
            setIsDispatchOpen(true);
          }}
        />

        {/* 3. Luxury Chauffeur Services (6 Core Offerings with Unique Images) */}
        <ServicesSection onBookService={() => {
          handleNavigate('booking');
        }} />

        {/* 4. Why Choose Us (8 Pillars) */}
        <WhyChooseUs />

        {/* 5. Executive Black Fleet (2026 GMC Yukon Denali XL, Lincoln Navigator, Luxury Sedan) */}
        <FleetSection onSelectVehicle={handleSelectFleetVehicle} />

        {/* 6. Comprehensive YEG Airport Rates Schedule Table */}
        <AirportRatesTable onQuickBookZone={handleQuickBookZone} />

        {/* 7. About Air Time Chauffeur & Heritage */}
        <AboutSection />

        {/* 8. Verified 5-Star Reviews & Google Rating */}
        <ReviewsSection />

        {/* 9. Contact, Service Areas & 24/7 Dispatch */}
        <ContactSection
          onOpenDispatchChat={() => {
            setDispatchTab('chat');
            setIsDispatchOpen(true);
          }}
          onOpenDispatchCall={() => {
            handleInitiateCall();
          }}
        />
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onCallClick={handleInitiateCall}
      />

      {/* Direct Active Call Modal Desk */}
      <ActiveCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onOpenChat={() => {
          setIsCallModalOpen(false);
          setDispatchTab('chat');
          setIsDispatchOpen(true);
        }}
      />

      {/* SMS Dispatch Notification Center & Manager Modal */}
      <SmsManagerModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
        bookings={recentBookings}
        onRefreshBookings={fetchRecentBookings}
      />

      {/* Live Dispatch Drawer (Active Chat & Call Desk) */}
      <DispatchDrawer
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        recentBookings={recentBookings}
        onRefresh={fetchRecentBookings}
        onBookDirect={() => handleNavigate('booking')}
        defaultTab={dispatchTab}
      />

      {/* Floating 24/7 Dispatch Chat & Direct Call Widget */}
      <FloatingDispatchWidget
        onOpenChat={() => {
          setDispatchTab('chat');
          setIsDispatchOpen(true);
        }}
        onOpenCall={() => {
          handleInitiateCall();
        }}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-lg border-t border-[#C9A45C]/40 p-3 flex items-center gap-3 shadow-2xl">
        <a
          href="tel:+15877282828"
          onClick={() => {
            handleInitiateCall();
          }}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#C8102E] via-[#B91C1C] to-[#990000] hover:from-[#DC2626] hover:to-[#B91C1C] border border-red-500/50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/40"
        >
          <Phone className="w-4 h-4 text-white" />
          <span>Call Dispatch</span>
        </a>

        <button
          onClick={() => handleNavigate('booking')}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] text-[#080808] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C9A45C]/30 cursor-pointer border border-[#FFF1C5]/50"
        >
          <Calendar className="w-4 h-4 text-[#080808]" />
          <span>Book Chauffeur</span>
        </button>
      </div>
    </div>
  );
}

export default App;
