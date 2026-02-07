import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ImpossibleButtonProps {
  onForgive: () => void;
}

const ImpossibleButton: React.FC<ImpossibleButtonProps> = ({ onForgive }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [noBtnScale, setNoBtnScale] = useState(1);
  
  const moveButton = () => {
    const maxOffset = 250;
    
    let newX = (Math.random() - 0.5) * maxOffset * 2;
    let newY = (Math.random() - 0.5) * maxOffset * 2;
    
    if (window.innerWidth < 768) {
         newX = (Math.random() - 0.5) * 150;
         newY = (Math.random() - 0.5) * 150;
    }

    setNoBtnPosition({ x: newX, y: newY });
    // Shrink the button every time it moves
    setNoBtnScale(prev => Math.max(0, prev - 0.1));
  };

  const handleYes = () => {
    // Trigger the main celebration
    // @ts-ignore
    if (typeof window.confetti === 'function' || typeof confetti === 'function') {
        const duration = 5000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          // @ts-ignore
          (window.confetti || confetti)(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          // @ts-ignore
          (window.confetti || confetti)(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
    
    onForgive();
  };

  return (
    <section className="py-32 px-6 text-center z-10 relative overflow-hidden">
      <h2 className="text-4xl md:text-6xl font-serif text-white mb-16">The Verdict</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[300px]">
        <motion.button
          onClick={handleYes}
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px #ED64A6" }}
          whileTap={{ scale: 0.9 }}
          className="px-12 py-6 bg-gradient-to-r from-soft-pink to-deep-purple text-white rounded-full font-bold text-2xl shadow-xl transition-all z-20"
        >
          YES, I FORGIVE YOU
        </motion.button>

        <div className="relative z-10 w-full md:w-auto h-20 flex items-center justify-center">
          <motion.button
            animate={{ 
                x: noBtnPosition.x, 
                y: noBtnPosition.y,
                scale: noBtnScale,
                opacity: noBtnScale 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            className="px-12 py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white/50 rounded-full font-bold text-xl cursor-not-allowed whitespace-nowrap"
          >
            NOPE
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ImpossibleButton;