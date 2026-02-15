'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import tokenData from '@/data/token.json';
import GlassPanel from '@/components/ui/GlassPanel';
import GlitchText from '@/components/ui/GlitchText';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { formatWithCommas, copyToClipboard } from '@/lib/utils';

export default function TokenPage() {
  const [copied, setCopied] = useState(false);
  const [burnedAmount, setBurnedAmount] = useState(tokenData.burnedAmount);

  useEffect(() => {
    // Simulate live burns
    const interval = setInterval(() => {
      setBurnedAmount((prev) => prev + Math.floor(Math.random() * 100));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    await copyToClipboard(tokenData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-8 mb-6">
            <GlitchText
              text="$ETS"
              className="font-mono text-5xl md:text-6xl text-[var(--matrix-green)]"
              as="h1"
            />
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase">Total Supply</p>
                <p className="text-3xl font-mono text-[var(--text-primary)]">1B</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)] text-xs uppercase">Tax</p>
                <p className="text-3xl font-mono text-[var(--matrix-green)]">0%</p>
              </div>
            </div>
          </div>

          {/* Contract Address */}
          <GlassPanel className="p-4 mb-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[var(--text-muted)] text-xs font-mono uppercase mb-1">
                  Contract Address
                </p>
                <p className="text-[var(--matrix-green)] font-mono break-all">
                  {tokenData.contractAddress}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-sm hover:border-[var(--matrix-green)] transition-colors"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
          </GlassPanel>

          {/* Exchange Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {tokenData.exchanges.map((exchange) => (
              <a
                key={exchange.name}
                href={exchange.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass-panel hover:border-[var(--matrix-green)] transition-all flex items-center justify-between"
              >
                <span className="text-[var(--text-primary)] font-medium">{exchange.name}</span>
                <span className="text-[var(--text-muted)]">↗</span>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="#"
              className="px-6 py-3 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold uppercase tracking-wider rounded hover:shadow-[0_0_30px_var(--matrix-green-glow)] transition-all"
            >
              Buy on Pump.fun
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-[var(--warning-red)] text-white font-mono font-bold uppercase tracking-wider rounded hover:shadow-[0_0_30px_var(--warning-red-glow)] transition-all"
            >
              View Chart
            </a>
            <Link
              href="/"
              className="px-6 py-3 border border-[var(--glass-border)] text-[var(--text-secondary)] font-mono uppercase tracking-wider rounded hover:border-[var(--matrix-green)] transition-all"
            >
              Back to Map ↗
            </Link>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Token Info */}
          <GlassPanel className="p-6">
            <h2 className="font-mono text-[var(--text-muted)] text-xs uppercase tracking-wider mb-4">
              TOKEN_INFO
            </h2>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">├── symbol</span>
                <span className="text-[var(--matrix-green)]">{tokenData.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">├── total_supply</span>
                <span className="text-[var(--matrix-green)]">{formatWithCommas(tokenData.totalSupply)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">├── burn_per_scan</span>
                <span className="text-[var(--matrix-green)]">{tokenData.burnPerScan} tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">├── tax</span>
                <span className="text-[var(--matrix-green)]">{tokenData.tax}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">└── liquidity</span>
                <span className="text-[var(--warning-red)]">{tokenData.liquidity}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--glass-border)]">
              <h3 className="font-mono text-[var(--text-muted)] text-xs uppercase tracking-wider mb-3">
                TOKENOMICS
              </h3>
              <div className="space-y-2 font-mono text-sm">
                {tokenData.tokenomics.map((item, index) => (
                  <div key={item.category} className="flex justify-between">
                    <span className="text-[var(--text-muted)]">
                      {index === tokenData.tokenomics.length - 1 ? '└──' : '├──'} {item.category.toLowerCase()}
                    </span>
                    <span className={item.percentage > 0 ? 'text-[var(--matrix-green)]' : 'text-[var(--text-muted)]'}>
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>

          {/* Burn Counter */}
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-[var(--text-muted)] text-xs uppercase tracking-wider">
                BURN_COUNTER
              </h2>
              <div className="w-8 h-8 flex items-center justify-center">
                <motion.span
                  className="text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔥
                </motion.span>
              </div>
            </div>
            
            <div className="text-center py-8">
              <AnimatedCounter
                value={burnedAmount}
                className="text-5xl md:text-6xl font-bold text-[var(--warning-red)] font-mono"
              />
              <p className="text-[var(--text-muted)] mt-2">$ETS burned forever</p>
            </div>

            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">├── burn_rate</span>
                <span className="text-[var(--warning-orange)]">100/scan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">├── status</span>
                <span className="text-[var(--matrix-green)]">active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">└── last_burn</span>
                <span className="text-[var(--cyber-cyan)]">just now</span>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* How Burn Works */}
        <GlassPanel className="p-6 mb-8">
          <h2 className="font-mono text-[var(--text-muted)] text-xs uppercase tracking-wider mb-6">
            How Burn Mechanics Work
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: 'User Scans', desc: 'Every time someone explores a country, clan, or historical figure.' },
              { step: 2, title: 'Tokens Burn', desc: 'A small amount of $ETS is automatically burned forever.' },
              { step: 3, title: 'Supply Decreases', desc: 'Total supply shrinks, increasing scarcity for holders.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 bg-[var(--alien-dark)] rounded border border-[var(--glass-border)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold rounded">
                    {item.step}
                  </span>
                  <h3 className="text-[var(--text-primary)] font-medium">{item.title}</h3>
                </div>
                <p className="text-[var(--text-muted)] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </GlassPanel>

        {/* Roadmap */}
        <GlassPanel className="p-6 mb-8" id="roadmap">
          <h2 className="font-mono text-[var(--text-muted)] text-xs uppercase tracking-wider mb-6">
            Roadmap
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--glass-border)]">
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase text-[var(--matrix-green)]">Phase</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase text-[var(--matrix-green)]">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase text-[var(--matrix-green)]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-mono uppercase text-[var(--matrix-green)]">Milestones</th>
                </tr>
              </thead>
              <tbody>
                {tokenData.roadmap.map((phase) => (
                  <tr key={phase.phase} className="border-b border-[var(--glass-border)]/50">
                    <td className="px-4 py-4 text-[var(--cyber-cyan)] font-mono">
                      Phase {phase.phase}
                    </td>
                    <td className="px-4 py-4 text-[var(--text-primary)]">
                      {phase.title}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs font-mono rounded ${
                        phase.status === 'completed'
                          ? 'bg-[var(--matrix-green)]/20 text-[var(--matrix-green)]'
                          : phase.status === 'in_progress'
                          ? 'bg-[var(--warning-yellow)]/20 text-[var(--warning-yellow)]'
                          : 'bg-[var(--alien-dark)] text-[var(--text-muted)]'
                      }`}>
                        {phase.status === 'in_progress' ? 'In Progress' : phase.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {phase.milestones.map((milestone) => (
                          <span
                            key={milestone}
                            className="px-2 py-0.5 bg-[var(--alien-dark)] text-[var(--text-secondary)] text-xs rounded"
                          >
                            {milestone}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        {/* Why $ETS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { title: 'Deflationary', value: '100 burned/scan', desc: 'Every scan burns tokens, reducing supply over time. The more the platform is used, the scarcer the token becomes.' },
            { title: 'Community Driven', value: '90% community', desc: 'Built by and for the disclosure community. No team tokens, no vesting, 100% fair launch.' },
            { title: 'Cultural Mission', value: '54 countries', desc: 'Celebrating the search for truth. Educational platform with real historical data and cultural information.' },
            { title: 'Safe & Secure', value: '0% tax', desc: 'Liquidity burned, contract verified, community owned. Transparent tokenomics with 0% tax.' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassPanel hover className="p-6 h-full">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[var(--text-primary)] font-medium">{feature.title}</h3>
                  <span className="text-[var(--matrix-green)] font-mono text-sm">{feature.value}</span>
                </div>
                <p className="text-[var(--text-muted)] text-sm">{feature.desc}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Related Links */}
        <GlassPanel className="p-6">
          <h2 className="font-mono text-[var(--text-muted)] text-xs uppercase tracking-wider mb-4">
            Related
          </h2>
          <div className="flex flex-wrap gap-4">
            {[
              { href: '/', label: 'Map' },
              { href: '/database', label: 'Database' },
              { href: '/upload', label: 'Report Sighting' },
              { href: '/scanner', label: 'DNA Scanner' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded text-[var(--text-secondary)] hover:border-[var(--matrix-green)] hover:text-[var(--matrix-green)] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
