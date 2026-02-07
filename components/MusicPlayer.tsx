import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause } from 'lucide-react';
import { CUSTOM_EASE } from '../constants';

interface MusicPlayerProps {
    isPlaying: boolean;
    onToggle: () => void;
    hasTrack: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle, hasTrack }) => {
  // If no track was uploaded, we don't show the player
  if (!hasTrack) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, ease: CUSTOM_EASE }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 transition-colors group"
    >
        <AnimatePresence mode="wait">
            {isPlaying ? (
                <motion.div
                    key="playing"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                >
                    <Music className="w-6 h-6 animate-pulse text-soft-pink" />
                </motion.div>
            ) : (
                <motion.div
                    key="paused"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                >
                    <Pause className="w-6 h-6 text-gray-300 group-hover:text-white" />
                </motion.div>
            )}
        </AnimatePresence>
    </motion.button>
  );
};

export default MusicPlayer;