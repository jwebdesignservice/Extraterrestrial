'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressMeterProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'cyan' | 'red' | 'gradient' | 'threat';
  threatLevel?: 1 | 2 | 3 | 4 | 5;
  animated?: boolean;
  className?: string;
}

export default function ProgressMeter({
  value,
  label,
  showValue = true,
  size = 'md',
  color = 'green',
  threatLevel,
  animated = true,
  className,
}: ProgressMeterProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const getBarColor = () => {
    if (color === 'threat' && threatLevel) {
      const threatColors = {
        1: 'bg-[#00FF41]',
        2: 'bg-[#7FFF00]',
        3: 'bg-[#FFD700]',
        4: 'bg-[#FF6B00]',
        5: 'bg-[#FF0040]',
      };
      return threatColors[threatLevel];
    }
    
    const colorClasses = {
      green: 'bg-[var(--matrix-green)]',
      cyan: 'bg-[var(--cyber-cyan)]',
      red: 'bg-[var(--warning-red)]',
      gradient: 'bg-gradient-to-r from-[var(--matrix-green)] via-[var(--cyber-cyan)] to-[var(--matrix-green)]',
    };
    return colorClasses[color as keyof typeof colorClasses];
  };

  const getGlowColor = () => {
    if (color === 'threat' && threatLevel) {
      const threatGlows = {
        1: 'shadow-[0_0_10px_rgba(0,255,65,0.5)]',
        2: 'shadow-[0_0_10px_rgba(127,255,0,0.5)]',
        3: 'shadow-[0_0_10px_rgba(255,215,0,0.5)]',
        4: 'shadow-[0_0_10px_rgba(255,107,0,0.5)]',
        5: 'shadow-[0_0_10px_rgba(255,0,64,0.5)]',
      };
      return threatGlows[threatLevel];
    }
    
    const glowClasses = {
      green: 'shadow-[0_0_10px_var(--matrix-green-glow)]',
      cyan: 'shadow-[0_0_10px_var(--cyber-cyan-glow)]',
      red: 'shadow-[0_0_10px_var(--warning-red-glow)]',
      gradient: 'shadow-[0_0_10px_var(--matrix-green-glow)]',
    };
    return glowClasses[color as keyof typeof glowClasses];
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1">
          {label && (
            <span className="text-[var(--text-secondary)] text-xs font-mono uppercase tracking-wider">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-[var(--matrix-green)] text-xs font-mono">
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div className={cn(
        'w-full bg-[var(--alien-dark)] rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full',
            getBarColor(),
            getGlowColor()
          )}
          initial={animated ? { width: 0 } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
