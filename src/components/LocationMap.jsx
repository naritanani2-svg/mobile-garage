import { GARAGE, telLink, whatsappLink } from "../config";

export default function LocationMap() {
  const embedSrc = `https://www.google.com/maps?q=Sunflower+Auto+Garage,${GARAGE.lat},${GARAGE.lng}&z=16&output=embed`;

  return (
    <section id="location" className="bg-steel py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-semibold text-cream">Find us</h2>
          <p className="mt-3 max-w-md text-chrome">{GARAGE.addressArabic} — {GARAGE.address}</p>

          <dl className="mt-8 space-y-4 text-cream">
            <div>
              <dt className="text-sm text-chrome">Phone</dt>
              <dd>
                <a href={telLink()} className="focus-ring font-display text-2xl font-semibold text-sunflower">
                  {GARAGE.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-chrome">Hours</dt>
              <dd className="text-lg">{GARAGE.hours}</dd>
            </div>
            <div>
              <dt className="text-sm text-chrome">Address</dt>
              <dd className="text-lg">{GARAGE.address}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={GARAGE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded-sm bg-sunflower px-5 py-3 font-display text-lg font-semibold text-asphalt"
            >
              Get directions
            </a>
            <a
              href={whatsappLink("Hi, I'd like to bring my car in for a service.")}
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded-sm border border-cream/40 px-5 py-3 font-display text-lg font-semibold text-cream hover:border-sunflower hover:text-sunflower"
            >
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="h-72 w-full overflow-hidden border border-cream/20 lg:h-full lg:min-h-[360px]">
          <iframe
            title="Sunflower Auto Garage location"
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
