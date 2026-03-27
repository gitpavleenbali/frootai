"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function Cta() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-accent to-primary/80 animate-gradient p-10 sm:p-16 text-center">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_60%)]" />

            <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to ship AI with confidence?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">
              Join 500+ engineering teams. Free tier included —
              deploy your first solution play in under 10 minutes.
            </p>
            <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 group"
              >
                Start Building Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
              >
                Talk to Sales
              </Button>
            </div>
            <p className="relative mt-4 text-xs text-white/50">
              No credit card required
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
