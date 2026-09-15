import { Experience } from '@/types';

export const mockExperiences: Experience[] = [
  {
    id: 'exp-01',
    role: 'Lead Systems & Frontend Engineer',
    organization: 'Kalcer Studio // Personal Lab',
    type: 'WORK',
    startDate: '2023',
    endDate: 'Present',
    isCurrent: true,
    location: 'Jakarta, ID',
    highlights: [
      'Architected RunHub OS telemetry engine ingesting high-frequency sensor streams with sub-30ms latency.',
      'Designed and engineered the Kalcer Studio design system with neo-brutalist tactile physical click models.',
      'Developed automated spot-color halftone separation pipelines for Risograph print outputs.',
    ],
  },
  {
    id: 'exp-02',
    role: 'Electrical & Informatics Engineering Student',
    organization: 'Undergraduate Program',
    type: 'EDUCATION',
    startDate: '2021',
    endDate: 'Expected 2025',
    isCurrent: true,
    location: 'Bandung / Jakarta, ID',
    highlights: [
      'Focusing on distributed systems, concurrent algorithms, and embedded computing.',
      'Finalist in National Informatics Olympiad (OSN).',
      'Active runner on campus track & field club with 4:20/km 10K PB.',
    ],
  },
  {
    id: 'exp-03',
    role: 'Graphic Atelier Apprentice',
    organization: 'Indie Print Workshop',
    type: 'COMMUNITY',
    startDate: '2022',
    endDate: '2023',
    isCurrent: false,
    location: 'Bandung, ID',
    highlights: [
      'Operated dual-drum Risograph RZ machines and silkscreen exposure units.',
      'Published 87+ limited edition posters, zines, and marathon event kits.',
    ],
  },
];
