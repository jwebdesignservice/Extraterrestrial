'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { Sighting } from '@/lib/types';
import { getThreatColor, formatDateShort, getAlienTypeIcon } from '@/lib/utils';

// Fix for default markers
const createPulsingIcon = (threatLevel: number) => {
  const colors: Record<number, string> = {
    1: '#00FF41',
    2: '#7FFF00',
    3: '#FFD700',
    4: '#FF6B00',
    5: '#FF0040',
  };
  const color = colors[threatLevel] || colors[1];
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative; width: 20px; height: 20px;">
        <div style="
          position: absolute;
          width: 20px;
          height: 20px;
          background: ${color};
          border-radius: 50%;
          opacity: 0.3;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background: ${color};
          border-radius: 50%;
          box-shadow: 0 0 10px ${color};
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface WorldMapProps {
  sightings: Sighting[];
  onMarkerClick?: (sighting: Sighting) => void;
  selectedSighting?: Sighting | null;
}

export default function WorldMap({ sightings, onMarkerClick, selectedSighting }: WorldMapProps) {
  const [mounted, setMounted] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedSighting) {
      setMapCenter(selectedSighting.location.coords);
    }
  }, [selectedSighting]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-[var(--alien-dark)] flex items-center justify-center">
        <div className="text-[var(--matrix-green)] font-mono animate-pulse">
          Initializing Global Tracking System...
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={2}
      className="w-full h-full"
      style={{ background: '#050505' }}
      zoomControl={true}
      minZoom={2}
      maxZoom={12}
      worldCopyJump={true}
    >
      <MapController center={mapCenter} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {sightings.map((sighting) => (
        <Marker
          key={sighting.id}
          position={sighting.location.coords}
          icon={createPulsingIcon(sighting.threatLevel)}
          eventHandlers={{
            click: () => onMarkerClick?.(sighting),
          }}
        >
          <Popup className="alien-popup">
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{sighting.location.countryCode}</span>
                <div>
                  <h3 className="font-mono font-bold text-[var(--matrix-green)] text-sm">
                    {sighting.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs">
                    {sighting.location.city}, {sighting.location.country}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-xs mb-3">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Date:</span>
                  <span className="text-[var(--text-secondary)] font-mono">
                    {formatDateShort(sighting.date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Type:</span>
                  <span className="text-[var(--text-secondary)]">
                    {getAlienTypeIcon(sighting.alienType)} {sighting.alienType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Threat:</span>
                  <span className={getThreatColor(sighting.threatLevel)}>
                    Level {sighting.threatLevel}
                  </span>
                </div>
              </div>
              <Link
                href={`/case/${sighting.slug}`}
                className="block w-full py-1.5 text-center text-xs font-mono uppercase tracking-wider text-[var(--matrix-green)] border border-[var(--matrix-green)] rounded hover:bg-[var(--matrix-green)] hover:text-[var(--alien-black)] transition-all"
              >
                View Report →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
