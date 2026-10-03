import React, { useEffect, useState } from "react";
import IntroPage from "./pages/IntroPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import TourModal from "./components/modals/TourModal";
import { createMissionSession } from "./services/backend";
import { getStoredRecords, saveMissionRecord } from "./services/storage";
import { sound } from "./services/audio";

const TOTAL_ROUNDS = 5;

/**
 * Multiverse Recon Main Application Controller
 * Manages screen routing, game state initialization, persistence, and audio preferences.
 */
export default function App() {
  const [screen, setScreen] = useState("intro"); // "intro" | "game" | "results"
  const [protocolKey, setProtocolKey] = useState("operative");
  const [activeMissions, setActiveMissions] = useState([]);
  const [lastMissionResults, setLastMissionResults] = useState(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [showTour, setShowTour] = useState(false);

  // Persistence and audio settings
  const [records, setRecords] = useState(getStoredRecords);
  const [isMuted, setIsMuted] = useState(() => getStoredRecords().soundMuted || false);

  useEffect(() => {
    sound.setMuted(isMuted);
  }, [isMuted]);

  // Launch a new recon mission
  const handleStartMission = (mode = protocolKey) => {
    const sessionMissions = createMissionSession(TOTAL_ROUNDS);
    setProtocolKey(mode);
    setActiveMissions(sessionMissions);
    setScreen("game");
  };

  // Complete a recon mission and persist records
  const handleFinishMission = ({ rounds, totalScore, protocolKey: finalProtocol }) => {
    const totalRounds = rounds.length;
    const avgDistance = totalRounds
      ? rounds.reduce((sum, r) => sum + r.distance, 0) / totalRounds
      : 0;
    const avgAccuracy = totalRounds
      ? parseFloat(
          (rounds.reduce((sum, r) => sum + r.accuracy, 0) / totalRounds).toFixed(1)
        )
      : 0;

    const { updated, isNewHighScore: newRecord } = saveMissionRecord({
      totalScore,
      averageDistance: avgDistance,
      accuracy: avgAccuracy,
      difficulty: finalProtocol,
      rounds
    });

    setRecords(updated);
    setIsNewHighScore(newRecord);
    setLastMissionResults({
      rounds,
      totalScore,
      protocolKey: finalProtocol
    });
    setScreen("results");
  };

  // Abort back to intro
  const handleAbortMission = () => {
    setScreen("intro");
    setActiveMissions([]);
  };

  return (
    <div className="multiverse-app-root">
      {screen === "intro" && (
        <IntroPage
          records={records}
          selectedProtocol={protocolKey}
          setSelectedProtocol={setProtocolKey}
          onStartGame={handleStartMission}
          onOpenTour={() => setShowTour(true)}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      )}

      {screen === "game" && (
        <GamePage
          missions={activeMissions}
          protocolKey={protocolKey}
          onFinishMission={handleFinishMission}
          onAbortMission={handleAbortMission}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      )}

      {screen === "results" && lastMissionResults && (
        <ResultsPage
          rounds={lastMissionResults.rounds}
          totalScore={lastMissionResults.totalScore}
          protocolKey={lastMissionResults.protocolKey}
          isNewHighScore={isNewHighScore}
          onPlayAgain={handleStartMission}
          onReturnToHQ={() => setScreen("intro")}
        />
      )}

      {/* Field Manual Tour Modal */}
      {showTour && <TourModal onFinish={() => setShowTour(false)} />}
    </div>
  );
}