/**
 * Semantic Search — coming soon placeholder.
 */
"use client";

import { Search } from "lucide-react";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function SemanticSearchPage() {
  return (
    <ComingSoon
      title="Semantic Search"
      description="Search across your entire library by meaning, not just keywords — powered by Gemini embeddings and Qdrant vector search."
      icon={Search}
    />
  );
}

