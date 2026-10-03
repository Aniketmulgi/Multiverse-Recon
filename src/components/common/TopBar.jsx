import React from "react";
import { Crosshair, Flame, Globe2, Sparkles, Trophy, Zap } from "lucide-react";
import AudioToggle from "./AudioToggle";
import { sound } from "../../services/audio";

export default function TopBar({
  roundNumber,
  totalRounds,
  score,
  streak,
  protocolLabel,
  isMuted,
  setIsMuted,
  onAbort
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="brand" onClick={onAbort} role="button" tabIndex={0} title="Multiverse Recon Mission Control">
          <div className="brand-badge">
            <span className="brand-logo-icon">M</span>
            <div className="brand-pulse" />
          </div>
          <div className="brand-text">
            <span className="brand-title">MULTIVERSE RECON</span>
            <span className="brand-sub">TACTICAL TIMELINE SURVEILLANCE</span>
          </div>
        </div>

        <div className="protocol-badge">
          <span className="live-dot" />
          <span>{protocolLabel} PROTOCOL</span>
        </div>
      </div>

      <div className="topbar-stats">
        <div className="hud-stat round-stat">
          <div className="hud-stat-icon">
            <Globe2 size={15} />
          </div>
          <div className="hud-stat-info">
            <span className="hud-stat-label">TIMELINE</span>
            <strong className="hud-stat-val">
              {roundNumber} <small>/ {totalRounds}</small>
            </strong>
          </div>
        </div>

        <div className="hud-stat score-stat">
          <div className="hud-stat-icon">
            <Zap size={15} />
          </div>
          <div className="hud-stat-info">
            <span className="hud-stat-label">CONVERGENCE</span>
            <strong className="hud-stat-val accent-val">
              {score.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className={`hud-stat streak-stat ${streak > 1 ? "active-streak" : ""}`}>
          <div className="hud-stat-icon">
            <Flame size={15} />
          </div>
          <div className="hud-stat-info">
            <span className="hud-stat-label">STREAK</span>
            <strong className="hud-stat-val">
              x{streak}
            </strong>
          </div>
        </div>

        <div className="topbar-actions">
          <AudioToggle isMuted={isMuted} setIsMuted={setIsMuted} />
          {onAbort && (
            <button
              className="ghost-btn abort-btn"
              onClick={() => {
                sound.playClick();
                if (window.confirm("Abort current recon mission and return to headquarters?")) {
                  onAbort();
                }
              }}
              title="Abort Recon Mission"
            >
              Abort
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
