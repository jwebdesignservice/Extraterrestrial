// ============================================
// ET SCAN - TypeScript Type Definitions
// ============================================

// Coordinates type
export type Coordinates = [number, number]; // [latitude, longitude]

// Alien Classifications
export type AlienType = 
  | 'Grey' 
  | 'Reptilian' 
  | 'Nordic' 
  | 'Mantis' 
  | 'Interdimensional' 
  | 'Hybrid' 
  | 'Unknown';

// Threat Levels (1-5)
export type ThreatLevel = 1 | 2 | 3 | 4 | 5;

// Credibility Score (0-100)
export type CredibilityScore = number;

// Timeline Event
export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

// Witness Testimony
export interface Witness {
  id: string;
  name: string;
  occupation?: string;
  testimony: string;
  credibility: 'high' | 'medium' | 'low';
  verified: boolean;
}

// Signal Data for waveform visualization
export interface SignalData {
  timestamp: number;
  frequency: number;
  amplitude: number;
  decoded?: string;
}

// Probability Assessment
export interface Probabilities {
  hoax: number;
  extraterrestrial: number;
  coverUp: number;
  naturalPhenomenon?: number;
}

// Location Details
export interface Location {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  coords: Coordinates;
}

// Military/Government Response
export interface OfficialResponse {
  agency: string;
  statement: string;
  date: string;
  classification?: 'public' | 'declassified' | 'leaked';
}

// Evidence Item
export interface Evidence {
  type: 'photo' | 'video' | 'audio' | 'document' | 'physical' | 'radar';
  description: string;
  url?: string;
  verified: boolean;
  date: string;
}

// Related Facts/Anomalies
export interface RelatedFact {
  category: 'weather' | 'power' | 'animal' | 'radar' | 'military' | 'other';
  title: string;
  description: string;
}

// Main Sighting Interface
export interface Sighting {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  location: Location;
  date: string;
  year: number;
  credibilityScore: CredibilityScore;
  threatLevel: ThreatLevel;
  alienType: AlienType;
  overview: string;
  timeline: TimelineEvent[];
  witnesses: Witness[];
  signals?: SignalData[];
  probabilities: Probabilities;
  officialResponses?: OfficialResponse[];
  evidence?: Evidence[];
  relatedFacts?: RelatedFact[];
  relatedTopics: string[];
  sources: string[];
  featured?: boolean;
  tags: string[];
}

// Alien Species Classification
export interface AlienSpecies {
  id: string;
  name: AlienType;
  description: string;
  intelligence: number; // 1-10
  technologicalCapability: number; // 1-10
  hostility: number; // 1-10
  originSystem?: string;
  characteristics: string[];
  knownAbilities: string[];
  firstContact?: string;
  sightingsCount: number;
}

// Signal Detection Log Entry
export interface SignalLog {
  id: string;
  timestamp: Date;
  type: 'detection' | 'anomaly' | 'upload' | 'classified' | 'alert';
  message: string;
  location?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Token Info
export interface TokenInfo {
  symbol: string;
  name: string;
  contractAddress: string;
  totalSupply: number;
  burnedAmount: number;
  burnPerScan: number;
  tax: number;
  liquidity: string;
}

// Tokenomics Distribution
export interface TokenomicsItem {
  category: string;
  percentage: number;
  description?: string;
}

// Roadmap Phase
export interface RoadmapPhase {
  phase: number;
  title: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  milestones: string[];
}

// Country Data
export interface Country {
  code: string;
  name: string;
  region: string;
  sightingsCount: number;
  flagEmoji: string;
}

// Database Filter Options
export interface FilterOptions {
  search?: string;
  year?: number | null;
  country?: string | null;
  alienType?: AlienType | null;
  threatLevel?: ThreatLevel | null;
  minCredibility?: number;
  sortBy?: 'date' | 'credibility' | 'threat' | 'recent';
  sortOrder?: 'asc' | 'desc';
}

// Pagination
export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

// DNA Scanner Result
export interface DNAScanResult {
  reptilian: number;
  grey: number;
  nordic: number;
  human: number;
  galacticOrigin: string;
  rank: string;
  recommendation: string;
}

// Upload Sighting Form Data
export interface SightingSubmission {
  title: string;
  description: string;
  location: Location;
  date: string;
  alienType?: AlienType;
  evidence?: File[];
  contactEmail?: string;
}

// Activity Stats
export interface ActivityStats {
  totalSightings: number;
  countriesAffected: number;
  activeSignals: number;
  threatIndex: number;
  disclosureProbability: number;
  last24Hours: number;
}

// Map Marker
export interface MapMarker {
  id: string;
  coords: Coordinates;
  title: string;
  threatLevel: ThreatLevel;
  alienType: AlienType;
  date: string;
  slug: string;
}
