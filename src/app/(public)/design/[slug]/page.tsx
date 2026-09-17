import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockDesigns } from '@/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TapeStrip } from '@/components/ui/tape-strip';
import { ArrowLeft, Maximize2, Tag, Calendar, Layers, Printer } from 'lucide-react';

interface DesignDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return mockDesigns.map((d) => ({
    slug: d.slug,
  }));
}

export function generateMetadata({ params }: DesignDetailPageProps) {
  const design = mockDesigns.find((d) => d.slug === params.slug);
  if (!design) {
    return { title: 'Design Not Found // Kalcer Studio' };
  }
  return {
    title: `${design.title} // Graphic Atelier // Kalcer Studio`,
    description: design.description,
  };
}

export default function DesignDetailPage({ params }: DesignDetailPageProps) {
  const design = mockDesigns.find((d) => d.slug === params.slug);

  if (!design) {
    notFound();
  }

  const relatedDesigns = mockDesigns
    .filter((d) => d.id !== design.id)
    .slice(0, 3);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/design"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-carbon hover:text-kalcer-orange transition-colors px-3 py-1.5 bg-white border-2 border-carbon brutal-press"
        >
          <ArrowLeft className="w-4 h-4" /> ← BACK TO DESIGN VAULT
        </Link>
        <span className="font-mono text-xs text-carbon-muted font-bold uppercase">
          CATALOG ID: {design.id}
        </span>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Preserved Aspect Ratio Image Frame */}
        <div className="lg:col-span-7">
          <Card elevation={2} className="p-4 sm:p-6 bg-white relative">
            <div className="absolute -top-3 left-8 z-10">
              <TapeStrip color="yellow" tilt="left">
                {design.categoryLabel}
              </TapeStrip>
            </div>

            {/* High-Res Artwork Frame with No Destructive Cropping */}
            <div className="relative w-full h-[400px] sm:h-[540px] bg-paper-technical border-2 border-carbon overflow-hidden flex items-center justify-center mt-2">
              <Image
                src={design.coverImage || design.fullImage || design.thumbnail || '/mascot/mascot-props.png'}
                alt={design.title}
                fill
                priority
                className="object-contain p-4 pixelated hover:scale-105 transition-transform duration-300 select-none"
              />
              <div className="absolute bottom-3 left-3 bg-carbon text-white font-mono text-[11px] px-2.5 py-1 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                {design.dimensions} // {design.aspectRatio || '1:1 RATIO'}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Spec Sheet & Editorial Description */}
        <div className="lg:col-span-5 space-y-6">
          <Card elevation={2} className="p-6 bg-white space-y-5">
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-carbon/10">
                <Badge variant="orange">{design.categoryLabel}</Badge>
                <span className="font-mono text-xs text-carbon-muted font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {design.year}
                </span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-carbon leading-tight uppercase">
                {design.title}
              </h1>
              <p className="font-mono text-xs text-kalcer-cobalt font-bold mt-1">
                EDITION: {design.edition || 'LIMITED RUN // ARCHIVE SPEC'}
              </p>
            </div>

            <p className="font-body text-sm sm:text-base text-carbon/90 leading-relaxed font-medium">
              {design.description}
            </p>

            {/* Substrate & Print Medium Specs */}
            <div className="p-4 bg-paper-technical border-2 border-carbon space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-carbon/10 text-carbon font-bold uppercase">
                <Printer className="w-4 h-4 text-kalcer-orange" />
                PRINT &amp; SUBSTRATE SPECIFICATION
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-carbon-muted">MEDIUM</span>
                  <span className="font-bold text-carbon text-right">{design.printMedium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-carbon-muted">DIMENSIONS</span>
                  <span className="font-bold text-carbon">{design.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-carbon-muted">ACCENT SPOT</span>
                  <span className="font-bold text-carbon flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full border border-carbon inline-block"
                      style={{ backgroundColor: design.accentColor }}
                    />
                    {design.accentColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Taxonomy Tags */}
            {design.tags && design.tags.length > 0 && (
              <div className="space-y-2">
                <div className="font-mono text-xs font-bold uppercase text-carbon-muted flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-carbon" /> TAXONOMY TAGS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {design.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-paper border border-carbon text-xs font-mono text-carbon font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiry Action */}
            <div className="pt-3 border-t-2 border-carbon/10">
              <Button href="/contact" variant="primary" size="md" className="w-full">
                COMMISSION ATELIER PRINT / MERCH →
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Related Archive Drops */}
      {relatedDesigns.length > 0 && (
        <div className="pt-8 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-carbon">
            <Layers className="w-5 h-5 text-kalcer-orange" />
            <h2 className="font-display font-black text-2xl uppercase text-carbon">
              OTHER ATELIER CATALOG DROPS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedDesigns.map((rel, idx) => (
              <Link
                key={rel.id}
                href={`/design/${rel.slug}`}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
              >
                <Card elevation={1} interactive className="p-4 bg-white flex flex-col justify-between h-full">
                  <div className="relative w-full aspect-[4/5] bg-paper-technical border-2 border-carbon overflow-hidden">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-contain p-4 pixelated group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="pt-3 space-y-1">
                    <span className="font-mono text-[10px] text-kalcer-orange font-bold uppercase">
                      {rel.categoryLabel}
                    </span>
                    <h3 className="font-display font-bold text-base text-carbon group-hover:text-kalcer-orange transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
