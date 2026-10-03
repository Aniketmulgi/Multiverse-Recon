import React, { useState } from "react";
import { ChevronDown, ChevronUp, Compass, HelpCircle, KeyRound, Sparkles } from "lucide-react";
import { sound } from "../../services/audio";

export default function ClueBar({ clue, intel, regionHint, protocol }) {
  const [showRegionalIntel, setShowRegionalIntel] = useState(false);

  const toggleRegional = () => {
    sound.playClick();
    setShowRegionalIntel((prev) => !prev);
  };

  return (
    <div className="clue-card">
      <div className="clue-card-main">
        <div className="clue-icon-wrap">
          <HelpCircle size={18} className="clue-icon" />
        </div>
        <div className="clue-text-block">
          <span className="clue-eyebrow">TACTICAL FIELD CLUE</span>
          <p className="clue-copy">
            {clue || "Visual reconnaissance required. No telemetry field notes available for this anomaly."}
          </p>
        </div>
      </div>

      {protocol.allowHints && regionHint && (
        <div className="clue-secondary-action">
          <button
            className={`secondary-hint-btn ${showRegionalIntel ? "active" : ""}`}
            onClick={toggleRegional}
          >
            <Compass size={14} />
            <span>{showRegionalIntel ? `REGION: ${regionHint.toUpperCase()}` : "DECRYPT REGION HINT"}</span>
            {showRegionalIntel ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      )}
    </div>
  );
}
