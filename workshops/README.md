# 🎓 FrootAI Workshops

> Hands-on, facilitator-led workshops for teams adopting FrootAI. Each workshop includes prerequisites, a timed outline, and everything a facilitator needs to deliver the session.

---

## Workshop Catalog

| # | Title | Duration | Level |
|---|-------|----------|-------|
| 01 | [Build Your First RAG Pipeline with FrootAI](#workshop-1-build-your-first-rag-pipeline-with-frootai) | 2 hours | Intermediate |
| 02 | [Set Up .github Agentic OS for Your Team](#workshop-2-set-up-github-agentic-os-for-your-team) | 1.5 hours | Beginner |
| 03 | [MCP Server: From Install to Production](#workshop-3-mcp-server-from-install-to-production) | 1 hour | Beginner |
| 04 | [AI Cost Optimization with FrootAI](#workshop-4-ai-cost-optimization-with-frootai) | 1.5 hours | Intermediate |

> **Note:** Full slide decks and hands-on lab repos are coming soon. This README serves as the catalog and planning guide.

---

## Workshop 1: Build Your First RAG Pipeline with FrootAI

**Duration:** 2 hours  
**Level:** Intermediate  
**Detailed outline:** [01-build-rag-pipeline.md](./01-build-rag-pipeline.md)

### Prerequisites
- Azure subscription with Contributor access
- Azure OpenAI resource (GPT-4o deployed)
- Azure AI Search resource (Basic tier or higher)
- VS Code with FrootAI extension installed
- Node.js 18+ and Python 3.10+
- Basic familiarity with REST APIs and vector embeddings

### Outline
1. **Concepts** (20 min) — What is RAG? Why not just fine-tune? Architecture overview.
2. **Data Prep** (20 min) — Load documents, chunk with FrootAI's chunking strategy, generate embeddings.
3. **Index Build** (20 min) — Create Azure AI Search index with vector fields, push data.
4. **Query Pipeline** (20 min) — Build hybrid search (keyword + vector), configure semantic ranker.
5. **Agent Integration** (20 min) — Wire the pipeline into an agent via MCP, test via Copilot Chat.
6. **Evaluation** (20 min) — Run groundedness + relevance evals using FrootAI evaluation framework.

### Materials Needed
- Play 01 (Enterprise RAG) from the Solution Plays library
- Sample PDF corpus (provided in lab repo)
- `config/openai.json` and `config/search.json` templates

---

## Workshop 2: Set Up .github Agentic OS for Your Team

**Duration:** 1.5 hours  
**Level:** Beginner

### Prerequisites
- GitHub repository (public or private)
- VS Code with GitHub Copilot enabled
- Basic understanding of Markdown
- Admin access to the target repo

### Outline
1. **Why Agentic OS?** (15 min) — The problem with undirected AI; how `.github/` files steer Copilot.
2. **copilot-instructions.md** (15 min) — Write project-level instructions. Demo: before vs. after.
3. **Instruction files** (15 min) — Layer-specific rules (security, Azure coding, testing conventions).
4. **agent.md** (15 min) — Define agent persona, tools, guardrails, and escalation rules.
5. **Custom prompts** (15 min) — Create `.github/prompts/` for repeatable slash commands.
6. **Validation** (15 min) — Test the setup end-to-end with Copilot Chat; iterate on instructions.

### Materials Needed
- FrootAI `.github/` template pack
- Sample `copilot-instructions.md`, `agent.md`, and instruction files
- Checklist of common instruction anti-patterns

---

## Workshop 3: MCP Server: From Install to Production

**Duration:** 1 hour  
**Level:** Beginner

### Prerequisites
- Node.js 18+
- VS Code with Copilot or Claude Desktop
- npm access (for `npx @abacloud/frootai-mcp`)
- (Optional) Azure subscription for hosted deployment

### Outline
1. **What is MCP?** (10 min) — Model Context Protocol explained. Tools vs. resources vs. prompts.
2. **Quick Start** (10 min) — `npx @abacloud/frootai-mcp` — verify tools show up in Copilot Chat.
3. **Tool Deep Dive** (15 min) — Walk through `lookup_term`, `search_knowledge`, `get_architecture_pattern`.
4. **Configuration** (10 min) — Custom config, hosted vs. stdio mode, environment variables.
5. **Production Deployment** (10 min) — Deploy to Azure Container Apps, configure Managed Identity.
6. **Q&A** (5 min) — Open floor.

### Materials Needed
- MCP Server npm package
- `mcp.json` configuration template
- Sample queries for each of the 16 tools

---

## Workshop 4: AI Cost Optimization with FrootAI

**Duration:** 1.5 hours  
**Level:** Intermediate

### Prerequisites
- Azure subscription with Cost Management Reader role
- Azure OpenAI resource with usage history (1+ week)
- VS Code with FrootAI extension
- Basic understanding of Azure pricing (pay-as-you-go vs. reserved)

### Outline
1. **The Cost Problem** (15 min) — Why AI workloads surprise teams. Token math and GPU pricing.
2. **Cost Visibility** (20 min) — Set up cost dashboards, tag strategy, budget alerts.
3. **Token Optimization** (20 min) — Prompt compression, caching strategies, model routing (GPT-4o vs. GPT-4o-mini).
4. **Infrastructure Right-Sizing** (15 min) — PTU vs. pay-as-you-go, auto-shutdown for dev, reserved capacity.
5. **FrootAI Cost Agent** (15 min) — Demo the AI Cost Optimization play analyzing a real subscription.
6. **Action Plan** (5 min) — Each attendee writes their top-3 cost actions with expected savings.

### Materials Needed
- Play 06 (AI Cost Optimization Advisor) from the Solution Plays library
- Cost Optimization module from the `cost-optimization/` knowledge base
- Sample Azure Cost Management export (CSV, provided)

---

## Facilitator Notes

- **Format:** Each workshop works both in-person and virtual (screen-share + breakout rooms).
- **Pacing:** Times are approximate. Allocate buffer for Q&A between sections.
- **Recording:** Request permission before recording. Share recordings internally only.
- **Feedback:** Use a post-workshop survey (template in `workshops/templates/` — coming soon).

---

## Contributing

Want to propose a new workshop topic? Open an issue with the `workshop` label or submit a PR following the outline template in [01-build-rag-pipeline.md](./01-build-rag-pipeline.md).
