// Run with: npm run seed
// (loads .env locally via dotenv; on Vercel itself you'd run this with
// `vercel env pull` first, or just run it from your own machine pointed
// at the same MONGODB_URI as production)

import "dotenv/config";
import { connectDB } from "../lib/db.js";
import GalleryImage from "../lib/models/GalleryImage.js";

const STARTER_PHOTOS = [
  {
    url: "/images/workshop-lift.jpg",
    caption: "Nissan Patrol on the lift, full wiring harness out for repair",
    category: "workshop",
    featured: true,
    sortOrder: 1,
  },
  {
    url: "/images/supercar-bay.jpg",
    caption: "McLaren in the workshop for suspension and brake work",
    category: "supercar",
    sortOrder: 2,
  },
  {
    url: "/images/roadside-service.jpg",
    caption: "Roadside call-out — our van reaches you across Dubai",
    category: "roadside",
    sortOrder: 3,
  },
  {
    url: "/images/garage-signage.jpg",
    caption: "Sunflower Auto Garage, Umm Ramool, Dubai",
    category: "signage",
    sortOrder: 4,
  },
];

async function seed() {
  await connectDB();

  for (const photo of STARTER_PHOTOS) {
    await GalleryImage.updateOne({ url: photo.url }, { $set: photo }, { upsert: true });
  }

  console.log(`Seeded ${STARTER_PHOTOS.length} gallery photos.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
