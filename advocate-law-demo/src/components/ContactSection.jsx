import React, { useEffect, useRef } from "react";
import { legalContent } from "../data/content";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const contactCards = [
  {
    label: "Office Address",
    value: legalContent.contact.address,
    icon: (
      // Map-pin icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
  {
    label: "Direct Line",
    value: legalContent.contact.phone,
    icon: (
      // Phone icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    ),
  },
  {
    label: "Secure Email",
    value: legalContent.contact.email,
    icon: (
      // Mail / envelope icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "Chamber Timings",
    value: legalContent.contact.hours,
    icon: (
      // Clock icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
];

export default function ContactSection() {
  // Separate Address card from other channels for dedicated layout
  const addressCard = contactCards.find(c => c.label === "Office Address");
  const otherCards = contactCards.filter(c => c.label !== "Office Address");

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Prevent double initialization

    // Nashik District Court Coordinates
    const position = [20.002825, 73.774438];

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false, // Disable scroll zoom by default for better scrolling page UX
    }).setView(position, 16);

    mapRef.current = map;

    // Bright white themed tile layer (CartoDB Positron Light)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Add marker
    const marker = L.marker(position).addTo(map);
    
    // Bind popup with serif/sans typography matching theme
    marker.bindPopup(
      `<div style="text-align: center; color: white;">
        <h4 style="font-family: 'Playfair Display', serif; color: #c5a880; font-weight: bold; margin: 0 0 4px 0; font-size: 14px;">Nashik District Court</h4>
        <p style="font-family: 'Inter', sans-serif; font-size: 11px; margin: 0; opacity: 0.8;">Advocate Chambers Location</p>
      </div>`
    ).openPopup();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <section id="contact" className="bg-black py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* ── Heading ── */}
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center">
          Get In Touch
        </h2>

        {/* Gold divider */}
        <div className="mx-auto mt-6 h-px w-16 bg-legal-gold" />

        {/* Subtitle */}
        <p className="mt-6 text-center font-sans text-neutral-400 max-w-lg mx-auto leading-relaxed">
          Reach out to our chambers through any of the following channels or locate us on the map.
        </p>

        {/* ── Main Address Card ── */}
        <div className="mt-20">
          <div className="rounded border border-white/10 bg-neutral-950/40 p-6 md:p-8 hover:border-legal-gold/20 transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-legal-gold/10 text-legal-gold rounded">
                {addressCard.icon}
              </div>
              <div className="pt-1">
                <p className="text-xs uppercase tracking-widest text-legal-gold font-sans mb-2">
                  {addressCard.label}
                </p>
                <p className="text-lg text-white font-sans leading-relaxed max-w-2xl">
                  {addressCard.value}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Spacious Leaflet Map Area (Full Square) ── */}
        <div className="mt-8">
          <div className="w-full aspect-square p-6 md:p-8 border-2 border-white/10 ring-1 ring-legal-gold/20 hover:border-legal-gold/30 hover:ring-legal-gold/40 transition-all duration-300 shadow-2xl rounded bg-neutral-950/50 flex flex-col justify-between">
            <div className="w-full h-full rounded overflow-hidden border border-white/5 relative z-10">
              <div ref={mapContainerRef} className="w-full h-full min-h-full" />
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-neutral-400 px-1">
              <span className="font-serif italic text-legal-gold/85">Nashik District Court Chambers (Leaflet View)</span>
              <span className="font-sans text-[10px] tracking-wider uppercase opacity-60">Interact to zoom & drag</span>
            </div>
          </div>
        </div>

        {/* ── Other Contact Info ── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCards.map((card) => (
            <div key={card.label} className="flex flex-col items-center text-center p-6 rounded border border-white/5 bg-neutral-950/20 hover:border-white/10 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center bg-legal-gold/10 text-legal-gold rounded mb-4">
                {card.icon}
              </div>
              <p className="text-xs uppercase tracking-widest text-legal-gold font-sans mb-2">
                {card.label}
              </p>
              <p className="text-sm text-white font-sans leading-relaxed whitespace-pre-line">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
