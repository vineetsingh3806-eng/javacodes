/**
 * Premium Dashboard home — 8 animated stat cards, quick actions,
 * recent documents table.
 */
"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Clock,
  FileText,
  HardDrive,
  MessageSquare,
  Mic2,
  Network,
  Presentation,
  Sparkles,
  Upload,
} from "lucide-react";
import Link from "next/link";

import { DocumentTable } from "@/components/dashboard/DocumentTable";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useDocuments } from "@/hooks/useDocuments";
import { useGenerations } from "@/hooks/useGenerations";
import { formatRelativeTime } from "@/utils/format";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: docsData, isLoading: docsLoading, isError: docsError } = useDocuments();
  const { data: gensData, isLoading: gensLoading } = useGenerations();

  const docs = docsData?.items ?? [];
  const gens = (gensData ?? []) as Array<{
    generation_type: string;
    created_at?: string | null;
  }>;

  // Derived stats
  const readyDocs = docs.filter((d) => d.status === "ready").length;
  const totalStorage = docs.reduce((sum, d) => sum + (d.file_size ?? 0), 0);
  const countsByType = (type: string) => gens.filter((g) => g.generation_type === type).length;
  const chatCount = 0; // Placeholder until chat history API exists

  // Latest activity (for greeting sub-line)
  const latestDoc = docs[0];

  return (
    <div className="space-y-6">
      {/* Greeting hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface relative overflow-hidden p-6"
      >
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent-300/20 blur-2xl dark:bg-accent-700/20" />
        <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-primary-300/20 blur-2xl dark:bg-primary-700/15" />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Welcome back,{" "}
            <span className="gradient-text">
              {user?.full_name?.split(" ")[0] ?? "Explorer"}
            </span>
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {docs.length > 0
              ? `You have ${docs.length} document${docs.length > 1 ? "s" : ""} — last upload ${formatRelativeTime(latestDoc?.created_at)}.`
              : "Upload a document to generate timelines, mind maps, quizzes, presentations, and podcast scripts."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/upload" className="btn-primary">
              <Upload className="h-4 w-4" /> Upload document
            </Link>
            <Link href="/chat" className="btn-secondary">
              <MessageSquare className="h-4 w-4" /> Start AI chat
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats grid — 8 cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Documents"
          value={docs.length}
          icon={FileText}
          gradient="from-primary-600 to-indigo-600"
          hint={readyDocs > 0 ? `${readyDocs} ready to use` : "Upload to get started"}
          delay={0}
        />
        <StatCard
          label="AI Chats"
          value={chatCount}
          icon={MessageSquare}
          gradient="from-accent-600 to-purple-600"
          hint="Conversations with documents"
          delay={60}
        />
        <StatCard
          label="Timelines"
          value={countsByType("timeline")}
          icon={Clock}
          gradient="from-amber-500 to-orange-600"
          hint="Chronological stories"
          delay={120}
        />
        <StatCard
          label="Mind Maps"
          value={countsByType("mindmap")}
          icon={Network}
          gradient="from-emerald-500 to-teal-600"
          hint="Knowledge structures"
          delay={180}
        />
        <StatCard
          label="Quizzes"
          value={countsByType("quiz")}
          icon={BrainCircuit}
          gradient="from-rose-500 to-pink-600"
          hint="Comprehension tests"
          delay={240}
        />
        <StatCard
          label="Presentations"
          value={countsByType("presentation")}
          icon={Presentation}
          gradient="from-blue-500 to-cyan-600"
          hint="Slide decks"
          delay={300}
        />
        <StatCard
          label="Podcasts"
          value={countsByType("podcast")}
          icon={Mic2}
          gradient="from-violet-500 to-fuchsia-600"
          hint="Audio scripts"
          delay={360}
        />
        <StatCard
          label="Storage Used"
          value={Math.round(totalStorage / (1024 * 1024))}
          suffix=" MB"
          icon={HardDrive}
          gradient="from-slate-600 to-slate-800"
          hint={docs.length > 0 ? `${docs.length} documents indexed` : "Nothing stored yet"}
          delay={420}
        />
      </div>

      {/* Quick actions */}
      <QuickActions />

      {/* Recent documents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent documents</CardTitle>
          <CardDescription>
            Your latest uploads with preview and delete actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentTable
            documents={docs}
            isLoading={docsLoading}
            isError={docsError}
          />
        </CardContent>
      </Card>

      {/* Generation tips */}
      {!gensLoading && gens.length === 0 && !docsLoading && docs.length > 0 && (
        <div className="card-surface flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-bg text-white shadow-lg shadow-accent-500/25">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Ready to create your first artifact?</p>
            <p className="text-sm text-muted-foreground">
              Pick a document and generate a timeline, mind map, quiz, presentation, or podcast script.
            </p>
          </div>
          <Link href="/timeline" className="btn-secondary shrink-0">
            Explore generators
          </Link>
        </div>
      )}
    </div>
  );
}

