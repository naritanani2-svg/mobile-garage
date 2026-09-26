import { del } from "@vercel/blob";
import { connectDB } from "../../lib/db.js";
import GalleryImage from "../../lib/models/GalleryImage.js";
import { requireAdmin } from "../../lib/adminAuth.js";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  const { id } = req.query;

  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error:", err);
    return res.status(500).json({ error: "Database is unavailable. Please try again shortly." });
  }

  if (req.method === "DELETE") {
    try {
      const image = await GalleryImage.findByIdAndDelete(id);
      if (!image) {
        return res.status(404).json({ error: "Image not found." });
      }

      // Best-effort cleanup of the actual file in Blob storage. Non-fatal:
      // the gallery entry is already gone from the site either way.
      if (image.url && image.url.includes("blob.vercel-storage.com")) {
        try {
          await del(image.url);
        } catch (blobErr) {
          console.error("Could not delete blob file (non-fatal):", blobErr);
        }
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Error deleting gallery image:", err);
      return res.status(500).json({ error: "Could not delete image." });
    }
  }

  res.setHeader("Allow", "DELETE");
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
