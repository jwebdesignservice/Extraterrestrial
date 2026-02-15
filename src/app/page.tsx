'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import sightingsData from '@/data/sightings.json';
import { Sighting } from '@/lib/types';
import GlassPanel from '@/components/ui/GlassPanel';
import GlitchText from '@/components/ui/GlitchText';
import TerminalFeed from '@/components/ui/TerminalFeed';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ActivityIndex from '@/components/features/ActivityIndex';
import StaticWorldMap from '@/components/map/StaticWorldMap';
import { getThreatColor, getAlienTypeIcon } from '@/lib/utils';

export default function HomePage() {
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null);
  const sightings = sightingsData as Sighting[];

  const stats = useMemo(() => {
    const countries = new Set(sightings.map((s) => s.location.country));
    return {
      total: sightings.length,
      countries: countries.size,
      featured: sightings.filter((s) => s.featured).length,
    };
  }, [sightings]);

  const featuredSightings = sightings.filter((s) => s.featured).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Stats */}
      <section className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--matrix-green)] animate-pulse" />
              <GlitchText
                text="GLOBAL SIGHTING TRACKER"
                className="font-mono text-[var(--matrix-green)] text-sm md:text-base tracking-wider"
              />
            </div>
            <div className="flex items-center gap-6 md:gap-8">
              <div className="text-center">
                <AnimatedCounter
                  value={stats.total * 142}
                  className="text-[var(--matrix-green)] text-xl md:text-2xl font-bold font-mono"
                />
                <p className="text-[var(--text-muted)] text-xs uppercase">Sightings</p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  value={stats.countries}
                  className="text-[var(--cyber-cyan)] text-xl md:text-2xl font-bold font-mono"
                />
                <p className="text-[var(--text-muted)] text-xs uppercase">Countries</p>
              </div>
              <div className="text-center hidden sm:block">
                <span className="text-[var(--warning-yellow)] text-xl md:text-2xl font-bold font-mono">
                  ELEVATED
                </span>
                <p className="text-[var(--text-muted)] text-xs uppercase">Threat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-3">
              <GlassPanel className="overflow-hidden">
                <div className="h-[400px] md:h-[500px] lg:h-[600px]">
                  <StaticWorldMap
                    sightings={sightings}
                    onMarkerClick={setSelectedSighting}
                  />
                </div>
              </GlassPanel>

              {/* Selected Sighting Panel */}
              {selectedSighting && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <GlassPanel className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{selectedSighting.location.countryCode}</span>
                        <div>
                          <h3 className="font-mono font-bold text-[var(--matrix-green)] text-lg">
                            {selectedSighting.title}
                          </h3>
                          <p className="text-[var(--text-muted)] text-sm">
                            {selectedSighting.location.city}, {selectedSighting.location.country} • {selectedSighting.year}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedSighting(null)}
                        className="text-[var(--text-muted)] hover:text-[var(--matrix-green)] text-xl p-1"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                      {selectedSighting.overview}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span>{getAlienTypeIcon(selectedSighting.alienType)}</span>
                        <span className="text-[var(--text-secondary)] text-sm">{selectedSighting.alienType}</span>
                      </div>
                      <span className={`font-mono font-bold ${getThreatColor(selectedSighting.threatLevel)}`}>
                        Threat Level {selectedSighting.threatLevel}
                      </span>
                      <span className="text-[var(--cyber-cyan)] font-mono text-sm">
                        {selectedSighting.credibilityScore}% Credibility
                      </span>
                    </div>
                    <Link
                      href={`/case/${selectedSighting.slug}`}
                      className="inline-block px-6 py-2 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold text-sm uppercase tracking-wider rounded hover:shadow-[0_0_20px_var(--matrix-green-glow)] transition-all"
                    >
                      View Full Report →
                    </Link>
                  </GlassPanel>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ActivityIndex
                totalSightings={sightings.length * 142}
                countriesAffected={stats.countries}
              />
              <TerminalFeed maxEntries={6} className="hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-mono text-xl md:text-2xl text-[var(--matrix-green)] uppercase tracking-wider mb-1">
                Featured Cases
              </h2>
              <p className="text-[var(--text-muted)] text-sm">
                High-profile sightings with verified evidence
              </p>
            </div>
            <Link
              href="/database"
              className="px-4 py-2 font-mono text-sm uppercase tracking-wider text-[var(--matrix-green)] border border-[var(--matrix-green)] rounded hover:bg-[var(--matrix-green)] hover:text-[var(--alien-black)] transition-all"
            >
              View All →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSightings.map((sighting, index) => (
              <motion.div
                key={sighting.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/case/${sighting.slug}`}>
                  <GlassPanel hover className="p-5 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{sighting.location.countryCode}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-mono font-bold text-[var(--text-primary)] truncate">
                            {sighting.title}
                          </h3>
                          {sighting.featured && (
                            <span className="px-1.5 py-0.5 text-[8px] font-mono uppercase bg-[var(--warning-red)] text-white rounded shrink-0">
                              HOT
                            </span>
                          )}
                        </div>
                        <p className="text-[var(--text-muted)] text-xs mt-1">
                          {sighting.location.city}, {sighting.year}
                        </p>
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                      {sighting.overview}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-[var(--glass-border)]">
                      <span className="flex items-center gap-1">
                        {getAlienTypeIcon(sighting.alienType)}
                        <span className="text-[var(--text-muted)]">{sighting.alienType}</span>
                      </span>
                      <span className={`font-mono font-bold ${getThreatColor(sighting.threatLevel)}`}>
                        L{sighting.threatLevel}
                      </span>
                    </div>
                  </GlassPanel>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-transparent via-[var(--alien-dark)]/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Documented Cases', value: 2847, icon: '📁', color: 'var(--matrix-green)' },
              { label: 'Verified Witnesses', value: 12453, icon: '👁️', color: 'var(--cyber-cyan)' },
              { label: 'Countries Tracking', value: 54, icon: '🌍', color: 'var(--warning-yellow)' },
              { label: 'Active Signals', value: 47, icon: '📡', color: 'var(--warning-red)' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassPanel className="p-4 md:p-6 text-center">
                  <span className="text-3xl md:text-4xl mb-2 block">{stat.icon}</span>
                  <AnimatedCounter
                    value={stat.value}
                    className="text-2xl md:text-3xl font-bold font-mono"
                  />
                  <p className="text-[var(--text-muted)] text-xs md:text-sm mt-1">{stat.label}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassPanel className="p-6 md:p-10 text-center">
            <GlitchText
              text="JOIN THE DISCLOSURE MOVEMENT"
              className="font-mono text-xl md:text-2xl lg:text-3xl text-[var(--matrix-green)] mb-4"
              as="h2"
            />
            <p className="text-[var(--text-secondary)] md:text-lg mb-8 max-w-2xl mx-auto">
              Report sightings, analyze data, and help expose the truth about extraterrestrial 
              intelligence. Every scan burns $ET tokens, reducing supply forever.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <Link
                href="/database"
                className="px-5 md:px-6 py-3 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold text-sm uppercase tracking-wider rounded hover:shadow-[0_0_30px_var(--matrix-green-glow)] transition-all"
              >
                Explore Database
              </Link>
              <Link
                href="/upload"
                className="px-5 md:px-6 py-3 border border-[var(--matrix-green)] text-[var(--matrix-green)] font-mono font-bold text-sm uppercase tracking-wider rounded hover:bg-[var(--matrix-green)]/10 transition-all"
              >
                Report Sighting
              </Link>
              <Link
                href="/token"
                className="px-5 md:px-6 py-3 border border-[var(--cyber-cyan)] text-[var(--cyber-cyan)] font-mono font-bold text-sm uppercase tracking-wider rounded hover:bg-[var(--cyber-cyan)]/10 transition-all"
              >
                Buy $ET
              </Link>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* Mobile Terminal Feed */}
      <section className="lg:hidden py-8 px-4">
        <div className="max-w-xl mx-auto">
          <TerminalFeed maxEntries={5} />
        </div>
      </section>
    </div>
  );
}
