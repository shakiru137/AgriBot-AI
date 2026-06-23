import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import chatRoutes from "./routes/chat.js";
import sttRoutes from "./routes/stt.js";
import ttsRoutes from "./routes/tts.js";
import pipelineRoutes from "./routes/pipeline.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [process.env.CLIENT_URL || "http://localhost:3000", "http://localhost:8081", "http://localhost:8082"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    project: "AgroVoice AI",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/chat", chatRoutes);
app.use("/api/stt", sttRoutes);
app.use("/api/tts", ttsRoutes);
app.use("/api/pipeline", pipelineRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`\n🌾 AgroVoice AI Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health\n`);
});

export default app;