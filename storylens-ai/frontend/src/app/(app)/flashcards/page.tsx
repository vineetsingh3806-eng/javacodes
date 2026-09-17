/**
 * Flashcards — coming soon placeholder.
 */
"use client";

import { Layers } from "lucide-react";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function FlashcardsPage() {
  return (
    <ComingSoon
      title="Flashcards"
      description="Turn key concepts from your documents into flip-card review decks with spaced-repetition scheduling."
      icon={Layers}
    />
  );
}

