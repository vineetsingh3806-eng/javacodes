/**
 * Document API service.
 */
import { api } from "./api";
import type {
  Document,
  DocumentListResponse,
  UploadResponse,
} from "@/types";

/** Upload a file (multipart form). */
export async function uploadDocument(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<UploadResponse>("/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/** List documents (paginated). */
export async function listDocuments(
  page = 1,
  pageSize = 50
): Promise<DocumentListResponse> {
  const { data } = await api.get<DocumentListResponse>("/documents", {
    params: { page, page_size: pageSize },
  });
  return data;
}

/** Fetch a single document. */
export async function getDocument(id: number): Promise<Document> {
  const { data } = await api.get<Document>(`/documents/${id}`);
  return data;
}

/** Delete a document. */
export async function deleteDocument(id: number): Promise<void> {
  await api.delete(`/documents/${id}`);
}

