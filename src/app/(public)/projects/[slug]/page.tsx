import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockProjects } from '@/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TapeStrip } from '@/components/ui/tape-strip';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Cpu,
} from 'lucide-react';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return mockProjects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ProjectDetailPageProps) {
  const project = mockProjects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: 'Project Not Found // Kalcer Studio' };
  }
  return {
    title: `${project.title} // Lab Case Study // Kalcer Studio`,
    description: project.headline || project.description,
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = mockProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const caseStudy = project.caseStudy;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 space-y-8">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-carbon hover:text-kalcer-orange transition-colors px-3 py-1.5 bg-white border-2 border-carbon brutal-press"
        >
          <ArrowLeft className="w-4 h-4" /> ← BACK TO PROJECT VAULT
        </Link>
        <span className="font-mono text-xs text-carbon-muted font-bold uppercase">
          PROJECT ID: {project.id}
        </span>
      </div>

      {/* Main Hero Header Card */}
      <Card elevation={2} className="p-6 sm:p-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-8">
          <TapeStrip color="yellow" tilt="right">
            {project.status === 'FEATURED' ? 'FLAGSHIP DEPLOYMENT' : 'SYSTEMS LOG'}
          </TapeStrip>
        </div>

        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="orange">{project.categoryTag || project.category || 'SYSTEMS'}</Badge>
            {project.year && (
              <Badge variant="cobalt">RELEASE {project.year}</Badge>
            )}
            <span className="font-mono text-xs text-carbon-muted font-bold">
              UPDATED: {project.updatedAt}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-carbon leading-tight uppercase">
            {project.title}
          </h1>

          <p className="font-body text-base sm:text-lg text-carbon/90 leading-relaxed font-medium">
            {project.headline || project.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="primary" size="md" className="gap-2">
                <ExternalLink className="w-4 h-4" /> LAUNCH LIVE RIG
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="secondary" size="md" className="gap-2 font-mono">
                <Github className="w-4 h-4" /> View Source Repository
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* 2-Column Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Deep Dive Case Study */}
        <div className="lg:col-span-8 space-y-8">
          {/* Executive Overview */}
          {caseStudy && (
            <Card elevation={1} className="p-6 bg-white space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-carbon">
                <span className="px-2 py-0.5 bg-kalcer-orange text-white font-mono text-xs font-bold uppercase">
                  CASE STUDY
                </span>
                <h2 className="font-display font-black text-xl text-carbon uppercase">
                  EXECUTIVE OVERVIEW
                </h2>
              </div>
              <p className="font-body text-sm sm:text-base text-carbon/90 leading-relaxed">
                {caseStudy.overview}
              </p>
            </Card>
          )}

          {/* Systems Architecture */}
          {caseStudy && (
            <Card elevation={1} className="p-6 bg-white space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-carbon">
                <Layers className="w-5 h-5 text-kalcer-cobalt" />
                <h2 className="font-display font-black text-xl text-carbon uppercase">
                  SYSTEMS ARCHITECTURE &amp; PIPELINE
                </h2>
              </div>
              <p className="font-body text-sm sm:text-base text-carbon/90 leading-relaxed">
                {caseStudy.architecture}
              </p>

              {/* Key Features List */}
              {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
                <div className="pt-3 space-y-2">
                  <div className="font-mono text-xs font-bold uppercase text-carbon-muted">
                    // CORE CAPABILITIES:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {caseStudy.keyFeatures.map((feat, idx) => (
                      <li
                        key={idx}
                        className="p-2.5 bg-paper-technical border border-carbon flex items-start gap-2 text-xs font-mono text-carbon"
                      >
                        <CheckCircle2 className="w-4 h-4 text-kalcer-emerald shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          )}

          {/* Engineering Challenges & Resolution */}
          {caseStudy && caseStudy.challenges && (
            <Card elevation={1} className="p-6 bg-white space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-carbon">
                <AlertTriangle className="w-5 h-5 text-kalcer-orange" />
                <h2 className="font-display font-black text-xl text-carbon uppercase">
                  ENGINEERING CHALLENGES OVERCOME
                </h2>
              </div>
              <div className="space-y-3">
                {caseStudy.challenges.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-paper-technical border-2 border-carbon flex items-start gap-3"
                  >
                    <span className="px-2 py-0.5 bg-carbon text-white font-mono text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <p className="font-body text-xs sm:text-sm text-carbon font-medium">
                      {ch}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Measurable Outcomes */}
          {caseStudy && caseStudy.outcomes && (
            <Card elevation={1} className="p-6 bg-white space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-carbon">
                <span className="px-2 py-0.5 bg-kalcer-lime text-carbon font-mono text-xs font-bold uppercase">
                  OUTCOMES
                </span>
                <h2 className="font-display font-black text-xl text-carbon uppercase">
                  MEASURABLE IMPACT &amp; VALIDATION
                </h2>
              </div>
              <ul className="space-y-2">
                {caseStudy.outcomes.map((out, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-paper border border-carbon flex items-start gap-2 text-xs sm:text-sm font-body text-carbon"
                  >
                    <span className="text-kalcer-emerald font-black font-mono">✓</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Right Column: Telemetry & Stack Specs Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Key Metrics Dashboard */}
          {caseStudy?.metrics && (
            <Card elevation={2} className="p-5 bg-white space-y-3">
              <div className="font-mono text-xs font-bold uppercase text-carbon-muted pb-2 border-b-2 border-carbon">
                // SYSTEM TELEMETRY BENCHMARKS
              </div>
              <div className="grid grid-cols-2 gap-2">
                {caseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 bg-paper-technical border border-carbon">
                    <div className="font-mono text-[9px] font-bold text-carbon-muted uppercase">
                      {m.label}
                    </div>
                    <div className="font-display font-black text-base text-carbon mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Telemetry Hardware Card */}
          {project.telemetryData && (
            <Card elevation={2} className="p-5 bg-paper-dark text-white border-2 border-carbon space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-700 text-xs font-mono">
                <span className="text-kalcer-yellow flex items-center gap-1.5 font-bold">
                  <Activity className="w-3.5 h-3.5 text-kalcer-lime" /> RUN SENSOR TELEMETRY
                </span>
                <span className="text-kalcer-emerald">ONLINE</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">ENGINE VERSION</span>
                  <span className="font-bold text-white">{project.telemetryData.runEngineVersion}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">PROTOCOL</span>
                  <span className="font-bold text-kalcer-cobalt">{project.telemetryData.sensorProtocol}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">UPTIME EDGE</span>
                  <span className="font-bold text-kalcer-emerald">{project.telemetryData.uptimePercent}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">AVG RECORDED PACE</span>
                  <span className="font-bold text-kalcer-orange">{project.telemetryData.avgPace}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Tech Stack Matrix */}
          <Card elevation={1} className="p-5 bg-white space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-carbon">
              <Cpu className="w-4 h-4 text-kalcer-orange" />
              <div className="font-mono text-xs font-bold uppercase text-carbon">
                COMPILED TECH STACK
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(project.technologies || project.techStack).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-paper-technical border-2 border-carbon text-xs font-mono font-bold text-carbon"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          {/* Project Discussion CTA */}
          <Card elevation={2} className="p-5 bg-kalcer-yellow border-2 border-carbon text-carbon space-y-3">
            <h3 className="font-display font-black text-lg uppercase">
              NEED A SIMILAR RIG?
            </h3>
            <p className="font-body text-xs leading-relaxed text-carbon/90">
              Ariesta is available for high-throughput systems advisory, offline Wasm architectures, and custom telemetry rigs.
            </p>
            <Button href="/contact" variant="primary" size="sm" className="w-full">
              TRANSMIT PROJECT SPECS →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
