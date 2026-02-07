import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Heart } from 'lucide-react';
import { CUSTOM_EASE } from '../constants';

interface LoadingScreenProps {
  onComplete: () => void;
  onPlayMusic: () => void;
  onPauseMusic: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  onPlayMusic, 
  onPauseMusic,
}) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let interval: any;
    
    // Note: We moved the onPlayMusic/onPauseMusic calls to the event handlers
    // (onMouseDown/onTouchStart) to satisfy browser autoplay policies that require
    // a direct user gesture to start audio context.

    if (isHolding) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2; // Speed of fill
        });
      }, 30);
    } else {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) return 0;
          return prev - 5; // Drain speed
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isHolding]);

  useEffect(() => {
    if (progress >= 100) {
      handleComplete();
    }
  }, [progress]);

  const handleComplete = async () => {
    await controls.start({
      scale: [1, 15],
      opacity: 0,
      transition: { duration: 0.8, ease: CUSTOM_EASE }
    });
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      exit={{ opacity: 0, pointerEvents: "none" }}
    >
      <motion.div animate={controls} className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6">
        <h1 className="text-white/60 font-serif tracking-widest uppercase text-sm mb-4 text-center">
          Establish Sincerity Connection
        </h1>

        <div 
          className="relative w-48 h-48 rounded-full border border-white/20 cursor-pointer overflow-hidden group select-none touch-none"
          onMouseDown={() => {
            setIsHolding(true);
            onPlayMusic();
          }}
          onMouseUp={() => {
            setIsHolding(false);
            onPauseMusic();
          }}
          onTouchStart={(e) => { 
            e.preventDefault(); 
            setIsHolding(true); 
            onPlayMusic(); 
          }}
          onTouchEnd={() => {
            setIsHolding(false);
            onPauseMusic();
          }}
          onMouseLeave={() => {
            setIsHolding(false);
            onPauseMusic();
          }}
        >
          {/* Liquid Fill */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-deep-purple to-soft-pink"
            style={{ height: `${progress}%` }}
          />

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart 
              className={`w-16 h-16 transition-colors duration-300 ${progress > 50 ? 'text-white' : 'text-gray-600'}`} 
              fill={progress > 50 ? "currentColor" : "none"}
            />
          </div>

          {/* Instructions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="mt-24 text-xs text-white font-mono tracking-widest uppercase">Hold</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-white/50 text-xs font-mono">
            {progress < 100 ? "Hold heart to inject love & start music" : "Access Granted"}
            </p>
            <p className="text-white/20 text-[10px] uppercase tracking-widest">
            Don't let go
            </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;