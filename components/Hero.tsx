import React from 'react';
import { motion } from 'framer-motion';
import { CUSTOM_EASE } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10 pt-20">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: CUSTOM_EASE }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-soft-pink to-white drop-shadow-2xl tracking-tight">
            The "I Messed Up" Portal
          </h1>
          <p className="mt-4 text-white/50 text-sm font-mono tracking-widest uppercase">
            Project: Forgiveness / Status: Pending
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-xl w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: [0, -15, 0] }}
          transition={{
            scale: { duration: 1, ease: CUSTOM_EASE, delay: 0.2 },
            opacity: { duration: 1, delay: 0.2 },
            rotateX: { duration: 1, ease: CUSTOM_EASE },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ perspective: 1000 }}
        >
          {/* Glow effect behind card */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-purple/20 to-soft-pink/20 blur-3xl -z-10 rounded-[2rem]" />

          <h2 className="text-2xl font-serif text-white mb-6 italic border-b border-white/10 pb-4 inline-block">
            To My Favorite Person
          </h2>
          
          <div className="space-y-4 text-left">
            <p className="text-white/80 font-sans leading-relaxed text-lg">
              I messed up. There's no fancy code or animation that can hide that fact. 
            </p>
            <p className="text-white/80 font-sans leading-relaxed text-lg">
              I broke your trust, and that hurts me more than anything. This portal isn't just a joke—it's my way of saying I am <span className="text-soft-pink font-bold">1000% dedicated</span> to fixing this.
            </p>
            <p className="text-white/80 font-sans leading-relaxed text-lg">
              I'm ready to listen, change, and do whatever it takes to see you smile again.
            </p>
          </div>

          <div className="mt-8 flex justify-end">
             <span className="font-serif italic text-white/60">Sincerely, Me.</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Initiate Rebuild Sequence</span>
        <motion.div 
          className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
          animate={{ height: [0, 48, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;