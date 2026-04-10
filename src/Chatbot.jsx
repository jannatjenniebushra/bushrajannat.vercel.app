import { useState, useRef, useEffect } from "react";

// ─── PORTFOLIO DATA ────────────────────────────────────────────────────────────
// data.js uses a named export: export const data = { ... }
import { data as portfolioData } from "./data";

// ─── SYSTEM PROMPT ─────────────────────────────────────────────────────────────
const buildSystemPrompt = (d) => `
You are an AI assistant for ${d.name}'s personal portfolio website.
Your job is to answer questions about ${d.name} in a helpful, concise, and friendly way.

PERSONAL INFO:
Name: ${d.name}
Title: ${d.title}
Email: ${d.email}
Phone: ${d.phone ?? "N/A"}
Website: ${d.portfolio ?? "N/A"}
LinkedIn: ${d.linkedin ?? "N/A"}
GitHub: ${d.github ?? "N/A"}
About: ${d.about ?? "N/A"}

EDUCATION:
${(d.education ?? []).map(e => `- ${e.degree} at ${e.school} (${e.period})`).join("\n")}

SKILLS:
${(d.skills ?? []).map(s => `${s.category}: ${s.items.join(", ")}`).join("\n")}

WORK EXPERIENCE:
${(d.experience ?? []).map(e =>
  `${e.role} at ${e.company} (${e.period})\n${(e.bullets ?? []).map(b => `  - ${b}`).join("\n")}`
).join("\n\n")}

PROJECTS:
${(d.projects ?? []).map(p =>
  `${p.name}\n  ${p.description}\n  Stack: ${(p.tags ?? []).join(", ")}${p.live ? `\n  Live: ${p.live}` : ""}${p.github ? `\n  GitHub: ${p.github}` : ""}`
).join("\n\n")}

RESEARCH / PUBLICATIONS:
${(d.research ?? []).map(r =>
  `${r.title} — ${r.venue}, ${r.date}\n  ${r.description}${r.link ? `\n  Link: ${r.link}` : ""}`
).join("\n\n")}

EXTRACURRICULAR & LEADERSHIP:
${(d.extracurricular ?? []).map(x =>
  `${x.role} at ${x.org} (${x.period})\n${(x.bullets ?? []).map(b => `  - ${b}`).join("\n")}`
).join("\n\n")}

INSTRUCTIONS:
Keep responses under 120 words. Use plain text only — no markdown, no bullet symbols, no asterisks.
Be warm, professional, and speak as if you personally know ${d.name}.
`.trim();

const SYSTEM_PROMPT = buildSystemPrompt(portfolioData);

// ─── QUICK QUESTIONS ───────────────────────────────────────────────────────────
const QUICK_QUESTIONS = [
  "What are your top skills?",
  "Tell me about your projects",
  "What's your educational background?",
  "Do you have any research experience?",
  "What work experience do you have?",
  "How can I contact you?",
];

// ─── ANIMATION STYLES ─────────────────────────────────────────────────────────
const ANIMATION_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');

  @keyframes fabPulse {
    0%   { box-shadow: 0 0 0 0 rgba(0,229,255,0.55); }
    70%  { box-shadow: 0 0 0 18px rgba(0,229,255,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,229,255,0); }
  }
  @keyframes chatOpen {
    from { opacity: 0; transform: scale(0.88) translateY(24px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes chatClose {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to   { opacity: 0; transform: scale(0.88) translateY(24px); }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: translateY(0); }
    40%           { transform: translateY(-7px); }
  }
  @keyframes msgSlideIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .chat-window-open  { animation: chatOpen  0.28s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .chat-window-close { animation: chatClose 0.22s ease-in forwards; }
  .msg-enter         { animation: msgSlideIn 0.22s ease-out both; }
  .fab-pulse         { animation: fabPulse 2.2s infinite; }
  .dot1 { animation: dotBounce 1.1s 0.0s infinite; }
  .dot2 { animation: dotBounce 1.1s 0.18s infinite; }
  .dot3 { animation: dotBounce 1.1s 0.36s infinite; }

  .quick-chip:hover {
    background: rgba(0,229,255,0.18) !important;
    border-color: #00e5ff !important;
    color: #00e5ff !important;
    transform: translateY(-1px);
    transition: all 0.15s ease;
  }
  .send-btn:hover:not(:disabled) { background: #00b8cc !important; }
  .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .reset-btn:hover { color: #00e5ff !important; }
  .msg-input:focus { outline: none; border-color: #00e5ff !important; }
  .msg-input::placeholder { color: rgba(255,255,255,0.3); }
  .msgs-container::-webkit-scrollbar { width: 4px; }
  .msgs-container::-webkit-scrollbar-track { background: transparent; }
  .msgs-container::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.25); border-radius: 99px; }
`;

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen]           = useState(false);
  const [isVisible, setIsVisible]     = useState(false);
  const [phase, setPhase]             = useState(1);
  const [messages, setMessages]       = useState([]);
  const [input, setInput]             = useState("");
  const [isLoading, setIsLoading]     = useState(false);
  const [closingAnim, setClosingAnim] = useState(false);
  const msgsEndRef = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (phase === 2) setTimeout(() => inputRef.current?.focus(), 100);
  }, [phase]);

  const openChat = () => {
    setIsVisible(true);
    setClosingAnim(false);
    setIsOpen(true);
  };

  const closeChat = () => {
    setClosingAnim(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsVisible(false);
      setClosingAnim(false);
    }, 220);
  };

  const toggleChat = () => (isOpen ? closeChat() : openChat());

  const reset = () => {
    setPhase(1);
    setMessages([]);
    setInput("");
  };

  const sendMessage = async (text) => {
    const userText = text.trim();
    if (!userText || isLoading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    if (phase === 1) setPhase(2);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: newMessages }),
      });

      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`Non-JSON response: ${rawText.slice(0, 200)}`);
      }

      if (!res.ok) {
        throw new Error(data?.error?.message ?? data?.error ?? `HTTP ${res.status}`);
      }

      const reply = data?.content?.[0]?.text ?? "Sorry, I got an empty response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: `Error: ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const S = {
    fab: {
      position: "fixed",
      bottom: "max(28px, env(safe-area-inset-bottom, 28px))",
      right: 20,
      width: 56, height: 56, borderRadius: "50%",
      background: "linear-gradient(135deg, #00e5ff 0%, #00b8d4 60%, #0090a8 100%)",
      border: "none", cursor: "pointer", zIndex: 9998,
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "transform 0.2s ease",
    },
    window: {
      position: "fixed",
      bottom: 96,
      right: 20,
      width: "min(400px, calc(100vw - 32px))",
      height: "min(560px, calc(100dvh - 120px))",
      zIndex: 9997,
      display: "flex", flexDirection: "column",
      borderRadius: 20, overflow: "hidden",
      background: "rgba(10, 12, 18, 0.82)",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(0,229,255,0.18)",
      boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,229,255,0.06)",
      fontFamily: "'DM Sans', sans-serif",
    },
    header: {
      padding: "16px 20px",
      borderBottom: "1px solid rgba(0,229,255,0.1)",
      background: "rgba(0,229,255,0.04)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexShrink: 0,
    },
    headerLeft: { display: "flex", alignItems: "center", gap: 10 },
    headerDot: {
      width: 8, height: 8, borderRadius: "50%",
      background: "#00e5ff", boxShadow: "0 0 6px #00e5ff",
    },
    headerTitle: {
      fontFamily: "'Syne', sans-serif", fontWeight: 700,
      fontSize: 15, color: "#e8f4f8", letterSpacing: "0.02em",
    },
    headerSub: {
      fontFamily: "'DM Mono', monospace", fontSize: 10,
      color: "rgba(0,229,255,0.6)", marginTop: 2,
    },
    headerRight: { display: "flex", alignItems: "center", gap: 8 },
    resetBtn: {
      background: "none", border: "1px solid rgba(0,229,255,0.25)",
      borderRadius: 6, color: "rgba(0,229,255,0.6)",
      fontFamily: "'DM Mono', monospace", fontSize: 10,
      padding: "4px 10px", cursor: "pointer",
      transition: "color 0.15s", letterSpacing: "0.05em",
    },
    closeBtn: {
      background: "none", border: "none", cursor: "pointer",
      color: "rgba(255,255,255,0.4)", fontSize: 18,
      lineHeight: 1, padding: 2, display: "flex", transition: "color 0.15s",
    },
    body: {
      flex: 1, overflowY: "auto", padding: "16px 16px 8px",
      display: "flex", flexDirection: "column", gap: 12,
    },
    introWrap: {
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "100%", gap: 20, padding: "0 8px", textAlign: "center",
    },
    introIcon: {
      width: 56, height: 56, borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.03))",
      border: "1px solid rgba(0,229,255,0.25)",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    introTitle: {
      fontFamily: "'Syne', sans-serif", fontWeight: 700,
      fontSize: 17, color: "#e8f4f8", lineHeight: 1.3,
    },
    introSub: { fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 },
    chipsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" },
    chip: {
      background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)",
      borderRadius: 10, color: "rgba(255,255,255,0.7)",
      fontFamily: "'DM Sans', sans-serif", fontSize: 12,
      padding: "10px 12px", cursor: "pointer",
      textAlign: "left", lineHeight: 1.35, transition: "all 0.15s ease",
    },
    msgRow: (role) => ({
      display: "flex",
      justifyContent: role === "user" ? "flex-end" : "flex-start",
      alignItems: "flex-end", gap: 8,
    }),
    bubble: (role) => ({
      maxWidth: "80%", padding: "10px 14px",
      borderRadius: role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
      background: role === "user"
        ? "linear-gradient(135deg, rgba(0,229,255,0.22), rgba(0,180,210,0.15))"
        : "rgba(255,255,255,0.06)",
      border: role === "user"
        ? "1px solid rgba(0,229,255,0.25)"
        : "1px solid rgba(255,255,255,0.07)",
      color: role === "user" ? "#d8f8ff" : "rgba(255,255,255,0.82)",
      fontSize: 13.5, lineHeight: 1.6,
      fontFamily: "'DM Sans', sans-serif", wordBreak: "break-word",
    }),
    typingBubble: {
      display: "flex", alignItems: "center", gap: 5,
      padding: "12px 16px", background: "rgba(255,255,255,0.06)",
      borderRadius: "18px 18px 18px 4px",
      border: "1px solid rgba(255,255,255,0.07)", width: "fit-content",
    },
    dot: { width: 7, height: 7, borderRadius: "50%", background: "#00e5ff" },
    footer: {
      padding: "12px 16px", borderTop: "1px solid rgba(0,229,255,0.08)",
      background: "rgba(0,0,0,0.2)", display: "flex", gap: 10,
      alignItems: "flex-end", flexShrink: 0,
    },
    input: {
      flex: 1, background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(0,229,255,0.15)", borderRadius: 12,
      color: "#e0f7ff", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif",
      padding: "10px 14px", resize: "none", maxHeight: 100,
      overflowY: "auto", lineHeight: 1.5, transition: "border-color 0.15s",
    },
    sendBtn: {
      width: 40, height: 40, borderRadius: 12, background: "#00e5ff",
      border: "none", cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center",
      flexShrink: 0, transition: "background 0.15s", alignSelf: "flex-end",
    },
  };

  return (
    <>
      <style>{ANIMATION_STYLES}</style>

      {/* FAB */}
      <button
        style={S.fab}
        className={isOpen ? "" : "fab-pulse"}
        onClick={toggleChat}
        aria-label="Toggle AI chat"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="3" x2="14" y2="7" stroke="#08080c" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="14" cy="2.5" r="1.5" fill="#08080c"/>
          <rect x="5" y="7" width="18" height="15" rx="4" fill="#08080c" opacity="0.85"/>
          <rect x="8" y="11" width="4" height="4" rx="1.5" fill="#00e5ff"/>
          <rect x="16" y="11" width="4" height="4" rx="1.5" fill="#00e5ff"/>
          <rect x="9.5" y="18" width="9" height="2" rx="1" fill="#00e5ff" opacity="0.6"/>
          <rect x="3" y="12" width="2" height="5" rx="1" fill="#08080c" opacity="0.7"/>
          <rect x="23" y="12" width="2" height="5" rx="1" fill="#08080c" opacity="0.7"/>
        </svg>
      </button>

      {/* Chat Window */}
      {isVisible && (
        <div
          style={S.window}
          className={closingAnim ? "chat-window-close" : "chat-window-open"}
        >
          {/* Header */}
          <div style={S.header}>
            <div style={S.headerLeft}>
              <div style={S.headerDot} />
              <div>
                <div style={S.headerTitle}>Ask about me</div>
                <div style={S.headerSub}>AI · Powered by Gemini</div>
              </div>
            </div>
            <div style={S.headerRight}>
              {phase === 2 && (
                <button className="reset-btn" style={S.resetBtn} onClick={reset}>
                  RESET
                </button>
              )}
              <button
                style={S.closeBtn}
                onClick={closeChat}
                aria-label="Close chat"
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={S.body} className="msgs-container">
            {phase === 1 && messages.length === 0 && (
              <div style={S.introWrap}>
                <div style={S.introIcon}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <circle cx="13" cy="13" r="12" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <circle cx="13" cy="13" r="4" fill="#00e5ff" opacity="0.7"/>
                  </svg>
                </div>
                <div>
                  <div style={S.introTitle}>Hey there! 👋</div>
                  <div style={S.introSub}>Ask me anything about my background.</div>
                </div>
                <div style={S.chipsGrid}>
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      style={S.chip}
                      className="quick-chip"
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={S.msgRow(m.role)} className="msg-enter">
                <div style={S.bubble(m.role)}>{m.content}</div>
              </div>
            ))}

            {isLoading && (
              <div style={S.msgRow("assistant")} className="msg-enter">
                <div style={S.typingBubble}>
                  <div style={S.dot} className="dot1" />
                  <div style={S.dot} className="dot2" />
                  <div style={S.dot} className="dot3" />
                </div>
              </div>
            )}

            <div ref={msgsEndRef} />
          </div>

          {/* Footer */}
          {phase === 2 && (
            <div style={S.footer}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                rows={1}
                style={S.input}
                className="msg-input"
                disabled={isLoading}
              />
              <button
                style={S.sendBtn}
                className="send-btn"
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2 9L15 9M15 9L9.5 3.5M15 9L9.5 14.5"
                    stroke="#08080c" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
