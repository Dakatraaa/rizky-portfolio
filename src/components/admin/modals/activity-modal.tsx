'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Activity, ActivityCategory } from '@/types';
import { X, Save, Activity as ActivityIcon } from 'lucide-react';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Activity>) => void;
  initialData?: Activity | null;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ActivityCategory>('RUNNING');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [accentTag, setAccentTag] = useState('FIELD OPS');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  // Telemetry
  const [distanceKm, setDistanceKm] = useState<number | undefined>(undefined);
  const [paceMinPerKm, setPaceMinPerKm] = useState('');
  const [splitTime, setSplitTime] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setCategory(initialData.category || 'RUNNING');
      setDate(initialData.date || '');
      setLocation(initialData.location || '');
      setSummary(initialData.summary || '');
      setDescription(initialData.description || '');
      setAccentTag(initialData.accentTag || 'FIELD OPS');
      setStatus(initialData.status || 'PUBLISHED');
      setDistanceKm(initialData.telemetry?.distanceKm);
      setPaceMinPerKm(initialData.telemetry?.paceMinPerKm || '');
      setSplitTime(initialData.telemetry?.splitTime || '');
      setTagsInput(initialData.tags?.join(', ') || '');
    } else {
      setTitle('');
      setSlug('');
      setCategory('RUNNING');
      setDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase());
      setLocation('Jakarta, Indonesia');
      setSummary('');
      setDescription('');
      setAccentTag('FIELD OPS');
      setStatus('PUBLISHED');
      setDistanceKm(21.1);
      setPaceMinPerKm("4'48\"/KM");
      setSplitTime('1:41:20');
      setTagsInput('Half-Marathon, Pacing, Telemetry');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const autoSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const activityData: Partial<Activity> = {
      title,
      slug: autoSlug,
      category,
      date,
      location,
      summary,
      shortDescription: summary,
      description: description || summary,
      accentTag: accentTag || 'FIELD OPS',
      status,
      published: status !== 'DRAFT',
      tags,
      telemetry:
        distanceKm || paceMinPerKm
          ? {
              distanceKm: Number(distanceKm || 0),
              paceMinPerKm: paceMinPerKm || "5'00\"/KM",
              splitTime: splitTime || '00:00',
            }
          : undefined,
    };

    onSave(activityData);
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
        className="w-full max-w-2xl bg-white border-2 border-carbon overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        <div className="p-4 bg-kalcer-lime text-carbon flex items-center justify-between border-b-2 border-carbon shrink-0">
          <div className="flex items-center gap-2 font-display font-black text-base uppercase">
            <ActivityIcon className="w-5 h-5" />
            <span>{isEditing ? `Edit Activity // ${initialData?.title}` : 'Log New Field Dispatch'}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 hover:bg-carbon hover:text-white transition-colors border border-carbon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="DISPATCH TITLE"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sudirman CFD 21.1K Half-Marathon"
              required
            />
            <Input
              label="SLUG (URL PATH)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. sudirman-cfd-half-marathon"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ActivityCategory)}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="RUNNING">RUNNING</option>
                <option value="MARATHON">MARATHON</option>
                <option value="SPRINT">SPRINT</option>
                <option value="WORKSHOP">WORKSHOP</option>
                <option value="MEETUP">MEETUP</option>
                <option value="CODING">CODING HACKATHON</option>
                <option value="DESIGN">DESIGN CRITIQUE</option>
                <option value="UNIVERSITY">ACADEMIC</option>
              </select>
            </div>

            <Input
              label="EVENT DATE"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="OCT 20, 2024"
              required
            />

            <Input
              label="LOCATION"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Jakarta, ID"
              required
            />
          </div>

          <Textarea
            label="EXECUTIVE SUMMARY"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            placeholder="Key accomplishments and overview..."
            required
          />

          <Textarea
            label="FULL DISPATCH NOTES"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Field notes, pacing discipline, weather condition, route elevation..."
          />

          {/* Telemetry row */}
          <div className="pt-3 border-t border-carbon/10">
            <div className="font-mono text-xs font-bold uppercase text-kalcer-cobalt mb-2">
              // TELEMETRY &amp; PACING METRICS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="DISTANCE (KM)"
                type="number"
                step="0.01"
                value={distanceKm ?? ''}
                onChange={(e) => setDistanceKm(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="21.1"
              />
              <Input
                label="AVG PACE / KM"
                value={paceMinPerKm}
                onChange={(e) => setPaceMinPerKm(e.target.value)}
                placeholder="4'48&quot;/KM"
              />
              <Input
                label="FINISH / SPLIT TIME"
                value={splitTime}
                onChange={(e) => setSplitTime(e.target.value)}
                placeholder="1:41:20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="ACCENT BADGE"
              value={accentTag}
              onChange={(e) => setAccentTag(e.target.value)}
              placeholder="FIELD OPS"
            />
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                PUBLISH STATUS
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="PUBLISHED">✓ PUBLISHED</option>
                <option value="DRAFT">✎ DRAFT</option>
              </select>
            </div>
          </div>

          <Input
            label="TAGS (COMMA-SEPARATED)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Half-Marathon, Sub-145, Pacing"
          />

          <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2 -mx-6 -mb-6 mt-6">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
              <Save className="w-3.5 h-3.5" />
              {isEditing ? 'Save Activity' : 'Log Activity'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
