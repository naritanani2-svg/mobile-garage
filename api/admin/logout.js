import { clearSessionCookie } from "../../lib/adminAuth.js";

export default function handler(req, res) {
  res.setHeader("Set-Cookie", clearSessionCookie(req));
  return res.status(200).json({ success: true });
}
