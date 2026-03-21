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
  { icon: "🚀", title: "New to AI?", desc: "Build AI literacy from zero" },
  { icon: "🤖", title: "Build Agents", desc: "MCP, SK, Agent Framework" },
  { icon: "🏗️", title: "AI Infra Expert", desc: "Landing zones, GPU, hosting" },
  { icon: "🎛️", title: "Fine-Tuning Pro", desc: "LoRA, evaluation, MLOps" },
  { icon: "🛡️", title: "Reliable AI", desc: "Determinism, guardrails, safety" },
  { icon: "🔗", title: "Bridge the Gap", desc: "Infra ⇄ Platform ⇄ Apps" },
];

// ─── Glow card helper ──────────────────────────────────────────────

function GlowCard({ to, color, icon, title, sub, children }: { to: string; color: string; icon: string; title: string; sub: string; children?: React.ReactNode }) {
  return (
    <Link to={to} className={styles.glowCard} style={{ "--glow-color": color } as React.CSSProperties}>
      <div style={{ fontSize: "1.8rem", marginBottom: "4px" }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{title}</div>
      <div style={{ fontSize: "0.72rem", color }}>{sub}</div>
      {children}
    </Link>
  );
}

// ─── Expandable FROOT layer ────────────────────────────────────────

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
        <div style={{ display: "flex", gap: "8px", padding: "4px 16px 12px", flexWrap: "wrap" }}>
          {layer.modules.map((m) => (
            <Link key={m.id} to={m.link} className={styles.moduleChip} style={{ borderColor: `${layer.color}44` }}
              onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }), 100)}>
              {m.id}: {m.name} →
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
    <Layout title="FrootAI — From the Roots to the Fruits. Build It Yourself." description="BIY power kit for infrastructure, platform, and application teams to master AI, agents, and the GenAI ecosystem.">

      {/* ═══ 1. HERO ═══ */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <img src="/frootai/img/aifroot-logo.svg" alt="FrootAI" className={styles.heroLogo} />

          {/* Slogan ABOVE FrootAI */}
          <p className={styles.heroLabel}>From the Roots to the Fruits</p>

          {/* Title */}
          <h1 className={styles.heroTitle}>FrootAI</h1>

          {/* FROOT acronym */}
          <p className={styles.heroAcronym}>
            AI <span className={styles.heroAcronymF}>F</span>oundations · <span className={styles.heroAcronymR}>R</span>easoning · <span className={styles.heroAcronymO1}>O</span>rchestration · <span className={styles.heroAcronymO2}>O</span>perations · <span className={styles.heroAcronymT}>T</span>ransformation
          </p>

          {/* Green translucent mission box */}
          <div style={{ maxWidth: "620px", margin: "16px auto 0", padding: "14px 24px", borderRadius: "14px", border: "1px solid rgba(16, 185, 129, 0.25)", background: "linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(99, 102, 241, 0.04))" }}>
            <p style={{ fontSize: "0.84rem", color: "var(--ifm-color-emphasis-600)", lineHeight: 1.6, margin: 0, textAlign: "center" }}>
              <strong>Build It Yourself (BIY)</strong> — A power kit for infrastructure, platform, and application teams to master and bridge the gap with AI applications, agents, and the GenAI ecosystem.
            </p>
          </div>
        </div>
      </div>

      <main className={styles.main}>

        {/* ═══ 2. ECOSYSTEM (glowing cards) ═══ */}
        <section className={styles.lensSection}>
          <h2 className={styles.sectionTitle}>The Ecosystem</h2>
          <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: "var(--ifm-color-emphasis-400)", textAlign: "center", marginBottom: "16px" }}>Click on the cards to explore more</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            <GlowCard to="/ecosystem" color="#6366f1" icon="💻" title="VS Code Extension" sub="For you (the human)" />
            <GlowCard to="/mcp-tooling" color="#10b981" icon="📦" title="MCP Server (npm)" sub="For your agent (the AI)" />
            <GlowCard to="/solution-plays" color="#7c3aed" icon="🎯" title="Solution Plays" sub="DevKit + TuneKit" />
          </div>
        </section>

        {/* ═══ 3. STATS ═══ */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", padding: "12px 0 20px", flexWrap: "wrap" }}>
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

        {/* ═══ 4. AI KNOWLEDGE HUB — FROOT Framework ═══ */}
        <section className={styles.lensSection}>
          <h2 className={styles.sectionTitle}>The FROOT Framework</h2>
          <p className={styles.sectionSub}>AI Knowledge Hub — 5 layers, 17 modules. Click to expand, then click modules to learn.</p>
          {layers.map((l) => <ExpandableLayer key={l.id} layer={l} />)}
        </section>

        {/* ═══ 5. WHAT THESE HELP YOU ACHIEVE ═══ */}
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

        {/* ═══ 6. CTA — BIY Open Glue ═══ */}
        <section className={styles.ctaSection}>
          <h2 className={styles.sectionTitle}>The Build-It-Yourself Open Glue</h2>
          <h3 style={{ fontSize: "0.88rem", fontWeight: 400, color: "var(--ifm-color-emphasis-500)", textAlign: "center", margin: "0 auto 4px" }}>For Infrastructure, Platform, and Application Teams</h3>
          <p style={{ fontSize: "0.82rem", fontStyle: "italic", color: "var(--ifm-color-emphasis-400)", textAlign: "center", margin: "0 auto 20px", maxWidth: "500px" }}>
            Infrastructure are the roots. Platform is the trunk. Application is the fruit.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "🎓 AI Knowledge Hub", to: "/docs/", color: "#f59e0b" },
              { label: "🔗 Ecosystem", to: "/ecosystem", color: "#10b981" },
              { label: "🎯 Solution Plays", to: "/solution-plays", color: "#7c3aed" },
              { label: "📦 Packages", to: "/packages", color: "#06b6d4" },
              { label: "⭐ Star on GitHub", to: "https://github.com/gitpavleenbali/frootai", color: "#f59e0b" },
            ].map((link) => (
              <Link key={link.label} to={link.to} className={styles.glowPill} style={{ "--pill-color": link.color } as React.CSSProperties}
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
