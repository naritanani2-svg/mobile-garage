import { GARAGE, telLink } from "../config";

export default function Footer() {
  return (
    <footer className="bg-asphalt py-10 text-chrome">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-cream">Sunflower Auto Garage</p>
          <p className="text-sm">{GARAGE.nameArabic} · {GARAGE.address}</p>
        </div>
        <a href={telLink()} className="focus-ring text-sm underline">
          {GARAGE.phoneDisplay}
        </a>
      </div>
      <p className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 text-xs text-chrome/60">
        <span>© {new Date().getFullYear()} Sunflower Auto Garage L.L.C. All rights reserved.</span>
        <a href="/admin" className="hover:text-chrome">Staff login</a>
      </p>
    </footer>
  );
}
