import React from 'react';
import { Button } from '@/components/ui/button';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { StatsGrid } from '@/components/admin/stats-grid';
import { ContentTable } from '@/components/admin/content-table';
import { Plus, Sparkles, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Action Bar */}
      <AdminPageHeader
        title="Content Operations"
        description="Publish, manage, and curate all 9 portfolio taxonomies in one accessible console."
        actionButton={
          <div className="flex flex-wrap items-center gap-2">
            <Button href="/admin/projects" variant="primary" size="sm" className="gap-1.5 font-mono">
              <Plus className="w-3.5 h-3.5" /> New Project
            </Button>
            <Button href="/admin/designs" variant="yellow" size="sm" className="gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Design Work
            </Button>
            <Button href="/admin/activities" variant="secondary" size="sm" className="gap-1.5 font-mono">
              <Activity className="w-3.5 h-3.5" /> Log Activity
            </Button>
          </div>
        }
      />


      {/* KPI Stats Grid */}
      <StatsGrid />

      {/* Management Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-lg uppercase text-carbon">
            Recent Content Items
          </h2>
          <span className="font-mono text-xs text-carbon-muted">
            SORTED BY LAST MODIFIED
          </span>
        </div>
        <ContentTable />
      </div>
    </div>
  );
}
