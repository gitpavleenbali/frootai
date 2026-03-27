"""FrootAI Telemetry & Analytics — App Insights integration for MCP usage tracking.

Tracks: tool calls, latency, error rates, play adoption, knowledge searches.

Usage:
    from frootai.telemetry import FrootAITelemetry
    
    telemetry = FrootAITelemetry(connection_string="InstrumentationKey=...")
    telemetry.track_tool_call("search_knowledge", {"query": "RAG"}, duration_ms=45)
    telemetry.track_play_scaffold("01-enterprise-rag")
"""

from dataclasses import dataclass
from typing import Optional
import time
import json


@dataclass
class TelemetryEvent:
    """A telemetry event."""
    name: str
    properties: dict
    timestamp: float
    duration_ms: Optional[float] = None


class FrootAITelemetry:
    """FrootAI telemetry client.
    
    Integrates with Azure Application Insights for tracking
    MCP tool usage, play adoption, and quality metrics.
    """

    def __init__(self, connection_string: Optional[str] = None, enabled: bool = True):
        self.connection_string = connection_string
        self.enabled = enabled and connection_string is not None
        self._events: list[TelemetryEvent] = []  # Local buffer

    def track_tool_call(self, tool_name: str, args: dict, duration_ms: float = 0, success: bool = True):
        """Track an MCP tool call."""
        if not self.enabled:
            return
        self._events.append(TelemetryEvent(
            name="frootai/tool_call",
            properties={"tool": tool_name, "success": success, "args_keys": list(args.keys())},
            timestamp=time.time(),
            duration_ms=duration_ms,
        ))

    def track_play_scaffold(self, play_id: str, scale: str = "dev"):
        """Track a solution play scaffold."""
        if not self.enabled:
            return
        self._events.append(TelemetryEvent(
            name="frootai/play_scaffold",
            properties={"play": play_id, "scale": scale},
            timestamp=time.time(),
        ))

    def track_waf_check(self, passed: int, total: int, overall_pct: float):
        """Track a WAF alignment check."""
        if not self.enabled:
            return
        self._events.append(TelemetryEvent(
            name="frootai/waf_check",
            properties={"passed": passed, "total": total, "pct": overall_pct},
            timestamp=time.time(),
        ))

    def track_evaluation(self, metrics: dict[str, float], all_passed: bool):
        """Track an evaluation run."""
        if not self.enabled:
            return
        self._events.append(TelemetryEvent(
            name="frootai/evaluation",
            properties={"metrics": metrics, "all_passed": all_passed},
            timestamp=time.time(),
        ))

    def flush(self):
        """Flush events to Application Insights."""
        if not self.enabled or not self._events:
            return
        # Stub: replace with actual App Insights SDK call
        # from opencensus.ext.azure import metrics_exporter
        for event in self._events:
            print(f"[telemetry] {event.name}: {json.dumps(event.properties)}")
        self._events.clear()

    @property
    def event_count(self) -> int:
        """Number of buffered events."""
        return len(self._events)
