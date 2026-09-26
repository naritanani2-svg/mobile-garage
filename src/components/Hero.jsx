import workshopLift from "../assets/images/workshop-lift.jpg";
import { GARAGE, telLink, whatsappLink } from "../config";

const STATS = [
  { value: "All makes", label: "European, Japanese, Supercar" },
  { value: "24/7", label: "Workshop open, every day" },
  { value: "Umm Ramool", label: "Dubai workshop" },
];

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={workshopLift}
          alt="Mechanic at Sunflower Auto Garage working under a car on a lift"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/70 to-asphalt/20" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 pt-24">
          <p className="mb-2 font-display text-lg text-sunflower">
            كراج سنفلور للسيارات — Umm Ramool, Dubai
          </p>
          <h1 className="max-w-xl font-display text-5xl font-bold leading-[0.95] text-cream sm:text-6xl">
            Your car, fixed right, the first time.
          </h1>
          <p className="mt-5 max-w-md text-base text-chrome">
            Full workshop diagnostics, electrical and engine repair, and a
            dedicated supercar bay — plus a van on the road when you can't get
            to us.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={telLink()}
              className="focus-ring rounded-sm bg-sunflower px-6 py-3 font-display text-lg font-semibold text-asphalt transition-transform hover:-translate-y-0.5"
            >
              Call {GARAGE.phoneDisplay}
            </a>
            <a
              href={whatsappLink("Hi Sunflower Garage, I'd like to ask about a repair.")}
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded-sm border border-cream/40 px-6 py-3 font-display text-lg font-semibold text-cream transition-colors hover:border-sunflower hover:text-sunflower"
            >
              Message on WhatsApp
            </a>
            <a
              href="#booking"
              className="focus-ring rounded-sm px-6 py-3 font-display text-lg font-semibold text-chrome underline decoration-chrome/40 underline-offset-4 hover:text-sunflower hover:decoration-sunflower"
            >
              Book online
            </a>
          </div>
        </div>
      </div>

      {/* Work-order style stat strip, cut into the bottom of the hero */}
      <div className="border-b border-steel bg-asphalt">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-steel sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {STATS.map((s) => (
            <div key={s.label} className="px-5 py-5 text-center sm:text-left">
              <p className="font-display text-2xl font-semibold text-sunflower">{s.value}</p>
              <p className="text-sm text-chrome">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
