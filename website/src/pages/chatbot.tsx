import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

export default function ChatbotPage(): JSX.Element {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", text: "👋 Hi! I'm the FrootAI Assistant. I can help you pick the right solution play, compare Azure AI models, estimate costs, and guide you through the DevKit + TuneKit setup.\n\nTry asking:\n• \"Which play should I use for document processing?\"\n• \"Compare gpt-4o vs gpt-4o-mini for RAG\"\n• \"How much will an agent solution cost?\"\n• \"How do I set up the MCP server?\"" }
  ]);

  const handleSend = () => {
    if (!userMessage.trim()) return;
    const newHistory = [...chatHistory, { role: "user", text: userMessage }];
    // Simulated responses based on keywords
    let response = "I'm currently in preview mode. For now, try the FrootAI MCP Server — it has 16 tools that answer these questions in real-time via Copilot Chat!\n\n`npx frootai-mcp` → then ask in Copilot Chat.";
    const q = userMessage.toLowerCase();
    if (q.includes("document") || q.includes("ocr") || q.includes("pdf")) {
      response = "📄 For document processing, I recommend:\n\n**Play 06 — Document Intelligence** (medium complexity)\nAzure Document Intelligence + OpenAI + Blob Storage\n\nOr for multi-modal (images + tables + forms):\n**Play 15 — Multi-Modal DocProc** (medium)\nGPT-4o Vision + Document Intelligence + Cosmos DB\n\n👉 [View Play 06](/solution-plays) | [View Play 15](/solution-plays)";
    } else if (q.includes("rag") || q.includes("search") || q.includes("knowledge")) {
      response = "🔍 For RAG/search solutions:\n\n**Play 01 — Enterprise RAG Q&A** (medium)\nAzure AI Search + OpenAI + Container App\nPre-tuned: chunk size 512, hybrid search 0.7 vector weight\n\n**Play 09 — AI Search Portal** (medium)\nAzure AI Search + Web App + Semantic Ranking\n\n👉 [View Play 01](/solution-plays) | [View Play 09](/solution-plays)";
    } else if (q.includes("agent") || q.includes("multi-agent")) {
      response = "🤖 For agent solutions:\n\n**Play 03 — Deterministic Agent** (medium)\ntemp=0, JSON schema validation, verification loops\n\n**Play 07 — Multi-Agent Service** (high)\nSupervisor + worker agents, tool routing, shared memory\n\n👉 [View Play 03](/solution-plays) | [View Play 07](/solution-plays)";
    } else if (q.includes("cost") || q.includes("price") || q.includes("budget")) {
      response = "💰 Cost estimates depend on scale:\n\n| Scenario | Dev | Production |\n|----------|-----|------------|\n| RAG | $150-300/mo | $2,000-8,000/mo |\n| Agent | $100-250/mo | $1,500-6,000/mo |\n| Batch | $50-150/mo | $500-3,000/mo |\n\nFor detailed estimates: `npx frootai-mcp` → use `get_azure_pricing` tool\n\n**Play 14 — Cost-Optimized AI Gateway** is dedicated to FinOps patterns.";
    } else if (q.includes("mcp") || q.includes("setup") || q.includes("install")) {
      response = "🔌 Quick MCP setup:\n\n```json\n// .vscode/mcp.json\n{\n  \"servers\": {\n    \"frootai\": {\n      \"command\": \"npx\",\n      \"args\": [\"frootai-mcp\"]\n    }\n  }\n}\n```\n\nOr install globally: `npm install -g frootai-mcp`\n\n👉 [Full Setup Guide](/setup-guide)";
    }
    newHistory.push({ role: "assistant", text: response });
    setChatHistory(newHistory);
    setUserMessage("");
  };

  return (
    <Layout title="AI Assistant — FrootAI" description="Ask the FrootAI Assistant which solution play to use, compare models, estimate costs.">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>🤖 FrootAI Assistant</h1>
          <p style={{ color: "var(--ifm-color-emphasis-500)", fontSize: "0.9rem" }}>
            AI-powered play recommender. Powered by FrootAI MCP (16 tools).
          </p>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: "20px", background: "rgba(0, 200, 83, 0.1)", border: "1px solid rgba(0, 200, 83, 0.3)", fontSize: "0.75rem", color: "#00C853", fontWeight: 600 }}>
            PREVIEW — Full AI coming soon. Use MCP Server for real-time answers.
          </div>
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
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "8px" }}>
            <input value={userMessage} onChange={(e) => setUserMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask: Which play for document processing?" style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#e0e0e0", fontSize: "0.85rem", outline: "none" }} />
            <button onClick={handleSend} style={{ padding: "10px 20px", borderRadius: "8px", background: "#00C853", color: "#000", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>Send</button>
          </div>
        </div>

        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <h3>💡 For Real-Time AI Answers</h3>
          <p style={{ color: "var(--ifm-color-emphasis-500)", fontSize: "0.85rem" }}>The FrootAI MCP Server provides the same intelligence via 16 tools — directly in your AI agent (Copilot, Claude, Cursor).</p>
          <code style={{ display: "block", padding: "12px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", margin: "12px auto", maxWidth: "300px" }}>npx frootai-mcp</code>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
            <Link to="/setup-guide" className={styles.glowPill} style={{ "--pill-color": "#10b981" } as React.CSSProperties}>📖 Setup Guide</Link>
            <Link to="/mcp-tooling" className={styles.glowPill} style={{ "--pill-color": "#6366f1" } as React.CSSProperties}>🔌 16 MCP Tools</Link>
            <Link to="/" className={styles.glowPill} style={{ "--pill-color": "#f59e0b" } as React.CSSProperties}>🌳 Back to FrootAI</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
