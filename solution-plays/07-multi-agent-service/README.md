# Solution Play 07: Multi-Agent Customer Service

> **Complexity:** High | **Status:** Skeleton
> Supervisor agent routes to specialist agents  Container Apps + Agent Framework + Dapr.

---

## Architecture

```mermaid
graph LR
    A[Input] --> B[Processing]
    B --> C[AI Model]
    C --> D[Output]
```

---

## DevKit

Download the DevKit to empower your co-coder for this solution.

| File | Purpose |
|------|---------|
| agent.md | Agent personality + rules |
| instructions.md | System prompts + guardrails |
| .github/copilot-instructions.md | IDE coding context |
| .vscode/mcp.json | MCP auto-connect |
| mcp/index.js | Solution-specific tools |
| plugins/ | Reusable functions |

---

## TuneKit

Download the TuneKit to fine-tune AI for production.

| Config | What It Controls |
|--------|-----------------|
| config/openai.json | Model + generation parameters |
| config/guardrails.json | Safety + business rules |
| infra/main.bicep | Azure resources |
| evaluation/ | Test set + scoring |

Infra: Container Apps  Azure OpenAI  Cosmos DB  Dapr
Tuning: Supervisor routing, tool schemas, agent memory, handoff rules

---

> **FrootAI Solution Play 07**  DevKit builds it. TuneKit ships it.
