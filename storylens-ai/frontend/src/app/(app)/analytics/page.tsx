/**
 * Analytics — coming soon placeholder.
 */
"use client";

import { BarChart3 } from "lucide-react";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function AnalyticsPage() {
  return (
    <ComingSoon
      title="Analytics"
      description="Track your learning activity, generation usage, document statistics, and engagement trends over time."
      icon={BarChart3}
    />
  );
}

