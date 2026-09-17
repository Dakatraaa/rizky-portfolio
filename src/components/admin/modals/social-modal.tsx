'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SocialLink } from '@/types';
import { X, Save, Share2 } from 'lucide-react';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<SocialLink>) => void;
  initialData?: SocialLink | null;
}

export const SocialModal: React.FC<SocialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [platform, setPlatform] = useState<SocialLink['platform']>('GITHUB');
  const [label, setLabel] = useState('');
  const [handle, setHandle] = useState('');
  const [url, setUrl] = useState('');
  const [metricLabel, setMetricLabel] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [accentColor, setAccentColor] = useState('#0052FF');

  useEffect(() => {
    if (initialData) {
      setPlatform(initialData.platform || 'GITHUB');
      setLabel(initialData.label || '');
      setHandle(initialData.handle || '');
      setUrl(initialData.url || '');
      setMetricLabel(initialData.metricLabel || '');
      setMetricValue(initialData.metricValue || '');
      setAccentColor(initialData.accentColor || '#0052FF');
    } else {
      setPlatform('GITHUB');
      setLabel('GITHUB');
      setHandle('@Dakatraaa');
      setUrl('https://github.com/Dakatraaa');
      setMetricLabel('COMMITS YTD');
      setMetricValue('840+');
      setAccentColor('#0052FF');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const socialData: Partial<SocialLink> = {
      platform,
      label: label || platform,
      handle,
      url,
      metricLabel,
      metricValue,
      accentColor,
      displayOrder: initialData?.displayOrder || 1,
    };

    onSave(socialData);
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
        className="w-full max-w-md bg-white border-2 border-carbon overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        <div className="p-4 bg-kalcer-cobalt text-white flex items-center justify-between border-b-2 border-carbon shrink-0">
          <div className="flex items-center gap-2 font-display font-black text-base uppercase">
            <Share2 className="w-5 h-5 text-kalcer-yellow" />
            <span>{isEditing ? `Edit Channel // ${initialData?.label}` : 'Add Social Channel'}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                PLATFORM
              </label>
              <select
                value={platform}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setPlatform(val);
                  setLabel(val);
                }}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="GITHUB">GITHUB</option>
                <option value="LINKEDIN">LINKEDIN</option>
                <option value="STRAVA">STRAVA</option>
                <option value="YOUTUBE">YOUTUBE</option>
                <option value="SUBSTACK">SUBSTACK</option>
                <option value="TWITTER">TWITTER / X</option>
                <option value="INSTAGRAM">INSTAGRAM</option>
                <option value="TIKTOK">TIKTOK</option>
              </select>
            </div>
            <Input
              label="CHANNEL LABEL"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="GITHUB"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="USER HANDLE"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@Dakatraaa"
              required
            />
            <Input
              label="ACCENT HEX"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#0052FF"
            />
          </div>

          <Input
            label="TARGET PROFILE URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="METRIC LABEL"
              value={metricLabel}
              onChange={(e) => setMetricLabel(e.target.value)}
              placeholder="COMMITS YTD"
            />
            <Input
              label="METRIC VALUE"
              value={metricValue}
              onChange={(e) => setMetricValue(e.target.value)}
              placeholder="840+"
            />
          </div>

          <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2 -mx-6 -mb-6 mt-6">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
              <Save className="w-3.5 h-3.5" />
              {isEditing ? 'Save Channel' : 'Add Channel'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
