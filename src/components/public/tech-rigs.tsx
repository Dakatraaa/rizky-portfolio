'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockSkills } from '@/data';
import { Skill } from '@/types';
import { Terminal, Code, Cpu, Globe, Database, PenTool, CheckCircle2, ArrowRight } from 'lucide-react';

export const TechRigs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeSkill, setActiveSkill] = useState<Skill>(mockSkills[0]);

  const categories = [
    { id: 'ALL', label: `ALL RIGS [${mockSkills.length}]` },
    { id: 'PROGRAMMING', label: 'PROGRAMMING [5]' },
    { id: 'WEB', label: 'WEB ARCHITECTURE [4]' },
    { id: 'STORAGE_CLOUD', label: 'STORAGE & CLOUD [4]' },
    { id: 'DESIGN', label: 'DESIGN TOOLS [3]' },
    { id: 'WORKFLOW', label: 'WORKFLOW [2]' },
  ];

  const filteredSkills =
    selectedCategory === 'ALL'
      ? mockSkills
      : mockSkills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-14 border-b-2.5 border-carbon bg-paper">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-kalcer-orange text-white font-mono text-xs font-bold uppercase">
                SECTION 03
              </span>
              <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
                TACTICAL ARSENAL // TOOLING TELEMETRY
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-carbon tracking-tight">
              HARDWARE RIGS, LANGUAGES & CREATIVE INSTRUMENTS
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Zero arbitrary percentage bars. Instead, an interactive telemetry matrix of active production stacks, daily drivers, and systems architectures crafted for high-performance.
            </p>
          </div>
          <Badge variant="lime" pill>
            28 ACTIVE RIGS
          </Badge>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
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

        {/* 2-Column Matrix & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skill Chips Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  className={`p-3 text-left border-2 border-carbon rounded-sm transition-all brutal-press flex flex-col justify-between h-24 ${
                    isSelected
                      ? 'bg-kalcer-yellow text-carbon brutal-shadow-sm font-bold scale-[1.02]'
                      : 'bg-white text-carbon hover:bg-paper-technical'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] uppercase font-bold text-carbon-muted">
                      {skill.category}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-kalcer-orange" />
                    )}
                  </div>
                  <div className="font-display font-extrabold text-sm sm:text-base leading-snug">
                    {skill.name}
                  </div>
                  <div className="font-mono text-[10px] text-carbon-muted">
                    SCORE: {skill.benchmarkScore}/100
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Inspector Detail Card */}
          <div className="lg:col-span-5">
            <Card elevation={2} className="p-6 bg-white relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-carbon">
                <span className="font-mono text-xs font-bold uppercase text-carbon-muted">
                  // TELEMETRY INSPECTOR
                </span>
                <Badge variant="orange">{activeSkill.proficiencyLevel}</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-display font-black text-2xl text-carbon">
                    {activeSkill.name}
                  </h3>
                  <p className="font-mono text-xs text-kalcer-cobalt mt-0.5">
                    {activeSkill.categoryLabel}
                  </p>
                </div>

                <p className="font-body text-sm text-carbon/90 leading-relaxed">
                  {activeSkill.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 bg-paper-technical border border-carbon">
                    <div className="font-mono text-[10px] text-carbon-muted font-bold">
                      BENCHMARK SCORE
                    </div>
                    <div className="font-display font-black text-xl text-carbon mt-0.5">
                      {activeSkill.benchmarkScore} / 100
                    </div>
                  </div>
                  <div className="p-2.5 bg-paper-technical border border-carbon">
                    <div className="font-mono text-[10px] text-carbon-muted font-bold">
                      ACTIVE REPOSITORIES
                    </div>
                    <div className="font-display font-black text-xl text-kalcer-orange mt-0.5">
                      {activeSkill.activeReposCount}+ REPOS
                    </div>
                  </div>
                </div>

                {/* Connected Projects */}
                {activeSkill.connectedProjects && activeSkill.connectedProjects.length > 0 && (
                  <div className="pt-2">
                    <div className="font-mono text-xs font-bold uppercase text-carbon-muted mb-1.5">
                      CONNECTED LAB RIGS:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSkill.connectedProjects.map((p, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-paper-dark text-white font-mono text-xs rounded-none"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
