import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { mockExperiences } from '@/data';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminExperiencePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Experience & Education"
        description="Manage career history, academic milestones, and apprentice workshops."
        actionButton={
          <Button variant="secondary" size="sm" className="gap-1.5 font-mono">
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </Button>
        }
      />

      <div className="space-y-4">
        {mockExperiences.map((exp) => (
          <Card key={exp.id} elevation={1} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={exp.isCurrent ? 'emerald' : 'default'}>
                  {exp.type}
                </Badge>
                <span className="font-mono text-xs text-carbon-muted">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-carbon mt-1">{exp.role}</h3>
              <p className="font-mono text-xs text-kalcer-cobalt font-bold">
                {exp.organization} // {exp.location}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label={`Edit ${exp.role}`}
                className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow brutal-press"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                aria-label={`Delete ${exp.role}`}
                className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white brutal-press"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

