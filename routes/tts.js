import express from "express";
import { synthesizeSpeech } from "../services/ttsService.js";

const router = express.Router();

/**
 * POST /api/tts
 * Body: { text: string, language: string }
 */
router.post("/", async (req, res, next) => {
  try {
    const { text, language = "en-NG" } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required." });
    }

    const audioBuffer = await synthesizeSpeech(text.trim(), language);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length,
      "Content-Disposition": "inline; filename=response.mp3",
    });

    res.send(audioBuffer);
  } catch (error) {
    next(error);
  }
});

export default router;