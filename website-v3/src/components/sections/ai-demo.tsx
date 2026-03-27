"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const presetPrompts = [
  "Set up a RAG pipeline",
  "Deploy multi-agent workflow",
  "Cost optimization tips",
];

const mockResponses: Record<string, string> = {
  "Set up a RAG pipeline":
    "Here's your quick-start for a production RAG pipeline:\n\n1. **Index your data** — Azure AI Search with hybrid retrieval\n2. **Configure chunking** — 512-token chunks, 50-token overlap\n3. **Add reranking** — Semantic reranking for precision\n4. **Connect model** — GPT-4o with grounding\n\nRun `froot play deploy 01-enterprise-rag` to go live in minutes.",
  "Deploy multi-agent workflow":
    "Multi-agent orchestration with FrootAI:\n\n1. **Define agents** — Roles, tools, and guardrails in `agent.yaml`\n2. **Set up routing** — Deterministic or LLM-based intent\n3. **Add human-in-the-loop** — Flag high-risk actions\n4. **Deploy** — `froot play deploy 07-multi-agent-service`\n\nBuilt-in tracing shows every agent decision.",
  "Cost optimization tips":
    "Proven cost strategies:\n\n• **Model routing** — GPT-4o-mini for simple, GPT-4o for complex\n• **Semantic caching** — Avoid redundant API calls\n• **Token budgets** — Per-request and per-user limits\n• **Batch processing** — Async batch API for non-urgent work\n\nFrootAI's gateway tracks cost per request automatically.",
};

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    indexRef.current = 0;
    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}

export function AiDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function handleSend(prompt: string) {
    if (loading || !prompt.trim()) return;
    const userMsg = prompt.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response =
        mockResponses[userMsg] ||
        "I can help with that! FrootAI provides 20+ solution plays covering RAG, agents, observability, and more. Try asking about a specific capability.";
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setLoading(false);
    }, 1200);
  }

  function handleReset() {
    setMessages([]);
    setInput("");
  }

  return (
    <section id="demo" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Try It
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            See FrootAI in action
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Simulated conversation — in production, this connects to your
            deployed agents and knowledge base.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="ml-2 text-xs text-muted-foreground font-mono">
                  frootai-assistant
                </span>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Messages — responsive height */}
            <div ref={scrollRef} className="h-[280px] sm:h-[340px] overflow-y-auto p-4 space-y-4">
              {/* Welcome */}
              {messages.length === 0 && !loading && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Try one of these prompts:
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 w-full">
                    {presetPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleSend(p)}
                        className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground hover:shadow-sm cursor-pointer"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex gap-2.5", msg.role === "user" && "justify-end")}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {msg.role === "assistant" && i === messages.length - 1 ? (
                        <TypewriterText text={msg.content} />
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Thinking…
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2 border-t border-border px-3 py-2.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about FrootAI…"
                className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                disabled={loading}
              />
              <Button type="submit" size="icon" className="h-8 w-8" disabled={loading || !input.trim()}>
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
