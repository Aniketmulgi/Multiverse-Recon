/**
 * Local Storage Persistence Manager
 * Tracks agent records, career stats, and user preferences.
 */

const STORAGE_KEY = "multiverse_recon_records_v2";

const DEFAULT_RECORDS = {
  highScore: 0,
  missionsCompleted: 0,
  bestAccuracy: 0,
  soundMuted: false,
  history: []
};

export function getStoredRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_RECORDS };
    return { ...DEFAULT_RECORDS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_RECORDS };
  }
}

export function saveMissionRecord({ totalScore, averageDistance, accuracy, difficulty, rounds }) {
  try {
    const records = getStoredRecords();
    const isNewHighScore = totalScore > records.highScore;
    const newBestAccuracy = Math.max(records.bestAccuracy, accuracy);

    const updated = {
      ...records,
      highScore: Math.max(records.highScore, totalScore),
      bestAccuracy: newBestAccuracy,
      missionsCompleted: records.missionsCompleted + 1,
      history: [
        {
          id: `REC-${Date.now().toString(36).toUpperCase()}`,
          date: new Date().toISOString(),
          score: totalScore,
          averageDistance,
          accuracy,
          difficulty
        },
        ...records.history.slice(0, 9) // Keep last 10
      ]
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { updated, isNewHighScore };
  } catch {
    return { updated: DEFAULT_RECORDS, isNewHighScore: false };
  }
}

export function saveSoundPreference(isMuted) {
  try {
    const records = getStoredRecords();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...records, soundMuted: isMuted }));
  } catch {
    // Ignore
  }
}
