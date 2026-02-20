'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  explore: [
    { href: '/', label: 'World Map' },
    { href: '/database', label: 'Sightings Database' },
    { href: '/upload', label: 'Report Sighting' },
  ],
  token: [
    { href: '/token', label: 'Token Info' },
    { href: '/token#tokenomics', label: 'Tokenomics' },
    { href: '/token#roadmap', label: 'Roadmap' },
  ],
  resources: [
    { href: '#', label: 'Documentation' },
    { href: '#', label: 'API Access' },
    { href: '#', label: 'Research Papers' },
  ],
};

const socialLinks = [
  {
    name: 'X (Twitter)',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--glass-border)] bg-[var(--alien-darker)]">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/et-logo.jpg"
                alt="AlienScan Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-mono font-bold text-[var(--matrix-green)] text-xl tracking-wider">
                AlienScan
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Exposing extraterrestrial intelligence through decentralized transparency. 
              Track global sightings, analyze patterns, and join the disclosure movement.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 glass-panel hover:border-[var(--matrix-green)] hover:text-[var(--matrix-green)] text-[var(--text-secondary)] transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-mono text-[var(--matrix-green)] text-sm uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--matrix-green)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Token Links */}
          <div>
            <h3 className="font-mono text-[var(--matrix-green)] text-sm uppercase tracking-wider mb-4">
              Token
            </h3>
            <ul className="space-y-2">
              {footerLinks.token.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--matrix-green)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-mono text-[var(--matrix-green)] text-sm uppercase tracking-wider mb-4">
              Get Updates
            </h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Subscribe for classified intel and sighting alerts.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 bg-[var(--alien-dark)] border border-[var(--glass-border)] rounded font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--matrix-green)]"
              />
              <button className="px-4 py-2 bg-[var(--matrix-green)] text-[var(--alien-black)] font-mono font-bold text-sm rounded hover:shadow-[0_0_15px_var(--matrix-green-glow)] transition-all">
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--glass-border)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--text-muted)] text-xs">
              Data sourced from declassified reports. This site does not constitute financial advice. 
              Information is provided for educational purposes only.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--matrix-green)] transition-colors">
                Terms of Use
              </Link>
              <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--matrix-green)] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-[var(--text-muted)] text-xs">
              Powered by <span className="text-[var(--matrix-green)]">AlienScan</span> • Disclosure Initiative 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
