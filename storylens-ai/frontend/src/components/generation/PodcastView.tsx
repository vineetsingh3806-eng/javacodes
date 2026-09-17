/**
 * Podcast artifact renderer — host/guest script transcript.
 */
"use client";

import { Mic2, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/utils/cn";
import type { PodcastData } from "@/types";

export function PodcastView({ data }: { data: PodcastData }) {
  const [playing, setPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simple sequential "playback" that highlights each segment
  useEffect(() => {
    if (!playing) return;
    if (activeIdx >= data.segments.length) {
      setPlaying(false);
      setActiveIdx(0);
      return;
    }
    const seg = data.segments[activeIdx];
    const duration = Math.min(Math.max(seg.text.length * 60, 2000), 8000);
    timerRef.current = setInterval(() => {
      setActiveIdx((i) => i + 1);
    }, duration);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, activeIdx, data.segments]);

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setActiveIdx((i) => (i >= data.segments.length ? 0 : i));
      setPlaying(true);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display text-2xl font-bold gradient-text">
          {data.title}
        </h2>
        {data.description && (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {data.description}
          </p>
        )}
      </div>

      {/* Playback controls */}
      <Card>
        <CardContent className="flex items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              onClick={togglePlay}
              variant={playing ? "secondary" : "primary"}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Square className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current" />
              )}
            </Button>
            <div>
              <p className="text-sm font-semibold">
                {playing ? "Playing…" : "Ready to play"}
              </p>
              <p className="text-xs text-muted-foreground">
                {data.segments.length} segments · {playing ? `At #${activeIdx + 1}` : "Paused"}
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Mic2 className="h-5 w-5 text-accent-500" />
            <span className="text-xs font-medium text-muted-foreground">
              AI podcast script
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <div className="space-y-3">
        {data.segments.map((seg, i) => {
          const isHost = seg.speaker === "host";
          const isActive = playing && i === activeIdx;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "flex gap-3",
                isHost ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  isHost
                    ? "glass"
                    : "bg-gradient-to-br from-primary-100 to-accent-100 text-slate-800 dark:from-primary-900/40 dark:to-accent-900/40 dark:text-slate-100",
                  isActive && "ring-2 ring-accent-400"
                )}
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-accent-500">
                  {isHost ? "🎙 Host" : "🤝 Guest"}
                </p>
                {seg.text}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function PodcastEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-600 dark:bg-accent-900/40 dark:text-accent-300">
        <Mic2 className="h-7 w-7" />
      </div>
      <p className="max-w-md text-sm text-muted-foreground">
        Select a ready document and click <strong>Generate</strong> to create an
        engaging AI podcast script.
      </p>
    </div>
  );
}

