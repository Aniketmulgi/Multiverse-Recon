import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "../../services/audio";
import { saveSoundPreference } from "../../services/storage";

export default function AudioToggle({ isMuted, setIsMuted }) {
  const toggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    saveSoundPreference(next);
    if (!next) sound.playClick();
  };

  return (
    <button
      className={`icon-btn audio-btn ${isMuted ? "muted" : "active"}`}
      onClick={toggle}
      title={isMuted ? "Unmute Tactical SFX" : "Mute SFX"}
      aria-label="Toggle Sound Effects"
    >
      {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
      <span className="audio-label">{isMuted ? "SFX OFF" : "SFX ON"}</span>
    </button>
  );
}
