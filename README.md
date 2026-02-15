# 🌌 ALIEN META - Global Extraterrestrial Intelligence Network

A fully responsive, production-ready Next.js website for tracking global alien sightings, analyzing extraterrestrial encounters, and joining the disclosure movement.

![ALIEN META](https://img.shields.io/badge/ALIEN%20META-Disclosure%20Initiative-00FF41?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6Ii8+PC9zdmc+)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: TailwindCSS with custom Matrix-inspired theme
- **Animations**: Framer Motion
- **Maps**: Leaflet + React-Leaflet
- **Audio**: Howler.js
- **Charts**: Recharts

## ✨ Features

### 🗺️ Interactive World Map
- Real-time global sighting visualization
- Animated pulsing markers by threat level
- Click-to-view sighting details
- Dark theme map tiles

### 📊 Comprehensive Database
- Searchable and filterable sighting records
- Sort by date, credibility, or threat level
- Responsive table/card layouts
- Expandable row details

### 📁 Dynamic Case Studies
- Detailed analysis for each sighting
- Timeline visualization
- Witness testimonies
- Signal waveform analysis
- Probability assessments

### 🪙 Token Information
- Tokenomics breakdown
- Live burn counter
- Roadmap visualization
- Exchange links

### 📤 Report Sightings
- Multi-step submission form
- Auto-generated threat scoring
- Evidence upload support

### 🧬 DNA Scanner
- Fun selfie analysis tool
- Animated scanning effects
- Random genetic composition results

### 🎨 Immersive Design
- Matrix-inspired green/black theme
- Glassmorphism panels
- Glitch text effects
- Scan line overlays
- Particle backgrounds
- Radar sweep animations

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home - World Map
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & theme
│   ├── database/             # Sightings database
│   ├── case/[slug]/          # Dynamic case studies
│   ├── token/                # Token information
│   ├── upload/               # Report sighting form
│   └── scanner/              # DNA scanner tool
├── components/
│   ├── layout/               # Navbar, Footer, MarqueeBar
│   ├── ui/                   # Reusable UI components
│   ├── map/                  # Map components
│   ├── case/                 # Case study components
│   ├── features/             # Feature components
│   └── effects/              # Visual effects
├── data/
│   ├── sightings.json        # Sighting records
│   ├── alien-types.json      # Alien classifications
│   └── token.json            # Token data
├── hooks/
│   └── useSound.ts           # Audio management
└── lib/
    ├── types.ts              # TypeScript interfaces
    └── utils.ts              # Utility functions
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd ET
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎨 Design System

### Colors
| Variable | Hex | Usage |
|----------|-----|-------|
| `--alien-black` | #050505 | Primary background |
| `--matrix-green` | #00FF41 | Primary accent |
| `--cyber-cyan` | #00FFFF | Secondary accent |
| `--warning-red` | #FF0040 | Alerts & warnings |

### Typography
- **Headings**: JetBrains Mono (uppercase, letter-spacing)
- **Body**: Outfit (clean sans-serif)
- **Terminal**: Fira Code (monospace)

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic functionality. The app uses:
- OpenStreetMap tiles (no API key needed)
- Local JSON data (no external API calls)

### Optional Configuration
To add real ambient audio:
1. Add an audio file to `public/sounds/ambient.mp3`
2. Update the `useAmbientSound` hook call in the layout

## 📱 Responsive Breakpoints

| Breakpoint | Size | Layout |
|------------|------|--------|
| Mobile | < 640px | Single column, cards |
| Tablet | 640-1023px | 2 columns |
| Desktop | 1024px+ | Full layout with sidebars |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## ⚠️ Disclaimer

This site is for **educational and entertainment purposes only**. All sighting data is either historically documented or fictional. The token information is demonstrative and does not constitute financial advice.

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

**Built with 👽 by the Disclosure Initiative**
