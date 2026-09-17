'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ActivityCard } from '@/components/public/cards/activity-card';
import { usePortfolioContent } from '@/context/content-context';

export const FieldScrapbook: React.FC = () => {
  const { activities } = usePortfolioContent();
  const publishedActivities = activities.filter((a) => a.published !== false && a.status !== 'DRAFT');

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
            {publishedActivities.length} FIELD LOGS
          </Badge>
        </div>

        {/* Scrapbook Polaroid Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedActivities.map((act, idx) => (
            <ActivityCard key={act.id} activity={act} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

