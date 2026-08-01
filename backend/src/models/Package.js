import mongoose from "mongoose";

const itineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  summary: { type: String, required: true },
  districts: [{ type: String, trim: true }],
  vibe: { type: String, enum: ["chill", "peace", "wild", "balanced"], required: true },
  durationDays: { type: Number, min: 1, required: true },
  basePrice: { type: Number, min: 0, required: true },
  itinerary: [itineraryDaySchema],
  tags: [{ type: String, trim: true }],
  isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true });

export const TourPackage = mongoose.models.TourPackage || mongoose.model("TourPackage", packageSchema);
