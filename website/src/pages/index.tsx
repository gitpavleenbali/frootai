import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

// ─── Data ──────────────────────────────────────────────────────────

const layers = [
  { id: "F", icon: "🌱", title: "Foundations", color: "#f59e0b", modules: [
    { id: "F1", name: "GenAI Foundations", link: "/docs/GenAI-Foundations" },
    { id: "F2", name: "LLM Landscape", link: "/docs/LLM-Landscape" },
    { id: "F3", name: "AI Glossary A–Z", link: "/docs/F3-AI-Glossary-AZ" },
  ]},
  { id: "R", icon: "🪵", title: "Reasoning", color: "#10b981", modules: [
    { id: "R1", name: "Prompt Engineering", link: "/docs/Prompt-Engineering" },
    { id: "R2", name: "RAG Architecture", link: "/docs/RAG-Architecture" },
    { id: "R3", name: "Deterministic AI", link: "/docs/R3-Deterministic-AI" },
  ]},
  { id: "O¹", icon: "🌿", title: "Orchestration", color: "#06b6d4", modules: [
    { id: "O1", name: "Semantic Kernel", link: "/docs/Semantic-Kernel" },
    { id: "O2", name: "AI Agents", link: "/docs/AI-Agents-Deep-Dive" },
    { id: "O3", name: "MCP & Tools", link: "/docs/O3-MCP-Tools-Functions" },
  ]},
  { id: "O²", icon: "🍃", title: "Operations", color: "#6366f1", modules: [
    { id: "O4", name: "Azure AI Platform", link: "/docs/Azure-AI-Foundry" },
    { id: "O5", name: "AI Infrastructure", link: "/docs/AI-Infrastructure" },
    { id: "O6", name: "Copilot Ecosystem", link: "/docs/Copilot-Ecosystem" },
  ]},
  { id: "T", icon: "🍎", title: "Transformation", color: "#7c3aed", modules: [
    { id: "T1", name: "Fine-Tuning", link: "/docs/T1-Fine-Tuning-MLOps" },
    { id: "T2", name: "Responsible AI", link: "/docs/Responsible-AI-Safety" },
    { id: "T3", name: "Production Patterns", link: "/docs/T3-Production-Patterns" },
  ]},
];

const outcomes = [
  { icon: "🚀", title: "New to AI?", desc: "Build AI literacy from zero — tokens, models, glossary" },
  { icon: "🤖", title: "Build Agents", desc: "Design multi-agent systems with MCP, SK, Agent Framework" },
  { icon: "🏗️", title: "AI Infra Expert", desc: "Deploy landing zones, GPU, hosting at scale" },
  { icon: "🎛️", title: "Fine-Tuning Pro", desc: "LoRA, evaluation pipelines, production patterns" },
  { icon: "🛡️", title: "Reliable AI", desc: "Determinism, grounding, guardrails, safety" },
  { icon: "🔗", title: "Bridge the Gap", desc: "Remove silos between infra, platform, and app teams" },
];

// ─── Components ────────────────────────────────────────────────────

function ExpandableLayer({ layer }: { layer: typeof layers[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${layer.color}33`, borderRadius: "12px", overflow: "hidden", marginBottom: "8px" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", background: "transparent", border: "none", cursor: "pointer", color: "var(--ifm-font-color-base)" }}>
        <span style={{ fontSize: "1.2rem" }}>{layer.icon}</span>
        <span style={{ fontWeight: 700, fontSize: "0.88rem", color: layer.color }}>{layer.id} — {layer.title}</span>
        <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "var(--ifm-color-emphasis-400)" }}>{layer.modules.length} modules {open ? "▼" : "▶"}</span>
      </button>
      {open && (
        <div style={{ display: "flex", gap: "8px", padding: "0 16px 12px", flexWrap: "wrap" }}>
          {layer.modules.map((m) => (
            <Link key={m.id} to={m.link} style={{ padding: "6px 14px", borderRadius: "8px", border: `1px solid ${layer.color}33`, fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", color: "var(--ifm-font-color-base)" }}
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }), 100)}>
              {m.id}: {m.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────

export default function FrootAIPage(): JSX.Element {
  return (
    <Layout title="FrootAI — From the Roots to the Fruits. Build It Yourself." description="Power kit for infrastructure and platform people to master AI applications, agents, and the GenAI ecosystem.">

      {/* ═══ 1. HERO ═══ */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <img src="/frootai/img/aifroot-logo.svg" alt="FrootAI" className={styles.heroLogo} />
          <h1 className={styles.heroTitle}>FrootAI</h1>
          <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ifm-color-emphasis-600)", margin: "4px auto 6px", letterSpacing: "0.01em" }}>
            From the Roots to the Fruits. Build It Yourself.
          </p>
          <p className={styles.heroAcronym}>
            AI <span className={styles.heroAcronymF}>F</span>oundations · <span className={styles.heroAcronymR}>R</span>easoning · <span className={styles.heroAcronymO1}>O</span>rchestration · <span className={styles.heroAcronymO2}>O</span>perations · <span className={styles.heroAcronymT}>T</span>ransformation
          </p>
          <p style={{ fontSize: "0.82rem", fontStyle: "italic", color: "var(--ifm-color-emphasis-500)", margin: "6px auto 0", maxWidth: "560px", lineHeight: 1.5 }}>
            Build It Yourself — a power kit for infrastructure and platform people to master and bridge the gap with AI applications, agents, and the GenAI ecosystem.
          </p>
        </div>
      </div>

      <main className={styles.main}>

        {/* ═══ 2. ECOSYSTEM (clickable, glowing cards) ═══ */}
        <section className={styles.lensSection}>
          <h2 className={styles.sectionTitle}>The Ecosystem</h2>
          <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--ifm-color-emphasis-400)", textAlign: "center", marginBottom: "16px" }}>Click on the cards to explore more</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            {[
              { to: "/ecosystem", icon: "💻", title: "VS Code Extension", sub: "For you (the human)", color: "99, 102, 241" },
              { to: "/mcp-tooling", icon: "📦", title: "MCP Server (npm)", sub: "For your agent (the AI)", color: "16, 185, 129" },
              { to: "/solution-plays", icon: "🎯", title: "Solution Plays", sub: "DevKit + TuneKit", color: "124, 58, 237" },
            ].map((card) => (
              <Link key={card.title} to={card.to} style={{ display: "block", padding: "18px", borderRadius: "14px", border: `2px solid rgba(${card.color}, 0.2)`, textDecoration: "none", color: "var(--ifm-font-color-base)", textAlign: "center", transition: "all 0.25s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(${card.color}, 0.6)`; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px rgba(${card.color}, 0.15)`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(${card.color}, 0.2)`; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "4px" }}>{card.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{card.title}</div>
                <div style={{ fontSize: "0.72rem", color: `rgba(${card.color}, 1)` }}>{card.sub}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ 3. STATS BAR ═══ */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", padding: "16px 0", marginBottom: "8px", flexWrap: "wrap" }}>
          {[
            { num: "17+", label: "Modules", color: "#10b981" },
            { num: "20", label: "Solution Plays", color: "#06b6d4" },
            { num: "6", label: "MCP Tools", color: "#6366f1" },
            { num: "200+", label: "AI Terms", color: "#7c3aed" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: "0.7rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ifm-color-emphasis-400)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ═══ 4. AI KNOWLEDGE HUB — FROOT Framework (expandable) ═══ */}
        <section className={styles.lensSection}>
          <h2 className={styles.sectionTitle}>AI Knowledge Hub</h2>
          <p className={styles.sectionSub}>The FROOT Framework — 5 layers, 17 modules. Click to expand.</p>
          {layers.map((l) => <ExpandableLayer key={l.id} layer={l} />)}
        </section>

        {/* ═══ 5. WHAT YOU'LL ACHIEVE (outcome cards) ═══ */}
        <section className={styles.lensSection}>
          <h2 className={styles.sectionTitle}>What These Help You Achieve</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {outcomes.map((o) => (
              <div key={o.title} style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--ifm-color-emphasis-200)", textAlign: "center" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{o.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "2px" }}>{o.title}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--ifm-color-emphasis-500)" }}>{o.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 6. CTA — The Open Glue (loop back to everything) ═══ */}
        <section className={styles.ctaSection}>
          <h2 className={styles.sectionTitle}>The Open Glue for Infrastructure & Platform Teams</h2>
          <p className={styles.ctaDesc}>
            From the roots to the fruits — the power kit that bridges infra, platform, and the GenAI ecosystem. Build it yourself.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
            {[
              { label: "🎓 AI Knowledge Hub", to: "/docs/" },
              { label: "🔗 Ecosystem", to: "/ecosystem" },
              { label: "🎯 Solution Plays", to: "/solution-plays" },
              { label: "🔌 MCP Tooling", to: "/mcp-tooling" },
              { label: "📦 Packages", to: "/packages" },
              { label: "⭐ Star on GitHub", to: "https://github.com/gitpavleenbali/frootai" },
            ].map((link) => (
              <Link key={link.label} to={link.to} style={{ padding: "8px 18px", borderRadius: "10px", border: "1px solid var(--ifm-color-emphasis-200)", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none", color: "var(--ifm-font-color-base)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#10b981"; (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--ifm-color-emphasis-200)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }), 100)}>
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
