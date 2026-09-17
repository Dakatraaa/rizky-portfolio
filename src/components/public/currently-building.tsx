'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePortfolioContent } from '@/context/content-context';
import { Hammer, Cpu, ArrowUpRight } from 'lucide-react';

export const CurrentlyBuilding: React.FC = () => {
  const { currentlyBuilding } = usePortfolioContent();

  const getStatusBadgeVariant = (status: string): 'yellow' | 'orange' | 'lime' | 'emerald' | 'cobalt' => {
    switch (status) {
      case 'Planning':
        return 'yellow';
      case 'In Development':
        return 'orange';
      case 'Beta':
        return 'lime';
      case 'Live':
        return 'emerald';
      case 'Experiment':
      default:
        return 'cobalt';
    }
  };

  return (
    <section id="currently-building" className="py-14 border-b-2.5 border-carbon bg-paper">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-kalcer-orange text-white font-mono text-xs font-bold uppercase">
                ACTIVE PIPELINE
              </span>
              <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
                R&amp;D LAB // IN THE CRUCIBLE
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-carbon tracking-tight flex items-center gap-3">
              CURRENTLY BUILDING &amp; ACTIVE LAB EXPERIMENTS
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Live engineering statuses for upcoming releases, WebAssembly math kernels, and tactile design tools. No fake progress bars—only real technical status states.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-carbon flex items-center gap-1.5">
              <Hammer className="w-4 h-4 text-kalcer-orange" />
              [ {currentlyBuilding.length} ACTIVE PIPELINES ]
            </span>
          </div>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentlyBuilding.map((item) => (
            <Card
              key={item.id}
              elevation={1}
              className="p-5 bg-white flex flex-col justify-between relative group hover:border-kalcer-orange transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-carbon/10">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-kalcer-cobalt" />
                    <span className="font-mono text-xs font-bold uppercase text-carbon">
                      {item.codename}
                    </span>
                  </div>
                  <Badge variant={getStatusBadgeVariant(item.status)} pill>
                    {item.status.toUpperCase()}
                  </Badge>
                </div>

                <h3 className="font-display font-black text-lg text-carbon leading-snug">
                  {item.title}
                </h3>

                <p className="font-body text-xs text-carbon/80 mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {item.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-paper-technical border border-carbon text-[10px] font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Milestone Highlight */}
              <div className="mt-4 pt-3 border-t-2 border-carbon/10 flex items-center justify-between text-xs font-mono">
                <span className="text-carbon-muted font-bold truncate max-w-[70%]">
                  ⚡ {item.progressHighlight}
                </span>
                <span className="text-kalcer-orange font-bold flex items-center">
                  {item.targetDate} <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

