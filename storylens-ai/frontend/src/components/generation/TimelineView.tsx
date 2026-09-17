/**
 * Timeline artifact renderer — vertical alternating timeline.
 */
"use client";

import { Clock } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/Card";
import type { TimelineData } from "@/types";

export function TimelineView({ data }: { data: TimelineData }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold gradient-text">
          {data.title}
        </h2>
        {data.description && (
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            {data.description}
          </p>
        )}
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-accent-400 to-blue-400 sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-8">
          {data.events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative flex items-start gap-4 pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0
                  ? "sm:pr-10 sm:text-right sm:flex-row-reverse"
                  : "sm:ml-auto sm:pl-10"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-2 top-1 flex h-5 w-5 items-center justify-center sm:left-auto sm:right-0 sm:translate-x-1/2">
                <div className="h-5 w-5 rounded-full border-4 border-white bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-accent-500/30 dark:border-slate-900" />
              </div>

              <Card className="flex-1 transition-transform hover:-translate-y-1">
                <CardContent className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent-500">
                    {event.date}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimelineEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
        <Clock className="h-7 w-7" />
      </div>
      <p className="max-w-md text-sm text-muted-foreground">
        Select a ready document and click <strong>Generate</strong> to build an
        AI timeline of the key chronological events.
      </p>
    </div>
  );
}

