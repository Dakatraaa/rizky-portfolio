'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';
import { X, Save, Plus, Trash2, Layers } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Project>) => void;
  initialData?: Project | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryTag, setCategoryTag] = useState('FLAGSHIP RIG');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'FEATURED' | 'PUBLISHED' | 'DRAFT'>('PUBLISHED');
  const [techStackInput, setTechStackInput] = useState('');
  const [latencyMs, setLatencyMs] = useState<number | undefined>(undefined);
  const [clusterCount, setClusterCount] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  // Case study
  const [caseStudyOverview, setCaseStudyOverview] = useState('');
  const [caseStudyArchitecture, setCaseStudyArchitecture] = useState('');
  const [challengesInput, setChallengesInput] = useState('');
  const [outcomesInput, setOutcomesInput] = useState('');
  const [keyFeaturesInput, setKeyFeaturesInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setCategoryTag(initialData.categoryTag || 'FLAGSHIP RIG');
      setHeadline(initialData.headline || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'PUBLISHED');
      setTechStackInput(initialData.techStack?.join(', ') || '');
      setLatencyMs(initialData.latencyMs);
      setClusterCount(initialData.clusterCount || '');
      setCoverImage(initialData.coverImage || '');
      setGithubUrl(initialData.githubUrl || '');
      setLiveUrl(initialData.liveUrl || '');

      setCaseStudyOverview(initialData.caseStudy?.overview || '');
      setCaseStudyArchitecture(initialData.caseStudy?.architecture || '');
      setChallengesInput(initialData.caseStudy?.challenges?.join('\n') || '');
      setOutcomesInput(initialData.caseStudy?.outcomes?.join('\n') || '');
      setKeyFeaturesInput(initialData.caseStudy?.keyFeatures?.join('\n') || '');
    } else {
      setTitle('');
      setSlug('');
      setCategoryTag('FLAGSHIP RIG');
      setHeadline('');
      setDescription('');
      setStatus('PUBLISHED');
      setTechStackInput('TypeScript, React, Rust, Tailwind CSS');
      setLatencyMs(12);
      setClusterCount('12 Nodes');
      setCoverImage('/mascot/mascot-master.png');
      setGithubUrl('https://github.com/Dakatraaa');
      setLiveUrl('');

      setCaseStudyOverview('');
      setCaseStudyArchitecture('');
      setChallengesInput('');
      setOutcomesInput('');
      setKeyFeaturesInput('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techStack = techStackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const challenges = challengesInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const outcomes = outcomesInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const keyFeatures = keyFeaturesInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const autoSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const projectData: Partial<Project> = {
      title,
      slug: autoSlug,
      categoryTag,
      category: categoryTag,
      headline,
      shortDescription: headline,
      description,
      status,
      published: status !== 'DRAFT',
      featured: status === 'FEATURED',
      techStack,
      technologies: techStack,
      latencyMs: latencyMs ? Number(latencyMs) : undefined,
      clusterCount: clusterCount || undefined,
      coverImage: coverImage || '/mascot/mascot-master.png',
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      caseStudy:
        caseStudyOverview || caseStudyArchitecture || challenges.length > 0
          ? {
              overview: caseStudyOverview,
              architecture: caseStudyArchitecture,
              challenges: challenges.length > 0 ? challenges : ['Zero downtime data migration.'],
              outcomes: outcomes.length > 0 ? outcomes : ['Achieved ultra low-latency telemetry processing.'],
              keyFeatures: keyFeatures.length > 0 ? keyFeatures : ['Dynamic sensor multiplexing.'],
            }
          : undefined,
    };

    onSave(projectData);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
    >
      <Card
        elevation={3}
        className="w-full max-w-3xl bg-white border-2 border-carbon overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-4 bg-kalcer-yellow text-carbon flex items-center justify-between border-b-2 border-carbon shrink-0">
          <div className="flex items-center gap-2 font-display font-black text-base uppercase">
            <Layers className="w-5 h-5" />
            <span>{isEditing ? `Edit Project // ${initialData?.title}` : 'Add New Computational Rig'}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 hover:bg-carbon hover:text-white transition-colors border border-carbon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="PROJECT TITLE"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. RunHub OS — Adaptive Telemetry Engine"
              required
            />
            <Input
              label="SLUG (URL PATH)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. runhub-os-telemetry"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                CATEGORY TAG
              </label>
              <select
                value={categoryTag}
                onChange={(e) => setCategoryTag(e.target.value)}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="FLAGSHIP RIG">FLAGSHIP RIG</option>
                <option value="SYSTEMS">SYSTEMS</option>
                <option value="AUDIO DSP">AUDIO DSP</option>
                <option value="CREATIVE TOOLS">CREATIVE TOOLS</option>
                <option value="TELEMETRY">TELEMETRY</option>
                <option value="RESEARCH">RESEARCH</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                PUBLISH STATUS
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="FEATURED">★ FEATURED</option>
                <option value="PUBLISHED">✓ PUBLISHED</option>
                <option value="DRAFT">✎ DRAFT</option>
              </select>
            </div>

            <Input
              label="LATENCY MS"
              type="number"
              value={latencyMs ?? ''}
              onChange={(e) => setLatencyMs(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="e.g. 12"
            />
          </div>

          <Input
            label="HEADLINE / SUBTITLE"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="High-throughput biometric engine"
            required
          />

          <Textarea
            label="DESCRIPTION"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Detailed overview of the engineering project..."
            required
          />

          <Input
            label="TECH STACK (COMMA-SEPARATED)"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            placeholder="TypeScript, Next.js, Rust, WebSockets"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="GITHUB REPOSITORY URL"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
            />
            <Input
              label="LIVE DEMO URL"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Deep Case Study Fields */}
          <div className="pt-4 border-t-2 border-carbon/10 space-y-4">
            <div className="font-mono text-xs font-bold text-kalcer-cobalt uppercase flex items-center gap-2">
              <span>// ARCHITECTURAL CASE STUDY DETAILS</span>
              <Badge variant="cobalt" pill>OPTIONAL DEEP DIVE</Badge>
            </div>

            <Textarea
              label="CASE STUDY OVERVIEW"
              value={caseStudyOverview}
              onChange={(e) => setCaseStudyOverview(e.target.value)}
              rows={2}
              placeholder="Core problem and architectural requirements..."
            />

            <Textarea
              label="ARCHITECTURE & SYSTEM BLUEPRINT"
              value={caseStudyArchitecture}
              onChange={(e) => setCaseStudyArchitecture(e.target.value)}
              rows={2}
              placeholder="Detailed tech topology and data flow pipeline..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Textarea
                label="ENGINEERING CHALLENGES (1 PER LINE)"
                value={challengesInput}
                onChange={(e) => setChallengesInput(e.target.value)}
                rows={3}
                placeholder="High-frequency sensor jitter&#10;Memory footprint constraints"
              />
              <Textarea
                label="MEASURABLE OUTCOMES (1 PER LINE)"
                value={outcomesInput}
                onChange={(e) => setOutcomesInput(e.target.value)}
                rows={3}
                placeholder="Reduced sensor latency by 45%&#10;Zero packet loss across 100K samples"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2 -mx-6 -mb-6 mt-6">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
              <Save className="w-3.5 h-3.5" />
              {isEditing ? 'Save Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
