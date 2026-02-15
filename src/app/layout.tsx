import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MarqueeBar from '@/components/layout/MarqueeBar';
import SoundToggle from '@/components/features/SoundToggle';
import ClientWrapper from '@/components/layout/ClientWrapper';

export const metadata: Metadata = {
  title: 'ET SCAN ($ET) | Global Extraterrestrial Intelligence Network',
  description: 'Track global alien sightings, analyze patterns, and join the disclosure movement. The most comprehensive database of extraterrestrial encounters.',
  keywords: 'et scan, $et, alien, ufo, uap, sightings, extraterrestrial, disclosure, crypto, token',
  openGraph: {
    title: 'ET SCAN ($ET) | Global Extraterrestrial Intelligence Network',
    description: 'Track global alien sightings, analyze patterns, and join the disclosure movement.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <ClientWrapper>
          {/* Background Effects */}
          <div className="grid-overlay" />
          
          {/* Navigation */}
          <Navbar />
          <MarqueeBar />
          
          {/* Main Content */}
          <main className="flex-1 pt-[104px]">
        {children}
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Sound Toggle */}
          <SoundToggle />
        </ClientWrapper>
      </body>
    </html>
  );
}
