'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProfile } from '@/data';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b-2.5 border-carbon">
      {/* Top Meta Coordinate Bar */}
      <div className="bg-carbon text-white px-4 py-1 flex items-center justify-between text-[11px] font-mono tracking-wider overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-3">
          <span className="text-kalcer-yellow font-bold">RIZKY PROFILE</span>
          <span className="text-neutral-400">//</span>
          <span>CITY: JAKARTA</span>
          <span className="text-neutral-400">//</span>
          <span>TIME: GMT+7</span>
          <span className="text-neutral-400">//</span>
          <span className="text-kalcer-lime">v2.4-PROD-STITCH</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-kalcer-emerald animate-pulse" />
            <span className="text-neutral-300">SYSTEM STATUS: OPTIMAL</span>
          </span>
          <Link
            href="/admin"
            className="text-kalcer-yellow hover:underline font-bold px-1.5 py-0.5 border border-kalcer-yellow/40 rounded-sm"
          >
            ADMIN CMS →
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 group select-none">
          <div className="w-8 h-8 bg-carbon text-white font-display font-extrabold flex items-center justify-center text-sm brutal-shadow-sm group-hover:bg-kalcer-orange transition-colors">
            AR
          </div>
          <div>
            <span className="font-display font-black tracking-tight text-base block leading-none text-carbon">
              KALCER STUDIO
            </span>
            <span className="font-mono text-[10px] tracking-wider text-carbon-muted block">
              ARIESTA RIZKY
            </span>
          </div>
        </Link>

        {/* Availability Pill */}
        <div className="hidden md:flex items-center">
          <Badge variant="yellow" pill className="border-carbon">
            <span className="w-1.5 h-1.5 rounded-full bg-carbon animate-ping" />
            {mockProfile.availability}
          </Badge>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 font-display font-bold text-sm">
          <a href="#projects" className="text-carbon hover:text-kalcer-orange transition-colors">
            Projects
          </a>
          <a href="#designs" className="text-carbon hover:text-kalcer-orange transition-colors">
            Design Gallery
          </a>
          <a
            href="#skills"
            className="px-2.5 py-1 bg-carbon text-white rounded-sm hover:bg-neutral-800 transition-colors"
          >
            Skills & Stacks
          </a>
          <a href="#certifications" className="text-carbon hover:text-kalcer-orange transition-colors">
            Certifications
          </a>
          <a href="#creator" className="text-carbon hover:text-kalcer-orange transition-colors">
            Creator
          </a>
          <a href="#activities" className="text-carbon hover:text-kalcer-orange transition-colors">
            Activities
          </a>
          <a href="#contact" className="text-carbon hover:text-kalcer-orange transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <a href="#contact">
            <Button variant="primary" size="sm">
              LET&apos;S TALK [AR]
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
