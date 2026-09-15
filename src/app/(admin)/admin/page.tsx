'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { StatsGrid } from '@/components/admin/stats-grid';
import { ContentTable } from '@/components/admin/content-table';
import { Plus, Sparkles, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2.5 border-carbon">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase text-carbon tracking-tight">
            Content Operations
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-1">
            Publish, manage, and curate all 9 portfolio taxonomies in one accessible console.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" size="sm" className="gap-1.5 font-mono">
            <Plus className="w-3.5 h-3.5" /> New Project
          </Button>
          <Button variant="yellow" size="sm" className="gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Design Work
          </Button>
          <Button variant="secondary" size="sm" className="gap-1.5 font-mono">
            <Activity className="w-3.5 h-3.5" /> Log Activity
          </Button>
        </div>
      </div>

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
