import { isAuthenticated } from "../../lib/adminAuth.js";

export default function handler(req, res) {
  return res.status(200).json({ authenticated: isAuthenticated(req) });
}
