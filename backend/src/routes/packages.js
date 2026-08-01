import { Router } from "express";
import { TourPackage } from "../models/Package.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const packagesRouter = Router();

packagesRouter.get("/", asyncHandler(async (request, response) => {
  const query = request.query.includeInactive === "true" ? {} : { isActive: true };
  const packages = await TourPackage.find(query).sort({ createdAt: -1 });
  response.json({ success: true, data: packages });
}));

packagesRouter.post("/", asyncHandler(async (request, response) => {
  const item = await TourPackage.create(request.body);
  response.status(201).json({ success: true, data: item });
}));

packagesRouter.patch("/:id", asyncHandler(async (request, response) => {
  const item = await TourPackage.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
  if (!item) return response.status(404).json({ success: false, message: "Package not found" });
  response.json({ success: true, data: item });
}));

packagesRouter.delete("/:id", asyncHandler(async (request, response) => {
  const item = await TourPackage.findByIdAndUpdate(request.params.id, { isActive: false }, { new: true });
  if (!item) return response.status(404).json({ success: false, message: "Package not found" });
  response.json({ success: true, data: item });
}));
