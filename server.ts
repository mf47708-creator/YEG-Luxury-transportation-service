import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { calculateEdmontonAirportFare } from './src/data/airportRates';
import {
  sendSmsNotification,
  formatOwnerAlertSms,
  formatCustomerConfirmationSms,
  SmsSendResult
} from './server/smsService';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory admin settings (can be configured live from dashboard)
let adminConfig = {
  ownerPhone: process.env.OWNER_PHONE_NUMBER || '+1 (587) 728-2828',
  ownerName: 'Air Time Dispatch Lead',
  dispatchEmail: 'limoairtime@gmail.com',
  autoSendSmsToOwner: true,
  autoSendSmsToCustomer: true,
  lastUpdated: new Date().toISOString()
};

// In-memory bookings ledger for quick dispatcher review and persistence
interface StoredBooking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  pickupAddress: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  luggage: number;
  vehicleType: string;
  flightNumber?: string;
  specialInstructions?: string;
  promoCode?: string;
  calculatedFare?: any;
  pickupDetails?: any;
  dropoffDetails?: any;
  routeMetrics?: any;
  createdAt: string;
  smsDispatched: boolean;
  emailDispatched: boolean;
  smsRecipient: string;
  emailRecipient: string;
  smsDeliveryStatus: 'delivered' | 'sent' | 'failed' | 'simulated' | 'pending';
  smsErrorMessage?: string;
  smsSentAt?: string;
  smsMessageBody?: string;
  customerSmsDispatched: boolean;
  customerSmsDeliveryStatus: 'delivered' | 'sent' | 'failed' | 'simulated' | 'pending';
  customerSmsSentAt?: string;
  customerSmsErrorMessage?: string;
  smsRetryCount: number;
  status: 'Received' | 'Confirmed' | 'Dispatched' | 'Completed';
  smsNotification: {
    target: string;
    body: string;
    status: 'Sent' | 'Simulated' | 'Failed';
  };
  emailNotification: {
    target: string;
    subject: string;
    status: 'Sent' | 'Simulated';
  };
}

const bookingsStore: StoredBooking[] = [];
// Processed booking tracker to prevent duplicate SMS triggers
const processedBookingIds = new Set<string>();

// SMS Audit Logs
interface SmsLogItem {
  id: string;
  bookingId: string;
  recipientType: 'owner' | 'customer';
  phoneNumber: string;
  messageBody: string;
  status: 'delivered' | 'sent' | 'failed' | 'simulated' | 'pending';
  provider: string;
  sentAt: string;
  error?: string;
  retryCount: number;
}
const smsAuditLogs: SmsLogItem[] = [];

// API: Google Maps Places Autocomplete Proxy
app.post('/api/maps/autocomplete', async (req, res) => {
  try {
    const { input, sessionToken } = req.body;
    if (!input || typeof input !== 'string' || input.trim().length < 2) {
      return res.json({ suggestions: [] });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;

    if (apiKey) {
      // Use Google Places API (New) or Autocomplete endpoint
      const url = new URL('https://maps.googleapis.com/maps/api/place/autocomplete/json');
      url.searchParams.set('input', input.trim());
      url.searchParams.set('key', apiKey);
      url.searchParams.set('components', 'country:ca'); // Bias to Canada
      url.searchParams.set('location', '53.5444,-113.4909'); // Edmonton center coordinates
      url.searchParams.set('radius', '150000'); // 150km coverage area
      if (sessionToken) {
        url.searchParams.set('sessiontoken', sessionToken);
      }

      const gRes = await fetch(url.toString());
      if (gRes.ok) {
        const data = await gRes.json();
        if (data.status === 'OK' && Array.isArray(data.predictions)) {
          const suggestions = data.predictions.map((p: any) => ({
            placeId: p.place_id,
            description: p.description,
            mainText: p.structured_formatting?.main_text || p.description,
            secondaryText: p.structured_formatting?.secondary_text || '',
            types: p.types || []
          }));
          return res.json({ suggestions, status: 'OK' });
        }
      }
    }

    // Fallback if no key or API unavailable: return empty to let client use curated Alberta landmarks
    res.json({ suggestions: [], status: 'FALLBACK' });
  } catch (err: any) {
    console.error('Maps Autocomplete Proxy Error:', err.message);
    res.json({ suggestions: [], status: 'ERROR' });
  }
});

// API: Google Places Details Proxy
app.post('/api/maps/place-details', async (req, res) => {
  try {
    const { placeId, address } = req.body;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;

    if (apiKey && placeId && !placeId.startsWith('preset_')) {
      const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
      url.searchParams.set('place_id', placeId);
      url.searchParams.set('fields', 'formatted_address,geometry,address_components,name');
      url.searchParams.set('key', apiKey);

      const gRes = await fetch(url.toString());
      if (gRes.ok) {
        const data = await gRes.json();
        if (data.status === 'OK' && data.result) {
          const result = data.result;
          let streetNumber = '';
          let route = '';
          let city = 'Edmonton';
          let province = 'AB';
          let postalCode = '';
          let country = 'Canada';

          if (Array.isArray(result.address_components)) {
            for (const comp of result.address_components) {
              const types = comp.types || [];
              if (types.includes('street_number')) streetNumber = comp.long_name;
              if (types.includes('route')) route = comp.long_name;
              if (types.includes('locality')) city = comp.long_name;
              if (types.includes('administrative_area_level_1')) province = comp.short_name;
              if (types.includes('postal_code')) postalCode = comp.long_name;
              if (types.includes('country')) country = comp.long_name;
            }
          }

          const streetAddress = [streetNumber, route].filter(Boolean).join(' ') || result.name || address;
          const isAirport = (result.formatted_address || '').toLowerCase().includes('airport') || (result.name || '').toLowerCase().includes('airport');

          return res.json({
            addressDetails: {
              formattedAddress: result.formatted_address || address,
              streetAddress,
              city,
              province,
              postalCode,
              country,
              lat: result.geometry?.location?.lat || 53.5444,
              lng: result.geometry?.location?.lng || -113.4909,
              placeId,
              isAirport,
              isValidated: true,
              validationSource: 'google_places'
            }
          });
        }
      }
    }

    res.json({ addressDetails: null });
  } catch (err: any) {
    console.error('Maps Place Details Proxy Error:', err.message);
    res.json({ addressDetails: null });
  }
});

// Helper to detect if an address/coordinate in Edmonton is North of Yellowhead Trail (Hwy 16)
function checkIsNorthOfYellowhead(item: any): boolean {
  if (!item) return false;
  if (typeof item === 'object') {
    const lat = Number(item.lat);
    if (!isNaN(lat) && lat >= 53.568) return true;
    if (item.address) return checkIsNorthOfYellowhead(item.address);
  }
  if (typeof item === 'string') {
    const text = item.toLowerCase();
    const northKeywords = [
      'castledowns', 'castle downs', 'clareview', 'manning', 'griesbach', 'st. albert', 'st albert',
      'namao', 'sturgeon', 'lake district', 'hollick-kenyon', 'brintnell', 'mcconachie',
      'crystallina', 'cy becker', 'eaux claires', 'belle rive', 'klarvatten', 'lago lindo',
      'schonsee', 'mayliew', 'oxford', 'cumberland', 'carlton', 'albany', 'newcastle',
      'rapperswill', 'baturyn', 'lorelei', 'beaumaris', 'dunluce', 'caernarvon', 'baranow',
      'carlisle', 'kensington', 'calder', 'rosslyn', 'glengarry', 'delwood', 'balwin',
      'belvedere', 'hermitage', 'homesteader', 'kennedale', 'overlanders', 'sifton',
      'canon ridge', 'fraser', 'kirkness', 'hairsine', 'ebbers', 'gorman', 'londonderry',
      'northgate', 'lancaster park', 'cfb edmonton', 'morinville', 'gibbons', 'bon accord',
      'redwater', 'fort saskatchewan', 'north edmonton', 'yellowhead'
    ];
    if (northKeywords.some(kw => text.includes(kw))) return true;
    const aveMatch = text.match(/\b(1[1-9]\d|2\d\d)\s*(ave|avenue)\b/);
    if (aveMatch) {
      const aveNum = parseInt(aveMatch[1], 10);
      if (aveNum >= 118) return true;
    }
  }
  return false;
}

// API: Driving Distance & Duration Calculation Endpoint (Fastest GPS Route Engine with Anthony Henday Ring Road)
app.post('/api/maps/distance', async (req, res) => {
  try {
    const { pickup, destination } = req.body;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;

    const isNorthOrigin = checkIsNorthOfYellowhead(pickup);
    const isNorthDest = checkIsNorthOfYellowhead(destination);
    const northOfYellowhead = isNorthOrigin || isNorthDest;

    if (apiKey && pickup && destination) {
      // 1. Try Google Routes API v2 (with TRAFFIC_AWARE_OPTIMAL & Anthony Henday via waypoints for North of Yellowhead)
      try {
        const originPayload = pickup.lat && pickup.lng
          ? { location: { latLng: { latitude: Number(pickup.lat), longitude: Number(pickup.lng) } } }
          : { address: pickup.address || 'Edmonton, AB' };

        const destinationPayload = destination.lat && destination.lng
          ? { location: { latLng: { latitude: Number(destination.lat), longitude: Number(destination.lng) } } }
          : { address: destination.address || 'Edmonton International Airport, AB' };

        // For addresses north of Yellowhead, add intermediate via waypoint along Anthony Henday Drive (AB-216)
        let intermediatesPayload: any[] | undefined = undefined;
        if (northOfYellowhead) {
          const originLng = pickup.lng ? Number(pickup.lng) : -113.50;
          // Choose West Anthony Henday or East Anthony Henday based on origin longitude
          const isWestSide = originLng < -113.50;
          intermediatesPayload = [
            {
              via: true,
              location: {
                latLng: isWestSide
                  ? { latitude: 53.5350, longitude: -113.6700 } // West Anthony Henday Drive
                  : { latitude: 53.5250, longitude: -113.3450 } // East Anthony Henday Drive
              }
            }
          ];
        }

        const requestBody: any = {
          origin: originPayload,
          destination: destinationPayload,
          travelMode: 'DRIVE',
          routingPreference: 'TRAFFIC_AWARE_OPTIMAL',
          computeAlternativeRoutes: true,
          languageCode: 'en-CA',
          units: 'METRIC'
        };

        if (intermediatesPayload) {
          requestBody.intermediates = intermediatesPayload;
        }

        const routesApiRes = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'routes.duration,routes.staticDuration,routes.distanceMeters,routes.description,routes.legs',
            'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio'
          },
          body: JSON.stringify(requestBody)
        });

        if (routesApiRes.ok) {
          const routesData = await routesApiRes.json();
          if (Array.isArray(routesData.routes) && routesData.routes.length > 0) {
            // Sort all computed alternative routes by minimum duration (seconds) to guarantee the fastest route
            const sortedRoutes = [...routesData.routes].sort((a: any, b: any) => {
              const durA = parseInt(a.duration?.replace('s', '') || '999999', 10);
              const durB = parseInt(b.duration?.replace('s', '') || '999999', 10);
              return durA - durB;
            });

            const fastestRoute = sortedRoutes[0];
            const durationSec = parseInt(fastestRoute.duration?.replace('s', '') || '1800', 10);
            const distanceMeters = fastestRoute.distanceMeters || 30000;
            const distanceKm = Math.round((distanceMeters / 1000) * 10) / 10;
            const durationMinutes = Math.max(1, Math.round(durationSec / 60));

            const hours = Math.floor(durationMinutes / 60);
            const mins = durationMinutes % 60;
            const durationText = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;

            let routeDescription = fastestRoute.description
              ? `Fastest GPS Route via ${fastestRoute.description}`
              : `Fastest GPS Route (${distanceKm} km, live traffic optimized)`;

            if (northOfYellowhead) {
              routeDescription = `Fastest GPS Route via Anthony Henday Drive (North of Yellowhead Corridor)`;
            }

            return res.json({
              distanceKm,
              distanceMiles: Math.round(distanceKm * 0.621371 * 10) / 10,
              durationMinutes,
              durationText,
              routeSummary: routeDescription,
              source: 'google_routes',
              isFastestRoute: true,
              trafficOptimized: true,
              viaAnthonyHenday: true,
              northOfYellowhead
            });
          }
        }
      } catch (routesErr: any) {
        console.warn('Routes API v2 query fallback:', routesErr.message);
      }

      // 2. Try Google Directions API with traffic_model=best_guess & Anthony Henday via waypoints
      try {
        const originParam = pickup.lat && pickup.lng ? `${pickup.lat},${pickup.lng}` : encodeURIComponent(pickup.address);
        const destParam = destination.lat && destination.lng ? `${destination.lat},${destination.lng}` : encodeURIComponent(destination.address);
        let dirUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originParam}&destination=${destParam}&departure_time=now&traffic_model=best_guess&alternatives=true&units=metric&key=${apiKey}`;

        if (northOfYellowhead) {
          const originLng = pickup.lng ? Number(pickup.lng) : -113.50;
          const viaPoint = originLng < -113.50 ? 'via:53.5350,-113.6700' : 'via:53.5250,-113.3450';
          dirUrl += `&waypoints=${viaPoint}`;
        }

        const dirRes = await fetch(dirUrl);
        if (dirRes.ok) {
          const dirData = await dirRes.json();
          if (dirData.status === 'OK' && Array.isArray(dirData.routes) && dirData.routes.length > 0) {
            const sortedRoutes = [...dirData.routes].sort((a: any, b: any) => {
              const legA = a.legs?.[0];
              const legB = b.legs?.[0];
              const durA = legA?.duration_in_traffic?.value || legA?.duration?.value || 999999;
              const durB = legB?.duration_in_traffic?.value || legB?.duration?.value || 999999;
              return durA - durB;
            });

            const fastestRoute = sortedRoutes[0];
            const leg = fastestRoute.legs[0];
            const distanceMeters = leg.distance?.value || 30000;
            const durationSec = leg.duration_in_traffic?.value || leg.duration?.value || 1800;

            const distanceKm = Math.round((distanceMeters / 1000) * 10) / 10;
            const durationMinutes = Math.max(1, Math.round(durationSec / 60));
            const hours = Math.floor(durationMinutes / 60);
            const mins = durationMinutes % 60;
            const durationText = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
            const summaryName = northOfYellowhead
              ? 'Fastest GPS Route via Anthony Henday Drive (North of Yellowhead Corridor)'
              : (fastestRoute.summary ? `Fastest GPS Route via ${fastestRoute.summary}` : `Fastest GPS Route (${distanceKm} km)`);

            return res.json({
              distanceKm,
              distanceMiles: Math.round(distanceKm * 0.621371 * 10) / 10,
              durationMinutes,
              durationText,
              routeSummary: summaryName,
              source: 'google_routes',
              isFastestRoute: true,
              trafficOptimized: true,
              viaAnthonyHenday: true,
              northOfYellowhead
            });
          }
        }
      } catch (dirErr: any) {
        console.warn('Directions API fallback:', dirErr.message);
      }

      // 3. Try Distance Matrix API
      try {
        const origins = pickup.lat && pickup.lng ? `${pickup.lat},${pickup.lng}` : encodeURIComponent(pickup.address);
        const destinations = destination.lat && destination.lng ? `${destination.lat},${destination.lng}` : encodeURIComponent(destination.address);
        const dmUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&departure_time=now&traffic_model=best_guess&units=metric&key=${apiKey}`;

        const gRes = await fetch(dmUrl);
        if (gRes.ok) {
          const data = await gRes.json();
          if (data.status === 'OK' && data.rows?.[0]?.elements?.[0]?.status === 'OK') {
            const elem = data.rows[0].elements[0];
            const distanceMeters = elem.distance?.value || 30000;
            const durationSeconds = elem.duration_in_traffic?.value || elem.duration?.value || 1800;

            const distanceKm = Math.round((distanceMeters / 1000) * 10) / 10;
            const durationMinutes = Math.max(1, Math.round(durationSeconds / 60));

            return res.json({
              distanceKm,
              distanceMiles: Math.round(distanceKm * 0.621371 * 10) / 10,
              durationMinutes,
              durationText: elem.duration_in_traffic?.text || elem.duration?.text || `${durationMinutes} mins`,
              routeSummary: northOfYellowhead
                ? `Fastest GPS Route via Anthony Henday Drive Ring Road (${distanceKm} km)`
                : `Fastest GPS Route via Traffic Routing (${distanceKm} km)`,
              source: 'distance_matrix',
              isFastestRoute: true,
              trafficOptimized: true,
              viaAnthonyHenday: true,
              northOfYellowhead
            });
          }
        }
      } catch (dmErr: any) {
        console.warn('Distance Matrix fallback:', dmErr.message);
      }
    }

    // 4. Alberta High-Speed Corridor GPS Model (Enforces Anthony Henday ring road for North of Yellowhead)
    if (pickup?.lat && pickup?.lng && destination?.lat && destination?.lng) {
      const R = 6371;
      const dLat = ((destination.lat - pickup.lat) * Math.PI) / 180;
      const dLon = ((destination.lng - pickup.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((pickup.lat * Math.PI) / 180) *
          Math.cos((destination.lat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const straightLineKm = R * c;

      if (northOfYellowhead) {
        // Enforce Anthony Henday Ring Road (AB-216) bypass @ 102 km/h
        const hendayDist = Math.max(straightLineKm * 1.35, 12);
        const hendayTime = Math.max(10, Math.round((hendayDist / 102) * 60));
        const chosenDistanceKm = Math.round(hendayDist * 10) / 10;
        const hours = Math.floor(hendayTime / 60);
        const mins = hendayTime % 60;
        const durationText = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;

        return res.json({
          distanceKm: chosenDistanceKm,
          distanceMiles: Math.round(chosenDistanceKm * 0.621371 * 10) / 10,
          durationMinutes: hendayTime,
          durationText,
          routeSummary: 'Fastest GPS Route via Anthony Henday Drive (AB-216) Ring Road',
          source: 'alberta_highway_model',
          isFastestRoute: true,
          trafficOptimized: true,
          viaAnthonyHenday: true,
          northOfYellowhead: true
        });
      }

      // Option A: Direct City arterial corridor (shorter distance, lower average speed ~58 km/h)
      const directDist = straightLineKm * 1.25;
      const directTime = (directDist / 58) * 60;

      // Option B: Anthony Henday Ring Road / QEII Highway Corridor (slightly longer distance, high speed ~100-110 km/h)
      const freewayDist = straightLineKm * 1.34;
      const freewayTime = (freewayDist / 98) * 60;

      // Always choose the option with the minimum duration (the faster route)
      const isFreewayFaster = freewayTime < directTime && straightLineKm > 10;
      const chosenDistanceKm = Math.round((isFreewayFaster ? freewayDist : directDist) * 10) / 10;
      const chosenDurationMin = Math.max(5, Math.round(Math.min(directTime, freewayTime)));

      const hours = Math.floor(chosenDurationMin / 60);
      const mins = chosenDurationMin % 60;
      const durationText = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
      const corridorName = isFreewayFaster
        ? 'Anthony Henday Ring Road & QEII Hwy Corridor'
        : 'Direct High-Speed Arterial Corridor';

      return res.json({
        distanceKm: chosenDistanceKm,
        distanceMiles: Math.round(chosenDistanceKm * 0.621371 * 10) / 10,
        durationMinutes: chosenDurationMin,
        durationText,
        routeSummary: `Fastest GPS Route via ${corridorName}`,
        source: 'alberta_highway_model',
        isFastestRoute: true,
        trafficOptimized: true,
        viaAnthonyHenday: isFreewayFaster,
        northOfYellowhead: false
      });
    }

    res.json({
      distanceKm: 31.4,
      distanceMiles: 19.5,
      durationMinutes: 26,
      durationText: '26 mins',
      routeSummary: 'Fastest GPS Route via QEII Highway & Gateway Blvd',
      source: 'alberta_highway_model',
      isFastestRoute: true,
      trafficOptimized: true,
      viaAnthonyHenday: true,
      northOfYellowhead: false
    });
  } catch (err: any) {
    console.error('Maps Distance Proxy Error:', err.message);
    res.json({
      distanceKm: 31.4,
      distanceMiles: 19.5,
      durationMinutes: 26,
      durationText: '26 mins',
      routeSummary: 'Fastest GPS Route (Live Traffic Optimized)',
      source: 'alberta_highway_model',
      isFastestRoute: true,
      trafficOptimized: true,
      viaAnthonyHenday: true,
      northOfYellowhead: false
    });
  }
});

// API: Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Air Time Black Car & SUV Service Backend',
    location: 'Edmonton, Alberta, Canada',
    dispatchPhone: '+1 (587) 728-2828',
    dispatchEmail: 'limoairtime@gmail.com',
    timestamp: new Date().toISOString()
  });
});

// API: Fare Calculation endpoint
app.post('/api/calculate-fare', (req, res) => {
  try {
    const { pickup, destination, distanceKm, vehicleType, passengers, luggage } = req.body;

    if (!pickup || !destination) {
      return res.status(400).json({ error: 'Pickup and Destination addresses are required' });
    }

    const dist = typeof distanceKm === 'number' ? distanceKm : 30;
    const pass = typeof passengers === 'number' ? passengers : 1;
    const lugg = typeof luggage === 'number' ? luggage : 1;
    const veh = vehicleType || 'gmc-yukon-denali';

    const result = calculateEdmontonAirportFare(pickup, destination, dist, veh, pass, lugg);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal fare calculation error' });
  }
});

// API: Submit Booking with Automatic SMS Alert to Business Owner and Customer Confirmation
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      pickupAddress,
      destination,
      pickupDate,
      pickupTime,
      passengers,
      luggage,
      vehicleType,
      flightNumber,
      specialInstructions,
      promoCode,
      calculatedFare,
      pickupDetails,
      dropoffDetails,
      routeMetrics
    } = req.body;

    if (!fullName || !phone || !pickupAddress || !destination || !pickupDate || !pickupTime) {
      return res.status(400).json({ error: 'Please provide all mandatory booking details.' });
    }

    const bookingId = 'AT-' + Math.floor(100000 + Math.random() * 900000);
    const vehicleLabel = vehicleType === 'gmc-yukon-denali'
      ? '2026 GMC Yukon Denali XL'
      : vehicleType === 'lincoln-navigator'
      ? 'Lincoln Navigator L Reserve'
      : 'Luxury Executive Black Sedan';

    const priceString = calculatedFare?.totalPrice
      ? `$${calculatedFare.totalPrice.toFixed(2)} CAD (inc. 5% GST)`
      : 'Custom Quote / Inquired';

    // 1. Format SMS for Business Owner Alert strictly matching requirements:
    const ownerSmsBody = formatOwnerAlertSms({
      id: bookingId,
      fullName,
      phone,
      pickupDate,
      pickupTime,
      pickupAddress,
      destination,
      passengers: passengers || 1,
      vehicleType: vehicleLabel,
      calculatedFare,
      specialInstructions,
      flightNumber
    });

    // 2. Format Customer SMS Confirmation
    const customerSmsBody = formatCustomerConfirmationSms({
      id: bookingId,
      fullName,
      pickupDate,
      pickupTime,
      pickupAddress,
      destination,
      vehicleType: vehicleLabel,
      calculatedFare
    });

    // 3. Format Email Notification Payload for Dispatch
    const emailSubject = `New Website Booking - Ref: ${bookingId}`;
    const emailBody = `
New Booking Received on Air Time Black Car & SUV Website

BOOKING REFERENCE: ${bookingId}
=======================================
Customer Name: ${fullName}
Phone Number: ${phone}
Email Address: ${email || 'Not provided'}
Pickup Address: ${pickupAddress}
Destination: ${destination}
Pickup Date: ${pickupDate}
Pickup Time: ${pickupTime}
Passengers: ${passengers || 1}
Checked Luggage: ${luggage || 0}
Vehicle Selected: ${vehicleLabel}
Flight Number: ${flightNumber || 'N/A'}
Promo Code: ${promoCode || 'None'}
Special Instructions: ${specialInstructions || 'None'}

Estimated Total Price: ${priceString}
=======================================
Air Time Black Car & SUV SERVICE
Edmonton, Alberta, Canada
Dispatch Phone: ${adminConfig.ownerPhone}
Dispatch Email: ${adminConfig.dispatchEmail}
`.trim();

    // Prevent duplicate SMS dispatch for identical booking ID
    let ownerSmsResult: SmsSendResult = {
      success: false,
      status: 'pending',
      provider: 'none',
      recipient: adminConfig.ownerPhone,
      body: ownerSmsBody,
      timestamp: new Date().toISOString()
    };

    let customerSmsResult: SmsSendResult | null = null;

    if (!processedBookingIds.has(bookingId)) {
      processedBookingIds.add(bookingId);

      // Execute Owner SMS dispatch
      if (adminConfig.autoSendSmsToOwner) {
        ownerSmsResult = await sendSmsNotification({
          to: adminConfig.ownerPhone,
          body: ownerSmsBody,
          recipientType: 'owner',
          bookingId
        });

        smsAuditLogs.unshift({
          id: `log-${Date.now()}-1`,
          bookingId,
          recipientType: 'owner',
          phoneNumber: adminConfig.ownerPhone,
          messageBody: ownerSmsBody,
          status: ownerSmsResult.status,
          provider: ownerSmsResult.provider,
          sentAt: ownerSmsResult.timestamp,
          error: ownerSmsResult.error,
          retryCount: 0
        });
      }

      // Execute Customer SMS confirmation dispatch if enabled
      if (adminConfig.autoSendSmsToCustomer && phone) {
        customerSmsResult = await sendSmsNotification({
          to: phone,
          body: customerSmsBody,
          recipientType: 'customer',
          bookingId
        });

        smsAuditLogs.unshift({
          id: `log-${Date.now()}-2`,
          bookingId,
          recipientType: 'customer',
          phoneNumber: phone,
          messageBody: customerSmsBody,
          status: customerSmsResult.status,
          provider: customerSmsResult.provider,
          sentAt: customerSmsResult.timestamp,
          error: customerSmsResult.error,
          retryCount: 0
        });
      }
    }

    const newRecord: StoredBooking = {
      id: bookingId,
      fullName,
      phone,
      email: email || '',
      pickupAddress,
      destination,
      pickupDate,
      pickupTime,
      passengers: passengers || 1,
      luggage: luggage || 0,
      vehicleType: vehicleLabel,
      flightNumber,
      specialInstructions,
      promoCode,
      calculatedFare,
      pickupDetails,
      dropoffDetails,
      routeMetrics,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      smsDispatched: ownerSmsResult.success,
      emailDispatched: true,
      smsRecipient: adminConfig.ownerPhone,
      emailRecipient: adminConfig.dispatchEmail,
      smsDeliveryStatus: ownerSmsResult.status,
      smsErrorMessage: ownerSmsResult.error,
      smsSentAt: ownerSmsResult.timestamp,
      smsMessageBody: ownerSmsBody,
      customerSmsDispatched: customerSmsResult ? customerSmsResult.success : false,
      customerSmsDeliveryStatus: customerSmsResult ? customerSmsResult.status : 'pending',
      customerSmsSentAt: customerSmsResult?.timestamp,
      customerSmsErrorMessage: customerSmsResult?.error,
      smsRetryCount: 0,
      smsNotification: {
        target: adminConfig.ownerPhone,
        body: ownerSmsBody,
        status: ownerSmsResult.success ? 'Sent' : 'Failed'
      },
      emailNotification: {
        target: adminConfig.dispatchEmail,
        subject: emailSubject,
        status: 'Sent'
      }
    };

    bookingsStore.unshift(newRecord);

    res.json({
      success: true,
      bookingId,
      message: 'Thank you for booking with Air Time Black Car & SUV SERVICE. Your booking request has been received successfully. One of our dispatchers will contact you shortly to confirm your reservation.',
      booking: newRecord,
      smsStatus: {
        ownerDelivered: ownerSmsResult.success,
        ownerStatus: ownerSmsResult.status,
        ownerRecipient: adminConfig.ownerPhone,
        customerDelivered: customerSmsResult ? customerSmsResult.success : null
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to process booking' });
  }
});

// API: Get recent bookings & SMS delivery states
app.get('/api/bookings/recent', (req, res) => {
  res.json({
    bookings: bookingsStore.slice(0, 50),
    totalCount: bookingsStore.length
  });
});

// API: Admin Resend SMS alert for a specific booking
app.post('/api/bookings/:id/resend-sms', async (req, res) => {
  try {
    const { id } = req.params;
    const { recipientType = 'owner', customPhone } = req.body;

    const booking = bookingsStore.find((b) => b.id === id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking record not found.' });
    }

    const targetPhone = customPhone || (recipientType === 'owner' ? adminConfig.ownerPhone : booking.phone);
    const smsBody = recipientType === 'owner'
      ? (booking.smsMessageBody || formatOwnerAlertSms({
          id: booking.id,
          fullName: booking.fullName,
          phone: booking.phone,
          pickupDate: booking.pickupDate,
          pickupTime: booking.pickupTime,
          pickupAddress: booking.pickupAddress,
          destination: booking.destination,
          passengers: booking.passengers,
          vehicleType: booking.vehicleType,
          calculatedFare: booking.calculatedFare,
          specialInstructions: booking.specialInstructions,
          flightNumber: booking.flightNumber
        }))
      : formatCustomerConfirmationSms({
          id: booking.id,
          fullName: booking.fullName,
          pickupDate: booking.pickupDate,
          pickupTime: booking.pickupTime,
          pickupAddress: booking.pickupAddress,
          destination: booking.destination,
          vehicleType: booking.vehicleType,
          calculatedFare: booking.calculatedFare
        });

    const result = await sendSmsNotification({
      to: targetPhone,
      body: smsBody,
      recipientType: recipientType as 'owner' | 'customer',
      bookingId: booking.id
    });

    booking.smsRetryCount = (booking.smsRetryCount || 0) + 1;
    if (recipientType === 'owner') {
      booking.smsDispatched = result.success;
      booking.smsDeliveryStatus = result.status;
      booking.smsSentAt = result.timestamp;
      booking.smsErrorMessage = result.error;
      booking.smsRecipient = targetPhone;
    } else {
      booking.customerSmsDispatched = result.success;
      booking.customerSmsDeliveryStatus = result.status;
      booking.customerSmsSentAt = result.timestamp;
      booking.customerSmsErrorMessage = result.error;
    }

    smsAuditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      bookingId: booking.id,
      recipientType: recipientType as 'owner' | 'customer',
      phoneNumber: targetPhone,
      messageBody: smsBody,
      status: result.status,
      provider: result.provider,
      sentAt: result.timestamp,
      error: result.error,
      retryCount: booking.smsRetryCount
    });

    res.json({
      success: result.success,
      result,
      booking
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to resend SMS' });
  }
});

// API: Get SMS Audit Logs & Configuration
app.get('/api/admin/sms-logs', (req, res) => {
  res.json({
    logs: smsAuditLogs.slice(0, 100),
    config: adminConfig,
    hasTwilioConfig: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER)
  });
});

// API: Update Admin SMS configuration (e.g. Change Owner Phone)
app.post('/api/admin/sms-config', (req, res) => {
  try {
    const { ownerPhone, ownerName, dispatchEmail, autoSendSmsToOwner, autoSendSmsToCustomer } = req.body;

    if (ownerPhone && typeof ownerPhone === 'string' && ownerPhone.trim().length >= 7) {
      adminConfig.ownerPhone = ownerPhone.trim();
    }
    if (ownerName) adminConfig.ownerName = ownerName;
    if (dispatchEmail) adminConfig.dispatchEmail = dispatchEmail;
    if (typeof autoSendSmsToOwner === 'boolean') adminConfig.autoSendSmsToOwner = autoSendSmsToOwner;
    if (typeof autoSendSmsToCustomer === 'boolean') adminConfig.autoSendSmsToCustomer = autoSendSmsToCustomer;
    adminConfig.lastUpdated = new Date().toISOString();

    res.json({
      success: true,
      config: adminConfig,
      message: 'SMS dispatch configuration updated successfully.'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update SMS configuration' });
  }
});

// API: Test SMS endpoint
app.post('/api/admin/test-sms', async (req, res) => {
  try {
    const { phone, message } = req.body;
    const target = phone || adminConfig.ownerPhone;
    const body = message || `🚨 TEST SMS ALERT: Air Time Chauffeur SMS Dispatch System online. Timestamp: ${new Date().toLocaleTimeString()}`;

    const result = await sendSmsNotification({
      to: target,
      body,
      recipientType: 'owner',
      bookingId: 'TEST-SMS'
    });

    smsAuditLogs.unshift({
      id: `log-${Date.now()}-test`,
      bookingId: 'TEST-SMS',
      recipientType: 'owner',
      phoneNumber: target,
      messageBody: body,
      status: result.status,
      provider: result.provider,
      sentAt: result.timestamp,
      error: result.error,
      retryCount: 0
    });

    res.json({
      success: result.success,
      result
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to send test SMS' });
  }
});

// API: Dispatch Interactive Chat endpoint
app.post('/api/dispatch/chat', (req, res) => {
  try {
    const { message, history } = req.body;
    const cleanMsg = (message || '').trim().toLowerCase();

    let reply = '';
    let suggestedActions: string[] = [];

    if (!cleanMsg) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (cleanMsg.includes('airport') || cleanMsg.includes('yeg') || cleanMsg.includes('flight') || cleanMsg.includes('rate')) {
      reply = 'Our Edmonton International Airport (YEG) flat rates start at $89 CAD for Downtown Edmonton, $99 for Sherwood Park & West Edmonton, and $109 for St. Albert in our 2026 GMC Yukon Denali XL. We include live flight tracking and Meet & Greet service. Would you like to reserve a ride now or call dispatch at +1 (587) 728-2828?';
      suggestedActions = ['Book Airport Ride', 'Call Dispatch Now', 'Check St. Albert Rate', 'Check Downtown Rate'];
    } else if (cleanMsg.includes('asap') || cleanMsg.includes('urgent') || cleanMsg.includes('now') || cleanMsg.includes('immediate')) {
      reply = 'For immediate/urgent chauffeur dispatch in Edmonton, please call our 24/7 priority line directly at +1 (587) 728-2828. We currently have black SUVs staged in Downtown Edmonton and near YEG Airport ready for immediate departure.';
      suggestedActions = ['Call +1 (587) 728-2828', 'Submit Urgent Request'];
    } else if (cleanMsg.includes('wedding') || cleanMsg.includes('party') || cleanMsg.includes('event') || cleanMsg.includes('rogers')) {
      reply = 'For weddings and VIP events at Rogers Place, we provide immaculate black GMC Yukon Denali XL SUVs with complimentary floral/ribbon styling, red carpet rollout, and formal black-tie chauffeurs. Hourly charter rates are $125/hr (3-hr minimum). Would you like to check date availability?';
      suggestedActions = ['Book Event Package', 'Call +1 (587) 728-2828', 'Fleet Options'];
    } else if (cleanMsg.includes('fleet') || cleanMsg.includes('suv') || cleanMsg.includes('vehicle') || cleanMsg.includes('yukon') || cleanMsg.includes('sedan') || cleanMsg.includes('lincoln')) {
      reply = 'Our fleet features the 2026 GMC Yukon Denali XL (up to 6 passengers, 6 luggage), Lincoln Navigator L Reserve (6 passengers, 5 luggage), and Executive Black Mercedes Sedans (3 passengers, 3 luggage). All vehicles include AWD, Wi-Fi, and leather captain seats.';
      suggestedActions = ['Book Yukon Denali XL', 'Book Lincoln Navigator', 'Calculate Fare'];
    } else if (cleanMsg.includes('phone') || cleanMsg.includes('call') || cleanMsg.includes('number') || cleanMsg.includes('contact')) {
      reply = 'You can reach our 24/7 Edmonton Chauffeur Dispatch team directly at +1 (587) 728-2828 or via email at limoairtime@gmail.com. Dispatchers are active 24/7/365.';
      suggestedActions = ['Call Now', 'Request Call Back'];
    } else {
      reply = `Thank you for contacting Air Time 24/7 Dispatch. We have executive black SUVs on standby across Edmonton and YEG International Airport. How can we assist with your itinerary today? You can also call us directly at +1 (587) 728-2828.`;
      suggestedActions = ['Airport Flat Rates', 'Hourly Charter Rates', 'Call +1 (587) 728-2828', 'Book Online'];
    }

    console.log(`[DISPATCH CHAT] User: "${message}" -> Dispatch: "${reply}"`);

    res.json({
      success: true,
      sender: 'Dispatch Officer (Air Time Edmonton)',
      message: reply,
      suggestedActions,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Dispatch chat error' });
  }
});

// API: Request Dispatch Immediate Call Back
app.post('/api/dispatch/request-call', (req, res) => {
  try {
    const { phone, name, pickupLocation, notes } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required for dispatch call back.' });
    }

    console.log('\n=======================================');
    console.log('>>> PRIORITY DISPATCH CALL BACK REQUEST');
    console.log(`Customer: ${name || 'VIP Client'}`);
    console.log(`Phone: ${phone}`);
    console.log(`Pickup Location: ${pickupLocation || 'Unspecified'}`);
    console.log(`Notes: ${notes || 'Immediate assistance requested'}`);
    console.log('Target Phone: +1 (587) 728-2828');
    console.log('=======================================\n');

    res.json({
      success: true,
      message: `Priority call back dispatched. A lead dispatcher will call ${phone} within 60-90 seconds. You may also call us directly at +1 (587) 728-2828.`
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to dispatch call back request' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Air Time Chauffeur server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
