/**
 * Multiverse Recon Geodesic & Telemetry Engine
 * Provides precise Haversine distance, initial bearing,
 * scoring curves, and accuracy rating calculations.
 */

const toRadians = (deg) => (deg * Math.PI) / 180;
const toDegrees = (rad) => (rad * 180) / Math.PI;

/**
 * Calculates Great-Circle distance between two coordinates using the Haversine formula.
 * @param {number} lat1 Latitude of point 1
 * @param {number} lon1 Longitude of point 1
 * @param {number} lat2 Latitude of point 2
 * @param {number} lon2 Longitude of point 2
 * @returns {number} Distance in kilometers
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371.0088;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

/**
 * Calculates initial compass bearing from start point to destination point.
 * @returns {string} Direction string (e.g., "NE", "SSW", etc.)
 */
export function calculateBearing(lat1, lon1, lat2, lon2) {
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δλ = toRadians(lon2 - lon1);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);
  const brng = (toDegrees(θ) + 360) % 360;

  const sectors = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(brng / 22.5) % 16;
  return sectors[index];
}

/**
 * Computes convergence score considering proximity, remaining time, streak, and protocol multiplier.
 */
export function calculateScore(distanceKm, protocol, timeLeft, streak = 0) {
  const { maxDistance, maxPoints, multiplier, seconds } = protocol;

  if (distanceKm >= maxDistance) return 0;

  // Exponential decay curve prioritizing high precision pinpoints
  const proximityRatio = Math.max(0, 1 - distanceKm / maxDistance);
  const distanceFactor = Math.pow(proximityRatio, 0.6);

  // Time efficiency bonus (up to 15% boost for fast identification)
  const timeBonus = 0.85 + 0.15 * Math.max(0, Math.min(1, timeLeft / seconds));

  // Precision streak multiplier (+5% per consecutive bullseye, capped at +25%)
  const streakBonus = 1 + Math.min(streak, 5) * 0.05;

  const rawScore = maxPoints * distanceFactor * timeBonus * streakBonus * multiplier;
  return Math.min(Math.round(maxPoints * multiplier * 1.15), Math.max(0, Math.round(rawScore)));
}

/**
 * Derives accuracy percentage (0-100%) from distance and radius.
 */
export function calculateAccuracy(distanceKm, maxDistance) {
  if (distanceKm >= maxDistance) return 0;
  const raw = ((1 - distanceKm / maxDistance) * 100);
  return Math.max(0, Math.min(100, parseFloat(raw.toFixed(1))));
}

/**
 * Maps accuracy percentage to tactical clearance grade.
 */
export function getGrade(accuracy) {
  if (accuracy >= 95) return { label: "S", rank: "TIMELINE ARCHITECT", color: "#63e6ff" };
  if (accuracy >= 85) return { label: "A", rank: "MASTER RECON", color: "#38ef7d" };
  if (accuracy >= 70) return { label: "B", rank: "TACTICAL SPECIALIST", color: "#ffd166" };
  if (accuracy >= 50) return { label: "C", rank: "FIELD OPERATIVE", color: "#ff9f43" };
  return { label: "D", rank: "INITIATE", color: "#ff4d6d" };
}

/**
 * Formats distance into human-readable metric telemetry.
 */
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(2)} km`;
  return `${Math.round(km).toLocaleString()} km`;
}
