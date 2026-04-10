// api/chat.mjs — Vercel ESM serverless function
// Proxies chat requests to Google Gemini 2.5 Flash

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// Helper: set all CORS headers and return res for chaining
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    setCors(res);
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    setCors(res);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    setCors(res);
    return res.status(500).json({ error: "GEMINI_API_KEY environment variable is not set." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    setCors(res);
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const { system, messages } = body ?? {};

  if (!messages || !Array.isArray(messages)) {
    setCors(res);
    return res.status(400).json({ error: "Missing or invalid messages array" });
  }

  // Gemini uses "user" / "model" roles (not "assistant")
  // Inject the system prompt as the first user/model exchange
  const contents = [
    { role: "user",  parts: [{ text: system ?? "You are a helpful assistant." }] },
    { role: "model", parts: [{ text: "Understood." }] },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  let geminiRes;
  try {
    geminiRes = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({ contents }),
    });
  } catch (networkErr) {
    setCors(res);
    return res.status(502).json({ error: `Network error reaching Gemini: ${networkErr.message}` });
  }

  // Use text() then JSON.parse() for better error visibility
  const rawText = await geminiRes.text();
  let geminiData;
  try {
    geminiData = JSON.parse(rawText);
  } catch {
    setCors(res);
    return res.status(502).json({ error: `Non-JSON response from Gemini: ${rawText.slice(0, 300)}` });
  }

  if (!geminiRes.ok) {
    const errMsg =
      geminiData?.error?.message ??
      geminiData?.error ??
      `Gemini API error ${geminiRes.status}`;
    setCors(res);
    return res.status(geminiRes.status).json({ error: errMsg });
  }

  // Extract reply text from Gemini response shape
  const reply =
    geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Sorry, I received an empty response from Gemini.";

  // Return in Anthropic-compatible shape so the frontend doesn't need changes
  setCors(res);
  return res.status(200).json({ content: [{ type: "text", text: reply }] });
}
