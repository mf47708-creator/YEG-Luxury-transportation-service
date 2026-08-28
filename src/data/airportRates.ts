import { FareCalculationResult, AirportRateZone } from '../types';

export const EDMONTON_AIRPORT_NAMES = [
  'edmonton international airport',
  'yeg airport',
  'edmonton airport',
  'yeg',
  '1000 aerodrome way',
  'nisku airport',
  'eia'
];

export function isEdmontonAirportLocation(location: string): boolean {
  if (!location) return false;
  const normalized = location.toLowerCase().trim();
  return EDMONTON_AIRPORT_NAMES.some((name) => normalized.includes(name));
}

export function getBaseFareByDistance(distanceKm: number): { baseFare: number; bracketDescription: string } {
  const d = Math.max(0.1, Math.round(distanceKm * 10) / 10);

  if (d <= 25) {
    return { baseFare: 75, bracketDescription: '0.1–25 km' };
  } else if (d <= 30) {
    return { baseFare: 79, bracketDescription: 'Over 25–30 km' };
  } else if (d <= 35) {
    return { baseFare: 85, bracketDescription: 'Over 30–35 km' };
  } else if (d <= 40) {
    return { baseFare: 89, bracketDescription: 'Over 35–40 km' };
  } else if (d <= 45) {
    return { baseFare: 99, bracketDescription: 'Over 40–45 km' };
  } else if (d <= 50) {
    return { baseFare: 109, bracketDescription: 'Over 45–50 km' };
  } else if (d <= 55) {
    return { baseFare: 119, bracketDescription: 'Over 50–55 km' };
  } else if (d <= 60) {
    return { baseFare: 129, bracketDescription: 'Over 55–60 km' };
  } else if (d <= 65) {
    return { baseFare: 139, bracketDescription: 'Over 60–65 km' };
  } else if (d <= 70) {
    return { baseFare: 149, bracketDescription: 'Over 65–70 km' };
  } else if (d <= 75) {
    return { baseFare: 159, bracketDescription: 'Over 70–75 km' };
  } else if (d <= 80) {
    return { baseFare: 169, bracketDescription: 'Over 75–80 km' };
  } else if (d <= 85) {
    return { baseFare: 179, bracketDescription: 'Over 80–85 km' };
  } else if (d <= 90) {
    return { baseFare: 189, bracketDescription: 'Over 85–90 km' };
  } else if (d <= 95) {
    return { baseFare: 199, bracketDescription: 'Over 90–95 km' };
  } else if (d <= 100) {
    return { baseFare: 209, bracketDescription: 'Over 95–100 km' };
  } else {
    const rate = Math.round(d * 2.15 * 100) / 100;
    return { baseFare: rate, bracketDescription: `Over 100 km (${d} km × $2.15/km)` };
  }
}

export function calculateEdmontonAirportFare(
  pickup: string,
  destination: string,
  distanceKm: number,
  vehicleType: string,
  passengers: number,
  luggage: number
): FareCalculationResult {
  const isPickupAirport = isEdmontonAirportLocation(pickup);
  const isDestAirport = isEdmontonAirportLocation(destination);
  const isAirportRoute = isPickupAirport || isDestAirport;

  const validDistance = Math.max(0.1, Math.round(distanceKm * 10) / 10);
  const { baseFare, bracketDescription } = getBaseFareByDistance(validDistance);

  // Check Additional SUV / Passenger / Luggage charge:
  // "For a booking involving Edmonton International Airport (YEG), automatically add $20 if ANY ONE of these conditions is met:
  // 1. Customer requests an SUV, OR
  // 2. Number of passengers is more than 3, OR
  // 3. Checked luggage is more than 3
  // If multiple conditions are true, still charge only one $20 additional charge, not $20 for each condition."
  const isSUV =
    vehicleType.toLowerCase().includes('suv') ||
    vehicleType.toLowerCase().includes('denali') ||
    vehicleType.toLowerCase().includes('navigator') ||
    vehicleType === 'gmc-yukon-denali' ||
    vehicleType === 'lincoln-navigator';
  const hasExtraPassengers = passengers > 3;
  const hasExtraLuggage = luggage > 3;

  // If airport route OR standard chauffeur capacity upgrade
  const qualifiesFor20Charge = isSUV || hasExtraPassengers || hasExtraLuggage;
  const suvCharge = qualifiesFor20Charge ? 20 : 0;

  const subtotal = Math.round((baseFare + suvCharge) * 100) / 100;
  const gstAmount = Math.round(subtotal * 0.05 * 100) / 100;
  const totalPrice = Math.round((subtotal + gstAmount) * 100) / 100;

  return {
    isAirportRoute,
    distanceKm: validDistance,
    baseFare,
    suvCharge,
    subtotal,
    gstAmount,
    totalPrice,
    pickup,
    destination,
    vehicleType,
    passengers,
    luggage,
    bracketDescription
  };
}

export const POPULAR_DESTINATIONS: { name: string; address: string; distanceKm: number; description: string }[] = [
  {
    name: 'Downtown Edmonton / Rogers Place (ICE District)',
    address: '10220 104 Ave NW, Edmonton, AB (ICE District / JW Marriott)',
    distanceKm: 31.4,
    description: 'Central business hub, financial core, JW Marriott & luxury hotels'
  },
  {
    name: 'South Edmonton Common & Ellerslie',
    address: 'South Edmonton Common, Edmonton, AB',
    distanceKm: 18.2,
    description: 'Premier shopping, business parks & south residential areas'
  },
  {
    name: 'West Edmonton Mall & Meadowlark',
    address: '8882 170 St NW, Edmonton, AB (West Edmonton Mall)',
    distanceKm: 37.8,
    description: 'Fantasyland Hotel, West End executive hotels & residences'
  },
  {
    name: 'University of Alberta & Whyte Ave (Old Strathcona)',
    address: '116 St & 85 Ave, Edmonton, AB (University of Alberta)',
    distanceKm: 28.6,
    description: 'U of A campus, hospital corridor & Old Strathcona arts hub'
  },
  {
    name: 'Sherwood Park / Strathcona County',
    address: 'Sherwood Park, AB',
    distanceKm: 42.1,
    description: 'Executive residential subdivisions & eastern industrial sector'
  },
  {
    name: 'Castledowns & North Edmonton (153 Ave)',
    address: '11520 153 Ave NW, Edmonton, AB (Castle Downs)',
    distanceKm: 48.5,
    description: 'North residential corridor via Anthony Henday Ring Road'
  },
  {
    name: 'Clareview & Manning Town Centre',
    address: '4800 137 Ave NW, Edmonton, AB (Clareview / Manning)',
    distanceKm: 46.8,
    description: 'Northeast commercial hub via Anthony Henday Ring Road'
  },
  {
    name: 'St. Albert (North Edmonton Metro)',
    address: 'St. Albert, AB',
    distanceKm: 52.4,
    description: 'Historic northwest community via Anthony Henday Ring Road'
  },
  {
    name: 'Leduc & Nisku Business Park',
    address: 'Nisku, AB (Leduc County)',
    distanceKm: 7.8,
    description: 'Closest industrial sector and corporate aviation hotels'
  },
  {
    name: 'Spruce Grove & Stony Plain',
    address: 'Spruce Grove, AB',
    distanceKm: 61.5,
    description: 'Western corridor residential and commercial community'
  },
  {
    name: 'Fort Saskatchewan / Industrial Heartland',
    address: 'Fort Saskatchewan, AB',
    distanceKm: 66.2,
    description: 'Northeast energy corridor and executive business transfers'
  },
  {
    name: 'Beaumont',
    address: 'Beaumont, AB',
    distanceKm: 14.5,
    description: 'South metropolitan community near airport boundary'
  },
  {
    name: 'Red Deer (Central Alberta)',
    address: 'Red Deer, AB',
    distanceKm: 124.0,
    description: 'Direct Highway 2 corridor transfer between Edmonton & Calgary'
  },
  {
    name: 'Calgary Downtown (YYC Corridor)',
    address: 'Downtown Calgary, AB',
    distanceKm: 275.0,
    description: 'Intercity executive door-to-door luxury transfer'
  },
  {
    name: 'Jasper National Park (Fairmont Jasper Park Lodge)',
    address: 'Jasper, AB',
    distanceKm: 395.0,
    description: 'Mountain resort luxury retreat with scenic highway cruise'
  },
  {
    name: 'Banff & Lake Louise',
    address: 'Banff, AB',
    distanceKm: 405.0,
    description: 'World-renowned Canadian Rockies ski and luxury lodge transport'
  }
];

export const AIRPORT_RATES_ZONES_TABLE: AirportRateZone[] = [
  { zone: 'Nisku & Leduc Core', distanceKm: 8, sedanBase: 75, suvBase: 95, sedanTotal: 78.75, suvTotal: 99.75, notes: 'Direct 5-10 min drive' },
  { zone: 'Beaumont', distanceKm: 15, sedanBase: 75, suvBase: 95, sedanTotal: 78.75, suvTotal: 99.75, notes: 'South border area' },
  { zone: 'South Edmonton Common / Ellerslie / Heritage Valley', distanceKm: 20, sedanBase: 75, suvBase: 95, sedanTotal: 78.75, suvTotal: 99.75, notes: 'Windermere & Jagare Ridge' },
  { zone: 'Southgate / Terwillegar / Mill Woods', distanceKm: 25, sedanBase: 75, suvBase: 95, sedanTotal: 78.75, suvTotal: 99.75, notes: 'South Edmonton communities' },
  { zone: 'Old Strathcona / Whyte Ave / U of A Campus', distanceKm: 29, sedanBase: 79, suvBase: 99, sedanTotal: 82.95, suvTotal: 103.95, notes: 'University & Hospital' },
  { zone: 'Downtown Edmonton / ICE District / Rogers Place', distanceKm: 32, sedanBase: 85, suvBase: 105, sedanTotal: 89.25, suvTotal: 110.25, notes: 'JW Marriott, Westin, Sutton' },
  { zone: 'West Edmonton Mall & Riverbend', distanceKm: 38, sedanBase: 89, suvBase: 109, sedanTotal: 93.45, suvTotal: 114.45, notes: 'Fantasyland Hotel & West End' },
  { zone: 'Sherwood Park (Central & South)', distanceKm: 42, sedanBase: 99, suvBase: 119, sedanTotal: 103.95, suvTotal: 124.95, notes: 'Strathcona County estates' },
  { zone: 'North Edmonton (Castledowns / Clareview / Manning)', distanceKm: 48, sedanBase: 109, suvBase: 129, sedanTotal: 114.45, suvTotal: 135.45, notes: 'North ring corridor' },
  { zone: 'St. Albert (Heritage Lakes / Botanica / Erin Ridge)', distanceKm: 53, sedanBase: 119, suvBase: 139, sedanTotal: 124.95, suvTotal: 145.95, notes: 'Northwest executive enclave' },
  { zone: 'Spruce Grove', distanceKm: 62, sedanBase: 139, suvBase: 159, sedanTotal: 145.95, suvTotal: 166.95, notes: 'Highway 16A West' },
  { zone: 'Fort Saskatchewan (Industrial Heartland)', distanceKm: 66, sedanBase: 149, suvBase: 169, sedanTotal: 156.45, suvTotal: 177.45, notes: 'Northeast energy plants' },
  { zone: 'Stony Plain', distanceKm: 68, sedanBase: 149, suvBase: 169, sedanTotal: 156.45, suvTotal: 177.45, notes: 'West Parkland County' },
  { zone: 'Camrose', distanceKm: 78, sedanBase: 169, suvBase: 189, sedanTotal: 177.45, suvTotal: 198.45, notes: 'Southeast university city' },
  { zone: 'Red Deer', distanceKm: 124, sedanBase: 266.60, suvBase: 286.60, sedanTotal: 279.93, suvTotal: 300.93, notes: '124 km @ $2.15/km flat rate' },
  { zone: 'Calgary Downtown / YYC', distanceKm: 275, sedanBase: 591.25, suvBase: 611.25, sedanTotal: 620.81, suvTotal: 641.81, notes: '275 km @ $2.15/km flat rate' },
  { zone: 'Jasper National Park', distanceKm: 395, sedanBase: 849.25, suvBase: 869.25, sedanTotal: 891.71, suvTotal: 912.71, notes: '395 km @ $2.15/km flat rate' },
  { zone: 'Banff National Park', distanceKm: 405, sedanBase: 870.75, suvBase: 890.75, sedanTotal: 914.29, suvTotal: 935.29, notes: '405 km @ $2.15/km flat rate' }
];
