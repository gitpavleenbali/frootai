"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { AnimatedCounter } from "@/components/motion/animated-counter";

const stats = [
  { num: 18, suffix: "+", label: "Modules", color: "#10b981" },
  { num: 20, suffix: "", label: "Solution Plays", color: "#06b6d4" },
  { num: 22, suffix: "", label: "MCP Tools", color: "#6366f1" },
  { num: 200, suffix: "+", label: "AI Terms", color: "#7c3aed" },
];

export function Stats() {
  return (
    <FadeIn>
      <div className="flex justify-center gap-8 sm:gap-14 py-6 flex-wrap">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl font-extrabold tabular-nums" style={{ color: s.color }}>
              <AnimatedCounter value={s.num} suffix={s.suffix} />
            </div>
            <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
