'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Sighting } from '@/lib/types';
import { getThreatColor, formatDateShort, getAlienTypeIcon } from '@/lib/utils';

// Land-based coordinates for placing heat map dots (cities and regions on land only)
const landLocations = [
  // North America
  { lat: 40.7128, lng: -74.0060 },   // New York
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  { lat: 41.8781, lng: -87.6298 },  // Chicago
  { lat: 29.7604, lng: -95.3698 },  // Houston
  { lat: 33.4484, lng: -112.0740 }, // Phoenix
  { lat: 39.7392, lng: -104.9903 }, // Denver
  { lat: 47.6062, lng: -122.3321 }, // Seattle
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 36.1699, lng: -115.1398 }, // Las Vegas
  { lat: 32.7157, lng: -117.1611 }, // San Diego
  { lat: 25.7617, lng: -80.1918 },  // Miami
  { lat: 42.3601, lng: -71.0589 },  // Boston
  { lat: 38.9072, lng: -77.0369 },  // Washington DC
  { lat: 35.2271, lng: -80.8431 },  // Charlotte
  { lat: 33.7490, lng: -84.3880 },  // Atlanta
  { lat: 43.6532, lng: -79.3832 },  // Toronto
  { lat: 45.5017, lng: -73.5673 },  // Montreal
  { lat: 49.2827, lng: -123.1207 }, // Vancouver
  { lat: 51.0447, lng: -114.0719 }, // Calgary
  { lat: 19.4326, lng: -99.1332 },  // Mexico City
  { lat: 20.6597, lng: -103.3496 }, // Guadalajara
  { lat: 25.6866, lng: -100.3161 }, // Monterrey
  // South America
  { lat: -23.5505, lng: -46.6333 }, // Sao Paulo
  { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
  { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
  { lat: -33.4489, lng: -70.6693 }, // Santiago
  { lat: -12.0464, lng: -77.0428 }, // Lima
  { lat: 4.7110, lng: -74.0721 },   // Bogota
  { lat: 10.4806, lng: -66.9036 },  // Caracas
  { lat: -15.7975, lng: -47.8919 }, // Brasilia
  { lat: -1.4558, lng: -48.4902 },  // Belem
  { lat: -3.1190, lng: -60.0217 },  // Manaus
  // Europe
  { lat: 51.5074, lng: -0.1278 },   // London
  { lat: 48.8566, lng: 2.3522 },    // Paris
  { lat: 52.5200, lng: 13.4050 },   // Berlin
  { lat: 41.9028, lng: 12.4964 },   // Rome
  { lat: 40.4168, lng: -3.7038 },   // Madrid
  { lat: 52.3676, lng: 4.9041 },    // Amsterdam
  { lat: 50.8503, lng: 4.3517 },    // Brussels
  { lat: 48.2082, lng: 16.3738 },   // Vienna
  { lat: 47.4979, lng: 19.0402 },   // Budapest
  { lat: 50.0755, lng: 14.4378 },   // Prague
  { lat: 52.2297, lng: 21.0122 },   // Warsaw
  { lat: 59.3293, lng: 18.0686 },   // Stockholm
  { lat: 55.6761, lng: 12.5683 },   // Copenhagen
  { lat: 60.1699, lng: 24.9384 },   // Helsinki
  { lat: 59.9139, lng: 10.7522 },   // Oslo
  { lat: 53.3498, lng: -6.2603 },   // Dublin
  { lat: 55.9533, lng: -3.1883 },   // Edinburgh
  { lat: 41.3851, lng: 2.1734 },    // Barcelona
  { lat: 45.4642, lng: 9.1900 },    // Milan
  { lat: 43.7696, lng: 11.2558 },   // Florence
  // Russia & Eastern Europe
  { lat: 55.7558, lng: 37.6173 },   // Moscow
  { lat: 59.9343, lng: 30.3351 },   // St Petersburg
  { lat: 56.8389, lng: 60.6057 },   // Yekaterinburg
  { lat: 55.0084, lng: 82.9357 },   // Novosibirsk
  { lat: 50.4501, lng: 30.5234 },   // Kyiv
  // Middle East
  { lat: 25.2048, lng: 55.2708 },   // Dubai
  { lat: 24.7136, lng: 46.6753 },   // Riyadh
  { lat: 35.6762, lng: 51.4241 },   // Tehran
  { lat: 31.7683, lng: 35.2137 },   // Jerusalem
  { lat: 32.0853, lng: 34.7818 },   // Tel Aviv
  { lat: 41.0082, lng: 28.9784 },   // Istanbul
  { lat: 33.8938, lng: 35.5018 },   // Beirut
  // Africa
  { lat: 30.0444, lng: 31.2357 },   // Cairo
  { lat: 36.8065, lng: 10.1815 },   // Tunis
  { lat: 33.5731, lng: -7.5898 },   // Casablanca
  { lat: -33.9249, lng: 18.4241 },  // Cape Town
  { lat: -26.2041, lng: 28.0473 },  // Johannesburg
  { lat: -1.2921, lng: 36.8219 },   // Nairobi
  { lat: 6.5244, lng: 3.3792 },     // Lagos
  { lat: 5.6037, lng: -0.1870 },    // Accra
  { lat: 14.6928, lng: -17.4467 },  // Dakar
  { lat: 9.0579, lng: 7.4951 },     // Abuja
  { lat: -4.4419, lng: 15.2663 },   // Kinshasa
  { lat: -6.1659, lng: 39.2026 },   // Dar es Salaam
  { lat: 9.0320, lng: 38.7469 },    // Addis Ababa
  // Asia
  { lat: 35.6762, lng: 139.6503 },  // Tokyo
  { lat: 31.2304, lng: 121.4737 },  // Shanghai
  { lat: 39.9042, lng: 116.4074 },  // Beijing
  { lat: 22.3193, lng: 114.1694 },  // Hong Kong
  { lat: 1.3521, lng: 103.8198 },   // Singapore
  { lat: 13.7563, lng: 100.5018 },  // Bangkok
  { lat: 37.5665, lng: 126.9780 },  // Seoul
  { lat: 25.0330, lng: 121.5654 },  // Taipei
  { lat: 14.5995, lng: 120.9842 },  // Manila
  { lat: -6.2088, lng: 106.8456 },  // Jakarta
  { lat: 3.1390, lng: 101.6869 },   // Kuala Lumpur
  { lat: 21.0278, lng: 105.8342 },  // Hanoi
  { lat: 10.8231, lng: 106.6297 },  // Ho Chi Minh
  { lat: 19.0760, lng: 72.8777 },   // Mumbai
  { lat: 28.6139, lng: 77.2090 },   // New Delhi
  { lat: 12.9716, lng: 77.5946 },   // Bangalore
  { lat: 22.5726, lng: 88.3639 },   // Kolkata
  { lat: 13.0827, lng: 80.2707 },   // Chennai
  { lat: 33.6844, lng: 73.0479 },   // Islamabad
  { lat: 24.8607, lng: 67.0011 },   // Karachi
  { lat: 23.8103, lng: 90.4125 },   // Dhaka
  // Australia & Oceania
  { lat: -33.8688, lng: 151.2093 }, // Sydney
  { lat: -37.8136, lng: 144.9631 }, // Melbourne
  { lat: -27.4698, lng: 153.0251 }, // Brisbane
  { lat: -31.9505, lng: 115.8605 }, // Perth
  { lat: -34.9285, lng: 138.6007 }, // Adelaide
  { lat: -41.2865, lng: 174.7762 }, // Wellington
  { lat: -36.8485, lng: 174.7633 }, // Auckland
];

// Priority regions for heat map concentration
const priorityRegions = {
  usa: [
    { lat: 40.7128, lng: -74.0060 },   // New York
    { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    { lat: 41.8781, lng: -87.6298 },  // Chicago
    { lat: 29.7604, lng: -95.3698 },  // Houston
    { lat: 33.4484, lng: -112.0740 }, // Phoenix
    { lat: 39.7392, lng: -104.9903 }, // Denver
    { lat: 47.6062, lng: -122.3321 }, // Seattle
    { lat: 37.7749, lng: -122.4194 }, // San Francisco
    { lat: 36.1699, lng: -115.1398 }, // Las Vegas
    { lat: 32.7157, lng: -117.1611 }, // San Diego
    { lat: 25.7617, lng: -80.1918 },  // Miami
    { lat: 42.3601, lng: -71.0589 },  // Boston
    { lat: 38.9072, lng: -77.0369 },  // Washington DC
    { lat: 33.7490, lng: -84.3880 },  // Atlanta
    { lat: 35.2271, lng: -80.8431 },  // Charlotte
    { lat: 39.0997, lng: -94.5786 },  // Kansas City
    { lat: 44.9778, lng: -93.2650 },  // Minneapolis
    { lat: 29.4241, lng: -98.4936 },  // San Antonio
    { lat: 32.7767, lng: -96.7970 },  // Dallas
    { lat: 30.2672, lng: -97.7431 },  // Austin
    { lat: 35.1495, lng: -90.0490 },  // Memphis
    { lat: 36.1627, lng: -86.7816 },  // Nashville
    { lat: 38.2527, lng: -85.7585 },  // Louisville
    { lat: 39.9612, lng: -82.9988 },  // Columbus
    { lat: 42.3314, lng: -83.0458 },  // Detroit
    { lat: 43.0389, lng: -87.9065 },  // Milwaukee
    { lat: 41.2565, lng: -95.9345 },  // Omaha
    { lat: 35.4676, lng: -97.5164 },  // Oklahoma City
    { lat: 35.0844, lng: -106.6504 }, // Albuquerque
    { lat: 33.4152, lng: -111.8315 }, // Scottsdale
    // Northern USA - Alaska & Northern States
    { lat: 61.2181, lng: -149.9003 }, // Anchorage
    { lat: 64.8378, lng: -147.7164 }, // Fairbanks
    { lat: 58.3019, lng: -134.4197 }, // Juneau
    { lat: 46.8772, lng: -96.7898 },  // Fargo
    { lat: 46.7867, lng: -92.1005 },  // Duluth
    { lat: 48.7596, lng: -122.4886 }, // Bellingham
    { lat: 47.9253, lng: -97.0329 },  // Grand Forks
    { lat: 44.0682, lng: -114.7420 }, // Idaho
    { lat: 46.8797, lng: -113.9932 }, // Missoula
    { lat: 45.6770, lng: -111.0429 }, // Bozeman
    { lat: 48.2325, lng: -101.2963 }, // Minot
    { lat: 48.4001, lng: -89.2477 },  // Thunder Bay area
  ],
  greenland: [
    { lat: 64.1814, lng: -51.6941 },  // Nuuk
    { lat: 69.2198, lng: -51.0986 },  // Ilulissat
    { lat: 66.9390, lng: -53.6718 },  // Sisimiut
    { lat: 70.4853, lng: -52.2730 },  // Aasiaat
    { lat: 72.7868, lng: -56.1474 },  // Upernavik
    { lat: 76.5312, lng: -68.7032 },  // Qaanaaq (Thule)
    { lat: 60.7167, lng: -46.0333 },  // Narsarsuaq
    { lat: 65.6115, lng: -37.6367 },  // Tasiilaq
    { lat: 77.4670, lng: -69.2285 },  // Pituffik
    { lat: 68.7098, lng: -52.8690 },  // Qeqertarsuaq
    { lat: 71.2906, lng: -51.7400 },  // Uummannaq
    { lat: 63.0667, lng: -50.6833 },  // Paamiut
  ],
  africa: [
    { lat: 30.0444, lng: 31.2357 },   // Cairo
    { lat: 36.8065, lng: 10.1815 },   // Tunis
    { lat: 33.5731, lng: -7.5898 },   // Casablanca
    { lat: -33.9249, lng: 18.4241 },  // Cape Town
    { lat: -26.2041, lng: 28.0473 },  // Johannesburg
    { lat: -1.2921, lng: 36.8219 },   // Nairobi
    { lat: 6.5244, lng: 3.3792 },     // Lagos
    { lat: 5.6037, lng: -0.1870 },    // Accra
    { lat: 14.6928, lng: -17.4467 },  // Dakar
    { lat: 9.0579, lng: 7.4951 },     // Abuja
    { lat: -4.4419, lng: 15.2663 },   // Kinshasa
    { lat: -6.1659, lng: 39.2026 },   // Dar es Salaam
    { lat: 9.0320, lng: 38.7469 },    // Addis Ababa
    { lat: 36.7538, lng: 3.0588 },    // Algiers
    { lat: 32.8872, lng: 13.1913 },   // Tripoli
    { lat: 15.5007, lng: 32.5599 },   // Khartoum
    { lat: 12.6392, lng: -8.0029 },   // Bamako
    { lat: 6.3703, lng: 2.3912 },     // Cotonou
    { lat: 4.0511, lng: 9.7679 },     // Douala
    { lat: 0.3476, lng: 32.5825 },    // Kampala
    { lat: -15.3875, lng: 28.3228 },  // Lusaka
    { lat: -17.8292, lng: 31.0522 },  // Harare
    { lat: -25.9653, lng: 32.5892 },  // Maputo
    { lat: -18.8792, lng: 47.5079 },  // Antananarivo
    { lat: 11.5514, lng: 43.1456 },   // Djibouti
    { lat: -4.2634, lng: 15.2429 },   // Brazzaville
    { lat: -8.8383, lng: 13.2344 },   // Luanda
    { lat: 3.8480, lng: 11.5021 },    // Yaoundé
    { lat: 13.5116, lng: 2.1254 },    // Niamey
    { lat: 12.1075, lng: -1.5585 },   // Ouagadougou
  ],
  europe: [
    { lat: 51.5074, lng: -0.1278 },   // London
    { lat: 48.8566, lng: 2.3522 },    // Paris
    { lat: 52.5200, lng: 13.4050 },   // Berlin
    { lat: 41.9028, lng: 12.4964 },   // Rome
    { lat: 40.4168, lng: -3.7038 },   // Madrid
    { lat: 52.3676, lng: 4.9041 },    // Amsterdam
    { lat: 50.8503, lng: 4.3517 },    // Brussels
    { lat: 48.2082, lng: 16.3738 },   // Vienna
    { lat: 47.4979, lng: 19.0402 },   // Budapest
    { lat: 50.0755, lng: 14.4378 },   // Prague
    { lat: 52.2297, lng: 21.0122 },   // Warsaw
    { lat: 59.3293, lng: 18.0686 },   // Stockholm
    { lat: 55.6761, lng: 12.5683 },   // Copenhagen
    { lat: 60.1699, lng: 24.9384 },   // Helsinki
    { lat: 59.9139, lng: 10.7522 },   // Oslo
    { lat: 53.3498, lng: -6.2603 },   // Dublin
    { lat: 55.9533, lng: -3.1883 },   // Edinburgh
    { lat: 41.3851, lng: 2.1734 },    // Barcelona
    { lat: 45.4642, lng: 9.1900 },    // Milan
    { lat: 43.7696, lng: 11.2558 },   // Florence
    { lat: 53.5511, lng: 9.9937 },    // Hamburg
    { lat: 48.1351, lng: 11.5820 },   // Munich
    { lat: 50.1109, lng: 8.6821 },    // Frankfurt
    { lat: 51.2277, lng: 6.7735 },    // Dusseldorf
    { lat: 50.9375, lng: 6.9603 },    // Cologne
    { lat: 45.0703, lng: 7.6869 },    // Turin
    { lat: 40.8518, lng: 14.2681 },   // Naples
    { lat: 37.9838, lng: 23.7275 },   // Athens
    { lat: 38.7223, lng: -9.1393 },   // Lisbon
    { lat: 46.2044, lng: 6.1432 },    // Geneva
    { lat: 47.3769, lng: 8.5417 },    // Zurich
    { lat: 44.4268, lng: 26.1025 },   // Bucharest
    { lat: 42.6977, lng: 23.3219 },   // Sofia
    { lat: 44.7866, lng: 20.4489 },   // Belgrade
    { lat: 45.8150, lng: 15.9819 },   // Zagreb
  ],
  russia: [
    { lat: 55.7558, lng: 37.6173 },   // Moscow
    { lat: 59.9343, lng: 30.3351 },   // St Petersburg
    { lat: 56.8389, lng: 60.6057 },   // Yekaterinburg
    { lat: 55.0084, lng: 82.9357 },   // Novosibirsk
    { lat: 54.9885, lng: 73.3242 },   // Omsk
    { lat: 53.2001, lng: 50.1500 },   // Samara
    { lat: 55.7879, lng: 49.1233 },   // Kazan
    { lat: 56.3269, lng: 44.0059 },   // Nizhny Novgorod
    { lat: 51.5406, lng: 46.0086 },   // Saratov
    { lat: 53.1959, lng: 45.0186 },   // Penza
    { lat: 54.7388, lng: 55.9721 },   // Ufa
    { lat: 55.1644, lng: 61.4368 },   // Chelyabinsk
    { lat: 56.0153, lng: 92.8932 },   // Krasnoyarsk
    { lat: 52.0317, lng: 113.5009 }, // Chita
    { lat: 43.1155, lng: 131.8855 }, // Vladivostok
    { lat: 48.4802, lng: 135.0719 }, // Khabarovsk
    { lat: 62.0339, lng: 129.7331 }, // Yakutsk
    { lat: 64.5393, lng: 40.5170 },  // Arkhangelsk
    { lat: 68.9585, lng: 33.0827 },  // Murmansk
    { lat: 61.7849, lng: 34.3469 },  // Petrozavodsk
  ],
};

// Generate random heat map points - scattered across the whole map with concentration in key areas
const generateHeatMapPoints = (count: number) => {
  const points: Array<{ lat: number; lng: number; intensity: 'low' | 'medium' | 'high' }> = [];
  
  // Distribution: 20% USA, 20% Europe, 12% Russia, 10% Greenland, 15% Africa, 23% scattered globally
  const usaCount = Math.floor(count * 0.20);
  const europeCount = Math.floor(count * 0.20);
  const russiaCount = Math.floor(count * 0.12);
  const greenlandCount = Math.floor(count * 0.10);
  const africaCount = Math.floor(count * 0.15);
  const scatteredCount = count - usaCount - europeCount - russiaCount - greenlandCount - africaCount;
  
  // Generate USA points (including Northern USA/Alaska)
  for (let i = 0; i < usaCount; i++) {
    const baseLoc = priorityRegions.usa[Math.floor(Math.random() * priorityRegions.usa.length)];
    const latOffset = (Math.random() - 0.5) * 8;
    const lngOffset = (Math.random() - 0.5) * 10;
    
    const intensityRoll = Math.random();
    const intensity: 'low' | 'medium' | 'high' = 
      intensityRoll > 0.6 ? 'high' : intensityRoll > 0.25 ? 'medium' : 'low';
    
    points.push({ lat: baseLoc.lat + latOffset, lng: baseLoc.lng + lngOffset, intensity });
  }
  
  // Generate Europe points
  for (let i = 0; i < europeCount; i++) {
    const baseLoc = priorityRegions.europe[Math.floor(Math.random() * priorityRegions.europe.length)];
    const latOffset = (Math.random() - 0.5) * 6;
    const lngOffset = (Math.random() - 0.5) * 8;
    
    const intensityRoll = Math.random();
    const intensity: 'low' | 'medium' | 'high' = 
      intensityRoll > 0.6 ? 'high' : intensityRoll > 0.25 ? 'medium' : 'low';
    
    points.push({ lat: baseLoc.lat + latOffset, lng: baseLoc.lng + lngOffset, intensity });
  }
  
  // Generate Russia points
  for (let i = 0; i < russiaCount; i++) {
    const baseLoc = priorityRegions.russia[Math.floor(Math.random() * priorityRegions.russia.length)];
    const latOffset = (Math.random() - 0.5) * 10;
    const lngOffset = (Math.random() - 0.5) * 15;
    
    const intensityRoll = Math.random();
    const intensity: 'low' | 'medium' | 'high' = 
      intensityRoll > 0.65 ? 'high' : intensityRoll > 0.3 ? 'medium' : 'low';
    
    points.push({ lat: baseLoc.lat + latOffset, lng: baseLoc.lng + lngOffset, intensity });
  }
  
  // Generate Greenland points
  for (let i = 0; i < greenlandCount; i++) {
    const baseLoc = priorityRegions.greenland[Math.floor(Math.random() * priorityRegions.greenland.length)];
    const latOffset = (Math.random() - 0.5) * 6;
    const lngOffset = (Math.random() - 0.5) * 8;
    
    const intensityRoll = Math.random();
    const intensity: 'low' | 'medium' | 'high' = 
      intensityRoll > 0.5 ? 'high' : intensityRoll > 0.2 ? 'medium' : 'low';
    
    points.push({ lat: baseLoc.lat + latOffset, lng: baseLoc.lng + lngOffset, intensity });
  }
  
  // Generate Africa points
  for (let i = 0; i < africaCount; i++) {
    const baseLoc = priorityRegions.africa[Math.floor(Math.random() * priorityRegions.africa.length)];
    const latOffset = (Math.random() - 0.5) * 10;
    const lngOffset = (Math.random() - 0.5) * 10;
    
    const intensityRoll = Math.random();
    const intensity: 'low' | 'medium' | 'high' = 
      intensityRoll > 0.55 ? 'high' : intensityRoll > 0.25 ? 'medium' : 'low';
    
    points.push({ lat: baseLoc.lat + latOffset, lng: baseLoc.lng + lngOffset, intensity });
  }
  
  // Generate scattered points across ALL land locations worldwide
  for (let i = 0; i < scatteredCount; i++) {
    const baseLoc = landLocations[Math.floor(Math.random() * landLocations.length)];
    const latOffset = (Math.random() - 0.5) * 10;
    const lngOffset = (Math.random() - 0.5) * 12;
    
    const intensityRoll = Math.random();
    const intensity: 'low' | 'medium' | 'high' = 
      intensityRoll > 0.7 ? 'high' : intensityRoll > 0.35 ? 'medium' : 'low';
    
    points.push({ lat: baseLoc.lat + latOffset, lng: baseLoc.lng + lngOffset, intensity });
  }
  
  return points;
};

interface WorldMapProps {
  sightings: Sighting[];
  onMarkerClick?: (sighting: Sighting) => void;
}

export default function WorldMap({ sightings, onMarkerClick }: WorldMapProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [LeafletComponents, setLeafletComponents] = useState<{
    MapContainer: any;
    TileLayer: any;
    Marker: any;
    Popup: any;
    CircleMarker: any;
    L: any;
  } | null>(null);

  const heatMapPoints = useMemo(() => generateHeatMapPoints(1200), []);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Dynamically import Leaflet on client side only
    const loadLeaflet = async () => {
      const L = (await import('leaflet')).default;
      const { MapContainer, TileLayer, Marker, Popup, CircleMarker } = await import('react-leaflet');
      
      setLeafletComponents({ MapContainer, TileLayer, Marker, Popup, CircleMarker, L });
      setMounted(true);
    };
    
    loadLeaflet();
  }, []);

  if (!mounted || !LeafletComponents) {
    return (
      <div className="w-full h-full bg-[var(--alien-dark)] flex items-center justify-center absolute inset-0">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-2 border-[var(--matrix-green)] rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 border-2 border-[var(--matrix-green)] rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
            <div className="absolute inset-4 border-2 border-[var(--cyber-cyan)] rounded-full animate-spin" style={{ animationDirection: 'reverse', borderBottomColor: 'transparent' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-[var(--matrix-green)] rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-[var(--matrix-green)] font-mono text-sm animate-pulse text-center">
            Initializing Global Tracking System...
          </div>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, CircleMarker, L } = LeafletComponents;

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

  const getHeatColor = (intensity: 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'high': return '#00FF41';    // Bright matrix green
      case 'medium': return '#7FFF00';  // Yellow-green / Chartreuse
      case 'low': return '#32CD32';     // Lime green
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

  // Define world bounds to prevent dragging beyond the map
  const worldBounds = L.latLngBounds(
    L.latLng(-85, -180), // Southwest corner
    L.latLng(85, 180)    // Northeast corner
  );

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="w-full h-full"
      style={{ background: '#050505' }}
      zoomControl={false}
      dragging={isMobile}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={isMobile}
      boxZoom={false}
      keyboard={false}
      minZoom={2}
      maxZoom={isMobile ? 5 : 2}
      worldCopyJump={false}
      maxBounds={worldBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution=""
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
