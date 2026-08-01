import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingNumber: { type: String, required: true, unique: true, trim: true },
  guestName: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  packageName: { type: String, required: true, trim: true },
  travelVibe: { type: String, enum: ["chill", "peace", "wild", "balanced"], default: "balanced" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  travellers: { type: Number, min: 1, default: 2 },
  totalAmount: { type: Number, min: 0, required: true },
  amountPaid: { type: Number, min: 0, default: 0 },
  status: { type: String, enum: ["new-lead", "quoted", "confirmed", "on-trip", "completed", "cancelled"], default: "new-lead", index: true },
  source: { type: String, enum: ["website", "whatsapp", "instagram", "referral", "manual"], default: "website" },
  notes: { type: String, trim: true },
}, { timestamps: true });

bookingSchema.index({ startDate: 1 });
bookingSchema.index({ guestName: "text", packageName: "text", bookingNumber: "text" });

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
