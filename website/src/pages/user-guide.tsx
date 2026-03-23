import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BrowserOnly from "@docusaurus/BrowserOnly";

// ─── All 20 Solution Plays Data ────────────────────────────────────

const plays: Record<string, { id: string; name: string; icon: string; desc: string; infra: string; tune: string; cx: string; status: string; github: string }> = {
  "01": { id: "01", name: "Enterprise RAG Q&A", icon: "🔍", desc: "Production RAG pipeline — AI Search + OpenAI + Container Apps. Pre-tuned: temp=0.1, hybrid 60/40, top-k=5, semantic reranker.", infra: "AI Search · Azure OpenAI · Container Apps · Blob", tune: "temperature · top-k · chunk size · reranking · relevance threshold", cx: "Medium", status: "Ready", github: "01-enterprise-rag" },
  "02": { id: "02", name: "AI Landing Zone", icon: "⛰️", desc: "Foundational Azure infra for AI — VNet, private endpoints, managed identity, RBAC, GPU quotas.", infra: "VNet · Private Endpoints · RBAC · Managed Identity · Key Vault", tune: "Network config · service SKUs · GPU quota · region", cx: "Foundation", status: "Ready", github: "02-ai-landing-zone" },
  "03": { id: "03", name: "Deterministic Agent", icon: "🎯", desc: "Reliable agent — temp=0, structured JSON, multi-layer guardrails, anti-sycophancy, evaluation.", infra: "Container Apps · Azure OpenAI · Content Safety", tune: "temperature=0 · JSON schema · seed · confidence · citations", cx: "Medium", status: "Ready", github: "03-deterministic-agent" },
  "04": { id: "04", name: "Call Center Voice AI", icon: "📞", desc: "Voice-enabled customer service — Communication Services + AI Speech + OpenAI Agent.", infra: "Communication Services · AI Speech · Azure OpenAI · Container Apps", tune: "Speech config · grounding prompts · fallback chains", cx: "High", status: "Skeleton", github: "04-call-center-voice-ai" },
  "05": { id: "05", name: "IT Ticket Resolution", icon: "🎫", desc: "Auto-classify, route, and resolve IT tickets — Logic Apps + AI Foundry + ServiceNow MCP.", infra: "Logic Apps · Azure OpenAI · ServiceNow MCP · Container Apps", tune: "Classification prompts · routing rules · confidence thresholds", cx: "Medium", status: "Skeleton", github: "05-it-ticket-resolution" },
  "06": { id: "06", name: "Document Intelligence", icon: "📄", desc: "Extract, classify, and structure document data — Doc Intelligence + OpenAI + Cosmos DB.", infra: "Blob Storage · Document Intelligence · Azure OpenAI · Cosmos DB", tune: "Extraction prompts · confidence thresholds · field schemas", cx: "Medium", status: "Skeleton", github: "06-document-intelligence" },
  "07": { id: "07", name: "Multi-Agent Service", icon: "🤖", desc: "Supervisor agent routes to specialists — Container Apps + Agent Framework + Dapr.", infra: "Container Apps · Azure OpenAI · Cosmos DB · Dapr", tune: "Supervisor routing · tool schemas · agent memory", cx: "High", status: "Skeleton", github: "07-multi-agent-service" },
  "08": { id: "08", name: "Copilot Studio Bot", icon: "💬", desc: "Low-code enterprise bot — Copilot Studio + Dataverse + SharePoint.", infra: "Copilot Studio · Dataverse · SharePoint · Power Platform", tune: "Topic design · knowledge sources · guardrails", cx: "Low", status: "Skeleton", github: "08-copilot-studio-bot" },
  "09": { id: "09", name: "AI Search Portal", icon: "🔎", desc: "Enterprise search — AI Search + semantic ranking + Web App.", infra: "AI Search · App Service · Azure OpenAI · Blob Storage", tune: "Hybrid weights · semantic config · scoring profiles", cx: "Medium", status: "Skeleton", github: "09-ai-search-portal" },
  "10": { id: "10", name: "Content Moderation", icon: "🛡️", desc: "Filter harmful content — Content Safety + APIM + Functions.", infra: "Content Safety · API Management · Azure Functions", tune: "Severity levels · custom categories · blocklists", cx: "Low", status: "Skeleton", github: "10-content-moderation" },
  "11": { id: "11", name: "Landing Zone Advanced", icon: "🏔️", desc: "Multi-region, policy-driven, enterprise-grade AI landing zone.", infra: "Multi-region VNet · Azure Policy · PE · RBAC · GPU Quota", tune: "Governance policies · multi-region config · RBAC", cx: "High", status: "Skeleton", github: "11-ai-landing-zone-advanced" },
  "12": { id: "12", name: "Model Serving AKS", icon: "⚙️", desc: "Deploy and serve LLMs on AKS with vLLM, GPU nodes, auto-scaling.", infra: "AKS · vLLM · NVIDIA GPU · Container Registry", tune: "Quantization · batching · scaling rules", cx: "High", status: "Skeleton", github: "12-model-serving-aks" },
  "13": { id: "13", name: "Fine-Tuning Workflow", icon: "🔬", desc: "End-to-end fine-tuning — data prep, LoRA training, evaluation, deployment.", infra: "AI Foundry · GPU Compute · Storage · MLflow", tune: "LoRA rank · learning rate · epochs · eval metrics", cx: "High", status: "Skeleton", github: "13-fine-tuning-workflow" },
  "14": { id: "14", name: "Cost-Optimized AI Gateway", icon: "🚪", desc: "APIM-based AI gateway with semantic caching, load balancing, token budgets.", infra: "API Management · Redis Cache · Azure OpenAI (multi-region)", tune: "Token budgets · caching rules · fallback chain", cx: "Medium", status: "Skeleton", github: "14-cost-optimized-ai-gateway" },
  "15": { id: "15", name: "Multi-Modal DocProc", icon: "🖼️", desc: "Process documents with text + images using GPT-4o multi-modal.", infra: "GPT-4o · Blob Storage · Cosmos DB · Functions", tune: "Image prompts · extraction schemas · thresholds", cx: "Medium", status: "Skeleton", github: "15-multi-modal-docproc" },
  "16": { id: "16", name: "Copilot Teams Extension", icon: "👥", desc: "M365 Copilot extension with Graph API and declarative agents.", infra: "M365 Copilot · Graph API · Azure Functions · App Reg", tune: "Declarative agent config · permissions · scoping", cx: "Medium", status: "Skeleton", github: "16-copilot-teams-extension" },
  "17": { id: "17", name: "AI Observability", icon: "📊", desc: "Monitor AI workloads with KQL queries, quality alerts, workbooks.", infra: "App Insights · Log Analytics · Azure Monitor · Workbooks", tune: "KQL queries · alert thresholds · quality metrics", cx: "Medium", status: "Skeleton", github: "17-ai-observability" },
  "18": { id: "18", name: "Prompt Management", icon: "📝", desc: "Version control, A/B test, and rollback prompts across environments.", infra: "Prompt Flow · Git · GitHub Actions · AI Foundry", tune: "Prompt versions · A/B weights · rollback rules", cx: "Medium", status: "Skeleton", github: "18-prompt-management" },
  "19": { id: "19", name: "Edge AI Phi-4", icon: "📱", desc: "Deploy Phi-4 on edge devices with ONNX quantization and local serving.", infra: "IoT Hub · Container Instances · ONNX Runtime · Edge", tune: "Quantization level · model config · sync schedule", cx: "High", status: "Skeleton", github: "19-edge-ai-phi4" },
  "20": { id: "20", name: "Anomaly Detection", icon: "🚨", desc: "Real-time anomaly detection — Event Hub + AI analysis + alerting.", infra: "Event Hub · Stream Analytics · Azure OpenAI · Functions", tune: "Threshold config · alert prompts · detection windows", cx: "High", status: "Skeleton", github: "20-anomaly-detection" },
};

// ─── Dynamic User Guide Component ──────────────────────────────────

function UserGuideContent() {
  const params = new URLSearchParams(window.location.search);
  const playId = params.get("play") || "05";
  const play = plays[playId];

  if (!play) {
    return <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Play not found</h1>
      <p>Use ?play=01 through ?play=20</p>
      <Link to="/solution-plays">← Back to Solution Plays</Link>
    </div>;
  }

  const ghBase = `https://github.com/gitpavleenbali/frootai/tree/main/solution-plays/${play.github}`;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>{play.icon} Solution Play {play.id} — {play.name}</h1>
        <p style={{ fontSize: "0.92rem", color: "var(--ifm-color-emphasis-500)", maxWidth: "640px", margin: "0 auto" }}>
          Complete user guide: from zero to production. {play.desc}
        </p>
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "8px" }}>
          <span style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: "8px", background: play.status === "Ready" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: play.status === "Ready" ? "#10b981" : "#f59e0b", fontWeight: 600 }}>{play.status}</span>
          <span style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: "8px", background: "rgba(99,102,241,0.1)", color: "#6366f1", fontWeight: 600 }}>{play.cx}</span>
        </div>
      </div>

      {/* Overview */}
      <div style={{ padding: "20px", borderRadius: "14px", border: "2px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.03)", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px", marginTop: 0 }}>What You'll Build</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--ifm-color-emphasis-500)", margin: "0 0 8px" }}>{play.desc}</p>
        <div style={{ fontSize: "0.78rem", color: "var(--ifm-color-emphasis-400)" }}>
          <strong>Infra:</strong> {play.infra}<br/>
          <strong>Tuning:</strong> {play.tune}
        </div>
      </div>

      {/* Step 1: VS Code */}
      <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>Step 1: Open VS Code Extension</h2>
      <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--ifm-color-emphasis-200)", marginBottom: "24px", fontSize: "0.85rem", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 6px" }}>Install FrootAI if needed:</p>
        <code style={{ display: "block", padding: "8px 12px", borderRadius: "8px", background: "rgba(16,185,129,0.06)", marginBottom: "8px" }}>code --install-extension pavleenbali.frootai</code>
        <p style={{ margin: 0 }}>Open sidebar (🌳 icon). Find <strong>{play.icon} {play.id} — {play.name}</strong> in Solution Plays.</p>
      </div>

      {/* Step 2: DevKit */}
      <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>Step 2: Initialize DevKit</h2>
      <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.03)", marginBottom: "24px", fontSize: "0.85rem", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 8px" }}><strong>Left-click</strong> on the play → select <strong>🛠️ Init DevKit</strong></p>
        <p style={{ margin: "0 0 8px" }}>FrootAI copies the <strong>full .github Agentic OS</strong> (19 files):</p>
        <ul style={{ paddingLeft: "18px", margin: "0 0 8px" }}>
          <li><strong>Layer 1:</strong> Instructions (azure-coding, {play.github.replace(/^\d+-/, "")}-patterns, security)</li>
          <li><strong>Layer 2:</strong> Prompts (/deploy, /test, /review, /evaluate)</li>
          <li><strong>Layer 2:</strong> Agents (builder → reviewer → tuner)</li>
          <li><strong>Layer 2:</strong> Skills (deploy-azure, evaluate, tune)</li>
          <li><strong>Layer 3:</strong> Hooks (guardrails.json) + Workflows (AI CI/CD)</li>
        </ul>
        <p style={{ margin: 0 }}>+ agent.md, .vscode/mcp.json, plugin.json</p>
      </div>

      {/* Step 3: TuneKit */}
      <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>Step 3: Initialize TuneKit</h2>
      <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.03)", marginBottom: "24px", fontSize: "0.85rem", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 8px" }}>Left-click again → select <strong>⚙️ Init TuneKit</strong></p>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          <li><code>config/openai.json</code> — AI model parameters ({play.tune})</li>
          <li><code>config/guardrails.json</code> — safety rules, PII, abstention</li>
          <li><code>infra/main.bicep</code> — Azure deploy ({play.infra})</li>
          <li><code>evaluation/</code> — test set + automated scoring</li>
        </ul>
      </div>

      {/* Step 4: MCP */}
      <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>Step 4: Use MCP Tools</h2>
      <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--ifm-color-emphasis-200)", marginBottom: "24px", fontSize: "0.85rem", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 8px" }}>Open <strong>Copilot Chat</strong> → enable <strong>FrootAI</strong> in tools (🔧). Ask questions about {play.name}.</p>
      </div>

      {/* Step 5: Auto-Chain */}
      <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>Step 5: Auto-Chain Agents (Build → Review → Tune)</h2>
      <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.03)", marginBottom: "24px", fontSize: "0.85rem", lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 8px" }}>Run <code>Ctrl+Shift+P</code> → <strong>FrootAI: Auto-Chain Agents</strong></p>
        <ol style={{ paddingLeft: "18px", margin: 0 }}>
          <li><strong>Builder</strong> — describe what to build → paste prompt in Copilot Chat</li>
          <li><strong>Reviewer</strong> — auto-reviews code for security, quality, best practices</li>
          <li><strong>Tuner</strong> — validates TuneKit configs for production readiness</li>
          <li><strong>Deploy</strong> — optional /deploy walkthrough</li>
        </ol>
      </div>

      {/* Step 6: Deploy */}
      <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>Step 6: Validate & Deploy</h2>
      <div style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--ifm-color-emphasis-200)", marginBottom: "32px", fontSize: "0.85rem", lineHeight: 1.7 }}>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          <li><strong>/review</strong> — Security + quality checklist</li>
          <li><strong>/evaluate</strong> — Run evaluation pipeline</li>
          <li><strong>/deploy</strong> — Azure deployment walkthrough</li>
        </ul>
      </div>

      {/* Summary */}
      <div style={{ padding: "20px", borderRadius: "14px", border: "1px solid var(--ifm-color-emphasis-200)", background: "var(--ifm-background-surface-color)", textAlign: "center", marginBottom: "32px" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>What You Just Did</h3>
        <p style={{ fontSize: "0.82rem", color: "var(--ifm-color-emphasis-500)", lineHeight: 1.7, margin: 0 }}>
          <strong>Init DevKit</strong> → .github Agentic OS (19 files)<br/>
          <strong>Init TuneKit</strong> → config + infra + evaluation<br/>
          <strong>Auto-Chain</strong> → Build → Review → Tune → Deploy<br/>
          <strong>Result</strong> → Production-ready {play.name} 🚀
        </p>
      </div>

      {/* Nav */}
      <div style={{ textAlign: "center", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to={ghBase} className={styles.glowPill} style={{ "--pill-color": "#6366f1", display: "inline-block" } as React.CSSProperties}>🔗 GitHub</Link>
        <Link to="/solution-plays" className={styles.glowPill} style={{ "--pill-color": "#7c3aed", display: "inline-block" } as React.CSSProperties}>🎯 All Plays</Link>
        <Link to="/" className={styles.glowPill} style={{ "--pill-color": "#f59e0b", display: "inline-block" } as React.CSSProperties}>🌳 FrootAI</Link>
      </div>
    </div>
  );
}

// ─── Page Wrapper ──────────────────────────────────────────────────

export default function UserGuidePage(): JSX.Element {
  return (
    <Layout title="User Guide — FrootAI Solution Play" description="Step-by-step user guide for deploying a FrootAI solution play.">
      <BrowserOnly>{() => <UserGuideContent />}</BrowserOnly>
    </Layout>
  );
}
