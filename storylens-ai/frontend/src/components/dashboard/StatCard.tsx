/**
 * StatCard — animated statistic card for the dashboard home.
 */
"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/utils/cn";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  /** Optional suffix rendered after the number (e.g. "%", "MB"). */
  suffix?: string;
  /** Human-friendly sub-line. */
  hint?: string;
  /** Tailwind gradient classes for the icon tile. */
  gradient?: string;
  /** Delay (ms) before the count-up begins. */
  delay?: number;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  suffix = "",
  hint,
  gradient = "from-primary-600 to-accent-600",
  delay = 0,
  className,
}: StatCardProps) {
  const animated = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className={cn("h-full", className)}
    >
      <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg">
        <CardContent className="flex items-start gap-4 p-5">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
              gradient
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-2xl font-bold leading-tight">
              {animated}
              {suffix}
            </p>
            <p className="truncate text-sm text-muted-foreground">{label}</p>
            {hint && (
              <p className="mt-0.5 truncate text-xs text-muted-foreground/80">
                {hint}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

