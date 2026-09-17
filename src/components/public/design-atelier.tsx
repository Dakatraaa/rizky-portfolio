'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DesignCard } from '@/components/public/cards/design-card';
import { DesignLightbox } from '@/components/public/design-lightbox';
import { usePortfolioContent } from '@/context/content-context';
import { Design } from '@/types';

export const DesignAtelier: React.FC = () => {
  const { designs } = usePortfolioContent();
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  const publishedDesigns = designs.filter((d) => d.published !== false);

  return (
    <section id="designs" className="py-14 border-b-2.5 border-carbon bg-paper-technical">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-kalcer-cobalt text-white font-mono text-xs font-bold uppercase">
                SECTION 02
              </span>
              <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
                VISUAL ARTIFACTS // RISOPRINT &amp; APPAREL
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-carbon tracking-tight">
              KALCER GRAPHIC ATELIER &amp; PRINTS
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Risograph experimentation, technical running apparel prints, brand typography, and risography catalog reflecting modern Indonesian street culture.
            </p>
          </div>
          <div>
            <Button href="/design" variant="yellow" size="sm" className="font-mono">
              VIEW ARCHIVE // {publishedDesigns.length} CATALOGS
            </Button>
          </div>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedDesigns.map((design, idx) => (
            <DesignCard
              key={design.id}
              design={design}
              index={idx}
              onClick={() => setSelectedDesign(design)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <DesignLightbox
        design={selectedDesign}
        designs={publishedDesigns}
        onClose={() => setSelectedDesign(null)}
        onSelect={(d) => setSelectedDesign(d)}
      />
    </section>
  );
};


