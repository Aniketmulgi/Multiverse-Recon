/**
 * Recon Difficulty Protocols
 * Defines the parameters for timer, maximum scoring radius,
 * hint clearances, and score multipliers.
 */

export const PROTOCOLS = {
  cadet: {
    id: "cadet",
    label: "Cadet",
    code: "PROTO-LVL-1",
    badge: "STANDARD CLEARANCE",
    description: "Extended recon window with environmental intel and sector regional hints.",
    seconds: 75,
    maxDistance: 6000,
    maxPoints: 1000,
    multiplier: 1.0,
    allowHints: true,
    showIntel: true
  },
  operative: {
    id: "operative",
    label: "Operative",
    code: "PROTO-LVL-2",
    badge: "TACTICAL CLEARANCE",
    description: "Standard tactical timer. Visual clue only, no environmental telemetry.",
    seconds: 45,
    maxDistance: 5000,
    maxPoints: 1000,
    multiplier: 1.15,
    allowHints: false,
    showIntel: false
  },
  spectre: {
    id: "spectre",
    label: "Spectre",
    code: "PROTO-LVL-3",
    badge: "BLACK-OPS CLEARANCE",
    description: "Ultra-fast blitz timer. Filtered anomaly feeds and highest score multipliers.",
    seconds: 25,
    maxDistance: 4000,
    maxPoints: 1000,
    multiplier: 1.35,
    allowHints: false,
    showIntel: false
  }
};
