import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

const questions = [
  {
    q: "What are you building?",
    options: [
      { label: "📄 Document processing (OCR, extraction, forms)", tags: ["doc"] },
      { label: "🔍 Search / RAG / Knowledge base", tags: ["rag"] },
      { label: "🤖 AI Agent (autonomous, tool-calling)", tags: ["agent"] },
      { label: "🗣️ Voice / Call center / Speech", tags: ["voice"] },
      { label: "🛡️ Content moderation / Safety", tags: ["safety"] },
      { label: "⛰️ AI Landing Zone / Infrastructure", tags: ["infra"] },
      { label: "📊 Monitoring / Observability / Analytics", tags: ["ops"] },
      { label: "🚀 Model serving / Fine-tuning / MLOps", tags: ["ml"] },
    ],
  },
  {
    q: "What's your team's primary role?",
    options: [
      { label: "⚙️ Infrastructure / Platform Engineering", tags: ["infra-team"] },
      { label: "💻 Application / Full-stack Development", tags: ["dev-team"] },
      { label: "📊 Data / ML Engineering", tags: ["data-team"] },
      { label: "🔒 Security / Compliance", tags: ["sec-team"] },
    ],
  },
  {
    q: "What complexity level fits your timeline?",
    options: [
      { label: "🟢 Low — ship in a week", tags: ["low"] },
      { label: "🟡 Medium — ship in 2-4 weeks", tags: ["medium"] },
      { label: "🔴 High — enterprise-grade, months", tags: ["high"] },
    ],
  },
];

const playRecommendations: Record<string, { plays: string[]; why: string }> = {
  "doc": { plays: ["06", "15"], why: "Document Intelligence + Multi-Modal DocProc cover OCR, forms, PDFs, and images." },
  "rag": { plays: ["01", "09"], why: "Enterprise RAG Q&A for knowledge bases, AI Search Portal for web-facing search." },
  "agent": { plays: ["03", "07", "05"], why: "Deterministic Agent for reliable single agents, Multi-Agent for complex orchestration, IT Ticket Resolution for ITSM." },
  "voice": { plays: ["04"], why: "Call Center Voice AI with Azure Communication Services + Speech." },
  "safety": { plays: ["10"], why: "Content Moderation Pipeline with Azure Content Safety + APIM." },
  "infra": { plays: ["02", "11"], why: "AI Landing Zone for foundations, Advanced for multi-region enterprise." },
  "ops": { plays: ["17", "14"], why: "AI Observability for monitoring, Cost-Optimized Gateway for FinOps." },
  "ml": { plays: ["12", "13"], why: "Model Serving AKS for hosting, Fine-Tuning Workflow for customization." },
};

const playNames: Record<string, string> = {
  "01": "Enterprise RAG Q&A", "02": "AI Landing Zone", "03": "Deterministic Agent",
  "04": "Call Center Voice AI", "05": "IT Ticket Resolution", "06": "Document Intelligence",
  "07": "Multi-Agent Service", "08": "Copilot Studio Bot", "09": "AI Search Portal",
  "10": "Content Moderation", "11": "Landing Zone Advanced", "12": "Model Serving AKS",
  "13": "Fine-Tuning Workflow", "14": "AI Gateway", "15": "Multi-Modal DocProc",
  "16": "Copilot Teams Ext", "17": "AI Observability", "18": "Prompt Management",
  "19": "Edge AI Phi-4", "20": "Anomaly Detection",
};

export default function ConfiguratorPage(): JSX.Element {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (tags: string[]) => {
    const newAnswers = [...answers, ...tags];
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  const getRecommendation = () => {
    const primaryTag = answers[0] || "rag";
    return playRecommendations[primaryTag] || playRecommendations["rag"];
  };

  const showResult = step >= questions.length;
  const rec = showResult ? getRecommendation() : null;

  return (
    <Layout title="Solution Configurator — FrootAI" description="Answer 3 questions and get a personalized AI solution play recommendation.">
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>⚙️ Solution Configurator</h1>
          <p style={{ color: "var(--ifm-color-emphasis-500)", fontSize: "0.9rem" }}>
            Answer 3 questions → get a personalized FrootAI solution play recommendation.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "12px" }}>
            {questions.map((_, i) => (
              <div key={i} style={{ width: "60px", height: "4px", borderRadius: "2px", background: i <= step ? "#00C853" : "rgba(255,255,255,0.1)" }} />
            ))}
          </div>
        </div>

        {!showResult ? (
          <div>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Step {step + 1} of {questions.length}: {questions[step].q}</h2>
            <div style={{ display: "grid", gap: "10px" }}>
              {questions[step].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.tags)} style={{ padding: "14px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(26,26,46,0.5)", color: "#e0e0e0", cursor: "pointer", textAlign: "left", fontSize: "0.9rem", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#00C853"; e.currentTarget.style.background = "rgba(0,200,83,0.05)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(26,26,46,0.5)"; }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: "1.3rem", color: "#00C853", marginBottom: "16px" }}>✅ Your Recommended Plays</h2>
            <p style={{ color: "var(--ifm-color-emphasis-500)", marginBottom: "20px" }}>{rec?.why}</p>
            <div style={{ display: "grid", gap: "12px" }}>
              {rec?.plays.map((id) => (
                <div key={id} style={{ padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(0,200,83,0.3)", background: "rgba(0,200,83,0.05)" }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>Play {id} — {playNames[id]}</div>
                  <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <Link to={`/user-guide?play=${id}`} className={styles.glowPill} style={{ "--pill-color": "#10b981", fontSize: "0.75rem", padding: "4px 12px" } as React.CSSProperties}>📖 User Guide</Link>
                    <Link to="/solution-plays" className={styles.glowPill} style={{ "--pill-color": "#6366f1", fontSize: "0.75rem", padding: "4px 12px" } as React.CSSProperties}>🎯 View Play</Link>
                    <Link to="/setup-guide" className={styles.glowPill} style={{ "--pill-color": "#f59e0b", fontSize: "0.75rem", padding: "4px 12px" } as React.CSSProperties}>🔧 Setup Guide</Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <button onClick={() => { setStep(0); setAnswers([]); }} style={{ padding: "10px 24px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#e0e0e0", cursor: "pointer" }}>🔄 Start Over</button>
            </div>
          </div>
        )}

        <div style={{ marginTop: "40px", textAlign: "center", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/solution-plays" className={styles.glowPill} style={{ "--pill-color": "#6366f1" } as React.CSSProperties}>🎯 All 20 Plays</Link>
          <Link to="/chatbot" className={styles.glowPill} style={{ "--pill-color": "#10b981" } as React.CSSProperties}>🤖 Ask AI Assistant</Link>
          <Link to="/" className={styles.glowPill} style={{ "--pill-color": "#f59e0b" } as React.CSSProperties}>🌳 Back to FrootAI</Link>
        </div>
      </div>
    </Layout>
  );
}
