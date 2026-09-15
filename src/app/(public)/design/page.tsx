import React from 'react';
import { DesignCard } from '@/components/public/cards/design-card';
import { mockDesigns } from '@/data';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Graphic Atelier & Risograph Prints // Kalcer Studio',
  description: 'Limited edition print catalogs, technical running apparel kits, and brand packaging.',
};

export default function DesignPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cobalt">PRINT VAULT</Badge>
          <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
            87 CATALOG ARTIFACTS
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-carbon tracking-tight">
          KALCER GRAPHIC ATELIER & PRINTS
        </h1>
        <p className="font-body text-base text-carbon-muted max-w-2xl mt-2">
          Risograph experimentation, technical running apparel prints, brand typography, and risography catalog reflecting modern Indonesian street culture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockDesigns.map((design, idx) => (
          <DesignCard key={design.id} design={design} index={idx} />
        ))}
      </div>
    </div>
  );
}
