/**
 * ComingSoon — polished placeholder for premium dashboard features.
 */
"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ComingSoon({ title, description, icon: Icon }: ComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-surface relative mx-auto max-w-xl overflow-hidden p-10 text-center"
    >
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent-300/20 blur-3xl dark:bg-accent-700/20" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-primary-300/20 blur-3xl dark:bg-primary-700/20" />

      <div className="relative">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl gradient-bg text-white shadow-xl shadow-accent-500/30"
        >
          <Icon className="h-8 w-8" />
        </motion.div>

        <h2 className="mt-6 font-display text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        <div className="mt-4">
          <Badge variant="warning">Coming soon</Badge>
        </div>

        <Link href="/dashboard" className="btn-secondary mt-6 inline-flex">
          Back to dashboard
        </Link>
      </div>
    </motion.div>
  );
}

