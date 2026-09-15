'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Bell, LogOut, ShieldCheck } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b-2.5 border-carbon sticky top-0 z-30">
      <div className="px-4 py-2 flex items-center justify-between gap-4">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-carbon text-white flex items-center justify-center font-display font-black text-sm brutal-shadow-sm">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm tracking-tight text-carbon">
                CMS MANAGER
              </span>
              <span className="px-1.5 py-0.2 bg-kalcer-yellow text-carbon font-mono text-[10px] font-bold border border-carbon">
                v2.4.D
              </span>
            </div>
            <span className="font-mono text-[9px] text-carbon-muted block">
              CONTENT ENGINE // KALCER LAB
            </span>
          </div>

          <div className="hidden md:flex items-center ml-4 pl-4 border-l-2 border-carbon/20">
            <Badge variant="yellow" pill>
              ADMIN ACCESS & AUTH
            </Badge>
          </div>
        </div>

        {/* Center: Quick Taxonomy Tabs */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-mono font-bold text-carbon">
          <Link href="/admin" className="px-2 py-1 bg-carbon text-white rounded-sm">
            Overview
          </Link>
          <Link href="/admin/projects" className="hover:text-kalcer-orange transition-colors">
            Projects (12)
          </Link>
          <Link href="/admin/designs" className="hover:text-kalcer-orange transition-colors">
            Designs (87)
          </Link>
          <Link href="/admin/activities" className="hover:text-kalcer-orange transition-colors">
            Activities (65)
          </Link>
          <Link href="/admin/media" className="hover:text-kalcer-orange transition-colors">
            Media Vault
          </Link>
          <Link href="/admin/mascot" className="hover:text-kalcer-orange transition-colors">
            Mascot
          </Link>
          <Link href="/admin/settings" className="hover:text-kalcer-orange transition-colors">
            Settings
          </Link>
        </nav>

        {/* Right: User profile & Preview Site CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs border border-carbon px-2.5 py-1 bg-paper-technical">
            <span className="w-2 h-2 rounded-full bg-kalcer-emerald" />
            <span className="font-bold text-carbon">Ariesta R. (Lead)</span>
          </div>

          <Link href="/" target="_blank">
            <Button variant="yellow" size="sm" className="gap-1.5 font-display font-bold">
              Preview Site <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>

          <Link href="/admin/login">
            <button
              title="Sign Out"
              className="p-1.5 bg-paper-technical border border-carbon text-carbon hover:bg-red-500 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
