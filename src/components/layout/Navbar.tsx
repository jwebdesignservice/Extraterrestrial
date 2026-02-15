'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Map' },
  { href: '/database', label: 'Database' },
  { href: '/token', label: 'Token' },
  { href: '/upload', label: 'Report' },
  { href: '/scanner', label: 'Scanner' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      {/* Main navbar */}
      <div className="glass-panel border-b border-[var(--glass-border)] backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-[var(--matrix-green)] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-1 bg-[var(--matrix-green)] rounded-full opacity-10 animate-ping" />
                <span className="text-2xl relative z-10">👽</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-[var(--matrix-green)] text-lg tracking-wider">
                  ET SCAN
                </span>
                <span className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase">
                  Global ET Intelligence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 relative z-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 rounded relative z-10',
                    pathname === link.href
                      ? 'text-[var(--matrix-green)] bg-[var(--matrix-green)]/10'
                      : 'text-[var(--text-secondary)] hover:text-[var(--matrix-green)] hover:bg-[var(--matrix-green)]/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search & Actions */}
            <div className="hidden md:flex items-center gap-4 relative z-10">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sightings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 px-4 py-2 pl-10 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)] focus:shadow-[0_0_10px_var(--matrix-green-glow)] transition-all duration-300"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
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
              </div>

              {/* Buy Token Button */}
              <Link
                href="/token"
                className="px-4 py-2 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold text-sm uppercase tracking-wider rounded hover:shadow-[0_0_20px_var(--matrix-green-glow)] transition-all duration-300"
              >
                Buy $ET
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[var(--text-primary)] hover:text-[var(--matrix-green)] transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-[var(--glass-border)]"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search sightings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)]"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
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
              </div>

              {/* Mobile Nav Links */}
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-4 py-3 font-mono text-sm uppercase tracking-wider rounded transition-all duration-300',
                      pathname === link.href
                        ? 'text-[var(--matrix-green)] bg-[var(--matrix-green)]/10 border-l-2 border-[var(--matrix-green)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--matrix-green)] hover:bg-[var(--matrix-green)]/5'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Buy Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="/token"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-3 mt-4 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold text-sm uppercase tracking-wider rounded text-center"
                >
                  Buy $ET Token
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
