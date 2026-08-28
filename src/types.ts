export type VehicleId = 'gmc-yukon-denali' | 'lincoln-navigator' | 'luxury-sedan';

export interface Vehicle {
  id: VehicleId;
  name: string;
  category: 'Luxury SUV' | 'Executive Sedan';
  tagline: string;
  passengers: number;
  luggage: number;
  image: string;
  features: string[];
  description: string;
  hourlyRate: number;
  airportBaseRate: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  highlights: string[];
  badge?: string;
  colorTheme?: 'red' | 'blue' | 'green' | 'gold';
}

export interface AirportRateZone {
  zone: string;
  distanceKm: number;
  sedanBase: number;
  suvBase: number;
  sedanTotal: number; // with 5% GST
  suvTotal: number;   // with SUV +$20 and 5% GST
  notes?: string;
}

export interface FareCalculationResult {
  isAirportRoute: boolean;
  distanceKm: number;
  baseFare: number;
  suvCharge: number;
  subtotal: number;
  gstAmount: number;
  totalPrice: number;
  message?: string;
  pickup: string;
  destination: string;
  vehicleType: string;
  passengers: number;
  luggage: number;
  bracketDescription?: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  pickupAddress: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  luggage: number;
  vehicleType: VehicleId;
  flightNumber?: string;
  specialInstructions?: string;
  promoCode?: string;
  calculatedFare?: FareCalculationResult | null;
  pickupDetails?: {
    formattedAddress: string;
    city?: string;
    province?: string;
    postalCode?: string;
    lat?: number;
    lng?: number;
    placeId?: string;
    isAirport?: boolean;
    isValidated: boolean;
  };
  dropoffDetails?: {
    formattedAddress: string;
    city?: string;
    province?: string;
    postalCode?: string;
    lat?: number;
    lng?: number;
    placeId?: string;
    isAirport?: boolean;
    isValidated: boolean;
  };
  routeMetrics?: {
    distanceKm: number;
    distanceMiles: number;
    durationMinutes: number;
    durationText: string;
    routeSummary?: string;
    isFastestRoute?: boolean;
    trafficOptimized?: boolean;
    viaAnthonyHenday?: boolean;
    northOfYellowhead?: boolean;
    source?: string;
  };
}

export interface BookingRecord extends BookingFormData {
  id: string;
  createdAt: string;
  status: 'Received' | 'Confirmed' | 'Dispatched' | 'Completed';
  smsDispatched: boolean;
  emailDispatched: boolean;
  smsRecipient: string;
  emailRecipient: string;
  smsDeliveryStatus?: 'delivered' | 'sent' | 'failed' | 'simulated' | 'pending';
  smsErrorMessage?: string;
  smsSentAt?: string;
  smsMessageBody?: string;
  customerSmsDispatched?: boolean;
  customerSmsDeliveryStatus?: 'delivered' | 'sent' | 'failed' | 'simulated' | 'pending';
  customerSmsSentAt?: string;
  customerSmsErrorMessage?: string;
  smsRetryCount?: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  title: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  content: string;
  avatar?: string;
  verified: boolean;
}
