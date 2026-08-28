import { Vehicle } from '../types';
import gmcYukonImg from '../assets/images/hero_background_1787433226466.jpg';
import lincolnImg from '../assets/images/fleet_escalade_suv_1787433499079.jpg';
import mercedesSedanImg from '../assets/images/fleet_mercedes_sedan_1787433486130.jpg';

export const FLEET_DATA: Vehicle[] = [
  {
    id: 'gmc-yukon-denali',
    name: '2026 Black GMC Yukon Denali XL',
    category: 'Luxury SUV',
    tagline: 'The Pinnacle of Executive SUV Comfort & Presence',
    passengers: 6,
    luggage: 6,
    image: gmcYukonImg,
    hourlyRate: 125,
    airportBaseRate: 99,
    description: 'Our flagship 2026 GMC Yukon Denali XL offers expansive executive legroom, handcrafted leather upholstery, rear climate control, privacy glass, Wi-Fi hotspot, and massive luggage capacity for groups and families.',
    features: [
      'Extended Wheelbase (XL) with Extra Luggage Room',
      'Ultra-Plush Heated & Ventilated Captain Chairs',
      'Whisper-Quiet Cabin Acoustic Glass',
      'Onboard 5G High-Speed Wi-Fi & Device Chargers',
      'Complimentary Chilled Artesian Bottled Water & Mints',
      'Tri-Zone Independent Automatic Climate Control'
    ]
  },
  {
    id: 'lincoln-navigator',
    name: 'Lincoln Navigator L Reserve / Black Label',
    category: 'Luxury SUV',
    tagline: 'Sophisticated American Luxury & Regal Elegance',
    passengers: 6,
    luggage: 5,
    image: lincolnImg,
    hourlyRate: 135,
    airportBaseRate: 109,
    description: 'The Lincoln Navigator L is the gold standard of luxury travel. Featuring Perfect Position 30-way massaging front and second-row seats, Revel Ultima 3D Audio, and a grand panoramic vista roof.',
    features: [
      'Panoramic Vista Glass Roof with Power Shade',
      '30-Way Perfect Position Massaging Seating',
      'Revel® Ultima 3D 28-Speaker Studio Sound System',
      'Rear Seat Interactive Entertainment Displays',
      'Executive Power Running Boards for Effortless Entry',
      'Sanitized Fresh Cabin Air Filtration System'
    ]
  },
  {
    id: 'luxury-sedan',
    name: 'Luxury Black Executive Sedan (Mercedes-Benz / Cadillac)',
    category: 'Executive Sedan',
    tagline: 'Discreet, Seamless & Timeless Chauffeur Elegance',
    passengers: 3,
    luggage: 3,
    image: mercedesSedanImg,
    hourlyRate: 95,
    airportBaseRate: 75,
    description: 'Designed for corporate executives, solo VIP flyers, and discerning couples. Provides smooth air suspension, executive rear desk space, and complete chauffeur discretion across Edmonton.',
    features: [
      'Airmatic Dynamic Comfort Suspension',
      'Executive Rear Center Armrest & Work Console',
      'Rear Window Electric Privacy Sunshades',
      'Silent Cabin with Active Road Noise Cancellation',
      'Fast USB-C / MagSafe Wireless Charging',
      'Spacious Trunk accommodating 3 full-sized luggage'
    ]
  }
];
