import React from 'react';
import { ProjectCard } from '@/components/public/cards/project-card';
import { mockProjects } from '@/data';

export const CaseStudies: React.FC = () => {
  const flagship = mockProjects[0];

  return (
    <section id="projects" className="py-14 border-b-2.5 border-carbon bg-paper">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-kalcer-orange text-white font-mono text-xs font-bold uppercase">
                SECTION 01
              </span>
              <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
                CORE COMPUTATIONAL SYSTEMS
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-carbon tracking-tight">
              LAB CASE STUDIES & HARDWARE RIGS
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Engineered for low-latency throughput, distributed offline data engines, and real-time kinetic telemetry.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-carbon">
              [ {mockProjects.length} RIGS COMPILED ]
            </span>
          </div>
        </div>

        {/* Flagship Case Study Card */}
        <ProjectCard project={flagship} featured />
      </div>
    </section>
  );
};
