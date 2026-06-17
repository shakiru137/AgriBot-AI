import express from "express";
import { chatWithGemini } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { message, history = [], language = "en-NG" } = req.body;

    console.log("📨 Received message:", message);

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    const reply = await chatWithGemini(message.trim(), history);

    console.log("✅ Reply:", reply);

    res.json({
      success: true,
      reply,
      language,
    });
  } catch (error) {
    console.error("❌ Chat route error:", error.message);
    console.error("❌ Stack:", error.stack);
    next(error);
  }
});

export default router;