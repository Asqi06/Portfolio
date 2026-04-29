import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[100] flex flex-col p-10 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
              <span className="text-[10px] tracking-[0.3em] font-sans font-medium opacity-50 uppercase">
                NAVIGATION
              </span>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-white group-hover:text-brand-accent transition-colors" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-8 font-serif italic text-4xl sm:text-5xl">
              <Link to="/" onClick={onClose} className="hover:text-brand-accent transition-colors">
                Home
              </Link>
              
              <div className="pt-8 border-t border-white/10 flex flex-col">
                <span className="text-[10px] tracking-[0.3em] font-sans font-medium opacity-50 uppercase not-italic block mb-6">
                  Expertise
                </span>
                
                <div className="mb-8">
                  <span className="block text-gray-400 cursor-default mb-4 text-3xl sm:text-4xl">
                    Building Brands
                  </span>
                  <div className="pl-6 border-l-2 border-white/10 flex flex-col">
                    <Link to="/satvastones" onClick={onClose} className="text-2xl sm:text-3xl text-brand-accent hover:text-white transition-colors">
                      Satvastones
                    </Link>
                  </div>
                </div>

                <div>
                  <span className="block text-gray-400 cursor-default text-3xl sm:text-4xl">
                    3D Art
                  </span>
                </div>
              </div>
            </div>

            {/* Footer info */}
            <div className="mt-auto pt-16 flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.3em] font-sans font-medium opacity-50 uppercase">
                LET'S TALK
              </span>
              <a href="mailto:techmax1245@gmail.com" className="font-sans text-sm hover:text-brand-accent transition-colors not-italic">
                anirudh@portfolio.com
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
