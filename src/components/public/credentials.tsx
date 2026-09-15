import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CertificationCard } from '@/components/public/cards/certification-card';
import { mockCertifications } from '@/data';

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
            <CertificationCard key={cert.id} certification={cert} featured />
          ))}
        </div>

        {/* Secondary Compact Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {secondary.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} featured={false} />
          ))}
        </div>
      </div>
    </section>
  );
};
