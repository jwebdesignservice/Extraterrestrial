'use client';

import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import { Probabilities } from '@/lib/types';

interface ProbabilityIndexProps {
  probabilities: Probabilities;
  className?: string;
}

export default function ProbabilityIndex({ probabilities, className }: ProbabilityIndexProps) {
  const items = [
    { label: 'Hoax Probability', value: probabilities.hoax, color: 'var(--matrix-green)' },
    { label: 'Extraterrestrial', value: probabilities.extraterrestrial, color: 'var(--cyber-cyan)' },
    { label: 'Government Cover-Up', value: probabilities.coverUp, color: 'var(--warning-red)' },
  ];

  return (
    <GlassPanel className={className}>
      <div className="p-4 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">📊</span>
          <span className="font-mono text-[var(--text-primary)] text-sm uppercase tracking-wider">
            Probability Index
          </span>
        </div>
        <p className="text-[var(--text-muted)] text-xs">
          AI-powered analysis of event authenticity
        </p>
      </div>

      <div className="p-4 space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-secondary)] text-sm">
                {item.label}
              </span>
              <span className="font-mono font-bold" style={{ color: item.color }}>
                {item.value}%
              </span>
            </div>
            <div className="w-full h-3 bg-[var(--alien-dark)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px ${item.color}`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}

        {/* Summary */}
        <div className="pt-4 mt-4 border-t border-[var(--glass-border)]">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              probabilities.extraterrestrial > 60 
                ? 'bg-[var(--cyber-cyan)] animate-pulse' 
                : 'bg-[var(--warning-yellow)]'
            }`} />
            <span className="text-[var(--text-muted)] text-xs font-mono uppercase">
              Assessment: {probabilities.extraterrestrial > 70 ? 'HIGHLY LIKELY ET ORIGIN' : 
                probabilities.extraterrestrial > 50 ? 'PROBABLE ET ORIGIN' : 'INCONCLUSIVE'}
            </span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
