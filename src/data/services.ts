import { ServiceItem } from '../types';
import weddingImg from '../assets/images/service_wedding_1787433421046.jpg';
import airportImg from '../assets/images/service_airport_1787433434341.jpg';
import businessImg from '../assets/images/service_business_1787433447987.jpg';
import vipNightImg from '../assets/images/service_vip_night_1787433459703.jpg';
import iceNightImg from '../assets/images/service_ice_night_1787433472508.jpg';
import mountainImg from '../assets/images/service_mountain_alberta_1787433529472.jpg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'airport-service',
    title: 'Airport Service',
    badge: 'Popular • Flat Rates',
    tagline: 'Flawless Edmonton International Airport (YEG) Transfers',
    description: 'We take pride in providing professional and luxurious airport transfer services, going above and beyond to meet each client’s unique needs for seamless pick-up and drop-off with private tarmac access.',
    iconName: 'PlaneTakeoff',
    image: airportImg,
    colorTheme: 'blue',
    highlights: [
      'Live flight tracking & automatic delay adjustments',
      'Curbside or inside baggage hall Meet & Greet',
      'Flight arrival monitoring so your chauffeur is ready upon landing',
      'Assistance with luggage loading and unloading',
      'Flat transparent pricing with zero surprise surge fees'
    ]
  },
  {
    id: 'business-transfer',
    title: 'Business & Executive',
    badge: 'Corporate Accounts',
    tagline: 'Executive Travel Engineered for Peak Productivity',
    description: 'Focus on what matters while we handle your journey with precision and care. Our professional suit-and-tie chauffeurs provide a discreet, comfortable and seamless executive travel experience.',
    iconName: 'Briefcase',
    image: businessImg,
    colorTheme: 'green',
    highlights: [
      'Discreet, background-checked professional chauffeurs',
      'Mobile office amenities: High-speed Wi-Fi and power outlets',
      'Corporate direct billing & itemized digital invoicing',
      'ICE District, Downtown Edmonton, and refinery corridor routes',
      'Punctuality backed by our 15-minute early arrival guarantee'
    ]
  },
  {
    id: 'wedding-service',
    title: 'Weddings & Celebrations',
    badge: 'Red Carpet Elegance',
    tagline: 'Unforgettable Grand Entrance on Your Special Day',
    description: 'Make your special day unforgettable with elegant luxury transportation for the bride, groom, and wedding party with floral ribbon styling and red carpet service.',
    iconName: 'HeartHandshake',
    image: weddingImg,
    colorTheme: 'red',
    highlights: [
      'Spotless, high-polish black exterior detailing with custom ribbons & flowers',
      'Red carpet rollout & optional floral ribbon styling upon request',
      'Spacious cabins designed to preserve wedding gown elegance',
      'Chauffeurs dressed in formal black suit and tie',
      'Coordination with wedding planners and photographers'
    ]
  },
  {
    id: 'vip-events',
    title: 'VIP Events & Rogers Place',
    badge: 'Confidentiality First',
    tagline: 'First-Class Discretion for High-Profile Occasions',
    description: 'Professional chauffeurs providing first-class transportation with complete discretion, neon-lit nightlife arrivals, and priority venue staging.',
    iconName: 'Crown',
    image: iceNightImg,
    colorTheme: 'red',
    highlights: [
      'Rogers Place VIP concert & Edmonton Oilers game drop-offs',
      'Gala, gala dinner, and award ceremony transport',
      'Strict non-disclosure policy and tinted privacy glass',
      'Pre-planned security routes and staging logistics',
      'Priority access and immediate pickup staging'
    ]
  },
  {
    id: 'birthday-parties',
    title: 'Night Out & Milestones',
    badge: 'Milestone Celebrations',
    tagline: 'Elevate Every Milestone with Style and Comfort',
    description: 'Celebrate birthdays, anniversaries, graduations, and evening dates while we handle all transportation in radiant style.',
    iconName: 'Sparkles',
    image: vipNightImg,
    colorTheme: 'gold',
    highlights: [
      'Group travel in spacious 2026 Yukon Denali XL / Lincoln Navigator',
      'Bluetooth premium sound system for your curated playlists',
      'Multi-stop restaurant, venue, and nightlife coordination',
      'Safe, reliable late-night return journey for all guests',
      'Complimentary refreshments & festive vehicle presentation'
    ]
  },
  {
    id: 'out-of-town-service',
    title: 'Alberta Mountain Corridors',
    badge: 'Alberta-Wide Travel',
    tagline: 'Comfortable Long-Distance Travel Beyond Edmonton',
    description: 'Travel beyond Edmonton with supreme comfort, reliability and luxury to Jasper, Banff, Lake Louise, Calgary, and Northern Alberta.',
    iconName: 'Compass',
    image: mountainImg,
    colorTheme: 'blue',
    highlights: [
      'Door-to-door trips to Calgary, Banff, Lake Louise, and Jasper',
      'Northern Alberta routes: Fort McMurray, Grande Prairie, Cold Lake',
      'All-wheel drive & severe winter weather equipped tires',
      'Comfortable stops at your convenience throughout the drive',
      'Skip the stress of driving Highway 2 or mountain corridors'
    ]
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Professional Chauffeurs',
    description: 'Vetted, commercially licensed, suit-and-tie professionals trained in etiquette and executive discretion.',
    iconName: 'UserCheck'
  },
  {
    title: 'Luxury SUVs & Sedans',
    description: 'Modern 2026 GMC Yukon Denali, Lincoln Navigator, and luxury black sedans maintained to immaculate standards.',
    iconName: 'Car'
  },
  {
    title: '24/7 Service',
    description: 'Round-the-clock dispatch and chauffeur availability for red-eye flights and emergency travel.',
    iconName: 'Clock'
  },
  {
    title: 'Airport Specialists',
    description: 'Live flight tracking, guaranteed gate-ready pickup, and expedited luggage handling at Edmonton (YEG).',
    iconName: 'Plane'
  },
  {
    title: 'Corporate Accounts',
    description: 'Streamlined corporate billing, digital receipts, customized route scheduling, and priority booking.',
    iconName: 'Building2'
  },
  {
    title: 'Always On Time',
    description: 'Backed by our strict punctuality guarantee—our chauffeurs arrive 15 minutes before your scheduled pickup.',
    iconName: 'Timer'
  },
  {
    title: 'Safe & Reliable',
    description: 'Fully licensed and commercially insured with top-tier winter traction systems for Alberta roads.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Clean Luxury Vehicles',
    description: 'Deeply sanitized, conditioned leather interiors, complimentary chilled artesian waters, chargers, and Wi-Fi.',
    iconName: 'Sparkle'
  }
];
