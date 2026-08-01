import { Router } from "express";
import { Booking } from "../models/Booking.js";
import { bookingInputSchema, bookingUpdateSchema } from "../validation/booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const bookingsRouter = Router();

bookingsRouter.get("/", asyncHandler(async (request, response) => {
  const { status, search, page = "1", limit = "20" } = request.query;
  const query = {};
  if (status) query.status = status;
  if (search) query.$text = { $search: search };
  const pageNumber = Math.max(Number(page) || 1, 1);
  const pageSize = Math.min(Math.max(Number(limit) || 20, 1), 100);
  const [items, total] = await Promise.all([
    Booking.find(query).sort({ createdAt: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize),
    Booking.countDocuments(query),
  ]);
  response.json({ success: true, data: items, pagination: { page: pageNumber, limit: pageSize, total } });
}));

bookingsRouter.get("/:id", asyncHandler(async (request, response) => {
  const booking = await Booking.findById(request.params.id);
  if (!booking) return response.status(404).json({ success: false, message: "Booking not found" });
  response.json({ success: true, data: booking });
}));

bookingsRouter.post("/", asyncHandler(async (request, response) => {
  const input = bookingInputSchema.parse(request.body);
  const booking = await Booking.create(input);
  response.status(201).json({ success: true, data: booking });
}));

bookingsRouter.patch("/:id", asyncHandler(async (request, response) => {
  const input = bookingUpdateSchema.parse(request.body);
  const booking = await Booking.findByIdAndUpdate(request.params.id, input, { new: true, runValidators: true });
  if (!booking) return response.status(404).json({ success: false, message: "Booking not found" });
  response.json({ success: true, data: booking });
}));

bookingsRouter.delete("/:id", asyncHandler(async (request, response) => {
  const booking = await Booking.findByIdAndDelete(request.params.id);
  if (!booking) return response.status(404).json({ success: false, message: "Booking not found" });
  response.status(204).send();
}));
