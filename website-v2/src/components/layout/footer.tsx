import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Explore: [
    { label: "Solution Plays", href: "/solution-plays" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Knowledge Hub", href: "/docs" },
    { label: "Packages", href: "/packages" },
    { label: "Setup Guide", href: "/setup-guide" },
    { label: "Agent FAI", href: "/chatbot" },
    { label: "Configurator", href: "/configurator" },
  ],
  Community: [
    { label: "Partner Integrations", href: "/partners" },
    { label: "Plugin Marketplace", href: "/marketplace" },
    { label: "Open Source", href: "/community" },
    { label: "Workshops", href: "https://github.com/gitpavleenbali/frootai/tree/main/workshops", external: true },
  ],
  Install: [
    { label: "MCP Server (npm)", href: "https://www.npmjs.com/package/frootai-mcp", external: true },
    { label: "VS Code Extension", href: "https://marketplace.visualstudio.com/items?itemName=pavleenbali.frootai", external: true },
    { label: "Docker Image", href: "https://github.com/gitpavleenbali/frootai/pkgs/container/frootai-mcp", external: true },
  ],
  Connect: [
    { label: "LinkedIn", href: "https://linkedin.com/in/pavleenbali", external: true },
    { label: "GitHub", href: "https://github.com/gitpavleenbali/frootai", external: true },
    { label: "Newsletter", href: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7001119707667832832", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#08080d]">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-[15px]">
              <Image src="/img/frootai-logo.png" alt="FrootAI" width={28} height={28} className="rounded-lg" />
              FrootAI
            </Link>
            <p className="mt-3 text-[12px] text-muted-foreground max-w-xs leading-relaxed">
              The open glue — from root to fruit. Binding infrastructure,
              platform, and application for AI architecture.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-3">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-[12px] text-muted-foreground/60">
            © {new Date().getFullYear()} FrootAI · MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}
