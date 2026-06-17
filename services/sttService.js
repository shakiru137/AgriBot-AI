import speech from "@google-cloud/speech";
import dotenv from "dotenv";

dotenv.config();

const client = new speech.SpeechClient();

/**
 * Convert audio buffer to text
 * @param {Buffer} audioBuffer - Raw audio data
 * @param {string} languageCode - BCP-47 language code
 * @returns {string} - Transcribed text
 */
export async function transcribeAudio(audioBuffer, languageCode = "en-NG") {
  try {
    const audio = {
      content: audioBuffer.toString("base64"),
    };

    const config = {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 48000,
      languageCode: languageCode,
      alternativeLanguageCodes: [
        "en-NG",
        "yo-NG",
        "ha-NG",
        "ig-NG",
      ],
      enableAutomaticPunctuation: true,
      model: "latest_long",
    };

    const request = { audio, config };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join(" ");

    if (!transcription) {
      throw new Error("No speech detected. Please try again.");
    }

    return transcription.trim();
  } catch (error) {
    console.error("❌ STT Error:", error.message);
    throw new Error("Speech recognition failed. Please try again.");
  }
}