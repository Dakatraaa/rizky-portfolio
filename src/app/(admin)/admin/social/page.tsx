'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockSocialLinks } from '@/data';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminSocialPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b-2.5 border-carbon">
        <div>
          <h1 className="font-display font-black text-2xl uppercase text-carbon tracking-tight">
            Social Channels & Platforms
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-0.5">
            Manage links, follower counts, and public channels.
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-1.5 font-mono">
          <Plus className="w-3.5 h-3.5" /> Add Channel
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSocialLinks.map((soc) => (
          <Card key={soc.id} elevation={1} className="p-4 bg-white flex items-center justify-between">
            <div>
              <div className="font-display font-black text-base text-carbon">{soc.label}</div>
              <div className="font-mono text-xs text-kalcer-cobalt font-semibold">{soc.handle}</div>
              <div className="font-mono text-[10px] text-carbon-muted mt-1">
                {soc.metricLabel}: <span className="font-bold text-carbon">{soc.metricValue}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
