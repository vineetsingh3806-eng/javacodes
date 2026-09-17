/**
 * Chat (RAG Q&A) API service.
 */
import { api } from "./api";
import type { ChatResponse } from "@/types";

export async function askQuestion(
  documentId: number,
  question: string
): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>("/chat", {
    document_id: documentId,
    question,
  });
  return data;
}

