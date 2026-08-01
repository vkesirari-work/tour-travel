import { Router } from "express";
import { Booking } from "../models/Booking.js";
import { Customer } from "../models/Customer.js";
import { Partner } from "../models/Partner.js";
import { TourPackage } from "../models/Package.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const dashboardRouter = Router();

dashboardRouter.get("/", asyncHandler(async (_request, response) => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const activeStatuses = ["quoted", "confirmed", "on-trip"];

  const [money, activeBookings, upcomingTrips, customerCount, partnerCount, packageCount, departures] = await Promise.all([
    Booking.aggregate([
      { $match: { createdAt: { $gte: monthStart, $lt: monthEnd }, status: { $ne: "cancelled" } } },
      { $group: { _id: null, revenue: { $sum: "$totalAmount" }, collected: { $sum: "$amountPaid" } } },
    ]),
    Booking.countDocuments({ status: { $in: activeStatuses } }),
    Booking.countDocuments({ startDate: { $gte: now }, status: { $in: ["confirmed", "quoted"] } }),
    Customer.countDocuments(),
    Partner.countDocuments({ isActive: true }),
    TourPackage.countDocuments({ isActive: true }),
    Booking.find({ startDate: { $gte: now }, status: { $in: ["confirmed", "quoted"] } }).sort({ startDate: 1 }).limit(5),
  ]);

  const finance = money[0] || { revenue: 0, collected: 0 };
  response.json({
    success: true,
    data: {
      revenue: finance.revenue,
      collected: finance.collected,
      pending: finance.revenue - finance.collected,
      activeBookings,
      upcomingTrips,
      customerCount,
      partnerCount,
      packageCount,
      departures,
    },
  });
}));
