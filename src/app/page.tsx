'use client';

// UAPscan - Global Sighting Tracker
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import sightingsData from '@/data/sightings.json';
import { Sighting } from '@/lib/types';
import GlassPanel from '@/components/ui/GlassPanel';
import GlitchText from '@/components/ui/GlitchText';
import TerminalFeed from '@/components/ui/TerminalFeed';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ActivityIndex from '@/components/features/ActivityIndex';
import { getThreatColor, getAlienTypeIcon } from '@/lib/utils';

// Dynamically import WorldMap to avoid SSR issues with Leaflet
const WorldMap = dynamic(() => import('@/components/map/WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[var(--alien-dark)] flex items-center justify-center">
      <div className="text-[var(--matrix-green)] font-mono animate-pulse">
        Initializing Global Tracking System...
      </div>
    </div>
  ),
});

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
      {/* Government's Alien Files — Declassified PDF Hero CTA */}
      <section className="px-4 pt-6">
        <div className="max-w-7xl mx-auto">
          <a
            href="https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_10.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <GlassPanel className="p-4 md:p-5 border-[var(--warning-red)]/60 hover:border-[var(--warning-red)] transition-all hover:shadow-[0_0_30px_rgba(255,0,0,0.25)]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="text-3xl md:text-4xl animate-pulse">⚠</span>
                  <div>
                    <p className="font-mono text-[10px] md:text-xs text-[var(--warning-red)] uppercase tracking-[0.3em] mb-1">
                      Declassified — Disclosure Initiative
                    </p>
                    <h2 className="font-mono text-base md:text-xl lg:text-2xl text-[var(--warning-red)] font-bold tracking-wider">
                      GOVERNMENT&apos;S ALIEN FILES
                    </h2>
                    <p className="text-[var(--text-secondary)] text-xs md:text-sm mt-1">
                      Official war.gov UFO release — HQ-83894, Section 10
                    </p>
                  </div>
                </div>
                <span className="px-5 py-3 border-2 border-[var(--warning-red)] text-[var(--warning-red)] font-mono font-bold text-xs md:text-sm uppercase tracking-wider rounded group-hover:bg-[var(--warning-red)] group-hover:text-[var(--alien-black)] transition-all whitespace-nowrap">
                  Read the File ↗
                </span>
              </div>
            </GlassPanel>
          </a>
        </div>
      </section>

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

      {/* Intercept Banner — UFO field photo with alien-tech HUD overlay */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative overflow-hidden rounded-lg border border-[var(--matrix-green)]/30 shadow-[0_0_40px_rgba(0,255,65,0.08)]"
            style={{
              backgroundImage: "url('/images/ufo-field.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Darken + tint to blend with site palette */}
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--alien-darker)]/60 via-transparent to-[var(--alien-darker)]" />
            <div
              className="absolute inset-0 mix-blend-overlay opacity-60"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,107,0,0.25) 0%, rgba(0,0,0,0) 60%)',
              }}
            />

            {/* Scan-line overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0,255,65,0.18) 0px, rgba(0,255,65,0.18) 1px, transparent 1px, transparent 4px)',
              }}
            />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,107,0,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.18) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-[var(--matrix-green)]" />
            <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-[var(--matrix-green)]" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-[var(--matrix-green)]" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-[var(--matrix-green)]" />

            {/* Targeting reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-40 h-40 md:w-56 md:h-56">
                <div className="absolute inset-0 rounded-full border border-[var(--warning-red)]/70 animate-pulse" />
                <div className="absolute inset-4 rounded-full border border-[var(--warning-red)]/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-[var(--warning-red)]/60" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-px bg-[var(--warning-red)]/60" />
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[var(--warning-red)] tracking-widest whitespace-nowrap">
                  TARGET LOCKED
                </div>
              </div>
            </div>

            {/* Top-left HUD readout */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 font-mono text-[10px] md:text-xs text-[var(--matrix-green)] space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--matrix-green)] animate-pulse" />
                <span className="tracking-widest">LIVE FEED // SECTOR 7-G</span>
              </div>
              <div className="text-[var(--text-muted)]">LAT 38.4392° N</div>
              <div className="text-[var(--text-muted)]">LON 122.7141° W</div>
              <div className="text-[var(--text-muted)]">ALT 412m AGL</div>
            </div>

            {/* Top-right HUD readout */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 font-mono text-[10px] md:text-xs text-right space-y-1">
              <div className="text-[var(--warning-red)] tracking-widest">⚠ ANOMALY DETECTED</div>
              <div className="text-[var(--text-muted)]">CLASS: UAP-1</div>
              <div className="text-[var(--text-muted)]">VEL: 2,847 m/s</div>
              <div className="text-[var(--text-muted)]">SIG: ▮▮▮▮▮▮▯▯</div>
            </div>

            {/* Bottom HUD bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent pt-12 pb-4 px-6 md:px-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] md:text-xs text-[var(--matrix-green)] tracking-[0.3em] mb-1">
                    [INTERCEPTED]
                  </p>
                  <h3 className="font-mono text-base md:text-2xl text-[var(--text-primary)] font-bold tracking-wider">
                    CLASS-IV ENCOUNTER · DAYTIME RECOVERY
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs md:text-sm mt-1">
                    Frame 0042 · Burst-flash spectral analysis pending · Witness array: 14
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--matrix-green)]">
                  <span className="px-2 py-1 border border-[var(--matrix-green)]/50 rounded">REC</span>
                  <span className="px-2 py-1 border border-[var(--text-muted)]/50 rounded text-[var(--text-muted)]">04:21:07</span>
                </div>
              </div>
            </div>

            {/* Aspect ratio holder */}
            <div className="invisible h-[260px] md:h-[360px] lg:h-[420px]" />
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
                  <WorldMap
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
              intelligence. Every scan burns $UAPSCAN tokens, reducing supply forever.
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
              <a
                href="https://gmgn.ai/sol/token/GzF5pdZADfHcFN3ropyVhPex19dBzeWE9TQug13Tpump"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 md:px-6 py-3 border border-[var(--cyber-cyan)] text-[var(--cyber-cyan)] font-mono font-bold text-sm uppercase tracking-wider rounded hover:bg-[var(--cyber-cyan)]/10 transition-all"
              >
                Buy $UAPSCAN
              </a>
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
