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
        {/* Direct Call Quick Pill in Royal Blue, White & Orange */}
        <a
          href="tel:+15877282828"
          onClick={() => {
            onOpenCall();
          }}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#071B38] border-2 border-white/80 hover:border-[#FF5500] text-white hover:text-white shadow-xl backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
          <Phone className="w-3.5 h-3.5 fill-current text-[#FF5500] group-hover:animate-bounce" />
          <span>Call Dispatch (+1 587-728-2828)</span>
        </a>

        {/* Live Dispatch Chat Pill in Vibrant Orange Gradient */}
        <button
          onClick={onOpenChat}
          className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#FF7700] via-[#FF5500] to-[#E63900] hover:from-[#FFA040] hover:to-[#FF5500] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-[#FF5500]/30 transition-all duration-200 hover:scale-105 cursor-pointer border border-orange-300/40"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-white fill-current" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white border border-black animate-pulse" />
          </div>
          <span className="font-extrabold text-white">24/7 Dispatch Chat</span>
        </button>
      </div>
    </div>
  );
};
