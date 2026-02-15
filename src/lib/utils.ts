// ============================================
// ET SCAN - Utility Functions
// ============================================

import { ThreatLevel, AlienType, CredibilityScore } from './types';

/**
 * Format large numbers with suffix (K, M, B)
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

/**
 * Format number with commas
 */
export function formatWithCommas(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Get threat level color class
 */
export function getThreatColor(level: ThreatLevel): string {
  const colors: Record<ThreatLevel, string> = {
    1: 'text-[#00FF41]',
    2: 'text-[#7FFF00]',
    3: 'text-[#FFD700]',
    4: 'text-[#FF6B00]',
    5: 'text-[#FF0040]',
  };
  return colors[level];
}

/**
 * Get threat level background color class
 */
export function getThreatBgColor(level: ThreatLevel): string {
  const colors: Record<ThreatLevel, string> = {
    1: 'bg-[#00FF41]',
    2: 'bg-[#7FFF00]',
    3: 'bg-[#FFD700]',
    4: 'bg-[#FF6B00]',
    5: 'bg-[#FF0040]',
  };
  return colors[level];
}

/**
 * Get threat level label
 */
export function getThreatLabel(level: ThreatLevel): string {
  const labels: Record<ThreatLevel, string> = {
    1: 'Minimal',
    2: 'Low',
    3: 'Moderate',
    4: 'High',
    5: 'Critical',
  };
  return labels[level];
}

/**
 * Get alien type icon/emoji
 */
export function getAlienTypeIcon(type: AlienType): string {
  const icons: Record<AlienType, string> = {
    Grey: '👽',
    Reptilian: '🦎',
    Nordic: '👤',
    Mantis: '🦗',
    Interdimensional: '🌀',
    Hybrid: '🧬',
    Unknown: '❓',
  };
  return icons[type];
}

/**
 * Get credibility color based on score
 */
export function getCredibilityColor(score: CredibilityScore): string {
  if (score >= 80) return 'text-[#00FF41]';
  if (score >= 60) return 'text-[#7FFF00]';
  if (score >= 40) return 'text-[#FFD700]';
  if (score >= 20) return 'text-[#FF6B00]';
  return 'text-[#FF0040]';
}

/**
 * Get credibility label
 */
export function getCredibilityLabel(score: CredibilityScore): string {
  if (score >= 80) return 'Highly Credible';
  if (score >= 60) return 'Credible';
  if (score >= 40) return 'Questionable';
  if (score >= 20) return 'Unreliable';
  return 'Unverified';
}

/**
 * Format date to display format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date to short format
 */
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  return formatDateShort(date.toISOString());
}

/**
 * Generate a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Generate random number in range
 */
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random integer in range
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(randomRange(min, max + 1));
}

/**
 * Pick random item from array
 */
export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffle array
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Delay execution
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Class name utility (like clsx/classnames)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse coordinates string to tuple
 */
export function parseCoords(coordsStr: string): [number, number] | null {
  const match = coordsStr.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2])];
  }
  return null;
}

/**
 * Format coordinates for display
 */
export function formatCoords(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Generate fake signal data for visualization
 */
export function generateSignalData(count: number): { time: number; value: number }[] {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      time: i,
      value: Math.sin(i * 0.1) * 50 + Math.random() * 30 + 50,
    });
  }
  return data;
}
