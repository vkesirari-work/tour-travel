import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Operations Dashboard | Pahadi Safar",
  description: "Bookings, departures and guest operations for Pahadi Safar.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
