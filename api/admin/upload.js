import { handleUpload } from "@vercel/blob/client";
import { isAuthenticated } from "../../lib/adminAuth.js";

// This powers direct-from-browser uploads to Vercel Blob storage (so large
// photos never have to pass through this function's body, which has a size
// limit). The admin page calls `upload()` from "@vercel/blob/client", which
// talks to this endpoint first to get a signed, one-time upload token.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async () => {
        if (!isAuthenticated(req)) {
          throw new Error("Unauthorized. Please log in as admin first.");
        }
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async () => {
        // Nothing to do here — the admin page saves the gallery entry
        // (url, caption, category) to MongoDB itself right after upload()
        // resolves, via POST /api/gallery. This callback also doesn't fire
        // for local `vercel dev` testing, only on deployed URLs.
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (err) {
    console.error("Blob upload token error:", err);
    return res.status(400).json({ error: err.message || "Upload failed." });
  }
}
