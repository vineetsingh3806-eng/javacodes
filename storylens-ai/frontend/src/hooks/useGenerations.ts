/**
 * React Query hooks for AI generations.
 */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createGeneration,
  getGeneration,
  listGenerations,
} from "@/services/generations";
import type { GenerationType } from "@/types";

const GENERATIONS_KEY = "generations";

/** List generations, optionally filtered by document. */
export function useGenerations(documentId?: number) {
  return useQuery({
    queryKey: [GENERATIONS_KEY, documentId ?? "all"],
    queryFn: () => listGenerations(documentId),
  });
}

/** Fetch a single generation. */
export function useGeneration(id: number) {
  return useQuery({
    queryKey: [GENERATIONS_KEY, id],
    queryFn: () => getGeneration(id),
    enabled: Boolean(id),
  });
}

/** Request generation of an AI artifact. */
export function useCreateGeneration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      documentId: number;
      generationType: GenerationType;
      title?: string;
    }) =>
      createGeneration(
        vars.documentId,
        vars.generationType,
        vars.title
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GENERATIONS_KEY] });
    },
  });
}

