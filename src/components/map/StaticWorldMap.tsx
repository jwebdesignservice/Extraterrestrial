'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sighting } from '@/lib/types';
import { getThreatColor, getAlienTypeIcon } from '@/lib/utils';
import GlassPanel from '@/components/ui/GlassPanel';

interface StaticWorldMapProps {
  sightings: Sighting[];
  onMarkerClick?: (sighting: Sighting) => void;
}

// Convert lat/lng to percentage position on map
const coordsToPosition = (lat: number, lng: number) => {
  const x = ((lng + 180) / 360) * 100;
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
    <div className="relative w-full h-full bg-[#0a0c10] overflow-hidden select-none">
      {/* High-detail World Map SVG with country borders */}
      <svg
        viewBox="0 0 1200 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ background: '#0a0c10' }}
      >
        <defs>
          {/* Country fill gradients - various blue tones */}
          <linearGradient id="fill1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a3a52" />
            <stop offset="100%" stopColor="#152d42" />
          </linearGradient>
          <linearGradient id="fill2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a5a7a" />
            <stop offset="100%" stopColor="#1f4a65" />
          </linearGradient>
          <linearGradient id="fill3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a7a9a" />
            <stop offset="100%" stopColor="#2a6585" />
          </linearGradient>
          <linearGradient id="fill4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a9aba" />
            <stop offset="100%" stopColor="#3a85a5" />
          </linearGradient>
          <linearGradient id="fill5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5ab0d0" />
            <stop offset="100%" stopColor="#4a9aba" />
          </linearGradient>
          <linearGradient id="fillDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2a3a" />
            <stop offset="100%" stopColor="#0f1f2a" />
          </linearGradient>
        </defs>

        {/* Ocean background */}
        <rect width="1200" height="600" fill="#0a0c10" />

        {/* ========== NORTH AMERICA ========== */}
        {/* Canada */}
        <path
          d="M 120 80 L 180 60 L 260 55 L 340 65 L 380 80 L 360 100 L 320 95 L 280 105 L 240 100 L 200 110 L 160 105 L 130 95 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* USA */}
        <path
          d="M 130 110 L 200 115 L 280 110 L 340 115 L 360 105 L 380 120 L 370 145 L 340 170 L 300 185 L 260 190 L 220 185 L 180 175 L 150 160 L 130 140 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Alaska */}
        <path
          d="M 60 70 L 100 55 L 130 65 L 125 85 L 95 95 L 60 85 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Mexico */}
        <path
          d="M 150 190 L 220 195 L 260 200 L 270 230 L 250 260 L 220 270 L 190 260 L 170 240 L 160 210 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Greenland */}
        <path
          d="M 380 40 L 440 30 L 480 45 L 490 80 L 470 110 L 430 105 L 395 85 L 385 60 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />

        {/* ========== CENTRAL AMERICA & CARIBBEAN ========== */}
        <path
          d="M 220 275 L 250 280 L 265 310 L 255 340 L 235 350 L 215 335 L 210 305 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Cuba */}
        <path
          d="M 255 235 L 295 230 L 310 240 L 295 250 L 260 250 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />

        {/* ========== SOUTH AMERICA ========== */}
        {/* Colombia */}
        <path
          d="M 255 345 L 290 340 L 310 360 L 305 390 L 275 400 L 250 385 L 248 360 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Brazil */}
        <path
          d="M 305 380 L 360 365 L 395 390 L 405 440 L 395 500 L 360 530 L 310 520 L 285 480 L 280 430 L 290 395 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Argentina */}
        <path
          d="M 285 500 L 310 530 L 320 570 L 305 600 L 275 590 L 265 550 L 270 515 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Chile */}
        <path
          d="M 260 510 L 275 515 L 272 570 L 265 600 L 250 590 L 252 545 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Peru */}
        <path
          d="M 245 385 L 275 395 L 280 440 L 265 470 L 240 460 L 235 420 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Venezuela */}
        <path
          d="M 285 335 L 330 325 L 350 345 L 340 365 L 305 375 L 285 360 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />

        {/* ========== EUROPE ========== */}
        {/* UK */}
        <path
          d="M 515 100 L 530 90 L 540 100 L 535 120 L 520 130 L 510 115 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Ireland */}
        <path
          d="M 498 105 L 512 100 L 515 115 L 505 125 L 495 118 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />
        {/* France */}
        <path
          d="M 535 130 L 565 125 L 580 145 L 570 175 L 540 180 L 525 160 L 530 140 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Spain */}
        <path
          d="M 510 165 L 545 160 L 555 180 L 545 205 L 510 210 L 500 190 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Portugal */}
        <path
          d="M 495 175 L 508 172 L 510 200 L 498 210 L 490 195 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />
        {/* Germany */}
        <path
          d="M 570 115 L 600 110 L 615 130 L 610 155 L 585 160 L 568 140 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Poland */}
        <path
          d="M 615 115 L 650 110 L 665 130 L 655 155 L 625 155 L 612 135 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Italy */}
        <path
          d="M 580 175 L 600 168 L 615 185 L 610 220 L 590 245 L 575 230 L 572 200 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Norway/Sweden */}
        <path
          d="M 580 50 L 620 35 L 640 55 L 630 90 L 600 100 L 575 85 L 572 65 Z"
          fill="url(#fillDark)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Finland */}
        <path
          d="M 640 45 L 670 35 L 690 55 L 680 85 L 655 90 L 638 70 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Ukraine */}
        <path
          d="M 665 130 L 720 125 L 740 145 L 730 170 L 690 175 L 660 160 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Greece */}
        <path
          d="M 630 195 L 655 190 L 665 210 L 655 235 L 635 240 L 625 220 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />
        {/* Turkey */}
        <path
          d="M 665 185 L 730 175 L 760 195 L 750 220 L 700 230 L 665 215 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />

        {/* ========== RUSSIA ========== */}
        <path
          d="M 680 60 L 800 45 L 950 50 L 1080 65 L 1120 90 L 1100 130 L 1020 150 L 900 145 L 780 140 L 720 130 L 690 100 Z"
          fill="url(#fillDark)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />

        {/* ========== AFRICA ========== */}
        {/* Morocco */}
        <path
          d="M 505 215 L 540 210 L 555 235 L 545 265 L 510 270 L 498 245 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Algeria */}
        <path
          d="M 545 225 L 595 215 L 620 245 L 615 295 L 565 310 L 535 290 L 540 255 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Libya */}
        <path
          d="M 620 235 L 680 225 L 700 260 L 695 310 L 650 325 L 615 305 L 618 260 Z"
          fill="url(#fillDark)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Egypt */}
        <path
          d="M 680 235 L 730 225 L 745 260 L 740 300 L 705 315 L 685 295 L 682 255 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Sudan */}
        <path
          d="M 695 315 L 745 305 L 760 345 L 750 390 L 710 400 L 680 375 L 685 340 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Ethiopia */}
        <path
          d="M 750 370 L 795 355 L 815 385 L 805 420 L 765 430 L 745 405 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Somalia */}
        <path
          d="M 805 380 L 835 365 L 850 400 L 840 450 L 810 455 L 798 425 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Kenya */}
        <path
          d="M 765 430 L 800 420 L 815 455 L 800 490 L 765 495 L 755 465 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />
        {/* Tanzania */}
        <path
          d="M 755 485 L 795 475 L 810 510 L 795 545 L 760 550 L 745 520 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* DR Congo */}
        <path
          d="M 665 400 L 720 390 L 745 430 L 740 485 L 700 500 L 660 485 L 655 440 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Nigeria */}
        <path
          d="M 575 340 L 625 330 L 650 365 L 640 405 L 600 415 L 570 395 L 568 365 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Mali */}
        <path
          d="M 525 290 L 575 280 L 590 315 L 580 350 L 540 360 L 515 340 L 518 310 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Niger */}
        <path
          d="M 575 295 L 630 285 L 655 320 L 640 355 L 595 365 L 570 340 Z"
          fill="url(#fillDark)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Chad */}
        <path
          d="M 640 315 L 695 305 L 715 345 L 700 385 L 655 395 L 635 360 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* South Africa */}
        <path
          d="M 685 530 L 745 515 L 770 555 L 755 595 L 705 600 L 675 575 L 678 550 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Zambia */}
        <path
          d="M 705 480 L 750 470 L 765 505 L 750 535 L 710 540 L 695 515 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />
        {/* Angola */}
        <path
          d="M 640 465 L 695 455 L 710 495 L 695 535 L 650 545 L 630 515 L 635 485 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Madagascar */}
        <path
          d="M 815 495 L 845 480 L 860 520 L 850 575 L 820 585 L 805 550 L 810 515 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />

        {/* ========== MIDDLE EAST ========== */}
        {/* Saudi Arabia */}
        <path
          d="M 745 250 L 805 240 L 835 275 L 830 330 L 785 350 L 745 335 L 742 290 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Iran */}
        <path
          d="M 780 200 L 845 190 L 875 225 L 865 275 L 820 290 L 775 270 L 778 235 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Iraq */}
        <path
          d="M 755 210 L 790 200 L 810 230 L 800 265 L 765 275 L 752 245 Z"
          fill="url(#fillDark)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />

        {/* ========== CENTRAL/SOUTH ASIA ========== */}
        {/* Kazakhstan */}
        <path
          d="M 810 130 L 920 115 L 960 145 L 940 185 L 870 195 L 820 175 L 808 155 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Afghanistan */}
        <path
          d="M 865 210 L 915 200 L 935 230 L 920 265 L 880 275 L 862 250 Z"
          fill="url(#fillDark)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Pakistan */}
        <path
          d="M 880 265 L 925 255 L 945 295 L 930 340 L 890 350 L 868 320 L 875 290 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* India */}
        <path
          d="M 895 310 L 960 295 L 995 340 L 985 410 L 940 450 L 895 435 L 880 385 L 885 345 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Sri Lanka */}
        <path
          d="M 945 445 L 965 440 L 975 465 L 965 490 L 945 485 L 940 465 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />

        {/* ========== EAST ASIA ========== */}
        {/* China */}
        <path
          d="M 940 170 L 1040 155 L 1100 185 L 1095 260 L 1040 300 L 970 310 L 930 280 L 925 220 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Mongolia */}
        <path
          d="M 960 140 L 1050 130 L 1080 155 L 1065 185 L 1000 195 L 958 175 Z"
          fill="url(#fillDark)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Japan */}
        <path
          d="M 1110 180 L 1135 165 L 1150 190 L 1145 235 L 1125 260 L 1105 245 L 1100 210 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />
        {/* Korea */}
        <path
          d="M 1085 205 L 1105 195 L 1115 220 L 1105 250 L 1085 255 L 1080 230 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Taiwan */}
        <path
          d="M 1085 290 L 1100 285 L 1105 310 L 1095 325 L 1082 315 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />

        {/* ========== SOUTHEAST ASIA ========== */}
        {/* Thailand */}
        <path
          d="M 1000 330 L 1030 320 L 1045 355 L 1035 400 L 1010 410 L 995 380 L 998 350 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />
        {/* Vietnam */}
        <path
          d="M 1045 320 L 1070 310 L 1085 345 L 1075 400 L 1050 415 L 1040 380 L 1042 345 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Myanmar */}
        <path
          d="M 985 320 L 1010 310 L 1025 345 L 1015 390 L 990 400 L 978 365 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* Malaysia */}
        <path
          d="M 1015 420 L 1050 415 L 1065 445 L 1055 470 L 1020 475 L 1008 450 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Indonesia */}
        <path
          d="M 1020 480 L 1100 465 L 1140 495 L 1125 535 L 1060 545 L 1010 530 L 1015 505 Z"
          fill="url(#fill2)"
          stroke="#3a7a9a"
          strokeWidth="0.5"
        />
        {/* Philippines */}
        <path
          d="M 1095 350 L 1120 340 L 1135 375 L 1125 420 L 1100 430 L 1088 400 L 1092 370 Z"
          fill="url(#fill5)"
          stroke="#6ac0e0"
          strokeWidth="0.5"
        />

        {/* ========== AUSTRALIA & OCEANIA ========== */}
        {/* Australia */}
        <path
          d="M 1020 540 L 1120 515 L 1170 555 L 1175 620 L 1130 660 L 1050 655 L 1000 615 L 1005 570 Z"
          fill="url(#fill1)"
          stroke="#2a5a7a"
          strokeWidth="0.5"
        />
        {/* New Zealand */}
        <path
          d="M 1185 595 L 1200 585 L 1210 615 L 1200 650 L 1180 655 L 1175 625 Z"
          fill="url(#fill4)"
          stroke="#5ab0d0"
          strokeWidth="0.5"
        />
        {/* Papua New Guinea */}
        <path
          d="M 1140 465 L 1175 455 L 1190 485 L 1180 515 L 1150 520 L 1135 500 Z"
          fill="url(#fill3)"
          stroke="#4a9aba"
          strokeWidth="0.5"
        />

        {/* Sighting markers */}
        {sightings.map((sighting) => {
          const pos = coordsToPosition(
            sighting.location.coords[0],
            sighting.location.coords[1]
          );
          const color = getThreatColorHex(sighting.threatLevel);
          
          return (
            <g
              key={sighting.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onMarkerClick?.(sighting)}
              onMouseEnter={() => setHoveredSighting(sighting)}
              onMouseLeave={() => setHoveredSighting(null)}
            >
              {/* Pulse ring */}
              <circle
                cx={pos.x * 12}
                cy={pos.y * 6}
                r="12"
                fill={color}
                opacity="0.2"
              >
                <animate
                  attributeName="r"
                  values="8;16;8"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0.1;0.4"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Main dot */}
              <circle
                cx={pos.x * 12}
                cy={pos.y * 6}
                r="5"
                fill={color}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
              />
            </g>
          );
        })}
      </svg>

      {/* Green Scan Line Effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] pointer-events-none"
        style={{ 
          background: 'linear-gradient(90deg, transparent, #00FF41, #00FF41, transparent)',
          boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 40px #00FF4180'
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
            className="absolute pointer-events-none z-20"
            style={{
              left: `${coordsToPosition(hoveredSighting.location.coords[0], hoveredSighting.location.coords[1]).x}%`,
              top: `${Math.max(20, coordsToPosition(hoveredSighting.location.coords[0], hoveredSighting.location.coords[1]).y - 12)}%`,
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
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,12,16,0.7) 100%)',
        }}
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <GlassPanel className="p-3">
          <p className="text-[var(--text-muted)] text-xs font-mono uppercase mb-2">Threat Level</p>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="flex items-center gap-1">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ 
                    backgroundColor: getThreatColorHex(level),
                    boxShadow: `0 0 6px ${getThreatColorHex(level)}`
                  }}
                />
                <span className="text-[var(--text-muted)] text-xs">{level}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 z-10">
        <GlassPanel className="px-3 py-2">
          <p className="text-[var(--matrix-green)] text-xs font-mono">
            Click markers to view sighting details
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
