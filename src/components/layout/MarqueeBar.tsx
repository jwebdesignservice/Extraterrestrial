'use client';

import { motion } from 'framer-motion';

const alerts = [
  '🛸 UAPscan ($UAPSCAN) — EXPOSE THE TRUTH',
  '👽 NEW SIGHTING REPORTED — ARIZONA, USA',
  '📡 SIGNAL ANOMALY DETECTED — FREQUENCY 1420MHz',
  '🔴 THREAT LEVEL ELEVATED — GLOBAL STATUS',
  '🌌 DISCLOSURE PROBABILITY: 67%',
  '⚠️ CLASSIFIED FILES UPLOADED — CATEGORY 5',
  '🛸 UAPscan ($UAPSCAN) — JOIN THE MOVEMENT',
  '📊 2,847 SIGHTINGS TRACKED GLOBALLY',
];

export default function MarqueeBar() {
  // Double the alerts for seamless loop
  const doubledAlerts = [...alerts, ...alerts];

  return (
    <div className="fixed top-[80px] left-0 right-0 z-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-[var(--alien-darker)] border border-[var(--glass-border)] rounded-lg overflow-hidden py-2">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -50 * alerts.length * 20],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: alerts.length * 15,
              ease: 'linear',
            },
          }}
        >
          {doubledAlerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-center mx-8"
            >
              <span className="font-mono text-xs tracking-wider">
                <span className="text-[var(--matrix-green)]">{alert.split('—')[0]}</span>
                {alert.includes('—') && (
                  <span className="text-[var(--text-secondary)]">— {alert.split('—')[1]}</span>
                )}
              </span>
              <span className="mx-8 text-[var(--matrix-green-dim)]">◆</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
