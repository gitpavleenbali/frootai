import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  children: React.ReactNode;
  backLink?: { label: string; href: string };
  className?: string;
}

export function PageShell({ title, subtitle, badge, badgeColor = "#6366f1", children, backLink, className }: PageShellProps) {
  return (
    <div className={cn("mx-auto max-w-5xl px-4 py-12", className)}>
      <div className="text-center mb-8">
        {badge && (
          <div
            className="inline-block px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider mb-3"
            style={{ borderColor: `${badgeColor}33`, color: badgeColor, background: `${badgeColor}08` }}
          >
            {badge}
          </div>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-[14px] text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      {children}
      {backLink && (
        <div className="mt-10 text-center">
          <Link href={backLink.href} className="text-[13px] text-froot-amber hover:underline">
            ← {backLink.label}
          </Link>
        </div>
      )}
    </div>
  );
}

interface GlowPillProps {
  label: string;
  href: string;
  color: string;
}

export function GlowPill({ label, href, color }: GlowPillProps) {
  return (
    <Link
      href={href}
      className="inline-block rounded-full border px-4 py-2 text-[12px] font-medium transition-all hover:bg-white/5"
      style={{ borderColor: `${color}33`, color }}
    >
      {label}
    </Link>
  );
}
