import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 0 | 1 | 2 | 3;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  elevation = 1,
  interactive = false,
  children,
  ...props
}) => {
  const elevationStyles = {
    0: 'border border-carbon-muted/40 shadow-none bg-paper',
    1: 'border-2.5 border-carbon brutal-shadow bg-white rounded',
    2: 'border-2.5 border-carbon brutal-shadow-lg bg-white rounded',
    3: 'border-3 border-carbon brutal-shadow-xl bg-white rounded-md',
  };

  return (
    <div
      className={cn(
        elevationStyles[elevation],
        interactive && 'brutal-press cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
