import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Heart, Droplets } from 'lucide-react';
import { CUSTOM_EASE } from '../constants';
import confetti from 'canvas-confetti'; // Assuming environment supports this, otherwise we degrade gracefully

const TrustMeter: React.FC = () => {
  const [fillLevel, setFillLevel] = useState(10);
  const controls = useAnimation();

  const handleInject = () => {
    if (fillLevel >= 100) return;

    const increment = Math.floor(Math.random() * 15) + 10;
    const newLevel = Math.min(fillLevel + increment, 100);
    
    setFillLevel(newLevel);

    // Heartbeat animation on button
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    });

    if (newLevel === 100) {
      // Trigger confetti from screen edges
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        // Simple confetti simulation if canvas-confetti isn't actually installed, 
        // but since I can't check run-time env, I'll write the logic assuming it works 
        // or just rely on CSS visual cues if it fails.
        try {
            // @ts-ignore
            if (typeof window.confetti === 'function' || typeof confetti === 'function') {
                const colors = ['#6B46C1', '#ED64A6', '#ffffff'];
                // @ts-ignore
                (window.confetti || confetti)({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                // @ts-ignore
                (window.confetti || confetti)({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });
            }
        } catch (e) {
            // Fallback
        }

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center z-10 relative">
      <h2 className="text-3xl md:text-4xl font-serif text-white mb-12">The Trust Meter</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* The Gauge */}
        <div className="relative w-24 h-64 md:w-32 md:h-80 bg-white/10 backdrop-blur-md rounded-full border-4 border-white/30 overflow-hidden shadow-inner">
           {/* Liquid */}
           <motion.div 
             className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-deep-purple to-soft-pink opacity-80"
             initial={{ height: "10%" }}
             animate={{ height: `${fillLevel}%` }}
             transition={{ type: "spring", stiffness: 50, damping: 15 }}
           >
              {/* Bubbles */}
              <div className="absolute top-0 left-0 w-full h-2 bg-white/30 animate-pulse" />
           </motion.div>
           
           {/* Percentage Text */}
           <div className="absolute inset-0 flex items-center justify-center z-10">
             <span className="text-3xl font-bold text-white drop-shadow-md">{fillLevel}%</span>
           </div>
        </div>

        {/* The Controls */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-white/80 font-sans max-w-xs">
            The tank is running low. I need your help to fill it back up with sincerity and love.
          </p>
          
          <motion.button
            onClick={handleInject}
            animate={controls}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={fillLevel >= 100}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all
              ${fillLevel >= 100 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-white text-deep-purple hover:bg-soft-pink hover:text-white'}
            `}
          >
            {fillLevel >= 100 ? (
              <>
                <Heart className="fill-current" /> Tank Full!
              </>
            ) : (
              <>
                <Droplets className="w-6 h-6" /> Inject Sincerity
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TrustMeter;