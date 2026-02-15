'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import sightingsData from '@/data/sightings.json';
import { Sighting, AlienType, ThreatLevel } from '@/lib/types';
import GlassPanel from '@/components/ui/GlassPanel';
import GlitchText from '@/components/ui/GlitchText';
import DataTable from '@/components/ui/DataTable';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const alienTypes: AlienType[] = ['Grey', 'Reptilian', 'Nordic', 'Mantis', 'Interdimensional', 'Hybrid', 'Unknown'];
const threatLevels: ThreatLevel[] = [1, 2, 3, 4, 5];

export default function DatabasePage() {
  const sightings = sightingsData as Sighting[];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AlienType | 'all'>('all');
  const [selectedThreat, setSelectedThreat] = useState<ThreatLevel | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'high-cred' | 'recent' | 'high-threat'>('all');

  const years = useMemo(() => {
    const uniqueYears = [...new Set(sightings.map((s) => s.year))].sort((a, b) => b - a);
    return uniqueYears;
  }, [sightings]);

  const filteredSightings = useMemo(() => {
    let filtered = [...sightings];

    // Apply tab filters
    switch (activeTab) {
      case 'high-cred':
        filtered = filtered.filter((s) => s.credibilityScore >= 80);
        break;
      case 'recent':
        filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'high-threat':
        filtered = filtered.filter((s) => s.threatLevel >= 4);
        break;
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.location.country.toLowerCase().includes(query) ||
          s.location.city?.toLowerCase().includes(query) ||
          s.overview.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter((s) => s.alienType === selectedType);
    }

    // Apply threat filter
    if (selectedThreat !== 'all') {
      filtered = filtered.filter((s) => s.threatLevel === selectedThreat);
    }

    // Apply year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter((s) => s.year === selectedYear);
    }

    return filtered;
  }, [sightings, searchQuery, selectedType, selectedThreat, selectedYear, activeTab]);

  const stats = useMemo(() => {
    const countries = new Set(sightings.map((s) => s.location.country));
    return {
      total: sightings.length,
      countries: countries.size,
      highCred: sightings.filter((s) => s.credibilityScore >= 80).length,
      highThreat: sightings.filter((s) => s.threatLevel >= 4).length,
    };
  }, [sightings]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <AnimatedCounter
                value={stats.total}
                className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
              />
              <span className="text-[var(--text-muted)] text-sm">
                Total<br />Results
              </span>
            </div>
            <div className="flex items-center gap-4">
              <AnimatedCounter
                value={stats.countries}
                className="text-4xl md:text-5xl font-bold text-[var(--matrix-green)]"
              />
              <span className="text-[var(--text-muted)] text-sm">
                Countries
              </span>
            </div>
            <div className="flex items-center gap-4">
              <AnimatedCounter
                value={stats.highCred}
                className="text-4xl md:text-5xl font-bold text-[var(--cyber-cyan)]"
              />
              <span className="text-[var(--text-muted)] text-sm">
                Verified
              </span>
            </div>
            <div className="flex items-center gap-4">
              <AnimatedCounter
                value={stats.highThreat}
                className="text-4xl md:text-5xl font-bold text-[var(--warning-red)]"
              />
              <span className="text-[var(--text-muted)] text-sm">
                High<br />Threat
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search countries, locations, cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded-lg font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)] focus:shadow-[0_0_20px_var(--matrix-green-glow)] transition-all"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--matrix-green)]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: 'all', label: 'All Results' },
              { id: 'high-cred', label: 'High Credibility' },
              { id: 'recent', label: 'Most Recent' },
              { id: 'high-threat', label: 'High Threat' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 font-mono text-sm uppercase tracking-wider rounded transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--matrix-green)] text-[var(--alien-black)]'
                    : 'bg-[var(--alien-dark)] text-[var(--text-secondary)] hover:text-[var(--matrix-green)] border border-[var(--glass-border)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="px-4 py-2 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--matrix-green)]"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as AlienType | 'all')}
              className="px-4 py-2 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--matrix-green)]"
            >
              <option value="all">All Types</option>
              {alienTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedThreat}
              onChange={(e) => setSelectedThreat(e.target.value === 'all' ? 'all' : parseInt(e.target.value) as ThreatLevel)}
              className="px-4 py-2 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--matrix-green)]"
            >
              <option value="all">All Threat Levels</option>
              {threatLevels.map((level) => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>

            {(selectedType !== 'all' || selectedThreat !== 'all' || selectedYear !== 'all') && (
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedThreat('all');
                  setSelectedYear('all');
                }}
                className="px-4 py-2 text-[var(--warning-red)] font-mono text-sm hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Database Info */}
        <GlassPanel className="p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider mb-2">
                DATABASE_INFO
              </h3>
              <div className="space-y-1 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">├── total_records</span>
                  <span className="text-[var(--matrix-green)]">{stats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">├── countries</span>
                  <span className="text-[var(--matrix-green)]">{stats.countries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">├── verified</span>
                  <span className="text-[var(--matrix-green)]">{stats.highCred}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">└── filtered_results</span>
                  <span className="text-[var(--cyber-cyan)]">{filteredSightings.length}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider mb-2">
                API_STATUS
              </h3>
              <div className="space-y-1 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">├── rest_api</span>
                  <span className="text-[var(--matrix-green)]">connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">├── wikipedia</span>
                  <span className="text-[var(--matrix-green)]">connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">├── wikidata</span>
                  <span className="text-[var(--matrix-green)]">connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">└── cache</span>
                  <span className="text-[var(--cyber-cyan)]">active</span>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Results */}
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider">
              Sightings ({filteredSightings.length})
            </h2>
          </div>

          {filteredSightings.length > 0 ? (
            <DataTable data={filteredSightings} />
          ) : (
            <div className="py-12 text-center">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-[var(--text-secondary)] mb-2">No sightings match your criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                  setSelectedThreat('all');
                  setSelectedYear('all');
                  setActiveTab('all');
                }}
                className="text-[var(--matrix-green)] hover:underline font-mono text-sm"
              >
                Reset all filters
              </button>
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
