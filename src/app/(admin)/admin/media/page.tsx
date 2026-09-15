'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockMediaAssets } from '@/data';
import { Upload, Trash2, Eye } from 'lucide-react';

export default function AdminMediaPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b-2.5 border-carbon">
        <div>
          <h1 className="font-display font-black text-2xl uppercase text-carbon tracking-tight">
            Media Library & Vault
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-0.5">
            142 assets stored · Blob storage sync active (4.2 MB / 50 MB)
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-1.5 font-mono">
          <Upload className="w-3.5 h-3.5" /> Upload File
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockMediaAssets.map((asset) => (
          <Card key={asset.id} elevation={1} className="p-3 bg-white flex flex-col justify-between">
            <div className="relative w-full aspect-square bg-paper-technical border border-carbon overflow-hidden">
              <Image
                src={asset.url}
                alt={asset.name}
                fill
                className="object-contain p-2 pixelated"
              />
              <span className="absolute top-1.5 left-1.5 bg-carbon text-white font-mono text-[9px] px-1 py-0.2">
                {asset.sizeKb} KB
              </span>
            </div>

            <div className="pt-2">
              <div className="font-mono text-xs font-bold text-carbon truncate">{asset.name}</div>
              <div className="font-mono text-[10px] text-carbon-muted">{asset.dimensions}</div>
            </div>

            <div className="pt-2 mt-2 border-t border-carbon/10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-kalcer-emerald font-bold">ACTIVE</span>
              <div className="flex items-center gap-1">
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 border border-carbon hover:bg-neutral-100"
                >
                  <Eye className="w-3 h-3" />
                </a>
                <button className="p-1 border border-carbon hover:bg-red-500 hover:text-white">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
