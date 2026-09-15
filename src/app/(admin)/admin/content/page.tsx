import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { mockContentItems } from '@/data';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminContentPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title="Creator Dispatches"
        description="Manage YouTube devlogs, Substack essays, and video podcast drops."
        actionButton={
          <Button variant="primary" size="sm" className="gap-1.5 font-mono">
            <Plus className="w-3.5 h-3.5" /> New Episode
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockContentItems.map((item) => (
          <Card key={item.id} elevation={1} className="p-4 bg-white flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={item.platform === 'YOUTUBE' ? 'orange' : 'yellow'}>
                  {item.platform}
                </Badge>
                <span className="font-mono text-xs text-carbon-muted">{item.publishDate}</span>
              </div>
              <h3 className="font-display font-bold text-base text-carbon">{item.title}</h3>
              <p className="font-body text-xs text-carbon-muted">{item.summary}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-kalcer-cobalt">{item.metricHighlight}</span>
              <div className="flex items-center gap-1.5">
                <button
                  aria-label={`Edit ${item.title}`}
                  className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label={`Delete ${item.title}`}
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

