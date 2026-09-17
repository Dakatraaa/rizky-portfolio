'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Design } from '@/types';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface DesignLightboxProps {
  design: Design | null;
  designs: Design[];
  onClose: () => void;
  onSelect: (design: Design) => void;
}

export const DesignLightbox: React.FC<DesignLightboxProps> = ({
  design,
  designs,
  onClose,
  onSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!design) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = designs.findIndex((d) => d.id === design.id);
        const nextIndex = (currentIndex + 1) % designs.length;
        onSelect(designs[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = designs.findIndex((d) => d.id === design.id);
        const prevIndex = (currentIndex - 1 + designs.length) % designs.length;
        onSelect(designs[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [design, designs, onClose, onSelect]);

  if (!design) return null;

  const currentIndex = designs.findIndex((d) => d.id === design.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + designs.length) % designs.length;
    onSelect(designs[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % designs.length;
    onSelect(designs[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-carbon/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={design.title}
    >
      <div
        className="bg-white border-3 border-carbon brutal-shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-white border-2 border-carbon brutal-press hover:bg-kalcer-orange hover:text-white"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left / Artwork Display Container */}
        <div className="md:w-3/5 bg-paper-technical p-6 flex flex-col items-center justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-carbon min-h-[320px] sm:min-h-[440px]">
          {/* Previous / Next Arrow Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white border-2 border-carbon brutal-press hover:bg-kalcer-yellow z-20"
            aria-label="Previous artwork"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white border-2 border-carbon brutal-press hover:bg-kalcer-yellow z-20"
            aria-label="Next artwork"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Preserved Aspect Ratio Image Display */}
          <div className="relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
            <Image
              src={design.coverImage || design.fullImage || design.thumbnail || '/mascot/mascot-props.png'}
              alt={design.title}
              fill
              className="object-contain p-2 pixelated select-none"
              priority
            />
          </div>

          <div className="absolute bottom-3 left-4 font-mono text-[11px] text-carbon-muted font-bold flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5" />
            {design.dimensions} // {design.aspectRatio || 'PRESERVED RATIO'}
          </div>
        </div>

        {/* Right / Artwork Metadata Sidebar */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="orange">{design.categoryLabel}</Badge>
              <span className="font-mono text-xs font-bold text-carbon-muted">
                [{currentIndex + 1} / {designs.length}]
              </span>
            </div>

            <div>
              <span className="font-mono text-xs text-kalcer-cobalt font-bold block">
                YEAR: {design.year} // {design.edition || 'LIMITED EDITION'}
              </span>
              <h2 className="font-display font-black text-2xl text-carbon mt-1 leading-tight">
                {design.title}
              </h2>
            </div>

            <p className="font-body text-sm text-carbon/90 leading-relaxed">
              {design.description}
            </p>

            {/* Print Medium Specs */}
            <div className="p-3 bg-paper-technical border border-carbon space-y-1.5 font-mono text-xs">
              <div className="text-[10px] text-carbon-muted uppercase font-bold">
                PRINT MEDIUM &amp; SUBSTRATE
              </div>
              <div className="font-bold text-carbon">
                {design.printMedium}
              </div>
            </div>

            {/* Tags */}
            {design.tags && design.tags.length > 0 && (
              <div>
                <div className="font-mono text-[10px] text-carbon-muted uppercase font-bold mb-1.5">
                  TAXONOMY TAGS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {design.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-paper border border-carbon text-xs font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lightbox Footer Actions */}
          <div className="pt-4 border-t-2 border-carbon/10 flex items-center justify-between font-mono text-xs">
            <span className="text-carbon-muted">
              Use ← → keys to navigate
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-carbon text-white font-bold hover:bg-neutral-800 transition-colors"
            >
              CLOSE [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
