/**
 * QuickActions — premium action cards (Upload, Chat, Summary, Quiz).
 */
"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  MessageSquare,
  Sparkles,
  Upload,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
}

const actions: QuickAction[] = [
  {
    label: "Upload Document",
    description: "Import PDF, DOCX, PPTX or images",
    href: "/upload",
    icon: Upload,
    gradient: "from-primary-600 to-indigo-600",
  },
  {
    label: "Start AI Chat",
    description: "Ask questions about your documents",
    href: "/chat",
    icon: MessageSquare,
    gradient: "from-accent-600 to-purple-600",
  },
  {
    label: "Generate Summary",
    description: "Concise AI overview of a document",
    href: "/timeline",
    icon: Sparkles,
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    label: "Create Quiz",
    description: "Test your understanding instantly",
    href: "/quiz",
    icon: BrainCircuit,
    gradient: "from-rose-600 to-pink-600",
  },
];

export function QuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.08 }}
        >
          <Link href={action.href} className="block h-full">
            <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg">
              {/* Decorative gradient glow */}
              <div
                className={cn(
                  "absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40",
                  action.gradient
                )}
              />
              <CardContent className="relative flex h-full flex-col items-start gap-3 p-5">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
                    action.gradient
                  )}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold leading-tight">{action.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

