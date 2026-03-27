"use client";

import { Quote } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const logos = [
  "Microsoft",
  "Azure",
  "GitHub",
  "OpenAI",
  "Vercel",
  "Stripe",
  "Datadog",
  "Snowflake",
];

const testimonials = [
  {
    quote:
      "FrootAI cut our RAG pipeline deployment time from weeks to hours. The solution plays are incredibly well-architected.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechCorp",
    initials: "SC",
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    quote:
      "The observability and cost tracking built into every play gave us confidence to move AI workloads to production.",
    author: "Marcus Rivera",
    role: "Cloud Architect",
    company: "FinanceHub",
    initials: "MR",
    color: "bg-emerald-500/20 text-emerald-400",
  },
  {
    quote:
      "We evaluated 5 AI platforms. FrootAI was the only one that met our enterprise security and compliance requirements out of the box.",
    author: "Dr. Aisha Patel",
    role: "CISO",
    company: "HealthLogic",
    initials: "AP",
    color: "bg-amber-500/20 text-amber-400",
  },
];

export function SocialProof() {
  return (
    <section id="social-proof" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Logo marquee */}
        <FadeIn className="text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by teams building on
          </p>
        </FadeIn>

        <div className="relative mt-8 overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div className="flex animate-marquee w-max gap-12 py-4">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 text-xl font-semibold text-muted-foreground/30 select-none whitespace-nowrap tracking-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by builders
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.1}>
                <div className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                  <div>
                    <Quote className="h-5 w-5 text-primary/40 mb-3" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t.quote}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold",
                        t.color
                      )}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
