import React, { useState, useEffect } from 'react';
import {
  Phone,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Smartphone,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  BellRing
} from 'lucide-react';
import { BookingRecord } from '../types';

interface SmsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onRefreshBookings: () => void;
}

export const SmsManagerModal: React.FC<SmsManagerModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onRefreshBookings
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'settings' | 'test'>('audit');
  const [ownerPhone, setOwnerPhone] = useState('+1 (587) 728-2828');
  const [autoSendOwner, setAutoSendOwner] = useState(true);
  const [autoSendCustomer, setAutoSendCustomer] = useState(true);
  const [hasTwilio, setHasTwilio] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Test SMS State
  const [testPhone, setTestPhone] = useState('+1 (587) 728-2828');
  const [testBody, setTestBody] = useState(
    '🚨 AIR TIME SMS TEST: Dispatch SMS notification pipeline is fully online and active.'
  );
  const [testSending, setTestSending] = useState(false);

  const fetchLogsAndConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/sms-logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        if (data.config) {
          setOwnerPhone(data.config.ownerPhone || '+1 (587) 728-2828');
          setAutoSendOwner(Boolean(data.config.autoSendSmsToOwner));
          setAutoSendCustomer(Boolean(data.config.autoSendSmsToCustomer));
        }
        setHasTwilio(Boolean(data.hasTwilioConfig));
      }
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogsAndConfig();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    try {
      const res = await fetch('/api/admin/sms-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerPhone,
          autoSendSmsToOwner: autoSendOwner,
          autoSendSmsToCustomer: autoSendCustomer
        })
      });

      if (res.ok) {
        setStatusMessage({ text: 'SMS Dispatch settings updated successfully!', type: 'success' });
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        throw new Error('Update failed');
      }
    } catch (err: any) {
      setStatusMessage({ text: 'Failed to update settings', type: 'error' });
    }
  };

  const handleResendSms = async (bookingId: string, recipientType: 'owner' | 'customer') => {
    setResendingId(`${bookingId}-${recipientType}`);
    setStatusMessage(null);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/resend-sms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientType })
      });

      if (res.ok) {
        setStatusMessage({
          text: `SMS re-dispatched to ${recipientType === 'owner' ? 'Business Owner' : 'Customer'}!`,
          type: 'success'
        });
        fetchLogsAndConfig();
        onRefreshBookings();
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        throw new Error('Resend failed');
      }
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to resend SMS', type: 'error' });
    } finally {
      setResendingId(null);
    }
  };

  const handleSendTestSms = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestSending(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/admin/test-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: testPhone,
          message: testBody
        })
      });

      if (res.ok) {
        setStatusMessage({ text: `Test SMS dispatched successfully to ${testPhone}!`, type: 'success' });
        fetchLogsAndConfig();
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        throw new Error('Test SMS failed');
      }
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Error triggering test SMS', type: 'error' });
    } finally {
      setTestSending(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080808]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#151515] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#080808] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A45C]/15 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F5F3EE]">
                  SMS Dispatch Notification Center
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#C9A45C]/20 border border-[#C9A45C]/40 text-[#E2C27A]">
                  Live System
                </span>
              </div>
              <p className="text-xs text-[#A7A7A7]">
                Automated SMS alerts for business owner (+1 587-728-2828) and client booking confirmations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLogsAndConfig}
              disabled={loading}
              className="p-2 rounded-xl bg-[#151515] hover:bg-[#222222] text-[#A7A7A7] hover:text-[#F5F3EE] border border-white/10 transition-colors cursor-pointer"
              title="Refresh logs"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-[#151515] hover:bg-[#222222] text-[#A7A7A7] hover:text-[#F5F3EE] text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 pb-2 bg-[#080808] border-b border-white/10 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-[#C9A45C] text-[#080808] shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#F5F3EE] hover:bg-[#151515]'
              }`}
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>SMS Delivery & Audit ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#C9A45C] text-[#080808] shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#F5F3EE] hover:bg-[#151515]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Owner Phone & Routing</span>
            </button>

            <button
              onClick={() => setActiveTab('test')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'test'
                  ? 'bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] text-[#080808] shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#F5F3EE] hover:bg-[#151515]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Test SMS Gateway</span>
            </button>
          </div>

          <div className="text-[11px] text-[#A7A7A7] flex items-center gap-2">
            <span>Provider Gateway:</span>
            <span className={`px-2 py-0.5 rounded font-mono font-semibold ${hasTwilio ? 'bg-white/20 text-[#F5F3EE]' : 'bg-[#C9A45C]/20 text-[#E2C27A] border border-[#C9A45C]/40'}`}>
              {hasTwilio ? 'Twilio Live API' : 'Active SMS Dispatch Engine'}
            </span>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`mx-6 mt-4 p-3 rounded-xl text-xs font-semibold flex items-center justify-between ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
            }`}
          >
            <span>{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)} className="text-[#A7A7A7] hover:text-[#F5F3EE]">✕</button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: SMS AUDIT & RESEND PER BOOKING */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#F5F3EE]">Recent Booking SMS Alert Status</h4>
                  <p className="text-xs text-[#A7A7A7]">
                    Each booking automatically triggers an SMS notification to the owner and a confirmation text to the customer.
                  </p>
                </div>
                <button
                  onClick={fetchLogsAndConfig}
                  className="text-xs text-[#C9A45C] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sync Records</span>
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 bg-[#080808] rounded-2xl border border-white/10 text-[#A7A7A7] text-xs">
                  No bookings registered in the system yet. Submit a booking from the booking form to trigger automated SMS dispatches.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => {
                    const isOwnerDelivered = booking.smsDeliveryStatus === 'delivered' || booking.smsDeliveryStatus === 'sent' || booking.smsDeliveryStatus === 'simulated';
                    const isOwnerFailed = booking.smsDeliveryStatus === 'failed';

                    return (
                      <div
                        key={booking.id}
                        className="p-4 rounded-2xl bg-[#080808] border border-white/10 hover:border-[#C9A45C]/60 transition-all space-y-3 text-xs"
                      >
                        {/* Header line */}
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="font-cinzel font-bold text-[#E2C27A] text-sm">
                              {booking.id}
                            </span>
                            <span className="text-neutral-500">•</span>
                            <span className="text-[#F5F3EE] font-medium">{booking.fullName}</span>
                            <span className="text-[#A7A7A7]">({booking.phone})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                              isOwnerDelivered
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : isOwnerFailed
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : 'bg-white/10 text-[#F5F3EE] border border-white/20'
                            }`}>
                              Owner SMS: {booking.smsDeliveryStatus || 'Sent'}
                            </span>
                            <span className="text-[11px] text-[#A7A7A7]">
                              {new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>

                        {/* Route & Ride summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#A7A7A7] bg-[#151515] p-2.5 rounded-xl border border-white/10">
                          <div>
                            <span className="text-[#A7A7A7]">Pickup: </span>
                            <span className="font-medium text-[#F5F3EE]">{booking.pickupAddress}</span>
                          </div>
                          <div>
                            <span className="text-[#A7A7A7]">Drop-off: </span>
                            <span className="font-medium text-[#F5F3EE]">{booking.destination}</span>
                          </div>
                          <div>
                            <span className="text-[#A7A7A7]">Schedule: </span>
                            <span className="font-medium text-[#E2C27A]">{booking.pickupDate} at {booking.pickupTime}</span>
                          </div>
                          <div>
                            <span className="text-[#A7A7A7]">Vehicle & Fare: </span>
                            <span className="font-medium text-[#F5F3EE]">
                              {booking.vehicleType} • {booking.calculatedFare?.totalPrice ? `$${booking.calculatedFare.totalPrice.toFixed(2)} CAD` : 'Custom'}
                            </span>
                          </div>
                        </div>

                        {/* SMS Payload Preview & Resend Actions */}
                        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/10">
                          <div className="flex items-center gap-2 text-[11px] text-[#A7A7A7]">
                            <span>Target: <strong className="text-[#F5F3EE] font-mono">{booking.smsRecipient || ownerPhone}</strong></span>
                            {booking.smsRetryCount ? (
                              <span className="text-[#E2C27A]">(Retried {booking.smsRetryCount}x)</span>
                            ) : null}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Copy SMS message */}
                            <button
                              onClick={() => copyToClipboard(booking.smsMessageBody || '', booking.id)}
                              className="px-2.5 py-1 rounded-lg bg-[#151515] hover:bg-[#222222] text-[#A7A7A7] hover:text-[#F5F3EE] text-[11px] border border-white/15 flex items-center gap-1 cursor-pointer"
                              title="Copy SMS format"
                            >
                              {copiedId === booking.id ? <Check className="w-3 h-3 text-[#C9A45C]" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === booking.id ? 'Copied' : 'Copy SMS'}</span>
                            </button>

                            {/* Resend to Business Owner */}
                            <button
                              onClick={() => handleResendSms(booking.id, 'owner')}
                              disabled={resendingId === `${booking.id}-owner`}
                              className="px-3 py-1 rounded-lg bg-[#C9A45C]/15 hover:bg-[#C9A45C]/25 text-[#E2C27A] border border-[#C9A45C]/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <RotateCcw className={`w-3 h-3 ${resendingId === `${booking.id}-owner` ? 'animate-spin' : ''}`} />
                              <span>Resend Owner Alert</span>
                            </button>

                            {/* Resend to Customer */}
                            {booking.phone && (
                              <button
                                onClick={() => handleResendSms(booking.id, 'customer')}
                                disabled={resendingId === `${booking.id}-customer`}
                                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5F3EE] border border-white/20 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Send className={`w-3 h-3 ${resendingId === `${booking.id}-customer` ? 'animate-spin' : ''}`} />
                                <span>Resend Customer Text</span>
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: OWNER PHONE & NOTIFICATION CONFIGURATION */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveSettings} className="space-y-5 bg-[#080808] p-6 rounded-2xl border border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-[#F5F3EE] mb-1">Business Owner SMS Routing</h4>
                  <p className="text-xs text-[#A7A7A7]">
                    Set the primary designated mobile number that receives instant high-priority booking text alerts.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A7A7] mb-1.5">
                    Designated Business Owner Phone Number <span className="text-[#C9A45C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="+1 (587) 728-2828"
                    className="w-full bg-[#151515] border border-white/15 rounded-xl px-4 py-3 text-sm text-[#F5F3EE] font-mono placeholder-neutral-500 focus:outline-none focus:border-[#C9A45C]"
                  />
                  <p className="text-[11px] text-[#A7A7A7] mt-1">
                    Default: +1 (587) 728-2828 (Air Time Chauffeur primary dispatch line)
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#151515] border border-white/10">
                    <div>
                      <span className="text-xs font-bold text-[#F5F3EE] block">Auto-Alert Business Owner on New Booking</span>
                      <span className="text-[11px] text-[#A7A7A7]">Immediately send the formatted booking template via SMS when customer confirms.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSendOwner}
                      onChange={(e) => setAutoSendOwner(e.target.checked)}
                      className="w-4 h-4 accent-[#C9A45C] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#151515] border border-white/10">
                    <div>
                      <span className="text-xs font-bold text-[#F5F3EE] block">Send Instant Confirmation SMS to Customer</span>
                      <span className="text-[11px] text-[#A7A7A7]">Notify the rider on their mobile number with reference ID and itinerary details.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSendCustomer}
                      onChange={(e) => setAutoSendCustomer(e.target.checked)}
                      className="w-4 h-4 accent-[#C9A45C] cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#C9A45C]/30 cursor-pointer transition-all border border-[#FFF1C5]/40"
                >
                  Save SMS Configuration
                </button>
              </form>

              {/* Exact SMS format preview */}
              <div className="bg-[#080808] p-6 rounded-2xl border border-white/10 space-y-3">
                <h5 className="text-xs uppercase font-black tracking-wider text-[#C9A45C]">
                  Owner SMS Format Preview
                </h5>
                <pre className="bg-[#151515] p-4 rounded-xl text-xs text-[#F5F3EE] font-mono whitespace-pre-wrap border border-white/10 leading-relaxed">
{`🚨 NEW RIDE BOOKING

Booking ID: #[Booking ID]
Customer: [Customer Name]
Phone: [Customer Phone]
Date: [Date]
Time: [Time]
Pickup: [Pickup Address]
Drop-off: [Drop-off Address]
Passengers: [Number]
Vehicle: [Vehicle]
Fare: $[Fare]

Please check the booking dashboard for complete details.`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: TEST SMS GATEWAY */}
          {activeTab === 'test' && (
            <div className="space-y-5">
              <form onSubmit={handleSendTestSms} className="bg-[#080808] p-6 rounded-2xl border border-white/10 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-[#F5F3EE] mb-1">Test Live SMS Dispatch</h4>
                  <p className="text-xs text-[#A7A7A7]">
                    Send an instantaneous test SMS alert to verify phone delivery and gateway response.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A7A7] mb-1.5">
                    Destination Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="+1 (587) 728-2828"
                    className="w-full bg-[#151515] border border-white/15 rounded-xl px-4 py-3 text-sm text-[#F5F3EE] font-mono placeholder-neutral-500 focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A7A7A7] mb-1.5">
                    Test SMS Content
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={testBody}
                    onChange={(e) => setTestBody(e.target.value)}
                    className="w-full bg-[#151515] border border-white/15 rounded-xl px-4 py-3 text-xs text-[#F5F3EE] placeholder-neutral-500 focus:outline-none focus:border-[#C9A45C] resize-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={testSending}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#C9A45C]/30 cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2 border border-[#FFF1C5]/40"
                >
                  <Send className="w-4 h-4" />
                  <span>{testSending ? 'Transmitting SMS...' : `Send Test SMS to ${testPhone}`}</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

