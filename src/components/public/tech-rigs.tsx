'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkillBadge } from '@/components/public/cards/skill-badge';
import { usePortfolioContent } from '@/context/content-context';
import { Skill } from '@/types';

export const TechRigs: React.FC = () => {
  const { skills } = usePortfolioContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (skills.length > 0 && !activeSkill) {
      setActiveSkill(skills[0]);
    } else if (skills.length > 0 && activeSkill) {
      const refreshed = skills.find((s) => s.id === activeSkill.id) || skills[0];
      setActiveSkill(refreshed);
    }
  }, [skills, activeSkill]);

  const categories = [
    { id: 'ALL', label: `ALL RIGS [${skills.length}]` },
    { id: 'PROGRAMMING', label: `PROGRAMMING [${skills.filter((s) => s.category === 'PROGRAMMING').length}]` },
    { id: 'WEB', label: `WEB ARCHITECTURE [${skills.filter((s) => s.category === 'WEB').length}]` },
    { id: 'STORAGE_CLOUD', label: `STORAGE & CLOUD [${skills.filter((s) => s.category === 'STORAGE_CLOUD').length}]` },
    { id: 'DESIGN', label: `DESIGN TOOLS [${skills.filter((s) => s.category === 'DESIGN').length}]` },
    { id: 'WORKFLOW', label: `WORKFLOW [${skills.filter((s) => s.category === 'WORKFLOW').length}]` },
  ];

  const filteredSkills =
    selectedCategory === 'ALL'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const currentActiveSkill = activeSkill || skills[0];

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
              HARDWARE RIGS, LANGUAGES &amp; CREATIVE INSTRUMENTS
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Zero arbitrary percentage bars. Instead, an interactive telemetry matrix of active production stacks, daily drivers, and systems architectures crafted for high-performance.
            </p>
          </div>
          <Badge variant="lime" pill>
            {skills.length} ACTIVE RIGS
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
            {filteredSkills.map((skill) => (
              <SkillBadge
                key={skill.id}
                skill={skill}
                isSelected={currentActiveSkill?.id === skill.id}
                onClick={() => setActiveSkill(skill)}
              />
            ))}
          </div>

          {/* Right: Inspector Detail Card */}
          {currentActiveSkill && (
            <div className="lg:col-span-5">
              <Card elevation={2} className="p-6 bg-white relative">
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-carbon">
                  <span className="font-mono text-xs font-bold uppercase text-carbon-muted">
                    // TELEMETRY INSPECTOR
                  </span>
                  <Badge variant="orange">{currentActiveSkill.proficiencyLevel}</Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-black text-2xl text-carbon">
                      {currentActiveSkill.name}
                    </h3>
                    <p className="font-mono text-xs text-kalcer-cobalt mt-0.5">
                      {currentActiveSkill.categoryLabel}
                    </p>
                  </div>

                  <p className="font-body text-sm text-carbon/90 leading-relaxed">
                    {currentActiveSkill.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 bg-paper-technical border border-carbon">
                      <div className="font-mono text-[10px] text-carbon-muted font-bold">
                        BENCHMARK SCORE
                      </div>
                      <div className="font-display font-black text-xl text-carbon mt-0.5">
                        {currentActiveSkill.benchmarkScore} / 100
                      </div>
                    </div>
                    <div className="p-2.5 bg-paper-technical border border-carbon">
                      <div className="font-mono text-[10px] text-carbon-muted font-bold">
                        ACTIVE REPOSITORIES
                      </div>
                      <div className="font-display font-black text-xl text-kalcer-orange mt-0.5">
                        {currentActiveSkill.activeReposCount}+ REPOS
                      </div>
                    </div>
                  </div>

                  {/* Connected Projects */}
                  {currentActiveSkill.connectedProjects && currentActiveSkill.connectedProjects.length > 0 && (
                    <div className="pt-2">
                      <div className="font-mono text-xs font-bold uppercase text-carbon-muted mb-1.5">
                        CONNECTED LAB RIGS:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentActiveSkill.connectedProjects.map((p, i) => (
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
          )}
        </div>
      </div>
    </section>
  );
};

