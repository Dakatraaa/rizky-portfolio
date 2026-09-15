import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TapeStrip } from '@/components/ui/tape-strip';
import { Project } from '@/types';
import { Activity, ExternalLink, Github } from 'lucide-react';

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  if (featured) {
    return (
      <Card elevation={2} className="relative p-6 bg-white overflow-hidden">
        <div className="absolute top-0 right-8">
          <TapeStrip color="yellow" tilt="right">
            WORLD MARATHON 2024
          </TapeStrip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Project Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="orange">{project.categoryTag}</Badge>
              <Badge variant="cobalt">GO/FIBER ENGINE</Badge>
              <span className="font-mono text-xs font-bold text-carbon-muted">
                DEPLOYED // {project.latencyMs} MS LATENCY // {project.clusterCount}
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-carbon leading-tight">
              {project.title}
            </h3>

            <p className="font-body text-sm text-carbon/80 leading-relaxed">
              {project.description}
            </p>

            {/* Hardware & Spec Counter Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 bg-paper-technical border border-carbon">
                <div className="font-mono text-[9px] text-carbon-muted uppercase font-bold">
                  RUN ENGINE
                </div>
                <div className="font-mono text-xs font-bold text-carbon mt-0.5">
                  {project.telemetryData?.runEngineVersion}
                </div>
              </div>
              <div className="p-2.5 bg-paper-technical border border-carbon">
                <div className="font-mono text-[9px] text-carbon-muted uppercase font-bold">
                  SENSOR PROTO
                </div>
                <div className="font-mono text-xs font-bold text-carbon mt-0.5">
                  {project.telemetryData?.sensorProtocol}
                </div>
              </div>
              <div className="p-2.5 bg-paper-technical border border-carbon">
                <div className="font-mono text-[9px] text-carbon-muted uppercase font-bold">
                  UPTIME STATUS
                </div>
                <div className="font-mono text-xs font-bold text-kalcer-emerald mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-kalcer-emerald animate-pulse" />
                  {project.telemetryData?.uptimePercent}% on Edge
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  variant="primary"
                  size="md"
                  className="gap-2"
                >
                  REVIEW TECH MATRIX [01] <ExternalLink className="w-4 h-4" />
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  variant="secondary"
                  size="md"
                  className="gap-2 font-mono"
                >
                  <Github className="w-4 h-4" /> View Source
                </Button>
              )}
            </div>
          </div>

          {/* Right: Interactive Telemetry Graph Simulation */}
          <div className="lg:col-span-6 bg-paper-dark text-white border-2 border-carbon p-4 brutal-shadow rounded-sm relative">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-700 text-[11px] font-mono">
              <span className="text-kalcer-yellow flex items-center gap-1.5 font-bold">
                <Activity className="w-3.5 h-3.5 text-kalcer-lime" /> TELEMETRY PACKET // FIT STREAM 20HZ
              </span>
              <span className="text-neutral-400">28.4 MS AVG // 5732 SAMPLES</span>
            </div>

            <div className="relative w-full h-40 bg-neutral-900 border border-neutral-700 p-2 overflow-hidden flex items-end">
              <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none" aria-label="Pacing Telemetry Profile Chart">
                <defs>
                  <linearGradient id="telemetryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF5500" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF5500" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="400" y2="30" stroke="#333" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#333" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="400" y2="90" stroke="#333" strokeDasharray="3 3" />
                <path
                  d="M 0,100 Q 50,40 100,75 T 200,45 T 300,20 T 400,60 L 400,120 L 0,120 Z"
                  fill="url(#telemetryGrad)"
                />
                <path
                  d="M 0,100 Q 50,40 100,75 T 200,45 T 300,20 T 400,60"
                  fill="none"
                  stroke="#FF5500"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute top-3 left-3 font-mono text-[10px] text-neutral-400">
                PACE OSCILLATION PROFILE
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-neutral-800 text-center font-mono">
              <div>
                <div className="text-[10px] text-neutral-400">AVG SPLIT</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {project.telemetryData?.avgPace}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400">CADENCE</div>
                <div className="text-sm font-bold text-kalcer-yellow mt-0.5">
                  {project.telemetryData?.cadenceSpm} SPM
                </div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400">STRIDE</div>
                <div className="text-sm font-bold text-kalcer-lime mt-0.5">
                  {project.telemetryData?.strideLengthM} M
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card elevation={1} interactive className="p-4 bg-white flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant={project.status === 'FEATURED' ? 'yellow' : 'default'}>
            {project.categoryTag}
          </Badge>
          <span className="font-mono text-xs text-carbon-muted">{project.updatedAt}</span>
        </div>
        <h3 className="font-display font-bold text-lg text-carbon">{project.title}</h3>
        <p className="font-body text-xs text-carbon-muted line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-2 py-0.5 bg-paper-technical border border-carbon text-[10px] font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-carbon/10 flex items-center justify-between font-mono text-xs">
        <span className="text-carbon-muted">LATENCY: {project.latencyMs || 20}ms</span>
        {project.githubUrl && (
          <Button href={project.githubUrl} variant="outline" size="sm" className="font-mono text-xs gap-1 border border-carbon">
            <Github className="w-3.5 h-3.5" /> Source
          </Button>
        )}
      </div>
    </Card>
  );
};
