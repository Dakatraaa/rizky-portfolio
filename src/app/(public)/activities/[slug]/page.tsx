import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockActivities } from '@/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TapeStrip } from '@/components/ui/tape-strip';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Activity as ActivityIcon,
  Tag,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface ActivityDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return mockActivities.map((a) => ({
    slug: a.slug,
  }));
}

export function generateMetadata({ params }: ActivityDetailPageProps) {
  const activity = mockActivities.find((a) => a.slug === params.slug);
  if (!activity) {
    return { title: 'Activity Log Not Found // Kalcer Studio' };
  }
  return {
    title: `${activity.title} // Field Scrapbook // Kalcer Studio`,
    description: activity.summary,
  };
}

export default function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const activity = mockActivities.find((a) => a.slug === params.slug);

  if (!activity) {
    notFound();
  }

  const relatedActivities = mockActivities
    .filter((a) => a.id !== activity.id)
    .slice(0, 3);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-carbon hover:text-kalcer-orange transition-colors px-3 py-1.5 bg-white border-2 border-carbon brutal-press"
        >
          <ArrowLeft className="w-4 h-4" /> ← BACK TO FIELD SCRAPBOOK
        </Link>
        <span className="font-mono text-xs text-carbon-muted font-bold uppercase">
          LOG ID: {activity.id}
        </span>
      </div>

      {/* Main Header Dispatch Card */}
      <Card elevation={2} className="p-6 sm:p-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-8">
          <TapeStrip color="yellow" tilt="right">
            {activity.accentTag || 'FIELD OPS LOG'}
          </TapeStrip>
        </div>

        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="lime">{activity.category}</Badge>
            <span className="font-mono text-xs font-bold text-carbon-muted flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-kalcer-orange" /> {activity.date}
            </span>
            <span className="font-mono text-xs font-bold text-kalcer-cobalt flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {activity.location}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-carbon leading-tight uppercase">
            {activity.title}
          </h1>

          <p className="font-body text-base sm:text-lg text-carbon/90 leading-relaxed font-medium">
            {activity.description || activity.summary}
          </p>
        </div>
      </Card>

      {/* 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo Frame & Journal Entry */}
        <div className="lg:col-span-8 space-y-8">
          {/* Polaroid Snapshot Frame */}
          <Card elevation={2} className="p-4 sm:p-6 bg-white space-y-4">
            <div className="relative w-full h-[360px] sm:h-[480px] bg-paper-technical border-2 border-carbon overflow-hidden flex items-center justify-center">
              <Image
                src={activity.coverImage || activity.coverPhoto || '/mascot/mascot-runner.png'}
                alt={activity.title}
                fill
                priority
                className="object-contain p-4 pixelated select-none"
              />
              <div className="absolute bottom-3 right-3 bg-carbon text-white font-mono text-[10px] px-2 py-0.5">
                DISPATCH CAPTURE // {activity.date}
              </div>
            </div>

            {/* Gallery Thumbnails if available */}
            {activity.gallery && activity.gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activity.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] bg-paper border border-carbon overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      fill
                      className="object-contain p-2 pixelated"
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Full Journal Notes */}
          <Card elevation={1} className="p-6 bg-white space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-carbon">
              <Compass className="w-5 h-5 text-kalcer-orange" />
              <h2 className="font-display font-black text-xl text-carbon uppercase">
                DISPATCH FIELD JOURNAL &amp; LOG NOTES
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-carbon/90 leading-relaxed">
              {activity.summary}
            </p>
            <p className="font-body text-sm sm:text-base text-carbon/80 leading-relaxed">
              Logged directly from on-site field trials. Data points were recorded and cross-referenced with local telemetry hubs and athlete logs.
            </p>
          </Card>
        </div>

        {/* Right Column: Telemetry & Location Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Endurance Telemetry Card if available */}
          {activity.telemetry && (
            <Card elevation={2} className="p-5 bg-paper-dark text-white border-2 border-carbon space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-700 text-xs font-mono">
                <span className="text-kalcer-yellow flex items-center gap-1.5 font-bold">
                  <ActivityIcon className="w-3.5 h-3.5 text-kalcer-lime" /> PACE TELEMETRY
                </span>
                <span className="text-kalcer-lime font-bold">OFFICIAL SPLIT</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">DISTANCE</span>
                  <span className="font-bold text-white text-sm">{activity.telemetry.distanceKm} KM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">AVG PACE</span>
                  <span className="font-bold text-kalcer-orange text-sm">{activity.telemetry.paceMinPerKm}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">SPLIT TIME</span>
                  <span className="font-bold text-kalcer-yellow text-sm">{activity.telemetry.splitTime}</span>
                </div>
                {activity.telemetry.cadenceSpm && (
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">AVG CADENCE</span>
                    <span className="font-bold text-kalcer-lime">{activity.telemetry.cadenceSpm} SPM</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Location & Log Coordinates */}
          <Card elevation={1} className="p-5 bg-white space-y-3">
            <div className="font-mono text-xs font-bold uppercase text-carbon pb-2 border-b-2 border-carbon flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-kalcer-cobalt" /> LOCATION LOG
            </div>
            <div className="font-mono text-xs space-y-1">
              <div className="text-carbon font-bold">{activity.location}</div>
              <div className="text-carbon-muted">REGION: WEST JAVA / DKI JAKARTA</div>
              <div className="text-kalcer-emerald font-bold flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED FIELD DISPATCH
              </div>
            </div>
          </Card>

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <Card elevation={1} className="p-5 bg-white space-y-3">
              <div className="font-mono text-xs font-bold uppercase text-carbon-muted flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-carbon" /> ACTIVITY TAGS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activity.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-paper-technical border border-carbon text-xs font-mono text-carbon font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Related Logs */}
      {relatedActivities.length > 0 && (
        <div className="pt-8 space-y-4">
          <h2 className="font-display font-black text-2xl uppercase text-carbon pb-2 border-b-2 border-carbon">
            RELATED FIELD DISPATCHES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedActivities.map((rel) => (
              <Link
                key={rel.id}
                href={`/activities/${rel.slug}`}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
              >
                <Card elevation={1} interactive className="p-4 bg-white flex flex-col justify-between h-full">
                  <div className="relative w-full aspect-[4/3] bg-paper border-2 border-carbon overflow-hidden">
                    <Image
                      src={rel.coverImage || '/mascot/mascot-runner.png'}
                      alt={rel.title}
                      fill
                      className="object-contain p-2 pixelated group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="pt-3 space-y-1">
                    <span className="font-mono text-[10px] text-kalcer-orange font-bold uppercase">
                      {rel.category} // {rel.date}
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
