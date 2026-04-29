import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-16 px-6 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">About Me</h2>
            <p className="text-4xl md:text-5xl font-display font-light leading-snug tracking-tight">
              I BELIEVE IN THE POWER OF <span className="text-brand-accent italic font-bold">MINIMALISM</span> AND THE PRECISION OF CLEAN CODE. 
              MY JOURNEY IS A CONTINUOUS SEARCH FOR THE PERFECT BALANCE BETWEEN AESTHETICS AND FUNCTIONALITY.
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="border-l border-white/20 pl-8"
            >
              <h3 className="text-lg font-bold uppercase mb-4 tracking-widest">Experience</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1 font-medium">
                    <span>Lead Developer @ Nexus</span>
                    <span className="text-gray-500">2023 - Present</span>
                  </div>
                  <p className="text-sm text-gray-400 font-light italic">Pushing the boundaries of web performace.</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 font-medium">
                    <span>UI/UX Designer @ Ghost</span>
                    <span className="text-gray-500">2021 - 2023</span>
                  </div>
                  <p className="text-sm text-gray-400 font-light italic">Designing interfaces for the next generation.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="border-l border-white/20 pl-8"
            >
              <h3 className="text-lg font-bold uppercase mb-4 tracking-widest">Capabilities</h3>
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-mono text-gray-400">
                <span>FRONTEND ARCHITECTURE</span>
                <span>CREATIVE CODING</span>
                <span>SYSTEM DESIGN</span>
                <span>PERFORMANCE OPTIMIZATION</span>
                <span>INTERACTION DESIGN</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
