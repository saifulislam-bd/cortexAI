import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

const PORT = process.env.PORT ?? 8001;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Auth Service is OK" });
});
const startServer = async () => {
  try {
    // 1. Establish DB connection first
    await connectDB();

    // 2. Only start listening if DB connection succeeds
    app.listen(PORT, () => {
      console.log(`Auth service running safely on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server due to DB connection error:", error);
    process.exit(1); // Exit the process with failure code
  }
};

startServer();
