/**
 * ActivityPanel — right-hand activity feed + storage usage widget.
 */
"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileText,
  HardDrive,
  MessageSquare,
  Network,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useDocuments } from "@/hooks/useDocuments";
import { useGenerations } from "@/hooks/useGenerations";
import type { Document, Generation } from "@/types";
import { formatBytes, formatRelativeTime } from "@/utils/format";

function ActivityIcon({ type }: { type: string }) {
  const map: Record<string, LucideIcon> = {
    upload: FileText,
    quiz: BrainCircuit,
    chat: MessageSquare,
    mindmap: Network,
    presentation: Presentation,
    default: FileText,
  };
  const Icon = map[type] ?? map.default;
  return <Icon className="h-4 w-4" />;
}

export function ActivityPanel() {
  const { data: docsData } = useDocuments();
  const { data: gensData } = useGenerations();

  const docs = docsData?.items ?? [];
  const gens = (gensData ?? []) as Generation[];

  const totalStorage = useMemo(
    () => docs.reduce((sum, doc) => sum + (doc.file_size ?? 0), 0),
    [docs]
  );

  // Build a unified activity feed (uploads + generations), newest first.
  const activity = useMemo(() => {
    type Entry = { id: string; type: string; label: string; time?: string | null };
    const uploadEntries: Entry[] = docs.map((doc: Document) => ({
      id: `up-${doc.id}`,
      type: "upload",
      label: `Uploaded “${doc.title}”`,
      time: doc.created_at,
    }));
    const genEntries: Entry[] = gens.map((gen: Generation) => ({
      id: `gen-${gen.id}`,
      type: gen.generation_type,
      label: `Generated ${gen.generation_type} “${gen.title}”`,
      time: gen.created_at,
    }));
    return [...uploadEntries, ...genEntries]
      .sort(
        (a, b) =>
          new Date(b.time ?? 0).getTime() - new Date(a.time ?? 0).getTime()
      )
      .slice(0, 6);
  }, [docs, gens]);

  return (
    <div className="space-y-4">
      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 p-3">
          {activity.length === 0 ? (
            <p className="px-2 py-4 text-center text-xs text-muted-foreground">
              No activity yet. Upload a document to get started.
            </p>
          ) : (
            activity.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/40 dark:hover:bg-white/5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-900/40 dark:text-accent-300">
                  <ActivityIcon type={entry.type} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{entry.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(entry.time)}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Storage usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <HardDrive className="h-4 w-4 text-primary-500" /> Storage used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-display text-2xl font-bold">
            {formatBytes(totalStorage)}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalStorage / (1024 * 1024 * 1024)) * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary-600 via-accent-500 to-blue-500"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            1 GB free plan · {docs.length} documents
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

