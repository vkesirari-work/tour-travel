import "dotenv/config";
import { createApp } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";

const port = Number(process.env.PORT) || 5001;
await connectDatabase(process.env.MONGODB_URI);

const app = createApp();
const server = app.listen(port, () => {
  console.log(`Pahadi Safar API running at http://localhost:${port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received. Closing server.`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
