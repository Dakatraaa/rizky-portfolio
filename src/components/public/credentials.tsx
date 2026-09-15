'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCertifications } from '@/data';
import { Award, CheckCircle2, ExternalLink, Shield } from 'lucide-react';

export const Credentials: React.FC = () => {
  const featured = mockCertifications.filter((c) => c.isFeatured);
  const secondary = mockCertifications.filter((c) => !c.isFeatured);

  return (
    <section id="certifications" className="py-14 border-b-2.5 border-carbon bg-paper-technical">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-kalcer-yellow text-carbon font-mono text-xs font-bold uppercase">
                SECTION 04
              </span>
              <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
                CONTINUOUS LEARNING // VALIDATED BADGES
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-carbon tracking-tight">
              CERTIFICATIONS & CREDENTIAL ARCHIVE
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Official cloud architecture qualifications, front-end engineering credentials, competitive informatics medals, and graphic arts recognition.
            </p>
          </div>
          <Badge variant="orange" pill>
            VERIFIED CREDENTIALS
          </Badge>
        </div>

        {/* Featured Big Cards (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((cert) => (
            <Card key={cert.id} elevation={2} className="p-6 bg-white relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 bg-carbon text-white flex items-center justify-center font-display font-bold text-lg brutal-shadow-sm">
                  {cert.issuerCode}
                </div>
                <Badge variant="cobalt">{cert.category}</Badge>
              </div>

              <h3 className="font-display font-black text-xl text-carbon leading-snug">
                {cert.title}
              </h3>
              <p className="font-mono text-xs text-carbon-muted mt-1">
                ISSUER: {cert.issuer} · {cert.issueDate}
              </p>

              <div className="mt-4 pt-3 border-t-2 border-carbon/10 flex items-center justify-between">
                <span className="font-mono text-[11px] text-carbon font-bold">
                  ID: {cert.credentialId}
                </span>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-kalcer-orange hover:underline"
                >
                  VERIFY RECORD <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Secondary Compact Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {secondary.map((cert) => (
            <div
              key={cert.id}
              className="p-4 bg-white border-2 border-carbon brutal-shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] font-bold text-kalcer-orange uppercase">
                  {cert.issuer} · {cert.timelineYear}
                </span>
                <h4 className="font-display font-bold text-sm text-carbon mt-1 leading-snug">
                  {cert.title}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-carbon/10 flex items-center justify-between font-mono text-[10px] text-carbon-muted">
                <span>{cert.category}</span>
                <span className="text-kalcer-emerald font-bold">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
