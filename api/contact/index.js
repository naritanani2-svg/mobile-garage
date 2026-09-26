import { connectDB } from "../../lib/db.js";
import ContactMessage from "../../lib/models/ContactMessage.js";
import { requireAdmin } from "../../lib/adminAuth.js";

export default async function handler(req, res) {
  // Anyone can POST an enquiry; only the admin can GET the inbox.
  if (req.method === "GET" && !requireAdmin(req, res)) return;

  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error:", err);
    return res.status(500).json({ error: "Database is unavailable. Please try again shortly." });
  }

  if (req.method === "POST") {
    const { name, phone, email, message } = req.body || {};

    if (!name || !message) {
      return res.status(400).json({ error: "name and message are required." });
    }

    try {
      const contactMessage = await ContactMessage.create({ name, phone, email, message });
      return res.status(201).json({ contactMessage });
    } catch (err) {
      console.error("Error saving contact message:", err);
      return res.status(500).json({ error: "Could not send your message. Please try again." });
    }
  }

  if (req.method === "GET") {
    try {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({ messages });
    } catch (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Could not fetch messages." });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
