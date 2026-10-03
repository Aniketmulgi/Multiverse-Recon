import React, { useState } from "react";
import { Crosshair, Eye, Info, Layers, Maximize2, ShieldAlert, Sparkles } from "lucide-react";
import ImageZoomModal from "./ImageZoomModal";
import { sound } from "../../services/audio";

/**
 * Anomaly Optical Feed Viewer
 * Displays sanitized satellite/optical imagery with HUD overlays.
 * Completely isolates all sensitive location metadata to prevent spoilers.
 */
export default function ImageViewer({
  imageSrc,
  sectorCode,
  clue,
  intel,
  tags = [],
  protocol,
  roundNumber
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [revealedHint, setRevealedHint] = useState(false);

  const handleZoom = () => {
    sound.playClick();
    setIsZoomed(true);
  };

  const toggleHint = () => {
    sound.playClick();
    setRevealedHint((prev) => !prev);
  };

  const isHardMode = protocol.id === "spectre";

  return (
    <section className={`viewer-container ${isHardMode ? "spectre-filter" : ""}`}>
      {/* Optical image frame */}
      <div className="viewer-frame">
        <img
          src={imageSrc}
          alt="Encrypted Tactical Reconnaissance Feed"
          className="anomaly-image"
          loading="eager"
        />

        {/* HUD grid, scanline & vignette */}
        <div className="hud-overlay" />
        <div className="scanline" />
        <div className="corner-bracket tl" />
        <div className="corner-bracket tr" />
        <div className="corner-bracket bl" />
        <div className="corner-bracket br" />

        {/* Top HUD Bar */}
        <div className="viewer-hud-top">
          <div className="hud-tag live-feed-tag">
            <span className="live-dot" />
            <span>LIVE ANOMALY FEED // FEED-0{roundNumber}</span>
          </div>

          <div className="hud-top-right">
            <span className="sector-tag">{sectorCode}</span>
            <button
              className="icon-btn zoom-btn"
              onClick={handleZoom}
              title="Inspect High-Res Optical Feed"
              aria-label="Inspect High Resolution"
            >
              <Maximize2 size={14} />
              <span>ENHANCE</span>
            </button>
          </div>
        </div>

        {/* Center Target Crosshair Overlay */}
        <div className="optical-reticle">
          <Crosshair size={32} strokeWidth={1} />
        </div>

        {/* Bottom HUD Information Overlay */}
        <div className="viewer-hud-bottom">
          <div className="bottom-intel">
            <div className="hud-eyebrow">
              <Layers size={12} />
              <span>ANOMALY TELEMETRY</span>
            </div>
            <h2 className="intel-title">UNKNOWN MULTIVERSE SECTOR</h2>
            <p className="intel-description">
              {protocol.allowHints
                ? clue
                : "Optical coordinates encrypted. Analyze architectural geometry and environmental markers."}
            </p>

            {/* Tactical Environmental Intel (Cadet clearance only) */}
            {protocol.showIntel && intel && (
              <div className="intel-pills">
                <span className="intel-pill">
                  <Info size={11} /> {intel}
                </span>
              </div>
            )}

            {/* Classified Tags */}
            {tags.length > 0 && (
              <div className="tag-cluster">
                {tags.map((t) => (
                  <span key={t} className="hud-mini-tag">
                    #{t.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="hud-coordinates-encrypted">
            <span className="coord-label">ENCRYPTION PROTOCOL: AES-512</span>
            <div className="coord-matrix">
              <span>LAT: [CLASSIFIED]</span>
              <span>LNG: [CLASSIFIED]</span>
            </div>
          </div>
        </div>
      </div>

      {isZoomed && (
        <ImageZoomModal
          imageSrc={imageSrc}
          sectorCode={sectorCode}
          onClose={() => setIsZoomed(false)}
        />
      )}
    </section>
  );
}
