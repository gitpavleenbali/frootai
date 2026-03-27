import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FrootAI — From the Roots to the Fruits",
    template: "%s | FrootAI",
  },
  description:
    "The open glue for AI architecture. 22 MCP tools, 20 solution plays, 18 knowledge modules. From the roots to the fruits.",
  keywords: [
    "FrootAI", "AI", "MCP", "solution plays", "AI agents", "RAG",
    "Azure", "LLM", "enterprise AI", "VS Code extension",
  ],
  openGraph: {
    title: "FrootAI — From the Roots to the Fruits",
    description:
      "The open glue binding Infrastructure, Platform & Application teams with the GenAI ecosystem. 22 MCP tools, 20 solution plays, VS Code extension.",
    type: "website",
    locale: "en_US",
    siteName: "FrootAI",
    url: "https://frootai.dev",
    images: [{ url: "https://frootai.dev/img/frootai-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FrootAI — From the Roots to the Fruits",
    description: "22 MCP tools, 20 solution plays, 18 knowledge modules. The open glue for AI architecture.",
    images: ["https://frootai.dev/img/frootai-og.png"],
  },
  icons: { icon: "/img/favicon.ico", apple: "/img/frootai-icon-192.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth dark`}
    >
      <head>
        <script
          defer
          data-domain="frootai.dev"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"frootai-analytics"}'
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
