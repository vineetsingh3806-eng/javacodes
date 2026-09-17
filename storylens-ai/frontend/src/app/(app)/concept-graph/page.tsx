/**
 * Concept Graph — coming soon placeholder.
 */
"use client";

import { GitBranch } from "lucide-react";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function ConceptGraphPage() {
  return (
    <ComingSoon
      title="Concept Graph"
      description="Visualize how the core concepts in your documents connect to each other, revealing hidden relationships and thematic clusters."
      icon={GitBranch}
    />
  );
}

