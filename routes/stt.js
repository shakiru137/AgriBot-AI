import express from "express";
import multer from "multer";
import { transcribeAudio } from "../services/sttService.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/stt
 * Form-data: { audio: File, language: string }
 */
router.post("/", upload.single("audio"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Audio file is required." });
    }

    const language = req.body.language || "en-NG";
    const transcript = await transcribeAudio(req.file.buffer, language);

    res.json({
      success: true,
      transcript,
      language,
    });
  } catch (error) {
    next(error);
  }
});

export default router;