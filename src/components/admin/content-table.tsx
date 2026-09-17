'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/feedback-state';
import { usePortfolioContent } from '@/context/content-context';
import { Search, ExternalLink, Edit } from 'lucide-react';

export const ContentTable: React.FC = () => {
  const { projects, designs, activities } = usePortfolioContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState('ALL');

  // Aggregated live items from content store
  const tableItems = [
    ...projects.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      taxonomy: 'PROJECT' as const,
      status: p.status,
      modified: p.updatedAt || 'Recent',
      viewUrl: `/projects/${p.slug}`,
      editUrl: `/admin/projects`,
    })),
    ...designs.map((d) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      taxonomy: 'DESIGN' as const,
      status: d.featured ? 'FEATURED' : d.published ? 'PUBLISHED' : 'DRAFT',
      modified: d.updatedAt || `${d.year}`,
      viewUrl: `/design/${d.slug}`,
      editUrl: `/admin/designs`,
    })),
    ...activities.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      taxonomy: 'ACTIVITY' as const,
      status: a.status,
      modified: a.date,
      viewUrl: `/activities/${a.slug}`,
      editUrl: `/admin/activities`,
    })),
  ];

  const filteredItems = tableItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTaxonomy =
      selectedTaxonomy === 'ALL' || item.taxonomy === selectedTaxonomy;
    return matchesSearch && matchesTaxonomy;
  });

  return (
    <Card elevation={1} className="bg-white overflow-hidden">
      {/* Table Filter Header */}
      <div className="p-4 border-b-2 border-carbon flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-paper-technical">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-carbon-muted" />
          <input
            type="text"
            placeholder="Filter title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-carbon text-xs font-mono rounded-sm focus:outline-none focus:border-kalcer-cobalt"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'PROJECT', 'DESIGN', 'ACTIVITY'].map((tax) => (
            <button
              key={tax}
              onClick={() => setSelectedTaxonomy(tax)}
              className={`px-2 py-1 text-[11px] font-mono font-bold border border-carbon transition-colors ${
                selectedTaxonomy === tax
                  ? 'bg-carbon text-white'
                  : 'bg-white text-carbon hover:bg-neutral-100'
              }`}
            >
              {tax}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table or Empty State */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No taxonomy items match your filter"
          description="Try clearing the search query or selecting a different taxonomy filter."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedTaxonomy('ALL');
          }}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-paper text-carbon-muted border-b-2 border-carbon uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">TITLE // SOURCE SLUG</th>
                <th className="p-3">STATUS SYSTEM</th>
                <th className="p-3">LAST MODIFIED</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-carbon/10">
              {filteredItems.map((row) => (
                <tr key={row.id} className="hover:bg-paper-technical/60 transition-colors">
                  <td className="p-3">
                    <div className="font-display font-bold text-sm text-carbon">
                      {row.title}
                    </div>
                    <div className="text-[10px] text-carbon-muted font-mono mt-0.5">
                      {row.slug} · <span className="text-kalcer-cobalt font-bold">[{row.taxonomy}]</span>
                    </div>
                  </td>

                  <td className="p-3">
                    {row.status === 'FEATURED' && (
                      <Badge variant="yellow" pill>
                        ★ FEATURED
                      </Badge>
                    )}
                    {row.status === 'PUBLISHED' && (
                      <Badge variant="emerald" pill>
                        ✓ PUBLISHED
                      </Badge>
                    )}
                    {row.status === 'DRAFT' && (
                      <Badge variant="default" pill>
                        ✎ DRAFT
                      </Badge>
                    )}
                  </td>

                  <td className="p-3 text-neutral-500 font-semibold">{row.modified}</td>

                  <td className="p-3 text-right space-x-2">
                    <Button
                      href={row.editUrl}
                      variant="secondary"
                      size="sm"
                      className="font-mono text-xs px-2.5 py-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Manage
                    </Button>
                    <Button
                      href={row.viewUrl}
                      target="_blank"
                      variant="outline"
                      size="sm"
                      className="font-mono text-xs px-2.5 py-1 border border-carbon"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-3 border-t-2 border-carbon bg-paper flex items-center justify-between text-xs font-mono text-carbon-muted">
        <span>Showing {filteredItems.length} items from live reactive store</span>
        <Button href="/admin/projects" variant="secondary" size="sm" className="font-mono text-xs">
          View All Content Archive
        </Button>
      </div>
    </Card>
  );
};


