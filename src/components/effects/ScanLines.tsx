'use client';

import { motion } from 'framer-motion';

interface ScanLinesProps {
  opacity?: number;
  animated?: boolean;
}

export default function ScanLines({
  opacity = 0.03,
  animated = true,
}: ScanLinesProps) {
  return (
    <>
      {/* Static scan lines */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, ${opacity}),
            rgba(0, 0, 0, ${opacity}) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
      />

      {/* Moving scan line */}
      {animated && (
        <motion.div
          className="fixed left-0 right-0 h-1 pointer-events-none z-[9998]"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(0, 255, 65, 0.1), transparent)',
          }}
          initial={{ top: '-4px' }}
          animate={{ top: '100vh' }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </>
  );
}
