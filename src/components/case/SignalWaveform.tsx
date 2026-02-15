'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';

interface SignalWaveformProps {
  className?: string;
}

export default function SignalWaveform({ className }: SignalWaveformProps) {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial data
    const generateData = () => {
      return Array.from({ length: 50 }, (_, i) => 
        Math.sin(i * 0.3) * 30 + Math.random() * 20 + 50
      );
    };
    setData(generateData());

    // Animate data
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), Math.sin(Date.now() * 0.005) * 30 + Math.random() * 20 + 50];
        return newData;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const decodedProbability = Math.floor(Math.random() * 30 + 40);

  return (
    <GlassPanel className={className}>
      <div className="p-4 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[var(--cyber-cyan)] animate-pulse" />
          <span className="font-mono text-[var(--cyber-cyan)] text-xs uppercase tracking-wider">
            Signal Pattern Analysis
          </span>
        </div>
        <p className="text-[var(--text-muted)] text-xs">
          Frequency anomaly detection and waveform visualization
        </p>
      </div>

      <div className="p-4">
        {/* Waveform Display */}
        <div className="h-32 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)] mb-4 overflow-hidden relative">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-4">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="border-r border-b border-[var(--glass-border)]/30" />
            ))}
          </div>
          
          {/* Waveform */}
          <svg className="w-full h-full relative z-10" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--matrix-green)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--matrix-green)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <motion.path
              d={`M 0 ${128 - data[0]} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 100}% ${128 - d}`).join(' ')}`}
              fill="none"
              stroke="var(--matrix-green)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>
          
          {/* Scan line */}
          <motion.div
            className="absolute top-0 w-px h-full bg-[var(--matrix-green)]"
            style={{ boxShadow: '0 0 10px var(--matrix-green)' }}
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-2 bg-[var(--alien-dark)] rounded text-center">
            <p className="text-[var(--text-muted)] text-xs">Frequency</p>
            <p className="text-[var(--matrix-green)] font-mono">1420.405 MHz</p>
          </div>
          <div className="p-2 bg-[var(--alien-dark)] rounded text-center">
            <p className="text-[var(--text-muted)] text-xs">Amplitude</p>
            <p className="text-[var(--cyber-cyan)] font-mono">+47.3 dB</p>
          </div>
          <div className="p-2 bg-[var(--alien-dark)] rounded text-center">
            <p className="text-[var(--text-muted)] text-xs">Pattern</p>
            <p className="text-[var(--warning-yellow)] font-mono">IRREGULAR</p>
          </div>
        </div>

        {/* Decoded Probability */}
        <div className="p-3 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--text-muted)] text-xs font-mono uppercase">
              Decoded Transmission Probability
            </span>
            <span className="text-[var(--matrix-green)] font-mono font-bold">
              {decodedProbability}%
            </span>
          </div>
          <div className="w-full h-2 bg-[var(--alien-black)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-cyan)]"
              initial={{ width: 0 }}
              animate={{ width: `${decodedProbability}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
