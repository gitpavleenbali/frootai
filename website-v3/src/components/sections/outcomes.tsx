"use client";

import { FadeIn } from "@/components/motion/fade-in";

const outcomes = [
  { icon: "🚀", title: "New to AI?", desc: "Build AI literacy from zero" },
  { icon: "🤖", title: "Build Agents", desc: "MCP, SK, Agent Framework" },
  { icon: "🏗️", title: "AI Infra Expert", desc: "Landing zones, GPU, hosting" },
  { icon: "🏛️", title: "Solution Accelerator", desc: "Azure Verified Modules + Bicep" },
  { icon: "🎯", title: "Full-Stack Agentic", desc: ".github Agentic OS · 7 primitives" },
  { icon: "📊", title: "AI Cost Optimization", desc: "FinOps, caching, model selection" },
  { icon: "🌛", title: "Fine-Tuning Pro", desc: "LoRA, evaluation, MLOps" },
  { icon: "🛡️", title: "Reliable AI", desc: "Determinism, guardrails, safety" },
];

export function Outcomes() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <FadeIn className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">What These Help You Achieve</h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {outcomes.map((o, i) => (
            <FadeIn key={o.title} delay={i * 0.04}>
              <div className="rounded-xl border border-border p-4 text-center transition-all hover:border-white/10 hover:bg-white/[0.02]">
                <div className="text-2xl mb-1">{o.icon}</div>
                <div className="text-[13px] font-bold">{o.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{o.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
