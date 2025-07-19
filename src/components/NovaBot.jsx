import { useEffect, useRef, useState } from "react";
import "./NovaBot.css";

const GEMINI_API_KEY = "AIzaSyAdpwYMxdRI_SGI_yofknukC0ZrhXW5040";
const OPENAI_API_KEY = "AIzaSyBglRQTl0RQGgcNXsFeQ_sJGNn9DX2lECQ";

const NovaBot = () => {
  const hasGreetedRef = useRef(false);
  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [ step, setStep] = useState(0);
  const stepRef = useRef(0);
  const updateStep = (newStep) => {
    setStep(newStep);
    stepRef.current = newStep;
  };

  const [typing, setTyping] = useState(false);

  const [userProfile, setUserProfile] = useState({
    education: "",
    interests: "",
    skills: "",
    location: "",
  });
  //GEMINI RESPONSE FORMAT
 const formatGeminiResponse = (text) => {
  if (!text) return "";

  let formatted = text;

  // --- Headings ---
  formatted = formatted
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // --- Bold (**bold**) ---
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // --- Italics (*italic*) ---
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // --- Numbered Lists ---
  formatted = formatted.replace(/((?:^\d+\.\s.*(?:\r?\n)?)+)/gm, (match) => {
    const items = match
      .trim()
      .split(/\n+/)
      .map((line) => line.replace(/^\d+\.\s/, "").trim())
      .filter(Boolean)
      .map((line) => `<li>${line}</li>`)
      .join("");
    return `<ol>${items}</ol>`;
  });

  // --- Bullet Lists (* or -) ---
  formatted = formatted.replace(/((?:^(\*|-)\s.*(?:\r?\n)?)+)/gm, (match) => {
    const items = match
      .trim()
      .split(/\n+/)
      .map((line) => line.replace(/^(\*|-)\s/, "").trim())
      .filter(Boolean)
      .map((line) => `<li>${line}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  // --- Paragraphs (2+ newlines) ---
  formatted = formatted
    .split(/\n{2,}/)
    .map((block) => {
      if (
        block.startsWith("<ol>") ||
        block.startsWith("<ul>") ||
        block.startsWith("<h") ||
        block.startsWith("<p>") ||
        block.includes("<li>")
      ) {
        return block;
      }
      return `<p>${block.trim()}</p>`;
    })
    .join("");

  return formatted;
};



  useEffect(() => {
    if (!hasGreetedRef.current) {
      appendMessage("Bot", "Hi there! I'm Nova 🎓 your career and exam planner. Let's get started! What's your current education background?");
      hasGreetedRef.current = true;
      updateStep(0);
    }
    setupSpeechRecognition();
  }, []);

  const setupSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;

      recognition.onresult = async (event) => {
        const userText = event.results[0][0].transcript;
        appendMessage("You", userText);
        await handleAIResponse(userText);
      };

      recognition.onend = () => {
        const recordBtn = document.getElementById("recordButton");
        if (recordBtn) recordBtn.innerText = "🎙 Hold to Speak";
      };

      recognitionRef.current = recognition;
    }
  };

  const appendMessage = (sender, message) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [...prev, { sender, text: message, timestamp }]);

    setTimeout(() => {
      if (chatWindowRef.current) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleSend = async () => {
    const userText = inputRef.current.value.trim();
    if (!userText) return;

    appendMessage("You", userText);
    inputRef.current.value = "";
    await handleAIResponse(userText);
  };

  const handleVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      document.getElementById("recordButton").innerText = "🎙 Listening...";
    }
  };

  const handleAIResponse = async (text) => {
    setTyping(true);
    let newProfile = { ...userProfile };

    if (stepRef.current === 0) {
      newProfile.education = text;
      appendMessage("Bot", "Great! What are you currently studying?");
      updateStep(1);
      setUserProfile(newProfile);
      setTyping(false);
      return;
    }

    if (stepRef.current === 1) {
      newProfile.interests = text;
      appendMessage("Bot", "Awesome! What are your future goals or aspirations?");
      updateStep(2);
      setUserProfile(newProfile);
      setTyping(false);
      return;
    }

    if (stepRef.current === 2) {
      newProfile.skills = text;
      appendMessage("Bot", "Nice! Lastly, where are you currently located?");
      updateStep(3);
      setUserProfile(newProfile);
      setTyping(false);
      return;
    }

    if (stepRef.current === 3) {
      newProfile.location = text;
      appendMessage("Bot", "Perfect! Let me analyze and get the best suggestions for you... 🎯");
      updateStep(4);
      setUserProfile(newProfile);

      const inputQuery = `
Based on this user profile:
- Education: ${newProfile.education}
- Currently Studying: ${newProfile.interests}
- Aspirations/Goals: ${newProfile.skills}
- Location: ${newProfile.location}

Suggest:
1. Top 3 personalized career paths (with reasoning)
2. Relevant online/offline skill development programs
3. Active scholarships or entrance exams

Use a clear and friendly tone.`;

      const geminiFormattedInput = [
  {
    role: "user",
    parts: [{ text: inputQuery }]
  }
];

const response = await getGeminiResponse(geminiFormattedInput);
const formattedResponse = formatGeminiResponse(response);

appendMessage("Bot", formattedResponse);
speakText(response); // original text, not HTML

// save to conversation history (optional)
setConversationHistory((prev) => [
  ...prev,
  { role: "user", parts: [{ text: inputQuery }] },
  { role: "model", parts: [{ text: response }] }
]);

setTyping(false);
return;
    }
    // After step 4: general AI conversation
    // Step 1: Add user message to conversation history
const updatedHistory = [
  ...conversationHistory,
  { role: "user", parts: [{ text }] },
];

// Step 2: Send full history to Gemini
const response = await getGeminiResponse(updatedHistory);

// Step 3: Add bot response to history
const finalHistory = [
  ...updatedHistory,
  { role: "model", parts: [{ text: response }] },
];

// Step 4: Update memory and show on screen
setConversationHistory(finalHistory);
appendMessage("Bot", response);
speakText(response);
setTyping(false);
  }; // ✅ THIS was the missing closing brace!

  const getGeminiResponse = async (history) => {
  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const body = {
    contents: history,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Gemini API failed.";
  }
};
  const speakText = async (text) => {
    try {
      const res = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1",
          input: text,
          voice: "nova",
          speed: 1.0,
        }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    } catch (err) {
      console.error("TTS Error:", err);
    }
  };

  return (
    <div className="nova-container">
      <div className="nova-heading">
        <h1>NOVA: <span>Your personalized career guidance bot, Ask Anything!! </span></h1>
      </div>

      <div id="chatWindow" ref={chatWindowRef} className="chat-window">
        {messages.map((msg, idx) => (
          <div
            className={`chat-bubble ${msg.sender === "You" ? "chat-user" : "chat-bot"}`}
            key={idx}
          >
            <img
              src={msg.sender === "You" ? "/profile.png" : "/chat-bot.png"}
              className="avatar"
              alt="avatar"
            />
            <div>
              <strong>{msg.sender === "You" ? "You" : "Nova"}:</strong>
              <div
  className="response-box"
  dangerouslySetInnerHTML={{ __html: formatGeminiResponse(msg.text) }}
></div>


              <div className="timestamp">{msg.timestamp}</div>
            </div>
          </div>
        ))}
        {typing && <div className="typing-indicator">Nova is typing...</div>}
      </div>

      <div className="d-flex mt-3">
        <input id="userInput" type="text" placeholder="Type something..." ref={inputRef} />
        <button id="sendButton" onClick={handleSend}>Send</button>
      </div>

      <button id="recordButton" onMouseDown={handleVoice}>🎙 Hold to Speak</button>
    </div>
  );
};

export default NovaBot;
