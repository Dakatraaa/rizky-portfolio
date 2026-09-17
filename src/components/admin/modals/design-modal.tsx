'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Design, DesignCategory } from '@/types';
import { X, Save, Sparkles } from 'lucide-react';

interface DesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Design>) => void;
  initialData?: Design | null;
}

export const DesignModal: React.FC<DesignModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<DesignCategory>('POSTER');
  const [categoryLabel, setCategoryLabel] = useState('POSTER / PRINT');
  const [year, setYear] = useState<number>(2024);
  const [description, setDescription] = useState('');
  const [printMedium, setPrintMedium] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [edition, setEdition] = useState('');
  const [accentColor, setAccentColor] = useState('#FF4D00');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setCategory(initialData.category || 'POSTER');
      setCategoryLabel(initialData.categoryLabel || 'POSTER / PRINT');
      setYear(initialData.year || 2024);
      setDescription(initialData.description || '');
      setPrintMedium(initialData.printMedium || '');
      setDimensions(initialData.dimensions || '');
      setEdition(initialData.edition || '');
      setAccentColor(initialData.accentColor || '#FF4D00');
      setCoverImage(initialData.coverImage || '');
      setTagsInput(initialData.tags?.join(', ') || '');
      setIsFeatured(Boolean(initialData.isFeatured || initialData.featured));
      setPublished(initialData.published ?? true);
    } else {
      setTitle('');
      setSlug('');
      setCategory('POSTER');
      setCategoryLabel('POSTER / PRINT');
      setYear(2024);
      setDescription('');
      setPrintMedium('3-Color Risograph Print on Munken Lynx 240gsm');
      setDimensions('A2 (420 × 594 mm)');
      setEdition('Edition of 50 (Hand Numbered)');
      setAccentColor('#FF4D00');
      setCoverImage('/mascot/mascot-master.png');
      setTagsInput('Risograph, Typography, Neo-Brutalist');
      setIsFeatured(false);
      setPublished(true);
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

    const designData: Partial<Design> = {
      title,
      slug: autoSlug,
      category,
      categoryLabel: categoryLabel || category,
      year: Number(year),
      description,
      printMedium,
      dimensions,
      edition: edition || undefined,
      accentColor: accentColor || '#FF4D00',
      coverImage: coverImage || '/mascot/mascot-master.png',
      galleryImages: initialData?.galleryImages || [coverImage || '/mascot/mascot-master.png'],
      gallery: initialData?.gallery || [coverImage || '/mascot/mascot-master.png'],
      tags,
      isFeatured,
      featured: isFeatured,
      published,
    };

    onSave(designData);
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
        <div className="p-4 bg-kalcer-orange text-white flex items-center justify-between border-b-2 border-carbon shrink-0">
          <div className="flex items-center gap-2 font-display font-black text-base uppercase">
            <Sparkles className="w-5 h-5 text-kalcer-yellow" />
            <span>{isEditing ? `Edit Artwork // ${initialData?.title}` : 'Curate New Design Artifact'}</span>
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
            <Input
              label="ARTWORK TITLE"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunda Acid Vol. 2 — Folk Electro Poster"
              required
            />
            <Input
              label="SLUG (URL PATH)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. sunda-acid-poster-02"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as DesignCategory;
                  setCategory(val);
                  setCategoryLabel(val + ' / PRINT');
                }}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="POSTER">POSTER</option>
                <option value="APPAREL">APPAREL</option>
                <option value="JERSEY">JERSEY</option>
                <option value="T_SHIRT">T-SHIRT</option>
                <option value="PACKAGING">PACKAGING</option>
                <option value="LOGO">LOGO &amp; IDENTITY</option>
                <option value="RISO">RISO PRINT</option>
                <option value="EXPERIMENTAL">EXPERIMENTAL</option>
              </select>
            </div>

            <Input
              label="CATEGORY LABEL"
              value={categoryLabel}
              onChange={(e) => setCategoryLabel(e.target.value)}
              placeholder="POSTER / PRINT"
            />

            <Input
              label="RELEASE YEAR"
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              placeholder="2024"
              required
            />
          </div>

          <Textarea
            label="DESCRIPTION & ART CONCEPT"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Visual concept, typography inspiration, and print techniques..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="PRINT MEDIUM / SUBSTRATE"
              value={printMedium}
              onChange={(e) => setPrintMedium(e.target.value)}
              placeholder="e.g. 3-Color Risograph Print on Munken Lynx 240gsm"
            />
            <Input
              label="DIMENSIONS"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="e.g. A2 (420 × 594 mm)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="EDITION DETAILS"
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
              placeholder="e.g. Limited Edition of 50"
            />
            <Input
              label="ACCENT HEX COLOR"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#FF4D00"
            />
          </div>

          <Input
            label="TAGS (COMMA-SEPARATED)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Risograph, Typography, Folk Electronica"
          />

          <div className="pt-3 border-t border-carbon/10 flex items-center justify-between">
            <label className="flex items-center gap-2 font-mono text-xs font-bold text-carbon cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-kalcer-orange"
              />
              <span>★ FEATURE ON HOME ATELIER</span>
            </label>

            <label className="flex items-center gap-2 font-mono text-xs font-bold text-carbon cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 accent-kalcer-emerald"
              />
              <span>✓ PUBLISH TO PUBLIC WEBSITE</span>
            </label>
          </div>

          <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2 -mx-6 -mb-6 mt-6">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
              <Save className="w-3.5 h-3.5" />
              {isEditing ? 'Save Artwork' : 'Add Artwork'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
