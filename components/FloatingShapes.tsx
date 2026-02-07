import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shapes = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 20,
    rotation: Math.random() * 360,
    type: Math.random() > 0.66 ? 'circle' : Math.random() > 0.33 ? 'square' : 'triangle',
    parallax: (Math.random() - 0.5) * 0.1,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/5 shadow-xl"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.type === 'triangle' ? 0 : shape.size,
            height: shape.type === 'triangle' ? 0 : shape.size,
            borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '12%' : '0%',
            // Triangle CSS hack
            borderLeft: shape.type === 'triangle' ? `${shape.size / 2}px solid transparent` : undefined,
            borderRight: shape.type === 'triangle' ? `${shape.size / 2}px solid transparent` : undefined,
            borderBottom: shape.type === 'triangle' ? `${shape.size}px solid rgba(255,255,255,0.05)` : undefined,
            background: shape.type === 'triangle' ? 'transparent' : undefined,
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [shape.rotation, shape.rotation + 360],
            x: (mousePos.x - window.innerWidth / 2) * shape.parallax,
          }}
          transition={{
            y: { duration: shape.duration, repeat: Infinity, ease: "linear" },
            rotate: { duration: shape.duration * 1.5, repeat: Infinity, ease: "linear" },
            x: { type: "spring", stiffness: 20, damping: 20 }
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;