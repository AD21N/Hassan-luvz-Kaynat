import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SignatureModalProps {
    onSigned: () => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({ onSigned }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#6B46C1';
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (!hasSigned) setHasSigned(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = (e as React.MouseEvent).clientX - rect.left;
        y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-lg overflow-hidden shadow-2xl"
      >
        <div className="p-8">
            <h2 className="text-3xl font-serif text-deep-purple mb-2 text-center">Forgiveness Contract</h2>
            <p className="text-gray-500 text-xs text-center uppercase tracking-widest mb-8">Legally Binding in the Court of Love</p>
            
            <div className="prose prose-sm text-gray-600 mb-8">
                <p>I, the undersigned (The Best Girlfriend), hereby grant forgiveness to the offending party (The Goober), under the condition that he maintains a Sincerity Frequency of at least 90% and fulfills the promises made herein.</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 relative h-40 touch-none">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchEnd={stopDrawing}
                    onTouchMove={draw}
                />
                {!hasSigned && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                        <span className="font-serif italic text-2xl text-gray-400">Sign Here</span>
                    </div>
                )}
            </div>
            
            <div className="mt-8 flex justify-end">
                <button 
                    onClick={onSigned}
                    disabled={!hasSigned}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${hasSigned ? 'bg-deep-purple text-white shadow-lg hover:scale-105' : 'bg-gray-200 text-gray-400'}`}
                >
                    Seal the Deal
                </button>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignatureModal;