import React from 'react';
import { motion } from 'framer-motion';
import { COMPLIMENTS } from '../constants';

const MoodScroller: React.FC = () => {
  return (
    <div className="relative py-12 z-10 overflow-hidden bg-black/20 backdrop-blur-sm border-y border-white/5">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a0524] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a0524] to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap gap-16"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...COMPLIMENTS, ...COMPLIMENTS, ...COMPLIMENTS].map((text, i) => (
          <span 
            key={i} 
            className="text-2xl md:text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/10"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MoodScroller;