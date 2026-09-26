import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

import workshopLift from "../assets/images/workshop-lift.jpg";
import supercarBay from "../assets/images/supercar-bay.jpg";
import roadsideService from "../assets/images/roadside-service.jpg";
import garageSignage from "../assets/images/garage-signage.jpg";

// Shown immediately and used if the API has no photos yet (e.g. fresh database).
const FALLBACK_PHOTOS = [
  { url: workshopLift, caption: "Nissan Patrol on the lift, full wiring harness out for repair" },
  { url: supercarBay, caption: "McLaren in the workshop for suspension and brake work" },
  { url: roadsideService, caption: "Roadside call-out — our van reaches you across Dubai" },
  { url: garageSignage, caption: "Sunflower Auto Garage, Umm Ramool, Dubai" },
];

export default function Gallery() {
  const [photos, setPhotos] = useState(FALLBACK_PHOTOS);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_BASE_URL}/gallery`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.images?.length) {
          setPhotos(
            data.images.map((img) => ({ url: img.url, caption: img.caption || "" }))
          );
        }
      })
      .catch(() => {
        // API not reachable yet during local frontend-only development — keep fallback photos.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="gallery" className="bg-asphalt py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-semibold text-cream">
              Inside the workshop
            </h2>
            <p className="mt-3 max-w-md text-chrome">
              Real jobs, real cars — from daily runabouts to the supercar bay.
            </p>
          </div>
        </div>

        <div className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((photo, i) => (
            <figure
              key={photo.url + i}
              className={`group relative overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2" : "col-span-1"
              }`}
            >
              <img
                src={photo.url}
                alt={photo.caption || "Sunflower Auto Garage workshop photo"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {photo.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-asphalt/80 px-3 py-2 text-xs text-cream opacity-0 transition-opacity group-hover:opacity-100">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
