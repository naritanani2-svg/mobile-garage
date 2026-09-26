import { connectDB } from "../../lib/db.js";
import GalleryImage from "../../lib/models/GalleryImage.js";
import { requireAdmin } from "../../lib/adminAuth.js";

export default async function handler(req, res) {
  // The gallery is public to view (GET), but only the admin can add photos.
  if (req.method === "POST" && !requireAdmin(req, res)) return;

  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error:", err);
    return res.status(500).json({ error: "Database is unavailable. Please try again shortly." });
  }

  if (req.method === "GET") {
    try {
      const filter = {};
      if (req.query.category) filter.category = req.query.category;

      const images = await GalleryImage.find(filter).sort({ sortOrder: 1, createdAt: -1 });
      return res.status(200).json({ images });
    } catch (err) {
      console.error("Error fetching gallery:", err);
      return res.status(500).json({ error: "Could not fetch gallery images." });
    }
  }

  if (req.method === "POST") {
    const { url, caption, category, featured, sortOrder } = req.body || {};

    if (!url) {
      return res.status(400).json({ error: "url is required." });
    }

    try {
      const image = await GalleryImage.create({ url, caption, category, featured, sortOrder });
      return res.status(201).json({ image });
    } catch (err) {
      console.error("Error adding gallery image:", err);
      return res.status(500).json({ error: "Could not add image." });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
