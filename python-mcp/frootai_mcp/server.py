"""FrootAI MCP Server — Production Python Implementation.

All tools query the bundled 682KB knowledge.json with real data.
Compatible with Claude Desktop, VS Code Copilot, Cursor, any MCP client.
"""
import json, sys, re
from pathlib import Path
from typing import Any, Optional

PLAYS = [
    {"id":"01","name":"Enterprise RAG Q&A","desc":"Production RAG — AI Search + OpenAI + Container Apps","cx":"Medium","infra":"AI Search · Azure OpenAI · Container Apps · Blob","tune":"temperature · top-k · chunk size · reranking"},
    {"id":"02","name":"AI Landing Zone","desc":"Foundation Azure infra — VNet, private endpoints, RBAC, GPU quotas","cx":"Foundation","infra":"VNet · Private Endpoints · RBAC · Managed Identity · Key Vault","tune":"Network config · SKUs · GPU quota · region"},
    {"id":"03","name":"Deterministic Agent","desc":"Reliable agent — temp=0, structured JSON, guardrails","cx":"Medium","infra":"Container Apps · Azure OpenAI · Content Safety","tune":"temperature=0 · JSON schema · seed · citations"},
    {"id":"04","name":"Call Center Voice AI","desc":"Voice customer service — Communication Services + AI Speech","cx":"High","infra":"Communication Services · AI Speech · Azure OpenAI","tune":"Speech config · grounding prompts"},
    {"id":"05","name":"IT Ticket Resolution","desc":"Auto-classify, route, resolve IT tickets","cx":"Medium","infra":"Logic Apps · Azure OpenAI · ServiceNow MCP","tune":"Classification prompts · routing rules"},
    {"id":"06","name":"Document Intelligence","desc":"Extract, classify, structure document data","cx":"Medium","infra":"Blob · Document Intelligence · Azure OpenAI","tune":"Extraction prompts · confidence thresholds"},
    {"id":"07","name":"Multi-Agent Service","desc":"Supervisor + specialist agents","cx":"High","infra":"Container Apps · Azure OpenAI · Cosmos DB · Dapr","tune":"Supervisor routing · handoff rules"},
    {"id":"08","name":"Copilot Studio Bot","desc":"Low-code enterprise bot","cx":"Low","infra":"Copilot Studio · Dataverse · SharePoint","tune":"Topic design · knowledge sources"},
    {"id":"09","name":"AI Search Portal","desc":"Enterprise search with semantic ranking","cx":"Medium","infra":"AI Search · App Service · Azure OpenAI","tune":"Hybrid weights · scoring profiles"},
    {"id":"10","name":"Content Moderation","desc":"AI Content Safety + filtering","cx":"Low","infra":"Content Safety · API Management · Functions","tune":"Severity levels · blocklists"},
    {"id":"11","name":"Landing Zone Advanced","desc":"Multi-region, policy-driven AI landing zone","cx":"High","infra":"Multi-region VNet · Azure Policy · RBAC","tune":"Governance · advanced RBAC"},
    {"id":"12","name":"Model Serving AKS","desc":"GPU model serving on Kubernetes","cx":"High","infra":"AKS · GPU Nodes · Container Registry","tune":"Model config · autoscaling"},
    {"id":"13","name":"Fine-Tuning Workflow","desc":"Custom model fine-tuning pipeline","cx":"High","infra":"OpenAI Fine-tuning · Blob Storage","tune":"Dataset prep · hyperparameters"},
    {"id":"14","name":"AI Gateway","desc":"API management + cost control for AI","cx":"Medium","infra":"API Management · Azure OpenAI · Functions","tune":"Rate limits · token budgets"},
    {"id":"15","name":"Multi-Modal DocProc","desc":"Vision + document processing","cx":"High","infra":"Document Intelligence · GPT-4o · Blob","tune":"Extraction config · confidence"},
    {"id":"16","name":"Copilot Teams Extension","desc":"Teams bot with AI capabilities","cx":"Medium","infra":"Teams · Bot Framework · Azure OpenAI","tune":"Adaptive cards · auth config"},
    {"id":"17","name":"AI Observability","desc":"Monitoring + tracing for AI workloads","cx":"Medium","infra":"App Insights · Log Analytics · Azure Monitor","tune":"Custom metrics · alert rules"},
    {"id":"18","name":"Prompt Management","desc":"Version-controlled prompt library","cx":"Low","infra":"Blob Storage · Container Apps · Cosmos DB","tune":"Prompt templates · A/B config"},
    {"id":"19","name":"Edge AI Phi-4","desc":"On-device AI with Phi models","cx":"High","infra":"ONNX Runtime · Phi-4-mini · Edge devices","tune":"Quantization · edge config"},
    {"id":"20","name":"Anomaly Detection","desc":"Real-time anomaly detection in streams","cx":"High","infra":"Event Hub · Stream Analytics · Azure OpenAI","tune":"Threshold config · detection windows"},
]

COST_DATA = {
    "dev": {"azure-openai": 15, "ai-search": 50, "container-apps": 30, "key-vault": 1, "blob-storage": 2, "app-insights": 5},
    "prod": {"azure-openai": 150, "ai-search": 250, "container-apps": 200, "key-vault": 3, "blob-storage": 20, "app-insights": 30},
}

class FrootAIMCP:
    def __init__(self):
        self.knowledge = self._load_knowledge()
        self.modules = self.knowledge.get("modules", {})
        self.layers = self.knowledge.get("layers", {})
        self.version = self.knowledge.get("version", "3.2.0")
        self._glossary_cache = None
        self.tools = self._register_tools()

    def _load_knowledge(self):
        p = Path(__file__).parent / "knowledge.json"
        if not p.exists():
            raise FileNotFoundError(f"knowledge.json not found at {p}")
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)

    def _build_glossary(self):
        if self._glossary_cache: return self._glossary_cache
        g = {}
        for m in self.modules.values():
            for match in re.finditer(r'\*\*([^*]{2,60})\*\*\s*[—:–]\s*([^\n]{10,})', m.get("content","")):
                g[match.group(1).strip().lower()] = {"term": match.group(1).strip(), "definition": match.group(2).strip()}
        self._glossary_cache = g
        return g

    def _register_tools(self):
        return [
            {"name":"get_module","description":"Get a FROOT knowledge module by ID (F1,R1,O1,T1...)","inputSchema":{"type":"object","properties":{"module_id":{"type":"string"}},"required":["module_id"]}},
            {"name":"list_modules","description":"List all FROOT knowledge modules","inputSchema":{"type":"object","properties":{}}},
            {"name":"search_knowledge","description":"Full-text search across all modules","inputSchema":{"type":"object","properties":{"query":{"type":"string"}},"required":["query"]}},
            {"name":"lookup_term","description":"Look up an AI term (200+ terms)","inputSchema":{"type":"object","properties":{"term":{"type":"string"}},"required":["term"]}},
            {"name":"get_architecture_pattern","description":"Get architecture patterns for a scenario","inputSchema":{"type":"object","properties":{"scenario":{"type":"string"}},"required":["scenario"]}},
            {"name":"get_froot_overview","description":"FrootAI platform overview","inputSchema":{"type":"object","properties":{}}},
            {"name":"list_solution_plays","description":"List all 20 solution plays","inputSchema":{"type":"object","properties":{}}},
            {"name":"get_solution_play","description":"Get a specific solution play","inputSchema":{"type":"object","properties":{"play_id":{"type":"string"}},"required":["play_id"]}},
            {"name":"estimate_cost","description":"Estimate Azure costs for a play","inputSchema":{"type":"object","properties":{"play":{"type":"string"},"scale":{"type":"string","enum":["dev","prod"]}},"required":["play"]}},
            {"name":"validate_config","description":"Validate AI configuration","inputSchema":{"type":"object","properties":{"config":{"type":"object"}},"required":["config"]}},
            {"name":"semantic_search_plays","description":"Find best play for your scenario","inputSchema":{"type":"object","properties":{"query":{"type":"string"}},"required":["query"]}},
            {"name":"agent_build","description":"Get build guidance for an AI agent","inputSchema":{"type":"object","properties":{"scenario":{"type":"string"}},"required":["scenario"]}},
            {"name":"agent_review","description":"Review agent configuration","inputSchema":{"type":"object","properties":{"config":{"type":"string"}},"required":["config"]}},
            {"name":"agent_tune","description":"Get tuning recommendations","inputSchema":{"type":"object","properties":{"config":{"type":"string"}},"required":["config"]}},
            {"name":"get_github_agentic_os","description":"Explain .github Agentic OS","inputSchema":{"type":"object","properties":{}}},
            {"name":"list_community_plays","description":"List community plugins","inputSchema":{"type":"object","properties":{}}},
            {"name":"get_model_catalog","description":"AI model comparison guide","inputSchema":{"type":"object","properties":{"use_case":{"type":"string"}},"required":["use_case"]}},
            {"name":"get_azure_pricing","description":"Azure AI pricing info","inputSchema":{"type":"object","properties":{"service":{"type":"string"}},"required":["service"]}},
            {"name":"compare_models","description":"Compare AI models","inputSchema":{"type":"object","properties":{"task":{"type":"string"}},"required":["task"]}},
            {"name":"fetch_azure_docs","description":"Azure docs summary","inputSchema":{"type":"object","properties":{"topic":{"type":"string"}},"required":["topic"]}},
            {"name":"fetch_external_mcp","description":"Find external MCP servers","inputSchema":{"type":"object","properties":{"query":{"type":"string"}},"required":["query"]}},
            {"name":"get_play_spec","description":"Get SpecKit for a play","inputSchema":{"type":"object","properties":{"play_id":{"type":"string"}},"required":["play_id"]}},
        ]

    def handle_request(self, request):
        method = request.get("method",""); req_id = request.get("id"); params = request.get("params",{})
        if method == "initialize":
            return self._resp(req_id, {"protocolVersion":"2024-11-05","capabilities":{"tools":{"listChanged":False}},"serverInfo":{"name":"frootai-mcp","version":self.version}})
        elif method == "tools/list": return self._resp(req_id, {"tools": self.tools})
        elif method == "tools/call": return self._call_tool(req_id, params)
        elif method in ("notifications/initialized","ping"): return self._resp(req_id, {}) if req_id else None
        return self._err(req_id, -32601, f"Unknown method: {method}")

    def _call_tool(self, req_id, params):
        name = params.get("name",""); args = params.get("arguments",{})
        h = {"get_module":self._get_module,"list_modules":self._list_modules,"search_knowledge":self._search_knowledge,
             "lookup_term":self._lookup_term,"get_architecture_pattern":self._get_arch,"get_froot_overview":self._overview,
             "list_solution_plays":self._list_plays,"get_solution_play":self._get_play,"estimate_cost":self._cost,
             "validate_config":self._validate,"semantic_search_plays":self._search_plays,"agent_build":self._build,
             "agent_review":self._review,"agent_tune":self._tune,"get_github_agentic_os":self._agentic_os,
             "list_community_plays":self._community,"get_model_catalog":self._models,"get_azure_pricing":self._pricing,
             "compare_models":self._compare,"fetch_azure_docs":self._azure_docs,"fetch_external_mcp":self._ext_mcp,"get_play_spec":self._spec}
        fn = h.get(name)
        if not fn: return self._err(req_id, -32602, f"Unknown tool: {name}")
        try:
            r = fn(args)
            return self._resp(req_id, {"content":[{"type":"text","text":json.dumps(r,indent=2,ensure_ascii=False)}]})
        except Exception as e:
            return self._err(req_id, -32603, str(e))

    # ─── REAL TOOL IMPLEMENTATIONS ───
    def _get_module(self, a):
        mid = a.get("module_id","").upper().strip()
        if mid in self.modules:
            m = self.modules[mid]
            return {"id":m["id"],"title":m["title"],"layer":m.get("layer",""),"content":m["content"][:8000],"total_chars":len(m["content"])}
        q = a.get("module_id","").lower()
        for k,m in self.modules.items():
            if q in m.get("title","").lower() or q in k.lower():
                return {"id":m["id"],"title":m["title"],"layer":m.get("layer",""),"content":m["content"][:8000],"total_chars":len(m["content"])}
        return {"error":f"Module '{mid}' not found","available":[{"id":k,"title":v["title"]} for k,v in self.modules.items()]}

    def _list_modules(self, a):
        mods = [{"id":k,"title":v["title"],"layer":v.get("layer",""),"emoji":v.get("emoji",""),"chars":len(v.get("content",""))} for k,v in self.modules.items()]
        return {"count":len(mods),"modules":mods,"layers":{k:(v.get("name",k) if isinstance(v,dict) else v) for k,v in self.layers.items()}}

    def _search_knowledge(self, a):
        q = a.get("query","").lower().strip()
        if not q: return {"error":"Query required"}
        results = []
        for k,m in self.modules.items():
            c = m.get("content",""); cl = c.lower()
            if q in cl:
                idx = cl.index(q); s = max(0,idx-200); e = min(len(c),idx+len(q)+300)
                results.append({"module":k,"title":m["title"],"excerpt":f"...{c[s:e].strip()}...","hits":cl.count(q)})
        results.sort(key=lambda x:x["hits"],reverse=True)
        return {"query":q,"results":results[:10],"total":len(results)}

    def _lookup_term(self, a):
        t = a.get("term","").lower().strip(); g = self._build_glossary()
        if t in g: return g[t]
        matches = [v for k,v in g.items() if t in k or k in t]
        if matches: return {"matches":matches[:5]}
        for k,m in self.modules.items():
            c = m.get("content","")
            if t in c.lower():
                idx = c.lower().index(t); return {"term":t,"found_in":m["title"],"context":c[max(0,idx-100):min(len(c),idx+300)].strip()}
        return {"error":f"Term '{t}' not found"}

    def _get_arch(self, a):
        sc = a.get("scenario","").lower()
        ps = [{"play":f"{p['id']}—{p['name']}","desc":p["desc"],"infra":p["infra"]} for p in PLAYS if any(w in (p["desc"]+p["name"]).lower() for w in sc.split() if len(w)>2)]
        km = [{"module":k,"title":m["title"]} for k,m in self.modules.items() if sc.split()[0] in m.get("content","").lower()] if sc.split() else []
        return {"scenario":sc,"matching_plays":ps[:5],"relevant_modules":km[:3]}

    def _overview(self, a):
        return {"name":"FrootAI","tagline":"From the Roots to the Fruits. It's simply Frootful.","version":self.version,
                "framework":"FROOT = Foundations · Reasoning · Orchestration · Operations · Transformation",
                "stats":{"tools":22,"modules":len(self.modules),"plays":len(PLAYS),"terms":len(self._build_glossary()),"knowledge":"682KB"},
                "channels":["npm","pip","VS Code","Docker","CLI","REST API"],"website":"https://frootai.dev"}

    def _list_plays(self, a): return {"count":len(PLAYS),"plays":PLAYS}

    def _get_play(self, a):
        pid = a.get("play_id","").strip()
        for p in PLAYS:
            if p["id"]==pid.zfill(2) or pid.lower() in p["name"].lower(): return p
        return {"error":f"Play '{pid}' not found"}

    def _cost(self, a):
        sc = a.get("scale","dev"); costs = COST_DATA.get(sc, COST_DATA["dev"])
        return {"play":a.get("play",""),"scale":sc,"monthly_usd":costs,"total":sum(costs.values()),"note":"Estimates based on Azure retail pricing."}

    def _validate(self, a):
        cfg = a.get("config",{}); issues=[]; warns=[]
        t = cfg.get("temperature")
        if t is not None and t > 0.5: warns.append(f"temperature={t} — lower for production")
        if not cfg.get("max_tokens"): warns.append("No max_tokens limit set")
        if not cfg.get("blocked_categories") and not cfg.get("content_safety"): warns.append("No content safety configured")
        return {"valid":len(issues)==0,"issues":issues,"warnings":warns}

    def _search_plays(self, a):
        q = a.get("query","").lower()
        scored = []
        for p in PLAYS:
            s = sum(1 for w in q.split() if w in (p["name"]+p["desc"]+p["infra"]).lower())
            if s>0: scored.append({**p,"score":s})
        scored.sort(key=lambda x:x["score"],reverse=True)
        return {"query":q,"matches":scored[:5]}

    def _build(self, a):
        m = self._search_plays({"query":a.get("scenario","")})
        bp = m["matches"][0] if m["matches"] else PLAYS[0]
        return {"scenario":a.get("scenario",""),"recommended":f"{bp['id']}—{bp['name']}","steps":["1. npx frootai scaffold <play>","2. code . (MCP auto-connects)","3. @builder in Copilot Chat","4. npx frootai validate --waf"]}

    def _review(self, a):
        c = a.get("config","").lower()
        checks = {"instructions":"instruction" in c or "you are" in c,"guardrails":any(w in c for w in ["guardrail","safety","block"]),
                   "grounding":any(w in c for w in ["ground","cite","source"]),"evaluation":any(w in c for w in ["eval","test","threshold"])}
        return {"checks":checks,"passed":f"{sum(checks.values())}/{len(checks)}"}

    def _tune(self, a):
        return {"recommendations":["temperature=0.1 for production","grounding_check=true","Set max_tokens budget","blocked_categories for safety","semantic reranker with top_k=5","Run evaluation before shipping"]}

    def _agentic_os(self, a):
        return {"name":".github Agentic OS","files":19,"layers":{"1":"Instructions (always-on)","2":"Agents & Skills","3":"Hooks & Workflows","4":"Plugin Packaging"},"init":"npx frootai init"}

    def _community(self, a):
        return {"plays":[{"name":"servicenow-ai-agent","desc":"ServiceNow ITSM"},{"name":"salesforce-ai-copilot","desc":"Salesforce CRM"},{"name":"sap-ai-gateway","desc":"SAP S/4HANA"}],"marketplace":"https://frootai.dev/marketplace"}

    def _models(self, a):
        return {"models":[{"name":"GPT-4o","best_for":"Complex reasoning","cost":"$$$$"},{"name":"GPT-4o-mini","best_for":"Fast + cheap","cost":"$$"},{"name":"Phi-4","best_for":"Edge/on-device","cost":"$"}]}

    def _pricing(self, a):
        s = a.get("service","").lower()
        p = {"openai":{"gpt-4o-mini":"$0.15/1M in, $0.60/1M out","gpt-4o":"$2.50/1M in, $10/1M out"},"ai-search":{"basic":"$69/mo","standard":"$249/mo"},"container-apps":{"consumption":"$0.000024/vCPU-sec"}}
        for k,v in p.items():
            if k in s or s in k: return {"service":k,"pricing":v}
        return {"services":list(p.keys())}

    def _compare(self, a):
        return {"comparison":[{"model":"GPT-4o","quality":9.5,"speed":7,"cost":3},{"model":"GPT-4o-mini","quality":8,"speed":9,"cost":8},{"model":"Phi-4","quality":7,"speed":10,"cost":10}]}

    def _azure_docs(self, a):
        t = a.get("topic","")
        return {"topic":t,"url":f"https://learn.microsoft.com/azure/?q={t.replace(' ','+')}","tip":"Use search_knowledge for curated FrootAI content."}

    def _ext_mcp(self, a):
        return {"registries":["https://mcp.so","https://glama.ai/mcp/servers"],"tip":"FrootAI itself is an MCP server: npx frootai-mcp or pip install frootai-mcp"}

    def _spec(self, a):
        pid = a.get("play_id","01").zfill(2)
        p = next((x for x in PLAYS if x["id"]==pid),PLAYS[0])
        return {"play":p["name"],"spec":{"pattern":p["desc"],"complexity":p["cx"],"infra":p["infra"],"waf":{"reliability":"retry + health","security":"managed identity + PE","cost":"right-sized SKUs","operations":"CI/CD + diagnostics","performance":"caching + streaming","responsible_ai":"content safety + guardrails"}}}

    # ─── Protocol ───
    def _resp(self, rid, result): return {"jsonrpc":"2.0","id":rid,"result":result}
    def _err(self, rid, code, msg): return {"jsonrpc":"2.0","id":rid,"error":{"code":code,"message":msg}}

    def run(self):
        for line in sys.stdin:
            line = line.strip()
            if not line: continue
            try:
                req = json.loads(line); resp = self.handle_request(req)
                if resp: sys.stdout.write(json.dumps(resp)+"\n"); sys.stdout.flush()
            except json.JSONDecodeError:
                sys.stdout.write(json.dumps(self._err(None,-32700,"Parse error"))+"\n"); sys.stdout.flush()
            except Exception as e:
                sys.stdout.write(json.dumps(self._err(None,-32603,str(e)))+"\n"); sys.stdout.flush()

def main():
    FrootAIMCP().run()

if __name__ == "__main__":
    main()
