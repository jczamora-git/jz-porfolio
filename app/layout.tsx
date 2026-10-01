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
  title: "JEIZI PRODUCTIONS — Graphic Designer & Art Director",
  description:
    "Portfolio of Jeizi — graphic designer and founder of Jeizi Productions, crafting bold identities, campaigns, and visuals that refuse to be ignored.",
  icons: {
    icon: "/jeizi-logo.png",
    shortcut: "/jeizi-logo.png",
    apple: "/jeizi-logo.png",
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
