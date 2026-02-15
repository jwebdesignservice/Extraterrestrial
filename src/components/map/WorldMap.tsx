'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { Sighting } from '@/lib/types';
import { getThreatColor, formatDateShort, getAlienTypeIcon } from '@/lib/utils';

// Create pulsing icon for main sighting markers
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
      <div style="position: relative; width: 24px; height: 24px;">
        <div style="
          position: absolute;
          width: 24px;
          height: 24px;
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
          width: 12px;
          height: 12px;
          background: ${color};
          border-radius: 50%;
          box-shadow: 0 0 15px ${color}, 0 0 30px ${color};
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Generate random heat map points around the world
const generateHeatMapPoints = (count: number) => {
  const points: Array<{ lat: number; lng: number; intensity: 'low' | 'medium' | 'high' }> = [];
  
  // Hotspot regions with higher concentration
  const hotspots = [
    { lat: 37, lng: -115, radius: 15 }, // Nevada/Area 51
    { lat: 33, lng: -112, radius: 10 }, // Arizona
    { lat: 51, lng: -1, radius: 8 },    // UK
    { lat: 35, lng: 139, radius: 8 },   // Japan
    { lat: -33, lng: 151, radius: 8 },  // Australia
    { lat: 55, lng: 37, radius: 10 },   // Russia
    { lat: -23, lng: -46, radius: 10 }, // Brazil
    { lat: 19, lng: -99, radius: 8 },   // Mexico
    { lat: 48, lng: 2, radius: 6 },     // France
    { lat: 52, lng: 13, radius: 6 },    // Germany
    { lat: 40, lng: -74, radius: 8 },   // New York
    { lat: 34, lng: -118, radius: 8 },  // Los Angeles
    { lat: 25, lng: 55, radius: 6 },    // UAE
    { lat: 31, lng: 121, radius: 8 },   // Shanghai
    { lat: -34, lng: 18, radius: 6 },   // South Africa
    { lat: 64, lng: -21, radius: 5 },   // Iceland
    { lat: -41, lng: 174, radius: 5 },  // New Zealand
    { lat: 60, lng: 25, radius: 6 },    // Finland
    { lat: 35, lng: -106, radius: 8 },  // New Mexico
    { lat: 47, lng: -122, radius: 6 },  // Seattle
  ];
  
  // Generate clustered points around hotspots
  for (let i = 0; i < count * 0.6; i++) {
    const hotspot = hotspots[Math.floor(Math.random() * hotspots.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * hotspot.radius;
    
    const lat = hotspot.lat + Math.cos(angle) * distance;
    const lng = hotspot.lng + Math.sin(angle) * distance;
    
    // Closer to hotspot center = higher intensity
    const intensityRoll = Math.random();
    let intensity: 'low' | 'medium' | 'high';
    if (distance < hotspot.radius * 0.3) {
      intensity = intensityRoll > 0.3 ? 'high' : 'medium';
    } else if (distance < hotspot.radius * 0.6) {
      intensity = intensityRoll > 0.5 ? 'medium' : 'low';
    } else {
      intensity = intensityRoll > 0.7 ? 'medium' : 'low';
    }
    
    points.push({ lat, lng, intensity });
  }
  
  // Generate scattered random points across the globe
  for (let i = 0; i < count * 0.4; i++) {
    const lat = (Math.random() * 140) - 70; // -70 to 70
    const lng = (Math.random() * 360) - 180; // -180 to 180
    
    const intensityRoll = Math.random();
    const intensity: 'low' | 'medium' | 'high' = 
      intensityRoll > 0.85 ? 'high' : 
      intensityRoll > 0.5 ? 'medium' : 'low';
    
    points.push({ lat, lng, intensity });
  }
  
  return points;
};


interface WorldMapProps {
  sightings: Sighting[];
  onMarkerClick?: (sighting: Sighting) => void;
  selectedSighting?: Sighting | null;
}

export default function WorldMap({ sightings, onMarkerClick }: WorldMapProps) {
  const [mounted, setMounted] = useState(false);

  // Generate heat map points once on mount
  const heatMapPoints = useMemo(() => generateHeatMapPoints(200), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-[var(--alien-dark)] flex items-center justify-center">
        <div className="text-[var(--matrix-green)] font-mono animate-pulse">
          Initializing Global Tracking System...
        </div>
      </div>
    );
  }

  // Color mapping for heat map points
  const getHeatColor = (intensity: 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'high': return '#FF0040';   // Red
      case 'medium': return '#FFD700'; // Yellow
      case 'low': return '#00FF41';    // Green
    }
  };

  const getHeatRadius = (intensity: 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'high': return 3;
      case 'medium': return 2.5;
      case 'low': return 2;
    }
  };

  const getHeatOpacity = (intensity: 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'high': return 0.8;
      case 'medium': return 0.6;
      case 'low': return 0.4;
    }
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="w-full h-full"
      style={{ background: '#050505' }}
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      minZoom={2}
      maxZoom={2}
      worldCopyJump={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      {/* Heat map background dots - non-clickable */}
      {heatMapPoints.map((point, index) => (
        <CircleMarker
          key={`heat-${index}`}
          center={[point.lat, point.lng]}
          radius={getHeatRadius(point.intensity)}
          pathOptions={{
            fillColor: getHeatColor(point.intensity),
            fillOpacity: getHeatOpacity(point.intensity),
            color: getHeatColor(point.intensity),
            weight: 0,
          }}
          interactive={false}
        />
      ))}
      
      {/* Main sighting markers - clickable with popups */}
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
