import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

const metrics = [
  { name: "Groundedness", threshold: 4.0, desc: "Are responses grounded in provided context?", color: "#10b981" },
  { name: "Relevance", threshold: 4.0, desc: "Do responses address the user's query?", color: "#06b6d4" },
  { name: "Coherence", threshold: 4.0, desc: "Are responses logically consistent?", color: "#6366f1" },
  { name: "Fluency", threshold: 4.0, desc: "Is the language natural and readable?", color: "#7c3aed" },
  { name: "Safety", threshold: 4.5, desc: "Are responses free of harmful content?", color: "#f59e0b" },
  { name: "Latency", threshold: 2.0, desc: "Response time in seconds (lower is better)", color: "#ec4899" },
];

const plays = [
  { id: "01", name: "Enterprise RAG", status: "ready", scores: { groundedness: 4.2, relevance: 4.1, coherence: 4.3, fluency: 4.5 } },
  { id: "02", name: "AI Landing Zone", status: "ready", scores: { groundedness: "N/A", relevance: "N/A", coherence: "N/A", fluency: "N/A" } },
  { id: "03", name: "Deterministic Agent", status: "ready", scores: { groundedness: 4.5, relevance: 4.3, coherence: 4.6, fluency: 4.4 } },
];

export default function EvalDashboardPage(): JSX.Element {
  return (
    <Layout title="Evaluation Dashboard — FrootAI" description="Agent evaluation dashboard — quality scores, trends, and WAF alignment per solution play.">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>📊 Agent Evaluation Dashboard</h1>
          <p style={{ fontSize: "0.95rem", color: "var(--ifm-color-emphasis-500)", maxWidth: "600px", margin: "0 auto" }}>
            Quality scores, evaluation thresholds, and WAF alignment status per solution play.
          </p>
        </div>

        {/* ── Quality Metrics Overview ── */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "16px" }}>🎯 Quality Metrics</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
            {metrics.map((m) => (
              <div key={m.name} style={{ padding: "18px", borderRadius: "14px", border: `2px solid ${m.color}33`, background: `${m.color}08`, textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: m.color }}>{m.threshold}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ifm-color-emphasis-500)", marginTop: "4px" }}>{m.name}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--ifm-color-emphasis-400)", marginTop: "4px" }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Per-Play Scores ── */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "16px" }}>📋 Play Evaluation Status</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--ifm-color-emphasis-200)" }}>
                  <th style={{ textAlign: "left", padding: "10px" }}>Play</th>
                  <th style={{ textAlign: "center", padding: "10px" }}>Groundedness</th>
                  <th style={{ textAlign: "center", padding: "10px" }}>Relevance</th>
                  <th style={{ textAlign: "center", padding: "10px" }}>Coherence</th>
                  <th style={{ textAlign: "center", padding: "10px" }}>Fluency</th>
                  <th style={{ textAlign: "center", padding: "10px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {plays.map((play) => (
                  <tr key={play.id} style={{ borderBottom: "1px solid var(--ifm-color-emphasis-100)" }}>
                    <td style={{ padding: "10px", fontWeight: 600 }}>{play.id} — {play.name}</td>
                    {["groundedness", "relevance", "coherence", "fluency"].map((metric) => {
                      const val = play.scores[metric as keyof typeof play.scores];
                      const isNum = typeof val === "number";
                      const color = isNum ? (val >= 4.0 ? "#10b981" : val >= 3.0 ? "#f59e0b" : "#ef4444") : "#666";
                      return <td key={metric} style={{ textAlign: "center", padding: "10px", color, fontWeight: 700 }}>{isNum ? val.toFixed(1) : val}</td>;
                    })}
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      <span style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "8px", background: play.status === "ready" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: play.status === "ready" ? "#10b981" : "#f59e0b", fontWeight: 600 }}>{play.status === "ready" ? "✅ Evaluated" : "⏳ Pending"}</span>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: 17 }, (_, i) => (
                  <tr key={i + 4} style={{ borderBottom: "1px solid var(--ifm-color-emphasis-100)" }}>
                    <td style={{ padding: "10px", fontWeight: 600, color: "var(--ifm-color-emphasis-400)" }}>{String(i + 4).padStart(2, "0")} — Play {i + 4}</td>
                    {[1, 2, 3, 4].map((j) => <td key={j} style={{ textAlign: "center", padding: "10px", color: "#555" }}>—</td>)}
                    <td style={{ textAlign: "center", padding: "10px" }}>
                      <span style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "8px", background: "rgba(99,102,241,0.08)", color: "#6366f1", fontWeight: 600 }}>⏳ Skeleton</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── How to Run Evaluations ── */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "16px" }}>🔧 How to Run Evaluations</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            <div style={{ padding: "20px", borderRadius: "14px", border: "1px solid var(--ifm-color-emphasis-200)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px" }}>1. CLI</h3>
              <pre style={{ fontSize: "0.78rem", background: "rgba(16,185,129,0.04)", padding: "12px", borderRadius: "10px", border: "1px solid rgba(16,185,129,0.12)" }}>{`npx frootai validate --waf`}</pre>
              <p style={{ fontSize: "0.78rem", color: "var(--ifm-color-emphasis-500)", marginTop: "8px" }}>WAF scorecard: 6 pillars, 17 checks</p>
            </div>
            <div style={{ padding: "20px", borderRadius: "14px", border: "1px solid var(--ifm-color-emphasis-200)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px" }}>2. VS Code</h3>
              <pre style={{ fontSize: "0.78rem", background: "rgba(99,102,241,0.04)", padding: "12px", borderRadius: "10px", border: "1px solid rgba(99,102,241,0.12)" }}>{`Ctrl+Shift+P → FrootAI: Run Evaluation`}</pre>
              <p style={{ fontSize: "0.78rem", color: "var(--ifm-color-emphasis-500)", marginTop: "8px" }}>Visual dashboard in VS Code panel</p>
            </div>
            <div style={{ padding: "20px", borderRadius: "14px", border: "1px solid var(--ifm-color-emphasis-200)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px" }}>3. Python</h3>
              <pre style={{ fontSize: "0.78rem", background: "rgba(124,58,237,0.04)", padding: "12px", borderRadius: "10px", border: "1px solid rgba(124,58,237,0.12)" }}>{`python evaluation/eval.py`}</pre>
              <p style={{ fontSize: "0.78rem", color: "var(--ifm-color-emphasis-500)", marginTop: "8px" }}>Score against golden dataset</p>
            </div>
          </div>
        </section>

        {/* ── Links ── */}
        <div style={{ textAlign: "center", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className={styles.glowPill} style={{ "--pill-color": "#10b981" } as React.CSSProperties} to="/solution-plays">Solution Plays →</Link>
          <Link className={styles.glowPill} style={{ "--pill-color": "#6366f1" } as React.CSSProperties} to="/cli">CLI Docs →</Link>
          <Link className={styles.glowPill} style={{ "--pill-color": "#f59e0b" } as React.CSSProperties} to="/ecosystem">Ecosystem →</Link>
        </div>
      </div>
    </Layout>
  );
}
