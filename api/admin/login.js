import { createSessionCookie } from "../../lib/adminAuth.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({
      error: "Admin login isn't configured yet. Set ADMIN_PASSWORD in the project's environment variables.",
    });
  }

  const { password } = req.body || {};
  if (!password || password !== adminPassword) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  try {
    res.setHeader("Set-Cookie", createSessionCookie(req));
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message });
  }
}
