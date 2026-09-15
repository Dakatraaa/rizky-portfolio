import React from 'react';
import { ActivityCard } from '@/components/public/cards/activity-card';
import { mockActivities } from '@/data';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Field Ops & Life Scrapbook // Kalcer Studio',
  description: 'Documenting endurance marathon splits, open-source workshops, and campus life.',
};

export default function ActivitiesPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">FIELD ARCHIVE</Badge>
          <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
            65 FIELD OPS LOGS
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-carbon tracking-tight">
          DISPATCH LOGS // FIELD SCRAPBOOK
        </h1>
        <p className="font-body text-base text-carbon-muted max-w-2xl mt-2">
          Documenting endurance track splits, open-source architecture demos, tactile risograph workshops, and campus life across Jakarta and Bandung.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockActivities.map((act, idx) => (
          <ActivityCard key={act.id} activity={act} index={idx} />
        ))}
      </div>
    </div>
  );
}
