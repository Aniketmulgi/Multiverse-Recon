/**
 * Curated Anomaly Dataset
 * Anomaly IDs and payloads are masked during recon rounds to prevent
 * reverse-engineering or spoiling the location via DOM inspect/network logs.
 */

export const ANOMALIES = [
  {
    id: "recon-tyo-98",
    name: "Tokyo, Japan",
    region: "Asia / Pacific",
    sectorCode: "SECTOR-09 // NEO-GRID",
    lat: 35.6762,
    lng: 139.6503,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=85",
    clue: "Dense luminous signage, multilevel elevated crossings, and narrow vertical architecture.",
    intel: "Temperate maritime biome · Left-hand traffic · High architectural density",
    tags: ["urban", "night", "megacity"]
  },
  {
    id: "recon-par-12",
    name: "Paris, France",
    region: "Western Europe",
    sectorCode: "SECTOR-04 // HAUSSMANN",
    lat: 48.8566,
    lng: 2.3522,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=85",
    clue: "Uniform zinc mansard rooftops, limestone facades, and radiating historic avenues.",
    intel: "Oceanic European climate · Historic radial layout · Classical stonework",
    tags: ["historic", "boulevard", "monument"]
  },
  {
    id: "recon-nyc-45",
    name: "New York City, USA",
    region: "North America",
    sectorCode: "SECTOR-01 // MANHATTAN-CANYON",
    lat: 40.7128,
    lng: -74.0060,
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1800&q=85",
    clue: "Sheer skyscraper street canyons, orthogonal grid lines, and iconic yellow transit.",
    intel: "Humid continental · Rigorous orthogonal grid · Coastal estuary",
    tags: ["skyscrapers", "grid", "harbor"]
  },
  {
    id: "recon-rvk-77",
    name: "Reykjavík, Iceland",
    region: "Northern Europe / Arctic",
    sectorCode: "SECTOR-08 // BASALT-SHORE",
    lat: 64.1466,
    lng: -21.9426,
    image: "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1800&q=85",
    clue: "Low-density corrugated roofs, cold subpolar illumination, and volcanic terrain horizons.",
    intel: "Subpolar oceanic · Low-rise colorful building clusters · Volcanic backdrop",
    tags: ["nordic", "subpolar", "coastal"]
  },
  {
    id: "recon-cpt-33",
    name: "Cape Town, South Africa",
    region: "Southern Africa",
    sectorCode: "SECTOR-06 // CAPE-RIDGE",
    lat: -33.9249,
    lng: 18.4241,
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1800&q=85",
    clue: "Flat-topped sandstone plateaus descending directly into Atlantic coastline and dense suburbs.",
    intel: "Mediterranean coastal climate · Dramatic mountain backdrop · Southern hemisphere",
    tags: ["mountain", "atlantic", "harbor"]
  },
  {
    id: "recon-syd-61",
    name: "Sydney, Australia",
    region: "Oceania",
    sectorCode: "SECTOR-11 // PACIFIC-CREST",
    lat: -33.8688,
    lng: 151.2093,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d4?auto=format&fit=crop&w=1800&q=85",
    clue: "Sprawling natural harbour basin with distinctive modern waterfront architecture and warm light.",
    intel: "Humid subtropical · Southern hemisphere · Sunlit coastline",
    tags: ["harbour", "oceania", "coastal"]
  },
  {
    id: "recon-dxb-84",
    name: "Dubai, UAE",
    region: "Middle East",
    sectorCode: "SECTOR-05 // ARABIAN-SPIRE",
    lat: 25.2048,
    lng: 55.2708,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85",
    clue: "Hyper-tall glass towers emerging from arid desert coastlines with geometric highway junctions.",
    intel: "Hyper-arid desert biome · Ultra-modern architecture · Persian Gulf coast",
    tags: ["desert", "futuristic", "coastal"]
  },
  {
    id: "recon-sin-50",
    name: "Singapore",
    region: "Southeast Asia",
    sectorCode: "SECTOR-03 // EQUATORIAL-GARDEN",
    lat: 1.3521,
    lng: 103.8198,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=85",
    clue: "Lush tropical vertical vegetation integrated seamlessly into ultra-dense glass infrastructure.",
    intel: "Tropical rainforest climate · 1° North of Equator · High-tech maritime port",
    tags: ["tropical", "greenery", "skyline"]
  },
  {
    id: "recon-rio-29",
    name: "Rio de Janeiro, Brazil",
    region: "South America",
    sectorCode: "SECTOR-12 // SUGARLOAF-BAY",
    lat: -22.9068,
    lng: -43.1729,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1800&q=85",
    clue: "Steep granite monoliths framing Atlantic ocean curves and dense coastal favelas.",
    intel: "Tropical savanna · Southern hemisphere · Dramatic coastal topography",
    tags: ["coast", "monolith", "south-america"]
  },
  {
    id: "recon-rom-19",
    name: "Rome, Italy",
    region: "Southern Europe",
    sectorCode: "SECTOR-02 // TIBER-RUINS",
    lat: 41.9028,
    lng: 12.4964,
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1800&q=85",
    clue: "Antiquity stone monuments and terra cotta tiled rooftops interwoven with modern traffic.",
    intel: "Mediterranean climate · Ancient historic center · Stone paving",
    tags: ["ancient", "ruins", "mediterranean"]
  },
  {
    id: "recon-sfo-88",
    name: "San Francisco, USA",
    region: "North America",
    sectorCode: "SECTOR-10 // PACIFIC-BAY",
    lat: 37.7749,
    lng: -122.4194,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1800&q=85",
    clue: "Steep undulating hills, Victorian bay-window rows, and microclimate fog rolling over the bay.",
    intel: "Warm-summer Mediterranean · Steep terrain gradients · Coastal marine layer",
    tags: ["hills", "bay", "fog"]
  },
  {
    id: "recon-bom-55",
    name: "Mumbai, India",
    region: "South Asia",
    sectorCode: "SECTOR-07 // ARABIAN-GATEWAY",
    lat: 19.0760,
    lng: 72.8777,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1800&q=85",
    clue: "Vibrant coastal mega-metropolis blending Gothic revival heritage with dense modern towers.",
    intel: "Tropical wet and dry · Arabian Sea shoreline · High urban vitality",
    tags: ["coastal", "gothic", "density"]
  }
];
