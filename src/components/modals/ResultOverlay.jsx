import React, { useEffect } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Crosshair,
  Flame,
  MapPin,
  Sparkles,
  Zap
} from "lucide-react";
import { formatDistance } from "../../services/geo";
import { sound } from "../../services/audio";

export default function ResultOverlay({ result, isLastRound, onNext }) {
  useEffect(() => {
    if (result) {
      sound.playSuccess(result.accuracy / 100);
    }
  }, [result]);

  if (!result) return null;

  const {
    score,
    distance,
    bearing,
    accuracy,
    grade,
    streak,
    isBullseye,
    trueLocation
  } = result;

  return (
    <div className="result-overlay-card animate-slide-up">
      {/* Top Banner */}
      <div className="result-banner">
        <div className="result-status-pill">
          <span className="live-dot green-dot" />
          <span>CONVERGENCE VERIFIED</span>
        </div>
        <div className="result-grade-badge" style={{ borderColor: grade.color, color: grade.color }}>
          <span>GRADE {grade.label}</span>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="result-hero-row">
        <div className="result-score-block">
          <span className="score-label">EARNED CONVERGENCE</span>
          <div className="score-value">
            +{score.toLocaleString()} <small>PTS</small>
          </div>
        </div>

        <div className="result-location-block">
          <span className="target-eyebrow">
            <MapPin size={12} /> {trueLocation.region}
          </span>
          <h3 className="target-city">{trueLocation.name}</h3>
          <p className="target-telemetry">
            <b>{formatDistance(distance)}</b> {bearing ? `toward ${bearing}` : "from epicenter"}
          </p>
        </div>
      </div>

      {/* Metrics Cluster */}
      <div className="result-metrics-grid">
        <div className="metric-box">
          <span className="metric-label">ACCURACY</span>
          <strong className="metric-value">{accuracy}%</strong>
        </div>

        <div className="metric-box">
          <span className="metric-label">STATUS</span>
          <strong className="metric-value status-text" style={{ color: isBullseye ? "#38ef7d" : "#edf4ff" }}>
            {isBullseye ? "BULLSEYE" : distance < 1500 ? "PROXIMATE" : "OFF-SECTOR"}
          </strong>
        </div>

        <div className="metric-box">
          <span className="metric-label">STREAK</span>
          <strong className="metric-value">
            {streak > 0 ? (
              <span className="streak-highlight">
                <Flame size={14} /> x{streak}
              </span>
            ) : (
              "—"
            )}
          </strong>
        </div>
      </div>

      {/* Action Footer */}
      <div className="result-action-bar">
        <button
          className="primary-btn glow-btn next-round-btn"
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          autoFocus
        >
          <span>{isLastRound ? "View Timeline Stabilization Report" : "Engage Next Anomaly"}</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
