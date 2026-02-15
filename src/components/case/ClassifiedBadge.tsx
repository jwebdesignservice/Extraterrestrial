'use client';

import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';

interface ClassifiedBadgeProps {
  className?: string;
}

export default function ClassifiedBadge({ className }: ClassifiedBadgeProps) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--warning-red)]/20 border border-[var(--warning-red)] rounded ${className}`}
      animate={{
        borderColor: ['var(--warning-red)', 'var(--warning-red-dim)', 'var(--warning-red)'],
        boxShadow: [
          '0 0 5px var(--warning-red-glow)',
          '0 0 15px var(--warning-red-glow)',
          '0 0 5px var(--warning-red-glow)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="w-2 h-2 rounded-full bg-[var(--warning-red)] animate-pulse" />
      <GlitchText
        text="CLASSIFIED"
        className="font-mono text-[var(--warning-red)] text-xs uppercase tracking-widest font-bold"
      />
    </motion.div>
  );
}
