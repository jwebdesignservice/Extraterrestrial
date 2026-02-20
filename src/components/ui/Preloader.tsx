'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 70 ? Math.random() * 15 + 5 : Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.05]">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(var(--matrix-green) 1px, transparent 1px),
                  linear-gradient(90deg, var(--matrix-green) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Rotating rings */}
            <div className="relative w-40 h-40 mb-8">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 border-2 border-[var(--matrix-green)] rounded-full"
                style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute inset-4 border-2 border-[var(--cyber-cyan)] rounded-full"
                style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner ring */}
              <motion.div
                className="absolute inset-8 border-2 border-[var(--matrix-green)] rounded-full"
                style={{ borderTopColor: 'transparent' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Center pulse */}
              <div className="absolute inset-12 flex items-center justify-center">
                <motion.div
                  className="w-full h-full bg-[var(--matrix-green)] rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Orbiting dots */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[var(--matrix-green)] rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: '-4px',
                    marginLeft: '-4px',
                  }}
                  animate={{
                    x: [0, 60 * Math.cos((i * Math.PI) / 2), 0],
                    y: [0, 60 * Math.sin((i * Math.PI) / 2), 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.25,
                  }}
                />
              ))}

              {/* Radar sweep */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, var(--matrix-green) 30deg, transparent 60deg)',
                  opacity: 0.3,
                  borderRadius: '50%',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Logo text */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-mono text-3xl font-bold text-[var(--matrix-green)] tracking-[0.3em] mb-2">
                AlienScan
              </h1>
              <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
                Global Extraterrestrial Intelligence Network
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-[var(--alien-dark)] rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--matrix-green)] to-[var(--cyber-cyan)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress text */}
            <div className="font-mono text-sm text-[var(--matrix-green)]">
              <motion.span
                key={Math.floor(progress)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Math.floor(progress)}%
              </motion.span>
              <span className="text-[var(--text-muted)] ml-2">
                {progress < 30 && 'Establishing secure connection...'}
                {progress >= 30 && progress < 60 && 'Syncing satellite data...'}
                {progress >= 60 && progress < 90 && 'Decrypting intelligence feeds...'}
                {progress >= 90 && 'Initializing interface...'}
              </span>
            </div>

            {/* Decorative data streams */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-1 opacity-30">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[var(--matrix-green)]"
                  animate={{
                    height: [10, 30 + Math.random() * 40, 10],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-[var(--matrix-green)] opacity-50" />
          <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-[var(--matrix-green)] opacity-50" />
          <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-[var(--matrix-green)] opacity-50" />
          <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-[var(--matrix-green)] opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
