'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Palette,
  Activity,
  Radio,
  Award,
  Cpu,
  GraduationCap,
  Share2,
  FolderArchive,
  Bot,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navGroups = [
    {
      title: 'CONTENT TAXONOMIES',
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, badge: 'HOME' },
        { name: 'Profile [Ariesta R.]', href: '/admin/profile', icon: User, badge: 'LEAD' },
        { name: 'Projects', href: '/admin/projects', icon: FolderGit2, badge: '12' },
        { name: 'Design Portfolio', href: '/admin/designs', icon: Palette, badge: '87' },
        { name: 'Activities / Scrapbook', href: '/admin/activities', icon: Activity, badge: '65' },
        { name: 'Creator Dispatches', href: '/admin/content', icon: Radio, badge: '85+' },
        { name: 'Certifications', href: '/admin/certifications', icon: Award, badge: '6' },
        { name: 'Skills & Tech Rigs', href: '/admin/skills', icon: Cpu, badge: '28' },
        { name: 'Experience & Edu', href: '/admin/experience', icon: GraduationCap, badge: '8' },
        { name: 'Social Channels', href: '/admin/social', icon: Share2, badge: '7' },
      ],
    },
    {
      title: 'SYSTEM MODULES',
      items: [
        { name: 'Media Library', href: '/admin/media', icon: FolderArchive, badge: '142' },
        { name: 'Mascot Telemetry', href: '/admin/mascot', icon: Bot, badge: 'ACTIVE' },
        { name: 'System Settings', href: '/admin/settings', icon: Settings, badge: 'v2.4' },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r-2.5 border-carbon flex flex-col justify-between h-[calc(100vh-53px)] sticky top-[53px] overflow-y-auto">
      {/* Navigation Links */}
      <div className="p-3 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <div className="font-mono text-[10px] font-bold text-carbon-muted uppercase tracking-wider px-2 mb-2">
              // {group.title}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-2.5 py-1.5 font-mono text-xs font-semibold rounded-sm transition-all ${
                    isActive
                      ? 'bg-carbon text-white shadow-brutal-sm font-bold'
                      : 'text-carbon hover:bg-paper-technical'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-kalcer-yellow' : 'text-carbon'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-none font-bold ${
                      isActive
                        ? 'bg-kalcer-yellow text-carbon'
                        : 'bg-paper-technical text-carbon-muted border border-carbon/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Storage Quota Widget */}
      <div className="p-3 border-t-2 border-carbon bg-paper-technical">
        <div className="bg-white border-2 border-carbon p-2.5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-carbon">
            <span>STORAGE ASSETS</span>
            <span>4.2 / 50 MB</span>
          </div>

          <div className="w-full h-2 bg-paper-technical border border-carbon overflow-hidden">
            <div className="h-full bg-kalcer-orange" style={{ width: '8.4%' }} />
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-carbon-muted">
            <span>142 assets</span>
            <span className="text-kalcer-emerald font-bold">● Blob sync active</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 px-1 text-[11px] font-mono font-bold">
          <Link href="/" target="_blank" className="text-kalcer-cobalt hover:underline flex items-center gap-1">
            kalcer.studio <ExternalLink className="w-3 h-3" />
          </Link>
          <Link href="/admin/login" className="text-red-600 hover:underline">
            [SIGN OUT]
          </Link>
        </div>
      </div>
    </aside>
  );
};
