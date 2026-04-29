import { useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react';

export default function LogoStrip() {
  const logos = [
    { name: "Blender", icon: "📐" },
    { name: "After Effects", icon: "🎬" },
    { name: "Blender", icon: "📐" },
    { name: "After Effects", icon: "🎬" },
  ];

  // Duplicate the array for a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Normal speed vs Hovered speed
  // Use a smaller negative number for slower speed.
  // Slow down drastically on hover.
  const baseVelocity = isHovered ? -0.01 : -0.05;

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 16.666);
    let newX = baseX.get() + moveBy;
    // We are translating by percentage. When we hit -50%, we reset to 0%.
    if (newX <= -50) newX += 50;
    if (newX > 0) newX -= 50;
    baseX.set(newX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div 
      className="bg-black border-y border-white/5 w-full overflow-hidden flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex"
        style={{ x }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 min-w-[150px] md:min-w-[250px] py-8 flex items-center justify-center grayscale opacity-30 hover:opacity-100 transition-opacity cursor-default group"
          >
            <div className="flex items-center space-x-2 border-l border-white/10 w-full justify-center">
              {logo.icon && <span className="text-sm">{logo.icon}</span>}
              <span className={`text-xl font-bold tracking-tight font-sans`}>
                {logo.name}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
