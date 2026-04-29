import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqsLeft = [
  {
    question: "WHAT TYPE OF CREATIVE WORK DO YOU SPECIALIZE IN?",
    answer: "I specialize in 3D environment design, cinematic storytelling, and brand building. I use Blender to craft stylized visuals and immersive concepts.",
    isOpen: true,
  },
  {
    question: "HOW CAN WE COLLABORATE ON A BRAND IDENTITY?",
    answer: "You can reach out through the contact form or email. I love helping founders analyze the market and craft a premium vibe for their products.",
    isOpen: false,
  },
  {
    question: "WHAT TOOLS DO YOU USE FOR 3D ART & BRANDING?",
    answer: "My primary tool is Blender for 3D modeling and animation, combined with a deep understanding of Korean and western minimal luxury aesthetics.",
    isOpen: false,
  },
  {
    question: "CAN YOU HELP ME LAUNCH AN E-COMMERCE BRAND?",
    answer: "Absolutely! Building Satvastones gave me firsthand entrepreneurial experience in product vision, which I use to help you build your own premium identity.",
    isOpen: false,
  }
];

const faqsRight = [
  {
    question: "WHAT IS YOUR WORLD-BUILDING PROCESS LIKE?",
    answer: "My process focuses on understanding your market, developing a unique visual language, and applying a signature 3D aesthetic that makes your brand stand out.",
    isOpen: false,
  },
  {
    question: "WHAT IS SATVASTONES?",
    answer: "Satvastones is my jewelry brand concept built around minimal luxury. It’s an entrepreneurial project focused on branding, product vision, and e-commerce identity.",
    isOpen: false,
  },
  {
    question: "DO YOU WORK WITH STARTUPS AND NEW FOUNDERS?",
    answer: "Yes, I love working with passionate founders to help them understand the market, analyze trends, and design a premium vibe for their launch.",
    isOpen: true,
  },
  {
    question: "HOW LONG DOES A BRANDING & 3D PROJECT TAKE?",
    answer: "Typically, a full brand vision or 3D cinematic sequence takes about 3-6 weeks to fully develop, depending on the scope of the immersive concept.",
    isOpen: false,
  }
];

export default function FaqSection() {
  const [leftItems, setLeftItems] = useState(faqsLeft);
  const [rightItems, setRightItems] = useState(faqsRight);

  const toggleLeft = (index: number) => {
    setLeftItems(prev => prev.map((item, i) => 
      i === index ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
    ));
  };

  const toggleRight = (index: number) => {
    setRightItems(prev => prev.map((item, i) => 
      i === index ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
    ));
  };

  return (
    <section className="bg-black text-white w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden max-w-7xl mx-auto flex flex-col items-center">
      
      {/* Header */}
      <div className="mb-20 text-center">
        <h3 className="text-gray-400 text-xs tracking-widest uppercase mb-6 font-sans">FAQ'S</h3>
        <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight">
          <span className="block italic text-[#e6ddd0]">FREQUENTLY ASKED</span>
          <span className="block italic text-brand-accent">QUESTIONS</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto border-t border-white/10 md:divide-x divide-white/10">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col">
          {leftItems.map((faq, index) => (
            <div key={index} className="border-b border-white/10 px-4 py-8 group cursor-pointer" onClick={() => toggleLeft(index)}>
              <div className="flex justify-between items-start gap-4">
                <h4 className="text-sm md:text-base font-sans uppercase tracking-wide font-medium text-gray-200 mt-1">
                  {faq.question}
                </h4>
                <div className="w-8 h-8 rounded-full border border-white/10 bg-[#111] flex items-center justify-center shrink-0 text-gray-400 group-hover:bg-[#222] transition-colors">
                  {faq.isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              <AnimatePresence>
                {faq.isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 text-sm font-sans mt-6 leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col">
          {rightItems.map((faq, index) => (
            <div key={index} className="border-b border-white/10 px-4 md:px-8 py-8 group cursor-pointer" onClick={() => toggleRight(index)}>
              <div className="flex justify-between items-start gap-4">
                <h4 className="text-sm md:text-base font-sans uppercase tracking-wide font-medium text-gray-200 mt-1">
                  {faq.question}
                </h4>
                <div className="w-8 h-8 rounded-full border border-white/10 bg-[#111] flex items-center justify-center shrink-0 text-gray-400 group-hover:bg-[#222] transition-colors">
                  {faq.isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              <AnimatePresence>
                {faq.isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 text-sm font-sans mt-6 leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
