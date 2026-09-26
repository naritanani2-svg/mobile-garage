const SERVICES = [
  {
    title: "General repair & maintenance",
    desc: "Oil changes, filters, timing belts and the routine work that keeps a car reliable.",
  },
  {
    title: "Engine diagnostics",
    desc: "Computerised fault-finding for warning lights, rough running and performance loss.",
  },
  {
    title: "Electrical & wiring",
    desc: "Full harness repair and rewiring, battery, alternator and sensor faults.",
  },
  {
    title: "Brakes & suspension",
    desc: "Pads, discs, shocks and steering components, checked and replaced on the lift.",
  },
  {
    title: "A/C service",
    desc: "Re-gas, compressor and cabin cooling repair — essential in Dubai's heat.",
  },
  {
    title: "Supercar specialist bay",
    desc: "A dedicated dry bay for McLaren, Ferrari and other high-performance marques.",
  },
  {
    title: "Tyres & wheels",
    desc: "Fitting, balancing, alignment and wheel refurbishment for any rim size.",
  },
  {
    title: "Roadside assistance",
    desc: "Our van comes to you for jump-starts, tyre changes and on-site diagnosis.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-lg">
          <h2 className="font-display text-4xl font-semibold text-asphalt">
            What we work on
          </h2>
          <p className="mt-3 text-steel">
            One workshop, every job from a warning light to a full engine
            rebuild — book below and tell us what's wrong.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-chrome/50 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="border-l-4 border-sunflower bg-cream p-6">
              <h3 className="font-display text-xl font-semibold text-asphalt">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
