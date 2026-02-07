import React from 'react';
import { motion } from 'framer-motion';
import { STARS } from '../constants';

const ComplimentConstellation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {STARS.map((star) => (
        <div
          key={star.id}
          className="absolute pointer-events-auto group"
          style={{ top: `${star.top}%`, left: `${star.left}%` }}
        >
          {/* The Star */}
          <motion.div
            className="w-1 h-1 bg-white rounded-full shadow-[0_0_4px_#fff]"
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, delay: star.delay, repeat: Infinity }}
          />
          
          {/* The Tooltip */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] px-2 py-1 rounded-md text-center shadow-lg">
              {star.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplimentConstellation;