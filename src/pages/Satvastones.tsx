import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Satvastones() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e6ddd0]">
      {/* Navigation */}
      <nav className="p-10 absolute top-0 left-0 z-50 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase text-xs tracking-[0.2em] font-sans">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1599643478514-4a410f060f42?q=80&w=2000&auto=format&fit=crop" 
            alt="Satvastones Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-serif tracking-tight leading-none mb-6 text-white"
          >
            Satvastones
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base tracking-[0.4em] uppercase font-sans text-brand-accent"
          >
            A Study in Minimal Luxury
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-8">
              More than jewelry. <br />
              <span className="text-brand-accent">A whole vibe.</span>
            </h2>
            <div className="space-y-6 text-gray-400 font-sans leading-relaxed text-sm md:text-base">
              <p>
                Satvastones is my jewelry brand concept built around minimal luxury, merging Korean aesthetics with western modern design. It was born not just to sell jewelry, but as an entrepreneurial exploration into branding, product vision, and building a premium e-commerce identity.
              </p>
              <p>
                Humans pay extra for vibes. Fascinating species. We don't just buy materials; we buy stories, aesthetics, and the feelings a brand evokes. Satvastones is the physical manifestation of that philosophy.
              </p>
            </div>
          </div>
          <div className="aspect-[3/4] bg-neutral-900 rounded-sm overflow-hidden relative shadow-2xl border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80" 
              alt="Satvastones Jewelry piece" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Visuals Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <h3 className="text-center text-xs tracking-[0.3em] font-sans uppercase mb-16 opacity-50">Visual Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-2 aspect-video bg-neutral-900 overflow-hidden rounded-sm border border-white/5">
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Satvastones Brand 1" />
          </div>
          <div className="aspect-[3/4] md:aspect-auto bg-neutral-900 overflow-hidden rounded-sm border border-white/5">
            <img src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Satvastones Brand 2" />
          </div>
        </div>
      </section>
      
      <div className="h-32" />
    </div>
  );
}
