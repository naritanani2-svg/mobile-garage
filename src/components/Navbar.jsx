import { useState } from "react";
import { GARAGE, telLink } from "../config";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Our work" },
  { href: "#booking", label: "Book a service" },
  { href: "#location", label: "Find us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-asphalt text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-sm bg-sunflower font-display text-lg font-bold text-asphalt">
            SG
          </span>
          <span className="font-display text-xl font-semibold tracking-wide">
            Sunflower Garage
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring text-sm text-chrome transition-colors hover:text-sunflower"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={telLink()}
          className="focus-ring hidden rounded-sm bg-sunflower px-4 py-2 font-display text-base font-semibold text-asphalt transition-transform hover:-translate-y-0.5 md:inline-block"
        >
          Call {GARAGE.phoneDisplay}
        </a>

        <button
          className="focus-ring rounded-sm border border-chrome/40 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-cream" />
          <span className="mt-1.5 block h-0.5 w-6 bg-cream" />
          <span className="mt-1.5 block h-0.5 w-6 bg-cream" />
        </button>
      </div>

      {open && (
        <div className="border-t border-steel px-5 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring text-chrome hover:text-sunflower"
              >
                {link.label}
              </a>
            ))}
            <a
              href={telLink()}
              className="focus-ring mt-1 rounded-sm bg-sunflower px-4 py-2 text-center font-display text-base font-semibold text-asphalt"
            >
              Call {GARAGE.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
