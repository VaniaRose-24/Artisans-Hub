import React from 'react';
import { RealtimeSyncEvent } from '../types';

interface RealtimeStatusBadgeProps {
  connected: boolean;
  lastEvent: RealtimeSyncEvent | null;
  onClearToast: () => void;
}

export const RealtimeStatusBadge: React.FC<RealtimeStatusBadgeProps> = ({
  connected,
  lastEvent,
  onClearToast,
}) => {
  return (
    <>
      {/* Discreet Live Sync Indicator */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10271d]/90 text-white text-[11px] font-medium shadow-lg backdrop-blur-md border border-[#cee9d9]/20">
        <span
          className={`w-2 h-2 rounded-full ${
            connected ? 'bg-[#cee9d9] animate-pulse' : 'bg-[#ba1a1a]'
          }`}
        ></span>
        <span className="font-mono tracking-tight">
          {connected ? 'Real-Time Sync: Connected' : 'Sync: Reconnecting'}
        </span>
      </div>

      {/* Floating Real-time Event Toast */}
      {lastEvent && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm p-4 rounded-xl bg-[#ffffff] text-[#1b1c19] shadow-2xl border border-[#e4ded3] flex items-start gap-3 animate-bounce">
          <div className="p-2 rounded-full bg-[#cee9d9] text-[#082016] shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-base">sensors</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8e4d32]">
                Live Guild Event
              </span>
              <button
                onClick={onClearToast}
                className="text-[#727974] hover:text-[#1b1c19] cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <p className="text-[12px] text-[#10271d] font-medium mt-0.5 leading-snug">
              {lastEvent.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
