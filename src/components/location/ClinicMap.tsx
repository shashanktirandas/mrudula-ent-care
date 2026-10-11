"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LATITUDE = 17.4355625;
const LONGITUDE = 78.4021875;

export default function ClinicMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [LATITUDE, LONGITUDE],
      zoom: 16,
      scrollWheelZoom: false,
      zoomControl: false,
    });

    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(map);

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      },
    ).addTo(map);

    const markerIcon = L.divIcon({
      className: "",
      html: `
        <div
          style="
            width: 18px;
            height: 18px;
            border-radius: 9999px;
            background: #0b1720;
            border: 3px solid #d6bd8b;
            box-shadow: 0 4px 18px rgba(11, 23, 32, 0.35);
          "
        ></div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    L.marker([LATITUDE, LONGITUDE], {
      icon: markerIcon,
    })
      .addTo(map)
      .bindPopup(
        `
          <div style="min-width: 180px;">
            <strong>Dr. Mrudula ENT Care</strong>
            <br />
            <span>Jubilee Hills · Hyderabad</span>
          </div>
        `,
      );

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-full min-h-[360px] w-full lg:min-h-[620px]"
      aria-label="Map showing Dr. Mrudula ENT Care in Jubilee Hills, Hyderabad"
      role="application"
    />
  );
}