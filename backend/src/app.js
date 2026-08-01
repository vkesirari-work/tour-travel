import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { bookingsRouter } from "./routes/bookings.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { healthRouter } from "./routes/health.js";
import { packagesRouter } from "./routes/packages.js";
import { errorHandler, notFound } from "./middleware/errors.js";

export function createApp() {
  const app = express();
  const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim());

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  app.get("/", (_request, response) => response.json({ service: "Pahadi Safar API", version: "1.0.0" }));
  app.use("/api/health", healthRouter);
  app.use("/api/bookings", bookingsRouter);
  app.use("/api/packages", packagesRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
