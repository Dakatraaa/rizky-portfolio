import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Certification } from '@/types';
import { ExternalLink } from 'lucide-react';

export interface CertificationCardProps {
  certification: Certification;
  featured?: boolean;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  featured = false,
}) => {
  if (featured) {
    return (
      <Card elevation={2} className="p-6 bg-white relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 bg-carbon text-white flex items-center justify-center font-display font-bold text-lg brutal-shadow-sm">
            {certification.issuerCode}
          </div>
          <Badge variant="cobalt">{certification.category}</Badge>
        </div>

        <h3 className="font-display font-black text-xl text-carbon leading-snug">
          {certification.title}
        </h3>
        <p className="font-mono text-xs text-carbon-muted mt-1">
          ISSUER: {certification.issuer} · {certification.issueDate}
        </p>

        <div className="mt-4 pt-3 border-t-2 border-carbon/10 flex items-center justify-between">
          <span className="font-mono text-[11px] text-carbon font-bold">
            ID: {certification.credentialId}
          </span>
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-kalcer-orange hover:underline"
          >
            VERIFY RECORD <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </Card>
    );
  }

  return (
    <div className="p-4 bg-white border-2 border-carbon brutal-shadow-sm flex flex-col justify-between">
      <div>
        <span className="font-mono text-[10px] font-bold text-kalcer-orange uppercase">
          {certification.issuer} · {certification.timelineYear}
        </span>
        <h4 className="font-display font-bold text-sm text-carbon mt-1 leading-snug">
          {certification.title}
        </h4>
      </div>
      <div className="mt-3 pt-2 border-t border-carbon/10 flex items-center justify-between font-mono text-[10px] text-carbon-muted">
        <span>{certification.category}</span>
        <span className="text-kalcer-emerald font-bold">VERIFIED</span>
      </div>
    </div>
  );
};
