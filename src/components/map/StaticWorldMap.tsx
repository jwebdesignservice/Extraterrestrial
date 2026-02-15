'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sighting } from '@/lib/types';
import { getThreatColor, getAlienTypeIcon } from '@/lib/utils';
import GlassPanel from '@/components/ui/GlassPanel';

interface StaticWorldMapProps {
  sightings: Sighting[];
  onMarkerClick?: (sighting: Sighting) => void;
}

// Convert lat/lng to percentage position on map (Mercator-like projection)
const coordsToPosition = (lat: number, lng: number) => {
  const x = ((lng + 180) / 360) * 100;
  // Adjusted for typical world map aspect ratio
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
};

const getThreatColorHex = (level: number): string => {
  const colors: Record<number, string> = {
    1: '#00FF41',
    2: '#7FFF00',
    3: '#FFD700',
    4: '#FF6B00',
    5: '#FF0040',
  };
  return colors[level] || colors[1];
};

export default function StaticWorldMap({ sightings, onMarkerClick }: StaticWorldMapProps) {
  const [hoveredSighting, setHoveredSighting] = useState<Sighting | null>(null);

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden select-none">
      {/* World Map Image - Black and White */}
      <div className="absolute inset-0">
        <Image
          src="/images/world-map.svg"
          alt="World Map"
          fill
          className="object-cover"
          style={{ opacity: 0.6 }}
          priority
        />
      </div>

      {/* Sighting Markers */}
      <div className="absolute inset-0">
        {sightings.map((sighting) => {
          const pos = coordsToPosition(
            sighting.location.coords[0],
            sighting.location.coords[1]
          );
          const color = getThreatColorHex(sighting.threatLevel);

          return (
            <motion.div
              key={sighting.id}
              className="absolute cursor-pointer"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => onMarkerClick?.(sighting)}
              onMouseEnter={() => setHoveredSighting(sighting)}
              onMouseLeave={() => setHoveredSighting(null)}
              whileHover={{ scale: 1.5, zIndex: 50 }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  left: -12,
                  top: -12,
                  backgroundColor: color,
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              {/* Main dot */}
              <div
                className="w-3 h-3 rounded-full relative"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Green Scan Line Effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] pointer-events-none z-30"
        style={{
          background: 'linear-gradient(90deg, transparent, #00FF41, #00FF41, transparent)',
          boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 40px #00FF4180',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredSighting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute pointer-events-none z-40"
            style={{
              left: `${coordsToPosition(hoveredSighting.location.coords[0], hoveredSighting.location.coords[1]).x}%`,
              top: `${Math.max(15, coordsToPosition(hoveredSighting.location.coords[0], hoveredSighting.location.coords[1]).y - 10)}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <GlassPanel className="p-3 min-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{hoveredSighting.location.countryCode}</span>
                <span className="text-[var(--matrix-green)] font-mono text-sm font-bold">
                  {hoveredSighting.title}
                </span>
              </div>
              <p className="text-[var(--text-muted)] text-xs">
                {hoveredSighting.location.city}, {hoveredSighting.year}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  {getAlienTypeIcon(hoveredSighting.alienType)}
                  <span className="text-[var(--text-secondary)]">{hoveredSighting.alienType}</span>
                </span>
                <span className={getThreatColor(hoveredSighting.threatLevel)}>
                  Threat L{hoveredSighting.threatLevel}
                </span>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.8) 100%)',
        }}
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-30">
        <GlassPanel className="p-3">
          <p className="text-[var(--text-muted)] text-xs font-mono uppercase mb-2">Threat Level</p>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="flex items-center gap-1">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: getThreatColorHex(level),
                    boxShadow: `0 0 6px ${getThreatColorHex(level)}`,
                  }}
                />
                <span className="text-[var(--text-muted)] text-xs">{level}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 z-30">
        <GlassPanel className="px-3 py-2">
          <p className="text-[var(--matrix-green)] text-xs font-mono">
            Click markers to view sighting details
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
