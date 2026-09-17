/**
 * Upload page — drag & drop file upload with validation and status.
 */
"use client";

import { motion } from "framer-motion";
import { FileText, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE_MB } from "@/utils/constants";
import { formatBytes } from "@/utils/format";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): string | null => {
    const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
    if (!ACCEPTED_FILE_TYPES.includes(ext)) {
      return `Unsupported file type "${ext}".`;
    }
    if (f.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
      return `File exceeds the ${MAX_UPLOAD_SIZE_MB}MB limit.`;
    }
    return null;
  };

  const handleFile = (f: File) => {
    const error = validateFile(f);
    if (error) {
      toast.error(error);
      return;
    }
    setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const { uploadDocument } = await import("@/services/documents");
      await uploadDocument(file);
      toast.success("Document uploaded! Processing started. ✅");
      setFile(null);
    } catch (err) {
      const { getErrorMessage } = await import("@/services/api");
      toast.error(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold">Upload a document</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Supported: PDF, DOCX, PPTX, TXT, Markdown, and image files with OCR.
        </p>
      </motion.div>

      <Card>
        <CardContent className="p-6">
          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files?.[0];
              if (f) handleFile(f);
            }}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
              dragOver
                ? "border-accent-500 bg-accent-50 dark:bg-accent-950/40"
                : "border-slate-300 hover:border-primary-400 hover:bg-primary-50/50 dark:border-white/15 dark:hover:bg-white/5"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg text-white shadow-lg shadow-accent-500/25">
              <UploadCloud className="h-7 w-7" />
            </div>
            <div>
              <p className="font-semibold">Drag &amp; drop your file here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                or click to browse — max {MAX_UPLOAD_SIZE_MB}MB
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_FILE_TYPES.join(",")}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = "";
              }}
            />
          </div>

          {/* Selected file */}
          {file && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/30 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-500 dark:hover:bg-white/10"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <Button
            className="mt-6 w-full"
            size="lg"
            disabled={!file}
            isLoading={uploading}
            onClick={handleUpload}
          >
            <UploadCloud className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload document"}
          </Button>
        </CardContent>
      </Card>

      {/* Allowed types */}
      <Card>
        <CardHeader>
          <CardTitle>Supported file types</CardTitle>
          <CardDescription>
            OCR is used automatically for images.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {ACCEPTED_FILE_TYPES.map((ext) => (
            <Badge key={ext} variant="neutral">
              {ext}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

