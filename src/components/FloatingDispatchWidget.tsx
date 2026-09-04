import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';

interface FloatingDispatchWidgetProps {
  onOpenChat: () => void;
  onOpenCall: () => void;
}

export const FloatingDispatchWidget: React.FC<FloatingDispatchWidgetProps> = ({
  onOpenChat,
  onOpenCall
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Floating Action Menu Buttons */}
      <div className="flex items-center gap-2">
        {/* Direct Call Quick Pill in Royal Red, Charcoal & Gold */}
        <a
          href="tel:+15877282828"
          onClick={() => {
            onOpenCall();
          }}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] via-[#B91C1C] to-[#990000] hover:from-[#DC2626] hover:to-[#B91C1C] border border-red-500/50 text-white shadow-xl backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 cursor-pointer group shadow-red-950/50"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <Phone className="w-3.5 h-3.5 fill-current text-white group-hover:animate-bounce" />
          <span>Call Dispatch (+1 587-728-2828)</span>
        </a>

        {/* Live Dispatch Chat Pill in Champagne Gold Gradient */}
        <button
          onClick={onOpenChat}
          className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#E2C27A] via-[#C9A45C] to-[#A7843B] hover:from-[#FFF1C5] hover:to-[#C9A45C] text-[#080808] font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-[#C9A45C]/30 transition-all duration-200 hover:scale-105 cursor-pointer border border-[#FFF1C5]/40"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-[#080808] fill-current" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#080808] border border-[#FFF1C5] animate-pulse" />
          </div>
          <span className="font-extrabold text-[#080808]">24/7 Dispatch Chat</span>
        </button>
      </div>
    </div>
  );
};

