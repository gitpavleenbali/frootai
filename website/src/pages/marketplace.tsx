import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

/* ------------------------------------------------------------------ */
/*  Featured Plugins (the 20 built-in Solution Plays)                  */
/* ------------------------------------------------------------------ */
const featuredPlugins: { name: string; emoji: string; tag: string }[] = [
  { name: "Enterprise RAG Pipeline", emoji: "🔍", tag: "rag" },
  { name: "AI-Powered Code Review", emoji: "🔬", tag: "code-review" },
  { name: "Intelligent IT Ticket Resolution", emoji: "🎫", tag: "itsm" },
  { name: "Document Intelligence Pipeline", emoji: "📄", tag: "doc-intel" },
  { name: "Multi-Agent Orchestrator", emoji: "🤖", tag: "multi-agent" },
  { name: "AI Cost Optimization Advisor", emoji: "💰", tag: "cost" },
  { name: "Security Copilot Integration", emoji: "🛡️", tag: "security" },
  { name: "Knowledge Mining Platform", emoji: "⛏️", tag: "knowledge" },
  { name: "Customer Service AI Agent", emoji: "🎧", tag: "customer" },
  { name: "DevOps AI Assistant", emoji: "🚀", tag: "devops" },
  { name: "Data Analytics Copilot", emoji: "📊", tag: "analytics" },
  { name: "Compliance & Governance Agent", emoji: "📋", tag: "compliance" },
  { name: "HR Onboarding Assistant", emoji: "👥", tag: "hr" },
  { name: "Sales Intelligence Agent", emoji: "📈", tag: "sales" },
  { name: "Supply Chain Optimizer", emoji: "🏭", tag: "supply-chain" },
  { name: "Healthcare Data Agent", emoji: "🏥", tag: "healthcare" },
  { name: "Financial Risk Analyzer", emoji: "🏦", tag: "finance" },
  { name: "Legal Document Reviewer", emoji: "⚖️", tag: "legal" },
  { name: "Marketing Content Copilot", emoji: "📣", tag: "marketing" },
  { name: "Infrastructure Drift Detector", emoji: "🔧", tag: "infra" },
];

/* ------------------------------------------------------------------ */
/*  Example plugin.json                                                */
/* ------------------------------------------------------------------ */
const exampleManifest = `{
  "name": "my-custom-agent",
  "version": "1.0.0",
  "description": "Summarizes Azure costs and suggests optimizations",
  "author": "your-github-handle",
  "repository": "https://github.com/you/my-custom-agent",
  "type": "agent",
  "tags": ["cost", "azure", "optimization"],
  "entry": "agent.md",
  "mcp_tools": ["get_cost_report", "recommend_savings"],
  "config": "config/openai.json",
  "evaluation": "evaluation/eval.yaml",
  "license": "MIT"
}`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function MarketplacePage(): JSX.Element {
  return (
    <Layout title="Plugin Marketplace — FrootAI" description="Discover, publish, and install community agents, skills, and prompts for FrootAI.">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>🛒 Plugin Marketplace</h1>
          <p style={{ fontSize: "0.95rem", color: "var(--ifm-color-emphasis-500)", maxWidth: "640px", margin: "0 auto" }}>
            A decentralized marketplace where anyone can publish agents, skills, and prompts — discovered via a simple <code>plugin.json</code> manifest.
          </p>
        </div>

        {/* ── How It Works ── */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "20px" }}>📦 How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {[
              {
                step: "1",
                icon: "📝",
                title: "Add plugin.json",
                detail: "Drop a plugin.json manifest in your repo root. It describes your agent, its tools, config, and evaluation scripts.",
              },
              {
                step: "2",
                icon: "🔗",
                title: "Register Your Repo",
                detail: "Open a PR to the FrootAI registry adding your repo URL. The CI validates your manifest automatically.",
              },
              {
                step: "3",
                icon: "🚀",
                title: "Users Discover & Install",
                detail: "Users browse the marketplace, preview your plugin, and install it with one command or via the VS Code extension.",
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--ifm-color-emphasis-200)",
                  background: "rgba(99,102,241,0.02)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "#6366f1" }}>Step {s.step}</span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "6px" }}>{s.title}</h3>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "var(--ifm-color-emphasis-600)" }}>{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Manifest Example ── */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>🧬 Example plugin.json</h2>
          <p style={{ fontSize: "0.82rem", color: "var(--ifm-color-emphasis-500)", marginBottom: "16px" }}>
            Every plugin is discovered by its <code>plugin.json</code>. Here's a minimal example:
          </p>
          <pre style={{
            padding: "20px",
            borderRadius: "14px",
            background: "var(--ifm-color-emphasis-100)",
            fontSize: "0.8rem",
            lineHeight: 1.7,
            overflowX: "auto",
          }}>
            <code>{exampleManifest}</code>
          </pre>
          <div style={{ marginTop: "12px" }}>
            <table style={{ width: "100%", fontSize: "0.8rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid var(--ifm-color-emphasis-200)" }}>
                  <th style={{ padding: "8px 12px" }}>Field</th>
                  <th style={{ padding: "8px 12px" }}>Required</th>
                  <th style={{ padding: "8px 12px" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["name", "✅", "Unique plugin identifier (kebab-case)"],
                  ["version", "✅", "Semver version string"],
                  ["type", "✅", "agent | skill | prompt"],
                  ["entry", "✅", "Path to the main file (agent.md, skill.md, etc.)"],
                  ["mcp_tools", "—", "Array of MCP tool names this plugin exposes"],
                  ["config", "—", "Path to default config file"],
                  ["evaluation", "—", "Path to evaluation / benchmark scripts"],
                  ["tags", "—", "Discovery tags for marketplace search"],
                ].map(([field, req, desc]) => (
                  <tr key={field} style={{ borderBottom: "1px solid var(--ifm-color-emphasis-100)" }}>
                    <td style={{ padding: "8px 12px" }}><code>{field}</code></td>
                    <td style={{ padding: "8px 12px" }}>{req}</td>
                    <td style={{ padding: "8px 12px" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Featured Plugins ── */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>⭐ Featured Plugins</h2>
          <p style={{ fontSize: "0.82rem", color: "var(--ifm-color-emphasis-500)", marginBottom: "20px" }}>
            The 20 built-in FrootAI Solution Plays — each available as a standalone plugin.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
            {featuredPlugins.map((p, i) => (
              <div
                key={p.tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--ifm-color-emphasis-200)",
                  fontSize: "0.82rem",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{p.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}. {p.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--ifm-color-emphasis-400)" }}>tag: {p.tag}</div>
                </div>
                <span style={{
                  marginLeft: "auto",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "6px",
                  background: "rgba(16,185,129,0.1)",
                  color: "#10b981",
                }}>
                  Built-in
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Submit Plugin CTA ── */}
        <section style={{ textAlign: "center", padding: "40px 24px", borderRadius: "16px", border: "2px solid rgba(99,102,241,0.2)", background: "rgba(99,102,241,0.03)" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>🚀 Submit Your Plugin</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--ifm-color-emphasis-500)", maxWidth: "520px", margin: "0 auto 20px" }}>
            Built a custom agent, skill, or prompt pack? Add a <code>plugin.json</code> to your repo and open a PR to the FrootAI registry.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="https://github.com/FrootAI/frootai/issues/new?template=plugin-submission.md&title=%5BPlugin%5D+Your+Plugin+Name"
              className={styles.glowPill}
              style={{ "--pill-color": "#6366f1", display: "inline-block" } as React.CSSProperties}
            >
              Submit Plugin →
            </Link>
            <Link
              to="/ecosystem"
              className={styles.glowPill}
              style={{ "--pill-color": "#10b981", display: "inline-block" } as React.CSSProperties}
            >
              View Ecosystem →
            </Link>
          </div>
        </section>

      </div>
    </Layout>
  );
}
