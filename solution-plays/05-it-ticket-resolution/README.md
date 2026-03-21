# Solution Play 05: IT Ticket Resolution

> **Complexity:** Medium | **Status:** Skeleton
> Auto-classify, route, and resolve IT tickets  Logic Apps + AI Foundry + ServiceNow MCP.

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

Infra: Logic Apps  Azure OpenAI  ServiceNow MCP  Container Apps
Tuning: Classification prompts, routing rules, confidence thresholds

---

> **FrootAI Solution Play 05**  DevKit builds it. TuneKit ships it.
