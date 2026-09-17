'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePortfolioContent } from '@/context/content-context';
import { RotateCcw, ExternalLink } from 'lucide-react';

export const TestStateBar: React.FC = () => {
  const { resetToDefaults, isHydrated } = usePortfolioContent();
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleReset = () => {
    if (resetConfirm) {
      resetToDefaults();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 4000);
    }
  };

  return (
    <div className="bg-paper-technical border-b-2 border-carbon px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="font-display font-black text-sm uppercase tracking-wide text-carbon">
          DASHBOARD CONSOLE
        </span>
        <span className="hidden sm:inline-block px-1.5 py-0.2 bg-kalcer-emerald/20 text-kalcer-emerald border border-kalcer-emerald/40 text-[10px] font-bold">
          {isHydrated ? '● PERSISTENCE ACTIVE' : '○ SYNCING'}
        </span>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs">
        <button
          onClick={handleReset}
          className={`px-2.5 py-1 border border-carbon text-[11px] font-bold flex items-center gap-1 transition-all ${
            resetConfirm
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-white text-carbon hover:bg-paper-technical'
          }`}
          title="Reset all localStorage mutations back to initial mock state"
        >
          <RotateCcw className="w-3 h-3" />
          {resetConfirm ? 'Click to Confirm Reset' : 'Reset to Defaults'}
        </button>

        <Link
          href="/"
          target="_blank"
          className="px-2.5 py-1 border border-carbon bg-kalcer-yellow text-carbon hover:bg-kalcer-orange hover:text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

