/**
 * Shared wrapper for artifact pages — handles generation state & rendering.
 */
"use client";

import { useMemo } from "react";

import { GenerationToolbar } from "./GenerationToolbar";
import { TimelineView, TimelineEmpty } from "./TimelineView";
import { MindMapView, MindMapEmpty } from "./MindMapView";
import { QuizView, QuizEmpty } from "./QuizView";
import { PresentationView, PresentationEmpty } from "./PresentationView";
import { PodcastView, PodcastEmpty } from "./PodcastView";
import { Card, CardContent } from "@/components/ui/Card";
import { PageLoader } from "@/components/ui/Spinner";
import { useGenerations } from "@/hooks/useGenerations";
import type { GenerationType } from "@/types";

interface GenerationPageProps {
  generationType: GenerationType;
  title: string;
  description: string;
}

export function GenerationPage({
  generationType,
  title,
  description,
}: GenerationPageProps) {
  const { data: generations, isLoading } = useGenerations();
  const latest = useMemo(
    () =>
      (generations ?? [])
        .filter((g) => g.generation_type === generationType)
        .sort(
          (a, b) =>
            new Date(b.created_at ?? 0).getTime() -
            new Date(a.created_at ?? 0).getTime()
        )[0],
    [generations, generationType]
  );

  const parsed = useMemo(() => {
    if (!latest || !latest.content_json) return null;
    try {
      return JSON.parse(latest.content_json) as Record<string, unknown>;
    } catch {
      return null;
    }
  }, [latest]);

  const refreshKey = String(latest?.id ?? "") + String(latest?.status ?? "");

  const renderArtifact = () => {
    if (!latest || !parsed || latest.status !== "completed") {
      switch (generationType) {
        case "timeline":
          return <TimelineEmpty />;
        case "mindmap":
          return <MindMapEmpty />;
        case "quiz":
          return <QuizEmpty />;
        case "presentation":
          return <PresentationEmpty />;
        case "podcast":
          return <PodcastEmpty />;
      }
    }

    switch (generationType) {
      case "timeline":
        return <TimelineView data={parsed as never} key={refreshKey} />;
      case "mindmap":
        return <MindMapView data={parsed as never} key={refreshKey} />;
      case "quiz":
        return <QuizView data={parsed as never} key={refreshKey} />;
      case "presentation":
        return <PresentationView data={parsed as never} key={refreshKey} />;
      case "podcast":
        return <PodcastView data={parsed as never} key={refreshKey} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <GenerationToolbar
        generationType={generationType}
        onGenerated={() => {
          // Invalidate happens inside useCreateGeneration onSuccess
        }}
      />

      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            <PageLoader label="Loading artifacts…" />
          ) : latest && latest.status === "failed" ? (
            <p className="py-8 text-center text-sm text-rose-500">
              ⚠️ Generation failed. Please try again.
            </p>
          ) : latest && latest.status === "processing" ? (
            <PageLoader label="AI is generating your artifact…" />
          ) : (
            renderArtifact()
          )}
        </CardContent>
      </Card>
    </div>
  );
}

