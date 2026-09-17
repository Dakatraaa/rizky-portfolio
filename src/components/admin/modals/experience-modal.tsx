'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Experience } from '@/types';
import { X, Save, Briefcase } from 'lucide-react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Experience>) => void;
  initialData?: Experience | null;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [type, setType] = useState<Experience['type']>('WORK');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  const [location, setLocation] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setRole(initialData.role || '');
      setOrganization(initialData.organization || '');
      setType(initialData.type || 'WORK');
      setStartDate(initialData.startDate || '');
      setEndDate(initialData.endDate || '');
      setIsCurrent(Boolean(initialData.isCurrent));
      setLocation(initialData.location || '');
      setHighlightsInput(initialData.highlights?.join('\n') || '');
    } else {
      setRole('');
      setOrganization('');
      setType('WORK');
      setStartDate('2023');
      setEndDate('PRESENT');
      setIsCurrent(true);
      setLocation('Bandung, ID');
      setHighlightsInput('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const highlights = highlightsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const expData: Partial<Experience> = {
      role,
      organization,
      type,
      startDate,
      endDate: isCurrent ? 'PRESENT' : endDate,
      isCurrent,
      location,
      highlights,
    };

    onSave(expData);
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
        <div className="p-4 bg-kalcer-orange text-white flex items-center justify-between border-b-2 border-carbon shrink-0">
          <div className="flex items-center gap-2 font-display font-black text-base uppercase">
            <Briefcase className="w-5 h-5 text-kalcer-yellow" />
            <span>{isEditing ? `Edit Experience // ${initialData?.role}` : 'Add Experience Record'}</span>
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
            label="ROLE / DESIGNATION"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Lead Systems Engineer"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="ORGANIZATION / INSTITUTION"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Kalcer Studio / Lab"
              required
            />
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                TYPE
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="WORK">WORK</option>
                <option value="EDUCATION">EDUCATION</option>
                <option value="COMMUNITY">COMMUNITY</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="START DATE"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="2023"
              required
            />
            <Input
              label="END DATE"
              value={isCurrent ? 'PRESENT' : endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="PRESENT"
              disabled={isCurrent}
            />
            <Input
              label="LOCATION"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Bandung, ID"
              required
            />
          </div>

          <label className="flex items-center gap-2 font-mono text-xs font-bold text-carbon cursor-pointer">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              className="w-4 h-4 accent-kalcer-orange"
            />
            <span>CURRENTLY ACTIVE ROLE</span>
          </label>

          <Textarea
            label="HIGHLIGHTS & ACHIEVEMENTS (1 PER LINE)"
            value={highlightsInput}
            onChange={(e) => setHighlightsInput(e.target.value)}
            rows={3}
            placeholder="Architected offline-first database synchronization&#10;Mentored 12 junior software developers"
          />

          <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2 -mx-6 -mb-6 mt-6">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
              <Save className="w-3.5 h-3.5" />
              {isEditing ? 'Save Record' : 'Add Record'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
