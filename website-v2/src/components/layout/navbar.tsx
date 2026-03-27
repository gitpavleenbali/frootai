"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navMenus = [
  {
    label: "FAI Platform",
    items: [
      { to: "/configurator", label: "⚙️ Solution Configurator" },
      { to: "/solution-plays", label: "🎯 Solution Plays (20)" },
      { to: "/packages", label: "📦 Packages" },
    ],
  },
  {
    label: "FAI Solutions",
    items: [
      { to: "/ecosystem", label: "🔗 Ecosystem Overview" },
      { to: "/vscode-extension", label: "🖥️ VS Code Extension" },
      { to: "/mcp-tooling", label: "🔌 MCP Server (22 tools)" },
      { to: "/cli", label: "⚡ CLI (npx frootai)" },
      { to: "/docker", label: "🐳 Docker Image" },
      { to: "/setup-guide", label: "📋 Setup Guide" },
    ],
  },
  {
    label: "FAI Community",
    items: [
      { to: "/partners", label: "🤝 Partner Integrations" },
      { to: "/marketplace", label: "🏪 Plugin Marketplace" },
      { to: "/community", label: "🌱 Open Source Community" },
      { to: "/adoption", label: "📊 FrootAI Adoption" },
    ],
  },
  {
    label: "FAI Learning Hub",
    items: [
      { to: "/learning-hub", label: "📚 FAI Learning Center" },
      { to: "/docs", label: "📖 Knowledge Modules (18)" },
      { to: "/docs/F3-AI-Glossary-AZ", label: "🔤 AI Glossary (200+ terms)" },
      { href: "https://github.com/gitpavleenbali/frootai/tree/main/workshops", label: "🎓 Workshop Materials" },
      { to: "/docs/Quiz-Assessment", label: "📝 Quiz & Assessment" },
    ],
  },
  {
    label: "FAI Developer Hub",
    items: [
      { to: "/dev-hub", label: "🛠️ Developer Center" },
      { to: "/feature-spec", label: "📋 Feature Spec (A-Z)" },
      { to: "/docs/admin-guide", label: "📋 Admin Guide" },
      { to: "/docs/user-guide-complete", label: "📖 User Guide" },
      { to: "/docs/api-reference", label: "📡 API Reference (MCP)" },
      { to: "/api-docs", label: "📡 REST API (Agent FAI)" },
      { to: "/docs/architecture-overview", label: "🏗️ Architecture" },
      { to: "/eval-dashboard", label: "📊 Evaluation Dashboard" },
      { to: "/dev-hub-changelog", label: "📰 Changelog & Releases" },
    ],
  },
];

const rightItems = [
  { to: "/hi-fai", label: "🖐️ Hi FAI", className: "text-froot-emerald" },
  { to: "/chatbot", label: "✨ Agent FAI", className: "text-froot-amber" },
];

function DropdownMenu({ menu, open, onToggle }: { menu: typeof navMenus[0]; open: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
      >
        {menu.label}
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl glass p-1.5 shadow-xl"
          >
            {menu.items.map((item) =>
              "href" in item && item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={"to" in item ? item.to! : "#"}
                  className="block rounded-lg px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#0a0a0f] border-b border-border/50 text-center py-2 px-4 text-[12px] text-muted-foreground">
        🌱 <strong className="text-foreground">FrootAI Developer Kit</strong> (MCP Server + VS Code Extension) —{" "}
        Add <strong className="text-froot-emerald">Infra</strong>,{" "}
        <strong className="text-froot-cyan">Platform</strong> &amp;{" "}
        <strong className="text-froot-violet">App</strong> knowledge to your ecosystem{" "}
        <Link href="/setup-guide" className="text-froot-amber font-bold hover:underline">
          → Setup Guide
        </Link>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/img/frootai-logo.png"
              alt="FrootAI"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-[15px]">FrootAI</span>
          </Link>

          {/* Desktop dropdowns */}
          <div className="hidden lg:flex items-center gap-0.5 ml-6">
            {navMenus.map((menu) => (
              <DropdownMenu
                key={menu.label}
                menu={menu}
                open={openMenu === menu.label}
                onToggle={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
              />
            ))}
          </div>

          {/* Right items */}
          <div className="hidden lg:flex items-center gap-1">
            {rightItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                className={cn(
                  "px-3 py-1.5 text-[13px] font-semibold rounded-full transition-all hover:bg-white/5",
                  item.className
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/gitpavleenbali/frootai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border/50 glass overflow-y-auto max-h-[80vh]"
            >
              <div className="p-4 space-y-3">
                {navMenus.map((menu) => (
                  <div key={menu.label}>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1.5 px-2">
                      {menu.label}
                    </p>
                    {menu.items.map((item) => (
                      <Link
                        key={item.label}
                        href={"to" in item ? item.to! : "#"}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="pt-2 border-t border-border/50 flex flex-wrap gap-2">
                  {rightItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn("px-3 py-2 text-[13px] font-semibold rounded-lg", item.className)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
