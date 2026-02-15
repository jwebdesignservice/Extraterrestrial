'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import sightingsData from '@/data/sightings.json';
import alienTypesData from '@/data/alien-types.json';
import { Sighting, AlienSpecies } from '@/lib/types';
import GlassPanel from '@/components/ui/GlassPanel';
import GlitchText from '@/components/ui/GlitchText';
import ClassifiedBadge from '@/components/case/ClassifiedBadge';
import ThreatMeter from '@/components/case/ThreatMeter';
import ProbabilityIndex from '@/components/case/ProbabilityIndex';
import SignalWaveform from '@/components/case/SignalWaveform';
import { formatDate, formatCoords, getAlienTypeIcon, getCredibilityColor } from '@/lib/utils';

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const sightings = sightingsData as Sighting[];
  const alienTypes = alienTypesData as AlienSpecies[];
  
  const sighting = sightings.find((s) => s.slug === slug);
  const alienInfo = alienTypes.find((a) => a.name === sighting?.alienType);

  if (!sighting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassPanel className="p-8 text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="font-mono text-2xl text-[var(--warning-red)] mb-4">
            CASE FILE NOT FOUND
          </h1>
          <p className="text-[var(--text-secondary)] mb-6">
            The requested case file does not exist or has been classified.
          </p>
          <Link
            href="/database"
            className="inline-block px-6 py-3 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold uppercase tracking-wider rounded"
          >
            ← Back to Database
          </Link>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/database"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--matrix-green)] font-mono text-sm mb-6 transition-colors"
        >
          ← Back to results
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Flag/Icon */}
            <div className="text-8xl md:text-9xl">
              {sighting.location.countryCode}
            </div>

            {/* Title & Meta */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <ClassifiedBadge />
                <span className="px-2 py-1 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded text-xs font-mono text-[var(--text-muted)]">
                  🏴 Case #{sighting.id}
                </span>
              </div>
              <h1 className="font-mono text-4xl md:text-5xl text-[var(--text-primary)] uppercase tracking-wider mb-2">
                {sighting.title}
              </h1>
              <p className="text-[var(--text-secondary)] text-lg mb-4">
                {sighting.subtitle || `${sighting.location.city}, ${sighting.location.country}`}
              </p>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[var(--text-muted)] text-xs font-mono uppercase">Date</p>
                  <p className="text-[var(--matrix-green)] font-mono">{formatDate(sighting.date)}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-xs font-mono uppercase">Location</p>
                  <p className="text-[var(--text-primary)] font-mono">
                    {sighting.location.city}, {sighting.location.region || sighting.location.country}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-xs font-mono uppercase">Coordinates</p>
                  <p className="text-[var(--cyber-cyan)] font-mono text-sm">
                    {formatCoords(sighting.location.coords[0], sighting.location.coords[1])}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)] text-xs font-mono uppercase">Credibility</p>
                  <p className={`font-mono font-bold ${getCredibilityColor(sighting.credibilityScore)}`}>
                    {sighting.credibilityScore}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Threat Meter */}
        <GlassPanel className="p-4 mb-6">
          <ThreatMeter level={sighting.threatLevel} />
        </GlassPanel>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <GlassPanel className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📄</span>
                <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider">
                  Overview
                </h2>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {sighting.overview}
              </p>
            </GlassPanel>

            {/* Timeline */}
            {sighting.timeline && sighting.timeline.length > 0 && (
              <GlassPanel className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⏱️</span>
                  <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider">
                    Event Timeline
                  </h2>
                </div>
                <div className="space-y-4">
                  {sighting.timeline.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[var(--matrix-green)]" />
                        {index < sighting.timeline.length - 1 && (
                          <div className="w-px flex-1 bg-[var(--glass-border)]" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-[var(--cyber-cyan)] font-mono text-sm mb-1">
                          {event.time}
                        </p>
                        <p className="text-[var(--text-primary)] font-medium mb-1">
                          {event.title}
                        </p>
                        <p className="text-[var(--text-muted)] text-sm">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>
            )}

            {/* Witness Testimonies */}
            {sighting.witnesses && sighting.witnesses.length > 0 && (
              <GlassPanel className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">👁️</span>
                  <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider">
                    Witness Testimonies
                  </h2>
                </div>
                <div className="space-y-4">
                  {sighting.witnesses.map((witness, index) => (
                    <motion.div
                      key={witness.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[var(--text-primary)] font-medium">
                            {witness.name}
                          </p>
                          {witness.occupation && (
                            <p className="text-[var(--text-muted)] text-xs">
                              {witness.occupation}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {witness.verified && (
                            <span className="px-2 py-0.5 bg-[var(--matrix-green)]/20 text-[var(--matrix-green)] text-xs font-mono rounded">
                              VERIFIED
                            </span>
                          )}
                          <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                            witness.credibility === 'high' 
                              ? 'bg-[var(--matrix-green)]/20 text-[var(--matrix-green)]'
                              : witness.credibility === 'medium'
                              ? 'bg-[var(--warning-yellow)]/20 text-[var(--warning-yellow)]'
                              : 'bg-[var(--warning-red)]/20 text-[var(--warning-red)]'
                          }`}>
                            {witness.credibility.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-[var(--text-secondary)] italic">
                        &ldquo;{witness.testimony}&rdquo;
                      </p>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>
            )}

            {/* Signal Waveform */}
            <SignalWaveform />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Alien Classification */}
            {alienInfo && (
              <GlassPanel className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{getAlienTypeIcon(sighting.alienType)}</span>
                  <h3 className="font-mono text-[var(--text-primary)] uppercase tracking-wider text-sm">
                    Species Classification
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[var(--text-muted)] text-xs">Type</p>
                    <p className="text-[var(--matrix-green)] font-mono font-bold">
                      {alienInfo.name}
                    </p>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm">
                    {alienInfo.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-[var(--alien-dark)] rounded">
                      <p className="text-[var(--text-muted)] text-xs">Intelligence</p>
                      <p className="text-[var(--cyber-cyan)] font-mono">{alienInfo.intelligence}/10</p>
                    </div>
                    <div className="p-2 bg-[var(--alien-dark)] rounded">
                      <p className="text-[var(--text-muted)] text-xs">Tech Level</p>
                      <p className="text-[var(--cyber-cyan)] font-mono">{alienInfo.technologicalCapability}/10</p>
                    </div>
                  </div>
                  {alienInfo.originSystem && (
                    <div>
                      <p className="text-[var(--text-muted)] text-xs">Origin System</p>
                      <p className="text-[var(--warning-yellow)] font-mono">{alienInfo.originSystem}</p>
                    </div>
                  )}
                </div>
              </GlassPanel>
            )}

            {/* Probability Index */}
            <ProbabilityIndex probabilities={sighting.probabilities} />

            {/* Related Topics */}
            {sighting.relatedTopics && sighting.relatedTopics.length > 0 && (
              <GlassPanel className="p-4">
                <h3 className="font-mono text-[var(--text-muted)] uppercase tracking-wider text-xs mb-3">
                  Related Topics
                </h3>
                <div className="space-y-2">
                  {sighting.relatedTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="p-2 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)] hover:border-[var(--matrix-green)] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="text-[var(--text-secondary)] text-sm">{topic}</span>
                      <span className="text-[var(--text-muted)]">↗</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            )}

            {/* Sources */}
            {sighting.sources && sighting.sources.length > 0 && (
              <GlassPanel className="p-4">
                <h3 className="font-mono text-[var(--text-muted)] uppercase tracking-wider text-xs mb-3">
                  Sources
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sighting.sources.map((source, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[var(--alien-dark)] text-[var(--text-secondary)] text-xs rounded"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold uppercase tracking-wider rounded hover:shadow-[0_0_20px_var(--matrix-green-glow)] transition-all"
              >
                <span>↗</span>
                Read more on Wikipedia
              </a>
              <Link
                href="/database"
                className="flex items-center justify-center gap-2 w-full py-3 border border-[var(--glass-border)] text-[var(--text-secondary)] font-mono uppercase tracking-wider rounded hover:border-[var(--matrix-green)] hover:text-[var(--matrix-green)] transition-all"
              >
                Browse Database
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
