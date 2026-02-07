import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROMISES, CUSTOM_EASE } from '../constants';

const PromisesChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(prev => prev.filter(i => i !== id));
    } else {
      setCheckedItems(prev => [...prev, id]);
      // Trigger mini confetti burst
      // @ts-ignore
      if (typeof window.confetti === 'function' || typeof confetti === 'function') {
        // @ts-ignore
        (window.confetti || confetti)({
            particleCount: 30,
            spread: 40,
            origin: { y: 0.5 },
            colors: ['#ED64A6', '#ffffff'],
            shapes: ['circle'],
            scalar: 0.8
        });
      }
    }
  };

  return (
    <section className="py-20 px-6 max-w-2xl mx-auto z-10 relative">
      <h2 className="text-3xl font-serif text-white text-center mb-10">The "I Promise" List</h2>
      
      <div className="grid gap-4">
        {PROMISES.map((promise) => {
          const isChecked = checkedItems.includes(promise.id);
          return (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onClick={() => toggleCheck(promise.id)}
              className={`
                group relative flex items-center p-5 rounded-2xl cursor-pointer transition-all duration-300
                ${isChecked ? 'bg-soft-pink/20 border-soft-pink/50' : 'bg-white/5 border-white/10'}
                border backdrop-blur-md hover:bg-white/10
              `}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 mr-6 transition-all duration-300
                ${isChecked ? 'bg-soft-pink border-soft-pink scale-110' : 'border-white/30 group-hover:border-white/60'}
              `}>
                <AnimatePresence>
                  {isChecked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <span className={`
                font-sans text-lg transition-all duration-300
                ${isChecked ? 'text-white line-through opacity-50' : 'text-white/90'}
              `}>
                {promise.text}
              </span>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default PromisesChecklist;