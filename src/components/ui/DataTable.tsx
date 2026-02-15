'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn, getThreatColor, getCredibilityColor, getAlienTypeIcon, formatDateShort } from '@/lib/utils';
import { Sighting, ThreatLevel, AlienType } from '@/lib/types';
import GlassPanel from './GlassPanel';

interface DataTableProps {
  data: Sighting[];
  className?: string;
}

export default function DataTable({ data, className }: DataTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'credibility' | 'threat'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...data].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'credibility':
        comparison = a.credibilityScore - b.credibilityScore;
        break;
      case 'threat':
        comparison = a.threatLevel - b.threatLevel;
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column: 'date' | 'credibility' | 'threat') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }: { column: 'date' | 'credibility' | 'threat' }) => (
    <svg
      className={cn(
        'w-3 h-3 ml-1 inline-block transition-transform',
        sortBy === column && sortOrder === 'asc' && 'rotate-180',
        sortBy !== column && 'opacity-30'
      )}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
    </svg>
  );

  const getThreatLabel = (level: ThreatLevel) => {
    const labels = { 1: 'MIN', 2: 'LOW', 3: 'MOD', 4: 'HIGH', 5: 'CRIT' };
    return labels[level];
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--glass-border)]">
              <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Type
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] cursor-pointer hover:text-[var(--matrix-green)] transition-colors"
                onClick={() => handleSort('date')}
              >
                Date
                <SortIcon column="date" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] cursor-pointer hover:text-[var(--matrix-green)] transition-colors"
                onClick={() => handleSort('credibility')}
              >
                Credibility
                <SortIcon column="credibility" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] cursor-pointer hover:text-[var(--matrix-green)] transition-colors"
                onClick={() => handleSort('threat')}
              >
                Threat
                <SortIcon column="threat" />
              </th>
              <th className="px-4 py-3 text-right text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((sighting, index) => (
              <motion.tr
                key={sighting.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="border-b border-[var(--glass-border)]/50 hover:bg-[var(--matrix-green)]/5 transition-colors group"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{sighting.location.countryCode}</span>
                    <div>
                      <p className="text-[var(--text-primary)] font-medium">
                        {sighting.title}
                      </p>
                      <p className="text-[var(--text-muted)] text-xs">
                        {sighting.location.city}, {sighting.location.country}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[var(--alien-dark)] text-xs font-mono">
                    <span>{getAlienTypeIcon(sighting.alienType)}</span>
                    <span className="text-[var(--text-secondary)]">{sighting.alienType}</span>
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[var(--text-secondary)] text-sm font-mono">
                    {formatDateShort(sighting.date)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={cn('text-sm font-mono font-bold', getCredibilityColor(sighting.credibilityScore))}>
                    {sighting.credibilityScore}%
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono font-bold',
                    getThreatColor(sighting.threatLevel),
                    'bg-current/10'
                  )}>
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      sighting.threatLevel >= 4 && 'animate-pulse'
                    )} style={{ backgroundColor: 'currentColor' }} />
                    {getThreatLabel(sighting.threatLevel)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    href={`/case/${sighting.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-[var(--matrix-green)] border border-[var(--matrix-green)] rounded hover:bg-[var(--matrix-green)] hover:text-[var(--alien-black)] transition-all group-hover:shadow-[0_0_10px_var(--matrix-green-glow)]"
                  >
                    View
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {sortedData.map((sighting, index) => (
          <motion.div
            key={sighting.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            <GlassPanel
              hover
              className="p-4 cursor-pointer"
              onClick={() => setExpandedId(expandedId === sighting.id ? null : sighting.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sighting.location.countryCode}</span>
                  <div>
                    <p className="text-[var(--text-primary)] font-medium">
                      {sighting.title}
                    </p>
                    <p className="text-[var(--text-muted)] text-xs">
                      {sighting.location.city}, {sighting.location.country}
                    </p>
                  </div>
                </div>
                <span className={cn(
                  'shrink-0 px-2 py-1 rounded text-xs font-mono font-bold',
                  getThreatColor(sighting.threatLevel)
                )}>
                  L{sighting.threatLevel}
                </span>
              </div>

              <AnimatePresence>
                {expandedId === sighting.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-[var(--glass-border)] space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-muted)]">Type:</span>
                        <span className="flex items-center gap-1">
                          {getAlienTypeIcon(sighting.alienType)}
                          <span className="text-[var(--text-secondary)]">{sighting.alienType}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-muted)]">Date:</span>
                        <span className="text-[var(--text-secondary)] font-mono">
                          {formatDateShort(sighting.date)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-muted)]">Credibility:</span>
                        <span className={cn('font-mono font-bold', getCredibilityColor(sighting.credibilityScore))}>
                          {sighting.credibilityScore}%
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                        {sighting.overview}
                      </p>
                      <Link
                        href={`/case/${sighting.slug}`}
                        className="block w-full py-2 text-center text-sm font-mono uppercase tracking-wider text-[var(--matrix-green)] border border-[var(--matrix-green)] rounded hover:bg-[var(--matrix-green)] hover:text-[var(--alien-black)] transition-all"
                      >
                        View Full Report →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
