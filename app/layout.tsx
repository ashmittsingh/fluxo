import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://fluxo.velmoratech.in/"), 
  title: {
    default: "Fluxo — No-Code Workflow Automation Platform | Visual Builder & Real-Time Execution",
    template: "%s | Fluxo",
  },
  description:
    "Build, run, and monetize automated workflows with Fluxo's drag-and-drop canvas. Real-time execution, 100+ integrations, and enterprise-grade reliability. Free plan available — no code required.",
  keywords: [
    "workflow automation",
    "no-code automation",
    "zapier alternative",
    "n8n alternative",
    "visual workflow builder",
    "business process automation",
  ],
  authors: [{ name: "Fluxo" }],
  creator: "Fluxo",
  publisher: "Fluxo",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fluxo.velmoratech.in/",
    siteName: "Fluxo",
    title: "Fluxo — No-Code Workflow Automation Platform",
    description:
      "Build and run automated workflows visually. Real-time execution, 100+ integrations, generous free tier.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Fluxo Workflow Automation Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fluxo",
    creator: "@fluxo",
    title: "Fluxo — No-Code Workflow Automation Platform",
    description: "Build and run automated workflows visually. Real-time execution, 100+ integrations.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: "https://fluxo.velmoratech.in/",
  },
  verification: {
    google: "0W38APaS1CQRA5kJhBkaHbVtp3zAM26NIwiqLn6vuos",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider> 
      </body>
    </html>
  );
}