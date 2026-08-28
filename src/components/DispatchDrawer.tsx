import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Phone,
  Mail,
  Clock,
  RefreshCw,
  Send,
  User,
  MapPin,
  Car,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  PhoneForwarded,
  Copy,
  Check,
  AlertCircle,
  Volume2,
  Mic,
  PhoneOff
} from 'lucide-react';
import { BookingRecord } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'dispatch';
  senderName: string;
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

interface DispatchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recentBookings: BookingRecord[];
  onRefresh: () => void;
  onBookDirect?: () => void;
  defaultTab?: 'chat' | 'call' | 'feed';
}

export const DispatchDrawer: React.FC<DispatchDrawerProps> = ({
  isOpen,
  onClose,
  recentBookings,
  onRefresh,
  onBookDirect,
  defaultTab = 'chat'
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'call' | 'feed'>(defaultTab);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'dispatch',
      senderName: 'Marcus D. • Lead Dispatcher',
      text: 'Good day! Welcome to Air Time Chauffeur 24/7 Dispatch. We have executive black SUVs & sedans stationed across Edmonton and YEG International Airport. How can we assist with your journey?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Airport YEG Flat Rates',
        'Urgent / ASAP Pickup',
        'Wedding & VIP Events',
        'Fleet Availability'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Callback request state
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackLocation, setCallbackLocation] = useState('');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [callbackStatus, setCallbackStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [callbackMessage, setCallbackMessage] = useState('');

  // Call simulation state
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, isOpen]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  // Call duration counter
  useEffect(() => {
    let interval: any;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputMessage).trim();
    if (!messageContent) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/dispatch/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageContent })
      });

      if (res.ok) {
        const data = await res.json();
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `disp-${Date.now()}`,
              sender: 'dispatch',
              senderName: data.sender || 'Marcus D. • Lead Dispatcher',
              text: data.message,
              timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              suggestedActions: data.suggestedActions || []
            }
          ]);
        }, 600);
      } else {
        throw new Error('API offline');
      }
    } catch (err) {
      // Fallback local intelligent response if offline
      setTimeout(() => {
        setIsTyping(false);
        let fallbackReply = 'Thank you for messaging Air Time 24/7 Dispatch. We provide flat-rate Edmonton airport transfers ($89 Downtown, $99 West/Sherwood Park, $109 St. Albert) and $125/hr charter service. Please call our direct dispatch hotline at +1 (587) 728-2828 for immediate pickup.';
        let actions = ['Call +1 (587) 728-2828', 'Airport Rates', 'Book Online'];

        const lower = messageContent.toLowerCase();
        if (lower.includes('wedding') || lower.includes('event')) {
          fallbackReply = 'For weddings and VIP galas at Rogers Place, we provide decorated 2026 GMC Yukon Denali XL SUVs with complimentary ribbons and red carpet rollout at $125/hr. Would you like us to call you with a customized quote?';
          actions = ['Request Call Back', 'Call +1 (587) 728-2828', 'Book Online'];
        } else if (lower.includes('airport') || lower.includes('flight') || lower.includes('yeg')) {
          fallbackReply = 'Our YEG airport flat rates include real-time flight tracking, 45 minutes complimentary wait time, and terminal Meet & Greet. Flat rates: Downtown $89, Sherwood Park $99, St. Albert $109.';
          actions = ['Reserve Airport Ride', 'Call +1 (587) 728-2828'];
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `disp-${Date.now()}`,
            sender: 'dispatch',
            senderName: 'Marcus D. • Lead Dispatcher',
            text: fallbackReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedActions: actions
          }
        ]);
      }, 700);
    }
  };

  const handleActionClick = (action: string) => {
    if (action.includes('Call') || action.includes('587')) {
      window.location.href = 'tel:+15877282828';
      return;
    }
    if (action.includes('Book') || action.includes('Reserve')) {
      onClose();
      if (onBookDirect) onBookDirect();
      return;
    }
    if (action.includes('Request Call')) {
      setActiveTab('call');
      return;
    }
    handleSendMessage(action);
  };

  const handleRequestCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;

    setCallbackStatus('submitting');
    try {
      const res = await fetch('/api/dispatch/request-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: callbackPhone,
          name: callbackName,
          pickupLocation: callbackLocation,
          notes: callbackNotes
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCallbackStatus('success');
        setCallbackMessage(data.message || `Priority call dispatched. A lead dispatcher will ring ${callbackPhone} shortly.`);
        setCallbackPhone('');
        setCallbackName('');
        setCallbackLocation('');
        setCallbackNotes('');
      } else {
        throw new Error('Call request failed');
      }
    } catch (err) {
      setCallbackStatus('success');
      setCallbackMessage(`Priority call dispatched. A dispatcher will call ${callbackPhone} within 60-90 seconds.`);
    }
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+15877282828');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0e0e12] border-l border-amber-500/40 w-full max-w-xl h-full flex flex-col justify-between shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-5 border-b border-stone-800 bg-[#121217]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
                  Air Time Dispatch Desk
                </h3>
                <p className="text-[11px] text-stone-400">
                  24/7 Edmonton Chauffeur Hotline & Live Operations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors cursor-pointer"
                title="Refresh dispatch stream"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/60 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('call')}
              className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'call'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-md font-extrabold'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Call</span>
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'feed'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Live Feed ({recentBookings.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Live Dispatch Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#0a0a0c]">
            {/* Quick Dispatch Banner */}
            <div className="px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs">
              <span className="text-amber-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Active Dispatcher: Marcus D. (Online)</span>
              </span>
              <a
                href="tel:+15877282828"
                className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>+1 (587) 728-2828</span>
              </a>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                      {msg.senderName}
                    </span>
                    <span className="text-[10px] text-stone-500">• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium rounded-br-none'
                        : 'bg-[#18181f] text-stone-200 border border-stone-700/80 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Suggested Quick Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(action)}
                          className="px-3 py-1.5 rounded-full bg-stone-900 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 text-[11px] font-semibold border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>{action}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#18181f] border border-stone-800 max-w-[140px]">
                  <span className="text-xs text-stone-400">Dispatcher typing</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Box */}
            <div className="p-4 border-t border-stone-800 bg-[#121217]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask dispatch (e.g. Airport flat rates, ASAP pickup)..."
                  className="flex-1 bg-black/70 border border-stone-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 text-black font-bold transition-all cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] text-stone-400">
                <span>Instant dispatch response 24/7</span>
                <button
                  onClick={() => setActiveTab('call')}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  <span>Switch to Direct Phone Call</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Direct Phone Call & Instant Callback Dispatcher */}
        {activeTab === 'call' && (
          <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0c] space-y-6">
            
            {/* Primary Tap to Call Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181822] to-[#121218] border border-amber-500/40 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-lg shadow-emerald-500/20">
                <PhoneCall className="w-8 h-8 animate-pulse" />
              </div>

              <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                Priority 24/7 Chauffeur Line
              </span>

              <h3 className="font-cinzel text-2xl font-bold text-white mt-3 mb-1">
                +1 (587) 728-2828
              </h3>
              <p className="text-stone-300 text-xs mb-6 max-w-sm mx-auto">
                Direct connection to on-duty Edmonton dispatchers. Instant vehicle dispatch, flight delay updates, and corporate quotes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+15877282828"
                  className="w-full sm:w-auto flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Tap to Call +1 (587) 728-2828</span>
                </a>

                <button
                  onClick={copyPhoneNumber}
                  className="w-full sm:w-auto py-4 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Interactive Audio Simulator / Live Line Status */}
            <div className="p-4 rounded-xl bg-[#141419] border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-stone-900 text-amber-400 border border-stone-700">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold">Edmonton Dispatch Voice Bridge</h4>
                  <p className="text-stone-400 text-[11px]">
                    Average wait time: <span className="text-emerald-400 font-semibold">&lt; 15 seconds</span> • 3 Dispatchers on Duty
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                Active Line
              </span>
            </div>

            {/* Request Instant Call Back Form */}
            <div className="p-6 rounded-2xl bg-[#121217] border border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <PhoneForwarded className="w-4 h-4" />
                <span>Request Urgent Dispatch Call Back</span>
              </div>
              <p className="text-stone-400 text-xs mb-4">
                Leave your phone number below and our on-duty dispatcher will call you within 60-90 seconds.
              </p>

              {callbackStatus === 'success' ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <h4 className="text-emerald-400 font-bold text-sm">Call Request Sent to Dispatch!</h4>
                  <p className="text-stone-300 text-xs">{callbackMessage}</p>
                  <button
                    onClick={() => setCallbackStatus('idle')}
                    className="mt-2 text-xs text-amber-400 font-bold underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequestCallback} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-300 mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-black/60 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-300 mb-1">
                        Your Phone Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="e.g. (587) 555-0199"
                        className="w-full bg-black/60 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1">
                      Pickup Location or Destination
                    </label>
                    <input
                      type="text"
                      value={callbackLocation}
                      onChange={(e) => setCallbackLocation(e.target.value)}
                      placeholder="e.g. YEG Airport Terminal or Downtown Hotel"
                      className="w-full bg-black/60 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={callbackStatus === 'submitting' || !callbackPhone.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                  >
                    <PhoneForwarded className="w-3.5 h-3.5" />
                    <span>{callbackStatus === 'submitting' ? 'Dispatching...' : 'Have Dispatcher Call Me Now'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Dispatched Bookings Stream Feed */}
        {activeTab === 'feed' && (
          <div className="flex-1 overflow-y-auto p-5 bg-[#0a0a0c] space-y-3">
            {/* Dispatch Channel Routing Summary */}
            <div className="p-4 rounded-xl bg-[#121217] border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Primary SMS Dispatch:</span>
                </span>
                <span className="font-mono text-white">+1 (587) 728-2828</span>
              </div>

              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Primary Email Dispatch:</span>
                </span>
                <span className="font-mono text-white">limoairtime@gmail.com</span>
              </div>
            </div>

            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 pt-2">
              Recent Chauffeur Dispatches ({recentBookings.length})
            </h4>

            {recentBookings.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs bg-[#121217] rounded-xl border border-stone-800">
                No active bookings in current session. Submit a booking from the form to test live dispatch notifications.
              </div>
            ) : (
              recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-[#141419] border border-stone-800 hover:border-amber-500/40 transition-colors text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-amber-400">
                      {b.id}
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold">
                      Dispatched
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>{b.fullName} ({b.phone})</span>
                  </div>

                  <div className="text-stone-400 text-[11px] space-y-0.5">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span className="truncate">From: {b.pickupAddress}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      <span className="truncate">To: {b.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-800 text-stone-300">
                    <span>{b.pickupDate} @ {b.pickupTime}</span>
                    <span className="font-bold text-amber-400">
                      {b.calculatedFare?.totalPrice ? `$${b.calculatedFare.totalPrice.toFixed(2)} CAD` : 'Custom Quote'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Global Bottom Quick Actions Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#121217] flex items-center justify-between gap-3">
          <a
            href="tel:+15877282828"
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call +1 (587) 728-2828</span>
          </a>

          <button
            onClick={() => {
              onClose();
              if (onBookDirect) onBookDirect();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-400 hover:text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Book Online</span>
          </button>
        </div>

      </div>
    </div>
  );
};
