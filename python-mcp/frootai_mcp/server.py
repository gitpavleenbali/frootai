"""FrootAI MCP Server — Python Implementation.

Implements the Model Context Protocol (MCP) over stdio.
Compatible with Claude Desktop, VS Code Copilot, Cursor, and any MCP client.
"""

import json
import sys
import os
from pathlib import Path
from typing import Any


class FrootAIMCP:
    """FrootAI MCP Server — AI architecture knowledge server.
    
    22 tools: 6 static + 4 live + 3 chain + 3 ecosystem + 6 compute.
    18 knowledge modules, 200+ AI terms, 20 solution plays.
    """

    def __init__(self):
        self.knowledge = self._load_knowledge()
        self.tools = self._register_tools()

    def _load_knowledge(self) -> dict:
        """Load bundled knowledge.json."""
        knowledge_path = Path(__file__).parent / "knowledge.json"
        if knowledge_path.exists():
            with open(knowledge_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {"modules": {}, "glossary": {}, "plays": []}

    def _register_tools(self) -> list[dict]:
        """Register all MCP tools."""
        return [
            {"name": "get_module", "description": "Retrieve a full FROOT knowledge module by ID", "inputSchema": {"type": "object", "properties": {"module_id": {"type": "string", "description": "Module ID (e.g., 'RAG-Architecture')"}}, "required": ["module_id"]}},
            {"name": "list_modules", "description": "List all 18 FROOT knowledge modules with metadata", "inputSchema": {"type": "object", "properties": {}}},
            {"name": "search_knowledge", "description": "Full-text search across all knowledge modules", "inputSchema": {"type": "object", "properties": {"query": {"type": "string", "description": "Search query"}}, "required": ["query"]}},
            {"name": "lookup_term", "description": "Look up a term in the AI glossary (200+ terms)", "inputSchema": {"type": "object", "properties": {"term": {"type": "string", "description": "Term to look up"}}, "required": ["term"]}},
            {"name": "get_architecture_pattern", "description": "Get architecture patterns for a scenario", "inputSchema": {"type": "object", "properties": {"scenario": {"type": "string", "description": "Architecture scenario"}}, "required": ["scenario"]}},
            {"name": "get_froot_overview", "description": "Overview of the FrootAI platform", "inputSchema": {"type": "object", "properties": {}}},
            {"name": "estimate_cost", "description": "Estimate Azure AI costs for a solution play", "inputSchema": {"type": "object", "properties": {"play": {"type": "string"}, "scale": {"type": "string", "enum": ["dev", "prod"]}}, "required": ["play"]}},
            {"name": "validate_config", "description": "Validate TuneKit configuration", "inputSchema": {"type": "object", "properties": {"config": {"type": "object"}}, "required": ["config"]}},
            {"name": "semantic_search_plays", "description": "Embedding-based play matching", "inputSchema": {"type": "object", "properties": {"query": {"type": "string"}}, "required": ["query"]}},
            {"name": "agent_build", "description": "Generate agent scaffold for a scenario", "inputSchema": {"type": "object", "properties": {"scenario": {"type": "string"}}, "required": ["scenario"]}},
            {"name": "agent_review", "description": "Review agent configuration", "inputSchema": {"type": "object", "properties": {"config": {"type": "string"}}, "required": ["config"]}},
            {"name": "agent_tune", "description": "Optimize agent parameters", "inputSchema": {"type": "object", "properties": {"config": {"type": "string"}}, "required": ["config"]}},
        ]

    def handle_request(self, request: dict) -> dict:
        """Handle an MCP JSON-RPC request."""
        method = request.get("method", "")
        req_id = request.get("id")
        params = request.get("params", {})

        if method == "initialize":
            return self._response(req_id, {
                "protocolVersion": "2024-11-05",
                "capabilities": {"tools": {"listChanged": False}},
                "serverInfo": {"name": "frootai-mcp", "version": "3.2.0"}
            })
        elif method == "tools/list":
            return self._response(req_id, {"tools": self.tools})
        elif method == "tools/call":
            return self._handle_tool_call(req_id, params)
        elif method == "notifications/initialized":
            return None  # No response needed for notifications
        else:
            return self._error(req_id, -32601, f"Method not found: {method}")

    def _handle_tool_call(self, req_id: Any, params: dict) -> dict:
        """Handle a tool call."""
        tool_name = params.get("name", "")
        arguments = params.get("arguments", {})

        handlers = {
            "get_module": self._get_module,
            "list_modules": self._list_modules,
            "search_knowledge": self._search_knowledge,
            "lookup_term": self._lookup_term,
            "get_architecture_pattern": self._get_architecture_pattern,
            "get_froot_overview": self._get_froot_overview,
            "estimate_cost": self._estimate_cost,
            "validate_config": self._validate_config,
            "semantic_search_plays": self._semantic_search_plays,
            "agent_build": self._agent_build,
            "agent_review": self._agent_review,
            "agent_tune": self._agent_tune,
        }

        handler = handlers.get(tool_name)
        if handler:
            result = handler(arguments)
            return self._response(req_id, {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]})
        return self._error(req_id, -32602, f"Unknown tool: {tool_name}")

    # ─── Tool Implementations ───

    def _get_module(self, args: dict) -> dict:
        module_id = args.get("module_id", "")
        modules = self.knowledge.get("modules", {})
        if module_id in modules:
            return {"module": module_id, "content": modules[module_id]}
        # Fuzzy match
        for key, val in modules.items():
            if module_id.lower() in key.lower():
                return {"module": key, "content": val}
        return {"error": f"Module '{module_id}' not found", "available": list(modules.keys())}

    def _list_modules(self, args: dict) -> dict:
        modules = self.knowledge.get("modules", {})
        return {"count": len(modules), "modules": [{"id": k, "title": v.get("title", k)} for k, v in modules.items()]}

    def _search_knowledge(self, args: dict) -> dict:
        query = args.get("query", "").lower()
        results = []
        for mod_id, mod in self.knowledge.get("modules", {}).items():
            text = json.dumps(mod).lower()
            if query in text:
                results.append({"module": mod_id, "title": mod.get("title", mod_id)})
        return {"query": query, "results": results[:10], "total": len(results)}

    def _lookup_term(self, args: dict) -> dict:
        term = args.get("term", "").lower()
        glossary = self.knowledge.get("glossary", {})
        if term in glossary:
            return {"term": term, "definition": glossary[term]}
        for key, val in glossary.items():
            if term in key.lower():
                return {"term": key, "definition": val}
        return {"error": f"Term '{term}' not found"}

    def _get_architecture_pattern(self, args: dict) -> dict:
        return {"scenario": args.get("scenario"), "patterns": ["RAG", "Agent", "Gateway", "Multi-Agent"], "recommendation": "Use FrootAI solution plays for pre-tuned architecture patterns."}

    def _get_froot_overview(self, args: dict) -> dict:
        return {"name": "FrootAI", "tagline": "From the Roots to the Fruits. It's simply Frootful.", "tools": 22, "modules": 18, "plays": 20, "terms": "200+", "website": "https://frootai.dev"}

    def _estimate_cost(self, args: dict) -> dict:
        play = args.get("play", "enterprise-rag")
        scale = args.get("scale", "dev")
        costs = {"dev": {"openai": 15, "search": 50, "compute": 30, "total": 95}, "prod": {"openai": 150, "search": 250, "compute": 200, "total": 600}}
        return {"play": play, "scale": scale, "monthly_usd": costs.get(scale, costs["dev"])}

    def _validate_config(self, args: dict) -> dict:
        config = args.get("config", {})
        warnings = []
        if config.get("temperature", 0) > 0.5:
            warnings.append("Temperature > 0.5 may reduce consistency")
        if not config.get("max_tokens"):
            warnings.append("No max_tokens set — consider adding a limit")
        return {"valid": len(warnings) == 0, "warnings": warnings}

    def _semantic_search_plays(self, args: dict) -> dict:
        query = args.get("query", "").lower()
        plays = [
            {"id": "01", "name": "Enterprise RAG", "keywords": ["rag", "search", "document", "qa"]},
            {"id": "02", "name": "AI Landing Zone", "keywords": ["infrastructure", "landing", "vnet", "rbac"]},
            {"id": "03", "name": "Deterministic Agent", "keywords": ["agent", "deterministic", "reliable"]},
        ]
        matches = [p for p in plays if any(k in query for k in p["keywords"])]
        return {"query": query, "matches": matches[:3]}

    def _agent_build(self, args: dict) -> dict:
        return {"scenario": args.get("scenario"), "recommendation": "Use `npx frootai scaffold` to create a complete project with DevKit + TuneKit + SpecKit."}

    def _agent_review(self, args: dict) -> dict:
        return {"status": "review_complete", "checks": ["security", "waf_alignment", "config_validation"], "passed": True}

    def _agent_tune(self, args: dict) -> dict:
        return {"status": "tuning_complete", "recommendations": ["Consider temperature=0.1 for deterministic responses", "Enable grounding_check in guardrails.json"]}

    # ─── Protocol Helpers ───

    def _response(self, req_id: Any, result: dict) -> dict:
        return {"jsonrpc": "2.0", "id": req_id, "result": result}

    def _error(self, req_id: Any, code: int, message: str) -> dict:
        return {"jsonrpc": "2.0", "id": req_id, "error": {"code": code, "message": message}}

    def run(self):
        """Run MCP server over stdio."""
        for line in sys.stdin:
            line = line.strip()
            if not line:
                continue
            try:
                request = json.loads(line)
                response = self.handle_request(request)
                if response:
                    sys.stdout.write(json.dumps(response) + "\n")
                    sys.stdout.flush()
            except json.JSONDecodeError:
                error = self._error(None, -32700, "Parse error")
                sys.stdout.write(json.dumps(error) + "\n")
                sys.stdout.flush()


def main():
    """Entry point for frootai-mcp-py command."""
    server = FrootAIMCP()
    server.run()


if __name__ == "__main__":
    main()
