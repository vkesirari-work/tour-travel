import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, required: true, unique: true, trim: true },
  city: { type: String, trim: true },
  preferences: {
    vibe: { type: String, enum: ["chill", "peace", "wild", "balanced"] },
    food: { type: String, enum: ["vegetarian", "non-vegetarian", "satvik", "no-preference"] },
    alcoholPreference: { type: String, enum: ["friendly", "alcohol-free", "no-preference"], default: "no-preference" },
  },
  totalTrips: { type: Number, default: 0 },
}, { timestamps: true });

export const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
