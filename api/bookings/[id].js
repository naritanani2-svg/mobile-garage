import { connectDB } from "../../lib/db.js";
import Booking from "../../lib/models/Booking.js";
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

  if (req.method === "PATCH") {
    try {
      const { status } = req.body || {};
      const booking = await Booking.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!booking) {
        return res.status(404).json({ error: "Booking not found." });
      }

      return res.status(200).json({ booking });
    } catch (err) {
      console.error("Error updating booking:", err);
      return res.status(500).json({ error: "Could not update booking." });
    }
  }

  res.setHeader("Allow", "PATCH");
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
