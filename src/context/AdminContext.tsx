import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as defaultProjects, ProjectData } from '../data/projects';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const docRef = doc(db, 'portfolio', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as SiteContent);
        } else {
          // Initialize document if it doesn't exist
          await setDoc(docRef, defaultContent);
        }
      } catch (error) {
        console.error("Error fetching content from Firebase:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadContent();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    const timer = setTimeout(async () => {
      try {
        await setDoc(doc(db, 'portfolio', 'content'), content);
      } catch (error) {
        console.error("Error saving content to Firebase:", error);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [content, isLoaded]);

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
