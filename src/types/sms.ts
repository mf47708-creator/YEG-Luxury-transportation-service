export interface AdminSettings {
  ownerPhone: string;
  ownerName: string;
  dispatchEmail: string;
  autoSendSmsToOwner: boolean;
  autoSendSmsToCustomer: boolean;
  smsProvider: 'twilio' | 'telnyx' | 'simulated';
  hasCustomCredentials: boolean;
  lastUpdated: string;
}

export interface SmsNotificationLog {
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
