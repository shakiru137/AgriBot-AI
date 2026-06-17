import textToSpeech from "@google-cloud/text-to-speech";
import dotenv from "dotenv";

dotenv.config();

const client = new textToSpeech.TextToSpeechClient();

const VOICE_CONFIG = {
  "en-NG": { languageCode: "en-NG", name: "en-NG-Standard-A", ssmlGender: "FEMALE" },
  "en-US": { languageCode: "en-US", name: "en-US-Neural2-F", ssmlGender: "FEMALE" },
  "yo-NG": { languageCode: "yo-NG", name: "yo-NG-Standard-A", ssmlGender: "FEMALE" },
  "ha-NG": { languageCode: "ha-NG", name: "ha-NG-Standard-A", ssmlGender: "MALE" },
  "ig-NG": { languageCode: "ig-NG", name: "ig-NG-Standard-A", ssmlGender: "FEMALE" },
};

/**
 * Convert text to speech audio
 * @param {string} text - Text to synthesize
 * @param {string} languageCode - BCP-47 language code
 * @returns {Buffer} - MP3 audio buffer
 */
export async function synthesizeSpeech(text, languageCode = "en-NG") {
  try {
    const voiceConfig = VOICE_CONFIG[languageCode] || VOICE_CONFIG["en-NG"];

    const request = {
      input: { text },
      voice: voiceConfig,
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 0.95,
        pitch: 0.0,
      },
    };

    const [response] = await client.synthesizeSpeech(request);

    if (!response.audioContent) {
      throw new Error("No audio generated.");
    }

    return response.audioContent;
  } catch (error) {
    console.error("❌ TTS Error:", error.message);
    throw new Error("Speech synthesis failed. Please try again.");
  }
}