import React from 'react';
import { motion } from 'framer-motion';
import { HeartCrack, Heart } from 'lucide-react';

interface LoveInfuserProps {
  level: number;
  setLevel: (val: number) => void;
}

const LoveInfuser: React.FC<LoveInfuserProps> = ({ level, setLevel }) => {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto text-center z-10 relative">
      <h2 className="text-3xl font-serif text-white mb-4">Love Infuser</h2>
      <p className="text-white/60 font-sans mb-12">Slide to adjust the atmosphere from "Gloomy" to "Loving"</p>

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="flex justify-between items-center mb-8 text-white/80">
          <div className="flex flex-col items-center gap-2">
            <HeartCrack className={`w-8 h-8 ${level < 30 ? 'text-gray-400' : 'text-white/20'}`} />
            <span className="text-xs font-mono uppercase tracking-widest">Mad</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Heart className={`w-8 h-8 ${level > 70 ? 'text-soft-pink fill-soft-pink' : 'text-white/20'}`} />
            <span className="text-xs font-mono uppercase tracking-widest">Forgiving</span>
          </div>
        </div>

        <div className="relative w-full h-4 bg-black/40 rounded-full">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-deep-purple to-soft-pink rounded-full"
                style={{ width: `${level}%` }}
            />
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={level} 
                onChange={(e) => setLevel(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {/* Thumb Indicator */}
            <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(237,100,166,0.8)] pointer-events-none flex items-center justify-center text-[10px] font-bold text-deep-purple"
                style={{ left: `calc(${level}% - 16px)` }}
            >
                {level}%
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoveInfuser;