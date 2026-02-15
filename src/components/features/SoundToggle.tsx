'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className }: SoundToggleProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('et-scan-sound-muted');
    if (saved !== null) {
      setIsMuted(saved === 'true');
    }
  }, []);

  const toggleSound = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('et-scan-sound-muted', String(newMuted));
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleSound}
      className={cn(
        'fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full glass-panel flex items-center justify-center',
        'hover:border-[var(--matrix-green)] transition-all',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={isMuted ? 'Enable ambient sound' : 'Disable ambient sound'}
    >
      {isMuted ? (
        <svg
          className="w-5 h-5 text-[var(--text-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      ) : (
        <motion.svg
          className="w-5 h-5 text-[var(--matrix-green)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </motion.svg>
      )}
    </motion.button>
  );
}
