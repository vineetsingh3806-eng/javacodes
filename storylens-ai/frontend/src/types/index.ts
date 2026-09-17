// ============================================================
// StoryLens AI — Shared TypeScript types
// ============================================================

/** Authenticated user */
export interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  is_verified: boolean;
  created_at?: string | null;
}

/** JWT token pair + user */
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

/** Uploaded document */
export interface Document {
  id: number;
  title: string;
  filename: string;
  file_type: string;
  file_size: number;
  status: string;
  error_message?: string | null;
  created_at?: string | null;
}

/** Paginated documents */
export interface DocumentListResponse {
  items: Document[];
  total: number;
  page: number;
  page_size: number;
}

/** Upload response */
export interface UploadResponse {
  document: Document;
  message: string;
}

/** AI generation types */
export type GenerationType =
  | "timeline"
  | "mindmap"
  | "quiz"
  | "presentation"
  | "podcast";

/** Stored AI artifact */
export interface Generation {
  id: number;
  document_id: number;
  generation_type: string;
  title: string;
  content_json: string;
  status: string;
  created_at?: string | null;
}

/** Chat request */
export interface ChatRequest {
  document_id: number;
  question: string;
}

/** Chat response */
export interface ChatResponse {
  answer: string;
  sources: Array<{
    text: string;
    chunk_index: number;
    score: number;
  }>;
}

// ------------------------------------------------------------------
// Artifact payloads (generated JSON shapes)
// ------------------------------------------------------------------

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface TimelineData {
  title: string;
  description: string;
  events: TimelineEvent[];
}

export interface MindMapNode {
  id: string;
  label: string;
  parent_id: string;
  description?: string;
}

export interface MindMapData {
  title: string;
  central_node: { id: string; label: string };
  nodes: MindMapNode[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_index: number;
  explanation?: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export interface Slide {
  title: string;
  subtitle: string;
  bullets: string[];
  speaker_notes: string;
}

export interface PresentationData {
  title: string;
  slides: Slide[];
}

export interface PodcastSegment {
  speaker: "host" | "guest";
  text: string;
}

export interface PodcastData {
  title: string;
  description: string;
  segments: PodcastSegment[];
}

