import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CUSTOM_EASE } from '../constants';

// --- SVG Components ---

const HeroFlower: React.FC<{ color: string; size: number; className?: string }> = ({ color, size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "drop-shadow(0px 0px 20px rgba(237, 100, 166, 0.4))" }}
  >
    {/* Base Layers */}
    <path d="M50 50 C50 50 80 20 50 10 C20 20 50 50 50 50Z" fill={color} />
    <path d="M50 50 C50 50 90 50 90 50 C80 80 50 50 50 50Z" fill={color} />
    <path d="M50 50 C50 50 50 90 50 90 C20 80 50 50 50 50Z" fill={color} />
    <path d="M50 50 C50 50 10 50 10 50 C20 20 50 50 50 50Z" fill={color} />
    
    {/* Inner Petals */}
    <path d="M50 50 C50 50 70 30 50 20 C30 30 50 50 50 50Z" fill="#FBCFE8" opacity="0.9" />
    <path d="M50 50 C50 50 80 50 80 50 C70 70 50 50 50 50Z" fill="#FBCFE8" opacity="0.9" />
    <path d="M50 50 C50 50 50 80 50 80 C30 70 50 50 50 50Z" fill="#FBCFE8" opacity="0.9" />
    <path d="M50 50 C50 50 20 50 20 50 C30 30 50 50 50 50Z" fill="#FBCFE8" opacity="0.9" />

    {/* Center */}
    <circle cx="50" cy="50" r="15" fill="#FDBA74" />
    <circle cx="50" cy="50" r="10" fill="#F59E0B" />
    <circle cx="55" cy="45" r="3" fill="white" opacity="0.5" />
  </svg>
);

const SupportingPetal: React.FC<{ color: string; size: number }> = ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
         <path d="M50 100 C50 100 0 50 50 0 C100 50 50 100 50 100Z" fill={color} />
    </svg>
);

const FlyingPetal: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ED64A6">
        <path d="M12 24C12 24 2 12 12 0C22 12 12 24 12 24Z" />
    </svg>
);

// --- Types ---

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  velocity: number;
}

// --- Main Component ---

const FlowerBouquetBanner: React.FC = () => {
  const [isBloomed, setIsBloomed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleInteraction = () => {
    if (isBloomed) {
        setIsBloomed(false);
        return;
    }
    
    setIsBloomed(true);

    // Generate burst particles
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300, // Wide spread
      y: (Math.random() - 0.5) * 300, 
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      velocity: Math.random() * 100 + 50
    }));
    setParticles(newParticles);

    // Cleanup particles
    setTimeout(() => setParticles([]), 3000);
  };

  // Surrounding flowers arrangement
  const bouquetLayers = [
    { id: 1, color: "#8B5CF6", size: 80, angle: 0, distance: 40, delay: 0 },
    { id: 2, color: "#D946EF", size: 80, angle: 60, distance: 40, delay: 0.05 },
    { id: 3, color: "#8B5CF6", size: 80, angle: 120, distance: 40, delay: 0.1 },
    { id: 4, color: "#D946EF", size: 80, angle: 180, distance: 40, delay: 0.15 },
    { id: 5, color: "#8B5CF6", size: 80, angle: 240, distance: 40, delay: 0.2 },
    { id: 6, color: "#D946EF", size: 80, angle: 300, distance: 40, delay: 0.25 },
  ];

  return (
    <header className="relative w-full min-h-[400px] md:h-[500px] bg-transparent flex flex-col items-center justify-center overflow-visible z-20 py-10">
      
      {/* Background Ambience - kept subtle for depth without breaking flow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-deep-purple/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Floating Wrapper */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        
        {/* --- Particles System --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                        animate={{ 
                            x: p.x, 
                            y: p.y + 200, // Add gravity fall
                            rotate: p.rotation + 180,
                            opacity: 0 
                        }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="absolute"
                    >
                        <FlyingPetal />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {/* --- The Bouquet --- */}
        <div 
          className="relative w-64 h-64 flex items-center justify-center cursor-pointer group transform scale-90 md:scale-100" 
          onClick={handleInteraction}
        >
            
            {/* Surrounding Petals (Fan Out) */}
            {bouquetLayers.map((petal) => (
                <motion.div
                    key={petal.id}
                    className="absolute"
                    initial={{ scale: 0.8, x: 0, y: 0, opacity: 0.8 }}
                    animate={isBloomed ? {
                        x: Math.cos(petal.angle * (Math.PI / 180)) * (petal.distance + 40),
                        y: Math.sin(petal.angle * (Math.PI / 180)) * (petal.distance + 40),
                        rotate: petal.angle + 90,
                        scale: 1,
                        opacity: 1
                    } : {
                        x: Math.cos(petal.angle * (Math.PI / 180)) * (petal.distance),
                        y: Math.sin(petal.angle * (Math.PI / 180)) * (petal.distance),
                        rotate: petal.angle + 90,
                        scale: 0.8,
                        opacity: 0.6
                    }}
                    transition={{ duration: 0.8, ease: CUSTOM_EASE, delay: petal.delay }}
                >
                    <SupportingPetal color={petal.color} size={petal.size} />
                </motion.div>
            ))}

            {/* Central Hero Flower */}
            <motion.div
                className="relative z-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isBloomed ? 180 : 0 }}
                transition={{ duration: 1.5, ease: CUSTOM_EASE }}
            >
                <div className="relative">
                    <HeroFlower color="#BE123C" size={120} />
                    
                    {/* Pulse Effect */}
                    <motion.div 
                        className="absolute inset-0 rounded-full bg-soft-pink/30 blur-xl -z-10"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
            </motion.div>

            {/* Click Hint */}
            <AnimatePresence>
                {!isBloomed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-12 text-white/50 text-xs font-serif tracking-widest uppercase whitespace-nowrap"
                    >
                        Touch to Bloom
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* --- Message Reveal --- */}
        <div className="min-h-[6rem] mt-8 px-4 flex items-center justify-center overflow-visible">
            <AnimatePresence>
                {isBloomed && (
                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
                        transition={{ duration: 0.8, ease: CUSTOM_EASE }}
                        className="text-center"
                    >
                        <h1 className="font-serif text-4xl md:text-6xl text-white mb-2 drop-shadow-lg leading-tight">
                            SORRY KAYNAT
                        </h1>
                        <p className="font-sans text-soft-pink/80 text-sm tracking-widest uppercase">
                            Let's grow together again
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

      </motion.div>
    </header>
  );
};

export default FlowerBouquetBanner;