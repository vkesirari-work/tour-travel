import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pahadi Safar | Kumaon, Your Way",
  description: "Locally curated Kumaon journeys shaped around your mood — from soulful retreats to wild road trips.",
  openGraph: {
    title: "Pahadi Safar | Kumaon, Your Way",
    description: "One Kumaon. Many ways to feel it.",
    images: [{ url: "/og.png", width: 1733, height: 907 }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
