import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ["driver", "hotel", "homestay", "guide", "activity"], required: true, index: true },
  phone: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  rate: { type: Number, min: 0 },
  rating: { type: Number, min: 0, max: 5, default: 5 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
