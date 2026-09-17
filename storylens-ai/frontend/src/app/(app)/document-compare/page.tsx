/**
 * Document Compare — coming soon placeholder.
 */
"use client";

import { Files } from "lucide-react";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function DocumentComparePage() {
  return (
    <ComingSoon
      title="Document Compare"
      description="Select two documents and let AI highlight differences, overlaps, and unique insights between them."
      icon={Files}
    />
  );
}

