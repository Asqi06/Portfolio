import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface HeroProps {
  onMenuClick?: () => void;
}

export default function Hero({ onMenuClick }: HeroProps) {
  const { content } = useAdmin();

  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col font-serif pb-16 md:pb-24">
      {/* Top Navigation Bar */}
      <div className="z-50 flex justify-between items-center px-10 py-10 w-full border-b border-white/10">
        <span className="text-[10px] tracking-[0.3em] font-sans font-medium opacity-80 uppercase cursor-pointer hover:opacity-100 transition-opacity">
          ABOUT
        </span>
        <h2 className="text-3xl font-medium tracking-tight">Anirudh Verma</h2>
        <Menu className="w-6 h-6 cursor-pointer hover:text-brand-accent transition-colors" onClick={onMenuClick} />
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Images Grid Layout with Stacked Text */}
        <div className="relative w-full flex flex-col items-center justify-center mt-4 md:mt-10 px-4 min-h-[60vh] gap-6 md:gap-8">
          {/* Hero Text */}
          <div className="z-30 text-center w-full flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-tight w-full"
            >
              <span className="italic font-light block drop-shadow-xl text-white mb-2">{content.heroLine1}</span>
              <span className="block uppercase font-medium drop-shadow-xl text-white">
                {content.heroLine2} <span className="text-brand-accent">{content.heroAccent}</span>
              </span>
            </motion.h1>
          </div>

          {/* Left Partial Image */}
          <div className="absolute left-0 top-[60%] -translate-y-1/2 w-[25vw] h-[30vh] md:w-[15vw] md:h-[40vh] opacity-20 md:opacity-40 select-none z-0 pointer-events-none">
            <div className="relative h-full w-full bg-neutral-900 overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop" 
                 className="w-full h-full object-cover grayscale" 
                 alt="architecture"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>

          {/* Center Main Image - Stacked Below Text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[50vw] md:w-[320px] aspect-[4/5] z-10 group mt-8 md:mt-0"
          >
            <div className="h-full w-full bg-neutral-900 overflow-hidden relative shadow-2xl border border-white/5 rounded-md">
              <img 
                src="/portrait.jpg" 
                alt="Anirudh Verma" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>

          {/* Right Layout Elements */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] md:w-[25vw] h-full flex flex-col justify-center items-end md:items-start pr-4 md:pr-0 md:pl-20 overflow-hidden z-0 pointer-events-none">
            {/* Star Icon */}
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="mb-10 md:mb-20 text-brand-accent w-8 h-8 md:w-[60px] md:h-[60px]"
            >
               <svg width="100%" height="100%" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
               </svg>
            </motion.div>
            
            <div className="relative opacity-20 md:opacity-40 select-none">
               <div className="w-[25vw] h-[20vh] md:w-[15vw] md:h-[30vh] bg-neutral-900 border border-white/5 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale" 
                    alt="abstract"
                    referrerPolicy="no-referrer"
                  />
               </div>
               <div className="absolute top-1/2 left-full -translate-x-10 md:-translate-x-20 rotate-[-90deg] origin-left">
                  <span className="text-xl md:text-4xl italic opacity-30 whitespace-nowrap">Design</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="z-50 flex justify-between items-end px-10 pb-10 w-full mt-auto">
        <div className="space-y-1">
          <span className="text-[10px] tracking-[0.3em] font-sans font-medium opacity-50 uppercase">
            ROLE
          </span>
          <p className="text-[10px] tracking-[0.2em] font-sans font-semibold uppercase">
            3D ARTIST & BUILDER
          </p>
        </div>

        <div className="flex flex-col items-end space-y-1">
          <span className="text-[10px] tracking-[0.3em] font-sans font-medium opacity-50 uppercase">
            WORK
          </span>
          <p className="text-[10px] tracking-[0.2em] font-sans font-semibold uppercase">
            05/13
          </p>
        </div>
      </div>

      {/* Side "Bruxells" and "Problem" labels replaced with meaningful text */}
      <div className="absolute bottom-10 md:bottom-20 left-4 pointer-events-none select-none z-0">
        <span className="text-[20vw] md:text-[12vw] font-serif italic text-white/5 leading-none -ml-4 md:-ml-10">Satvastones</span>
      </div>
      <div className="absolute top-32 md:top-40 right-4 pointer-events-none select-none z-0">
        <span className="text-[20vw] md:text-[12vw] font-serif italic text-white/5 leading-none -mr-4 md:-mr-10">Vision</span>
      </div>
    </section>
  );
}
