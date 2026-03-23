# frootai-mcp

> **AI architecture knowledge as an agent skill.** 10 tools (6 static + 4 live), 18 modules, 200+ terms, 7 decision guides. Hybrid: works offline + fetches live Azure docs, MCP registries, and GitHub.

## Install & Run

```bash
npx frootai-mcp
```

Or install globally:

```bash
npm install -g frootai-mcp
frootai-mcp
```

## MCP Config

**Claude Desktop** / **Cursor**:
```json
{
  "mcpServers": {
    "frootai": { "command": "npx", "args": ["frootai-mcp"] }
  }
}
```

**VS Code** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "frootai": { "command": "npx", "args": ["frootai-mcp"] }
  }
}
```

## 10 Tools

### Static Tools (bundled knowledge — works offline)

| Tool | Description |
|------|------------|
| `list_modules` | Browse 18 modules by FROOT layer |
| `get_module` | Read module content (F1–T3, including F4: .github Agentic OS) |
| `lookup_term` | 200+ AI/ML term definitions |
| `search_knowledge` | Full-text search all modules |
| `get_architecture_pattern` | 7 decision guides (RAG, agents, hosting, cost, etc.) |
| `get_froot_overview` | Complete FROOT framework summary |

### Live Tools (network-enabled — graceful fallback to static if offline)

| Tool | Description |
|------|------------|
| `fetch_azure_docs` | Search Microsoft Learn for any Azure service docs |
| `fetch_external_mcp` | Find MCP servers from public registries (mcp.so) |
| `list_community_plays` | List 20 FrootAI solution plays from GitHub |
| `get_github_agentic_os` | .github folder agentic OS guide (7 primitives, 4 layers) |

## What's Inside

- **18 FROOT modules** — Foundations, Reasoning, Orchestration, Operations, Transformation
- **200+ AI/ML glossary terms** — from ablation to zero-shot
- **7 architecture decision guides** — RAG, agents, hosting, cost, deterministic AI, multi-agent, fine-tuning
- **682KB knowledge bundle** — curated, verified, zero hallucination
- **20 solution plays** — pre-tuned deployable AI solutions with .github Agentic OS

## Links

- **Website**: https://gitpavleenbali.github.io/frootai/
- **GitHub**: https://github.com/gitpavleenbali/frootai
- **Setup Guide**: https://gitpavleenbali.github.io/frootai/setup-guide
- **VS Code Extension**: https://marketplace.visualstudio.com/items?itemName=pavleenbali.frootai

---

**FrootAI** — The open glue binding infrastructure, platform, and application teams. From root to fruit.
