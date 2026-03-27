"use client";

import {
  Brain,
  Shield,
  Zap,
  BarChart3,
  Workflow,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "Intelligent Agents",
    description:
      "Deploy multi-agent systems with deterministic workflows, tool calling, and human-in-the-loop controls.",
    highlight: true,
  },
  {
    icon: Workflow,
    title: "RAG Pipelines",
    description:
      "Production-ready retrieval-augmented generation with hybrid search, reranking, and citation tracking.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Managed Identity, Key Vault integration, RBAC, and content safety built into every layer.",
  },
  {
    icon: Zap,
    title: "Blazing Performance",
    description:
      "Sub-200ms latency with intelligent caching, streaming responses, and optimized model routing.",
  },
  {
    icon: BarChart3,
    title: "Full Observability",
    description:
      "End-to-end tracing, custom metrics, cost tracking, and real-time dashboards from day one.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Multi-region deployment, automatic failover, and geo-routing for enterprise-grade availability.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <FadeIn className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to ship AI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            20+ pre-built solution plays for building, deploying, and operating
            production AI systems — backed by Azure&apos;s enterprise
            infrastructure.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.06}>
              <div
                className={cn(
                  "group relative h-full rounded-xl border border-border bg-card p-6 transition-all duration-300",
                  "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                  feature.highlight &&
                    "sm:col-span-2 lg:col-span-1 border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent"
                )}
              >
                {/* Gradient hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/[0.06] group-hover:to-accent/[0.03] group-hover:opacity-100" />

                <div className="relative">
                  <div
                    className={cn(
                      "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300",
                      "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    )}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
