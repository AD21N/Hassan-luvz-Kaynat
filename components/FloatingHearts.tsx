import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random hearts
  const hearts = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // Random horizontal position 0-100%
    y: Math.random() * 120 - 10, // Random vertical position -10% to 110%
    size: Math.random() * 25 + 10, // Size between 10px and 35px
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 15, // Much slower float 15-30s
    // Significantly reduced parallax factor for subtle movement
    parallaxFactor: (Math.random() - 0.5) * 0.03, 
    opacity: Math.random() * 0.3 + 0.1, // Random opacity for depth
    floatRange: Math.random() * 100 + 50, // How far up it floats
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-soft-pink"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -heart.floatRange, 0],
            x: (mousePos.x - window.innerWidth / 2) * heart.parallaxFactor,
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: heart.delay,
            },
            // Very low stiffness and high mass creates a "deep sea" slow drift effect
            x: { type: "spring", stiffness: 0.5, damping: 40, mass: 15 }, 
            rotate: {
              duration: heart.duration * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;