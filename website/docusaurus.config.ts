import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "FrootAI",
  tagline: "The open glue — from root to fruit. Binding infrastructure, platform, and application for AI architecture.",
  favicon: "img/favicon.ico",

  url: "https://gitpavleenbali.github.io",
  baseUrl: "/frootai/",

  organizationName: "gitpavleenbali",
  projectName: "frootai",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
    format: "detect",
  },

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "../docs",
          routeBasePath: "/docs",
          include: ["**/*.md"],
          exclude: ["node_modules/**"],
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/gitpavleenbali/frootai/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/aifroot-logo.svg",

    announcementBar: {
      id: "frootai_mcp",
      content:
        '🔌 <b>FrootAI MCP Server</b> — Add AI architecture knowledge to your agent: <code>git clone</code> → <code>npm install</code> → connect. <a href="/frootai/setup-guide">Setup Guide →</a>',
      backgroundColor: "#0a0a0f",
      textColor: "#e0e0e0",
      isCloseable: true,
    },

    navbar: {
      title: "FrootAI",
      logo: {
        alt: "FrootAI",
        src: "img/aifroot-logo.svg",
        href: "/frootai/",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "frootSidebar",
          position: "left",
          label: "AI Knowledge Hub",
        },
        {
          to: "/ecosystem",
          label: "🔗 Ecosystem",
          position: "left",
        },
        {
          to: "/mcp-tooling",
          label: "🔌 MCP Tooling",
          position: "left",
        },
        {
          to: "/solution-plays",
          label: "🎯 Solution Plays",
          position: "left",
        },
        {
          to: "/packages",
          label: "📦 Packages",
          position: "left",
        },
        {
          href: "https://github.com/gitpavleenbali/frootai",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "AI Knowledge Hub",
          items: [
            { label: "🌱 Foundations", to: "/docs/GenAI-Foundations" },
            { label: "🪵 Reasoning", to: "/docs/Prompt-Engineering" },
            { label: "🌿 Orchestration", to: "/docs/Semantic-Kernel" },
            { label: "🍃 Operations", to: "/docs/Azure-AI-Foundry" },
            { label: "🍎 Transformation", to: "/docs/T1-Fine-Tuning-MLOps" },
          ],
        },
        {
          title: "Ecosystem",
          items: [
            { label: "🔗 Ecosystem Overview", to: "/ecosystem" },
            { label: "🔌 MCP Tooling", to: "/mcp-tooling" },
            { label: "📦 npm: frootai-mcp", href: "https://www.npmjs.com/package/frootai-mcp" },
            { label: "💻 VS Code Extension", href: "https://marketplace.visualstudio.com/items?itemName=pavleenbali.frootai" },
            { label: "🎯 Solution Plays", to: "/solution-plays" },
            { label: "📦 FROOT Packages", to: "/packages" },
            { label: "📖 Setup Guide", to: "/setup-guide" },
          ],
        },
        {
          title: "Connect",
          items: [
            { label: "LinkedIn", href: "https://linkedin.com/in/pavleenbali" },
            { label: "GitHub", href: "https://github.com/gitpavleenbali" },
            { label: "Newsletter", href: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7001119707667832832" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pavleen Bali — FrootAI: The open glue for AI architecture.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["powershell", "bicep", "bash", "json", "yaml", "csharp", "python"],
    },

    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    mermaid: {
      theme: { light: "neutral", dark: "dark" },
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [],
};

export default config;
