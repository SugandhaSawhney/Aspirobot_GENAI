const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Gemini route
app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

// OpenAI TTS route
app.post("/api/tts", async (req, res) => {
  const { text } = req.body;

  try {
    const ttsRes = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: "nova",
      }),
    });

    if (!ttsRes.ok) {
      const err = await ttsRes.text();
      console.error("TTS error:", err);
      return res.status(500).json({ error: "TTS failed" });
    }

    const audio = await ttsRes.arrayBuffer();
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audio.byteLength,
    });
    res.send(Buffer.from(audio));
  } catch (err) {
    console.error("TTS error:", err);
    res.status(500).json({ error: "TTS error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
