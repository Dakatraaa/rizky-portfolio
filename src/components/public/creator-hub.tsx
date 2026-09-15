'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockContentItems, mockSocialLinks } from '@/data';
import { Play, ArrowUpRight, Youtube, BookOpen, Twitter, Github, Activity } from 'lucide-react';

export const CreatorHub: React.FC = () => {
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
            BROADCAST STATUS: LIVE DISPATCHES
          </Badge>
        </div>

        {/* 4 Platform Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-4 bg-white border-2 border-carbon text-center brutal-shadow-sm">
            <div className="font-display font-black text-3xl text-carbon">04 RIGS</div>
            <div className="font-mono text-[10px] text-carbon-muted font-bold mt-1">
              CODE & DEV EXPERIMENTS
            </div>
          </div>
          <div className="p-4 bg-white border-2 border-carbon text-center brutal-shadow-sm">
            <div className="font-display font-black text-3xl text-kalcer-orange">85+ DROPS</div>
            <div className="font-mono text-[10px] text-carbon-muted font-bold mt-1">
              TACTILE PRINT & RISOGRAPH
            </div>
          </div>
          <div className="p-4 bg-white border-2 border-carbon text-center brutal-shadow-sm">
            <div className="font-display font-black text-3xl text-kalcer-cobalt">3 YEARS</div>
            <div className="font-mono text-[10px] text-carbon-muted font-bold mt-1">
              RUNNER&apos;S DIARY & TELEMETRY
            </div>
          </div>
          <div className="p-4 bg-white border-2 border-carbon text-center brutal-shadow-sm">
            <div className="font-display font-black text-3xl text-kalcer-lime">100%</div>
            <div className="font-mono text-[10px] text-carbon-muted font-bold mt-1">
              STUDENT INFORMATICS LIFE
            </div>
          </div>
        </div>

        {/* 4 Episode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockContentItems.map((item) => (
            <Card key={item.id} elevation={1} interactive className="p-3 bg-white flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-video bg-paper-technical border-2 border-carbon overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-contain p-2 pixelated"
                  />
                  <div className="absolute top-2 left-2 bg-carbon text-white font-mono text-[9px] px-1.5 py-0.5">
                    {item.metricHighlight}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/90 border border-carbon text-carbon font-mono text-[9px] px-1.5 py-0.5">
                    {item.readOrWatchTime}
                  </div>
                </div>

                <div className="pt-3">
                  <span className="font-mono text-[10px] text-kalcer-orange font-bold uppercase block">
                    {item.platformTag}
                  </span>
                  <h4 className="font-display font-bold text-sm text-carbon mt-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-body text-xs text-carbon-muted mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between">
                <span className="font-mono text-[10px] text-neutral-400">
                  {item.publishDate}
                </span>
                <span className="font-mono text-xs font-bold text-kalcer-cobalt flex items-center">
                  DISPATCH <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Social Presence Channels Grid */}
        <div className="pt-6 border-t-2 border-carbon/10">
          <div className="font-mono text-xs font-bold uppercase text-carbon-muted mb-3">
            // ACTIVE SOCIAL FREQUENCIES
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {mockSocialLinks.map((soc) => (
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
