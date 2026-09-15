import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { TapeStrip } from '@/components/ui/tape-strip';
import { Design } from '@/types';
import { ArrowUpRight } from 'lucide-react';

export interface DesignCardProps {
  design: Design;
  index?: number;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, index = 0 }) => {
  const tapeColors: ('yellow' | 'cobalt' | 'orange')[] = ['yellow', 'cobalt', 'orange'];
  const color = tapeColors[index % tapeColors.length];

  return (
    <Card elevation={1} interactive className="relative p-4 bg-white flex flex-col justify-between">
      {/* Overlapping Tape Strip */}
      <div className="absolute -top-3 left-6 z-10">
        <TapeStrip color={color} tilt={index % 2 === 0 ? 'left' : 'right'}>
          {design.categoryLabel}
        </TapeStrip>
      </div>

      <div>
        {/* Visual Area */}
        <div className="relative w-full aspect-[4/5] bg-paper-technical border-2 border-carbon overflow-hidden mt-2">
          <Image
            src={design.coverImage}
            alt={design.title}
            fill
            className="object-contain p-4 pixelated hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-2 left-2 bg-carbon text-white font-mono text-[10px] px-2 py-0.5">
            {design.printMedium}
          </div>
        </div>

        {/* Content */}
        <div className="pt-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-carbon-muted">
              {design.dimensions}
            </span>
            <span className="font-mono text-xs font-bold text-kalcer-orange">
              {design.year}
            </span>
          </div>
          <h3 className="font-display font-bold text-lg text-carbon leading-snug">
            {design.title}
          </h3>
          <p className="font-body text-xs text-carbon/80 line-clamp-2">
            {design.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t-2 border-carbon/10 flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold text-carbon-muted">
          {design.edition || 'PROTOTYPE SPEC'}
        </span>
        <span className="flex items-center text-xs font-mono font-bold text-kalcer-cobalt hover:underline">
          INSPECT SPEC <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
        </span>
      </div>
    </Card>
  );
};
