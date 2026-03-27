"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-20">
      {/* Radial gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-froot-emerald/8 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-froot-indigo/6 blur-[120px]" />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Animated logo */}
        <FadeIn delay={0}>
          <motion.div className="animate-logo-float mx-auto mb-6">
            <Image
              src="/img/frootai-logo.png"
              alt="FrootAI"
              width={200}
              height={200}
              priority
              className="mx-auto drop-shadow-[0_6px_28px_rgba(16,185,129,0.35)]"
            />
          </motion.div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1}>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl gradient-text-froot">
            FrootAI
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-3 text-lg font-medium text-muted-foreground">
            From the Roots to the Fruits
          </p>
          <p className="mt-1 text-sm italic text-muted-foreground/60">
            It&apos;s simply Frootful.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-4 text-[13px] text-muted-foreground/50 tracking-wide">
            Infra ⇄ Platform ⇄ Apps
          </p>
        </FadeIn>

        {/* FROOT acronym */}
        <FadeIn delay={0.25}>
          <p className="mt-3 text-[14px] font-medium">
            AI{" "}
            <span className="text-froot-amber font-bold">F</span>oundations ·{" "}
            <span className="text-froot-emerald font-bold">R</span>easoning ·{" "}
            <span className="text-froot-cyan font-bold">O</span>rchestration ·{" "}
            <span className="text-froot-indigo font-bold">O</span>perations ·{" "}
            <span className="text-froot-violet font-bold">T</span>ransformation
          </p>
        </FadeIn>

        {/* Mission box */}
        <FadeIn delay={0.3}>
          <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-froot-emerald/20 bg-gradient-to-br from-froot-emerald/[0.04] to-froot-indigo/[0.03] p-5">
            <p className="text-[13px] text-muted-foreground leading-relaxed text-center italic">
              &ldquo;Build It Yourself (BIY) — A power kit for infrastructure, platform, and
              application teams to master and bridge the gap between AI Infra, AI Platform,
              and the AI Application/Agentic Ecosystem.&rdquo;
            </p>
            <p className="mt-2 text-[12px] text-muted-foreground/50 text-center italic">
              From a single token to a production agent fleet.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
