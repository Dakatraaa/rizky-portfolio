'use client';

import React, { useState } from 'react';
import { MascotRenderer, MascotPoseType } from './mascot-renderer';
import { SpeechBubble } from './speech-bubble';
import { usePortfolioContent } from '@/context/content-context';
import { Activity, MessageSquare, RefreshCw, X } from 'lucide-react';

export const MascotDock: React.FC = () => {
  const { mascotSettings } = usePortfolioContent();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const poseMap: Record<string, MascotPoseType> = {
    idle: 'master',
    runner: 'runner-warmup',
    developer: 'developer-code',
    trading: 'developer-idea',
    interaction: 'interaction-wave',
    daily: 'daily-coffee',
  };

  const initialPose: MascotPoseType = (mascotSettings?.activePose && poseMap[mascotSettings.activePose]) || 'master';
  const [currentPose, setCurrentPose] = useState<MascotPoseType>(initialPose);

  const dialogues = mascotSettings?.dialogueList && mascotSettings.dialogueList.length > 0
    ? mascotSettings.dialogueList
    : ['Halo! Saya Mas Rizky Mascot — Kalcer Studio AI Guide.'];

  const poses: MascotPoseType[] = [
    'master',
    'runner-warmup',
    'developer-code',
    'interaction-wave',
    'interaction-thumbsup',
  ];

  const nextDialogue = () => {
    setDialogueIndex((prev) => (prev + 1) % dialogues.length);
    setCurrentPose(poses[(dialogueIndex + 1) % poses.length]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Speech Bubble popup when open */}
      {isOpen && (
        <div className="mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <SpeechBubble
            message={dialogues[dialogueIndex % dialogues.length]}
            className="w-72"
          />
          <div className="flex gap-1 mt-1 justify-end">
            <button
              onClick={nextDialogue}
              className="px-2 py-0.5 bg-paper-technical border border-carbon text-[10px] font-mono font-bold flex items-center gap-1 hover:bg-white brutal-press"
            >
              <RefreshCw className="w-2.5 h-2.5" /> Next Tip
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-2 py-0.5 bg-white border border-carbon text-[10px] font-mono font-bold hover:bg-red-500 hover:text-white"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      )}

      {/* Dock Bar */}
      <div className="flex items-center gap-2 bg-white border-2.5 border-carbon brutal-shadow p-1.5 rounded-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2 py-1 bg-paper-technical border border-carbon rounded-sm hover:bg-kalcer-yellow transition-colors select-none text-left"
        >
          <MascotRenderer pose={currentPose} size="sm" className="w-7 h-7" />
          <div className="hidden sm:block">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-kalcer-emerald animate-pulse" />
              <span className="font-mono text-[10px] font-extrabold text-carbon">
                MASCOT TELEMETRY
              </span>
            </div>
            <span className="font-mono text-[9px] text-carbon-muted">
              {mascotSettings.telemetryVersion} · CLICK TO CHAT
            </span>
          </div>
        </button>

        <button
          onClick={nextDialogue}
          title="Trigger mascot reaction"
          className="p-1.5 bg-kalcer-orange text-white border border-carbon rounded-sm hover:bg-orange-600 brutal-press"
        >
          <Activity className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
