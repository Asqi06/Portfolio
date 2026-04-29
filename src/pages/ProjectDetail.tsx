import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface ProjectDetailProps {
  onMenuClick?: () => void;
}

export default function ProjectDetail({ onMenuClick }: ProjectDetailProps) {
  const { id } = useParams<{ id: string }>();
  const { content } = useAdmin();
  
  // Find project safely
  const project = content?.projects?.find(p => p.id === id);

  if (!project) {
    console.error("Project not found for ID:", id);
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-6">
        <h1 className="text-4xl font-serif">Project not found</h1>
        <Link to="/" className="text-brand-accent hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  // Debug log to help identify missing fields
  if (!project.title || !project.coverImage) {
    console.warn("Project found but missing critical data:", project);
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 uppercase text-xs tracking-[0.2em] font-sans">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        {/* Header */}
        <header className="mb-20">
          <span className="text-brand-accent text-xs tracking-[0.2em] uppercase font-sans mb-4 block">
            {project.category || 'Category'} — {project.date || 'Date'}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic mb-8">
            {project.title || 'Untitled Project'}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-sans max-w-3xl leading-relaxed">
            {project.description || 'No description provided.'}
          </p>
        </header>

        {/* Cover Image */}
        {project.coverImage ? (
          <div className="w-full h-[60vh] md:h-[80vh] bg-neutral-900 mb-20 overflow-hidden rounded-md border border-white/5">
            <img 
              src={project.coverImage} 
              alt={project.title} 
              className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-1000" 
              onError={(e) => {
                console.error("Image failed to load:", project.coverImage);
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=1000&auto=format&fit=crop'; // fallback
              }}
            />
          </div>
        ) : (
          <div className="w-full h-40 bg-neutral-900 mb-20 flex items-center justify-center border border-dashed border-white/10 rounded-md text-gray-600 italic">
            No cover image provided
          </div>
        )}

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery && project.gallery.length > 0 ? (
            project.gallery.map((img, idx) => (
              <div key={idx} className="w-full aspect-square bg-neutral-900 overflow-hidden rounded-md border border-white/5">
                <img 
                  src={img} 
                  alt={`${project.title} gallery ${idx + 1}`} 
                  className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-1000" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement?.classList.add('hidden');
                  }}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center border border-white/5 rounded-xl text-gray-500 italic">
              No gallery images added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
