/**
 * Knowledge Graph — coming soon placeholder.
 */
"use client";

import { Database } from "lucide-react";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function KnowledgeGraphPage() {
  return (
    <ComingSoon
      title="Knowledge Graph"
      description="Explore entities, people, and topics extracted from your documents as an interactive web of relationships."
      icon={Database}
    />
  );
}

