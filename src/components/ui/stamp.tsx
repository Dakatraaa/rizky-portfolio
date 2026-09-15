import React from 'react';
import { cn } from '@/lib/utils';

export interface StampProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'orange' | 'cobalt' | 'carbon';
  tilt?: 'left' | 'right';
  text: string;
}

export const Stamp: React.FC<StampProps> = ({
  className,
  color = 'orange',
  tilt = 'left',
  text,
  ...props
}) => {
  const colorStyles = {
    orange: 'border-kalcer-orange text-kalcer-orange',
    cobalt: 'border-kalcer-cobalt text-kalcer-cobalt',
    carbon: 'border-carbon text-carbon',
  };

  const tiltStyles = {
    left: '-rotate-6',
    right: 'rotate-6',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-3 py-1 font-mono text-[11px] font-extrabold uppercase tracking-widest border-2 rounded-sm border-dashed select-none opacity-90',
        colorStyles[color],
        tiltStyles[tilt],
        className
      )}
      {...props}
    >
      [ {text} ]
    </div>
  );
};
