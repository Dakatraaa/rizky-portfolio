import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { ContentItem } from '@/types';
import { ArrowUpRight } from 'lucide-react';

export interface ContentCardProps {
  item: ContentItem;
}

export const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  return (
    <Card elevation={1} interactive className="p-3 bg-white flex flex-col justify-between">
      <div>
        <div className="relative w-full aspect-video bg-paper-technical border-2 border-carbon overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-contain p-2 pixelated"
          />
          <div className="absolute top-2 left-2 bg-carbon text-white font-mono text-[9px] px-1.5 py-0.5">
            {item.metricHighlight}
          </div>
          <div className="absolute bottom-2 right-2 bg-white/90 border border-carbon text-carbon font-mono text-[9px] px-1.5 py-0.5">
            {item.readOrWatchTime}
          </div>
        </div>

        <div className="pt-3">
          <span className="font-mono text-[10px] text-kalcer-orange font-bold uppercase block">
            {item.platformTag}
          </span>
          <h4 className="font-display font-bold text-sm text-carbon mt-1 leading-snug">
            {item.title}
          </h4>
          <p className="font-body text-xs text-carbon-muted mt-1 line-clamp-2">
            {item.summary}
          </p>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-carbon/10 flex items-center justify-between">
        <span className="font-mono text-[10px] text-neutral-400">
          {item.publishDate}
        </span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold text-kalcer-cobalt flex items-center hover:underline"
        >
          DISPATCH <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>
    </Card>
  );
};
