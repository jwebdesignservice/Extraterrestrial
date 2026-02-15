'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'detection' | 'anomaly' | 'upload' | 'classified' | 'alert';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const generateLogEntry = (): LogEntry => {
  const types: LogEntry['type'][] = ['detection', 'anomaly', 'upload', 'classified', 'alert'];
  const severities: LogEntry['severity'][] = ['low', 'medium', 'high', 'critical'];
  
  const messages = {
    detection: [
      'Signal spike detected — Frequency 1420.405 MHz',
      'Radar anomaly registered — Grid sector 7-Alpha',
      'Unidentified aerial phenomenon tracked — NORAD alert',
      'Electromagnetic pulse detected — Origin unknown',
      'Mass sighting report — Multiple witnesses confirmed',
    ],
    anomaly: [
      'Atmospheric disturbance — Ionospheric irregularity',
      'Gravitational fluctuation detected — 0.003% deviation',
      'Thermal signature mismatch — Surface temperature spike',
      'Magnetic field disruption — Duration: 4.7 seconds',
      'Light spectrum anomaly — UV range exceeded',
    ],
    upload: [
      'New evidence uploaded — Verification pending',
      'Video footage submitted — Location: Arizona',
      'Audio recording received — Frequency analysis queued',
      'Document scan completed — Classification: Pending',
      'Witness testimony recorded — Credibility: High',
    ],
    classified: [
      'CLASSIFIED file accessed — Clearance Level 4',
      'Restricted data decrypted — Project BLUE BEAM',
      'Pentagon leak detected — Source: Anonymous',
      'NSA intercept flagged — Keywords matched',
      'DoD memo archived — Date redacted',
    ],
    alert: [
      'THREAT LEVEL ELEVATED — Global status update',
      'Multiple contacts tracking — Trajectory unknown',
      'Emergency protocol initiated — Sector lockdown',
      'High-priority sighting — Military response deployed',
      'System breach attempt — Origin: [REDACTED]',
    ],
  };

  const type = types[Math.floor(Math.random() * types.length)];
  const messageList = messages[type];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    type,
    message: messageList[Math.floor(Math.random() * messageList.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
  };
};

interface TerminalFeedProps {
  maxEntries?: number;
  className?: string;
  autoScroll?: boolean;
}

export default function TerminalFeed({
  maxEntries = 10,
  className,
  autoScroll = true,
}: TerminalFeedProps) {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entries
    const initialEntries = Array.from({ length: 5 }, () => generateLogEntry());
    setEntries(initialEntries);

    // Add new entries periodically
    const interval = setInterval(() => {
      setEntries((prev) => {
        const newEntries = [generateLogEntry(), ...prev];
        return newEntries.slice(0, maxEntries);
      });
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [maxEntries]);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [entries, autoScroll]);

  const getTypeColor = (type: LogEntry['type']) => {
    const colors = {
      detection: 'text-[var(--matrix-green)]',
      anomaly: 'text-[var(--cyber-cyan)]',
      upload: 'text-[var(--text-secondary)]',
      classified: 'text-[var(--warning-orange)]',
      alert: 'text-[var(--warning-red)]',
    };
    return colors[type];
  };

  const getSeverityIndicator = (severity: LogEntry['severity']) => {
    const indicators = {
      low: '●',
      medium: '●●',
      high: '●●●',
      critical: '!!!!',
    };
    const colors = {
      low: 'text-[var(--matrix-green)]',
      medium: 'text-[var(--warning-yellow)]',
      high: 'text-[var(--warning-orange)]',
      critical: 'text-[var(--warning-red)] animate-pulse',
    };
    return (
      <span className={cn('text-xs', colors[severity])}>
        {indicators[severity]}
      </span>
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'glass-panel p-4 font-terminal text-xs overflow-hidden',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--glass-border)]">
        <div className="w-2 h-2 rounded-full bg-[var(--matrix-green)] animate-pulse" />
        <span className="text-[var(--matrix-green)] uppercase tracking-wider">
          Live Signal Feed
        </span>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <span className="text-[var(--text-muted)] shrink-0">
                [{formatTime(entry.timestamp)}]
              </span>
              {getSeverityIndicator(entry.severity)}
              <span className={cn('uppercase shrink-0', getTypeColor(entry.type))}>
                [{entry.type}]
              </span>
              <span className="text-[var(--text-secondary)] truncate">
                {entry.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-3 pt-2 border-t border-[var(--glass-border)] flex items-center gap-2">
        <span className="text-[var(--text-muted)]">&gt;</span>
        <span className="text-[var(--matrix-green)]">Monitoring active</span>
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}
