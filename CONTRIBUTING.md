# Contributing to FrootAI

> **From the Roots to the Fruits.**
> The open glue binding Infrastructure, Platform & Application teams with the GenAI ecosystem.

Thank you for contributing! FrootAI grows with every contribution.

---

## Ways to Contribute

### 1. New Solution Play

Create a new solution play following the DevKit + TuneKit model with full .github Agentic OS:

```
solution-plays/XX-your-solution/
├── .github/                              # DevKit: Agentic OS (7 primitives)
│   ├── copilot-instructions.md           # L1: Always-on solution context
│   ├── instructions/
│   │   ├── azure-coding.instructions.md  # L1: Azure coding standards
│   │   ├── <play>-patterns.instructions.md  # L1: Play-specific patterns
│   │   └── security.instructions.md      # L1: Security guidelines
│   ├── prompts/                          # L2: 4 slash commands
│   │   ├── deploy.prompt.md
│   │   ├── test.prompt.md
│   │   ├── review.prompt.md
│   │   └── evaluate.prompt.md
│   ├── agents/                           # L2: 3 chained specialists
│   │   ├── builder.agent.md
│   │   ├── reviewer.agent.md
│   │   └── tuner.agent.md
│   ├── skills/                           # L3: Self-contained logic
│   │   ├── deploy-azure/SKILL.md + deploy.sh
│   │   ├── evaluate/SKILL.md
│   │   └── tune/SKILL.md + tune-config.sh
│   ├── hooks/guardrails.json             # L4: Lifecycle enforcement
│   └── workflows/                        # L4: Agentic CI/CD
│       ├── ai-review.md
│       └── ai-deploy.md
├── .vscode/mcp.json + settings.json      # IDE config
├── infra/main.bicep + parameters.json    # DevKit: Azure infrastructure
├── config/openai.json                    # TuneKit: Model parameters
├── config/guardrails.json                # TuneKit: Safety rules
├── config/agents.json                    # TuneKit: Agent behavior tuning
├── config/model-comparison.json          # TuneKit: Model selection guide
├── evaluation/test-set.jsonl + eval.py   # TuneKit: Quality scoring
├── agent.md                              # Agent personality (1500+ bytes)
├── instructions.md                       # System prompts
├── plugin.json                           # Marketplace manifest
├── CHANGELOG.md + README.md              # Documentation
├── mcp/index.js + plugins/README.md      # Legacy compatibility
```

### 2. Improve Existing Plays

- Deepen `agent.md` content (more few-shot examples, better error handling)
- Tune `config/*.json` parameters with real-world production values
- Enhance `evaluation/eval.py` with additional metrics
- Fix or improve `infra/main.bicep` templates with real Azure resource definitions

### 3. Knowledge Modules

- Fix errors in existing modules (`docs/*.md`)
- Add glossary terms to `F3-AI-Glossary-AZ.md`
- Propose new modules via GitHub Issue

### 4. Platform Features

- MCP server tools (`mcp-server/index.js`)
- VS Code extension features (`vscode-extension/src/extension.js`)
- Website improvements (`website/src/pages/*.tsx`)

---

## Quality Standards

Before submitting, verify your contribution:

- [ ] **agent.md** is 1500+ bytes with: Identity, Rules, Azure Services, Architecture, Tools, Output Format, Error Handling, Few-Shot Examples
- [ ] **.github Agentic OS** has all 19 files (7 primitives, 4 layers)
- [ ] All **config/*.json** files include `_comments` explaining each parameter
- [ ] All **JSON files** parse without errors (`python3 -c "import json; json.load(open('file'))"`)
- [ ] **plugin.json** is valid and has play metadata
- [ ] **README.md** includes architecture diagram, DevKit section, TuneKit section
- [ ] Uses **Managed Identity** (no API keys) for Azure services
- [ ] **UTF-8 encoding** (no BOM) on all files

---

## PR Process

1. **Fork** the repository
2. Create a **feature branch** (`feat/XX-your-solution-play`)
3. Follow the file structure above — CI will validate all files
4. Submit a **Pull Request** using the PR template below
5. CI validation runs automatically (`validate-plays.yml`)
6. Address review feedback → merge

---

## Naming Conventions

| Term | Meaning |
|------|---------|
| **DevKit** | Build + Deploy ecosystem (.github Agentic OS + infra) |
| **TuneKit** | AI Fine-Tuning ecosystem (config/ + evaluation/) |
| **FROOT** | Foundations · Reasoning · Orchestration · Operations · Transformation |
| **.github Agentic OS** | 7 primitives: instructions, prompts, agents, skills, hooks, workflows, plugins |

---

## Code of Conduct

- Be respectful and constructive
- Focus on the infra/platform audience
- Quality over quantity — one deeply customized play beats ten skeletons
- MIT License — all contributions are MIT-licensed
