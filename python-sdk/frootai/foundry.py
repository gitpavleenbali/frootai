"""FrootAI Foundry Integration — Deploy solution plays as Foundry hosted agents.

Usage:
    from frootai.foundry import FoundryDeployer
    
    deployer = FoundryDeployer(project="my-foundry-project")
    deployer.deploy_play("01-enterprise-rag", scale="dev")
"""

from dataclasses import dataclass
from typing import Optional
import json


@dataclass
class FoundryConfig:
    """Foundry deployment configuration."""
    project: str
    region: str = "swedencentral"
    model: str = "gpt-4o-mini"
    resource_group: Optional[str] = None
    subscription_id: Optional[str] = None


class FoundryDeployer:
    """Deploy FrootAI solution plays as Foundry hosted agents.
    
    Requires:
    - Azure AI Foundry project
    - Azure Container Registry
    - Managed Identity with proper RBAC
    """

    def __init__(self, project: str, region: str = "swedencentral"):
        self.config = FoundryConfig(project=project, region=region)

    def generate_agent_yaml(self, play_id: str) -> str:
        """Generate agent.yaml for Foundry deployment."""
        return json.dumps({
            "name": f"frootai-{play_id}",
            "description": f"FrootAI solution play {play_id} deployed as Foundry agent",
            "model": self.config.model,
            "instructions": f"You are an AI agent based on FrootAI solution play {play_id}. Use the bundled knowledge and configs.",
            "tools": ["search_knowledge", "estimate_cost", "validate_config"],
            "knowledge": {"type": "index", "source": "frootai-knowledge"},
        }, indent=2)

    def generate_dockerfile(self, play_id: str) -> str:
        """Generate Dockerfile for Foundry container."""
        return f"""FROM ghcr.io/gitpavleenbali/frootai-mcp:latest

# Add play-specific configs
COPY config/ /app/config/
COPY spec/ /app/spec/

ENV PLAY_ID={play_id}
ENV FROOTAI_MODE=foundry

EXPOSE 8080
CMD ["node", "index.js"]
"""

    def deploy_play(self, play_id: str, scale: str = "dev") -> dict:
        """Deploy a solution play to Foundry (stub).
        
        Full implementation requires:
        1. Docker build with play configs
        2. Push to ACR
        3. Create Foundry agent via API
        4. Configure knowledge index
        5. Set up monitoring
        """
        return {
            "status": "scaffold_ready",
            "play": play_id,
            "scale": scale,
            "project": self.config.project,
            "agent_yaml": "Generated — run `az ai foundry agent create` to deploy",
            "dockerfile": "Generated — run `docker build` then push to ACR",
            "next_steps": [
                f"az acr build --registry <acr-name> --image frootai-{play_id}:latest .",
                f"az ai foundry agent create --project {self.config.project} --yaml agent.yaml",
            ],
        }

    def list_deployments(self) -> list[dict]:
        """List deployed FrootAI agents (stub)."""
        return [{"message": "Connect to Foundry API to list deployed agents"}]
