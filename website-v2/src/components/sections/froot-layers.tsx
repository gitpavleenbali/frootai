"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

const layers = [
  { id: "F", icon: "🌱", title: "Foundations", color: "#f59e0b", modules: [
    { id: "F1", name: "GenAI Foundations", link: "/docs/GenAI-Foundations" },
    { id: "F2", name: "LLM Landscape", link: "/docs/LLM-Landscape" },
    { id: "F3", name: "AI Glossary A–Z", link: "/docs/F3-AI-Glossary-AZ" },
    { id: "F4", name: ".github Agentic OS", link: "/docs/F4-GitHub-Agentic-OS" },
  ]},
  { id: "R", icon: "🪵", title: "Reasoning", color: "#10b981", modules: [
    { id: "R1", name: "Prompt Engineering", link: "/docs/Prompt-Engineering" },
    { id: "R2", name: "RAG Architecture", link: "/docs/RAG-Architecture" },
    { id: "R3", name: "Deterministic AI", link: "/docs/R3-Deterministic-AI" },
  ]},
  { id: "O¹", icon: "🌿", title: "Orchestration", color: "#06b6d4", modules: [
    { id: "O1", name: "Semantic Kernel", link: "/docs/Semantic-Kernel" },
    { id: "O2", name: "AI Agents", link: "/docs/AI-Agents-Deep-Dive" },
    { id: "O3", name: "MCP & Tools", link: "/docs/O3-MCP-Tools-Functions" },
  ]},
  { id: "O²", icon: "🍃", title: "Operations", color: "#6366f1", modules: [
    { id: "O4", name: "Azure AI Platform", link: "/docs/Azure-AI-Foundry" },
    { id: "O5", name: "AI Infrastructure", link: "/docs/AI-Infrastructure" },
    { id: "O6", name: "Copilot Ecosystem", link: "/docs/Copilot-Ecosystem" },
  ]},
  { id: "T", icon: "🍎", title: "Transformation", color: "#7c3aed", modules: [
    { id: "T1", name: "Fine-Tuning", link: "/docs/T1-Fine-Tuning-MLOps" },
    { id: "T2", name: "Responsible AI", link: "/docs/Responsible-AI-Safety" },
    { id: "T3", name: "Production Patterns", link: "/docs/T3-Production-Patterns" },
  ]},
];

function ExpandableLayer({ layer }: { layer: typeof layers[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border transition-colors"
      style={{ borderColor: open ? `${layer.color}33` : "var(--border)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer group"
      >
        <span className="text-xl">{layer.icon}</span>
        <span className="font-bold text-[14px]" style={{ color: layer.color }}>
          {layer.id} — {layer.title}
        </span>
        <span className="ml-auto text-[11px] text-muted-foreground/50 flex items-center gap-1">
          {layer.modules.length} modules
          {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {layer.modules.map((m) => (
                <Link
                  key={m.id}
                  href={m.link}
                  className="rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-all hover:bg-white/5"
                  style={{ borderColor: `${layer.color}33`, color: layer.color }}
                >
                  {m.id}: {m.name} →
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FrootLayers() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <FadeIn className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">The FROOT Framework</h2>
          <p className="mt-2 text-[13px] text-muted-foreground">
            AI Knowledge Hub — 5 layers, 18 modules. Click to expand, then click modules to learn.
          </p>
        </FadeIn>

        <div className="space-y-2">
          {layers.map((l, i) => (
            <FadeIn key={l.id} delay={i * 0.05}>
              <ExpandableLayer layer={l} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
