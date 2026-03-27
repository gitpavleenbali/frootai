"""FrootAI Solution Plays — 20 pre-tuned AI architecture blueprints."""

from dataclasses import dataclass
from typing import Optional


@dataclass
class SolutionPlay:
    """A FrootAI solution play."""
    id: str
    name: str
    description: str
    complexity: str
    status: str
    infra: list[str]
    tuning: list[str]

    @staticmethod
    def all() -> list["SolutionPlay"]:
        """Get all 20 solution plays."""
        return [
            SolutionPlay("01", "Enterprise RAG Q&A", "Production RAG with AI Search + OpenAI", "Medium", "Ready", ["AI Search", "OpenAI", "Container Apps"], ["temperature", "top-k", "chunk-size"]),
            SolutionPlay("02", "AI Landing Zone", "Foundation Azure infra for AI workloads", "Foundation", "Ready", ["VNet", "Private Endpoints", "RBAC"], ["network-config", "SKUs", "GPU-quota"]),
            SolutionPlay("03", "Deterministic Agent", "Reliable agent with temp=0, guardrails", "Medium", "Ready", ["Container Apps", "OpenAI", "Content Safety"], ["temperature=0", "JSON-schema", "citations"]),
            SolutionPlay("04", "Call Center Voice AI", "Voice-enabled customer service", "High", "Skeleton", ["Communication Services", "AI Speech"], ["speech-config", "voice-personality"]),
            SolutionPlay("05", "IT Ticket Resolution", "Auto-classify and resolve IT tickets", "Medium", "Skeleton", ["Logic Apps", "OpenAI", "ServiceNow"], ["classification-prompts", "routing-rules"]),
            SolutionPlay("06", "Document Intelligence", "Extract and structure document data", "Medium", "Skeleton", ["Document Intelligence", "OpenAI"], ["extraction-prompts", "field-schemas"]),
            SolutionPlay("07", "Multi-Agent Service", "Supervisor + specialist agents", "High", "Skeleton", ["Container Apps", "Dapr"], ["supervisor-routing", "handoff-rules"]),
            SolutionPlay("08", "Copilot Studio Bot", "Low-code enterprise bot", "Low", "Skeleton", ["Copilot Studio", "Dataverse"], ["topic-design", "knowledge-sources"]),
            SolutionPlay("09", "AI Search Portal", "Enterprise search with semantic ranking", "Medium", "Skeleton", ["AI Search", "App Service"], ["hybrid-weights", "scoring-profiles"]),
            SolutionPlay("10", "Content Moderation", "AI Content Safety + filtering", "Low", "Skeleton", ["Content Safety", "API Management"], ["severity-levels", "blocklists"]),
            SolutionPlay("11", "Landing Zone Advanced", "Multi-region, policy-driven", "High", "Skeleton", ["Multi-region VNet", "Azure Policy"], ["governance-policies", "advanced-RBAC"]),
            SolutionPlay("12", "Model Serving AKS", "GPU model serving on Kubernetes", "High", "Skeleton", ["AKS", "GPU Nodes"], ["model-config", "scaling-rules"]),
            SolutionPlay("13", "Fine-Tuning Workflow", "Custom model fine-tuning pipeline", "High", "Skeleton", ["OpenAI Fine-tuning", "Blob Storage"], ["dataset-prep", "hyperparameters"]),
            SolutionPlay("14", "AI Gateway", "API management + cost control", "Medium", "Skeleton", ["API Management", "OpenAI"], ["rate-limits", "token-budgets"]),
            SolutionPlay("15", "Multi-Modal DocProc", "Vision + document processing", "High", "Skeleton", ["Document Intelligence", "GPT-4o"], ["extraction-config", "confidence-thresholds"]),
            SolutionPlay("16", "Copilot Teams Extension", "Teams bot with Copilot Studio", "Medium", "Skeleton", ["Teams", "Copilot Studio"], ["adaptive-cards", "auth-config"]),
            SolutionPlay("17", "AI Observability", "Monitoring + tracing for AI", "Medium", "Skeleton", ["App Insights", "Log Analytics"], ["custom-metrics", "alert-rules"]),
            SolutionPlay("18", "Prompt Management", "Version-controlled prompt library", "Low", "Skeleton", ["Blob Storage", "Container Apps"], ["prompt-templates", "A/B-config"]),
            SolutionPlay("19", "Edge AI Phi-4", "On-device AI with Phi models", "High", "Skeleton", ["ONNX Runtime", "Phi-4"], ["quantization", "edge-config"]),
            SolutionPlay("20", "Anomaly Detection", "Real-time anomaly detection", "High", "Skeleton", ["Event Hub", "Stream Analytics"], ["thresholds", "detection-windows"]),
        ]

    @staticmethod
    def get(play_id: str) -> Optional["SolutionPlay"]:
        """Get a solution play by ID."""
        for play in SolutionPlay.all():
            if play.id == play_id or play_id in play.name.lower():
                return play
        return None
