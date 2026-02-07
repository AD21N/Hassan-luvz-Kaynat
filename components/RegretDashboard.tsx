import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface DashboardProps {
  onChange: (values: { regret: number; sincerity: number; forgiveness: number }) => void;
}

const Knob: React.FC<{ label: string; value: number; onChange: (val: number) => void }> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 rounded-full bg-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
        {/* Rotating Indicator */}
        <div 
          className="w-full h-full rounded-full cursor-grab active:cursor-grabbing"
          style={{ transform: `rotate(${(value / 100) * 270 - 135}deg)` }}
          onMouseDown={(e) => {
            const startY = e.clientY;
            const startVal = value;
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const delta = startY - moveEvent.clientY;
              const newVal = Math.min(100, Math.max(0, startVal + delta));
              onChange(newVal);
            };
            const handleMouseUp = () => {
              window.removeEventListener('mousemove', handleMouseMove);
              window.removeEventListener('mouseup', handleMouseUp);
            };
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
          }}
          // Touch support omitted for brevity, logic is similar
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-soft-pink rounded-full shadow-[0_0_10px_#ED64A6]" />
        </div>
        
        {/* Center Value */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-white/80 font-mono">{Math.round(value)}</span>
        </div>
      </div>
      <span className="text-xs uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
};

const RegretDashboard: React.FC<DashboardProps> = ({ onChange }) => {
  const [values, setValues] = useState({ regret: 50, sincerity: 50, forgiveness: 50 });

  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return (
    <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
      <h3 className="text-center text-white/60 font-serif mb-8 text-lg">Emotional Control Unit</h3>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        <Knob 
          label="Regret Level" 
          value={values.regret} 
          onChange={(v) => setValues(prev => ({ ...prev, regret: v }))} 
        />
        <Knob 
          label="Sincerity Hz" 
          value={values.sincerity} 
          onChange={(v) => setValues(prev => ({ ...prev, sincerity: v }))} 
        />
        <Knob 
          label="Desire %" 
          value={values.forgiveness} 
          onChange={(v) => setValues(prev => ({ ...prev, forgiveness: v }))} 
        />
      </div>
      <p className="text-center text-white/20 text-[10px] mt-6 font-mono">
        *Adjusting parameters will affect the apology transmission below.
      </p>
    </div>
  );
};

export default RegretDashboard;