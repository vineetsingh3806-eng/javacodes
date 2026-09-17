/**
 * AI generation API service.
 */
import { api } from "./api";
import type { Generation, GenerationType } from "@/types";

/** Request an AI artifact for a document. */
export async function createGeneration(
  documentId: number,
  generationType: GenerationType,
  title?: string
): Promise<Generation> {
  const { data } = await api.post<Generation>("/generations", {
    document_id: documentId,
    generation_type: generationType,
    title,
  });
  return data;
}

/** List generations (optionally filtered by document). */
export async function listGenerations(
  documentId?: number
): Promise<Generation[]> {
  const { data } = await api.get<Generation[]>("/generations", {
    params: documentId ? { document_id: documentId } : {},
  });
  return data;
}

/** Fetch a single generation. */
export async function getGeneration(id: number): Promise<Generation> {
  const { data } = await api.get<Generation>(`/generations/${id}`);
  return data;
}

