// Central place for values used across components, so the phone number
// only has to change in one spot.
//
// API_BASE_URL defaults to "/api" because the API now lives in the same
// Vercel project as the frontend (see the /api folder) — no separate
// backend URL or CORS setup needed. VITE_API_BASE_URL is only for the rare
// case you point this frontend at a different API deployment.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const GARAGE = {
  name: "Sunflower Auto Garage",
  nameArabic: "كراج سنفلور للسيارات",
  phoneDisplay: "+971 55 153 1345",
  whatsappNumber: "971551531345", // no leading + or 00, required by wa.me links
  address: "Umm Ramool, Dubai, UAE",
  addressArabic: "أم رمول، دبي، الإمارات",
  mapsUrl: "https://share.google/Pb250L6pldzc8jaFs",
  lat: 25.2242667,
  lng: 55.3668534,
  hours: "Open 24 hours, every day",
};

export function whatsappLink(prefilledMessage = "") {
  const text = encodeURIComponent(prefilledMessage);
  return `https://wa.me/${GARAGE.whatsappNumber}${text ? `?text=${text}` : ""}`;
}

export function telLink() {
  return `tel:${GARAGE.phoneDisplay.replace(/\s/g, "")}`;
}
