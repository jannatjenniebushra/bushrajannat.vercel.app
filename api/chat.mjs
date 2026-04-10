// api/chat.mjs — Vercel ESM serverless function
// Proxies chat requests to Google Gemini 2.5 Flash

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).set(CORS_HEADERS).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .set(CORS_HEADERS)
      .json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .set(CORS_HEADERS)
      .json({ error: "GEMINI_API_KEY environment variable is not set." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res
      .status(400)
      .set(CORS_HEADERS)
      .json({ error: "Invalid JSON body" });
  }

  const { system, messages } = body ?? {};

  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .set(CORS_HEADERS)
      .json({ error: "Missing or invalid messages array" });
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
    return res
      .status(502)
      .set(CORS_HEADERS)
      .json({ error: `Network error reaching Gemini: ${networkErr.message}` });
  }

  // Use text() then JSON.parse() for better error visibility
  const rawText = await geminiRes.text();
  let geminiData;
  try {
    geminiData = JSON.parse(rawText);
  } catch {
    return res
      .status(502)
      .set(CORS_HEADERS)
      .json({ error: `Non-JSON response from Gemini: ${rawText.slice(0, 300)}` });
  }

  if (!geminiRes.ok) {
    const errMsg =
      geminiData?.error?.message ??
      geminiData?.error ??
      `Gemini API error ${geminiRes.status}`;
    return res
      .status(geminiRes.status)
      .set(CORS_HEADERS)
      .json({ error: errMsg });
  }

  // Extract reply text from Gemini response shape
  const reply =
    geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Sorry, I received an empty response from Gemini.";

  // Return in Anthropic-compatible shape so the frontend doesn't need changes
  return res
    .status(200)
    .set(CORS_HEADERS)
    .json({ content: [{ type: "text", text: reply }] });
}
