import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, trim: true },
    category: {
      type: String,
      enum: ["workshop", "roadside", "supercar", "before-after", "team", "signage"],
      default: "workshop",
    },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage ||
  mongoose.model("GalleryImage", galleryImageSchema);
