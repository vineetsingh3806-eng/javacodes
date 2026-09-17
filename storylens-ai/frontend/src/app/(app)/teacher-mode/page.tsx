/**
 * Teacher Mode — coming soon placeholder.
 */
"use client";

import { GraduationCap } from "lucide-react";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function TeacherModePage() {
  return (
    <ComingSoon
      title="Teacher Mode"
      description="Generate lesson plans, learning objectives, and guided study paths from any document for classroom or self-paced learning."
      icon={GraduationCap}
    />
  );
}

