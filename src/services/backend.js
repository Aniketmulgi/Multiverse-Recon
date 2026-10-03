/**
 * Simulated Recon Headquarters Mission Service (Backend Service Layer)
 * 
 * Provides secure handling of anomaly missions.
 * During active recon, solution parameters (real city names, exact coordinates)
 * are protected to ensure the client-side game cannot leak answers via inspector or state leaks.
 */

import { ANOMALIES } from "../data/locations";
import { PROTOCOLS } from "../data/difficulties";
import {
  calculateAccuracy,
  calculateBearing,
  calculateScore,
  getGrade,
  haversineDistance
} from "./geo";

// Internal registry of loaded anomaly data
const anomalyRegistry = new Map(ANOMALIES.map((loc) => [loc.id, loc]));

/**
 * Generates a new 5-round recon mission batch.
 * @param {number} count Number of anomaly rounds
 * @returns {Array} Array of sanitized anomaly round payloads
 */
export function createMissionSession(count = 5) {
  const pool = [...ANOMALIES];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected = pool.slice(0, count);

  return selected.map((loc, index) => ({
    roundIndex: index,
    missionId: loc.id,
    sectorCode: loc.sectorCode,
    image: loc.image,
    clue: loc.clue,
    intel: loc.intel,
    tags: loc.tags,
    // Note: 'name', 'lat', 'lng' are intentionally resolved via verifyRound to prevent leaks
    regionHint: loc.region
  }));
}

/**
 * Validates player guess coordinates against true anomaly target.
 */
export function verifyRoundConvergence({
  missionId,
  roundIndex,
  guess,
  timeLeft,
  streak,
  protocolKey = "operative"
}) {
  const target = anomalyRegistry.get(missionId);
  const protocol = PROTOCOLS[protocolKey] || PROTOCOLS.operative;

  if (!target) {
    throw new Error(`Invalid anomaly sequence identifier: ${missionId}`);
  }

  // If guess is null (e.g. timeout miss), default to 0,0 miss
  const effectiveGuess = guess || { lat: 0, lng: 0, isTimeout: true };
  const distance = haversineDistance(
    target.lat,
    target.lng,
    effectiveGuess.lat,
    effectiveGuess.lng
  );

  const isTimeout = !!effectiveGuess.isTimeout;
  const score = isTimeout ? 0 : calculateScore(distance, protocol, timeLeft, streak);
  const accuracy = isTimeout ? 0 : calculateAccuracy(distance, protocol.maxDistance);
  const isBullseye = distance < 350;
  const nextStreak = isBullseye ? streak + 1 : 0;
  const bearing = calculateBearing(effectiveGuess.lat, effectiveGuess.lng, target.lat, target.lng);
  const grade = getGrade(accuracy);

  return {
    round: roundIndex + 1,
    missionId,
    guess: effectiveGuess,
    trueLocation: {
      name: target.name,
      region: target.region,
      sectorCode: target.sectorCode,
      lat: target.lat,
      lng: target.lng,
      image: target.image
    },
    distance,
    bearing,
    score,
    accuracy,
    grade,
    streak: nextStreak,
    isBullseye,
    maxDistance: protocol.maxDistance
  };
}
