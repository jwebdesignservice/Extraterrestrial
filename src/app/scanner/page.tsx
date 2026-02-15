'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import GlitchText from '@/components/ui/GlitchText';
import ProgressMeter from '@/components/ui/ProgressMeter';
import RadarSweep from '@/components/effects/RadarSweep';

interface ScanResult {
  reptilian: number;
  grey: number;
  nordic: number;
  human: number;
  galacticOrigin: string;
  rank: string;
  recommendation: string;
}

const galacticOrigins = [
  'Zeta Reticuli',
  'Sirius B',
  'Pleiades Star Cluster',
  'Orion Nebula',
  'Alpha Draconis',
  'Andromeda Galaxy',
  'Proxima Centauri',
  'Earth (Native)',
];

const ranks = [
  'Civilian Observer',
  'Junior Analyst',
  'Field Researcher',
  'Senior Investigator',
  'Elite Agent',
  'Galactic Ambassador',
  'Hybrid Candidate',
];

const recommendations = [
  'Continue monitoring local sky activity',
  'You may be on their radar. Stay vigilant.',
  'High compatibility detected. Expect contact soon.',
  'Genetic markers suggest previous encounters',
  'You have been chosen for observation',
  'Standard Earth specimen. No special interest.',
];

export default function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateResult = (): ScanResult => {
    const reptilian = Math.floor(Math.random() * 30);
    const grey = Math.floor(Math.random() * 40);
    const nordic = Math.floor(Math.random() * 20);
    const human = 100 - reptilian - grey - nordic;

    return {
      reptilian,
      grey,
      nordic,
      human: Math.max(0, human),
      galacticOrigin: galacticOrigins[Math.floor(Math.random() * galacticOrigins.length)],
      rank: ranks[Math.floor(Math.random() * ranks.length)],
      recommendation: recommendations[Math.floor(Math.random() * recommendations.length)],
    };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setResult(null);

    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setScanProgress(i);
    }

    setIsScanning(false);
    setResult(generateResult());
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setResult(null);
    setScanProgress(0);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GlitchText
            text="ALIEN DNA SCANNER"
            className="font-mono text-3xl text-[var(--matrix-green)] mb-2"
            as="h1"
          />
          <p className="text-[var(--text-secondary)]">
            Upload a photo to analyze your extraterrestrial genetic markers
          </p>
          <p className="text-[var(--text-muted)] text-xs mt-2">
            For entertainment purposes only. Results are randomly generated.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Scanner Area */}
          <GlassPanel className="p-6">
            <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider text-sm mb-4">
              Specimen Input
            </h2>

            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-[var(--glass-border)] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[var(--matrix-green)] transition-colors"
              >
                <span className="text-6xl mb-4">👤</span>
                <p className="text-[var(--text-secondary)] mb-2">Click to upload photo</p>
                <p className="text-[var(--text-muted)] text-xs">PNG, JPG up to 10MB</p>
              </div>
            ) : (
              <div className="relative aspect-square rounded-lg overflow-hidden">
                {/* Image */}
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />

                {/* Scan Overlay */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[var(--alien-black)]/80 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <RadarSweep size={150} />
                        <p className="text-[var(--matrix-green)] font-mono mt-4">
                          Scanning... {scanProgress}%
                        </p>
                      </div>

                      {/* Scan line */}
                      <motion.div
                        className="absolute left-0 right-0 h-1 bg-[var(--matrix-green)]"
                        style={{ boxShadow: '0 0 20px var(--matrix-green)' }}
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Grid Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: 'linear-gradient(var(--matrix-green) 1px, transparent 1px), linear-gradient(90deg, var(--matrix-green) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              {selectedImage && !result && (
                <button
                  onClick={startScan}
                  disabled={isScanning}
                  className="flex-1 py-3 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold uppercase tracking-wider rounded hover:shadow-[0_0_20px_var(--matrix-green-glow)] transition-all disabled:opacity-50"
                >
                  {isScanning ? 'Scanning...' : 'Initiate Scan'}
                </button>
              )}
              {selectedImage && (
                <button
                  onClick={resetScanner}
                  className="px-6 py-3 border border-[var(--glass-border)] text-[var(--text-secondary)] font-mono uppercase tracking-wider rounded hover:border-[var(--warning-red)] hover:text-[var(--warning-red)] transition-all"
                >
                  Reset
                </button>
              )}
            </div>
          </GlassPanel>

          {/* Results Area */}
          <GlassPanel className="p-6">
            <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider text-sm mb-4">
              Analysis Results
            </h2>

            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center py-12 text-center"
                >
                  <span className="text-6xl mb-4 opacity-30">🧬</span>
                  <p className="text-[var(--text-muted)]">
                    {selectedImage
                      ? 'Click "Initiate Scan" to analyze genetic markers'
                      : 'Upload an image to begin DNA analysis'}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* DNA Breakdown */}
                  <div className="space-y-3">
                    <h3 className="text-[var(--text-muted)] text-xs font-mono uppercase">
                      Genetic Composition
                    </h3>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[var(--text-secondary)] text-sm">👽 Grey DNA</span>
                        <span className="text-[var(--cyber-cyan)] font-mono">{result.grey}%</span>
                      </div>
                      <ProgressMeter value={result.grey} color="cyan" showValue={false} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[var(--text-secondary)] text-sm">🦎 Reptilian DNA</span>
                        <span className="text-[var(--matrix-green)] font-mono">{result.reptilian}%</span>
                      </div>
                      <ProgressMeter value={result.reptilian} color="green" showValue={false} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[var(--text-secondary)] text-sm">👤 Nordic DNA</span>
                        <span className="text-[var(--warning-yellow)] font-mono">{result.nordic}%</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--alien-dark)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--warning-yellow)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.nordic}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-[var(--text-secondary)] text-sm">🌍 Human DNA</span>
                        <span className="text-[var(--text-primary)] font-mono">{result.human}%</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--alien-dark)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--text-secondary)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.human}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Origin & Rank */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--glass-border)]">
                    <div>
                      <p className="text-[var(--text-muted)] text-xs font-mono uppercase mb-1">
                        Galactic Origin
                      </p>
                      <p className="text-[var(--warning-yellow)] font-mono">
                        {result.galacticOrigin}
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--text-muted)] text-xs font-mono uppercase mb-1">
                        Assigned Rank
                      </p>
                      <p className="text-[var(--cyber-cyan)] font-mono">
                        {result.rank}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)]">
                    <p className="text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                      Analysis Recommendation
                    </p>
                    <p className="text-[var(--text-secondary)] italic">
                      &ldquo;{result.recommendation}&rdquo;
                    </p>
                  </div>

                  {/* Share Button */}
                  <button
                    onClick={() => alert('Share functionality coming soon!')}
                    className="w-full py-3 border border-[var(--matrix-green)] text-[var(--matrix-green)] font-mono uppercase tracking-wider rounded hover:bg-[var(--matrix-green)] hover:text-[var(--alien-black)] transition-all"
                  >
                    📤 Share Results
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[var(--text-muted)] text-xs mt-8">
          This scanner is for entertainment purposes only. No actual DNA analysis is performed.
          All results are randomly generated and have no scientific basis.
        </p>
      </div>
    </div>
  );
}
