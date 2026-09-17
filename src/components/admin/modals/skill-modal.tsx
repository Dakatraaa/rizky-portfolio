'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Skill, SkillCategory } from '@/types';
import { X, Save, Cpu } from 'lucide-react';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Skill>) => void;
  initialData?: Skill | null;
}

export const SkillModal: React.FC<SkillModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('PROGRAMMING');
  const [categoryLabel, setCategoryLabel] = useState('LANGUAGES');
  const [proficiencyLevel, setProficiencyLevel] = useState('CORE DAILY DRIVER');
  const [benchmarkScore, setBenchmarkScore] = useState<number>(95);
  const [activeReposCount, setActiveReposCount] = useState<number>(12);
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Code');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCategory(initialData.category || 'PROGRAMMING');
      setCategoryLabel(initialData.categoryLabel || 'LANGUAGES');
      setProficiencyLevel(initialData.proficiencyLevel || 'CORE DAILY DRIVER');
      setBenchmarkScore(initialData.benchmarkScore || 90);
      setActiveReposCount(initialData.activeReposCount || 5);
      setDescription(initialData.description || '');
      setIconName(initialData.iconName || 'Code');
    } else {
      setName('');
      setCategory('PROGRAMMING');
      setCategoryLabel('LANGUAGES');
      setProficiencyLevel('CORE DAILY DRIVER');
      setBenchmarkScore(95);
      setActiveReposCount(14);
      setDescription('');
      setIconName('Code');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillData: Partial<Skill> = {
      name,
      category,
      categoryLabel: categoryLabel || category,
      proficiencyLevel,
      benchmarkScore: Number(benchmarkScore),
      activeReposCount: Number(activeReposCount),
      description,
      iconName: iconName || 'Code',
      connectedProjects: initialData?.connectedProjects || [],
    };

    onSave(skillData);
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
        <div className="p-4 bg-kalcer-cobalt text-white flex items-center justify-between border-b-2 border-carbon shrink-0">
          <div className="flex items-center gap-2 font-display font-black text-base uppercase">
            <Cpu className="w-5 h-5 text-kalcer-yellow" />
            <span>{isEditing ? `Edit Stack // ${initialData?.name}` : 'Add Technology Stack'}</span>
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
            label="TECHNOLOGY / TOOL NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. TypeScript / Node.js"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as SkillCategory;
                  setCategory(val);
                  setCategoryLabel(val.replace('_', ' '));
                }}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="PROGRAMMING">PROGRAMMING</option>
                <option value="WEB">WEB / FRONTEND</option>
                <option value="STORAGE_CLOUD">STORAGE &amp; CLOUD</option>
                <option value="DESIGN">DESIGN &amp; ATELIER</option>
                <option value="WORKFLOW">WORKFLOW &amp; CI/CD</option>
              </select>
            </div>

            <Input
              label="CATEGORY LABEL"
              value={categoryLabel}
              onChange={(e) => setCategoryLabel(e.target.value)}
              placeholder="CORE DAILY DRIVER"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="BENCHMARK SCORE (1-100)"
              type="number"
              min={1}
              max={100}
              value={benchmarkScore}
              onChange={(e) => setBenchmarkScore(Number(e.target.value))}
              required
            />
            <Input
              label="ACTIVE REPOS COUNT"
              type="number"
              min={0}
              value={activeReposCount}
              onChange={(e) => setActiveReposCount(Number(e.target.value))}
              required
            />
          </div>

          <Input
            label="PROFICIENCY TIER"
            value={proficiencyLevel}
            onChange={(e) => setProficiencyLevel(e.target.value)}
            placeholder="CORE DAILY DRIVER"
          />

          <Textarea
            label="TECHNICAL NOTES / APPLICATION"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Production architectural use cases..."
            required
          />

          <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2 -mx-6 -mb-6 mt-6">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
              <Save className="w-3.5 h-3.5" />
              {isEditing ? 'Save Stack' : 'Add Stack'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
