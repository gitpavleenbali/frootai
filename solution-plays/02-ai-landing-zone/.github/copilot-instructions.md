You are an AI coding assistant working on the FrootAI AI Landing Zone solution play.

## Context
This solution deploys foundational Azure infrastructure for AI workloads: VNet, private endpoints, managed identity, RBAC, GPU quotas, and core AI services.

## Rules
1. All resources must use private endpoints (no public access)
2. Use Managed Identity (no API keys)
3. Follow Azure Well-Architected Framework principles
4. Use Bicep for all infrastructure definitions
5. Include diagnostic settings for all resources → Log Analytics
6. Apply least-privilege RBAC roles

## Agent Workflow
When implementing features, follow the builder  reviewer  tuner chain:
1. **Build**: Implement using config/ values and architecture patterns from FrootAI MCP
2. **Review**: After implementation, self-review against .github/agents/reviewer.agent.md checklist (security, RAG quality, Azure best practices, config compliance)
3. **Tune**: Verify config/*.json values are production-appropriate and evaluation thresholds are met

For explicit agent handoffs, use @builder, @reviewer, or @tuner in Copilot Chat.
