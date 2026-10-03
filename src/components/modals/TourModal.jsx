import React, { useEffect } from "react";
import {
  ArrowRight,
  Compass,
  Crosshair,
  Gauge,
  Radio,
  ShieldCheck,
  Target,
  Timer,
  Zap
} from "lucide-react";
import { sound } from "../../services/audio";

export default function TourModal({ onFinish }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        sound.playClick();
        onFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onFinish]);

  return (
    <div className="modal-backdrop tour-backdrop">
      <div className="tour-card glass-panel animate-pop-in">
        <div className="tour-header">
          <div className="tour-eyebrow">
            <span className="live-dot" />
            <span>OPERATIONAL BRIEFING // FIELD MANUAL 01</span>
          </div>
          <h2 className="tour-title">Welcome to Multiverse Recon</h2>
          <p className="tour-subtitle">
            Anomalies have destabilized Earth timelines across the multiverse.
            Your mission is to pinpoint geographical epicenters using satellite imagery.
          </p>
        </div>

        <div className="tour-steps-grid">
          <div className="tour-step">
            <div className="step-icon-wrap">
              <Target size={22} />
            </div>
            <div className="step-content">
              <span className="step-num">01</span>
              <h3>Optical Analysis</h3>
              <p>Analyze the visual feed. Inspect architecture, biomes, road signs, and sun angles.</p>
            </div>
          </div>

          <div className="tour-step">
            <div className="step-icon-wrap">
              <Compass size={22} />
            </div>
            <div className="step-content">
              <span className="step-num">02</span>
              <h3>Target Lock</h3>
              <p>Click on the Nexus Map to deploy your coordinate pin. Click again to adjust position.</p>
            </div>
          </div>

          <div className="tour-step">
            <div className="step-icon-wrap">
              <Zap size={22} />
            </div>
            <div className="step-content">
              <span className="step-num">03</span>
              <h3>Convergence Points</h3>
              <p>Score up to 1,000+ points per anomaly based on proximity, speed, and consecutive streaks.</p>
            </div>
          </div>
        </div>

        <div className="tour-footer">
          <span className="tour-footnote">Press ENTER or click to proceed</span>
          <div className="tour-btn-group">
            <button
              className="ghost-btn"
              onClick={() => {
                sound.playClick();
                onFinish();
              }}
            >
              Dismiss
            </button>
            <button
              className="primary-btn glow-btn"
              onClick={() => {
                sound.playLock();
                onFinish();
              }}
            >
              <span>Initialize System</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
