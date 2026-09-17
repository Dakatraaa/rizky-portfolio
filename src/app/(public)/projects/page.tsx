'use client';

import React, { useState } from 'react';
import { ProjectCard } from '@/components/public/cards/project-card';
import { mockProjects } from '@/data';
import { Badge } from '@/components/ui/badge';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: `ALL RIGS [${mockProjects.length}]` },
    { id: 'FLAGSHIP RIG', label: 'FLAGSHIP RIGS' },
    { id: 'SYSTEMS', label: 'SYSTEMS & STORAGE' },
    { id: 'AUDIO DSP', label: 'AUDIO DSP & SYNTH' },
    { id: 'CREATIVE TOOL', label: 'CREATIVE TOOLS' },
  ];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? mockProjects
      : mockProjects.filter((p) => p.categoryTag === selectedCategory || p.category === selectedCategory);

  const flagship = filteredProjects.find((p) => p.status === 'FEATURED' || p.featured) || filteredProjects[0];
  const otherProjects = filteredProjects.filter((p) => p.id !== flagship?.id);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="orange">PROJECT VAULT</Badge>
          <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
            HIGH-COMPUTE SYSTEMS &amp; RIGS
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-carbon tracking-tight">
          LAB CASE STUDIES &amp; HARDWARE RIGS
        </h1>
        <p className="font-body text-base text-carbon-muted max-w-2xl mt-2">
          Engineered for low-latency throughput, distributed offline data engines, and real-time kinetic telemetry.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-carbon/10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 font-mono text-xs font-bold border-2 border-carbon whitespace-nowrap transition-all brutal-press ${
              selectedCategory === cat.id
                ? 'bg-carbon text-white shadow-brutal-sm'
                : 'bg-white text-carbon hover:bg-paper-technical'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Flagship Rig */}
      {flagship && (
        <ProjectCard project={flagship} featured />
      )}

      {/* Other Projects Grid */}
      {otherProjects.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="font-display font-black text-2xl uppercase text-carbon">
            OTHER COMPILED REPOSITORIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-white border-2 border-carbon brutal-shadow">
          <p className="font-mono text-sm text-carbon-muted">
            NO COMPILED RIGS FOUND IN THIS CATEGORY.
          </p>
        </div>
      )}
    </div>
  );
}

