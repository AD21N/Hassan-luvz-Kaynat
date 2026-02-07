import React from 'react';
import { motion } from 'framer-motion';
import { CUSTOM_EASE } from '../constants';
import { Star, Award } from 'lucide-react';

const CertificateModal: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full max-w-lg bg-white text-deep-purple p-1 border-8 border-double border-soft-pink rounded-lg shadow-[0_0_100px_rgba(237,100,166,0.6)]"
      >
        <div className="border-4 border-deep-purple p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
          <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="mx-auto w-16 h-16 mb-6 text-soft-pink"
          >
            <Award className="w-full h-full" />
          </motion.div>
          
          <h2 className="text-4xl font-serif font-bold mb-2 uppercase tracking-widest text-deep-purple">Certificate</h2>
          <h3 className="text-xl font-serif italic mb-6 text-soft-pink">of Forgiveness</h3>
          
          <p className="font-sans mb-8 leading-relaxed text-gray-700">
            This certifies that the Best Girlfriend in the World has officially granted a second chance to her Goober Boyfriend.
          </p>

          <div className="flex justify-center gap-2 mb-8">
            <Star className="fill-yellow-400 text-yellow-400" />
            <Star className="fill-yellow-400 text-yellow-400" />
            <Star className="fill-yellow-400 text-yellow-400" />
            <Star className="fill-yellow-400 text-yellow-400" />
            <Star className="fill-yellow-400 text-yellow-400" />
          </div>

          <div className="border-t-2 border-gray-300 pt-4 w-48 mx-auto">
            <p className="font-script text-2xl text-deep-purple">Her Signature</p>
          </div>
        </div>

        {/* Floating Sparkles */}
        <motion.div 
            className="absolute -top-6 -right-6 text-yellow-300"
            animate={{ scale: [1, 1.5, 1], rotate: [0, 45, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
            <Star className="w-12 h-12 fill-current" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CertificateModal;