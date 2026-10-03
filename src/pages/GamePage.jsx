import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Clock,
  Compass,
  Crosshair,
  Flame,
  Globe2,
  MapPin,
  RotateCcw,
  Sparkles,
  Timer,
  Zap
} from "lucide-react";
import TopBar from "../components/common/TopBar";
import ProgressBar from "../components/common/ProgressBar";
import ImageViewer from "../components/game/ImageViewer";
import GuessMap from "../components/game/GuessMap";
import ClueBar from "../components/game/ClueBar";
import ResultOverlay from "../components/modals/ResultOverlay";
import { PROTOCOLS } from "../data/difficulties";
import { sound } from "../services/audio";
import { verifyRoundConvergence } from "../services/backend";

const TOTAL_ROUNDS = 5;

export default function GamePage({
  missions,
  protocolKey,
  onFinishMission,
  onAbortMission,
  isMuted,
  setIsMuted
}) {
  const protocol = PROTOCOLS[protocolKey] || PROTOCOLS.operative;

  // Active round state
  const [roundIndex, setRoundIndex] = useState(0);
  const [guess, setGuess] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(protocol.seconds);
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [roundResults, setRoundResults] = useState([]);
  const [activeResult, setActiveResult] = useState(null);

  const currentMission = missions[roundIndex];
  const timerRef = useRef(null);

  // Sound warning for low time
  useEffect(() => {
    if (!activeResult && secondsLeft <= 5 && secondsLeft > 0) {
      sound.playWarning();
    }
  }, [secondsLeft, activeResult]);

  // Round Timer Tick
  useEffect(() => {
    if (activeResult) return;

    if (secondsLeft <= 0) {
      // Automatic timeout convergence
      handleTimeOut();
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [secondsLeft, activeResult]);

  // Handle timeout submission
  const handleTimeOut = () => {
    if (activeResult || !currentMission) return;

    // Use current guess or fallback to timeout 0,0
    const evaluated = verifyRoundConvergence({
      missionId: currentMission.missionId,
      roundIndex,
      guess: guess || null,
      timeLeft: 0,
      streak: 0,
      protocolKey
    });

    setTotalScore((prev) => prev + evaluated.score);
    setStreak(evaluated.streak);
    setRoundResults((prev) => [...prev, evaluated]);
    setActiveResult(evaluated);
  };

  // Player manual guess submission
  const handleSubmitGuess = () => {
    if (!guess || activeResult || !currentMission) return;

    sound.playLock();

    const evaluated = verifyRoundConvergence({
      missionId: currentMission.missionId,
      roundIndex,
      guess,
      timeLeft: secondsLeft,
      streak,
      protocolKey
    });

    setTotalScore((prev) => prev + evaluated.score);
    setStreak(evaluated.streak);
    setRoundResults((prev) => [...prev, evaluated]);
    setActiveResult(evaluated);
  };

  // Advance to next anomaly or complete game
  const handleNextRound = () => {
    if (roundIndex === TOTAL_ROUNDS - 1) {
      // Mission Complete -> Send results to parent
      onFinishMission({
        rounds: roundResults,
        totalScore,
        protocolKey
      });
      return;
    }

    setRoundIndex((prev) => prev + 1);
    setGuess(null);
    setActiveResult(null);
    setSecondsLeft(protocol.seconds);
  };

  // Progress Calculation (0 to 100%)
  const progressPercent = useMemo(() => {
    const completed = roundIndex + (activeResult ? 1 : 0);
    return (completed / TOTAL_ROUNDS) * 100;
  }, [roundIndex, activeResult]);

  if (!currentMission) return null;

  return (
    <div className="game-shell">
      {/* Tactical HUD Header */}
      <TopBar
        roundNumber={roundIndex + 1}
        totalRounds={TOTAL_ROUNDS}
        score={totalScore}
        streak={streak}
        protocolLabel={protocol.label}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onAbort={onAbortMission}
      />

      {/* Progress energy bar */}
      <ProgressBar progress={progressPercent} />

      {/* Main Recon Battlefield Grid */}
      <main className="game-main-grid">
        {/* Left Column: Visual Recon & Clues */}
        <section className="recon-column">
          <div className="recon-column-header">
            <div className="anomaly-headline">
              <div className="recon-badge">
                <span className="live-dot" />
                <span>ANOMALY #{roundIndex + 1} OF {TOTAL_ROUNDS}</span>
              </div>
              <h1 className="recon-title">TRIANGULATE SECTOR</h1>
            </div>

            {/* Countdown timer */}
            <div className={`recon-timer ${secondsLeft <= 10 ? "timer-danger" : ""}`}>
              <Timer size={18} className="timer-icon" />
              <span className="timer-digits">
                {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:
                {String(secondsLeft % 60).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* High-res Anomaly Optical Feed */}
          <ImageViewer
            imageSrc={currentMission.image}
            sectorCode={currentMission.sectorCode}
            clue={currentMission.clue}
            intel={currentMission.intel}
            tags={currentMission.tags}
            protocol={protocol}
            roundNumber={roundIndex + 1}
          />

          {/* Tactical Clue Bar */}
          <ClueBar
            clue={currentMission.clue}
            intel={currentMission.intel}
            regionHint={currentMission.regionHint}
            protocol={protocol}
          />
        </section>

        {/* Right Column: Interactive Nexus Map & Lock Controls */}
        <aside className="map-column glass-panel">
          <div className="map-column-header">
            <div>
              <div className="map-eyebrow">
                <Compass size={13} />
                <span>NEXUS COORDINATE GRID</span>
              </div>
              <h2 className="map-heading">Deploy Marker</h2>
            </div>
            <div className="map-status-chip">
              <span className="live-dot" />
              <span>{guess ? "TARGET SELECTED" : "STANDBY"}</span>
            </div>
          </div>

          {/* Leaflet Map Area */}
          <div className="interactive-map-frame">
            <GuessMap
              guess={guess}
              onGuess={setGuess}
              disabled={!!activeResult}
              result={activeResult}
            />

            {!guess && !activeResult && (
              <div className="map-instruction-overlay animate-pulse">
                <Crosshair size={16} />
                <span>CLICK ANYWHERE ON MAP TO DEPLOY PIN</span>
              </div>
            )}
          </div>

          {/* Live Coordinate Readout */}
          <div className="coordinates-telemetry-bar">
            <div className="telemetry-item">
              <span className="telemetry-label">LATITUDE</span>
              <strong className="telemetry-value">
                {guess ? `${guess.lat > 0 ? "+" : ""}${guess.lat.toFixed(4)}°` : "---.----"}
              </strong>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">LONGITUDE</span>
              <strong className="telemetry-value">
                {guess ? `${guess.lng > 0 ? "+" : ""}${guess.lng.toFixed(4)}°` : "---.----"}
              </strong>
            </div>
          </div>

          {/* Lock Target Button */}
          <div className="map-submit-section">
            <button
              className={`primary-btn submit-lock-btn ${guess && !activeResult ? "glow-btn" : ""}`}
              disabled={!guess || !!activeResult}
              onClick={handleSubmitGuess}
            >
              <Crosshair size={18} />
              <span>{activeResult ? "CONVERGENCE VERIFIED" : "LOCK & STABILIZE COORDINATES"}</span>
            </button>
          </div>

          {/* Footer stats */}
          <div className="map-column-footer">
            <span className="legend-item">
              <span className="legend-pin-dot" /> Your Marker
            </span>
            <span className="radius-limit">Max Radius: {protocol.maxDistance.toLocaleString()} km</span>
          </div>
        </aside>
      </main>

      {/* Result Modal Overlay */}
      {activeResult && (
        <ResultOverlay
          result={activeResult}
          isLastRound={roundIndex === TOTAL_ROUNDS - 1}
          onNext={handleNextRound}
        />
      )}
    </div>
  );
}
