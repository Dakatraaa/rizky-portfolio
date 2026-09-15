import React from 'react';
import { cn } from '@/lib/utils';

export interface SpeechBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  senderName?: string;
  hasLivePulse?: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  className,
  message,
  senderName = 'MASCOT // AR-BOT',
  hasLivePulse = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative bg-white border-2 border-carbon brutal-shadow p-3 max-w-xs rounded-sm',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-carbon/20">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-carbon-muted">
          {senderName}
        </span>
        {hasLivePulse && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-kalcer-emerald animate-pulse" />
            <span className="font-mono text-[9px] font-bold text-kalcer-emerald">LIVE</span>
          </span>
        )}
      </div>
      <p className="font-mono text-xs font-semibold text-carbon leading-snug">
        {message}
      </p>

      {/* Bubble Tail */}
      <div className="absolute -bottom-2 left-4 w-3 h-3 bg-white border-r-2 border-b-2 border-carbon rotate-45" />
    </div>
  );
};
