import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function PortfolioSection() {
  const { content } = useAdmin();
  const projects = content.projects;
  return (
    <section className="bg-black text-white py-16 px-8 md:px-16 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/5 pb-10 gap-8">
        <div>
          <h3 className="text-gray-500 text-xs tracking-[0.2em] uppercase mb-6 font-medium">Portfolio</h3>
          <h2 className="text-5xl md:text-7xl font-serif leading-tight">
            <span className="italic block text-[#e6ddd0]">EXPLORE MY</span>
            <span className="italic block mt-1">
              <span className="text-brand-accent pr-4">BRANDING</span>
              <span className="text-[#e6ddd0]">WORK.</span>
            </span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4 pb-2">
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center hover:bg-[#222] transition-colors border border-white/5">
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center hover:bg-[#222] transition-colors border border-white/5">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <button className="px-6 py-3 h-12 rounded-full bg-[#111] flex items-center gap-2 hover:bg-[#222] transition-colors font-medium text-sm border border-white/5 ml-2">
            View All Works
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <Link to={`/project/${project.id}`} key={idx} className="group block cursor-pointer">
            <div className="relative overflow-hidden mb-5 aspect-[4/3] w-full bg-[#111]">
              <img 
                src={project.coverImage} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div>
                <h4 className="text-base font-medium mb-1 text-gray-200 group-hover:text-white transition-colors">{project.title}</h4>
                <p className="text-gray-500 text-xs font-medium">{project.date}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold tracking-[0.1em] text-gray-300 group-hover:text-brand-accent transition-colors uppercase mt-1">
                View Project <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
