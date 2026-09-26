import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },

    serviceType: {
      type: String,
      required: true,
      enum: [
        "general-repair",
        "engine-diagnostics",
        "electrical-wiring",
        "brakes-suspension",
        "ac-service",
        "tyres-wheels",
        "supercar-specialist",
        "roadside-assistance",
        "other",
      ],
    },

    carMake: { type: String, trim: true },
    carModel: { type: String, trim: true },
    carYear: { type: String, trim: true },
    plateNumber: { type: String, trim: true },

    preferredDate: { type: Date },
    preferredTimeSlot: {
      type: String,
      enum: ["morning", "afternoon", "evening", "any"],
      default: "any",
    },

    dropOffType: {
      type: String,
      enum: ["drop-off", "roadside", "pickup-requested"],
      default: "drop-off",
    },

    notes: { type: String, trim: true, maxlength: 1000 },

    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "in-progress", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

// mongoose.models.Booking already exists on warm serverless invocations that
// reuse the module cache — re-registering the schema would throw.
export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
