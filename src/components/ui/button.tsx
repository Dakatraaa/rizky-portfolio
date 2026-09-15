'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'yellow' | 'lime' | 'terminal' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isPressed?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-display font-bold border-2.5 border-carbon transition-all brutal-press select-none';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs rounded-sm',
      md: 'px-4 py-2 text-sm rounded-sm',
      lg: 'px-6 py-3 text-base rounded',
    };

    const variantStyles = {
      primary: 'bg-kalcer-orange text-white brutal-shadow hover:bg-orange-600',
      secondary: 'bg-white text-carbon brutal-shadow hover:bg-paper-technical',
      yellow: 'bg-kalcer-yellow text-carbon brutal-shadow hover:bg-yellow-300',
      lime: 'bg-kalcer-lime text-carbon brutal-shadow hover:bg-lime-400',
      terminal: 'bg-carbon text-white border-2 border-white shadow-brutal-cobalt hover:bg-neutral-800',
      outline: 'bg-transparent text-carbon hover:bg-white/80',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
