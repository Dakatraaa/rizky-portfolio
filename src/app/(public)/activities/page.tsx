'use client';

import React, { useState } from 'react';
import { ActivityCard } from '@/components/public/cards/activity-card';
import { Badge } from '@/components/ui/badge';
import { usePortfolioContent } from '@/context/content-context';

export default function ActivitiesPage() {
  const { activities } = usePortfolioContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const publishedActivities = activities.filter((a) => a.published !== false && a.status !== 'DRAFT');

  const categories = [
    { id: 'ALL', label: `ALL FIELD LOGS [${publishedActivities.length}]` },
    { id: 'RUNNING', label: 'MARATHON & TRACK' },
    { id: 'CODING', label: 'SYSTEMS & DEMOS' },
    { id: 'WORKSHOP', label: 'ATELIER WORKSHOPS' },
    { id: 'UNIVERSITY', label: 'CAMPUS RESEARCH' },
    { id: 'MEETUP', label: 'COMMUNITY TALKS' },
  ];

  const filteredActivities =
    selectedCategory === 'ALL'
      ? publishedActivities
      : publishedActivities.filter((a) => a.category === selectedCategory);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="lime">FIELD ARCHIVE</Badge>
          <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
            {publishedActivities.length} FIELD OPS LOGS
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-carbon tracking-tight">
          DISPATCH LOGS // FIELD SCRAPBOOK
        </h1>
        <p className="font-body text-base text-carbon-muted max-w-2xl mt-2">
          Documenting endurance track splits, open-source architecture demos, tactile risograph workshops, and campus life across Jakarta and Bandung.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-carbon/10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 font-mono text-xs font-bold border-2 border-carbon whitespace-nowrap transition-all brutal-press ${
              selectedCategory === cat.id
                ? 'bg-carbon text-white shadow-brutal-sm'
                : 'bg-white text-carbon hover:bg-paper-technical'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3-Column Scrapbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredActivities.map((act, idx) => (
          <ActivityCard key={act.id} activity={act} index={idx} />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="p-12 text-center bg-white border-2 border-carbon brutal-shadow">
          <p className="font-mono text-sm text-carbon-muted">
            NO FIELD LOGS FOUND IN THIS CATEGORY.
          </p>
        </div>
      )}
    </div>
  );
}


