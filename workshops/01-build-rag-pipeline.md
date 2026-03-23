# Workshop 01: Build Your First RAG Pipeline with FrootAI

> **Facilitator Guide** — A timed, section-by-section outline for delivering this workshop.

---

## Metadata

| Field | Value |
|-------|-------|
| **Duration** | 2 hours |
| **Level** | Intermediate |
| **Max attendees** | 25 (hands-on), unlimited (demo-only) |
| **Solution Play** | Play 01 — Enterprise RAG Pipeline |
| **Azure services** | Azure OpenAI, Azure AI Search, Azure Blob Storage |

---

## Prerequisites

Before the session, every attendee must have:

- [ ] Azure subscription with **Contributor** access
- [ ] Azure OpenAI resource with **GPT-4o** deployment (name: `gpt-4o`)
- [ ] Azure AI Search resource (**Basic** tier or higher)
- [ ] Azure Blob Storage account
- [ ] VS Code with the **FrootAI extension** installed
- [ ] Node.js 18+ and Python 3.10+
- [ ] `pip install azure-search-documents openai tiktoken`
- [ ] Cloned lab repo: `git clone https://github.com/FrootAI/workshop-rag-lab`

> **Facilitator tip:** Send the prerequisite checklist 1 week before. Offer a 30-min "environment check" session the day before.

---

## Section 1: Concepts (20 min)

### What to Demo
- Slide deck: "What is RAG?" — the retrieval-augmented generation pattern.
- Architecture diagram: User → Agent → Search Index → LLM → Grounded Answer.
- Contrast: Fine-tuning vs. RAG vs. prompt stuffing. When to use each.
- Show the FrootAI Play 01 `agent.md` to illustrate how the solution play defines the pipeline.

### What Attendees Do
- Whiteboard exercise: sketch their own data → answer flow on paper (3 min).
- Group discussion: "What data would you RAG against in your org?"

### Key Takeaway
> RAG keeps your model general and your data fresh. The retrieval step is what makes answers grounded and auditable.

---

## Section 2: Data Preparation (20 min)

### What to Demo
- Load sample PDFs into Azure Blob Storage (use provided `upload_docs.py` script).
- Chunking strategy: overlapping fixed-size chunks (512 tokens, 128 overlap).
- Live code: generate embeddings with `text-embedding-3-large` via Azure OpenAI.
- Show token counting with `tiktoken` — why chunk size matters for cost.

### What Attendees Do
- Run `upload_docs.py` against their own storage account.
- Run `chunk_and_embed.py` — observe the output JSON.
- Experiment: change chunk size to 256 and 1024, compare embedding counts.

### Key Takeaway
> Chunking is the highest-leverage decision in RAG. Too small → lost context. Too large → noise. 512 tokens with 128 overlap is a strong default.

---

## Section 3: Index Build (20 min)

### What to Demo
- Create an Azure AI Search index with fields: `id`, `content`, `embedding` (vector), `source`, `title`.
- Configure vector search profile: HNSW algorithm, cosine similarity, dimensions = 3072.
- Push chunked + embedded data to the index using the Python SDK.
- Show the Azure Portal: browse the index, run a sample query.

### What Attendees Do
- Run `create_index.py` to provision the index.
- Run `push_data.py` to load their embedded chunks.
- Verify in the Portal: query for a keyword, check result count.

### Key Takeaway
> Azure AI Search gives you vector + keyword + semantic ranking in a single index. No need for a separate vector DB.

---

## Section 4: Query Pipeline (20 min)

### What to Demo
- Hybrid search: combine keyword BM25 + vector cosine in one query.
- Enable semantic ranker for re-ranking (L2 ranking model).
- Build the Python query function: `search_index(query, top_k=5)`.
- Show reranked results vs. raw results — semantic ranker surfaces better matches.

### What Attendees Do
- Run `search_demo.py` with 3 sample queries.
- Compare: vector-only vs. keyword-only vs. hybrid vs. hybrid + semantic ranker.
- Log latency for each mode.

### Key Takeaway
> Hybrid search with semantic ranking consistently outperforms any single retrieval method. Always use it if your tier supports it.

---

## Section 5: Agent Integration (20 min)

### What to Demo
- Wire the search function as an MCP tool: `search_knowledge_base`.
- Configure the tool in `mcp.json` — input schema, description, output format.
- Open VS Code → Copilot Chat → ask a question about the indexed documents.
- Show the MCP trace: agent calls tool → tool returns top-5 chunks → agent generates grounded answer.

### What Attendees Do
- Add the MCP tool config to their local `mcp.json`.
- Restart MCP server, verify tool appears in Copilot Chat tool list.
- Ask 3 questions: one that should hit the index, one that shouldn't, one ambiguous.
- Observe: does the agent correctly decide when to call the tool?

### Key Takeaway
> MCP is the bridge between your RAG index and any AI agent. The agent decides *when* to call your search tool — you just make it available.

---

## Section 6: Evaluation (20 min)

### What to Demo
- FrootAI evaluation framework: groundedness, relevance, coherence, fluency.
- Run `eval_pipeline.py` against 20 test questions with known-good answers.
- Show the evaluation report: per-question scores + aggregate metrics.
- Demonstrate: a bad chunk size (2048) → lower groundedness score.

### What Attendees Do
- Run `eval_pipeline.py` on their own index.
- Review their scores — identify the lowest-scoring questions.
- Tweak one parameter (chunk size, top_k, or prompt template) and re-run.
- Compare: did the score improve?

### Key Takeaway
> You can't improve what you don't measure. Run evaluation after every pipeline change. FrootAI makes this a one-command operation.

---

## Wrap-Up (5 min buffer)

- Recap the 6 stages: Concepts → Data → Index → Query → Agent → Eval.
- Share the lab repo link for continued practice.
- Point to Play 01 in the FrootAI Solution Plays library for production-ready templates.
- Collect feedback (survey link).

---

## Appendix: Troubleshooting

| Symptom | Fix |
|---------|-----|
| `AuthenticationError` on Azure OpenAI | Check `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_API_KEY` env vars. Prefer `DefaultAzureCredential`. |
| Search returns 0 results | Verify index has documents: Portal → Search Explorer → `*`. Check field names match query. |
| MCP tool not visible in Copilot | Restart VS Code. Check `mcp.json` path is correct. Run `npx @abacloud/frootai-mcp` to verify. |
| Embedding dimension mismatch | Ensure index vector field dimensions match model output (3072 for `text-embedding-3-large`). |
| Slow search latency (>2s) | Use Basic tier or higher. Check network — private endpoint recommended for production. |

---

## License

This workshop material is part of the FrootAI project and is available under the MIT License.
