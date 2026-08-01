import mongoose from "mongoose";

export async function connectDatabase(uri) {
  if (!uri) throw new Error("MONGODB_URI is required");

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
