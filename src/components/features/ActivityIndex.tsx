'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ProgressMeter from '@/components/ui/ProgressMeter';

interface ActivityIndexProps {
  totalSightings: number;
  countriesAffected: number;
  className?: string;
}

export default function ActivityIndex({
  totalSightings,
  countriesAffected,
  className,
}: ActivityIndexProps) {
  const [disclosureProbability, setDisclosureProbability] = useState(63);
  const [activeSignals, setActiveSignals] = useState(47);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setDisclosureProbability((prev) => {
        const change = (Math.random() - 0.5) * 2;
        return Math.min(99, Math.max(50, prev + change));
      });
      setActiveSignals((prev) => {
        const change = Math.floor((Math.random() - 0.5) * 10);
        return Math.max(20, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: 'Total Sightings',
      value: totalSightings,
      icon: '👽',
    },
    {
      label: 'Countries Affected',
      value: countriesAffected,
      icon: '🌍',
    },
    {
      label: 'Active Signals',
      value: activeSignals,
      icon: '📡',
    },
    {
      label: 'Case Files',
      value: totalSightings * 3,
      icon: '📁',
    },
  ];

  return (
    <GlassPanel className={className}>
      <div className="p-4 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[var(--matrix-green)] animate-pulse" />
          <span className="font-mono text-[var(--matrix-green)] text-xs uppercase tracking-wider">
            Alien Activity Index
          </span>
        </div>
        <p className="text-[var(--text-muted)] text-xs">
          Real-time global tracking metrics
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span>{stat.icon}</span>
                <span className="text-[var(--text-muted)] text-xs">
                  {stat.label}
                </span>
              </div>
              <AnimatedCounter
                value={stat.value}
                className="text-[var(--matrix-green)] text-xl font-bold"
              />
            </motion.div>
          ))}
        </div>

        {/* Disclosure Probability */}
        <div className="p-3 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--text-muted)] text-xs font-mono uppercase">
              Global Disclosure Probability
            </span>
            <span className="text-[var(--matrix-green)] font-mono font-bold">
              {disclosureProbability.toFixed(1)}%
            </span>
          </div>
          <ProgressMeter
            value={disclosureProbability}
            showValue={false}
            color="gradient"
            size="md"
          />
        </div>

        {/* Threat Level */}
        <div className="p-3 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--text-muted)] text-xs font-mono uppercase">
              Global Threat Index
            </span>
            <span className="text-[var(--warning-yellow)] font-mono font-bold">
              ELEVATED
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`flex-1 h-2 rounded ${
                  level <= 3
                    ? level <= 2
                      ? 'bg-[var(--matrix-green)]'
                      : 'bg-[var(--warning-yellow)]'
                    : 'bg-[var(--alien-dark)] border border-[var(--glass-border)]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
