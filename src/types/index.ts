// ==========================================
// KALCER STUDIO & ARIESTA RIZKY - CORE TYPES
// ==========================================

export interface Profile {
  id: string;
  name: string;
  displayName?: string;
  nickname: string;
  headline: string;
  subheadline: string;
  bio: string;
  shortBio?: string;
  longBio?: string;
  degreeStatus: string;
  location: string;
  availability: string;
  statusBadge: string;
  avatarUrl: string;
  contactEmail: string;
  cvUrl?: string;
  resumeUrl?: string;
  identities?: {
    developer: string;
    designer: string;
    runner: string;
    creator: string;
  };
  interests?: string[];
  currentFocus?: string;
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

export interface ProjectCaseStudy {
  overview: string;
  architecture: string;
  challenges: string[];
  outcomes: string[];
  keyFeatures: string[];
  metrics?: { label: string; value: string }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  categoryTag: string; // e.g. "FLAGSHIP RIG", "SYSTEMS"
  category?: string;
  headline: string;
  shortDescription?: string;
  description: string;
  status: 'FEATURED' | 'PUBLISHED' | 'DRAFT';
  published?: boolean;
  featured?: boolean;
  year?: number;
  techStack: string[];
  technologies?: string[];
  latencyMs?: number;
  clusterCount?: string;
  coverImage?: string;
  gallery?: string[];
  caseStudy?: ProjectCaseStudy;
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

export type DesignCategory =
  | 'RISO'
  | 'APPAREL'
  | 'PACKAGING'
  | 'BRANDING'
  | 'POSTER'
  | 'JERSEY'
  | 'T_SHIRT'
  | 'LOGO'
  | 'BANNER'
  | 'SOCIAL_MEDIA'
  | 'ILLUSTRATION'
  | 'EXPERIMENTAL';

export interface Design {
  id: string;
  slug: string;
  title: string;
  category: DesignCategory;
  categoryLabel: string;
  year: number;
  description: string;
  printMedium: string;
  dimensions: string;
  edition?: string;
  accentColor: string;
  isFeatured: boolean;
  featured?: boolean;
  published?: boolean;
  thumbnail?: string;
  fullImage?: string;
  coverImage: string;
  gallery?: string[];
  galleryImages: string[];
  tags?: string[];
  aspectRatio?: string;
  updatedAt: string;
}

export type ActivityCategory =
  | 'MARATHON'
  | 'SPRINT'
  | 'WORKSHOP'
  | 'MEETUP'
  | 'RUNNING'
  | 'UNIVERSITY'
  | 'CODING'
  | 'DESIGN'
  | 'EVENTS'
  | 'ORGANIZATION'
  | 'PROJECTS'
  | 'PERSONAL';

export interface Activity {
  id: string;
  slug: string;
  title: string;
  category: ActivityCategory;
  date: string;
  location: string;
  telemetry?: {
    distanceKm: number;
    paceMinPerKm: string;
    splitTime: string;
    cadenceSpm?: number;
  };
  shortDescription?: string;
  summary: string;
  description?: string;
  accentTag: string;
  status: 'PUBLISHED' | 'DRAFT';
  published?: boolean;
  featured?: boolean;
  coverImage?: string;
  coverPhoto?: string;
  gallery?: string[];
  tags?: string[];
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  platform: 'YOUTUBE' | 'SUBSTACK' | 'TWITTER' | 'SPOTIFY' | 'INSTAGRAM' | 'TIKTOK';
  platformTag: string;
  category: 'DEVLOG' | 'TUTORIAL' | 'RUNNER_DIARY' | 'ESSAY' | string;
  publishDate: string;
  publicationDate?: string;
  url: string;
  externalUrl?: string;
  thumbnail: string;
  metricHighlight: string;
  readOrWatchTime: string;
  summary: string;
  description?: string;
  status: 'PUBLISHED' | 'DRAFT';
  published?: boolean;
  featured?: boolean;
  tags?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerCode: 'AWS' | 'META' | 'OLYMPIAD' | 'COURSERA' | 'HASHICORP' | 'OTHER' | string;
  credentialId: string;
  issueDate: string;
  verifyUrl: string;
  verificationUrl?: string;
  category: 'CLOUD & INFRA' | 'WEB & FRONT-END' | 'COMPETITIVE' | 'DESIGN & ATELIER' | string;
  isFeatured: boolean;
  featured?: boolean;
  published?: boolean;
  image?: string;
  description?: string;
  timelineYear: number;
}

export type SkillCategory =
  | 'PROGRAMMING'
  | 'WEB'
  | 'STORAGE_CLOUD'
  | 'DESIGN'
  | 'WORKFLOW'
  | 'WEB_DEVELOPMENT'
  | 'DATABASE'
  | 'TOOLS'
  | 'OTHER_TECHNOLOGIES';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  proficiencyLevel: 'CORE DAILY DRIVER' | 'HIGH PERFORMANCE' | 'ATELIER SPECIALTY' | string;
  benchmarkScore: number;
  activeReposCount: number;
  connectedProjects: string[];
  description: string;
  iconName: string;
  icon?: string;
  accentColor?: string;
  displayOrder?: number;
  featured?: boolean;
  active?: boolean;
}

export interface CurrentlyBuildingItem {
  id: string;
  title: string;
  codename: string;
  description: string;
  status: 'Planning' | 'In Development' | 'Beta' | 'Live' | 'Experiment';
  statusColor: 'yellow' | 'orange' | 'lime' | 'emerald' | 'cobalt';
  techStack: string[];
  targetDate: string;
  progressHighlight: string;
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
  platform: 'YOUTUBE' | 'SUBSTACK' | 'TWITTER' | 'GITHUB' | 'LINKEDIN' | 'STRAVA' | 'INSTAGRAM' | 'TIKTOK';
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

