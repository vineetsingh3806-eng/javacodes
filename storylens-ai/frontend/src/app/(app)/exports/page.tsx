/**
 * Exports — coming soon placeholder.
 */
"use client";

import { Download } from "lucide-react";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function ExportsPage() {
  return (
    <ComingSoon
      title="Exports"
      description="Download your generated content as PDF, Markdown, JSON, MP3 narration, and more — all in one place."
      icon={Download}
    />
  );
}

