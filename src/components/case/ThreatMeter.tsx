'use client';

import { motion } from 'framer-motion';
import { ThreatLevel } from '@/lib/types';
import { getThreatLabel, getThreatColor } from '@/lib/utils';

interface ThreatMeterProps {
  level: ThreatLevel;
  className?: string;
}

export default function ThreatMeter({ level, className }: ThreatMeterProps) {
  const colors: Record<ThreatLevel, string> = {
    1: '#00FF41',
    2: '#7FFF00',
    3: '#FFD700',
    4: '#FF6B00',
    5: '#FF0040',
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider">
          Threat Level
        </span>
        <span className={`font-mono font-bold ${getThreatColor(level)}`}>
          {getThreatLabel(level).toUpperCase()}
        </span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((l) => (
          <motion.div
            key={l}
            className="flex-1 h-4 rounded"
            style={{
              backgroundColor: l <= level ? colors[l as ThreatLevel] : 'var(--alien-dark)',
              boxShadow: l <= level ? `0 0 10px ${colors[l as ThreatLevel]}40` : 'none',
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: l * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
