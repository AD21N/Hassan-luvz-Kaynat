import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import FloatingHearts from './components/FloatingHearts';
import ComplimentConstellation from './components/ComplimentConstellation';
import RegretDashboard from './components/RegretDashboard';
import ApologyLetter from './components/ApologyLetter';
import TrustGarden from './components/TrustGarden';
import SlotMachine from './components/SlotMachine';
import ImpossibleButton from './components/ImpossibleButton';
import SignatureModal from './components/SignatureModal';
import MusicPlayer from './components/MusicPlayer';
import PromisesChecklist from './components/PromisesChecklist';
import FlowerBouquetBanner from './components/FlowerBouquetBanner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showHearts, setShowHearts] = useState(false);
  const [dashboardValues, setDashboardValues] = useState({ regret: 50, sincerity: 50, forgiveness: 50 });
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [isForgiven, setIsForgiven] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowHearts(true);
  };

  const handleSigned = () => {
    setShowSignatureModal(false);
    setIsForgiven(true);
  };

  return (
    <>
      {/* 
        MusicPlayer is rendered unconditionally at the top. 
        It attaches listeners to 'document' immediately, so interacting 
        with the LoadingScreen (e.g., holding the heart) will trigger the music.
        The LoadingScreen is z-50, so we place MusicPlayer before it in DOM to let LoadingScreen cover the button if needed,
        though MusicPlayer is also fixed z-50.
      */}
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            onComplete={handleLoadingComplete} 
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen overflow-x-hidden transition-colors duration-1000"
          style={{
            // Dynamic background
            background: isForgiven 
                ? '#E11D48' // Bright Rose
                : 'linear-gradient(135deg, #1A0524 0%, #2D0A31 50%, #4C1D95 100%)' // Deep Amethyst Gradient
          }}
        >
          {isForgiven && (
             <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-50 mix-blend-overlay"></div>
          )}

          {/* Background Elements */}
          <ComplimentConstellation />
          {showHearts && <FloatingHearts />}
          
          <FlowerBouquetBanner />
          
          {/* Responsive Layout Container */}
          <div className="relative z-10 max-w-7xl mx-auto pb-12 md:pb-24 pt-6 md:pt-12 px-4 md:px-6 space-y-16 md:space-y-24">
            
            {/* 1. Dashboard & Letter */}
            <div className="space-y-12">
                <RegretDashboard onChange={setDashboardValues} />
                <ApologyLetter settings={dashboardValues} />
            </div>

            {/* 2. Physics Garden */}
            <TrustGarden />
            
            {/* 3. Slot Machine */}
            <SlotMachine />
            
            {/* 4. Promises (kept as simple list) */}
            <PromisesChecklist />
            
            {/* 5. The Finale */}
            <ImpossibleButton onForgive={() => setShowSignatureModal(true)} />
            
            <footer className="text-center text-white/40 pb-10 font-sans text-sm">
              <p>Designed with 100% Regret & 1000% Love</p>
            </footer>
          </div>

          <AnimatePresence>
            {showSignatureModal && <SignatureModal onSigned={handleSigned} />}
          </AnimatePresence>
          
          {/* Post-forgiveness message overlay */}
          <AnimatePresence>
              {isForgiven && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
                  >
                      <h1 className="text-5xl md:text-9xl font-serif text-white font-bold drop-shadow-2xl opacity-20 rotate-12 px-4 text-center">
                          FORGIVEN
                      </h1>
                  </motion.div>
              )}
          </AnimatePresence>
        </motion.main>
      )}
    </>
  );
};

export default App;