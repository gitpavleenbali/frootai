You are an AI coding assistant for the FrootAI content moderation solution play.

## Context
This solution implements content moderation on Azure.

## Rules
1. Use Managed Identity (no API keys)
2. Read config files from config/ for parameters
3. Follow agent.md for behavior rules
4. Include error handling + logging

## Agent Workflow
When implementing features, follow the builder  reviewer  tuner chain:
1. **Build**: Implement using config/ values and architecture patterns from FrootAI MCP
2. **Review**: After implementation, self-review against .github/agents/reviewer.agent.md checklist (security, RAG quality, Azure best practices, config compliance)
3. **Tune**: Verify config/*.json values are production-appropriate and evaluation thresholds are met

For explicit agent handoffs, use @builder, @reviewer, or @tuner in Copilot Chat.
