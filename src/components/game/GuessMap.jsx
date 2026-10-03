import React, { useEffect, useRef } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import { sound } from "../../services/audio";
import { formatDistance } from "../../services/geo";

// Custom Leaflet Icons using SVG divIcons for sharp, futuristic rendering
const playerIcon = L.divIcon({
  className: "custom-leaflet-marker player-marker-icon",
  html: `
    <div class="marker-pulse-ring player-ring"></div>
    <div class="marker-core player-core">
      <div class="marker-cross"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const targetIcon = L.divIcon({
  className: "custom-leaflet-marker target-marker-icon",
  html: `
    <div class="marker-pulse-ring target-ring"></div>
    <div class="marker-core target-core">
      <div class="target-dot"></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

/**
 * Handles map click coordinate deployment
 */
function MapClickHandler({ onGuess, disabled }) {
  useMapEvents({
    click(event) {
      if (disabled) return;
      sound.playPinDrop();
      onGuess({
        lat: parseFloat(event.latlng.lat.toFixed(5)),
        lng: parseFloat(event.latlng.lng.toFixed(5))
      });
    }
  });
  return null;
}

/**
 * Adjusts camera viewport smoothly when round results are in
 */
function MapCameraAdjuster({ guess, trueLocation }) {
  const map = useMap();

  useEffect(() => {
    if (guess && trueLocation) {
      const bounds = L.latLngBounds(
        [guess.lat, guess.lng],
        [trueLocation.lat, trueLocation.lng]
      );
      map.flyToBounds(bounds, {
        padding: [60, 60],
        maxZoom: 6,
        duration: 1.2
      });
    }
  }, [guess, trueLocation, map]);

  return null;
}

export default function GuessMap({
  guess,
  onGuess,
  disabled = false,
  result = null
}) {
  const trueLoc = result?.trueLocation;

  return (
    <div className="map-container-wrapper">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={10}
        scrollWheelZoom
        className="tactical-guess-map"
        worldCopyJump
      >
        {/* Dark matter CartoDB basemap for high-tech tactical visual aesthetic */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Map Click Handler */}
        <MapClickHandler onGuess={onGuess} disabled={disabled} />

        {/* Player's chosen coordinate marker */}
        {guess && (
          <Marker position={[guess.lat, guess.lng]} icon={playerIcon}>
            <Popup className="tactical-popup">
              <div className="popup-inner">
                <strong className="popup-title">AGENT TARGET LOCK</strong>
                <span>{guess.lat.toFixed(3)}°, {guess.lng.toFixed(3)}°</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* True Anomaly Marker when round is resolved */}
        {trueLoc && (
          <Marker position={[trueLoc.lat, trueLoc.lng]} icon={targetIcon}>
            <Popup className="tactical-popup anomaly-popup">
              <div className="popup-inner">
                <strong className="popup-title">ANOMALY EPICENTER</strong>
                <span>{trueLoc.name}</span>
                <small>{formatDistance(result.distance)} offset</small>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Connecting geodesic trajectory line */}
        {guess && trueLoc && (
          <Polyline
            positions={[
              [guess.lat, guess.lng],
              [trueLoc.lat, trueLoc.lng]
            ]}
            pathOptions={{
              color: "#63e6ff",
              weight: 2,
              dashArray: "6, 8",
              opacity: 0.85
            }}
          />
        )}

        {/* Camera auto-fit */}
        {result && <MapCameraAdjuster guess={guess} trueLocation={trueLoc} />}
      </MapContainer>

      {/* Crosshair grid watermark */}
      <div className="map-tactical-grid" />
    </div>
  );
}
