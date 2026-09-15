import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stamp } from '@/components/ui/stamp';
import { TapeStrip } from '@/components/ui/tape-strip';
import { mockProfile } from '@/data';
import { ArrowRight, Coffee, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-8 pb-14 border-b-2.5 border-carbon">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Content & Telemetry) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <Stamp text="AVAILABLE FOR WORK" color="orange" tilt="left" />
            <span className="font-mono text-xs font-bold text-carbon-muted">
              // {mockProfile.statusBadge}
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-carbon uppercase">
            ENGINEERING SPEED.
            <br />
            <span className="text-kalcer-orange underline decoration-carbon decoration-4 underline-offset-4">
              PRINTING CHAOS.
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg text-carbon/90 leading-relaxed max-w-2xl">
            {mockProfile.bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href="#projects" variant="primary" size="lg" className="gap-2">
              EXPLORE PROJECTS <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="#skills" variant="secondary" size="lg">
              SKILLS & RIGS [28]
            </Button>
            <Button href="#contact" variant="terminal" size="md" className="gap-2">
              <Coffee className="w-4 h-4 text-kalcer-yellow" /> SPONSOR RUN/COFFEE
            </Button>
            <Button href="#certifications" variant="outline" size="sm" className="gap-1.5 border border-carbon font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-kalcer-cobalt" /> CERTIFICATIONS [6]
            </Button>
          </div>

          {/* Telemetry Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="bg-white border-2 border-carbon p-3 brutal-shadow-sm">
              <div className="font-mono text-[10px] font-bold text-carbon-muted uppercase">
                HALF RUN PACE
              </div>
              <div className="font-display font-black text-2xl text-carbon mt-1">
                {mockProfile.telemetry.halfRunPace}
              </div>
              <div className="font-mono text-[9px] text-kalcer-orange font-semibold mt-0.5">
                {mockProfile.telemetry.halfRunDistance}
              </div>
            </div>

            <div className="bg-white border-2 border-carbon p-3 brutal-shadow-sm">
              <div className="font-mono text-[10px] font-bold text-carbon-muted uppercase">
                WPM SPEED
              </div>
              <div className="font-display font-black text-2xl text-kalcer-cobalt mt-1">
                {mockProfile.telemetry.wpmTyping}
              </div>
              <div className="font-mono text-[9px] text-carbon-muted font-semibold mt-0.5">
                {mockProfile.telemetry.wpmPercentile}
              </div>
            </div>

            <div className="bg-white border-2 border-carbon p-3 brutal-shadow-sm">
              <div className="font-mono text-[10px] font-bold text-carbon-muted uppercase">
                GITHUB COMMITS
              </div>
              <div className="font-display font-black text-2xl text-carbon mt-1">
                {mockProfile.telemetry.githubCommitsYtd}
              </div>
              <div className="font-mono text-[9px] text-kalcer-emerald font-semibold mt-0.5">
                COMMITS / YTD
              </div>
            </div>

            <div className="bg-white border-2 border-carbon p-3 brutal-shadow-sm">
              <div className="font-mono text-[10px] font-bold text-carbon-muted uppercase">
                POSTER ARCHIVE
              </div>
              <div className="font-display font-black text-2xl text-kalcer-orange mt-1">
                {mockProfile.telemetry.posterArchiveCount}+
              </div>
              <div className="font-mono text-[9px] text-carbon-muted font-semibold mt-0.5">
                PRINTS & RISO DROPS
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Polaroid Profile Card & Telemetry) */}
        <div className="lg:col-span-5 relative mt-4 lg:mt-0">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <TapeStrip color="yellow" tilt="left">
              CODE CRAFT // INK ON PAPER
            </TapeStrip>
          </div>

          <Card elevation={2} className="p-4 bg-white relative">
            {/* Portrait Frame */}
            <div className="relative w-full aspect-[4/3] bg-paper-technical border-2 border-carbon overflow-hidden">
              <Image
                src="/mascot/mascot-master.png"
                alt="Ariesta Rizky Profile"
                fill
                priority
                className="object-contain p-4 pixelated"
              />
              <div className="absolute bottom-2 right-2">
                <span className="px-2 py-0.5 bg-kalcer-orange text-white font-mono text-[10px] font-extrabold uppercase border border-carbon shadow-sm">
                  KALCER STUDIO // INK
                </span>
              </div>
            </div>

            {/* Identity Plate */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-black text-xl text-carbon">
                  {mockProfile.nickname}
                </h2>
                <span className="font-mono text-[11px] font-bold text-kalcer-cobalt">
                  {mockProfile.location}
                </span>
              </div>
              <p className="font-body text-xs text-carbon-muted leading-relaxed">
                {mockProfile.degreeStatus}
              </p>
            </div>

            {/* Endurance Telemetry Bar */}
            <div className="mt-4 pt-3 border-t-2 border-carbon/10">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                <span className="flex items-center gap-1.5 text-carbon">
                  <span className="w-2 h-2 rounded-full bg-kalcer-lime animate-pulse" />
                  ENDURANCE CONDITION
                </span>
                <span className="text-kalcer-orange">
                  {mockProfile.telemetry.stravaConditionPercent}% // PACE: {mockProfile.telemetry.stravaPace}
                </span>
              </div>
              <div className="w-full h-2 bg-paper-technical border border-carbon mt-1.5 rounded-none overflow-hidden">
                <div
                  className="h-full bg-kalcer-lime border-r border-carbon"
                  style={{ width: `${mockProfile.telemetry.stravaConditionPercent}%` }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
