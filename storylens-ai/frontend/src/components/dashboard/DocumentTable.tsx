/**
 * DocumentTable — recent documents with preview modal and delete confirm.
 */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  FileText,
  FileType,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDeleteDocument } from "@/hooks/useDocuments";
import type { Document } from "@/types";
import { formatBytes, formatRelativeTime } from "@/utils/format";

interface DocumentTableProps {
  documents: Document[];
  isLoading?: boolean;
  isError?: boolean;
}

/** Map a file extension to a friendly type label. */
function typeLabel(doc: Document): string {
  return doc.file_type.toUpperCase();
}

export function DocumentTable({
  documents,
  isLoading = false,
  isError = false,
}: DocumentTableProps) {
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Document | null>(null);
  const deleteMutation = useDeleteDocument();

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteMutation.mutate(confirmDelete.id, {
      onSuccess: () => {
        toast.success("Document deleted.");
        setConfirmDelete(null);
      },
      onError: () => {
        toast.error("Failed to delete the document.");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-accent-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-sm text-rose-500">
        Failed to load documents.
      </p>
    );
  }

  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents yet"
        description="Upload your first document to start generating interactive stories."
        action={
          <a href="/upload" className="btn-primary">
            <FileType className="h-4 w-4" /> Upload now
          </a>
        }
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/30 text-xs uppercase tracking-wider text-muted-foreground dark:border-white/10">
              <th className="pb-3 pr-4 font-semibold">File name</th>
              <th className="pb-3 pr-4 font-semibold">Type</th>
              <th className="pb-3 pr-4 font-semibold">Upload date</th>
              <th className="pb-3 pr-4 font-semibold">Size</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {documents.slice(0, 8).map((doc) => (
              <tr key={doc.id} className="transition-colors hover:bg-white/40 dark:hover:bg-white/5">
                <td className="py-3.5 pr-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="max-w-[220px] truncate font-semibold">{doc.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {doc.filename}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 pr-4">
                  <Badge variant="neutral">{typeLabel(doc)}</Badge>
                </td>
                <td className="py-3.5 pr-4 text-muted-foreground">
                  {formatRelativeTime(doc.created_at)}
                </td>
                <td className="py-3.5 pr-4 text-muted-foreground">
                  {formatBytes(doc.file_size)}
                </td>
                <td className="py-3.5 pr-4">
                  <Badge
                    variant={
                      doc.status === "ready"
                        ? "success"
                        : doc.status === "failed"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {doc.status}
                  </Badge>
                </td>
                <td className="py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Preview"
                      onClick={() => setPreviewDoc(doc)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Delete"
                      className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      onClick={() => setConfirmDelete(doc)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {documents.slice(0, 5).map((doc) => (
          <div
            key={doc.id}
            className="rounded-xl border border-white/30 bg-white/40 p-4 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold">{doc.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {doc.filename}
                </p>
              </div>
              <Badge variant={doc.status === "ready" ? "success" : "warning"}>
                {doc.status}
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{typeLabel(doc)}</span>
              <span>{formatRelativeTime(doc.created_at)}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => setPreviewDoc(doc)}
              >
                <Eye className="h-3.5 w-3.5" /> Preview
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setConfirmDelete(doc)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="glass-strong w-full max-w-lg rounded-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold">{previewDoc.title}</h3>
                  <p className="text-xs text-muted-foreground">{previewDoc.filename}</p>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/40 p-3 dark:bg-white/5">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold">{typeLabel(previewDoc)}</p>
                </div>
                <div className="rounded-xl bg-white/40 p-3 dark:bg-white/5">
                  <p className="text-xs text-muted-foreground">Size</p>
                  <p className="font-semibold">{formatBytes(previewDoc.file_size)}</p>
                </div>
                <div className="rounded-xl bg-white/40 p-3 dark:bg-white/5">
                  <p className="text-xs text-muted-foreground">Uploaded</p>
                  <p className="font-semibold">{formatRelativeTime(previewDoc.created_at)}</p>
                </div>
                <div className="rounded-xl bg-white/40 p-3 dark:bg-white/5">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge
                    variant={previewDoc.status === "ready" ? "success" : "warning"}
                  >
                    {previewDoc.status}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="glass-strong w-full max-w-sm rounded-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold">Delete document?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                “{confirmDelete.title}” and all its generated content will be
                permanently removed. This cannot be undone.
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  isLoading={deleteMutation.isPending}
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

