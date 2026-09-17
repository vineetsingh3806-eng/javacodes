/**
 * Chat page — RAG question answering over the user's documents.
 */
"use client";

import { motion } from "framer-motion";
import { Bot, MessageSquare, Send, User } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { useDocuments } from "@/hooks/useDocuments";
import { useChat } from "@/hooks/useChat";
import { getErrorMessage } from "@/services/api";
import { cn } from "@/utils/cn";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ text: string; chunk_index: number; score: number }>;
}

export default function ChatPage() {
  const { data: docsData, isLoading: docsLoading } = useDocuments();
  const readyDocs = (docsData?.items ?? []).filter((d) => d.status === "ready");
  const [selectedDocId, setSelectedDocId] = useState<number | "">("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatMutation = useChat();

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocId || !question.trim()) return;

    const userMessage: Message = { role: "user", content: question.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const res = await chatMutation.mutateAsync({
        documentId: Number(selectedDocId),
        question: userMessage.content,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.answer, sources: res.sources },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${getErrorMessage(error)}` },
      ]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Document Chat</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask questions grounded in your document&apos;s content.
          </p>
        </div>

        {/* Document selector */}
        <select
          className="input-field w-full max-w-xs"
          value={selectedDocId}
          onChange={(e) =>
            setSelectedDocId(e.target.value ? Number(e.target.value) : "")
          }
          disabled={docsLoading}
        >
          <option value="">Select a document…</option>
          {readyDocs.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.title}
            </option>
          ))}
        </select>
      </div>

      {/* Messages area */}
      <Card className="flex-1 overflow-hidden">
        <CardContent className="flex h-full flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <EmptyState
                  icon={MessageSquare}
                  title="Start a conversation"
                  description={
                    readyDocs.length > 0
                      ? "Select a document above and ask a question about its content."
                      : "Upload and process a document first, then chat about it here."
                  }
                />
              </div>
            ) : (
              messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {m.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-bg text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user"
                        ? "gradient-bg text-white shadow-lg shadow-accent-500/20"
                        : "glass"
                    )}
                  >
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                    {m.sources && m.sources.length > 0 && (
                      <details className="mt-2 text-xs text-muted-foreground">
                        <summary className="cursor-pointer font-medium">
                          {m.sources.length} source(s)
                        </summary>
                        <div className="mt-2 space-y-1">
                          {m.sources.map((s, idx) => (
                            <p key={idx} className="line-clamp-2">
                              §{s.chunk_index} · score {s.score.toFixed(2)} —{" "}
                              <span className="italic">{s.text}</span>
                            </p>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              ))
            )}
            {chatMutation.isPending && (
              <div className="flex justify-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-bg text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="glass rounded-2xl px-4 py-3">
                  <Spinner size="sm" label="Thinking…" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleAsk}
            className="flex items-center gap-2 border-t border-white/30 p-3 dark:border-white/10"
          >
            <input
              className="input-field"
              placeholder={
                selectedDocId
                  ? "Ask about this document…"
                  : "Select a document first…"
              }
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={!selectedDocId || chatMutation.isPending}
            />
            <Button
              type="submit"
              size="icon"
              disabled={
                !selectedDocId || !question.trim() || chatMutation.isPending
              }
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

