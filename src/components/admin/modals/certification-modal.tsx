'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Certification } from '@/types';
import { X, Save, ShieldCheck } from 'lucide-react';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Certification>) => void;
  initialData?: Certification | null;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issuerCode, setIssuerCode] = useState('AWS');
  const [credentialId, setCredentialId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [category, setCategory] = useState('CLOUD & INFRA');
  const [timelineYear, setTimelineYear] = useState<number>(2024);
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setIssuer(initialData.issuer || '');
      setIssuerCode(initialData.issuerCode || 'AWS');
      setCredentialId(initialData.credentialId || '');
      setIssueDate(initialData.issueDate || '');
      setVerifyUrl(initialData.verifyUrl || initialData.verificationUrl || '');
      setCategory(initialData.category || 'CLOUD & INFRA');
      setTimelineYear(initialData.timelineYear || 2024);
      setDescription(initialData.description || '');
      setIsFeatured(Boolean(initialData.isFeatured || initialData.featured));
      setPublished(initialData.published ?? true);
    } else {
      setTitle('');
      setIssuer('');
      setIssuerCode('AWS');
      setCredentialId('CERT-' + Math.random().toString(36).substring(2, 8).toUpperCase());
      setIssueDate('OCT 2024');
      setVerifyUrl('https://aws.amazon.com/verification');
      setCategory('CLOUD & INFRA');
      setTimelineYear(2024);
      setDescription('');
      setIsFeatured(false);
      setPublished(true);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const certData: Partial<Certification> = {
      title,
      issuer,
      issuerCode,
      credentialId,
      issueDate,
      verifyUrl,
      verificationUrl: verifyUrl,
      category,
      timelineYear: Number(timelineYear),
      description,
      isFeatured,
      featured: isFeatured,
      published,
    };

    onSave(certData);
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
        <div className="p-4 bg-kalcer-yellow text-carbon flex items-center justify-between border-b-2 border-carbon shrink-0">
          <div className="flex items-center gap-2 font-display font-black text-base uppercase">
            <ShieldCheck className="w-5 h-5" />
            <span>{isEditing ? `Edit Credential // ${initialData?.title}` : 'Add Verified Credential'}</span>
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
          <Input
            label="CREDENTIAL TITLE"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. AWS Certified Solutions Architect - Associate"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="ISSUING AUTHORITY"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="Amazon Web Services"
              required
            />
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                ISSUER CODE
              </label>
              <select
                value={issuerCode}
                onChange={(e) => setIssuerCode(e.target.value)}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="AWS">AWS</option>
                <option value="META">META</option>
                <option value="COURSERA">COURSERA</option>
                <option value="OLYMPIAD">OLYMPIAD / KKI</option>
                <option value="HASHICORP">HASHICORP</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="CREDENTIAL ID"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              placeholder="e.g. AWS-PSA-990812"
              required
            />
            <Input
              label="ISSUE DATE"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              placeholder="OCT 2024"
              required
            />
          </div>

          <Input
            label="VERIFICATION URL"
            value={verifyUrl}
            onChange={(e) => setVerifyUrl(e.target.value)}
            placeholder="https://..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white text-carbon font-mono text-sm border-2 border-carbon rounded-sm focus:outline-none focus:border-kalcer-cobalt"
              >
                <option value="CLOUD & INFRA">CLOUD &amp; INFRA</option>
                <option value="WEB & FRONT-END">WEB &amp; FRONT-END</option>
                <option value="COMPETITIVE">COMPETITIVE</option>
                <option value="DESIGN & ATELIER">DESIGN &amp; ATELIER</option>
              </select>
            </div>
            <Input
              label="TIMELINE YEAR"
              type="number"
              value={timelineYear}
              onChange={(e) => setTimelineYear(Number(e.target.value))}
              required
            />
          </div>

          <Textarea
            label="DESCRIPTION & COMPETENCIES"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="High-availability VPC architectures, IAM security policies..."
          />

          <div className="pt-3 border-t border-carbon/10 flex items-center justify-between">
            <label className="flex items-center gap-2 font-mono text-xs font-bold text-carbon cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-kalcer-orange"
              />
              <span>★ FEATURE ON HOME CREDENTIALS</span>
            </label>

            <label className="flex items-center gap-2 font-mono text-xs font-bold text-carbon cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 accent-kalcer-emerald"
              />
              <span>✓ PUBLISH RECORD</span>
            </label>
          </div>

          <div className="p-4 bg-paper border-t-2 border-carbon flex items-center justify-end gap-2 -mx-6 -mb-6 mt-6">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
              <Save className="w-3.5 h-3.5" />
              {isEditing ? 'Save Credential' : 'Add Credential'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
