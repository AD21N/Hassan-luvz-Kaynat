import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

// Direct import of non-JS files (like .mp3) causes errors in browser-native ESM.
// We use the static path instead, assuming the file is served from the root.
const musicUrl = '/music.mp3';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const playMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        removeListeners();
      } catch (err) {
        // Autoplay blocked. Expected behavior.
        setIsPlaying(false);
      }
    };

    // 1. Try to play immediately on load (often blocked)
    playMusic();

    // 2. List of every possible interaction that counts as "user activity"
    // Added 'mousedown' so music starts as soon as user clicks the heart (hold action)
    const events = [
      'click', 
      'mousedown',
      'touchstart', 
      'keydown', 
      'mousemove', 
      'scroll', 
      'focus'
    ];

    const removeListeners = () => {
      events.forEach(event => {
        document.removeEventListener(event, playMusic);
      });
    };

    // Add listeners for everything
    events.forEach(event => {
      document.addEventListener(event, playMusic, { once: true });
    });

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        autoPlay 
        preload="auto"
        onError={(e) => {
          console.warn("Audio file not found or playback error:", e.currentTarget.error);
          setIsPlaying(false);
        }} 
      />

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-lg hover:bg-white/20 transition-colors"
        onClick={togglePlay}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <div className="flex gap-1 items-end h-6">
            <motion.div 
              animate={{ height: [10, 24, 10] }} 
              transition={{ repeat: Infinity, duration: 0.5 }} 
              className="w-1 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ height: [16, 8, 16] }} 
              transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }} 
              className="w-1 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ height: [8, 20, 8] }} 
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} 
              className="w-1 bg-white rounded-full" 
            />
            <Music size={16} className="ml-1" />
          </div>
        ) : (
          <VolumeX size={24} />
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;