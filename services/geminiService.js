import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
console.log("🔑 Gemini Key loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const AGRO_SYSTEM_PROMPT = `You are AgroVoice AI, a friendly and knowledgeable farming assistant 
built specifically for Nigerian farmers. You help with crop advice, pest management, 
soil health, weather-based planting decisions, and harvest guidance.

IMPORTANT RULES:
- Always give practical, actionable advice suited to Nigerian farming conditions.
- If the user speaks in Nigerian Pidgin, ALWAYS respond in Nigerian Pidgin.
- If the user speaks in English, respond in clear simple English.
- Keep responses concise — this is a voice assistant on a smartwatch, so be brief (3–5 sentences max).
- Focus only on farming, agriculture, weather, and related rural topics.
- Be warm, encouraging, and human. Farmers are your community.
- When mentioning crops, reference crops common in Nigeria: maize, cassava, yam, rice, tomatoes, peppers, groundnuts, sorghum, millet, cowpea, etc.
- When giving pest/disease advice, recommend locally accessible solutions where possible.
- If asked something outside farming, gently redirect: "I dey specialize for farming matters. How I fit help you with your farm today?"`;

/**
 * Send a message to Gemini AI with farming context
 * @param {string} userMessage - The user's text message
 * @param {Array} history - Previous conversation turns [{role, content}]
 * @returns {string} - AI response text
 */
export async function chatWithGemini(userMessage, history = []) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: AGRO_SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history.map((turn) => ({
        role: turn.role,
        parts: [{ text: turn.content }],
      })),
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    console.error("❌ Full error:", JSON.stringify(error, null, 2));
    throw new Error("AI service unavailable. Please try again.");
  }
}