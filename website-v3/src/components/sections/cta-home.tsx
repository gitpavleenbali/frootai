"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";

const pills = [
  { label: "⚙️ Solution Configurator", to: "/configurator", color: "#f59e0b" },
  { label: "🎯 Solution Plays", to: "/solution-plays", color: "#7c3aed" },
  { label: "🧩 FROOT Packages", to: "/packages", color: "#8b5cf6" },
  { label: "🔗 Ecosystem Overview", to: "/ecosystem", color: "#0ea5e9" },
  { label: "💻 VS Code Extension", to: "/vscode-extension", color: "#6366f1" },
  { label: "🔌 MCP Server", to: "/mcp-tooling", color: "#10b981" },
  { label: "📖 Setup Guide", to: "/setup-guide", color: "#14b8a6" },
  { label: "🏪 Plugin Marketplace", to: "/marketplace", color: "#ec4899" },
  { label: "🌱 Open Source Community", to: "/community", color: "#00C853" },
];

export function CtaHome() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight">
            FrootAI — The{" "}
            <span className="text-froot-emerald">B</span>uild{" "}
            <span className="text-froot-cyan">I</span>t{" "}
            <span className="text-froot-violet">Y</span>ourself AI LEGO Kit
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            An Open Glue Binding{" "}
            <span className="text-froot-emerald font-bold">I</span>nfrastructure,{" "}
            <span className="text-froot-cyan font-bold">P</span>latform, and{" "}
            <span className="text-froot-violet font-bold">A</span>pplication Teams
          </p>
          <p className="mt-3 text-[12px] text-muted-foreground/50 italic">
            <span className="text-froot-emerald">Infrastructure</span> are the roots.{" "}
            <span className="text-froot-cyan">Platform</span> is the trunk.{" "}
            <span className="text-froot-violet">Application</span> is the fruit.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {pills.map((pill) => (
              <Link
                key={pill.label}
                href={pill.to}
                className="rounded-full border px-4 py-2 text-[12px] font-medium transition-all hover:bg-white/5"
                style={{ borderColor: `${pill.color}33`, color: pill.color }}
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
