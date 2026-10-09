import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import PerformanceLogger from "@/components/PerformanceLogger";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jeiziproductions.com"),
  title: "John Christopher King Zamora — Full-Stack Developer & Graphic Designer",
  description:
    "Official portfolio of John Christopher King Zamora (Jeizi), creator of Jeizi Productions. Full-stack developer and graphic designer building production-ready web, mobile, desktop, and visual systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "John Christopher King Zamora — Full-Stack Developer & Graphic Designer",
    description:
      "Official portfolio of John Christopher King Zamora (Jeizi), creator of Jeizi Productions. Full-stack developer and graphic designer building production-ready web, mobile, desktop, and visual systems.",
    url: "https://www.jeiziproductions.com/",
    siteName: "Jeizi Productions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-jeizi.png?v=20261003",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "John Christopher King Zamora — Jeizi Productions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Christopher King Zamora — Full-Stack Developer & Graphic Designer",
    description:
      "Official portfolio of John Christopher King Zamora (Jeizi), creator of Jeizi Productions. Full-stack developer and graphic designer building production-ready web, mobile, desktop, and visual systems.",
    images: ["/og-jeizi.png?v=20261003"],
  },
  icons: {
    icon: "/jeizi-prod.ico",
    shortcut: "/jeizi-prod.ico",
    apple: "/jeizi-prod.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "dark" }}
      className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <ServiceWorkerRegister />
        <PerformanceLogger />
      </body>
    </html>
  );
}
