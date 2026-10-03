import React, { useEffect } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Crosshair,
  Flame,
  Globe2,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap
} from "lucide-react";
import { formatDistance, getGrade } from "../services/geo";
import { PROTOCOLS } from "../data/difficulties";
import { sound } from "../services/audio";

export default function ResultsPage({
  rounds,
  totalScore,
  protocolKey,
  isNewHighScore,
  onPlayAgain,
  onReturnToHQ
}) {
  const protocol = PROTOCOLS[protocolKey] || PROTOCOLS.operative;

  // Calculate statistics
  const totalRounds = rounds.length;
  const avgDistance = totalRounds
    ? rounds.reduce((sum, r) => sum + r.distance, 0) / totalRounds
    : 0;

  const avgAccuracy = totalRounds
    ? parseFloat(
        (rounds.reduce((sum, r) => sum + r.accuracy, 0) / totalRounds).toFixed(1)
      )
    : 0;

  const overallGrade = getGrade(avgAccuracy);

  useEffect(() => {
    sound.playSuccess(0.95);
  }, []);

  return (
    <main className="results-screen">
      <div className="cyber-grid" />
      <div className="ambient-glow" />

      <div className="results-wrapper">
        {/* Header Section */}
        <header className="results-header">
          <div className="results-eyebrow">
            <ShieldCheck size={16} />
            <span>MISSION DEBRIEFING // TIMELINE STABILIZED</span>
          </div>

          <h1 className="results-title">
            RECON <span>REPORT</span>
          </h1>

          <p className="results-subtitle">
            All five anomalies successfully triangulated. The multiverse timeline has converged.
          </p>
        </header>

        {/* Hero Score Showcase */}
        <div className="results-hero-card glass-panel">
          <div className="hero-score-info">
            <span className="hero-score-eyebrow">FINAL CONVERGENCE SCORE</span>
            <div className="hero-score-number">
              <strong>{totalScore.toLocaleString()}</strong>
              <span className="pts-suffix">PTS</span>
            </div>
            <div className="hero-score-meta">
              <span>{protocol.label} Protocol (x{protocol.multiplier} Multiplier)</span>
              {isNewHighScore && (
                <span className="high-score-tag">
                  <Sparkles size={13} /> NEW HIGH SCORE RECORD!
                </span>
              )}
            </div>
          </div>

          <div className="hero-rank-badge" style={{ borderColor: overallGrade.color }}>
            <span className="rank-letter" style={{ color: overallGrade.color }}>
              {overallGrade.label}
            </span>
            <div className="rank-info">
              <small>CLEARANCE RANK</small>
              <strong style={{ color: overallGrade.color }}>{overallGrade.rank}</strong>
            </div>
          </div>
        </div>

        {/* Aggregate KPI Grid */}
        <div className="results-kpi-grid">
          <div className="kpi-card glass-panel">
            <span className="kpi-label">AVERAGE ACCURACY</span>
            <strong className="kpi-val">{avgAccuracy}%</strong>
          </div>

          <div className="kpi-card glass-panel">
            <span className="kpi-label">AVERAGE DISTANCE ERROR</span>
            <strong className="kpi-val">{formatDistance(avgDistance)}</strong>
          </div>

          <div className="kpi-card glass-panel">
            <span className="kpi-label">MAX STREAK</span>
            <strong className="kpi-val">
              x{Math.max(0, ...rounds.map((r) => r.streak || 0))}
            </strong>
          </div>
        </div>

        {/* Detailed Anomaly Breakdown Table */}
        <section className="round-breakdown-section glass-panel">
          <div className="breakdown-header">
            <Crosshair size={16} />
            <span>ANOMALY TELEMETRY BREAKDOWN</span>
          </div>

          <div className="round-table">
            {rounds.map((round) => (
              <div key={round.round} className="round-table-row">
                <div className="row-number">
                  <span>0{round.round}</span>
                </div>

                <div className="row-location">
                  <img
                    src={round.trueLocation.image}
                    alt="Verified Anomaly"
                    className="row-thumb"
                  />
                  <div className="row-loc-text">
                    <strong className="loc-name">{round.trueLocation.name}</strong>
                    <span className="loc-region">{round.trueLocation.region}</span>
                  </div>
                </div>

                <div className="row-telemetry">
                  <span className="telemetry-label">ERROR OFFSET</span>
                  <b className="telemetry-val">
                    {formatDistance(round.distance)} {round.bearing ? `(${round.bearing})` : ""}
                  </b>
                </div>

                <div className="row-accuracy">
                  <span className="telemetry-label">ACCURACY</span>
                  <b className="telemetry-val">{round.accuracy}%</b>
                </div>

                <div className="row-score">
                  <span className="telemetry-label">SCORE</span>
                  <b className="telemetry-score">+{round.score.toLocaleString()}</b>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Results Action Buttons */}
        <footer className="results-action-footer">
          <button
            className="ghost-btn"
            onClick={() => {
              sound.playClick();
              onReturnToHQ();
            }}
          >
            Return to Headquarters
          </button>

          <button
            className="primary-btn glow-btn"
            onClick={() => {
              sound.playLock();
              onPlayAgain(protocolKey);
            }}
          >
            <RotateCcw size={17} />
            <span>Launch Another Recon</span>
          </button>
        </footer>
      </div>
    </main>
  );
}
