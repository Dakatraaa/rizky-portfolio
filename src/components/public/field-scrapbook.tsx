import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ActivityCard } from '@/components/public/cards/activity-card';
import { mockActivities } from '@/data';

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
            <ActivityCard key={act.id} activity={act} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
