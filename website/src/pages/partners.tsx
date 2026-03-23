import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

/* ------------------------------------------------------------------ */
/*  Partner Integration Data                                           */
/* ------------------------------------------------------------------ */
interface Partner {
  name: string;
  category: string;
  emoji: string;
  color: string;
  description: string;
  capabilities: string[];
}

const partners: Partner[] = [
  {
    name: "ServiceNow",
    category: "ITSM",
    emoji: "🎫",
    color: "#7c3aed",
    description: "Incident & change management via MCP — auto-create tickets, escalate P1s, and sync resolution notes back into your AI workflow.",
    capabilities: ["Create / update incidents", "Change request automation", "CMDB lookup", "SLA tracking"],
  },
  {
    name: "Salesforce",
    category: "CRM",
    emoji: "☁️",
    color: "#06b6d4",
    description: "Customer data + case management piped into your agent context so every answer is customer-aware.",
    capabilities: ["Account & contact lookup", "Case creation / routing", "Opportunity insights", "Knowledge article search"],
  },
  {
    name: "SAP",
    category: "ERP",
    emoji: "🏭",
    color: "#10b981",
    description: "Business process automation — let your AI agent read purchase orders, trigger workflows, and surface financial data.",
    capabilities: ["Purchase order lookup", "Invoice processing", "Material master data", "Workflow triggers"],
  },
  {
    name: "Datadog",
    category: "Monitoring",
    emoji: "📊",
    color: "#f59e0b",
    description: "AI workload observability — pull metrics, traces, and alerts into agent context for smarter incident triage.",
    capabilities: ["Metric queries", "APM trace lookup", "Alert status", "Dashboard snapshots"],
  },
  {
    name: "PagerDuty",
    category: "Incident",
    emoji: "🚨",
    color: "#ef4444",
    description: "On-call + incident response — your AI agent can check who's on-call, trigger pages, and post updates.",
    capabilities: ["On-call schedule lookup", "Incident creation", "Escalation triggers", "Status page updates"],
  },
  {
    name: "Jira",
    category: "Project",
    emoji: "📋",
    color: "#6366f1",
    description: "Issue tracking & sprint management — let agents create stories, log bugs, and check sprint velocity.",
    capabilities: ["Issue create / update", "Sprint board queries", "Backlog grooming", "Velocity reports"],
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function PartnersPage(): JSX.Element {
  return (
    <Layout title="Partner Integrations — FrootAI" description="MCP-powered partner integrations for ServiceNow, Salesforce, SAP, Datadog, PagerDuty, and Jira.">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>🤝 Partner Integrations</h1>
          <p style={{ fontSize: "0.95rem", color: "var(--ifm-color-emphasis-500)", maxWidth: "640px", margin: "0 auto" }}>
            Connect FrootAI to your enterprise stack via MCP. Each integration ships as a thin adapter — your AI agent calls it like any other tool.
          </p>
        </div>

        {/* ── How It Works ── */}
        <section style={{ marginBottom: "48px", padding: "24px", borderRadius: "16px", border: "1px solid var(--ifm-color-emphasis-200)", background: "rgba(99,102,241,0.03)" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "12px" }}>⚙️ How Partner MCP Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {[
              { step: "1", label: "Agent invokes tool", detail: "e.g. servicenow_create_incident" },
              { step: "2", label: "MCP routes request", detail: "Auth via Managed Identity / OAuth" },
              { step: "3", label: "Partner API responds", detail: "Structured JSON back to agent" },
              { step: "4", label: "Agent reasons & acts", detail: "Uses result in next step" },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: "center", padding: "16px" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#7c3aed" }}>{s.step}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>{s.label}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ifm-color-emphasis-500)" }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Partner Grid ── */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "20px" }}>🔌 Available Integrations</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {partners.map((p) => (
              <div
                key={p.name}
                className={styles.glowCard}
                style={{
                  "--glow-color": p.color,
                  padding: "24px",
                  borderRadius: "16px",
                  border: `2px solid color-mix(in srgb, ${p.color} 25%, transparent)`,
                  background: `color-mix(in srgb, ${p.color} 3%, transparent)`,
                  position: "relative",
                } as React.CSSProperties}
              >
                {/* Coming Soon badge */}
                <span style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: "8px",
                  background: `color-mix(in srgb, ${p.color} 12%, transparent)`,
                  color: p.color,
                  border: `1px solid color-mix(in srgb, ${p.color} 30%, transparent)`,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                  Coming Soon
                </span>

                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{p.emoji}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "2px" }}>{p.name}</h3>
                <p style={{ fontSize: "0.72rem", fontWeight: 600, color: p.color, marginBottom: "12px" }}>{p.category}</p>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "12px" }}>{p.description}</p>

                <ul style={{ fontSize: "0.78rem", lineHeight: 1.8, paddingLeft: "16px", margin: 0 }}>
                  {p.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Propose a Partner ── */}
        <section style={{ textAlign: "center", padding: "40px 24px", borderRadius: "16px", border: "2px solid rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.03)" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>💡 Want Your Platform Here?</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--ifm-color-emphasis-500)", maxWidth: "520px", margin: "0 auto 20px" }}>
            We welcome community-driven partner integrations. Open an issue to propose a new MCP adapter for your favorite tool.
          </p>
          <Link
            href="https://github.com/FrootAI/frootai/issues/new?template=partner-integration.md&title=%5BPartner%5D+Your+Platform+Name"
            className={styles.glowPill}
            style={{ "--pill-color": "#7c3aed", display: "inline-block" } as React.CSSProperties}
          >
            Propose a Partner Integration →
          </Link>
        </section>

      </div>
    </Layout>
  );
}
