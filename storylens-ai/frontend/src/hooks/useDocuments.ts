/**
 * React Query hooks for documents.
 */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteDocument as deleteDocumentRequest,
  getDocument,
  listDocuments,
  uploadDocument,
} from "@/services/documents";
import type { Document } from "@/types";

const DOCUMENTS_KEY = "documents";

/** Fetch the user's documents. */
export function useDocuments() {
  return useQuery({
    queryKey: [DOCUMENTS_KEY],
    queryFn: () => listDocuments(),
  });
}

/** Fetch a single document. */
export function useDocument(id: number) {
  return useQuery({
    queryKey: [DOCUMENTS_KEY, id],
    queryFn: () => getDocument(id),
    enabled: Boolean(id),
  });
}

/** Upload a document. */
export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCUMENTS_KEY] });
    },
  });
}

/** Delete a document. */
export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDocumentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCUMENTS_KEY] });
    },
  });
}

/** Poll a single document until it is ready. */
export function useDocumentReady(id: number, enabled: boolean) {
  return useQuery({
    queryKey: [DOCUMENTS_KEY, id, "ready"],
    queryFn: async (): Promise<Document> => {
      const doc = await getDocument(id);
      if (doc.status === "processing" || doc.status === "indexing") {
        throw new Error("still processing");
      }
      return doc;
    },
    enabled,
    retry: 50,
    retryDelay: 3000,
  });
}

