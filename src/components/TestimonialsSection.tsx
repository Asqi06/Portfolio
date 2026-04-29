import { ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: '"Anirudh completely elevated our brand vision. His understanding of 3D aesthetics and minimal luxury helped us craft an identity that truly stands out in the market."',
    name: 'Daniel Perce',
    role: 'Founder, Aura',
    stat: '100%',
    statDesc: 'Verified Customer Testimonials',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
  },
  {
    quote: '"Working with Anirudh on our product visuals was a game-changer. He doesn\'t just design; he builds a complete vibe that audiences resonate with instantly."',
    name: 'Alexo Smith',
    role: 'Co-founder of this company',
    stat: '3x',
    statDesc: 'Faster, smarter and better',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=800&q=80',
  }
];

export default function TestimonialsSection() {
  return (
    <section className="bg-black text-white w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden max-w-5xl mx-auto flex flex-col items-center">
      
      {/* Header */}
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-serif leading-[1.1] tracking-tight">
          <span className="block italic text-[#e6ddd0] mb-2 drop-shadow-lg">WHAT MY CLIENTS SAY</span>
          <span className="block italic drop-shadow-lg">
            <span className="text-[#e6ddd0] pr-3">ABOUT</span>
            <span className="text-brand-accent">BUILDING VIBES</span>
          </span>
        </h2>
      </div>

      {/* Testimonials List */}
      <div className="flex flex-col gap-6 w-full mb-12">
        {testimonials.map((t, idx) => (
          <div 
            key={idx} 
            className="flex flex-col md:flex-row bg-gradient-to-r from-[#151515] to-black border border-white/5 rounded-2xl p-4 gap-6 md:gap-10 items-center shadow-2xl"
          >
            {/* Image */}
            <div className="w-full md:w-[180px] h-[180px] shrink-0">
              <img 
                src={t.image} 
                alt={t.name}
                className="w-full h-full object-cover rounded-xl grayscale-[20%]"
              />
            </div>

            {/* Quote and Author Info */}
            <div className="flex-1 flex flex-col justify-between py-2">
              <p className="text-lg md:text-xl font-serif italic text-gray-300 leading-relaxed mb-6">
                {t.quote}
              </p>
              <div>
                <h4 className="text-sm font-semibold font-sans text-white mb-1">{t.name}</h4>
                <p className="text-xs font-sans text-gray-500">{t.role}</p>
              </div>
            </div>

            {/* Stat */}
            <div className="w-full md:w-48 shrink-0 flex flex-col items-start md:items-end justify-center py-2 md:py-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
              <span className="text-5xl md:text-6xl font-serif italic text-brand-accent mb-2">
                {t.stat}
              </span>
              <span className="text-xs text-gray-400 font-sans md:text-right">
                {t.statDesc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <button className="px-6 py-3 rounded-xl bg-[#111] border border-white/5 flex items-center gap-2 hover:bg-[#222] transition-colors font-medium text-xs font-sans text-gray-300">
        See All testimonials
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

    </section>
  );
}
