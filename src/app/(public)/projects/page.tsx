import React from 'react';
import { ProjectCard } from '@/components/public/cards/project-card';
import { mockProjects } from '@/data';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Hardware Rigs & Systems // Kalcer Studio',
  description: 'Compiled case studies, telemetry algorithms, and offline-first computing engines.',
};

export default function ProjectsPage() {
  const flagship = mockProjects[0];
  const otherProjects = mockProjects.slice(1);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="orange">PROJECT VAULT</Badge>
          <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
            HIGH-COMPUTE SYSTEMS & RIGS
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-carbon tracking-tight">
          LAB CASE STUDIES & HARDWARE RIGS
        </h1>
        <p className="font-body text-base text-carbon-muted max-w-2xl mt-2">
          Engineered for low-latency throughput, distributed offline data engines, and real-time kinetic telemetry.
        </p>
      </div>

      {/* Flagship Rig */}
      <ProjectCard project={flagship} featured />

      {/* Other Projects Grid */}
      <div className="space-y-4">
        <h2 className="font-display font-black text-2xl uppercase text-carbon">
          OTHER COMPILED REPOSITORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </div>
  );
}
