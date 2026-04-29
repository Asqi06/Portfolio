export default function AboutSection() {
  return (
    <section className="bg-black w-full py-16 px-8 md:px-16 overflow-hidden relative max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
      
      {/* Top Row: Small Image and Text Paragraph */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full relative z-10 mb-20 md:mb-10 lg:mb-0">
        
        <div className="w-56 h-72 md:w-72 md:h-[380px] shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" 
            alt="Portrait red background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-md mt-10 md:mt-0 md:pr-4 lg:pr-16 text-gray-300 text-xs md:text-sm leading-relaxed font-sans md:w-1/2">
          'I’m a 3D artist and creative builder focused on environment design, cinematic storytelling, animation, and experimental 3D projects. I work with Blender to create stylized visuals, short film concepts, and immersive ideas that combine art with technology.'
        </div>

      </div>

      {/* Vertical line separator */}
      <div className="absolute left-1/2 top-[30%] w-px h-16 md:h-32 bg-white/20 -translate-x-1/2 z-0"></div>

      {/* Bottom Area: Large Text and Large Image */}
      <div className="relative w-full flex flex-col md:block mt-10 lg:-mt-10">
        
        {/* Large Image - position absolute on desktop to allow overlap */}
        <div className="w-full h-[500px] md:absolute md:right-0 md:top-[-150px] md:w-[350px] md:h-[500px] lg:w-[450px] lg:h-[650px] z-0 order-first md:order-last mb-10 md:mb-0">
          <img 
            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80" 
            alt="Editorial portrait"
            className="w-full h-full object-cover grayscale-[20%]"
          />
        </div>

        {/* Huge Text */}
        <div className="relative z-10 w-full pt-10 md:pt-20 pb-10">
          <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif leading-[1.1] tracking-tight">
            <span className="block italic text-[#e6ddd0] drop-shadow-xl">CREATIVE BUILDER</span>
            <span className="block italic text-brand-accent md:ml-32 lg:ml-48 drop-shadow-xl">ANIRUDH VERMA</span>
          </h2>
        </div>

      </div>
    </section>
  );
}
