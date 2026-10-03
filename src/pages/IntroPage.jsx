import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Crosshair,
  Flame,
  Globe2,
  HelpCircle,
  Radio,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap
} from "lucide-react";
import { PROTOCOLS } from "../data/difficulties";
import { sound } from "../services/audio";
import AudioToggle from "../components/common/AudioToggle";

export default function IntroPage({
  records,
  selectedProtocol,
  setSelectedProtocol,
  onStartGame,
  onOpenTour,
  isMuted,
  setIsMuted
}) {
  const [activeTab, setActiveTab] = useState("launch"); // 'launch' or 'records'

  const handleProtocolSelect = (key) => {
    sound.playClick();
    setSelectedProtocol(key);
  };

  const handleLaunch = () => {
    sound.playLock();
    onStartGame(selectedProtocol);
  };

  return (
    <main className="intro-screen">
      {/* Background Animated Cyber Matrix Grid */}
      <div className="cyber-grid" />
      <div className="ambient-glow" />

      {/* Top utility bar */}
      <nav className="intro-topbar">
        <div className="brand">
          <div className="brand-badge">
            <span className="brand-logo-icon">M</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">MULTIVERSE RECON</span>
            <span className="brand-sub">TACTICAL GEOLOCATION SYSTEM</span>
          </div>
        </div>

        <div className="intro-actions">
          <button
            className="ghost-btn sm-btn"
            onClick={() => {
              sound.playClick();
              onOpenTour();
            }}
          >
            <BookOpen size={14} />
            <span>Field Manual</span>
          </button>
          <AudioToggle isMuted={isMuted} setIsMuted={setIsMuted} />
        </div>
      </nav>

      <div className="intro-content-container">
        {/* Main Hero Header */}
        <section className="intro-hero-section">
          <div className="hero-eyebrow">
            <span className="live-dot" />
            <span>TVA // MULTIVERSE RECONNAISSANCE</span>
          </div>

          <h1 className="hero-title">
            RESTORE THE <span>TIMELINE</span>
          </h1>

          <p className="hero-description">
            A dimensional fissure has scattered coordinates across the timeline.
            Inspect satellite recon feeds, triangulate anomaly epicenters on the Nexus Map,
            and converge the multiverse before total collapse.
          </p>
        </section>

        {/* Protocol / Difficulty Selection Grid */}
        <section className="protocol-selection-section">
          <div className="section-label">
            <Crosshair size={14} />
            <span>SELECT RECON CLEARANCE PROTOCOL</span>
          </div>

          <div className="protocol-cards-grid">
            {Object.entries(PROTOCOLS).map(([key, item]) => {
              const isSelected = selectedProtocol === key;
              return (
                <div
                  key={key}
                  className={`protocol-card glass-panel ${isSelected ? "selected-protocol" : ""}`}
                  onClick={() => handleProtocolSelect(key)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="card-top">
                    <span className="protocol-code">{item.code}</span>
                    <span className="protocol-multiplier">x{item.multiplier} MULTIPLIER</span>
                  </div>

                  <h3 className="protocol-name">{item.label}</h3>
                  <p className="protocol-desc">{item.description}</p>

                  <div className="protocol-specs">
                    <div className="spec-item">
                      <Clock size={13} />
                      <span>{item.seconds}s Per Round</span>
                    </div>
                    <div className="spec-item">
                      <Compass size={13} />
                      <span>{item.allowHints ? "Regional Hints Enabled" : "Classified / No Hints"}</span>
                    </div>
                  </div>

                  <div className="select-indicator">
                    {isSelected ? (
                      <span className="indicator-active">
                        <CheckCircle2 size={15} /> ACTIVE PROTOCOL
                      </span>
                    ) : (
                      <span className="indicator-inactive">SELECT</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Career Records Bar (if games played) */}
        {records.missionsCompleted > 0 && (
          <section className="career-records-bar glass-panel">
            <div className="record-stat">
              <span className="record-label">CAREER HIGH SCORE</span>
              <strong className="record-value">{records.highScore.toLocaleString()} PTS</strong>
            </div>
            <div className="record-divider" />
            <div className="record-stat">
              <span className="record-label">BEST ACCURACY</span>
              <strong className="record-value">{records.bestAccuracy}%</strong>
            </div>
            <div className="record-divider" />
            <div className="record-stat">
              <span className="record-label">MISSIONS LOGGED</span>
              <strong className="record-value">{records.missionsCompleted} STABILIZATIONS</strong>
            </div>
          </section>
        )}

        {/* Launch Mission CTA */}
        <div className="intro-cta-wrapper">
          <button className="primary-btn launch-btn glow-btn" onClick={handleLaunch}>
            <span>ENGAGE TIMELINE RECON</span>
            <ArrowRight size={20} />
          </button>
          <span className="cta-footnote">
            5 ANOMALIES · NO REGISTRATION · 100% CLIENT-SIDE ENCRYPTED
          </span>
        </div>
      </div>
    </main>
  );
}
