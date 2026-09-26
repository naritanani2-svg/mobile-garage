import { connectDB } from "../../lib/db.js";
import Booking from "../../lib/models/Booking.js";
import { requireAdmin } from "../../lib/adminAuth.js";

export default async function handler(req, res) {
  // Anyone can POST a new booking (that's the public "book a service" form).
  // Only the logged-in admin can GET the full list (that's the dashboard).
  if (req.method === "GET" && !requireAdmin(req, res)) return;

  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error:", err);
    return res.status(500).json({ error: "Database is unavailable. Please try again shortly." });
  }

  if (req.method === "POST") {
    const {
      customerName,
      phone,
      email,
      serviceType,
      carMake,
      carModel,
      carYear,
      plateNumber,
      preferredDate,
      preferredTimeSlot,
      dropOffType,
      notes,
    } = req.body || {};

    if (!customerName || !phone || !serviceType) {
      return res.status(400).json({
        error: "customerName, phone and serviceType are required.",
      });
    }

    try {
      const booking = await Booking.create({
        customerName,
        phone,
        email,
        serviceType,
        carMake,
        carModel,
        carYear,
        plateNumber,
        preferredDate,
        preferredTimeSlot,
        dropOffType,
        notes,
      });

      return res.status(201).json({ booking });
    } catch (err) {
      console.error("Error creating booking:", err);
      return res.status(500).json({ error: "Could not save your booking. Please try again." });
    }
  }

  if (req.method === "GET") {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.status(200).json({ bookings });
    } catch (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Could not fetch bookings." });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
