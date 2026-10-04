

https://github.com/user-attachments/assets/f8740836-6942-43b3-92ca-027059839abd

# ☠️ SILICON MAZE — MULTIVERSE RECON

> **The timelines are collapsing. Five anomalies remain. Find them before Doom does.**

**Silicon Maze: Multiverse Recon** is a browser-based geolocation game inspired by the multiverse, TVA command centers, and the world of **Doctor Doom**.

Players investigate five randomly selected location anomalies, place a marker on a global map, and stabilize the timeline by getting as close as possible to the true coordinates.

---

## ⚡ Features

### 🔭 Observation Deck
- Cyberpunk / TVA-inspired interface
- Image-based location investigation
- Responsive desktop and mobile UI
- First-time field-agent walkthrough

### 🌍 Nexus Map
- Interactive world map using **Leaflet + OpenStreetMap**
- Click anywhere to place or move your guess
- Live latitude / longitude display
- No paid map API required

### 🌀 Multiverse Recon
- 5 randomly selected anomalies per game
- Hidden target coordinates
- Haversine-based distance calculation
- Distance-based convergence scoring

### ☠️ TVA Assessment
- Up to **1,000 base points per round**
- Zero points beyond **5,000 km**
- Time bonuses
- Accuracy streak multipliers
- Easy, Medium and Hard protocols

### ⏱️ Advanced Mechanics
- Countdown timer
- Streak system
- Difficulty modifiers
- Five-round campaign
- Final timeline stabilization report

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Leaflet**
- **React Leaflet**
- **Lucide React**
- **OpenStreetMap**
- **Unsplash**
- **Plain CSS**

No backend or database is required for the core experience.

---

## 📂 Project Structure

```text
silicon-maze-multiverse-recon/
├── public/
├── src/
│   ├── App.jsx       # Main game logic and screens
│   ├── Map.jsx       # Leaflet world map
│   ├── data.js       # Locations and difficulty settings
│   ├── geo.js        # Distance and scoring logic
│   ├── main.jsx      # React entry point
│   └── styles.css    # Cyberpunk UI
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Run Locally

### Requirements

- Node.js 18+
- npm

### Installation

```bash
git clone <your-repository-url>
cd silicon-maze-multiverse-recon
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧮 Scoring System

Distance is calculated using the **Haversine formula**:

```text
a = sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2)

c = 2 × atan2(√a, √(1-a))

distance = R × c
```

Where:

```text
R = 6371.0088 km
```

The closer the agent's marker is to the anomaly, the higher the convergence score.

Additional points can come from:

- ⏱️ Remaining time
- 🔥 Accuracy streak
- ☠️ Difficulty multiplier

---

## 🌐 Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Select **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`

### Netlify

```text
Build command: npm run build
Publish directory: dist
```

The application can also be deployed through **GitHub Pages** with the appropriate Vite `base` configuration.

---

## 🗺️ Location Data

The challenge version uses a predefined coordinate pool, allowing the game to operate without Google Maps, Mapbox, or Street View credentials.

Location imagery uses remote Unsplash assets.

For production, imagery can be replaced with:

- Original photographs
- Wikimedia Commons
- Mapillary
- Licensed Street View providers
- Another image API

> **Never commit API keys or secrets. Use environment variables for external services.**

---

## 🧩 Challenge Coverage

| Requirement | Implementation |
|---|---|
| Location Viewer | Responsive image viewer |
| First-Time Tour | Interactive walkthrough |
| World Map | Leaflet |
| Movable Marker | Click-to-place / move |
| Random Anomalies | Shuffled location pool |
| Distance Calculation | Haversine formula |
| Scoring | Proximity + modifiers |
| Five Rounds | Complete game loop |
| Timer | Countdown system |
| Streaks | Accuracy multiplier |
| Difficulty | Easy / Medium / Hard |
| Results | Final timeline report |
| Deployment | Vite production build |

---

## ⚠️ The Doom Protocol

> **Five anomalies. One timeline. Zero room for error.**

Locate the anomalies.  
Stabilize the timeline.  
Survive the convergence.

### **DOOM IS WATCHING.**
