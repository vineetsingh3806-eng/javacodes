/**
 * React Query hook for document chat (RAG Q&A).
 */
"use client";

import { useMutation } from "@tanstack/react-query";

import { askQuestion } from "@/services/chat";

export function useChat() {
  return useMutation({
    mutationFn: (vars: { documentId: number; question: string }) =>
      askQuestion(vars.documentId, vars.question),
  });
}

