import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MEMORIES } from '../constants';

const MemoriesGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 z-10 relative">
      <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-12">Happier Times (Coming Soon)</h2>
      
      {/* Horizontal Scroll Container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto space-x-8 px-8 pb-12 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {MEMORIES.map((memory) => (
          <motion.div
            key={memory.id}
            className="flex-shrink-0 snap-center relative group"
            initial={{ rotate: memory.rotation }}
            whileHover={{ 
              rotate: 0, 
              scale: 1.05,
              zIndex: 10,
              transition: { duration: 0.3 } 
            }}
          >
            <div className="bg-white p-4 pb-12 shadow-2xl w-64 md:w-72 transform transition-transform">
              <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-4">
                <img 
                  src={memory.src} 
                  alt={memory.caption}
                  className="w-full h-full object-cover filter sepia-[.2] group-hover:sepia-0 transition-all duration-500" 
                />
              </div>
              <p className="font-serif text-gray-800 text-center text-lg italic absolute bottom-4 left-0 right-0">
                {memory.caption}
              </p>
            </div>
          </motion.div>
        ))}
        
        {/* Padding at end to allow scrolling */}
        <div className="w-8 flex-shrink-0" />
      </div>
    </section>
  );
};

export default MemoriesGallery;