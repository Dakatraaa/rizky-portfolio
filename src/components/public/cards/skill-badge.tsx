import React from 'react';
import { Skill } from '@/types';
import { cn } from '@/lib/utils';

export interface SkillBadgeProps {
  skill: Skill;
  isSelected?: boolean;
  onClick?: () => void;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'p-3 text-left border-2 border-carbon rounded-sm transition-all brutal-press flex flex-col justify-between h-24 select-none',
        isSelected
          ? 'bg-kalcer-yellow text-carbon brutal-shadow-sm font-bold scale-[1.02]'
          : 'bg-white text-carbon hover:bg-paper-technical'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-mono text-[9px] uppercase font-bold text-carbon-muted">
          {skill.category}
        </span>
        {isSelected && <span className="w-2 h-2 rounded-full bg-kalcer-orange" />}
      </div>
      <div className="font-display font-extrabold text-sm sm:text-base leading-snug">
        {skill.name}
      </div>
      <div className="font-mono text-[10px] text-carbon-muted">
        SCORE: {skill.benchmarkScore}/100
      </div>
    </button>
  );
};
