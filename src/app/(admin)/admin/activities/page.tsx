import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { mockActivities } from '@/data';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminActivitiesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Field Ops & Scrapbook"
        description="Log marathon pacing runs, tech meetups, and printmaker workshops."
        actionButton={
          <Button variant="secondary" size="sm" className="gap-1.5 font-mono">
            <Plus className="w-3.5 h-3.5" /> Log Activity
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockActivities.map((act) => (
          <Card key={act.id} elevation={1} className="p-4 bg-white flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="lime">{act.category}</Badge>
                <span className="font-mono text-xs text-carbon-muted">{act.date}</span>
              </div>
              <h3 className="font-display font-bold text-base text-carbon">{act.title}</h3>
              <p className="font-body text-xs text-carbon-muted">{act.summary}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between">
              <span className="font-mono text-[10px] text-kalcer-cobalt font-bold">{act.location}</span>
              <div className="flex items-center gap-1.5">
                <button
                  aria-label={`Edit ${act.title}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label={`Delete ${act.title}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

