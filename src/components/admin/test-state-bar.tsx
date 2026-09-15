'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const TestStateBar: React.FC = () => {
  const [activeState, setActiveState] = useState('Normal');

  const states = ['Normal', 'Validation', 'Loading', 'Unsaved'];

  return (
    <div className="bg-paper-technical border-b-2 border-carbon px-6 py-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="font-display font-black text-sm uppercase tracking-wide text-carbon">
          DASHBOARD CONSOLE
        </span>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="text-carbon-muted font-bold text-[11px] uppercase mr-1">
          TEST STATE:
        </span>
        {states.map((st) => (
          <button
            key={st}
            onClick={() => setActiveState(st)}
            className={`px-2.5 py-0.5 border border-carbon font-semibold text-[11px] transition-colors ${
              activeState === st
                ? 'bg-carbon text-white font-bold'
                : 'bg-white text-carbon hover:bg-neutral-100'
            }`}
          >
            {st}
          </button>
        ))}
        <Link
          href="/admin/login"
          className="px-2.5 py-0.5 border border-carbon bg-white text-carbon hover:bg-kalcer-yellow text-[11px] font-bold"
        >
          → /login
        </Link>
      </div>
    </div>
  );
};
