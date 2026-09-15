'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MascotRenderer, MascotPoseType } from '@/components/mascot/mascot-renderer';
import { SpeechBubble } from '@/components/mascot/speech-bubble';
import { mockMascotSettings } from '@/data';
import { Save, Bot, Sparkles, Volume2 } from 'lucide-react';

export default function AdminMascotPage() {
  const [activePose, setActivePose] = useState<MascotPoseType>('master');
  const [speech, setSpeech] = useState(mockMascotSettings.currentDialogue);

  const poses: { id: MascotPoseType; label: string }[] = [
    { id: 'master', label: 'Master Hero Front' },
    { id: 'runner-warmup', label: 'Runner Warmup' },
    { id: 'runner-sprint', label: 'Runner Sprint' },
    { id: 'developer-code', label: 'Developer Code' },
    { id: 'developer-idea', label: 'Developer Idea' },
    { id: 'interaction-wave', label: 'Interaction Wave' },
    { id: 'interaction-thumbsup', label: 'Thumbs Up' },
    { id: 'daily-coffee', label: 'Daily Coffee' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b-2.5 border-carbon">
        <div>
          <h1 className="font-display font-black text-2xl uppercase text-carbon tracking-tight">
            Mascot Telemetry & Behavioral Engine
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-0.5">
            Configure pixel mascot sprite poses, interactive dialogue scripts, and telemetry dock states.
          </p>
        </div>
        <Button variant="primary" size="sm" className="gap-1.5 font-mono">
          <Save className="w-3.5 h-3.5" /> Save Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Pose Selector & Settings */}
        <div className="lg:col-span-7 space-y-4">
          <Card elevation={1} className="p-4 bg-white space-y-4">
            <div className="font-mono text-xs font-bold uppercase text-carbon-muted">
              // ACTIVE POSE MATRIX
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {poses.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePose(p.id)}
                  className={`p-2.5 border-2 border-carbon text-left font-mono text-xs transition-all brutal-press ${
                    activePose === p.id
                      ? 'bg-kalcer-yellow text-carbon font-bold shadow-brutal-sm'
                      : 'bg-white text-carbon hover:bg-paper-technical'
                  }`}
                >
                  <div className="font-bold truncate">{p.label}</div>
                  <div className="text-[9px] text-carbon-muted uppercase mt-0.5">
                    {p.id.split('-')[0]}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-carbon/10 space-y-3">
              <Textarea
                label="LIVE SPEECH BUBBLE MESSAGE"
                value={speech}
                onChange={(e) => setSpeech(e.target.value)}
                rows={2}
              />

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <Input label="TELEMETRY VERSION" defaultValue={mockMascotSettings.telemetryVersion} />
                <Input label="STATUS BADGE LABEL" defaultValue={mockMascotSettings.statusLabel} />
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Live Interactive Sandbox Preview */}
        <div className="lg:col-span-5">
          <Card elevation={2} className="p-6 bg-paper-technical text-center space-y-4 relative">
            <div className="font-mono text-xs font-bold text-carbon-muted uppercase text-left">
              // LIVE CANVAS SIMULATION
            </div>

            <div className="py-6 flex flex-col items-center justify-center">
              <MascotRenderer pose={activePose} size="hero" interactive />
              <SpeechBubble message={speech} className="mt-4 max-w-xs text-left" />
            </div>

            <div className="pt-2 border-t border-carbon/20 flex items-center justify-between text-xs font-mono">
              <span className="text-carbon-muted">RENDERING: PIXELATED</span>
              <span className="text-kalcer-emerald font-bold">● ACTIVE ON DOCK</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
