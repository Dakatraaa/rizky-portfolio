'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSkills } from '@/data';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminSkillsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b-2.5 border-carbon">
        <div>
          <h1 className="font-display font-black text-2xl uppercase text-carbon tracking-tight">
            Hardware Rigs & Stack Matrix
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-0.5">
            Curate programming languages, web systems, database infrastructure, and atelier instruments.
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-1.5 font-mono">
          <Plus className="w-3.5 h-3.5" /> Add Stack
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSkills.map((skill) => (
          <Card key={skill.id} elevation={1} className="p-4 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-carbon-muted uppercase">
                  {skill.category}
                </span>
                <Badge variant="lime">SCORE: {skill.benchmarkScore}</Badge>
              </div>
              <h3 className="font-display font-bold text-base text-carbon mt-1">{skill.name}</h3>
              <p className="font-body text-xs text-carbon-muted mt-1">{skill.description}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between font-mono text-xs">
              <span className="text-kalcer-orange font-bold">{skill.activeReposCount}+ Repos</span>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 border border-carbon bg-white hover:bg-kalcer-yellow">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 border border-carbon bg-white hover:bg-red-500 hover:text-white">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
