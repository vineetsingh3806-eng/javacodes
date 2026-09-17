/**
 * Loading spinner with multiple sizes and variants.
 */
import { Loader2 } from "lucide-react";

import { cn } from "@/utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

export function Spinner({ size = "md", className, label }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label ?? "Loading"}
      className="flex items-center gap-2 text-primary-600 dark:text-primary-400"
    >
      <Loader2 className={cn("animate-spin", sizes[size], className)} />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}

/** Full-page centered spinner. */
export function PageLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

