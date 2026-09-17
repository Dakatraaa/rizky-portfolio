'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { usePortfolioContent } from '@/context/content-context';

export const StatsGrid: React.FC = () => {
  const { projects, designs, activities, certifications, contentItems } = usePortfolioContent();

  const activeProjects = projects.filter((p) => p.status === 'PUBLISHED' || p.status === 'FEATURED').length;
  const draftProjects = projects.filter((p) => p.status === 'DRAFT').length;

  const risoCount = designs.filter((d) => d.category === 'RISO' || d.category === 'POSTER').length;
  const apparelCount = designs.filter((d) => d.category === 'APPAREL' || d.category === 'JERSEY' || d.category === 'T_SHIRT').length;
  const otherDesigns = designs.length - risoCount - apparelCount;

  const marathonCount = activities.filter((a) => a.category === 'MARATHON' || a.category === 'RUNNING').length;
  const otherActivities = activities.length - marathonCount;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Projects */}
      <Card elevation={1} className="p-4 bg-white relative">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-carbon-muted uppercase">PROJECTS</span>
          <span className="text-kalcer-orange font-bold">SYSTEMS</span>
        </div>
        <div className="font-display font-black text-3xl text-carbon mt-2">
          {projects.length}
        </div>
        <div className="text-xs font-mono text-carbon-muted mt-1 flex justify-between border-t border-carbon/10 pt-2">
          <span>{activeProjects} ACTIVE</span>
          <span>{draftProjects} DRAFT</span>
        </div>
      </Card>

      {/* Card 2: Design Vault */}
      <Card elevation={1} className="p-4 bg-white relative">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-carbon-muted uppercase">DESIGN VAULT</span>
          <span className="text-carbon font-bold">{designs.length} ITEMS</span>
        </div>
        <div className="font-display font-black text-3xl text-kalcer-cobalt mt-2">
          {designs.length}
        </div>
        <div className="text-xs font-mono text-carbon-muted mt-1 flex justify-between border-t border-carbon/10 pt-2">
          <span>{risoCount} POSTER/RISO</span>
          <span>{apparelCount} APPAREL</span>
          <span>{otherDesigns} OTHER</span>
        </div>
      </Card>

      {/* Card 3: Field Ops */}
      <Card elevation={1} className="p-4 bg-white relative">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-carbon-muted uppercase">FIELD OPS</span>
          <span className="text-kalcer-cobalt font-bold">{activities.length} LOGS</span>
        </div>
        <div className="font-display font-black text-3xl text-kalcer-orange mt-2">
          {activities.length}
        </div>
        <div className="text-xs font-mono text-carbon-muted mt-1 flex justify-between border-t border-carbon/10 pt-2">
          <span>{marathonCount} ENDURANCE</span>
          <span>{otherActivities} TECH/WORKSHOP</span>
        </div>
      </Card>

      {/* Card 4: Dispatches */}
      <Card elevation={1} className="p-4 bg-white relative">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-carbon-muted uppercase">DISPATCHES &amp; CERTS</span>
          <span className="text-kalcer-emerald font-bold">{certifications.length} CERTS</span>
        </div>
        <div className="font-display font-black text-3xl text-kalcer-emerald mt-2">
          {contentItems.length}
        </div>
        <div className="text-xs font-mono text-carbon-muted mt-1 flex justify-between border-t border-carbon/10 pt-2">
          <span>{contentItems.filter((c) => c.platform === 'YOUTUBE').length} YOUTUBE</span>
          <span>{contentItems.filter((c) => c.platform === 'SUBSTACK').length} ESSAYS</span>
        </div>
      </Card>
    </div>
  );
};

