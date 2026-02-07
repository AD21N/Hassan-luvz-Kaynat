import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { REASONS, CUSTOM_EASE } from '../constants';

const ReasonsAccordion: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 max-w-2xl mx-auto z-10 relative">
      <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-10">Why I'm Sorry</h2>

      <div className="space-y-4">
        {REASONS.map((reason) => (
          <motion.div
            key={reason.id}
            initial={false}
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === reason.id ? null : reason.id)}
              className="w-full flex items-center justify-between p-6 text-left text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{reason.icon}</span>
                <span className="font-sans font-semibold text-lg">{reason.title}</span>
              </div>
              <motion.div
                animate={{ rotate: expandedId === reason.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 opacity-70" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {expandedId === reason.id && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.4, ease: CUSTOM_EASE }}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="h-px w-full bg-white/10 mb-4" />
                    <p className="text-white/80 font-sans leading-relaxed">
                      {reason.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReasonsAccordion;