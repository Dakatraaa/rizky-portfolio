import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { TapeStrip } from '@/components/ui/tape-strip';
import { Activity } from '@/types';
import { Calendar, MapPin } from 'lucide-react';

export interface ActivityCardProps {
  activity: Activity;
  index?: number;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index = 0 }) => {
  const tapeColors: ('orange' | 'cobalt' | 'yellow')[] = ['orange', 'cobalt', 'yellow'];
  const color = tapeColors[index % tapeColors.length];

  const fallbackImages = [
    '/mascot/mascot-runner.png',
    '/mascot/mascot-developer-trading.png',
    '/mascot/mascot-props.png',
  ];
  const imageSrc = activity.coverImage || fallbackImages[index % fallbackImages.length];

  return (
    <Card elevation={2} className="p-4 bg-white relative flex flex-col justify-between">
      <div className="absolute -top-3 right-6 z-10">
        <TapeStrip color={color} tilt={index % 2 === 0 ? 'right' : 'left'}>
          {activity.accentTag}
        </TapeStrip>
      </div>

      <div>
        {/* Photo Simulation */}
        <div className="relative w-full aspect-[4/3] bg-paper border-2 border-carbon overflow-hidden mt-2">
          <Image
            src={imageSrc}
            alt={activity.title}
            fill
            className="object-contain p-4 pixelated"
          />
          {activity.telemetry && (
            <div className="absolute bottom-2 left-2 bg-carbon/90 text-kalcer-lime font-mono text-[10px] px-2 py-0.5 font-bold border border-carbon">
              PACE: {activity.telemetry.paceMinPerKm} · {activity.telemetry.splitTime}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-carbon-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {activity.date}
            </span>
            <span className="flex items-center gap-1 text-kalcer-cobalt font-bold">
              <MapPin className="w-3 h-3" /> {activity.location}
            </span>
          </div>

          <h3 className="font-display font-bold text-base text-carbon leading-snug">
            {activity.title}
          </h3>

          <p className="font-body text-xs text-carbon/80 leading-relaxed">
            {activity.summary}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between font-mono text-[11px]">
        <span className="text-carbon-muted">STATUS: {activity.status}</span>
        <span className="font-bold text-kalcer-orange">OCTOBER CYCLE</span>
      </div>
    </Card>
  );
};
