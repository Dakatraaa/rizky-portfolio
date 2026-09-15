'use client';

import React from 'react';
import Link from 'next/link';
import { mockProfile } from '@/data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-carbon text-white py-12 border-t-2.5 border-carbon">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-kalcer-orange text-white font-display font-extrabold flex items-center justify-center text-sm border border-white">
                AR
              </div>
              <span className="font-display font-black text-xl tracking-tight uppercase">
                KALCER STUDIO // LAB
              </span>
            </div>
            <p className="font-body text-xs text-neutral-400 max-w-md leading-relaxed">
              Synthesizing Indonesian street culture with neo-brutalist tactile computing and endurance running telemetry. Engineered from Jakarta to the world.
            </p>
            <div className="font-mono text-xs text-kalcer-yellow">
              JAKARTA LOCAL TIME: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} GMT+7
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-mono text-xs font-bold uppercase text-neutral-300">
              // REPOSITORY INDEX
            </div>
            <ul className="space-y-1.5 font-display text-sm">
              <li>
                <a href="#projects" className="text-neutral-400 hover:text-white transition-colors">
                  01 // Hardware Rigs
                </a>
              </li>
              <li>
                <a href="#designs" className="text-neutral-400 hover:text-white transition-colors">
                  02 // Graphic Atelier
                </a>
              </li>
              <li>
                <a href="#skills" className="text-neutral-400 hover:text-white transition-colors">
                  03 // Stack Matrix
                </a>
              </li>
              <li>
                <a href="#certifications" className="text-neutral-400 hover:text-white transition-colors">
                  04 // Credentials
                </a>
              </li>
              <li>
                <a href="#creator" className="text-neutral-400 hover:text-white transition-colors">
                  05 // Creator Dispatches
                </a>
              </li>
              <li>
                <a href="#activities" className="text-neutral-400 hover:text-white transition-colors">
                  06 // Field Logs
                </a>
              </li>
            </ul>
          </div>

          {/* System Portal */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-mono text-xs font-bold uppercase text-neutral-300">
              // ADMIN CONTROL
            </div>
            <p className="font-mono text-xs text-neutral-400">
              Access the Kalcer Studio Content Engine to curate taxonomies.
            </p>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-block px-3 py-1.5 bg-kalcer-yellow text-carbon font-mono text-xs font-bold border border-white hover:bg-yellow-300 transition-colors"
              >
                OPEN CMS MANAGER →
              </Link>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
          <div>
            © 2024–2026 {mockProfile.name}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>KALCER-SYSTEM-V2.4</span>
            <span className="text-kalcer-emerald">● ALL NODES OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
