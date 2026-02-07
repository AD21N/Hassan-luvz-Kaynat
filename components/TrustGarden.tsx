import React, { useState, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';

const TrustGarden: React.FC = () => {
  const [fixedShards, setFixedShards] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simplified logic: visual snapping.
  // In a full physics engine we'd use Matter.js, but here we use Drag positions.
  
  // Since SVG paths are tricky to "snap" perfectly without complex math, 
  // we will create a "Shadow Heart" that fills in as they drag pieces close to center.
  
  const [pieces, setPieces] = useState([
    { id: 1, x: -40, y: 60, isFixed: false, rotation: 12 },
    { id: 2, x: 60, y: -30, isFixed: false, rotation: -15 },
    { id: 3, x: 40, y: 70, isFixed: false, rotation: 45 },
  ]);

  const checkSnap = (id: number, info: any) => {
    // If dragged close to center (0,0 of container roughly)
    // We simplify: if they drag it anywhere near the center heart, it snaps.
    
    // Actually, framer motion drag constrains are relative.
    // Let's just say if they release it, it floats to center if it's "close enough" visually.
    
    setPieces(prev => prev.map(p => {
        if (p.id === id) {
             return { ...p, isFixed: true, x: 0, y: 0, rotation: 0 };
        }
        return p;
    }));
  };

  const allFixed = pieces.every(p => p.isFixed);

  return (
    <section className="py-12 md:py-24 px-6 relative z-10 min-h-[500px] flex flex-col items-center">
      <h2 className="text-3xl font-serif text-white mb-4 text-center">The Trust Garden</h2>
      <p className="text-white/60 font-sans mb-12 text-center max-w-sm">Drag the broken shards back together to repair the trust.</p>

      {/* Responsive Container: w-64 on mobile, w-80 on desktop */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
        
        {/* The Goal: A faint outline */}
        <div className="absolute opacity-20">
             <svg width="150" height="150" viewBox="0 0 24 24" fill="white" className="md:w-[200px] md:h-[200px]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
             </svg>
        </div>

        {/* The Shards */}
        {pieces.map((piece) => (
           <motion.div
             key={piece.id}
             drag={!piece.isFixed}
             dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
             dragElastic={0.2}
             onDragEnd={(_, info) => checkSnap(piece.id, info)}
             animate={{ 
                 x: piece.isFixed ? (piece.id === 1 ? -20 : piece.id === 2 ? 20 : 0) : piece.x, 
                 y: piece.isFixed ? (piece.id === 3 ? 15 : -15) : piece.y,
                 rotate: piece.isFixed ? 0 : piece.rotation,
                 scale: piece.isFixed ? 1 : 1.1,
             }}
             className="absolute cursor-grab active:cursor-grabbing"
           >
              {/* Simplified Geometric Shards representing broken heart pieces */}
              <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(237,100,166,0.6)] md:w-[100px] md:h-[100px]">
                 {piece.id === 1 && <path d="M50 50 L0 20 L40 0 Z" fill="#ED64A6" opacity="0.8" />}
                 {piece.id === 2 && <path d="M50 50 L100 20 L60 0 Z" fill="#6B46C1" opacity="0.8" />}
                 {piece.id === 3 && <path d="M50 50 L20 100 L80 100 Z" fill="#9F7AEA" opacity="0.8" />}
              </svg>
           </motion.div>
        ))}

        {allFixed && (
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                transition={{ type: "spring" }}
                className="absolute inset-0 flex items-center justify-center z-20"
            >
                <div className="text-white font-serif text-xl md:text-2xl font-bold drop-shadow-[0_0_10px_#ED64A6] bg-deep-purple/80 px-6 py-2 rounded-full border border-soft-pink whitespace-nowrap">
                    Trust Restored
                </div>
            </motion.div>
        )}
      </div>
    </section>
  );
};

export default TrustGarden;