'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type MascotPoseType =
  | 'master'
  | 'runner-warmup'
  | 'runner-sprint'
  | 'runner-tired'
  | 'developer-code'
  | 'developer-idea'
  | 'interaction-wave'
  | 'interaction-thumbsup'
  | 'daily-coffee'
  | 'daily-chill';

export interface MascotRendererProps {
  pose?: MascotPoseType;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const MascotRenderer: React.FC<MascotRendererProps> = ({
  pose = 'master',
  size = 'md',
  className,
  onClick,
  interactive = false,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    hero: 'w-56 h-56 md:w-72 md:h-72',
  };

  // Image mappings for clean display
  const poseSourceMap: Record<MascotPoseType, string> = {
    master: '/mascot/mascot-master.png',
    'runner-warmup': '/mascot/mascot-runner.png',
    'runner-sprint': '/mascot/mascot-runner.png',
    'runner-tired': '/mascot/mascot-runner.png',
    'developer-code': '/mascot/mascot-developer-trading.png',
    'developer-idea': '/mascot/mascot-developer-trading.png',
    'interaction-wave': '/mascot/mascot-interaction.png',
    'interaction-thumbsup': '/mascot/mascot-interaction.png',
    'daily-coffee': '/mascot/mascot-daily-life.png',
    'daily-chill': '/mascot/mascot-daily-life.png',
  };

  const src = poseSourceMap[pose] || '/mascot/mascot-master.png';

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center select-none',
        sizeMap[size],
        interactive && 'cursor-pointer brutal-press transition-transform',
        className
      )}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={`Kalcer Mascot - ${pose}`}
          fill
          sizes="(max-width: 768px) 150px, 300px"
          priority={size === 'hero' || size === 'lg'}
          className="object-contain pixelated"
        />
      </div>
    </div>
  );
};
