import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { mockProjects } from '@/data';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Projects Management"
        description="Manage lab case studies, flagship rigs, and systems implementations."
        actionButton={
          <Button variant="primary" size="sm" className="gap-1.5 font-mono">
            <Plus className="w-3.5 h-3.5" /> Add Project
          </Button>
        }
      />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockProjects.map((proj) => (
          <Card key={proj.id} elevation={1} className="p-4 bg-white flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={proj.status === 'FEATURED' ? 'yellow' : 'default'}>
                  {proj.status}
                </Badge>
                <span className="font-mono text-xs text-carbon-muted">{proj.updatedAt}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-carbon">{proj.title}</h3>
              <p className="font-body text-xs text-carbon-muted line-clamp-2">{proj.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {proj.techStack.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-paper-technical border border-carbon text-[10px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-carbon/10 flex items-center justify-between">
              <span className="font-mono text-[11px] text-carbon-muted">SLUG: {proj.slug}</span>
              <div className="flex items-center gap-2">
                <button
                  aria-label={`Edit ${proj.title}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow brutal-press"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label={`Delete ${proj.title}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white brutal-press"
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
