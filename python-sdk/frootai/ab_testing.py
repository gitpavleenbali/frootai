"""FrootAI Prompt A/B Testing Framework.

Run prompt experiments across variants, measure quality, pick winners.

Usage:
    from frootai.ab_testing import PromptExperiment, PromptVariant
    
    experiment = PromptExperiment(
        name="rag-system-prompt-v2",
        variants=[
            PromptVariant("control", "You are a helpful assistant."),
            PromptVariant("concise", "You are a concise assistant. Answer in 2 sentences max."),
            PromptVariant("expert", "You are an Azure AI expert. Cite sources."),
        ],
        metrics=["groundedness", "relevance", "latency"],
    )
    
    results = experiment.run(test_queries=["What is RAG?", "Explain embeddings"])
    winner = experiment.pick_winner(results)
"""

from dataclasses import dataclass, field
from typing import Optional
import json
import time
import random


@dataclass
class PromptVariant:
    """A single prompt variant in an A/B test."""
    name: str
    system_prompt: str
    weight: float = 1.0  # Traffic allocation weight


@dataclass
class ExperimentResult:
    """Result of running one variant against one query."""
    variant: str
    query: str
    response: str
    latency_ms: float
    scores: dict[str, float] = field(default_factory=dict)


@dataclass
class PromptExperiment:
    """A/B testing experiment for prompt variants.
    
    Attributes:
        name: Experiment identifier
        variants: List of prompt variants to test
        metrics: Quality metrics to measure
    """
    name: str
    variants: list[PromptVariant]
    metrics: list[str] = field(default_factory=lambda: ["groundedness", "relevance", "coherence"])

    def run(self, test_queries: list[str], rounds: int = 1) -> list[ExperimentResult]:
        """Run the experiment (stub — wire to your LLM endpoint)."""
        results = []
        for _ in range(rounds):
            for query in test_queries:
                for variant in self.variants:
                    start = time.time()
                    # Stub: replace with actual LLM call
                    response = f"[{variant.name}] Response to: {query}"
                    latency = (time.time() - start) * 1000

                    result = ExperimentResult(
                        variant=variant.name,
                        query=query,
                        response=response,
                        latency_ms=latency,
                        scores={m: round(random.uniform(3.0, 5.0), 2) for m in self.metrics},
                    )
                    results.append(result)
        return results

    def pick_winner(self, results: list[ExperimentResult]) -> str:
        """Pick the best variant based on average scores."""
        variant_scores: dict[str, list[float]] = {}
        for r in results:
            if r.variant not in variant_scores:
                variant_scores[r.variant] = []
            avg = sum(r.scores.values()) / max(len(r.scores), 1)
            variant_scores[r.variant].append(avg)

        averages = {v: sum(s) / len(s) for v, s in variant_scores.items()}
        winner = max(averages, key=averages.get)
        return winner

    def summary(self, results: list[ExperimentResult]) -> str:
        """Generate experiment summary."""
        lines = [f"Experiment: {self.name}", "=" * 50]
        variant_data: dict[str, list] = {}
        for r in results:
            variant_data.setdefault(r.variant, []).append(r)

        for variant, data in variant_data.items():
            avg_scores = {}
            for m in self.metrics:
                avg_scores[m] = sum(r.scores.get(m, 0) for r in data) / len(data)
            avg_latency = sum(r.latency_ms for r in data) / len(data)
            lines.append(f"\n  Variant: {variant}")
            lines.append(f"  Samples: {len(data)}")
            for m, s in avg_scores.items():
                lines.append(f"    {m}: {s:.2f}")
            lines.append(f"    latency: {avg_latency:.0f}ms")

        winner = self.pick_winner(results)
        lines.append(f"\n  🏆 Winner: {winner}")
        return "\n".join(lines)

    def to_json(self) -> str:
        """Export experiment config as JSON."""
        return json.dumps({
            "name": self.name,
            "variants": [{"name": v.name, "system_prompt": v.system_prompt, "weight": v.weight} for v in self.variants],
            "metrics": self.metrics,
        }, indent=2)
