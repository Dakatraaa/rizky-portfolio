import React from 'react';
import { cn } from '@/lib/utils';

export interface TapeStripProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'yellow' | 'orange' | 'cobalt' | 'lime' | 'pink' | 'white';
  tilt?: 'left' | 'right' | 'none';
}

export const TapeStrip: React.FC<TapeStripProps> = ({
  className,
  color = 'yellow',
  tilt = 'left',
  children,
  ...props
}) => {
  const colorStyles = {
    yellow: 'bg-[#FFE600]/90 text-carbon border-dashed border-carbon/40',
    orange: 'bg-[#FF5500]/90 text-white border-dashed border-carbon/40',
    cobalt: 'bg-[#2563EB]/90 text-white border-dashed border-white/40',
    lime: 'bg-[#B4F51C]/90 text-carbon border-dashed border-carbon/40',
    pink: 'bg-[#FF3E83]/90 text-white border-dashed border-white/40',
    white: 'bg-white/95 text-carbon border-dashed border-carbon/40',
  };

  const tiltStyles = {
    left: '-rotate-2',
    right: 'rotate-1.5',
    none: 'rotate-0',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-sm border border-x-0 select-none z-10',
        colorStyles[color],
        tiltStyles[tilt],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
