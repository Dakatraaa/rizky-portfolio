'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { ContentItem } from '@/types';
import { X, Save, Radio } from 'lucide-react';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ContentItem>) => void;
  initialData?: ContentItem | null;
}

export const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [platform, setPlatform] = useState<'YOUTUBE' | 'SUBSTACK' | 'TWITTER' | 'SPOTIFY' | 'INSTAGRAM' | 'TIKTOK'>('YOUTUBE');
  const [platformTag, setPlatformTag] = useState('EPISODE 04 // 4K');
  const [category, setCategory] = useState('DEVLOG');
  const [publishDate, setPublishDate] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [metricHighlight, setMetricHighlight] = useState('');
  const [readOrWatchTime, setReadOrWatchTime] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setPlatform(initialData.platform || 'YOUTUBE');
      setPlatformTag(initialData.platformTag || '');
      setCategory(initialData.category || 'DEVLOG');
      setPublishDate(initialData.publishDate || initialData.publicationDate || '');
      setUrl(initialData.url || initialData.externalUrl || '');
      setThumbnail(initialData.thumbnail || '');
      setMetricHighlight(initialData.metricHighlight || '');
      setReadOrWatchTime(initialData.readOrWatchTime || '');
      setSummary(initialData.summary || '');
      setStatus(initialData.status || 'PUBLISHED');
    } else {
      setTitle('');
      setSlug('');
      setPlatform('YOUTUBE');
      setPlatformTag('EPISODE 05 // 4K');
      setCategory('DEVLOG');
      setPublishDate('OCT 2024');
      setUrl('https://youtube.com/@kalcerstudio');
      setThumbnail('/mascot/mascot-master.png');
      setMetricHighlight('12.4K VIEWS');
      setReadOrWatchTime('18 MINS');
      setSummary('');
      setStatus('PUBLISHED');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const autoSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const contentData: Partial<ContentItem> = {
      title,
      slug: autoSlug,
      platform,
      platformTag,
      category,
      publishDate,
      publicationDate: publishDate,
      url,
      externalUrl: url,
      thumbnail: thumbnail || '/mascot/mascot-master.png',
      metricHighlight,
      readOrWatchTime,
      summary,
      status,
      published: status !== 'DRAFT',
    };

    onSave(contentData);
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
        className="w-full max-w-lg bg-white border-2 border-carbon overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        <div className="p-4 bg-kalcer-emerald text-white flex items-center justify-between border-b-2 border-carbon shrink-0">
          <div className="flex items-center gap-2 font-display font-black text-base uppercase">
            <Radio className="w-5 h-5 text-kalcer-yellow" />
            <span>{isEditing ? `Edit Dispatch // ${initialData?.title}` : 'Drop Creator Dispatch'}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 hover:bg-white hover:text-carbon transition-colors border border-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <Input
            label="DISPATCH TITLE"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Building a Direct BLE Sensor Kernel in WebAssembly"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                PLATFORM
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="YOUTUBE">YOUTUBE</option>
                <option value="SUBSTACK">SUBSTACK</option>
                <option value="TWITTER">TWITTER / X</option>
                <option value="SPOTIFY">SPOTIFY PODCAST</option>
                <option value="INSTAGRAM">INSTAGRAM</option>
              </select>
            </div>
            <Input
              label="PLATFORM TAG / EPISODE"
              value={platformTag}
              onChange={(e) => setPlatformTag(e.target.value)}
              placeholder="EPISODE 04 // 4K"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="CATEGORY"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="DEVLOG"
            />
            <Input
              label="PUBLISH DATE"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              placeholder="OCT 2024"
            />
            <Input
              label="READ/WATCH TIME"
              value={readOrWatchTime}
              onChange={(e) => setReadOrWatchTime(e.target.value)}
              placeholder="18 MINS"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="EXTERNAL URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/..."
              required
            />
            <Input
              label="METRIC HIGHLIGHT"
              value={metricHighlight}
              onChange={(e) => setMetricHighlight(e.target.value)}
              placeholder="14.8K VIEWS"
            />
          </div>

          <Textarea
            label="SUMMARY & TOPICS"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            placeholder="High-level breakdown of the broadcast or newsletter dispatch..."
            required
          />

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
              STATUS
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

          <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2 -mx-6 -mb-6 mt-6">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
              <Save className="w-3.5 h-3.5" />
              {isEditing ? 'Save Dispatch' : 'Drop Dispatch'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
