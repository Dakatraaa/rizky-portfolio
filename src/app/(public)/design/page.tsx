'use client';

import React, { useState } from 'react';
import { DesignCard } from '@/components/public/cards/design-card';
import { DesignLightbox } from '@/components/public/design-lightbox';
import { mockDesigns } from '@/data';
import { Badge } from '@/components/ui/badge';
import { Design } from '@/types';

export default function DesignPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxDesign, setActiveLightboxDesign] = useState<Design | null>(null);

  const categories = [
    { id: 'ALL', label: `ALL CATALOGS [${mockDesigns.length}]` },
    { id: 'POSTER', label: 'POSTER & RISO' },
    { id: 'JERSEY', label: 'TECHNICAL APPAREL' },
    { id: 'T_SHIRT', label: 'STREETWEAR' },
    { id: 'PACKAGING', label: 'PACKAGING' },
    { id: 'LOGO', label: 'BRAND IDENTITY' },
    { id: 'EXPERIMENTAL', label: 'EXPERIMENTAL' },
  ];

  const filteredDesigns =
    selectedCategory === 'ALL'
      ? mockDesigns
      : mockDesigns.filter((d) => d.category === selectedCategory);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cobalt">PRINT VAULT</Badge>
          <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
            87 CATALOG ARTIFACTS
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-carbon tracking-tight">
          KALCER GRAPHIC ATELIER &amp; PRINTS
        </h1>
        <p className="font-body text-base text-carbon-muted max-w-2xl mt-2">
          Risograph experimentation, technical running apparel prints, brand typography, and risography catalog reflecting modern Indonesian street culture.
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDesigns.map((design, idx) => (
          <DesignCard
            key={design.id}
            design={design}
            index={idx}
            onClick={() => setActiveLightboxDesign(design)}
          />
        ))}
      </div>

      {filteredDesigns.length === 0 && (
        <div className="p-12 text-center bg-white border-2 border-carbon brutal-shadow">
          <p className="font-mono text-sm text-carbon-muted">
            NO CATALOG ITEMS FOUND IN THIS CATEGORY.
          </p>
        </div>
      )}

      {/* Accessible Lightbox Modal */}
      <DesignLightbox
        design={activeLightboxDesign}
        designs={filteredDesigns.length > 0 ? filteredDesigns : mockDesigns}
        onClose={() => setActiveLightboxDesign(null)}
        onSelect={(d) => setActiveLightboxDesign(d)}
      />
    </div>
  );
}

