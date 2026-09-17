/**
 * Root layout — global fonts, providers, metadata.
 */
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Providers } from "@/providers/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "StoryLens AI — Turn documents into interactive stories",
    template: "%s | StoryLens AI",
  },
  description:
    "Upload any document and get AI-generated timelines, mind maps, quizzes, presentations, and podcast scripts.",
  keywords: [
    "AI",
    "document",
    "timeline",
    "mindmap",
    "quiz",
    "presentation",
    "podcast",
    "Gemini",
    "OCR",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

