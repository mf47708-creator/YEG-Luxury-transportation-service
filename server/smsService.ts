// Helper service for sending SMS notifications via Twilio REST API with graceful simulation & audit fallback
import dotenv from 'dotenv';
dotenv.config();

export interface SendSmsParams {
  to: string;
  body: string;
  recipientType?: 'owner' | 'customer';
  bookingId?: string;
}

export interface SmsSendResult {
  success: boolean;
  messageId?: string;
  status: 'delivered' | 'sent' | 'failed' | 'simulated' | 'pending';
  provider: string;
  recipient: string;
  body: string;
  timestamp: string;
  error?: string;
}

export async function sendSmsNotification({
  to,
  body,
  recipientType = 'owner',
  bookingId
}: SendSmsParams): Promise<SmsSendResult> {
  const timestamp = new Date().toISOString();
  const cleanPhone = to.trim();

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;

  // If real Twilio credentials are configured, execute actual Twilio REST API request
  if (accountSid && authToken && fromPhone) {
    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');

      const formData = new URLSearchParams();
      formData.append('To', cleanPhone);
      formData.append('From', fromPhone);
      formData.append('Body', body);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`[SMS SUCCESS - Twilio API] Dispatched to ${cleanPhone} for booking ${bookingId || 'N/A'}. SID: ${data.sid}`);
        return {
          success: true,
          messageId: data.sid,
          status: 'sent',
          provider: 'twilio_live',
          recipient: cleanPhone,
          body,
          timestamp
        };
      } else {
        const errorMsg = data.message || `Twilio HTTP Error ${response.status}`;
        console.error(`[SMS FAILED - Twilio API] ${errorMsg} (Code: ${data.code})`);
        return {
          success: false,
          status: 'failed',
          provider: 'twilio_live',
          recipient: cleanPhone,
          body,
          timestamp,
          error: errorMsg
        };
      }
    } catch (networkErr: any) {
      console.error(`[SMS NETWORK ERROR]`, networkErr);
      return {
        success: false,
        status: 'failed',
        provider: 'twilio_live',
        recipient: cleanPhone,
        body,
        timestamp,
        error: networkErr.message || 'Network error connecting to SMS provider'
      };
    }
  }

  // Graceful active simulator mode when Twilio credentials are not yet entered in environment variables
  console.log(`\n======================================================`);
  console.log(`📱 [SMS NOTIFICATION DISPATCHED - ${recipientType.toUpperCase()}]`);
  console.log(`To: ${cleanPhone}`);
  console.log(`Booking Ref: ${bookingId || 'N/A'}`);
  console.log(`Time: ${timestamp}`);
  console.log(`------------------------------------------------------`);
  console.log(body);
  console.log(`======================================================\n`);

  const mockSid = `SM${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

  return {
    success: true,
    messageId: mockSid,
    status: 'simulated',
    provider: 'simulated_active_gateway',
    recipient: cleanPhone,
    body,
    timestamp
  };
}

export function formatOwnerAlertSms(booking: {
  id: string;
  fullName: string;
  phone: string;
  pickupDate: string;
  pickupTime: string;
  pickupAddress: string;
  destination: string;
  passengers: number;
  vehicleType: string;
  calculatedFare?: any;
  specialInstructions?: string;
  flightNumber?: string;
}): string {
  const fareString = booking.calculatedFare?.totalPrice
    ? `$${booking.calculatedFare.totalPrice.toFixed(2)} CAD`
    : 'Custom Chauffeur Quote';

  const lines = [
    '🚨 NEW RIDE BOOKING',
    '',
    `Booking ID: #${booking.id}`,
    `Customer: ${booking.fullName}`,
    `Phone: ${booking.phone}`,
    `Date: ${booking.pickupDate}`,
    `Time: ${booking.pickupTime}`,
    `Pickup: ${booking.pickupAddress}`,
    `Drop-off: ${booking.destination}`,
    `Passengers: ${booking.passengers || 1}`,
    `Vehicle: ${booking.vehicleType}`,
    `Fare: ${fareString}`
  ];

  if (booking.flightNumber && booking.flightNumber.trim()) {
    lines.push(`Flight: ${booking.flightNumber.trim()}`);
  }

  if (booking.specialInstructions && booking.specialInstructions.trim()) {
    lines.push(`Notes: ${booking.specialInstructions.trim()}`);
  }

  lines.push('');
  lines.push('Please check the booking dashboard for complete details.');

  return lines.join('\n');
}

export function formatCustomerConfirmationSms(booking: {
  id: string;
  fullName: string;
  pickupDate: string;
  pickupTime: string;
  pickupAddress: string;
  destination: string;
  vehicleType: string;
  calculatedFare?: any;
}): string {
  const fareString = booking.calculatedFare?.totalPrice
    ? `$${booking.calculatedFare.totalPrice.toFixed(2)} CAD`
    : 'Confirmed via Dispatch';

  return [
    `✨ AIR TIME CHAUFFEUR CONFIRMATION`,
    ``,
    `Dear ${booking.fullName}, thank you for booking with Air Time Black Car & SUV SERVICE.`,
    ``,
    `Booking ID: #${booking.id}`,
    `Date & Time: ${booking.pickupDate} at ${booking.pickupTime}`,
    `Pickup: ${booking.pickupAddress}`,
    `Drop-off: ${booking.destination}`,
    `Vehicle: ${booking.vehicleType}`,
    `Estimated Fare: ${fareString}`,
    ``,
    `Your dedicated dispatcher will confirm vehicle assignment. Need immediate help? Call +1 (587) 728-2828.`
  ].join('\n');
}
