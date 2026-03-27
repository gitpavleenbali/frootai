"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";

const cards = [
  { to: "/configurator", icon: "⚙️", title: "Solution Configurator", sub: "3 questions → your play", color: "#f59e0b" },
  { to: "/solution-plays", icon: "🎯", title: "Solution Plays", sub: "20 plays · DevKit + TuneKit", color: "#7c3aed" },
  { to: "/vscode-extension", icon: "💻", title: "VS Code Extension", sub: "16 commands · Standalone", color: "#6366f1" },
  { to: "/mcp-tooling", icon: "📦", title: "MCP Server (npm)", sub: "22 tools for your agent", color: "#10b981" },
  { to: "/marketplace", icon: "🏪", title: "Plugin Marketplace", sub: "Discover & share plugins", color: "#ec4899" },
  { to: "/partners", icon: "🤝", title: "Partner Integrations", sub: "ServiceNow, Salesforce, SAP", color: "#06b6d4" },
  { to: "/packages", icon: "🧩", title: "FROOT Packages", sub: "Downloadable LEGO blocks", color: "#8b5cf6" },
  { to: "/learning-hub", icon: "📚", title: "FAI Learning Hub", sub: "18 modules · Glossary · Workshops", color: "#f97316" },
  { to: "/dev-hub", icon: "🛠️", title: "FAI Developer Hub", sub: "API ref · Changelog · Guides", color: "#0ea5e9" },
  { to: "/community", icon: "🌱", title: "100% Open Source", sub: "MIT License — Star on GitHub", color: "#00C853" },
];

export function EcosystemGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn className="text-center mb-2">
          <h2 className="text-2xl font-bold tracking-tight">FAI Ecosystem</h2>
          <p className="mt-1 text-[12px] text-muted-foreground/50 italic">
            Click on the cards to explore more
          </p>
        </FadeIn>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.04}>
              <Link
                href={card.to}
                className="glow-card block p-4 text-center transition-all group"
                style={{ "--glow": `${card.color}66` } as React.CSSProperties}
              >
                <div className="text-3xl mb-2 transition-transform group-hover:scale-110">
                  {card.icon}
                </div>
                <div className="text-[13px] font-bold leading-tight">{card.title}</div>
                <div className="mt-1 text-[11px] leading-tight" style={{ color: card.color }}>
                  {card.sub}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
