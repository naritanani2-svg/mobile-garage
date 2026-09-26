import crypto from "crypto";

const COOKIE_NAME = "sf_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add it in Vercel's Project Settings > Environment Variables (any long random string)."
    );
  }
  return secret;
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function isLocalhost(req) {
  return (req.headers.host || "").includes("localhost");
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const idx = c.indexOf("=");
        return [c.slice(0, idx), decodeURIComponent(c.slice(idx + 1))];
      })
  );
}

// Builds the Set-Cookie header value for a fresh, signed admin session.
export function createSessionCookie(req) {
  const expires = Date.now() + SESSION_TTL_MS;
  const token = `${expires}.${sign(String(expires))}`;

  const parts = [
    `${COOKIE_NAME}=${token}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`,
  ];
  if (!isLocalhost(req)) parts.push("Secure");

  return parts.join("; ");
}

// Builds the Set-Cookie header value that clears the session (logout).
export function clearSessionCookie(req) {
  const parts = [`${COOKIE_NAME}=`, "HttpOnly", "Path=/", "SameSite=Lax", "Max-Age=0"];
  if (!isLocalhost(req)) parts.push("Secure");
  return parts.join("; ");
}

// True if the request carries a valid, unexpired admin session cookie.
export function isAuthenticated(req) {
  const token = parseCookies(req)[COOKIE_NAME];
  if (!token) return false;

  const [expiresStr, signature] = token.split(".");
  if (!expiresStr || !signature) return false;

  const expected = sign(expiresStr);
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  const validSignature = a.length === b.length && crypto.timingSafeEqual(a, b);

  return validSignature && Number(expiresStr) > Date.now();
}

// Call at the top of any admin-only API handler. Sends 401 and returns
// false if the caller isn't logged in, so the handler can just do:
//   if (!requireAdmin(req, res)) return;
export function requireAdmin(req, res) {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "Unauthorized. Please log in." });
    return false;
  }
  return true;
}
