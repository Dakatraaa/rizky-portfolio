'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TapeStrip } from '@/components/ui/tape-strip';
import { mockDesigns } from '@/data';
import { ArrowUpRight, Palette } from 'lucide-react';

export const DesignAtelier: React.FC = () => {
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
                VISUAL ARTIFACTS // RISOPRINT & APPAREL
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-carbon tracking-tight">
              KALCER GRAPHIC ATELIER & PRINTS
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Risograph experimentation, technical running apparel prints, brand typography, and risography catalog reflecting modern Indonesian street culture.
            </p>
          </div>
          <div>
            <Button variant="yellow" size="sm" className="font-mono">
              VIEW ARCHIVE // 87 CATALOGS
            </Button>
          </div>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockDesigns.map((design, idx) => (
            <Card
              key={design.id}
              elevation={1}
              interactive
              className="relative p-4 bg-white flex flex-col justify-between"
            >
              {/* Overlapping Tape Strip */}
              <div className="absolute -top-3 left-6 z-10">
                <TapeStrip
                  color={idx === 0 ? 'yellow' : idx === 1 ? 'cobalt' : 'orange'}
                  tilt={idx % 2 === 0 ? 'left' : 'right'}
                >
                  {design.categoryLabel}
                </TapeStrip>
              </div>

              <div>
                {/* Visual Area */}
                <div className="relative w-full aspect-[4/5] bg-paper-technical border-2 border-carbon overflow-hidden mt-2">
                  <Image
                    src={design.coverImage}
                    alt={design.title}
                    fill
                    className="object-contain p-4 pixelated hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-carbon text-white font-mono text-[10px] px-2 py-0.5">
                    {design.printMedium}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-carbon-muted">
                      {design.dimensions}
                    </span>
                    <span className="font-mono text-xs font-bold text-kalcer-orange">
                      {design.year}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-carbon leading-snug">
                    {design.title}
                  </h3>
                  <p className="font-body text-xs text-carbon/80 line-clamp-2">
                    {design.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 mt-4 border-t-2 border-carbon/10 flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-carbon-muted">
                  {design.edition || 'PROTOTYPE SPEC'}
                </span>
                <span className="flex items-center text-xs font-mono font-bold text-kalcer-cobalt group-hover:underline">
                  INSPECT SPEC <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
