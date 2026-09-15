// ==========================================
// KALCER STUDIO & ARIESTA RIZKY - CORE TYPES
// ==========================================

export interface Profile {
  id: string;
  name: string;
  nickname: string;
  headline: string;
  subheadline: string;
  bio: string;
  degreeStatus: string;
  location: string;
  availability: string;
  statusBadge: string;
  avatarUrl: string;
  contactEmail: string;
  telemetry: {
    halfRunPace: string;
    halfRunDistance: string;
    wpmTyping: number;
    wpmPercentile: string;
    githubCommitsYtd: number;
    posterArchiveCount: number;
    stravaConditionPercent: number;
    stravaPace: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  categoryTag: string; // e.g. "FLAGSHIP RIG", "SYSTEMS"
  headline: string;
  description: string;
  status: 'FEATURED' | 'PUBLISHED' | 'DRAFT';
  techStack: string[];
  latencyMs?: number;
  clusterCount?: string;
  telemetryData?: {
    runEngineVersion: string;
    sensorProtocol: string;
    uptimePercent: number;
    avgPace: string;
    cadenceSpm: number;
    strideLengthM: number;
  };
  githubUrl?: string;
  liveUrl?: string;
  updatedAt: string;
}

export interface Design {
  id: string;
  slug: string;
  title: string;
  category: 'RISO' | 'APPAREL' | 'PACKAGING' | 'BRANDING';
  categoryLabel: string;
  year: number;
  description: string;
  printMedium: string;
  dimensions: string;
  edition?: string;
  accentColor: string;
  isFeatured: boolean;
  coverImage: string;
  galleryImages: string[];
  updatedAt: string;
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  category: 'MARATHON' | 'SPRINT' | 'WORKSHOP' | 'MEETUP';
  date: string;
  location: string;
  telemetry?: {
    distanceKm: number;
    paceMinPerKm: string;
    splitTime: string;
    cadenceSpm?: number;
  };
  summary: string;
  accentTag: string;
  status: 'PUBLISHED' | 'DRAFT';
  coverImage?: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  platform: 'YOUTUBE' | 'SUBSTACK' | 'TWITTER' | 'SPOTIFY';
  platformTag: string;
  category: 'DEVLOG' | 'TUTORIAL' | 'RUNNER_DIARY' | 'ESSAY';
  publishDate: string;
  url: string;
  thumbnail: string;
  metricHighlight: string;
  readOrWatchTime: string;
  summary: string;
  status: 'PUBLISHED' | 'DRAFT';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerCode: 'AWS' | 'META' | 'OLYMPIAD' | 'COURSERA' | 'HASHICORP' | 'OTHER';
  credentialId: string;
  issueDate: string;
  verifyUrl: string;
  category: 'CLOUD & INFRA' | 'WEB & FRONT-END' | 'COMPETITIVE' | 'DESIGN & ATELIER';
  isFeatured: boolean;
  timelineYear: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'PROGRAMMING' | 'WEB' | 'STORAGE_CLOUD' | 'DESIGN' | 'WORKFLOW';
  categoryLabel: string;
  proficiencyLevel: 'CORE DAILY DRIVER' | 'HIGH PERFORMANCE' | 'ATELIER SPECIALTY';
  benchmarkScore: number;
  activeReposCount: number;
  connectedProjects: string[];
  description: string;
  iconName: string;
  accentColor?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: 'WORK' | 'EDUCATION' | 'COMMUNITY';
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location: string;
  highlights: string[];
}

export interface SocialLink {
  id: string;
  platform: 'YOUTUBE' | 'SUBSTACK' | 'TWITTER' | 'GITHUB' | 'LINKEDIN' | 'STRAVA';
  label: string;
  handle: string;
  url: string;
  metricLabel: string;
  metricValue: string;
  accentColor: string;
  displayOrder: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  filename: string;
  category: 'PROJECT' | 'DESIGN' | 'ACTIVITY' | 'MASCOT' | 'SYSTEM';
  sizeKb: number;
  dimensions: string;
  uploadedAt: string;
  url: string;
}

export interface MascotSettings {
  activePose: 'idle' | 'runner' | 'developer' | 'trading' | 'interaction' | 'daily';
  soundEnabled: boolean;
  dockPosition: 'bottom-right' | 'bottom-left';
  currentDialogue: string;
  dialogueList: string[];
  statusLabel: string;
  telemetryVersion: string;
}
