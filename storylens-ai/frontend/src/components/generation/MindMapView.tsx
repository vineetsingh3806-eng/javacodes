/**
 * Mind map artifact renderer — hierarchical tree layout.
 */
"use client";

import { Network } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/utils/cn";
import type { MindMapData, MindMapNode } from "@/types";

interface NodeProps {
  node: MindMapNode;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
}

function MindNode({ node, depth, expanded, toggle }: NodeProps) {
  const hasChildren = node.parent_id === "root" || expanded.has(node.id);
  void hasChildren;

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
      style={{ marginLeft: depth * 28 }}
    >
      <div
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg",
          depth === 0
            ? "gradient-bg border-transparent font-semibold text-white shadow-lg shadow-accent-500/25"
            : depth === 1
              ? "border-primary-200 bg-primary-50 font-medium text-primary-800 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200"
              : "border-white/30 bg-white/60 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
        )}
        onClick={() => node.parent_id !== "root" && toggle(node.id)}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-current opacity-70" />
        {node.label}
      </div>
      {node.description && (
        <p className="ml-4 mt-1 max-w-xs text-xs text-muted-foreground">
          {node.description}
        </p>
      )}
    </motion.div>
  );
}

export function MindMapView({ data }: { data: MindMapData }) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const tree = useMemo(() => {
    const childrenMap = new Map<string, MindMapNode[]>();
    data.nodes.forEach((node) => {
      const list = childrenMap.get(node.parent_id) ?? [];
      list.push(node);
      childrenMap.set(node.parent_id, list);
    });
    return { childrenMap, roots: childrenMap.get("root") ?? [] };
  }, [data]);

  const visibleNodes = useMemo(() => {
    const result: MindMapNode[] = [];
    const walk = (nodes: MindMapNode[], depth: number) => {
      nodes.forEach((node) => {
        if (depth > 0) result.push(node);
        if (depth === 0 || expanded.has(node.id)) {
          walk(tree.childrenMap.get(node.id) ?? [], depth + 1);
        }
      });
    };
    walk(tree.roots, 0);
    return result;
  }, [tree, expanded]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold gradient-text">
          {data.title}
        </h2>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Central node */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl gradient-bg px-6 py-3 font-display text-lg font-bold text-white shadow-xl shadow-accent-500/25">
              {data.central_node.label}
            </div>
          </div>

          <div className="mx-auto max-w-2xl space-y-3">
            {visibleNodes.map((node) => {
              const depth = node.parent_id === data.central_node.id ? 1 : 2;
              return (
                <MindNode
                  key={node.id}
                  node={node}
                  depth={depth}
                  expanded={expanded}
                  toggle={toggle}
                />
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            💡 Click a node to expand or collapse its branches.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function MindMapEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-600 dark:bg-accent-900/40 dark:text-accent-300">
        <Network className="h-7 w-7" />
      </div>
      <p className="max-w-md text-sm text-muted-foreground">
        Select a ready document and click <strong>Generate</strong> to build an
        AI mind map of its key concepts.
      </p>
    </div>
  );
}

