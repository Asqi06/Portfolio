import { ArrowUpRight } from 'lucide-react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function Footer() {
  const { content } = useAdmin();
  
  const marqueeItems = [
    "3D ENVIRONMENT DESIGN",
    "BRAND IDENTITY",
    "CINEMATIC STORYTELLING",
    "VISUAL WORLD-BUILDING",
    "EXPERIMENTAL 3D",
  ];

  const duplicatedMarquee = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const baseVelocity = isHovered ? -0.01 : -0.03;

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 16.666);
    let newX = baseX.get() + moveBy;
    if (newX <= -33.33) newX += 33.33;
    if (newX > 0) newX -= 33.33;
    baseX.set(newX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <footer className="w-full bg-black text-white pt-20 border-t border-white/5 flex flex-col mt-20">
      
      {/* Top Marquee */}
      <div 
        className="w-full border-y border-white/5 py-4 overflow-hidden flex bg-[#0a0a0a]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div className="flex items-center w-max" style={{ x }}>
          {duplicatedMarquee.map((item, idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <span className="mx-6 text-brand-accent text-xl">✛</span>
              <span className="text-[#8ba2b2] tracking-widest text-sm font-sans uppercase">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
        
        {/* Left Side: Let's Work Together */}
        <div className="flex-1">
          <p className="text-gray-400 text-xs font-sans tracking-widest uppercase mb-12">
            {content.footerTagline}
          </p>
          <h2 className="text-5xl md:text-7xl font-serif flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="italic text-[#e6ddd0]">LET'S</span>
            <button className="w-24 md:w-32 h-10 md:h-12 bg-brand-accent rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors group">
              <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <span className="italic text-brand-accent w-full block mt-2">
              WORK TOGETHER
            </span>
          </h2>
        </div>

        {/* Right Side: Links */}
        <div className="flex-[1.5] flex justify-end gap-20">
          <div className="flex flex-col">
            <h4 className="text-gray-400 text-xs font-sans tracking-widest uppercase mb-6">
              NAVIGATION
            </h4>
            <ul className="flex flex-col space-y-4">
              <li><Link to="/" className="text-gray-300 text-xs font-sans uppercase hover:text-brand-accent transition-colors">HOME</Link></li>
              <li><Link to="/satvastones" className="text-gray-300 text-xs font-sans uppercase hover:text-brand-accent transition-colors">SATVASTONES</Link></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="text-gray-400 text-xs font-sans tracking-widest uppercase mb-6">
              SOCIAL
            </h4>
            <ul className="flex flex-col space-y-4">
              <li><a href="https://instagram.com/daskrishhnka" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-xs font-sans uppercase hover:text-brand-accent transition-colors">INSTAGRAM</a></li>
              <li><a href="https://linkedin.com/in/anniverma" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-xs font-sans uppercase hover:text-brand-accent transition-colors">LINKEDIN</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-xs text-gray-500 font-sans">
            <span>© 2025 ANIRUDH VERMA</span>
          </div>

          <p className="text-xs text-gray-500 font-sans">
            3D ARTIST & BRAND BUILDER
          </p>
        </div>
      </div>
    </footer>
  );
}
