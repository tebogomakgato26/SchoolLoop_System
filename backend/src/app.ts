// src/app.ts

import express from "express";
import cors from "cors";
import registrationRoutes from "./routes/registrationRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:3000",
  })
);
app.use(express.json());

// Health check - useful to confirm the server is up before wiring anything else
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/principal", registrationRoutes);

export default app;
