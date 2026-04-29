import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects, ProjectData } from '../data/projects';

interface FooterLink {
  label: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SiteContent {
  heroLine1: string;
  heroLine2: string;
  heroAccent: string;
  aboutText: string;
  projects: ProjectData[];
  cloudinaryCloudName: string;
  cloudinaryUploadPreset: string;
  footerTagline: string;
  footerColumns: FooterColumn[];
}

const defaultContent: SiteContent = {
  heroLine1: 'BUILDING BRANDS',
  heroLine2: 'THROUGH',
  heroAccent: 'EXPERIENCE',
  aboutText: 'that command premium value. Through my jewelry concept Satvastones, I learned that humans pay extra for vibes. I combine stylized 3D art, minimal luxury, and modern design to help you analyze the market and build a whole vibe.',
  projects: defaultProjects,
  cloudinaryCloudName: '',
  cloudinaryUploadPreset: '',
  footerTagline: 'A MORE MEANINGFUL HOME FOR BRAND VISION',
  footerColumns: [
    {
      title: 'HOME',
      links: [
        { label: 'ABOUT ME', url: '#' },
        { label: 'MY WORKS', url: '#' },
        { label: 'TESTIMONIALS', url: '#' }
      ]
    },
    {
      title: 'CLIENTS',
      links: [
        { label: 'SATVASTONES', url: '#' },
        { label: 'STARTUPS', url: '#' }
      ]
    }
  ]
};

interface AdminContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  addProject: (project: ProjectData) => void;
  updateProject: (id: string, updatedProject: ProjectData) => void;
  deleteProject: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('portfolio-content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved content", e);
      }
    }
    return defaultContent;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-content', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const addProject = (project: ProjectData) => {
    setContent(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const updateProject = (id: string, updatedProject: ProjectData) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? updatedProject : p)
    }));
  };

  const deleteProject = (id: string) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  return (
    <AdminContext.Provider value={{ content, updateContent, addProject, updateProject, deleteProject }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
