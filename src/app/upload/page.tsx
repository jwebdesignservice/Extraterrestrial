'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import GlitchText from '@/components/ui/GlitchText';
import ProgressMeter from '@/components/ui/ProgressMeter';
import { AlienType, ThreatLevel } from '@/lib/types';

const alienTypes: AlienType[] = ['Grey', 'Reptilian', 'Nordic', 'Mantis', 'Interdimensional', 'Hybrid', 'Unknown'];

interface FormData {
  title: string;
  description: string;
  date: string;
  country: string;
  city: string;
  alienType: AlienType | '';
  witnesses: string;
  evidence: File | null;
  email: string;
}

export default function UploadPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    country: '',
    city: '',
    alienType: '',
    witnesses: '',
    evidence: null,
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [threatScore, setThreatScore] = useState<ThreatLevel | null>(null);

  const calculateThreatScore = (): ThreatLevel => {
    let score = 1;
    if (formData.alienType === 'Reptilian') score += 2;
    else if (formData.alienType === 'Interdimensional') score += 2;
    else if (formData.alienType === 'Grey') score += 1;
    
    if (parseInt(formData.witnesses) > 10) score += 1;
    if (formData.evidence) score += 1;
    
    return Math.min(5, Math.max(1, score)) as ThreatLevel;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      if (step === 2) {
        setThreatScore(calculateThreatScore());
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, evidence: e.target.files[0] });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <GlassPanel className="p-8 text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-6xl mb-4"
            >
              ✓
            </motion.div>
            <GlitchText
              text="REPORT SUBMITTED"
              className="font-mono text-2xl text-[var(--matrix-green)] mb-4"
              as="h1"
            />
            <p className="text-[var(--text-secondary)] mb-6">
              Your sighting report has been submitted for verification. 
              Our analysts will review the evidence and assign a credibility score.
            </p>
            <div className="p-4 bg-[var(--alien-dark)] rounded mb-6">
              <p className="text-[var(--text-muted)] text-xs mb-2">Assigned Threat Level</p>
              <p className={`text-3xl font-mono font-bold ${
                threatScore && threatScore >= 4 ? 'text-[var(--warning-red)]' : 
                threatScore && threatScore >= 3 ? 'text-[var(--warning-yellow)]' : 'text-[var(--matrix-green)]'
              }`}>
                Level {threatScore}
              </p>
            </div>
            <a
              href="/database"
              className="inline-block px-6 py-3 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold uppercase tracking-wider rounded"
            >
              Browse Database
            </a>
          </GlassPanel>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GlitchText
            text="REPORT A SIGHTING"
            className="font-mono text-3xl text-[var(--matrix-green)] mb-2"
            as="h1"
          />
          <p className="text-[var(--text-secondary)]">
            Submit evidence and help build the global disclosure database
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold ${
                  s <= step
                    ? 'bg-[var(--matrix-green)] text-[var(--alien-black)]'
                    : 'bg-[var(--alien-dark)] text-[var(--text-muted)] border border-[var(--glass-border)]'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    s < step ? 'bg-[var(--matrix-green)]' : 'bg-[var(--glass-border)]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <GlassPanel className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider mb-4">
                  Step 1: Basic Information
                </h2>

                <div>
                  <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                    Sighting Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Triangle Craft Over Phoenix"
                    className="w-full px-4 py-3 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)]"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what you witnessed in detail..."
                    rows={4}
                    className="w-full px-4 py-3 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                      Date of Sighting *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--matrix-green)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                      Number of Witnesses
                    </label>
                    <input
                      type="number"
                      value={formData.witnesses}
                      onChange={(e) => setFormData({ ...formData, witnesses: e.target.value })}
                      placeholder="1"
                      min="1"
                      className="w-full px-4 py-3 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider mb-4">
                  Step 2: Location & Classification
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="United States"
                      className="w-full px-4 py-3 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                      City/Region *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Phoenix, AZ"
                      className="w-full px-4 py-3 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                    Entity Type (if observed)
                  </label>
                  <select
                    value={formData.alienType}
                    onChange={(e) => setFormData({ ...formData, alienType: e.target.value as AlienType })}
                    className="w-full px-4 py-3 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--matrix-green)]"
                  >
                    <option value="">Select type...</option>
                    {alienTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                    Upload Evidence (Photo/Video)
                  </label>
                  <div className="border-2 border-dashed border-[var(--glass-border)] rounded-lg p-6 text-center hover:border-[var(--matrix-green)] transition-colors">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="evidence-upload"
                    />
                    <label htmlFor="evidence-upload" className="cursor-pointer">
                      {formData.evidence ? (
                        <div className="text-[var(--matrix-green)]">
                          <span className="text-2xl">📁</span>
                          <p className="mt-2">{formData.evidence.name}</p>
                        </div>
                      ) : (
                        <div className="text-[var(--text-muted)]">
                          <span className="text-4xl">📤</span>
                          <p className="mt-2">Click to upload or drag and drop</p>
                          <p className="text-xs">PNG, JPG, MP4 up to 50MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="font-mono text-[var(--matrix-green)] uppercase tracking-wider mb-4">
                  Step 3: Review & Submit
                </h2>

                {/* Summary */}
                <div className="space-y-3 p-4 bg-[var(--alien-dark)] rounded">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Title:</span>
                    <span className="text-[var(--text-primary)]">{formData.title || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Date:</span>
                    <span className="text-[var(--text-primary)]">{formData.date || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Location:</span>
                    <span className="text-[var(--text-primary)]">{formData.city}, {formData.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Type:</span>
                    <span className="text-[var(--text-primary)]">{formData.alienType || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Evidence:</span>
                    <span className="text-[var(--text-primary)]">{formData.evidence ? '✓ Attached' : 'None'}</span>
                  </div>
                </div>

                {/* Threat Score Preview */}
                {threatScore && (
                  <div className="p-4 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)]">
                    <p className="text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                      Preliminary Threat Assessment
                    </p>
                    <ProgressMeter
                      value={threatScore * 20}
                      color="threat"
                      threatLevel={threatScore}
                      showValue={false}
                      size="lg"
                    />
                    <p className="text-center mt-2 font-mono text-lg">
                      <span className={
                        threatScore >= 4 ? 'text-[var(--warning-red)]' : 
                        threatScore >= 3 ? 'text-[var(--warning-yellow)]' : 'text-[var(--matrix-green)]'
                      }>
                        Level {threatScore}
                      </span>
                    </p>
                  </div>
                )}

                {/* Contact Email */}
                <div>
                  <label className="block text-[var(--text-muted)] text-xs font-mono uppercase mb-2">
                    Contact Email (optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)]"
                  />
                </div>

                {/* Disclaimer */}
                <p className="text-[var(--text-muted)] text-xs">
                  By submitting, you confirm this report is based on a genuine experience and 
                  agree to our terms of service. False reports may result in account restrictions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t border-[var(--glass-border)]">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-2 font-mono uppercase tracking-wider rounded transition-all ${
                step === 1
                  ? 'text-[var(--text-muted)] cursor-not-allowed'
                  : 'text-[var(--text-secondary)] border border-[var(--glass-border)] hover:border-[var(--matrix-green)]'
              }`}
            >
              ← Back
            </button>
            
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold uppercase tracking-wider rounded hover:shadow-[0_0_20px_var(--matrix-green-glow)] transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold uppercase tracking-wider rounded hover:shadow-[0_0_20px_var(--matrix-green-glow)] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            )}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
