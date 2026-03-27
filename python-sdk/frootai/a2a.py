"""FrootAI A2A Protocol — Agent-to-Agent communication.

Implements the emerging A2A standard for inter-agent communication.
FrootAI agents can discover, negotiate, and delegate tasks to other agents.

Usage:
    from frootai.a2a import AgentCard, A2AClient
    
    card = AgentCard(
        name="frootai-rag-agent",
        description="Enterprise RAG Q&A agent",
        capabilities=["search", "summarize", "cite"],
        endpoint="https://my-agent.azurewebsites.net/a2a",
    )
    
    client = A2AClient()
    response = client.send_task(card, {"query": "What is RAG?"})
"""

from dataclasses import dataclass, field
from typing import Optional
import json


@dataclass
class AgentCard:
    """A2A Agent Card — describes an agent's capabilities.
    
    Based on the Agent-to-Agent (A2A) protocol specification.
    """
    name: str
    description: str
    capabilities: list[str] = field(default_factory=list)
    endpoint: str = ""
    version: str = "1.0.0"
    protocol: str = "a2a/1.0"
    authentication: Optional[str] = None  # "bearer", "managed-identity", None

    def to_json(self) -> str:
        return json.dumps({
            "name": self.name,
            "description": self.description,
            "capabilities": self.capabilities,
            "endpoint": self.endpoint,
            "version": self.version,
            "protocol": self.protocol,
            "authentication": self.authentication,
        }, indent=2)

    @staticmethod
    def frootai_card() -> "AgentCard":
        """Get the FrootAI agent card."""
        return AgentCard(
            name="frootai",
            description="FrootAI — AI architecture knowledge agent. 22 tools, 20 solution plays, 18 modules.",
            capabilities=["search_knowledge", "estimate_cost", "validate_config", "scaffold_project", "agent_build", "agent_review", "agent_tune"],
            endpoint="https://frootai-chatbot-api.azurewebsites.net/a2a",
            version="3.2.0",
        )


@dataclass  
class A2ATask:
    """A task sent between agents."""
    task_id: str
    from_agent: str
    to_agent: str
    action: str
    payload: dict = field(default_factory=dict)
    status: str = "pending"  # pending, running, completed, failed


class A2AClient:
    """Client for sending tasks to other A2A-compatible agents."""

    def __init__(self):
        self._registry: dict[str, AgentCard] = {}

    def register(self, card: AgentCard):
        """Register an agent in the local registry."""
        self._registry[card.name] = card

    def discover(self, capability: str) -> list[AgentCard]:
        """Find agents with a specific capability."""
        return [c for c in self._registry.values() if capability in c.capabilities]

    def send_task(self, target: AgentCard, payload: dict) -> dict:
        """Send a task to another agent (stub)."""
        # Stub: replace with actual HTTP call to target.endpoint
        return {
            "status": "accepted",
            "target": target.name,
            "payload": payload,
            "message": f"Task sent to {target.name} at {target.endpoint}",
        }

    def list_agents(self) -> list[str]:
        """List all registered agents."""
        return list(self._registry.keys())
