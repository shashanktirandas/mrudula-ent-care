"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const clinicPosition: [number, number] = [
  17.4355625,
  78.4021875,
];

const clinicIcon = L.divIcon({
  className: "clinic-map-marker",
  html: `
    <div style="
      width: 38px;
      height: 38px;
      border-radius: 999px;
      background: #0B1720;
      border: 3px solid #F7F5EF;
      box-shadow: 0 8px 24px rgba(11, 23, 32, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: #D6BD8B;
      "></div>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -22],
});

export default function ClinicMap() {
  return (
    <div className="relative min-h-[360px] overflow-hidden lg:min-h-full">
      <MapContainer
        center={clinicPosition}
        zoom={16}
        scrollWheelZoom={false}
        className="absolute inset-0 h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={clinicPosition} icon={clinicIcon}>
          <Popup>
            <strong>Dr. Mrudula ENT Care</strong>
            <br />
            Jubilee Hills, Hyderabad
          </Popup>
        </Marker>
      </MapContainer>

      {/* Premium overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[400] bg-gradient-to-t from-black/20 via-transparent to-transparent"
      />

      <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-[500] sm:bottom-7 sm:left-7 sm:right-7">
        <div className="inline-block bg-white/95 px-4 py-3 shadow-[var(--shadow-soft)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
            Dr. Mrudula ENT Care
          </p>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Jubilee Hills · Hyderabad
          </p>
        </div>
      </div>
    </div>
  );
}