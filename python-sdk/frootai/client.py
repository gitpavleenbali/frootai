"""FrootAI Client — Main entry point for the SDK."""

import httpx
from typing import Optional


class FrootAI:
    """FrootAI SDK client.
    
    Provides programmatic access to the FrootAI REST API
    and local knowledge base.
    
    Usage:
        client = FrootAI()
        plays = client.search_plays("RAG")
        cost = client.estimate_cost("01-enterprise-rag")
    """

    DEFAULT_BASE_URL = "https://frootai-chatbot-api.azurewebsites.net"

    def __init__(self, base_url: Optional[str] = None, api_key: Optional[str] = None):
        self.base_url = base_url or self.DEFAULT_BASE_URL
        self.api_key = api_key
        self._client = httpx.Client(
            base_url=self.base_url,
            timeout=30.0,
            headers={"User-Agent": "frootai-python-sdk/3.2.0"},
        )

    def search_plays(self, query: str) -> dict:
        """Search solution plays by keyword."""
        response = self._client.get("/api/search", params={"q": query})
        response.raise_for_status()
        return response.json()

    def estimate_cost(self, play: str, scale: str = "dev") -> dict:
        """Estimate Azure AI costs for a solution play."""
        response = self._client.get("/api/cost", params={"service": play, "scale": scale})
        response.raise_for_status()
        return response.json()

    def chat(self, message: str) -> dict:
        """Chat with Agent FAI."""
        response = self._client.post("/api/chat", json={"message": message})
        response.raise_for_status()
        return response.json()

    def health(self) -> dict:
        """Check API health."""
        response = self._client.get("/api/health")
        response.raise_for_status()
        return response.json()

    def close(self):
        """Close the HTTP client."""
        self._client.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()
