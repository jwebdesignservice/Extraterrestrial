'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PulseLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'cyan' | 'red';
  className?: string;
}

export default function PulseLoader({
  size = 'md',
  color = 'green',
  className,
}: PulseLoaderProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const colorClasses = {
    green: 'bg-[var(--matrix-green)]',
    cyan: 'bg-[var(--cyber-cyan)]',
    red: 'bg-[var(--warning-red)]',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn('rounded-full', sizeClasses[size], colorClasses[color])}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
