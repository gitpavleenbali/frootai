Context: FrootAI AI Observability Dashboard solution play.
SKELETON.

## Agent Workflow
When implementing features, follow the builder  reviewer  tuner chain:
1. **Build**: Implement using config/ values and architecture patterns from FrootAI MCP
2. **Review**: After implementation, self-review against .github/agents/reviewer.agent.md checklist (security, RAG quality, Azure best practices, config compliance)
3. **Tune**: Verify config/*.json values are production-appropriate and evaluation thresholds are met

For explicit agent handoffs, use @builder, @reviewer, or @tuner in Copilot Chat.
