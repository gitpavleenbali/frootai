import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

const certSections = [
  { icon: "", title: "Study", detail: "Self-paced modules covering all 20 solution plays, MCP architecture, and the FROOT knowledge taxonomy." },
  { icon: "", title: "Lab", detail: "Hands-on lab deploying a RAG pipeline, configuring .github Agentic OS, and running evaluations." },
  { icon: "", title: "Exam", detail: "60-minute proctored exam  50 questions, 80% pass rate. Covers architecture, best practices, and troubleshooting." },
  { icon: "", title: "Badge", detail: "Credly digital badge + LinkedIn certification. Valid for 2 years, renewal via continuing education." },
];

export default function EnterprisePage(): JSX.Element {
  return (
    <Layout title="Open Source Community & FAI Learning Hub  FrootAI" description="FrootAI is open source, free forever. Come build, learn, and certify.">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/*  Open Source Community  */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}> Open Source Community</h1>
          <p style={{ fontSize: "0.95rem", color: "var(--ifm-color-emphasis-500)", maxWidth: "640px", margin: "0 auto" }}>
            Come build the community. Empower each other. Be the open glue for infrastructure, platform, and application teams.
          </p>
          <p style={{ fontSize: "0.85rem", color: "#00C853", fontWeight: 600, marginTop: "8px" }}>
            Open Source  Free Forever  MIT License  Built by the community, for the community.
          </p>
        </div>

        <section style={{ marginBottom: "56px" }}>
          <div style={{ padding: "32px 28px", borderRadius: "16px", border: "2px solid rgba(16, 185, 129, 0.25)", background: "rgba(16, 185, 129, 0.03)" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "4px", color: "#10b981" }}> Everything is Free</h3>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#10b981", marginBottom: "16px" }}>$0  Forever</div>
            <ul style={{ fontSize: "0.82rem", lineHeight: 1.9, paddingLeft: "18px", columns: 2, columnGap: "32px" }}>
              <li>20 Solution Plays (open-source)</li>
              <li>MCP Server (npm)  16 tools</li>
              <li>VS Code Extension  13 commands</li>
              <li>.github Agentic OS templates</li>
              <li>18 Knowledge Modules</li>
              <li>200+ AI Glossary Terms</li>
              <li>Solution Configurator</li>
              <li>AI Assistant</li>
              <li>Workshop Materials</li>
              <li>Community Support</li>
            </ul>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Link to="/setup-guide" className={styles.glowPill} style={{ "--pill-color": "#10b981", display: "inline-block" } as React.CSSProperties}>
                Get Started Free 
              </Link>
            </div>
          </div>
        </section>

        {/*  How to Contribute  */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "16px", textAlign: "center" }}> How to Contribute</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {[
              { icon: "", title: "Add a Solution Play", detail: "Create a new play following the DevKit + TuneKit structure. CI validates automatically." },
              { icon: "", title: "Improve Knowledge", detail: "Fix errors, add glossary terms, deepen existing modules. Every contribution matters." },
              { icon: "", title: "Build MCP Tools", detail: "Extend the 16-tool MCP server with new capabilities. Partner integrations welcome." },
              { icon: "", title: "Star & Share", detail: "Star the repo, share with your team, write about your experience. Community grows the ecosystem." },
            ].map((item) => (
              <div key={item.title} style={{ padding: "20px", borderRadius: "14px", border: "1px solid var(--ifm-color-emphasis-200)", textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{item.icon}</div>
                <h4 style={{ fontSize: "0.92rem", fontWeight: 700, marginBottom: "4px" }}>{item.title}</h4>
                <p style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--ifm-color-emphasis-600)" }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/*  Divider  */}
        <hr style={{ border: "none", borderTop: "2px solid rgba(124, 58, 237, 0.15)", margin: "48px 0" }} />

        {/*  FAI Learning Hub  */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}> FAI Learning Hub</h1>
          <p style={{ fontSize: "0.9rem", color: "var(--ifm-color-emphasis-500)", maxWidth: "560px", margin: "0 auto" }}>
            Learn AI architecture from the roots up. Validate your skills with the FrootAI Certified Architect program.
          </p>
        </div>

        {/*  Learning Resources  */}
        <section style={{ marginBottom: "40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
            {[
              { to: "/docs/", icon: "", title: "18 Knowledge Modules", sub: "From tokens to production agents", color: "#f59e0b" },
              { to: "/docs/F3-AI-Glossary-AZ", icon: "", title: "200+ AI Terms", sub: "Comprehensive glossary A-Z", color: "#10b981" },
              { to: "https://github.com/gitpavleenbali/frootai/tree/main/workshops", icon: "", title: "Workshop Materials", sub: "4 hands-on workshops", color: "#6366f1" },
              { to: "/docs/Quiz-Assessment", icon: "", title: "Quiz & Assessment", sub: "25 questions to test yourself", color: "#06b6d4" },
            ].map((card) => (
              <Link key={card.title} to={card.to} className={styles.glowCard} style={{ "--glow-color": card.color } as React.CSSProperties}>
                <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{card.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.82rem" }}>{card.title}</div>
                <div style={{ fontSize: "0.7rem", color: card.color }}>{card.sub}</div>
              </Link>
            ))}
          </div>
        </section>

        {/*  Certification Program  */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px", textAlign: "center" }}> FrootAI Certified Architect</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--ifm-color-emphasis-500)", textAlign: "center", maxWidth: "560px", margin: "0 auto 24px" }}>
            Validate your skills with the industry's first AI-agent architecture certification. Study  Lab  Exam  Badge.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {certSections.map((s) => (
              <div key={s.title} style={{ padding: "24px", borderRadius: "14px", border: "1px solid var(--ifm-color-emphasis-200)", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{s.icon}</div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "6px" }}>{s.title}</h4>
                <p style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--ifm-color-emphasis-600)" }}>{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/*  CTAs  */}
        <section style={{ textAlign: "center", padding: "40px 24px", borderRadius: "16px", border: "2px solid rgba(0, 200, 83, 0.2)", background: "rgba(0, 200, 83, 0.03)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px" }}>Ready to Start?</h2>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/setup-guide" className={styles.glowPill} style={{ "--pill-color": "#10b981", display: "inline-block" } as React.CSSProperties}>
              Get Started Free 
            </Link>
            <Link to="/solution-plays" className={styles.glowPill} style={{ "--pill-color": "#7c3aed", display: "inline-block" } as React.CSSProperties}>
              View Solution Plays 
            </Link>
            <Link href="https://github.com/gitpavleenbali/frootai" className={styles.glowPill} style={{ "--pill-color": "#00C853", display: "inline-block" } as React.CSSProperties}>
               Star on GitHub 
            </Link>
          </div>
        </section>

      </div>
    </Layout>
  );
}