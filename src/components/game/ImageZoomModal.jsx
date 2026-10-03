import React, { useEffect } from "react";
import { Maximize2, Minimize2, X, ZoomIn, ZoomOut } from "lucide-react";

export default function ImageZoomModal({ imageSrc, sectorCode, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop zoom-backdrop" onClick={onClose}>
      <div className="zoom-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="zoom-header">
          <div className="zoom-title">
            <span className="live-dot" />
            <span>HIGH-RESOLUTION OPTICAL RECON // {sectorCode}</span>
          </div>
          <button className="icon-close-btn" onClick={onClose} title="Close Inspection Window">
            <X size={20} />
          </button>
        </div>

        <div className="zoom-image-container">
          <img
            src={imageSrc}
            alt="Encrypted Tactical Reconnaissance Feed"
            className="zoom-image"
          />
          <div className="crosshair-reticle" />
        </div>

        <div className="zoom-footer">
          <small>Use ESC or click outside to close · Optical enhancement active</small>
          <button className="primary-btn sm-btn" onClick={onClose}>
            Return to Nexus
          </button>
        </div>
      </div>
    </div>
  );
}
