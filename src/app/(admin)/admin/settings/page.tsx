'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolioContent } from '@/context/content-context';
import { Save, RotateCcw, Check, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const { resetToDefaults } = usePortfolioContent();
  const [siteTitle, setSiteTitle] = useState(
    'Kalcer Studio // Ariesta Rizky — Informatics, Print & Telemetry'
  );
  const [canonicalUrl, setCanonicalUrl] = useState('https://kalcer.studio');
  const [passcode, setPasscode] = useState('kalcer2024');
  const [savedNotice, setSavedNotice] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    resetToDefaults();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center justify-between pb-4 border-b-2.5 border-carbon gap-3">
        <div>
          <h1 className="font-display font-black text-2xl uppercase text-carbon tracking-tight flex items-center gap-2">
            <Shield className="w-6 h-6 text-kalcer-cobalt" />
            System Settings &amp; Security
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-0.5">
            Configure metadata, mock persistence storage, and admin console preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="px-2.5 py-1 bg-kalcer-emerald text-white font-mono text-xs font-bold flex items-center gap-1 animate-in fade-in">
              <Check className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
          {resetNotice && (
            <span className="px-2.5 py-1 bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-1 animate-in fade-in">
              <RotateCcw className="w-3.5 h-3.5" /> Store Reset!
            </span>
          )}
          <Button variant="primary" size="sm" onClick={handleSave} className="gap-1.5 font-mono">
            <Save className="w-3.5 h-3.5" /> Save Settings
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <Card elevation={1} className="p-6 bg-white space-y-4">
          <Input
            label="SITE METADATA TITLE"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
          />
          <Input
            label="PRODUCTION CANONICAL URL"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
          />
          <Input
            label="ADMIN ACCESS PASSCODE (DEMO ONLY)"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <div className="pt-2 text-xs font-mono text-carbon-muted">
            Note: In production (Step 11F/Step 11H), authentication will transition to secure encrypted session tokens.
          </div>

          <div className="pt-4 border-t border-carbon/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-mono text-xs font-bold uppercase text-carbon">
                RESET STORE TO DEFAULT MOCK
              </div>
              <div className="font-mono text-[11px] text-carbon-muted">
                Clears all custom changes in localStorage and restores initial data.
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleReset}
              className="gap-1.5 font-mono text-xs text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Local State
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

