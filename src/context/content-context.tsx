'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Profile,
  Project,
  Design,
  Activity,
  Skill,
  Certification,
  ContentItem,
  Experience,
  SocialLink,
  CurrentlyBuildingItem,
  MediaAsset,
  MascotSettings,
} from '@/types';
import {
  mockProfile,
  mockProjects,
  mockDesigns,
  mockActivities,
  mockSkills,
  mockCertifications,
  mockContentItems,
  mockExperiences,
  mockSocialLinks,
  mockCurrentlyBuilding,
  mockMediaAssets,
  mockMascotSettings,
} from '@/data';

const STORAGE_KEY_PREFIX = 'kalcer_portfolio_data_v1_';

interface ContentContextType {
  // State
  profile: Profile;
  projects: Project[];
  designs: Design[];
  activities: Activity[];
  skills: Skill[];
  certifications: Certification[];
  contentItems: ContentItem[];
  experiences: Experience[];
  socialLinks: SocialLink[];
  currentlyBuilding: CurrentlyBuildingItem[];
  mediaAssets: MediaAsset[];
  mascotSettings: MascotSettings;
  isHydrated: boolean;

  // Profile actions
  updateProfile: (updated: Partial<Profile>) => void;

  // Mascot actions
  updateMascotSettings: (updated: Partial<MascotSettings>) => void;

  // Project CRUD
  addProject: (project: Omit<Project, 'id' | 'updatedAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleProjectPublish: (id: string) => void;
  toggleProjectFeatured: (id: string) => void;

  // Design CRUD
  addDesign: (design: Omit<Design, 'id' | 'updatedAt'>) => void;
  updateDesign: (id: string, design: Partial<Design>) => void;
  deleteDesign: (id: string) => void;
  toggleDesignPublish: (id: string) => void;
  toggleDesignFeatured: (id: string) => void;

  // Activity CRUD
  addActivity: (activity: Omit<Activity, 'id' | 'updatedAt'>) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  toggleActivityPublish: (id: string) => void;

  // Skill CRUD
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  // Certification CRUD
  addCertification: (cert: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  toggleCertPublish: (id: string) => void;

  // ContentItem CRUD
  addContentItem: (item: Omit<ContentItem, 'id'>) => void;
  updateContentItem: (id: string, item: Partial<ContentItem>) => void;
  deleteContentItem: (id: string) => void;
  toggleContentPublish: (id: string) => void;

  // Experience CRUD
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // SocialLink CRUD
  addSocialLink: (link: Omit<SocialLink, 'id'>) => void;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;

  // CurrentlyBuilding CRUD
  addCurrentlyBuilding: (item: Omit<CurrentlyBuildingItem, 'id'>) => void;
  updateCurrentlyBuilding: (id: string, item: Partial<CurrentlyBuildingItem>) => void;
  deleteCurrentlyBuilding: (id: string) => void;

  // Media CRUD
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => void;
  deleteMediaAsset: (id: string) => void;

  // System
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error setting localStorage key "${key}":`, e);
  }
}

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const [profile, setProfileState] = useState<Profile>(mockProfile);
  const [projects, setProjectsState] = useState<Project[]>(mockProjects);
  const [designs, setDesignsState] = useState<Design[]>(mockDesigns);
  const [activities, setActivitiesState] = useState<Activity[]>(mockActivities);
  const [skills, setSkillsState] = useState<Skill[]>(mockSkills);
  const [certifications, setCertificationsState] = useState<Certification[]>(mockCertifications);
  const [contentItems, setContentItemsState] = useState<ContentItem[]>(mockContentItems);
  const [experiences, setExperiencesState] = useState<Experience[]>(mockExperiences);
  const [socialLinks, setSocialLinksState] = useState<SocialLink[]>(mockSocialLinks);
  const [currentlyBuilding, setCurrentlyBuildingState] = useState<CurrentlyBuildingItem[]>(mockCurrentlyBuilding);
  const [mediaAssets, setMediaAssetsState] = useState<MediaAsset[]>(mockMediaAssets);
  const [mascotSettings, setMascotSettingsState] = useState<MascotSettings>(mockMascotSettings);

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      setProfileState(getStoredItem('profile', mockProfile));
      setProjectsState(getStoredItem('projects', mockProjects));
      setDesignsState(getStoredItem('designs', mockDesigns));
      setActivitiesState(getStoredItem('activities', mockActivities));
      setSkillsState(getStoredItem('skills', mockSkills));
      setCertificationsState(getStoredItem('certifications', mockCertifications));
      setContentItemsState(getStoredItem('content', mockContentItems));
      setExperiencesState(getStoredItem('experiences', mockExperiences));
      setSocialLinksState(getStoredItem('socials', mockSocialLinks));
      setCurrentlyBuildingState(getStoredItem('currentlyBuilding', mockCurrentlyBuilding));
      setMediaAssetsState(getStoredItem('media', mockMediaAssets));
      setMascotSettingsState(getStoredItem('mascot', mockMascotSettings));
    } catch (err) {
      console.warn('Failed to hydrate content store from localStorage:', err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Setters with persistence
  const updateProfile = useCallback((updated: Partial<Profile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updated };
      setStoredItem('profile', next);
      return next;
    });
  }, []);

  const updateMascotSettings = useCallback((updated: Partial<MascotSettings>) => {
    setMascotSettingsState((prev) => {
      const next = { ...prev, ...updated };
      setStoredItem('mascot', next);
      return next;
    });
  }, []);

  // Projects
  const addProject = useCallback((project: Omit<Project, 'id' | 'updatedAt'>) => {
    setProjectsState((prev) => {
      const newProj: Project = {
        ...project,
        id: 'proj-' + Date.now(),
        updatedAt: 'Just now',
        status: project.status || 'PUBLISHED',
        published: project.published ?? true,
      };
      const next = [newProj, ...prev];
      setStoredItem('projects', next);
      return next;
    });
  }, []);

  const updateProject = useCallback((id: string, updated: Partial<Project>) => {
    setProjectsState((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, ...updated, updatedAt: 'Just now' } : p
      );
      setStoredItem('projects', next);
      return next;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjectsState((prev) => {
      const next = prev.filter((p) => p.id !== id);
      setStoredItem('projects', next);
      return next;
    });
  }, []);

  const toggleProjectPublish = useCallback((id: string) => {
    setProjectsState((prev) => {
      const next = prev.map((p) => {
        if (p.id !== id) return p;
        const newStatus: 'PUBLISHED' | 'DRAFT' = p.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';
        return {
          ...p,
          status: newStatus,
          published: newStatus !== 'DRAFT',
          updatedAt: 'Just now',
        };
      });
      setStoredItem('projects', next);
      return next;
    });
  }, []);

  const toggleProjectFeatured = useCallback((id: string) => {
    setProjectsState((prev) => {
      const next = prev.map((p) => {
        if (p.id !== id) return p;
        const newStatus: 'FEATURED' | 'PUBLISHED' = p.status === 'FEATURED' ? 'PUBLISHED' : 'FEATURED';
        return {
          ...p,
          status: newStatus,
          featured: newStatus === 'FEATURED',
          updatedAt: 'Just now',
        };
      });
      setStoredItem('projects', next);
      return next;
    });
  }, []);

  // Designs
  const addDesign = useCallback((design: Omit<Design, 'id' | 'updatedAt'>) => {
    setDesignsState((prev) => {
      const newDes: Design = {
        ...design,
        id: 'des-' + Date.now(),
        updatedAt: 'Just now',
        published: design.published ?? true,
      };
      const next = [newDes, ...prev];
      setStoredItem('designs', next);
      return next;
    });
  }, []);

  const updateDesign = useCallback((id: string, updated: Partial<Design>) => {
    setDesignsState((prev) => {
      const next = prev.map((d) =>
        d.id === id ? { ...d, ...updated, updatedAt: 'Just now' } : d
      );
      setStoredItem('designs', next);
      return next;
    });
  }, []);

  const deleteDesign = useCallback((id: string) => {
    setDesignsState((prev) => {
      const next = prev.filter((d) => d.id !== id);
      setStoredItem('designs', next);
      return next;
    });
  }, []);

  const toggleDesignPublish = useCallback((id: string) => {
    setDesignsState((prev) => {
      const next = prev.map((d) =>
        d.id === id ? { ...d, published: !d.published, updatedAt: 'Just now' } : d
      );
      setStoredItem('designs', next);
      return next;
    });
  }, []);

  const toggleDesignFeatured = useCallback((id: string) => {
    setDesignsState((prev) => {
      const next = prev.map((d) =>
        d.id === id
          ? { ...d, isFeatured: !d.isFeatured, featured: !d.featured, updatedAt: 'Just now' }
          : d
      );
      setStoredItem('designs', next);
      return next;
    });
  }, []);

  // Activities
  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'updatedAt'>) => {
    setActivitiesState((prev) => {
      const newAct: Activity = {
        ...activity,
        id: 'act-' + Date.now(),
        updatedAt: 'Just now',
        status: activity.status || 'PUBLISHED',
        published: activity.published ?? true,
      };
      const next = [newAct, ...prev];
      setStoredItem('activities', next);
      return next;
    });
  }, []);

  const updateActivity = useCallback((id: string, updated: Partial<Activity>) => {
    setActivitiesState((prev) => {
      const next = prev.map((a) =>
        a.id === id ? { ...a, ...updated, updatedAt: 'Just now' } : a
      );
      setStoredItem('activities', next);
      return next;
    });
  }, []);

  const deleteActivity = useCallback((id: string) => {
    setActivitiesState((prev) => {
      const next = prev.filter((a) => a.id !== id);
      setStoredItem('activities', next);
      return next;
    });
  }, []);

  const toggleActivityPublish = useCallback((id: string) => {
    setActivitiesState((prev) => {
      const next = prev.map((a) => {
        if (a.id !== id) return a;
        const newStatus: 'PUBLISHED' | 'DRAFT' = a.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';
        return {
          ...a,
          status: newStatus,
          published: newStatus !== 'DRAFT',
          updatedAt: 'Just now',
        };
      });
      setStoredItem('activities', next);
      return next;
    });
  }, []);

  // Skills
  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    setSkillsState((prev) => {
      const newSkill: Skill = {
        ...skill,
        id: 'skill-' + Date.now(),
      };
      const next = [...prev, newSkill];
      setStoredItem('skills', next);
      return next;
    });
  }, []);

  const updateSkill = useCallback((id: string, updated: Partial<Skill>) => {
    setSkillsState((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updated } : s));
      setStoredItem('skills', next);
      return next;
    });
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setSkillsState((prev) => {
      const next = prev.filter((s) => s.id !== id);
      setStoredItem('skills', next);
      return next;
    });
  }, []);

  // Certifications
  const addCertification = useCallback((cert: Omit<Certification, 'id'>) => {
    setCertificationsState((prev) => {
      const newCert: Certification = {
        ...cert,
        id: 'cert-' + Date.now(),
        published: cert.published ?? true,
      };
      const next = [newCert, ...prev];
      setStoredItem('certifications', next);
      return next;
    });
  }, []);

  const updateCertification = useCallback((id: string, updated: Partial<Certification>) => {
    setCertificationsState((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updated } : c));
      setStoredItem('certifications', next);
      return next;
    });
  }, []);

  const deleteCertification = useCallback((id: string) => {
    setCertificationsState((prev) => {
      const next = prev.filter((c) => c.id !== id);
      setStoredItem('certifications', next);
      return next;
    });
  }, []);

  const toggleCertPublish = useCallback((id: string) => {
    setCertificationsState((prev) => {
      const next = prev.map((c) =>
        c.id === id ? { ...c, published: !c.published } : c
      );
      setStoredItem('certifications', next);
      return next;
    });
  }, []);

  // Content Items
  const addContentItem = useCallback((item: Omit<ContentItem, 'id'>) => {
    setContentItemsState((prev) => {
      const newItem: ContentItem = {
        ...item,
        id: 'cnt-' + Date.now(),
        status: item.status || 'PUBLISHED',
        published: item.published ?? true,
      };
      const next = [newItem, ...prev];
      setStoredItem('content', next);
      return next;
    });
  }, []);

  const updateContentItem = useCallback((id: string, updated: Partial<ContentItem>) => {
    setContentItemsState((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updated } : c));
      setStoredItem('content', next);
      return next;
    });
  }, []);

  const deleteContentItem = useCallback((id: string) => {
    setContentItemsState((prev) => {
      const next = prev.filter((c) => c.id !== id);
      setStoredItem('content', next);
      return next;
    });
  }, []);

  const toggleContentPublish = useCallback((id: string) => {
    setContentItemsState((prev) => {
      const next = prev.map((c) => {
        if (c.id !== id) return c;
        const newStatus: 'PUBLISHED' | 'DRAFT' = c.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';
        return {
          ...c,
          status: newStatus,
          published: newStatus !== 'DRAFT',
        };
      });
      setStoredItem('content', next);
      return next;
    });
  }, []);

  // Experiences
  const addExperience = useCallback((exp: Omit<Experience, 'id'>) => {
    setExperiencesState((prev) => {
      const newExp: Experience = {
        ...exp,
        id: 'exp-' + Date.now(),
      };
      const next = [newExp, ...prev];
      setStoredItem('experiences', next);
      return next;
    });
  }, []);

  const updateExperience = useCallback((id: string, updated: Partial<Experience>) => {
    setExperiencesState((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...updated } : e));
      setStoredItem('experiences', next);
      return next;
    });
  }, []);

  const deleteExperience = useCallback((id: string) => {
    setExperiencesState((prev) => {
      const next = prev.filter((e) => e.id !== id);
      setStoredItem('experiences', next);
      return next;
    });
  }, []);

  // Social Links
  const addSocialLink = useCallback((link: Omit<SocialLink, 'id'>) => {
    setSocialLinksState((prev) => {
      const newSoc: SocialLink = {
        ...link,
        id: 'soc-' + Date.now(),
      };
      const next = [...prev, newSoc];
      setStoredItem('socials', next);
      return next;
    });
  }, []);

  const updateSocialLink = useCallback((id: string, updated: Partial<SocialLink>) => {
    setSocialLinksState((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updated } : s));
      setStoredItem('socials', next);
      return next;
    });
  }, []);

  const deleteSocialLink = useCallback((id: string) => {
    setSocialLinksState((prev) => {
      const next = prev.filter((s) => s.id !== id);
      setStoredItem('socials', next);
      return next;
    });
  }, []);

  // Currently Building
  const addCurrentlyBuilding = useCallback((item: Omit<CurrentlyBuildingItem, 'id'>) => {
    setCurrentlyBuildingState((prev) => {
      const newItem: CurrentlyBuildingItem = {
        ...item,
        id: 'cb-' + Date.now(),
      };
      const next = [newItem, ...prev];
      setStoredItem('currentlyBuilding', next);
      return next;
    });
  }, []);

  const updateCurrentlyBuilding = useCallback((id: string, updated: Partial<CurrentlyBuildingItem>) => {
    setCurrentlyBuildingState((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
      setStoredItem('currentlyBuilding', next);
      return next;
    });
  }, []);

  const deleteCurrentlyBuilding = useCallback((id: string) => {
    setCurrentlyBuildingState((prev) => {
      const next = prev.filter((item) => item.id !== id);
      setStoredItem('currentlyBuilding', next);
      return next;
    });
  }, []);

  // Media
  const addMediaAsset = useCallback((asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => {
    setMediaAssetsState((prev) => {
      const newAsset: MediaAsset = {
        ...asset,
        id: 'med-' + Date.now(),
        uploadedAt: 'Just now',
      };
      const next = [newAsset, ...prev];
      setStoredItem('media', next);
      return next;
    });
  }, []);

  const deleteMediaAsset = useCallback((id: string) => {
    setMediaAssetsState((prev) => {
      const next = prev.filter((m) => m.id !== id);
      setStoredItem('media', next);
      return next;
    });
  }, []);

  // Reset to initial mock defaults
  const resetToDefaults = useCallback(() => {
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    }
    setProfileState(mockProfile);
    setProjectsState(mockProjects);
    setDesignsState(mockDesigns);
    setActivitiesState(mockActivities);
    setSkillsState(mockSkills);
    setCertificationsState(mockCertifications);
    setContentItemsState(mockContentItems);
    setExperiencesState(mockExperiences);
    setSocialLinksState(mockSocialLinks);
    setCurrentlyBuildingState(mockCurrentlyBuilding);
    setMediaAssetsState(mockMediaAssets);
    setMascotSettingsState(mockMascotSettings);
  }, []);

  const value: ContentContextType = {
    profile,
    projects,
    designs,
    activities,
    skills,
    certifications,
    contentItems,
    experiences,
    socialLinks,
    currentlyBuilding,
    mediaAssets,
    mascotSettings,
    isHydrated,

    updateProfile,
    updateMascotSettings,

    addProject,
    updateProject,
    deleteProject,
    toggleProjectPublish,
    toggleProjectFeatured,

    addDesign,
    updateDesign,
    deleteDesign,
    toggleDesignPublish,
    toggleDesignFeatured,

    addActivity,
    updateActivity,
    deleteActivity,
    toggleActivityPublish,

    addSkill,
    updateSkill,
    deleteSkill,

    addCertification,
    updateCertification,
    deleteCertification,
    toggleCertPublish,

    addContentItem,
    updateContentItem,
    deleteContentItem,
    toggleContentPublish,

    addExperience,
    updateExperience,
    deleteExperience,

    addSocialLink,
    updateSocialLink,
    deleteSocialLink,

    addCurrentlyBuilding,
    updateCurrentlyBuilding,
    deleteCurrentlyBuilding,

    addMediaAsset,
    deleteMediaAsset,

    resetToDefaults,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const usePortfolioContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('usePortfolioContent must be used within a ContentProvider');
  }
  return context;
};
