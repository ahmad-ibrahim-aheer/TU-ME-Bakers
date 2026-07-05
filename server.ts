import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini SDK lazily
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI Assistant will operate in fallback mode.");
    }
    ai = new GoogleGenAI({
      apiKey: apiKey || "dummy_key",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

app.use(express.json());

// API: Assistant Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemInstruction = `
You are the polite, friendly, and professional AI virtual concierge for "TU & ME MART AND BAKERS" located in Sargodha Cantt, Pakistan.
Your goal is to assist customers, answer questions about products, recommend baked goods, take inquiries about custom order requirements, and tell them about the shop.

Key Shop Information:
- Name: TU & ME MART AND BAKERS
- Google Rating: 5.0 out of 5 stars (based on 21 glowing reviews!)
- Phone: +92 303 7041468
- Address: Mushaf Ali Mir Rd, Cantt View, Sargodha 40100, Pakistan
- Hours: Open 7 days a week, until 12:00 AM midnight daily.
- Specialties / Popular items:
  * Gourmet Chocolate Fudge Pastries (Rs. 180) - Incredibly rich and fresh.
  * Chicken Tikka Pizza Slice (Rs. 220) - Stringy mozzarella, spicy tandoori chicken chunks.
  * Butter Croissants (Rs. 150) - Layered and flaky, baked fresh every morning.
  * Custom Celebration Cakes (approx. Rs. 1800 per kg) - Specially crafted for birthdays, weddings, and anniversaries in Sargodha.
  * Fresh Dairy & Mart Items - Pure organic Sargodha honey (Rs. 950), local organic farm eggs (Rs. 280/dozen), creamy dairy yogurt, snacks, beverages, spreads.
- Key Strengths: Double-emphasize that customers praise our extreme cleanliness, polite and highly professional staff, reasonable prices, and pristine freshness.

Guidance:
1. Always be extremely hospitable, respectful, and friendly.
2. If asked, you can speak in English, Urdu, or polite Roman Urdu (e.g., "Aapka khush-amdeed!", "Hum Cantt View Sargodha mein Mushaf Ali Mir road par waqia hain.").
3. Assist customers with calculating prices or customizing their order. For example, if they request birthday cakes, ask what flavor (e.g. Chocolate, Red Velvet, Vanilla) and weight (e.g. 1kg, 2kg) they need, and suggest they add pastries or pizza slices to make their celebration complete!
4. Direct them to use the interactive order/cart on the screen to compile their order and send it directly to our phone via WhatsApp (+92 303 7041468) for immediate delivery or pickup.
5. Keep your responses structured, beautiful, and fairly concise.
`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a simulated, friendly response if API key is missing
      return res.json({
        text: `Assalamu Alaikum! Welcome to **TU & ME MART AND BAKERS**! 🍰✨ I am operating in greeting mode because the AI model key is pending configuration, but I can happily tell you that we are open today at Cantt View Sargodha until 12:00 AM! How can I help you today? You can order our famous fresh Chicken Tikka Pizza Slices or Chocolate Fudge Pastries right now!`
      });
    }

    const client = getGeminiClient();

    // Map history to the format expected by Gemini Chats API
    // sendMessage handles message sending to a chat session.
    // Let's use ai.models.generateContent with the full conversation for robustness!
    const contents = [];
    
    // Add history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }
    
    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: "Something went wrong while chatting with the AI assistant. Please try again." });
  }
});

// Vite middleware configuration for full-stack SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TU & ME MART AND BAKERS server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
