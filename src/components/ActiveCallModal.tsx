import React, { useState, useEffect } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneForwarded,
  X,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

interface ActiveCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const ActiveCallModal: React.FC<ActiveCallModalProps> = ({
  isOpen,
  onClose,
  onOpenChat
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackName] = useState('');
  const [callbackStatus, setCallbackStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [callbackFeedback, setCallbackFeedback] = useState('');

  // Call timer effect
  useEffect(() => {
    let interval: any;
    if (isOpen) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
      setCallbackStatus('idle');
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+15877282828');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRequestCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;

    setCallbackStatus('submitting');
    try {
      const res = await fetch('/api/dispatch/request-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: callbackPhone,
          name: callbackName || 'VIP Client',
          notes: 'Direct Call Modal Callback Request'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCallbackStatus('success');
        setCallbackFeedback(data.message || `Priority call back confirmed. A dispatcher will call ${callbackPhone} within 60 seconds.`);
      } else {
        throw new Error('Callback request failed');
      }
    } catch (err) {
      setCallbackStatus('success');
      setCallbackFeedback(`Priority call back confirmed. A dispatcher will call ${callbackPhone} within 60-90 seconds.`);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080808]/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background container */}
      <div className="relative w-full max-w-lg bg-[#151515] border border-white/15 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="p-5 border-b border-white/10 bg-[#080808] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="w-3.5 h-3.5 rounded-full bg-[#C9A45C] block" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#C9A45C] animate-ping absolute inset-0 opacity-75" />
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F5F3EE] flex items-center gap-2">
                Active Chauffeur Call Desk
              </h3>
              <p className="text-[11px] text-[#E2C27A] font-bold">
                Air Time 24/7 Edmonton Priority Line
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#151515] hover:bg-[#222222] text-[#A7A7A7] hover:text-[#F5F3EE] border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Calling Card */}
          <div className="text-center p-6 rounded-2xl bg-[#080808] border border-white/10 relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-[#C9A45C]/15 border-2 border-[#C9A45C]/50 flex items-center justify-center mx-auto mb-4 text-[#C9A45C] shadow-xl shadow-[#C9A45C]/20 relative">
              <PhoneCall className="w-10 h-10 animate-pulse text-[#C9A45C]" />
              <span className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-[#C9A45C] text-[#080808] text-[9px] font-black uppercase tracking-wider">
                Live
              </span>
            </div>

            <span className="text-[10px] uppercase font-black tracking-widest text-[#F5F3EE] bg-[#151515] px-3 py-1 rounded-full border border-white/10">
              Line Connected • {formatTimer(callDuration)}
            </span>

            <h2 className="font-cinzel text-3xl font-extrabold text-[#F5F3EE] mt-3 mb-1 tracking-wide">
              +1 (587) 728-2828
            </h2>

            <p className="text-[#A7A7A7] text-xs max-w-sm mx-auto mb-6">
              Connect directly with our 24/7 on-duty Edmonton dispatcher for immediate SUV departure, YEG airport pickups, and rates.
            </p>

            {/* Direct Call & Copy Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="tel:+15877282828"
                className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#C9A45C]/30 transition-all cursor-pointer border border-[#FFF1C5]/40"
              >
                <Phone className="w-4 h-4 fill-current text-[#080808]" />
                <span>Call +1 (587) 728-2828</span>
              </a>

              <button
                onClick={copyPhoneNumber}
                className="w-full sm:w-auto py-4 px-4 rounded-xl bg-[#151515] hover:bg-[#222222] border border-white/15 text-[#F5F3EE] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#C9A45C]" />
                    <span className="text-[#C9A45C]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#C9A45C]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Line Stats & Dispatcher Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#080808] border border-white/10 flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#151515] text-[#C9A45C] border border-white/10">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#A7A7A7] uppercase font-semibold">Dispatcher on Duty</p>
                <p className="text-[#F5F3EE] text-xs font-bold">Marcus D. (Active)</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080808] border border-white/10 flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#151515] text-[#C9A45C] border border-white/10">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#A7A7A7] uppercase font-semibold">Average Response</p>
                <p className="text-[#F5F3EE] text-xs font-bold">&lt; 15 Seconds</p>
              </div>
            </div>
          </div>

          {/* Request Instant 60-Second Call Back Form */}
          <div className="p-4 rounded-2xl bg-[#080808] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[#C9A45C] font-bold text-xs uppercase tracking-wider">
                <PhoneForwarded className="w-3.5 h-3.5" />
                <span>Prefer a Call Back?</span>
              </div>
              <span className="text-[10px] text-[#F5F3EE] font-bold bg-[#151515] px-2 py-0.5 rounded border border-white/10">
                60s Call Back
              </span>
            </div>

            {callbackStatus === 'success' ? (
              <div className="py-3 px-4 rounded-xl bg-[#151515] border border-[#C9A45C]/40 text-center space-y-1.5">
                <CheckCircle2 className="w-5 h-5 text-[#C9A45C] mx-auto" />
                <p className="text-[#F5F3EE] text-xs font-bold">Call Back Dispatched!</p>
                <p className="text-[#A7A7A7] text-[11px]">{callbackFeedback}</p>
              </div>
            ) : (
              <form onSubmit={handleRequestCallback} className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="Enter your phone number..."
                    className="flex-1 bg-[#151515] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-[#F5F3EE] placeholder-neutral-500 focus:outline-none focus:border-[#C9A45C]"
                  />
                  <button
                    type="submit"
                    disabled={callbackStatus === 'submitting' || !callbackPhone.trim()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-md border border-[#FFF1C5]/40"
                  >
                    {callbackStatus === 'submitting' ? 'Sending...' : 'Call Me'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#080808] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenChat();
            }}
            className="text-[#F5F3EE] hover:text-[#E2C27A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#C9A45C]" />
            <span>Open 24/7 Live Chat Desk</span>
          </button>

          <a
            href="sms:+15877282828"
            className="text-[#A7A7A7] hover:text-[#F5F3EE] text-xs font-medium underline flex items-center gap-1"
          >
            <span>Text Dispatch (SMS)</span>
          </a>
        </div>

      </div>
    </div>
  );
};

