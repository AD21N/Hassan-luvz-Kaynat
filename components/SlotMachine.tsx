import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SLOT_ITEMS } from '../constants';

const SlotMachine: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof SLOT_ITEMS[0] | null>(null);

  const spin = () => {
    setSpinning(true);
    setResult(null);
    
    // Fake spin delay
    setTimeout(() => {
        const randomItem = SLOT_ITEMS[Math.floor(Math.random() * SLOT_ITEMS.length)];
        setResult(randomItem);
        setSpinning(false);
    }, 2000);
  };

  return (
    <section className="py-12 md:py-24 px-6 relative z-10 flex flex-col items-center">
      <h2 className="text-3xl font-serif text-white mb-8 text-center">The "Make It Up To You" Machine</h2>
      
      <div className="bg-gradient-to-b from-gray-800 to-black p-4 rounded-[2rem] border-4 border-gray-700 shadow-2xl relative w-full max-w-[20rem] md:max-w-sm">
        <div className="flex gap-2 bg-white rounded-xl overflow-hidden p-2 h-40 w-full relative">
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-xl border-[6px] border-black/20" />
            
            {/* The Reels (Simplified as one big window for cohesion) */}
            <div className="flex-1 bg-white flex items-center justify-center text-4xl overflow-hidden relative">
                <motion.div
                    animate={spinning ? { y: [0, -1000] } : { y: 0 }}
                    transition={spinning ? { repeat: Infinity, duration: 0.2, ease: "linear" } : { type: "spring" }}
                    className="flex flex-col items-center gap-10"
                >
                    {spinning ? (
                        SLOT_ITEMS.map((item, i) => (
                            <div key={i} className="h-40 flex items-center opacity-50 blur-sm grayscale">{item.icon}</div>
                        ))
                    ) : (
                        <div className="h-40 flex items-center scale-150">
                            {result ? result.icon : "❓"}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>

        {/* Spin Button */}
        <div className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2">
             <motion.button
                onClick={spin}
                disabled={spinning}
                whileTap={{ scale: 0.9, y: 10 }}
                className={`w-10 md:w-12 h-20 md:h-24 rounded-full border-4 border-gray-900 shadow-xl flex flex-col items-center justify-center transition-colors ${spinning ? 'bg-gray-600' : 'bg-red-500 cursor-pointer'}`}
             >
                <div className="w-3 md:w-4 h-3 md:h-4 bg-white/50 rounded-full mb-8" />
             </motion.button>
        </div>
      </div>

      {/* Result Display */}
      <div className="h-24 mt-8 flex items-center justify-center px-4">
         {result && !spinning && (
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
             >
                 <p className="text-white/60 font-mono text-xs uppercase mb-2">I owe you:</p>
                 <p className="text-2xl font-bold text-soft-pink">{result.text}</p>
                 <p className="text-white/40 text-[10px] mt-1">(and 1000 other things)</p>
             </motion.div>
         )}
      </div>
    </section>
  );
};

export default SlotMachine;