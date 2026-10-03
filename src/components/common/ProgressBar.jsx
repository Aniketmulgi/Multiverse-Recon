import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
      <div
        className="progress-fill"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
      <div className="progress-glow" />
    </div>
  );
}
