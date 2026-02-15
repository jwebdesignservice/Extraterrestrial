'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RadarSweepProps {
  size?: number;
  className?: string;
  color?: string;
  duration?: number;
}

export default function RadarSweep({
  size = 300,
  className,
  color = 'var(--matrix-green)',
  duration = 4,
}: RadarSweepProps) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-full', className)}
      style={{ width: size, height: size }}
    >
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: size * scale,
              height: size * scale,
              borderColor: `${color}20`,
            }}
          />
        ))}
      </div>

      {/* Cross lines */}
      <div
        className="absolute top-1/2 left-0 w-full h-px"
        style={{ backgroundColor: `${color}20` }}
      />
      <div
        className="absolute top-0 left-1/2 w-px h-full"
        style={{ backgroundColor: `${color}20` }}
      />

      {/* Sweep */}
      <motion.div
        className="absolute top-0 left-1/2 origin-bottom"
        style={{
          width: 2,
          height: size / 2,
          background: `linear-gradient(to top, ${color}, transparent)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Sweep glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${color}20 20deg, transparent 60deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Center dot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />

      {/* Random blips */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: color,
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
