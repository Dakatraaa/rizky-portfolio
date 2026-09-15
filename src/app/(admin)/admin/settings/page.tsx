'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b-2.5 border-carbon">
        <div>
          <h1 className="font-display font-black text-2xl uppercase text-carbon tracking-tight">
            System Settings & Security
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-0.5">
            Configure metadata, caching headers, and admin console preferences.
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-1.5 font-mono">
          <Save className="w-3.5 h-3.5" /> Save Settings
        </Button>
      </div>

      <Card elevation={1} className="p-6 bg-white space-y-4">
        <Input label="SITE METADATA TITLE" defaultValue="Kalcer Studio // Ariesta Rizky — Informatics, Print & Telemetry" />
        <Input label="PRODUCTION CANONICAL URL" defaultValue="https://kalcer.studio" />
        <Input label="ADMIN ACCESS PASSCODE (DEMO ONLY)" type="password" defaultValue="kalcer2024" />
        <div className="pt-2 text-xs font-mono text-carbon-muted">
          Note: In production (Step 11F/Future), authentication will transition to secure encrypted session cookies.
        </div>
      </Card>
    </div>
  );
}
