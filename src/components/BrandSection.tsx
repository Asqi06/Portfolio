import { motion } from 'motion/react';
import { useAdmin } from '../context/AdminContext';

export default function BrandSection() {
  const { content } = useAdmin();
  const tickerItems = [
    "BRAND IDENTITY",
    "3D ENVIRONMENT DESIGN",
    "CINEMATIC STORYTELLING",
    "E-COMMERCE VISION",
    "VISUAL WORLD-BUILDING",
  ];

  return (
    <section className="bg-black text-white pt-0 pb-16 md:pb-24 font-serif overflow-hidden relative">
      {/* Horizontal Ticker */}
      <div className="w-full border-y border-white/5 py-4 mb-16 md:mb-24 overflow-hidden flex bg-[#0a0a0a]">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center w-max"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {tickerItems.map((item, index) => (
                <div key={index} className="flex items-center shrink-0">
                  <span className="mx-6 text-brand-accent text-xl">✧</span>
                  <span className="text-[#8ba2b2] tracking-widest text-sm font-sans uppercase">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-10 relative">
        {/* Left Skewed Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -100, rotate: -20 }}
          whileInView={{ opacity: 1, x: 0, rotate: -12 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-10 md:top-20 -left-5 md:-left-10 w-24 h-32 md:w-48 md:h-64 bg-neutral-900 border border-white/5 shadow-2xl z-0 overflow-hidden"
        >
           <img 
             src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
             alt="process" 
             className="w-full h-full object-cover grayscale opacity-60" 
             referrerPolicy="no-referrer"
           />
        </motion.div>

        {/* Right Skewed Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: 100, rotate: 20 }}
          whileInView={{ opacity: 1, x: 0, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-10 md:bottom-20 -right-5 md:-right-10 w-24 h-32 md:w-48 md:h-64 bg-neutral-900 border border-white/5 shadow-2xl z-0 overflow-hidden"
        >
           <img 
             src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
             alt="art" 
             className="w-full h-full object-cover grayscale opacity-60" 
             referrerPolicy="no-referrer"
           />
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-brand-accent italic text-lg md:text-xl">I build</span>
            <h2 className="text-5xl sm:text-7xl md:text-[10vw] italic font-medium uppercase leading-[0.8] tracking-tighter">BRANDS</h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-4xl italic leading-tight text-white/90 font-light px-4"
          >
            {content.aboutText}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
