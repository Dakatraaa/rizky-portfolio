import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'orange' | 'cobalt' | 'yellow' | 'lime' | 'pink' | 'emerald' | 'dark';
  pill?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  pill = false,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-paper-technical text-carbon border-carbon',
    orange: 'bg-kalcer-orange text-white border-carbon',
    cobalt: 'bg-kalcer-cobalt text-white border-carbon',
    yellow: 'bg-kalcer-yellow text-carbon border-carbon',
    lime: 'bg-kalcer-lime text-carbon border-carbon',
    pink: 'bg-kalcer-pink text-white border-carbon',
    emerald: 'bg-kalcer-emerald text-white border-carbon',
    dark: 'bg-carbon text-white border-carbon',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border-[1.5px] select-none',
        pill ? 'rounded-full' : 'rounded-sm',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
