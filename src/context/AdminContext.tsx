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

export interface TestimonialData {
  id: string;
  quote: string;
  name: string;
  role: string;
  stat: string;
  statDesc: string;
  image: string;
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
  heroImageLeft: string;
  heroImageCenter: string;
  heroImageRight: string;
  brandImageLeft: string;
  brandImageRight: string;
  aboutImageSmall: string;
  aboutImageLarge: string;
  testimonials: TestimonialData[];
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
  ],
  heroImageLeft: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop',
  heroImageCenter: '/portrait.jpg',
  heroImageRight: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1000&auto=format&fit=crop',
  brandImageLeft: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
  brandImageRight: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  aboutImageSmall: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
  aboutImageLarge: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80',
  testimonials: [
    {
      id: '1',
      quote: '"Anirudh completely elevated our brand vision. His understanding of 3D aesthetics and minimal luxury helped us craft an identity that truly stands out in the market."',
      name: 'Daniel Perce',
      role: 'Founder, Aura',
      stat: '100%',
      statDesc: 'Verified Customer Testimonials',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    },
    {
      id: '2',
      quote: '"Working with Anirudh on our product visuals was a game-changer. He doesn\\'t just design; he builds a complete vibe that audiences resonate with instantly."',
      name: 'Alexo Smith',
      role: 'Co-founder of this company',
      stat: '3x',
      statDesc: 'Faster, smarter and better',
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=800&q=80',
    }
  ]
};

interface AdminContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  addProject: (project: ProjectData) => void;
  updateProject: (id: string, updatedProject: ProjectData) => void;
  deleteProject: (id: string) => void;
  addTestimonial: (testimonial: TestimonialData) => void;
  updateTestimonial: (id: string, updatedTestimonial: TestimonialData) => void;
  deleteTestimonial: (id: string) => void;
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
          setContent({ ...defaultContent, ...(docSnap.data() as SiteContent) });
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

  const addTestimonial = (testimonial: TestimonialData) => {
    setContent(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, testimonial]
    }));
  };

  const updateTestimonial = (id: string, updatedTestimonial: TestimonialData) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? updatedTestimonial : t)
    }));
  };

  const deleteTestimonial = (id: string) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  return (
    <AdminContext.Provider value={{ 
      content, 
      updateContent, 
      addProject, 
      updateProject, 
      deleteProject,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial
    }}>
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
