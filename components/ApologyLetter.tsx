import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ApologyLetterProps {
  settings: {
    regret: number;
    sincerity: number;
    forgiveness: number;
  };
}

const ApologyLetter: React.FC<ApologyLetterProps> = ({ settings }) => {
  // Logic: 
  // Regret (0-100) -> Font Weight (High regret = BOLD)
  // Forgiveness (0-100) -> "Warmth" / Red Tone of the wax seal
  
  const fontWeight = 300 + (settings.regret * 4); 
  const letterSpacing = Math.max(0, (50 - settings.forgiveness) * 0.02);

  return (
    <section className="py-12 md:py-24 px-6 relative z-10">
      <div className="max-w-3xl mx-auto relative">
        
        {/* Background decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-soft-pink/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-deep-purple/20 rounded-full blur-3xl" />

        {/* The Card Container */}
        <motion.div 
          className="relative bg-[#fffcf5] text-slate-800 p-6 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply" />
          
          {/* Vintage Border */}
          <div className="absolute inset-2 md:inset-3 border-2 border-double border-slate-200 pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex justify-between items-start mb-8 md:mb-12 border-b border-slate-200 pb-4 md:pb-6">
            <div className="flex flex-col">
               <span className="font-serif italic text-slate-400 text-xs md:text-sm">Date: Today</span>
               <span className="font-serif italic text-slate-400 text-xs md:text-sm">Location: Your Heart</span>
            </div>
            
            {/* Wax Seal */}
            <div className="relative group">
                <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-md relative"
                    style={{ 
                        background: `radial-gradient(circle at 30% 30%, #ff6b6b, ${settings.forgiveness > 50 ? '#c92a2a' : '#5c1414'})`,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,0.4)'
                    }}
                >
                    <Heart className="text-white/80 w-6 h-6 md:w-8 md:h-8 drop-shadow-sm" fill="currentColor" />
                </motion.div>
                {/* Fixed tooltip alignment: Changed from centered (left-1/2 -translate-x-1/2) to right-aligned (right-0) to prevent overflow clipping */}
                <div className="absolute top-full mt-2 right-0 text-[10px] uppercase tracking-widest text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-right">
                    Official Seal of Regret
                </div>
            </div>
          </div>

          {/* Body Text */}
          <motion.div
            className="relative z-10 font-serif text-base md:text-xl leading-relaxed text-slate-700"
            transition={{ duration: 0.4 }}
            style={{ 
                fontWeight: fontWeight,
                letterSpacing: `${letterSpacing}em`
            }}
          >
            <p className="mb-4 md:mb-6">
                <span className="text-3xl md:text-4xl float-left mr-2 leading-[0.8] text-deep-purple">K</span>
                aynat Hassan,
            </p>
            
            <p className="mb-4 md:mb-6">
               I know I broke your trust last night, and I am truly sorry. What I said was harsh, and I know it hurt you badly. I can feel that pain inside me too, and it’s killing me that I became the reason for your tears. I never wanted to hurt you. But I did. And I accept that completely. I am ashamed of my words, because you didn’t deserve them. You trusted me, and I failed you in that moment.
            </p>
            
            <p className="mb-4 md:mb-6">
               I am learning you every day. I am trying to understand you, your heart, your emotions. I am trying to become better—not just for you, but because you matter so much to me. Losing your trust scares me more than anything. I want to be with you today, tomorrow, and always. Not just when things are easy, but when they are hard. I promise I will never put you in a place where you doubt yourself or feel small because of me. Please believe me when I say this: I will always be there for you, even when you are tired, broken, or can’t stand for yourself.
            </p>

            <p className="mb-6 md:mb-8">
               Please forgive me, bubbu. I am truly sorry from the deepest part of my heart. 🫀🥲
            </p>
            
            <div className="flex justify-end mt-8 md:mt-12">
                <div className="text-right">
                    <p className="font-script text-2xl md:text-3xl text-deep-purple mb-2">Yours, Always</p>
                    <div className="h-0.5 w-24 md:w-32 bg-slate-300 ml-auto" />
                </div>
            </div>
          </motion.div>

          {/* Sincerity Warning Stamp */}
          {settings.sincerity < 30 && (
             <motion.div 
                initial={{ scale: 2, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 0.8, rotate: -12 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-800 text-red-800 px-4 py-2 md:px-6 md:py-2 rounded-lg z-20 pointer-events-none mix-blend-multiply"
             >
                <span className="font-bold text-2xl md:text-4xl uppercase tracking-widest">INSINCERE</span>
             </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default ApologyLetter;