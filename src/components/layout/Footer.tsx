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
    name: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--glass-border)] bg-[var(--alien-darker)]">
      {/* Contract Address Bar */}
      <div className="border-b border-[var(--glass-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm font-mono">
            <span className="text-[var(--text-muted)]">CA:</span>
            <span className="text-[var(--matrix-green)]">0xETSCAN...ToKeN2024</span>
            <button
              onClick={() => navigator.clipboard.writeText('0xAL13NM3T4...ToKeN2024')}
              className="p-1 hover:text-[var(--matrix-green)] text-[var(--text-muted)] transition-colors"
              aria-label="Copy contract address"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/et-logo.jpg"
                alt="ET Scan Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-mono font-bold text-[var(--matrix-green)] text-xl tracking-wider">
                ET SCAN
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
              Powered by <span className="text-[var(--matrix-green)]">ET SCAN</span> • Disclosure Initiative 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
