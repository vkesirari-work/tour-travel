import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import { Booking } from "./models/Booking.js";
import { TourPackage } from "./models/Package.js";

await connectDatabase(process.env.MONGODB_URI);

const packages = [
  { name: "The Hidden Kumaon", slug: "hidden-kumaon", summary: "Champawat, Lohaghat and Abbott Mount at an unhurried pace.", districts: ["Champawat"], vibe: "peace", durationDays: 3, basePrice: 8900, tags: ["heritage", "nature"], isActive: true },
  { name: "Peaks & Sacred Caves", slug: "peaks-sacred-caves", summary: "Chaukori, Patal Bhuvaneshwar and Pithoragarh.", districts: ["Pithoragarh"], vibe: "balanced", durationDays: 4, basePrice: 13500, tags: ["temples", "views"], isActive: true },
  { name: "Road to Panchachuli", slug: "road-to-panchachuli", summary: "A deep Kumaon road trip through Munsiyari, Darkot and Birthi.", districts: ["Pithoragarh"], vibe: "wild", durationDays: 6, basePrice: 21900, tags: ["road-trip", "adventure"], isActive: true },
];

await TourPackage.deleteMany({});
await TourPackage.insertMany(packages);
await Booking.deleteMany({ bookingNumber: { $in: ["PS-1048", "PS-1047"] } });
await Booking.insertMany([
  { bookingNumber: "PS-1048", guestName: "Aarav & Meera", phone: "9999999991", packageName: "Road to Panchachuli", travelVibe: "wild", startDate: new Date("2026-08-12"), endDate: new Date("2026-08-17"), travellers: 2, totalAmount: 43800, amountPaid: 22000, status: "confirmed", source: "instagram" },
  { bookingNumber: "PS-1047", guestName: "Nitin Sharma", phone: "9999999992", packageName: "The Hidden Kumaon", travelVibe: "peace", startDate: new Date("2026-08-09"), endDate: new Date("2026-08-11"), travellers: 3, totalAmount: 27600, amountPaid: 0, status: "quoted", source: "website" },
]);

console.log("Seed data created");
await disconnectDatabase();
