'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePortfolioContent } from '@/context/content-context';
import { Menu, X, FileText } from 'lucide-react';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/design', label: 'Design Gallery' },
  { href: '/#skills', label: 'Skills & Stacks', isAnchor: true },
  { href: '/certifications', label: 'Certifications' },
  { href: '/#creator', label: 'Creator', isAnchor: true },
  { href: '/activities', label: 'Activities' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const { profile } = usePortfolioContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const isActive = (href: string, isAnchor?: boolean) => {
    if (isAnchor) return false;
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

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
          <a
            href={profile.cvUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-kalcer-yellow flex items-center gap-1 px-1.5 py-0.5 border border-white/30 rounded-sm font-mono text-[10px]"
            title="Download CV"
          >
            <FileText className="w-3 h-3 text-kalcer-yellow" /> RESUME / CV
          </a>
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
        <Link href="/" className="flex items-center gap-2 group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon">
          <div className="w-8 h-8 bg-carbon text-white font-display font-extrabold flex items-center justify-center text-sm brutal-shadow-sm group-hover:bg-kalcer-orange transition-colors">
            AR
          </div>
          <div>
            <span className="font-display font-black tracking-tight text-base block leading-none text-carbon">
              KALCER STUDIO
            </span>
            <span className="font-mono text-[10px] tracking-wider text-carbon-muted block">
              {profile.name?.toUpperCase() || 'ARIESTA RIZKY'}
            </span>
          </div>
        </Link>

        {/* Availability Pill */}
        <div className="hidden md:flex items-center">
          <Badge variant="yellow" pill className="border-carbon">
            <span className="w-1.5 h-1.5 rounded-full bg-carbon animate-ping" />
            {profile.availability}
          </Badge>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-5 font-display font-bold text-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href, link.isAnchor);
            if (link.isAnchor) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-carbon hover:text-kalcer-orange transition-colors px-2 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon ${
                  active
                    ? 'bg-carbon text-white brutal-shadow-sm font-black'
                    : 'text-carbon hover:text-kalcer-orange hover:bg-paper-technical'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button href="/contact" variant="primary" size="sm" className="hidden sm:inline-flex">
            LET&apos;S TALK [AR]
          </Button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 bg-white border-2 border-carbon brutal-press hover:bg-paper-technical focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-carbon" />
            ) : (
              <Menu className="w-5 h-5 text-carbon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-carbon bg-white animate-slide-down overflow-hidden">
          <nav aria-label="Mobile Navigation" className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href, link.isAnchor);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 font-display font-bold text-sm border-b border-carbon/10 transition-all ${
                    active
                      ? 'bg-kalcer-yellow text-carbon font-black pl-4'
                      : 'text-carbon hover:bg-paper-technical hover:pl-4'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-[10px] text-carbon-muted">→</span>
                </Link>
              );
            })}

            {/* Mobile Resume Link */}
            <a
              href={profile.cvUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 font-display font-bold text-sm text-kalcer-cobalt border-b border-carbon/10 hover:bg-paper-technical"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> VIEW RESUME / CV
              </span>
              <span className="font-mono text-[10px]">PDF</span>
            </a>

            {/* Mobile CTA */}
            <div className="pt-3">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                LET&apos;S TALK [AR]
              </Button>
            </div>

            {/* Mobile Availability Badge */}
            <div className="pt-3 flex items-center justify-center">
              <Badge variant="yellow" pill className="border-carbon">
                <span className="w-1.5 h-1.5 rounded-full bg-carbon animate-ping" />
                {profile.availability}
              </Badge>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

