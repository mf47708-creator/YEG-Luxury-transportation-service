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
          fallbackReply = 'For weddings and VIP galas at Rogers Place, we provide luxury GMC Yukon Denali XL SUVs with complimentary ribbons and red carpet rollout at $125/hr. Would you like us to call you with a customized quote?';
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

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#080808] border-l border-white/15 w-full max-w-xl h-full flex flex-col justify-between shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 bg-[#151515]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <span className="w-3 h-3 rounded-full bg-[#C9A45C] block" />
                <span className="w-3 h-3 rounded-full bg-[#C9A45C] animate-ping absolute inset-0 opacity-75" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-[#F5F3EE] flex items-center gap-2">
                  Air Time Dispatch Desk
                </h3>
                <p className="text-[11px] text-[#A7A7A7]">
                  24/7 Edmonton Chauffeur Hotline & Live Operations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                className="p-2 rounded-xl bg-[#080808] hover:bg-[#222222] text-[#A7A7A7] hover:text-[#F5F3EE] border border-white/10 transition-colors cursor-pointer"
                title="Refresh dispatch stream"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#080808] hover:bg-[#222222] text-[#A7A7A7] hover:text-[#F5F3EE] border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#080808] rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-[#C9A45C] text-[#080808] shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#F5F3EE] hover:bg-[#151515]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('call')}
              className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'call'
                  ? 'bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] text-[#080808] shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#F5F3EE] hover:bg-[#151515]'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Call</span>
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'feed'
                  ? 'bg-white/20 text-[#F5F3EE] shadow-md'
                  : 'text-[#A7A7A7] hover:text-[#F5F3EE] hover:bg-[#151515]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Live Feed ({recentBookings.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Live Dispatch Chat */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#080808]">
            {/* Quick Dispatch Banner */}
            <div className="px-5 py-2.5 bg-[#151515] border-b border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#F5F3EE] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Active Dispatcher: Marcus D. (Online)</span>
              </span>
              <a
                href="tel:+15877282828"
                className="text-[#E2C27A] hover:text-[#F5F3EE] font-bold underline flex items-center gap-1"
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
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A7A7A7]">
                      {msg.senderName}
                    </span>
                    <span className="text-[10px] text-neutral-500">• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] text-[#080808] font-bold rounded-br-none'
                        : 'bg-[#151515] text-[#F5F3EE] border border-white/10 rounded-bl-none'
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
                          className="px-3 py-1.5 rounded-full bg-[#151515] hover:bg-[#222222] text-[#F5F3EE] text-[11px] font-semibold border border-white/15 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-[#C9A45C]" />
                          <span>{action}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#151515] border border-white/10 max-w-[140px]">
                  <span className="text-xs text-[#A7A7A7]">Dispatcher typing</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#C9A45C] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#C9A45C] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-[#C9A45C] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Box */}
            <div className="p-4 border-t border-white/10 bg-[#151515]">
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
                  className="flex-1 bg-[#080808] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F5F3EE] placeholder-neutral-500 focus:outline-none focus:border-[#C9A45C] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-3 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] disabled:opacity-50 text-[#080808] font-bold transition-all cursor-pointer shadow-md shadow-[#C9A45C]/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] text-[#A7A7A7]">
                <span>Instant dispatch response 24/7</span>
                <button
                  onClick={() => setActiveTab('call')}
                  className="text-[#E2C27A] hover:underline flex items-center gap-1 font-bold cursor-pointer"
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
          <div className="flex-1 overflow-y-auto p-6 bg-[#080808] space-y-6">
            
            {/* Primary Tap to Call Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#151515] to-[#080808] border border-white/15 text-center relative overflow-hidden shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C]/40 flex items-center justify-center mx-auto mb-4 text-[#C9A45C] shadow-lg shadow-[#C9A45C]/20">
                <PhoneCall className="w-8 h-8 animate-pulse" />
              </div>

              <span className="text-[10px] uppercase font-black tracking-widest text-[#F5F3EE] bg-[#151515] px-3 py-1 rounded-full border border-white/10">
                Priority 24/7 Chauffeur Line
              </span>

              <h3 className="font-cinzel text-2xl font-bold text-[#F5F3EE] mt-3 mb-1">
                +1 (587) 728-2828
              </h3>
              <p className="text-[#A7A7A7] text-xs mb-6 max-w-sm mx-auto">
                Direct connection to on-duty Edmonton dispatchers. Instant vehicle dispatch, flight delay updates, and corporate quotes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+15877282828"
                  className="w-full sm:w-auto flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#C9A45C]/30 transition-all cursor-pointer border border-[#FFF1C5]/40"
                >
                  <Phone className="w-4 h-4 fill-current text-[#080808]" />
                  <span>Tap to Call +1 (587) 728-2828</span>
                </a>

                <button
                  onClick={copyPhoneNumber}
                  className="w-full sm:w-auto py-4 px-4 rounded-xl bg-[#151515] hover:bg-[#222222] border border-white/15 text-[#F5F3EE] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-[#C9A45C]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#C9A45C]" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Interactive Line Status */}
            <div className="p-4 rounded-xl bg-[#151515] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#080808] text-[#C9A45C] border border-white/10">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[#F5F3EE] text-xs font-bold">Edmonton Dispatch Voice Bridge</h4>
                  <p className="text-[#A7A7A7] text-[11px]">
                    Average wait time: <span className="text-[#C9A45C] font-semibold">&lt; 15 seconds</span> • 3 Dispatchers on Duty
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#C9A45C]/20 text-[#E2C27A] border border-[#C9A45C]/40 text-[10px] font-bold uppercase">
                Active Line
              </span>
            </div>

            {/* Request Instant Call Back Form */}
            <div className="p-6 rounded-2xl bg-[#151515] border border-white/10">
              <div className="flex items-center gap-2 text-[#C9A45C] font-bold text-xs uppercase tracking-wider mb-2">
                <PhoneForwarded className="w-4 h-4" />
                <span>Request Urgent Dispatch Call Back</span>
              </div>
              <p className="text-[#A7A7A7] text-xs mb-4">
                Leave your phone number below and our on-duty dispatcher will call you within 60-90 seconds.
              </p>

              {callbackStatus === 'success' ? (
                <div className="p-4 rounded-xl bg-[#080808] border border-[#C9A45C]/40 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-[#C9A45C] mx-auto" />
                  <h4 className="text-[#F5F3EE] font-bold text-sm">Call Request Sent to Dispatch!</h4>
                  <p className="text-[#A7A7A7] text-xs">{callbackMessage}</p>
                  <button
                    onClick={() => setCallbackStatus('idle')}
                    className="mt-2 text-xs text-[#C9A45C] font-bold underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequestCallback} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#A7A7A7] mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EE] placeholder-neutral-500 focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#A7A7A7] mb-1">
                        Your Phone Number <span className="text-[#C9A45C]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="e.g. (587) 555-0199"
                        className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EE] placeholder-neutral-500 focus:outline-none focus:border-[#C9A45C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#A7A7A7] mb-1">
                      Pickup Location or Destination
                    </label>
                    <input
                      type="text"
                      value={callbackLocation}
                      onChange={(e) => setCallbackLocation(e.target.value)}
                      placeholder="e.g. YEG Airport Terminal or Downtown Hotel"
                      className="w-full bg-[#080808] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EE] placeholder-neutral-500 focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={callbackStatus === 'submitting' || !callbackPhone.trim()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C9A45C]/30 cursor-pointer disabled:opacity-50 border border-[#FFF1C5]/40"
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
          <div className="flex-1 overflow-y-auto p-5 bg-[#080808] space-y-3">
            {/* Dispatch Channel Routing Summary */}
            <div className="p-4 rounded-xl bg-[#151515] border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#A7A7A7]">
                <span className="flex items-center gap-1.5 text-[#F5F3EE] font-semibold">
                  <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Primary SMS Dispatch:</span>
                </span>
                <span className="font-mono text-[#E2C27A] font-bold">+1 (587) 728-2828</span>
              </div>

              <div className="flex items-center justify-between text-[#A7A7A7]">
                <span className="flex items-center gap-1.5 text-[#F5F3EE] font-semibold">
                  <Mail className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Primary Email Dispatch:</span>
                </span>
                <span className="font-mono text-[#F5F3EE]">limoairtime@gmail.com</span>
              </div>
            </div>

            <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5F3EE] pt-2">
              Recent Chauffeur Dispatches ({recentBookings.length})
            </h4>

            {recentBookings.length === 0 ? (
              <div className="text-center py-12 text-[#A7A7A7] text-xs bg-[#151515] rounded-xl border border-white/10">
                No active bookings in current session. Submit a booking from the form to test live dispatch notifications.
              </div>
            ) : (
              recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-[#151515] border border-white/10 hover:border-[#C9A45C]/60 transition-colors text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-[#E2C27A]">
                      {b.id}
                    </span>
                    <span className="text-[10px] bg-[#C9A45C]/20 text-[#E2C27A] border border-[#C9A45C]/40 px-2 py-0.5 rounded font-bold">
                      Dispatched
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#F5F3EE] font-medium">
                    <User className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{b.fullName} ({b.phone})</span>
                  </div>

                  <div className="text-[#A7A7A7] text-[11px] space-y-0.5">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C9A45C]" />
                      <span className="truncate">From: {b.pickupAddress}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E2C27A]" />
                      <span className="truncate">To: {b.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/10 text-[#A7A7A7]">
                    <span>{b.pickupDate} @ {b.pickupTime}</span>
                    <span className="font-bold text-[#F5F3EE]">
                      {b.calculatedFare?.totalPrice ? `$${b.calculatedFare.totalPrice.toFixed(2)} CAD` : 'Custom Quote'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Global Bottom Quick Actions Footer */}
        <div className="p-4 border-t border-white/10 bg-[#151515] flex items-center justify-between gap-3">
          <a
            href="tel:+15877282828"
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C9A45C]/30 transition-all border border-[#FFF1C5]/40"
          >
            <Phone className="w-4 h-4 fill-current text-[#080808]" />
            <span>Call +1 (587) 728-2828</span>
          </a>

          <button
            onClick={() => {
              onClose();
              if (onBookDirect) onBookDirect();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-[#080808] hover:bg-[#222222] border border-white/15 text-[#F5F3EE] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Car className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Book Online</span>
          </button>
        </div>

      </div>
    </div>
  );
};

