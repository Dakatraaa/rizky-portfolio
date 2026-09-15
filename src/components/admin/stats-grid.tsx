import React from 'react';
import { Card } from '@/components/ui/card';
import { mockProjects, mockDesigns, mockActivities, mockContentItems, mockCertifications } from '@/data';

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Projects */}
      <Card elevation={1} className="p-4 bg-white relative">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-carbon-muted uppercase">PROJECTS</span>
          <span className="text-kalcer-orange font-bold">+2 NEW</span>
        </div>
        <div className="font-display font-black text-3xl text-carbon mt-2">
          {mockProjects.length}
        </div>
        <div className="text-xs font-mono text-carbon-muted mt-1 flex justify-between border-t border-carbon/10 pt-2">
          <span>{mockProjects.filter((p) => p.status === 'PUBLISHED' || p.status === 'FEATURED').length} ACTIVE</span>
          <span>{mockProjects.filter((p) => p.status === 'DRAFT').length} DRAFT</span>
        </div>
      </Card>

      {/* Card 2: Design Vault */}
      <Card elevation={1} className="p-4 bg-white relative">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-carbon-muted uppercase">DESIGN VAULT</span>
          <span className="text-carbon font-bold">87 ITEMS</span>
        </div>
        <div className="font-display font-black text-3xl text-kalcer-cobalt mt-2">
          87
        </div>
        <div className="text-xs font-mono text-carbon-muted mt-1 flex justify-between border-t border-carbon/10 pt-2">
          <span>62 RISO</span>
          <span>15 JERSEY</span>
          <span>10 PACKAGING</span>
        </div>
      </Card>

      {/* Card 3: Field Ops */}
      <Card elevation={1} className="p-4 bg-white relative">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-carbon-muted uppercase">FIELD OPS</span>
          <span className="text-kalcer-cobalt font-bold">65 LOGS</span>
        </div>
        <div className="font-display font-black text-3xl text-kalcer-orange mt-2">
          65
        </div>
        <div className="text-xs font-mono text-carbon-muted mt-1 flex justify-between border-t border-carbon/10 pt-2">
          <span>24 MARATHONS</span>
          <span>41 SPRINTS</span>
        </div>
      </Card>

      {/* Card 4: Dispatches */}
      <Card elevation={1} className="p-4 bg-white relative">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-carbon-muted uppercase">DISPATCHES</span>
          <span className="text-kalcer-emerald font-bold">6 CERTS</span>
        </div>
        <div className="font-display font-black text-3xl text-kalcer-emerald mt-2">
          85+
        </div>
        <div className="text-xs font-mono text-carbon-muted mt-1 flex justify-between border-t border-carbon/10 pt-2">
          <span>YOUTUBE</span>
          <span>SUBSTACK</span>
        </div>
      </Card>
    </div>
  );
};
