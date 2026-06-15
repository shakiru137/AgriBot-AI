import express from "express";
import { chatWithGemini } from "../services/geminiService.js";

const router = express.Router();

/**
 * POST /api/chat
 * Body: { message: string, history: Array, language: string }
 */
router.post("/", async (req, res, next) => {
  try {
    const { message, history = [], language = "en-NG" } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    const reply = await chatWithGemini(message.trim(), history);

    res.json({
      success: true,
      reply,
      language,
    });
  } catch (error) {
    next(error);
  }
});

export default router;