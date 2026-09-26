import { useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import { adminApi } from "./adminApi";

const CATEGORIES = ["workshop", "roadside", "supercar", "before-after", "team", "signage"];

export default function GalleryPanel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("workshop");
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminApi.listGallery();
      setImages(data.images);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      // Uploads straight from the browser to Vercel Blob storage — the
      // photo itself never passes through our own server function, so
      // there's no small body-size limit to worry about.
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });

      await adminApi.addGalleryImage({ url: blob.url, caption, category });

      setFile(null);
      setCaption("");
      e.target.reset?.();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Remove this photo from the site?")) return;
    try {
      await adminApi.deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-cream">Add a workshop photo</h2>

      <form onSubmit={handleUpload} className="mt-4 flex flex-wrap items-end gap-4 border-l-4 border-sunflower bg-steel p-5">
        <label className="flex flex-col gap-1 text-sm text-chrome">
          Photo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-cream"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-chrome">
          Caption
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Brake job on a Range Rover"
            className="border border-chrome/30 bg-asphalt px-2 py-1 text-cream focus-ring"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-chrome">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-chrome/30 bg-asphalt px-2 py-1 text-cream focus-ring"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={uploading || !file}
          className="focus-ring rounded-sm bg-sunflower px-5 py-2 font-display text-lg font-semibold text-asphalt disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm font-medium text-rust">{error}</p>}

      <h2 className="mt-10 font-display text-2xl font-semibold text-cream">
        Current photos ({images.length})
      </h2>

      {loading ? (
        <p className="mt-3 text-chrome">Loading…</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img) => (
            <figure key={img._id} className="relative overflow-hidden border border-steel">
              <img src={img.url} alt={img.caption || ""} className="h-36 w-full object-cover" />
              <figcaption className="p-2 text-xs text-chrome">
                <p className="truncate">{img.caption || "No caption"}</p>
                <p className="text-chrome/60">{img.category}</p>
              </figcaption>
              <button
                onClick={() => handleDelete(img._id)}
                className="focus-ring absolute right-1 top-1 bg-asphalt/80 px-2 py-1 text-xs font-semibold text-rust"
              >
                Delete
              </button>
            </figure>
          ))}
          {images.length === 0 && <p className="text-chrome">No photos yet.</p>}
        </div>
      )}
    </div>
  );
}
