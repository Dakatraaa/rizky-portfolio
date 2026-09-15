import React from 'react';
import { CertificationCard } from '@/components/public/cards/certification-card';
import { mockCertifications } from '@/data';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Certifications & Credentials // Kalcer Studio',
  description: 'Official cloud architecture qualifications, front-end credentials, and informatics medals.',
};

export default function CertificationsPage() {
  const featured = mockCertifications.filter((c) => c.isFeatured);
  const secondary = mockCertifications.filter((c) => !c.isFeatured);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="yellow">CREDENTIALS</Badge>
          <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
            CRYPTOGRAPHIC & VERIFIED RECORDS
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-carbon tracking-tight">
          CERTIFICATIONS & CREDENTIAL ARCHIVE
        </h1>
        <p className="font-body text-base text-carbon-muted max-w-2xl mt-2">
          Official cloud architecture qualifications, front-end engineering credentials, competitive informatics medals, and graphic arts recognition.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="font-display font-black text-2xl uppercase text-carbon">
          FEATURED CREDENTIALS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} featured />
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t-2 border-carbon/10">
        <h2 className="font-display font-black text-2xl uppercase text-carbon">
          FOUNDATIONAL & COMPETITIVE MEDALS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {secondary.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} featured={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
