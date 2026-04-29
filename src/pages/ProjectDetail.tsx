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
  const project = content.projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-6">
        <h1 className="text-4xl font-serif">Project not found</h1>
        <Link to="/" className="text-brand-accent hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 uppercase text-xs tracking-[0.2em] font-sans">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        {/* Header */}
        <header className="mb-20">
          <span className="text-brand-accent text-xs tracking-[0.2em] uppercase font-sans mb-4 block">
            {project.category} — {project.date}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic mb-8">
            {project.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-sans max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Cover Image */}
        <div className="w-full h-[60vh] md:h-[80vh] bg-neutral-900 mb-20 overflow-hidden rounded-md border border-white/5">
          <img 
            src={project.coverImage} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
          />
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery.map((img, idx) => (
            <div key={idx} className="w-full aspect-square bg-neutral-900 overflow-hidden rounded-md border border-white/5">
              <img 
                src={img} 
                alt={`${project.title} gallery ${idx + 1}`} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
