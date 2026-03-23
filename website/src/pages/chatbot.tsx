import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

// Azure Function API URL  update after deploying the Function App
const CHAT_API_URL = "https://frootai-chatbot-api.azurewebsites.net/api/chat";
// Fallback: use simulated responses if API is not reachable
const USE_FALLBACK = true;

const FALLBACK_RESPONSES: Record<string, string> = {
  document: "For document processing, I recommend:\n\nPlay 06 - Document Intelligence (medium)\nAzure Document Intelligence + OpenAI + Blob Storage\n\nOr for multi-modal:\nPlay 15 - Multi-Modal DocProc (medium)\nGPT-4o Vision + Document Intelligence + Cosmos DB\n\nSetup: /user-guide?play=06",
  rag: "For RAG/search solutions:\n\nPlay 01 - Enterprise RAG Q and A (medium)\nAzure AI Search + OpenAI + Container App\n\nPlay 09 - AI Search Portal (medium)\nAzure AI Search + Web App + Semantic Ranking\n\nSetup: /user-guide?play=01",
  agent: "For agent solutions:\n\nPlay 03 - Deterministic Agent (medium)\ntemp=0, JSON schema, verification loops\n\nPlay 07 - Multi-Agent Service (high)\nSupervisor + worker agents, tool routing\n\nSetup: /user-guide?play=03",
  cost: "Cost estimates by scenario:\n\nRAG: $150-300/mo (dev) to $2,000-8,000/mo (prod)\nAgent: $100-250/mo (dev) to $1,500-6,000/mo (prod)\nBatch: $50-150/mo (dev) to $500-3,000/mo (prod)\n\nPlay 14 covers AI Gateway FinOps patterns.\nSetup: /user-guide?play=14",
  mcp: "Quick MCP setup:\n\n1. Add to .vscode/mcp.json:\n   { \"servers\": { \"frootai\": { \"command\": \"npx\", \"args\": [\"frootai-mcp\"] } } }\n\n2. Or install globally: npm install -g frootai-mcp\n\nFull guide: /setup-guide",
  voice: "For voice/call center:\n\nPlay 04 - Call Center Voice AI (high)\nAzure Communication Services + Speech + OpenAI\n\nSetup: /user-guide?play=04",
  landing: "For AI infrastructure:\n\nPlay 02 - AI Landing Zone (foundation)\nVNet + Private Endpoints + RBAC + GPU\n\nPlay 11 - Landing Zone Advanced (high)\nMulti-region, NAT Gateway, Firewall\n\nSetup: /user-guide?play=02",
};

function getFallbackResponse(message: string): string {
  const q = message.toLowerCase();
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (q.includes(key)) return response;
  }
  return "I can help you find the right solution play! Try asking about:\n- Document processing\n- RAG / search\n- AI agents\n- Cost optimization\n- MCP setup\n- Voice AI\n- Landing zones\n\nOr visit /configurator for a guided 3-step recommendation.";
}

export default function ChatbotPage(): JSX.Element {
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: string; text: string}>>([
    { role: "assistant", text: "Hi! I am the FrootAI Assistant, powered by Azure OpenAI GPT-4.1. I can help you:\n\n- Pick the right solution play for your use case\n- Compare Azure AI models and estimate costs\n- Guide you through DevKit + TuneKit setup\n- Navigate the FrootAI ecosystem\n\nWhat would you like to build?" }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSend = async () => {
    if (!userMessage.trim() || loading) return;
    const newHistory = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(newHistory);
    setUserMessage("");
    setLoading(true);

    try {
      // Try Azure Function API first
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: newHistory.slice(-10).map(m => ({ role: m.role, content: m.text })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setChatHistory([...newHistory, { role: "assistant", text: data.reply }]);
      } else {
        throw new Error("API returned " + res.status);
      }
    } catch {
      // Fallback to simulated responses
      if (USE_FALLBACK) {
        const fallback = getFallbackResponse(userMessage);
        setChatHistory([...newHistory, { role: "assistant", text: fallback }]);
      } else {
        setChatHistory([...newHistory, { role: "assistant", text: "Sorry, I could not reach the AI service. Please try again or use the MCP Server: npx frootai-mcp" }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="FAI Assistant - FrootAI" description="Ask the FrootAI Assistant which solution play to use, compare models, estimate costs. Powered by Azure OpenAI GPT-4.1.">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>FrootAI Assistant</h1>
          <p style={{ color: "var(--ifm-color-emphasis-500)", fontSize: "0.9rem" }}>
            Powered by Azure OpenAI GPT-4.1. Grounded in FrootAI ecosystem knowledge.
          </p>
        </div>

        <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", background: "rgba(26,26,46,0.5)", minHeight: "400px", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", maxHeight: "500px" }}>
            {chatHistory.map((msg, i) => (
              <div key={i} style={{ marginBottom: "16px", display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: "12px", background: msg.role === "user" ? "rgba(0, 200, 83, 0.15)" : "rgba(99, 102, 241, 0.1)", border: `1px solid ${msg.role === "user" ? "rgba(0,200,83,0.3)" : "rgba(99,102,241,0.2)"}`, whiteSpace: "pre-wrap", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
                <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(99, 102, 241, 0.1)", border: "1px solid rgba(99,102,241,0.2)", fontSize: "0.85rem", color: "var(--ifm-color-emphasis-400)" }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "8px" }}>
            <input value={userMessage} onChange={(e) => setUserMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask: Which play for document processing?" style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#e0e0e0", fontSize: "0.85rem", outline: "none" }} disabled={loading} />
            <button onClick={handleSend} disabled={loading} style={{ padding: "10px 20px", borderRadius: "8px", background: loading ? "#555" : "#00C853", color: "#000", border: "none", fontWeight: 700, cursor: loading ? "default" : "pointer", fontSize: "0.85rem" }}>{loading ? "..." : "Send"}</button>
          </div>
        </div>

        <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/configurator" className={styles.glowPill} style={{ "--pill-color": "#f59e0b" } as React.CSSProperties}>Solution Configurator</Link>
          <Link to="/setup-guide" className={styles.glowPill} style={{ "--pill-color": "#10b981" } as React.CSSProperties}>Setup Guide</Link>
          <Link to="/mcp-tooling" className={styles.glowPill} style={{ "--pill-color": "#6366f1" } as React.CSSProperties}>16 MCP Tools</Link>
          <Link to="/" className={styles.glowPill} style={{ "--pill-color": "#7c3aed" } as React.CSSProperties}>Back to FrootAI</Link>
        </div>
      </div>
    </Layout>
  );
}