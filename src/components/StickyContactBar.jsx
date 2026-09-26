import { GARAGE, telLink, whatsappLink } from "../config";

export default function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-steel bg-asphalt md:hidden">
      <a
        href={telLink()}
        className="focus-ring flex-1 py-3 text-center font-display text-lg font-semibold text-sunflower"
      >
        Call now
      </a>
      <div className="w-px bg-steel" />
      <a
        href={whatsappLink("Hi Sunflower Garage, I'd like to ask about a repair.")}
        target="_blank"
        rel="noreferrer"
        className="focus-ring flex-1 py-3 text-center font-display text-lg font-semibold text-cream"
      >
        WhatsApp
      </a>
    </div>
  );
}
