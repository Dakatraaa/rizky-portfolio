'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { mockProfile } from '@/data';
import { Save, User } from 'lucide-react';

export default function AdminProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b-2.5 border-carbon">
        <div>
          <h1 className="font-display font-black text-2xl uppercase text-carbon tracking-tight">
            Profile & Telemetry Settings
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-0.5">
            Curate biographical details, telemetry pace metrics, and headline copy.
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-1.5 font-mono">
          <Save className="w-3.5 h-3.5" /> Save Changes
        </Button>
      </div>

      <Card elevation={1} className="p-6 bg-white space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="FULL NAME" defaultValue={mockProfile.name} />
          <Input label="NICKNAME // BRAND" defaultValue={mockProfile.nickname} />
          <Input label="LOCATION" defaultValue={mockProfile.location} />
          <Input label="CONTACT EMAIL" defaultValue={mockProfile.contactEmail} />
        </div>

        <Input label="HERO HEADLINE" defaultValue={mockProfile.headline} />
        <Textarea label="BIO COPY" defaultValue={mockProfile.bio} rows={3} />
        <Textarea label="DEGREE / STATUS DETAILS" defaultValue={mockProfile.degreeStatus} rows={2} />

        <div className="pt-4 border-t border-carbon/10">
          <div className="font-mono text-xs font-bold text-carbon-muted uppercase mb-3">
            // TELEMETRY COUNTERS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Input label="HALF RUN PACE" defaultValue={mockProfile.telemetry.halfRunPace} />
            <Input label="WPM TYPING SPEED" defaultValue={String(mockProfile.telemetry.wpmTyping)} />
            <Input label="GITHUB COMMITS" defaultValue={String(mockProfile.telemetry.githubCommitsYtd)} />
            <Input label="POSTER ARCHIVE" defaultValue={String(mockProfile.telemetry.posterArchiveCount)} />
          </div>
        </div>
      </Card>
    </div>
  );
}
