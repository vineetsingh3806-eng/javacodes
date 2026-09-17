/**
 * Shared toolbar for artifact pages — document selector + generate button.
 */
"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { useDocuments } from "@/hooks/useDocuments";
import { useCreateGeneration } from "@/hooks/useGenerations";
import { getErrorMessage } from "@/services/api";
import type { GenerationType } from "@/types";

interface GenerationToolbarProps {
  generationType: GenerationType;
  onGenerated: () => void;
}

export function GenerationToolbar({
  generationType,
  onGenerated,
}: GenerationToolbarProps) {
  const { data: docsData, isLoading } = useDocuments();
  const createMutation = useCreateGeneration();

  const readyDocs = (docsData?.items ?? []).filter((d) => d.status === "ready");
  const [selectedDocId, setSelectedDocId] = useState<number | "">("");

  const handleGenerate = async () => {
    if (!selectedDocId) {
      toast.error("Please select a document first.");
      return;
    }
    try {
      await createMutation.mutateAsync({
        documentId: Number(selectedDocId),
        generationType,
      });
      toast.success("Generation complete! 🎉");
      onGenerated();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="glass-strong flex flex-wrap items-center gap-3 rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent-500" />
        <span className="text-sm font-semibold">Generate from:</span>
      </div>

      <select
        className="input-field w-full max-w-xs"
        value={selectedDocId}
        onChange={(e) =>
          setSelectedDocId(e.target.value ? Number(e.target.value) : "")
        }
        disabled={isLoading}
      >
        <option value="">Select a document…</option>
        {readyDocs.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.title}
          </option>
        ))}
      </select>

      <Button
        onClick={handleGenerate}
        isLoading={createMutation.isPending}
        disabled={!selectedDocId}
      >
        <Sparkles className="h-4 w-4" />
        Generate
      </Button>
    </div>
  );
}

