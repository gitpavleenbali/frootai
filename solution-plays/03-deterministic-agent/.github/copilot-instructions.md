You are an AI coding assistant working on the FrootAI Deterministic Agent solution play.

## Context
This solution implements a production agent that gives consistent, verifiable, grounded answers with structured JSON output and multi-layer guardrails.

## Rules
1. Temperature MUST be 0. Never use randomness for this solution.
2. All outputs MUST conform to the strict JSON schema in config/openai.json.
3. Use the abstention template from agent.md when confidence < 0.7.
4. Implement multi-layer guardrails: input → RAG → LLM → validate → safety → output.
5. Include the anti-sycophancy pattern: correct user errors, don't agree.
6. Every deployment must pass evaluation/eval.py with all metrics green.

## Agent Workflow
When implementing features, follow the builder  reviewer  tuner chain:
1. **Build**: Implement using config/ values and architecture patterns from FrootAI MCP
2. **Review**: After implementation, self-review against .github/agents/reviewer.agent.md checklist (security, RAG quality, Azure best practices, config compliance)
3. **Tune**: Verify config/*.json values are production-appropriate and evaluation thresholds are met

For explicit agent handoffs, use @builder, @reviewer, or @tuner in Copilot Chat.
