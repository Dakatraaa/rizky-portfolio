'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ContentCard } from '@/components/public/cards/content-card';
import { usePortfolioContent } from '@/context/content-context';

export const CreatorHub: React.FC = () => {
  const { contentItems, socialLinks, projects, designs } = usePortfolioContent();
  const publishedItems = contentItems.filter((c) => c.published !== false && c.status !== 'DRAFT');

  return (
    <section id="creator" className="py-14 border-b-2.5 border-carbon bg-paper">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-kalcer-pink text-white font-mono text-xs font-bold uppercase">
                SECTION 05
              </span>
              <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
                CREATIVE FREQUENCY // DISPATCHES
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-carbon tracking-tight">
              CONTENT CREATOR // DIGITAL PRESENCE
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Documenting systems engineering, tactile typography experiments, endurance running, and creative campus life across Jakarta and Bandung.
            </p>
          </div>
          <Badge variant="yellow" pill>
            BROADCAST STATUS: {publishedItems.length} DISPATCHES
          </Badge>
        </div>

        {/* 4 Platform Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-4 bg-white border-2 border-carbon text-center brutal-shadow-sm">
            <div className="font-display font-black text-3xl text-carbon">
              {projects.length.toString().padStart(2, '0')} RIGS
            </div>
            <div className="font-mono text-[10px] text-carbon-muted font-bold mt-1">
              CODE &amp; DEV EXPERIMENTS
            </div>
          </div>
          <div className="p-4 bg-white border-2 border-carbon text-center brutal-shadow-sm">
            <div className="font-display font-black text-3xl text-kalcer-orange">
              {designs.length}+ DROPS
            </div>
            <div className="font-mono text-[10px] text-carbon-muted font-bold mt-1">
              TACTILE PRINT &amp; RISOGRAPH
            </div>
          </div>
          <div className="p-4 bg-white border-2 border-carbon text-center brutal-shadow-sm">
            <div className="font-display font-black text-3xl text-kalcer-cobalt">3 YEARS</div>
            <div className="font-mono text-[10px] text-carbon-muted font-bold mt-1">
              RUNNER&apos;S DIARY &amp; TELEMETRY
            </div>
          </div>
          <div className="p-4 bg-white border-2 border-carbon text-center brutal-shadow-sm">
            <div className="font-display font-black text-3xl text-kalcer-lime">100%</div>
            <div className="font-mono text-[10px] text-carbon-muted font-bold mt-1">
              STUDENT INFORMATICS LIFE
            </div>
          </div>
        </div>

        {/* Episode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {publishedItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>

        {/* Social Presence Channels Grid */}
        <div className="pt-6 border-t-2 border-carbon/10">
          <div className="font-mono text-xs font-bold uppercase text-carbon-muted mb-3">
            // ACTIVE SOCIAL FREQUENCIES
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {socialLinks.map((soc) => (
              <a
                key={soc.id}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-carbon brutal-press text-center rounded-sm flex flex-col justify-between"
              >
                <div className="font-display font-extrabold text-xs text-carbon uppercase">
                  {soc.label}
                </div>
                <div className="font-mono text-[11px] text-kalcer-cobalt font-semibold mt-1 truncate">
                  {soc.handle}
                </div>
                <div className="font-mono text-[9px] text-carbon-muted mt-1 bg-paper-technical py-0.5 px-1">
                  {soc.metricValue}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

