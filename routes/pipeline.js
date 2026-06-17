import express from "express";
import multer from "multer";
import { transcribeAudio } from "../services/sttService.js";
import { chatWithGemini } from "../services/geminiService.js";
import { synthesizeSpeech } from "../services/ttsService.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/pipeline
 * Full voice pipeline: Audio → Text → AI → Audio
 * Form-data: { audio: File, language: string, history: JSON string }
 */
router.post("/", upload.single("audio"), async (req, res, next) => {
  try {
    const language = req.body.language || "en-NG";
    const history = req.body.history ? JSON.parse(req.body.history) : [];

    if (!req.file) {
      return res.status(400).json({ error: "Audio file is required." });
    }

    // Step 1: Speech → Text
    console.log("🎙️  Transcribing audio...");
    const transcript = await transcribeAudio(req.file.buffer, language);
    console.log("📝 Transcript:", transcript);

    // Step 2: Text → Gemini AI
    console.log("🤖 Sending to Gemini AI...");
    const reply = await chatWithGemini(transcript, history);
    console.log("💬 AI Reply:", reply);

    // Step 3: AI Text → Speech
    console.log("🔊 Synthesizing speech...");
    const audioBuffer = await synthesizeSpeech(reply, language);

    res.json({
      success: true,
      transcript,
      reply,
      audio: audioBuffer.toString("base64"),
      language,
    });
  } catch (error) {
    next(error);
  }
});

export default router;