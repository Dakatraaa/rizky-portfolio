'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TapeStrip } from '@/components/ui/tape-strip';
import { mockActivities } from '@/data';
import { Calendar, MapPin, Activity as ActivityIcon } from 'lucide-react';

export const FieldScrapbook: React.FC = () => {
  return (
    <section id="activities" className="py-14 border-b-2.5 border-carbon bg-paper-technical">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-kalcer-yellow text-carbon font-mono text-xs font-bold uppercase">
                SECTION 06
              </span>
              <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
                FIELD SCRAPBOOK // LIFE JOURNAL
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-carbon tracking-tight">
              DISPATCH LOGS // FIELD SCRAPBOOK
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Documenting endurance track splits, open-source architecture demos, tactile risograph workshops, and campus life across Jakarta and Bandung.
            </p>
          </div>
          <Badge variant="lime" pill>
            FIELD ARCHIVE
          </Badge>
        </div>

        {/* 3 Scrapbook Polaroid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockActivities.map((act, idx) => (
            <Card
              key={act.id}
              elevation={2}
              className="p-4 bg-white relative flex flex-col justify-between"
            >
              <div className="absolute -top-3 right-6 z-10">
                <TapeStrip
                  color={idx === 0 ? 'orange' : idx === 1 ? 'cobalt' : 'yellow'}
                  tilt={idx % 2 === 0 ? 'right' : 'left'}
                >
                  {act.accentTag}
                </TapeStrip>
              </div>

              <div>
                {/* Photo Simulation */}
                <div className="relative w-full aspect-[4/3] bg-paper border-2 border-carbon overflow-hidden mt-2">
                  <Image
                    src={
                      idx === 0
                        ? '/mascot/mascot-runner.png'
                        : idx === 1
                        ? '/mascot/mascot-developer-trading.png'
                        : '/mascot/mascot-props.png'
                    }
                    alt={act.title}
                    fill
                    className="object-contain p-4 pixelated"
                  />
                  {act.telemetry && (
                    <div className="absolute bottom-2 left-2 bg-carbon/90 text-kalcer-lime font-mono text-[10px] px-2 py-0.5 font-bold border border-carbon">
                      PACE: {act.telemetry.paceMinPerKm} · {act.telemetry.splitTime}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-carbon-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {act.date}
                    </span>
                    <span className="flex items-center gap-1 text-kalcer-cobalt font-bold">
                      <MapPin className="w-3 h-3" /> {act.location}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-carbon leading-snug">
                    {act.title}
                  </h3>

                  <p className="font-body text-xs text-carbon/80 leading-relaxed">
                    {act.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between font-mono text-[11px]">
                <span className="text-carbon-muted">STATUS: {act.status}</span>
                <span className="font-bold text-kalcer-orange">OCTOBER CYCLE</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
