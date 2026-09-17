/**
 * Presentation artifact renderer — slide deck navigation.
 */
"use client";

import { ChevronLeft, ChevronRight, Presentation } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { PresentationData } from "@/types";

export function PresentationView({ data }: { data: PresentationData }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const total = data.slides.length;
  const slide = data.slides[slideIdx];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold gradient-text">
          {data.title}
        </h2>
        <Badge variant="info">
          Slide {slideIdx + 1} / {total}
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={slideIdx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="min-h-[380px]">
            <CardContent className="flex min-h-[380px] flex-col justify-between p-8">
              <div>
                <h3 className="font-display text-2xl font-bold">
                  {slide.title}
                </h3>
                {slide.subtitle && (
                  <p className="mt-2 text-muted-foreground">{slide.subtitle}</p>
                )}
                <ul className="mt-6 space-y-3">
                  {slide.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full gradient-bg" />
                      <span className="text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {slide.speaker_notes && (
                <div className="mt-8 rounded-xl bg-primary-50 p-4 text-sm text-primary-800 dark:bg-primary-950/40 dark:text-primary-200">
                  🎙 <strong>Speaker notes:</strong> {slide.speaker_notes}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={() => setSlideIdx((i) => Math.max(0, i - 1))}
          disabled={slideIdx === 0}
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {slideIdx + 1} of {total}
        </span>
        <Button
          onClick={() => setSlideIdx((i) => Math.min(total - 1, i + 1))}
          disabled={slideIdx === total - 1}
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function PresentationEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
        <Presentation className="h-7 w-7" />
      </div>
      <p className="max-w-md text-sm text-muted-foreground">
        Select a ready document and click <strong>Generate</strong> to create an
        AI slide deck with speaker notes.
      </p>
    </div>
  );
}

